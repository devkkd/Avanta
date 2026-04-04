import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

function generateSlug(name) {
  return name.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function isValidUrl(str) {
  if (!str || typeof str !== 'string') return false;
  try { const u = new URL(str); return u.protocol === 'http:' || u.protocol === 'https:'; }
  catch { return false; }
}

function extractFilename(str) {
  if (!str) return '';
  return str.split(/[/\\]/).pop();
}

// Build R2 public URL from just a filename (no upload needed)
function filenameToR2Url(filename) {
  const base = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  if (!base || !filename) return '';
  return `${base}/products/${filename}`;
}

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const l = value.toLowerCase().trim();
    return l === 'true' || l === '1' || l === 'yes';
  }
  return false;
};

export async function POST(request) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Parse CSV / Excel
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let products = [];
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.csv')) {
      const parsed = Papa.parse(buffer.toString('utf-8'), {
        header: true, skipEmptyLines: true,
        transformHeader: (h) => h.trim(),
      });
      products = parsed.data;
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const wb = XLSX.read(buffer, { type: 'buffer' });
      products = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    } else {
      return NextResponse.json({ success: false, error: 'Only CSV and Excel files are supported.' }, { status: 400 });
    }

    if (!products?.length) {
      return NextResponse.json({ success: false, error: 'No products found in file' }, { status: 400 });
    }

    const results = { total: products.length, success: 0, failed: 0, errors: [], imageUploads: { total: 0, success: 0, failed: 0 } };

    // Helper: resolve image value → R2 URL
    const resolveImage = async (value) => {
      if (!value) return '';
      if (isValidUrl(value)) return value;
      // It's a filename — construct R2 URL directly (image was pre-uploaded)
      const filename = extractFilename(value) || value;
      return filenameToR2Url(filename);
    };

    for (let i = 0; i < products.length; i++) {
      const row = products[i];
      try {
        if (!row.name || !row.description || !row.categorySlug) {
          throw new Error('Missing required fields: name, description, or categorySlug');
        }

        const category = await Category.findOne({ slug: row.categorySlug });
        if (!category) throw new Error(`Category not found: ${row.categorySlug}`);

        let subcategory = null;
        if (row.subcategorySlug) {
          subcategory = await Subcategory.findOne({ slug: row.subcategorySlug, categoryId: category._id });
          if (!subcategory) throw new Error(`Subcategory not found: ${row.subcategorySlug}`);
        }

        const mainImageUrl = await resolveImage(row.mainImage);

        const galleryUrls = [];
        if (row.galleryImages) {
          for (const p of row.galleryImages.split(',').map(s => s.trim()).filter(Boolean)) {
            const url = await resolveImage(p);
            if (url) galleryUrls.push(url);
          }
        }

        const sizes = row.sizes
          ? row.sizes.split(',').map(pair => {
              const [size, stock] = pair.split(':');
              return { size: size.trim().toUpperCase(), stock: parseInt(stock) || 0, available: true };
            })
          : [];

        const sku = row.sku || `AVT${Date.now().toString().slice(-6)}-${(row.colorName || 'DEF').substring(0, 3).toUpperCase()}`;
        const slug = row.slug || generateSlug(row.name);

        const productData = {
          name: row.name.trim(),
          description: row.description.trim(),
          sku: sku.toUpperCase(),
          slug,
          images: { main: mainImageUrl || '', gallery: galleryUrls },
          sizes,
          productDetails: {
            material: row.material || 'Not specified',
            productCare: row.productCare || 'Dry clean recommended',
            additionalInfo: row.additionalInfo || '',
          },
          color: { name: row.colorName || 'Default', code: row.colorCode || '#000000' },
          categoryId: category._id,
          subcategoryId: subcategory?._id || null,
          isActive: parseBoolean(row.isActive !== undefined ? row.isActive : true),
          isFeatured: parseBoolean(row.isFeatured),
          isNewArrival: parseBoolean(row.isNewArrival),
          tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [],
          sortOrder: parseInt(row.sortOrder) || 0,
          totalStock: 0,
        };

        const existing = await Product.findOne({ sku: productData.sku });
        if (existing) await Product.findByIdAndUpdate(existing._id, productData);
        else await Product.create(productData);

        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({ row: i + 1, data: row.name || 'Unknown', error: error.message });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Done. Products: ${results.success} success, ${results.failed} failed. Images: ${results.imageUploads.success}/${results.imageUploads.total} uploaded.`,
      results,
    });

  } catch (error) {
    console.error('Bulk Upload Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

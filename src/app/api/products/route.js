import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-native';
import { uploadBuffer } from '@/lib/cloudinary';
import { ObjectId } from 'mongodb';

// Helper function to validate ObjectId
function isValidObjectId(id) {
  try {
    return ObjectId.isValid(id) && (String(new ObjectId(id)) === String(id));
  } catch (error) {
    return false;
  }
}

export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const subcategoryId = searchParams.get('subcategoryId');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;
    
    let query = { isActive: true };
    
    if (categoryId && isValidObjectId(categoryId)) {
      query.categoryId = new ObjectId(categoryId);
    }
    
    if (subcategoryId && isValidObjectId(subcategoryId)) {
      query.subcategoryId = new ObjectId(subcategoryId);
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const products = await db.collection('products')
      .find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    
    // Populate category and subcategory info for each product
    for (let product of products) {
      if (product.categoryId) {
        const category = await db.collection('categories').findOne({ _id: product.categoryId });
        if (category) {
          product.categoryId = {
            _id: category._id,
            name: category.name,
            slug: category.slug
          };
        }
      }
      
      if (product.subcategoryId) {
        const subcategory = await db.collection('subcategories').findOne({ _id: product.subcategoryId });
        if (subcategory) {
          product.subcategoryId = {
            _id: subcategory._id,
            name: subcategory.name,
            slug: subcategory.slug
          };
        }
      }
    }
    
    const total = await db.collection('products').countDocuments(query);
    
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const price = parseFloat(formData.get('price') || '0');
    const categoryId = formData.get('categoryId');
    const subcategoryId = formData.get('subcategoryId');
    const sku = formData.get('sku');
    const stock = parseInt(formData.get('stock')) || 0;
    const isFeatured = formData.get('isFeatured') === 'true';

    if (!title || title.trim().length < 2) {
      return NextResponse.json(
        { error: 'Product title must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!categoryId || !isValidObjectId(categoryId)) {
      return NextResponse.json(
        { error: 'Valid category is required' },
        { status: 400 }
      );
    }

    if (price < 0) {
      return NextResponse.json(
        { error: 'Price must be a positive number' },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await db.collection('categories').findOne({ _id: new ObjectId(categoryId) });
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Check if subcategory exists (if provided)
    if (subcategoryId && isValidObjectId(subcategoryId)) {
      const subcategory = await db.collection('subcategories').findOne({ _id: new ObjectId(subcategoryId) });
      if (!subcategory) {
        return NextResponse.json(
          { error: 'Subcategory not found' },
          { status: 400 }
        );
      }
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Check if product with same slug exists
    const existingProduct = await db.collection('products').findOne({ slug });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this title already exists' },
        { status: 400 }
      );
    }

    const images = [];
    const file = formData.get('image');
    if (file && file.size) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadRes = await uploadBuffer(buffer, 'products');
      images.push(uploadRes.secure_url);
    }

    const productData = {
      title: title.trim(),
      description: description?.trim() || '',
      price,
      categoryId: new ObjectId(categoryId),
      images,
      slug,
      stock,
      isFeatured,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    if (subcategoryId && isValidObjectId(subcategoryId)) {
      productData.subcategoryId = new ObjectId(subcategoryId);
    }

    if (sku && sku.trim()) {
      productData.sku = sku.trim();
    }

    const result = await db.collection('products').insertOne(productData);
    const product = { ...productData, _id: result.insertedId };
    
    // Add category and subcategory info for response
    product.categoryId = {
      _id: category._id,
      name: category.name,
      slug: category.slug
    };

    if (product.subcategoryId) {
      const subcategory = await db.collection('subcategories').findOne({ _id: product.subcategoryId });
      if (subcategory) {
        product.subcategoryId = {
          _id: subcategory._id,
          name: subcategory.name,
          slug: subcategory.slug
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create product error:', error);
    
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

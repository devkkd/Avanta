import { NextResponse } from 'next/server';
import { getAllProducts, createProduct, getAllCategories, getAllSubcategories, searchProducts } from '@/lib/database-adapter';
import { generateStyleCode } from '@/models/Product';

// Helper function to validate ID (for mock database compatibility)
function isValidId(id) {
  return id && typeof id === 'string' && id.length > 0;
}

// Helper function to generate slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const subcategoryId = searchParams.get('subcategoryId');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    
    let products;
    
    if (search) {
      // Search products
      const filters = {};
      if (categoryId && isValidId(categoryId)) filters.categoryId = categoryId;
      if (subcategoryId && isValidId(subcategoryId)) filters.subcategoryId = subcategoryId;
      
      products = await searchProducts(search, filters);
    } else {
      // Get all products
      products = await getAllProducts();
      
      // Apply filters
      if (categoryId && isValidId(categoryId)) {
        products = products.filter(product => {
          // Handle both ObjectId and string comparisons
          const productCategoryId = product.categoryId && product.categoryId.toString ? product.categoryId.toString() : product.categoryId;
          return productCategoryId === categoryId;
        });
      }
      
      if (subcategoryId && isValidId(subcategoryId)) {
        products = products.filter(product => {
          // Handle both ObjectId and string comparisons
          const productSubcategoryId = product.subcategoryId && product.subcategoryId.toString ? product.subcategoryId.toString() : product.subcategoryId;
          return productSubcategoryId === subcategoryId;
        });
      }
      
      if (featured === 'true') {
        products = products.filter(product => product.isFeatured);
      }
    }
    
    // Get categories and subcategories for population
    const categories = await getAllCategories();
    const subcategories = await getAllSubcategories();
    
    const categoryMap = {};
    const subcategoryMap = {};
    
    categories.forEach(cat => {
      // Handle both ObjectId and string keys
      const categoryId = cat._id && cat._id.toString ? cat._id.toString() : cat._id;
      categoryMap[categoryId] = cat;
    });
    
    subcategories.forEach(sub => {
      // Handle both ObjectId and string keys
      const subcategoryId = sub._id && sub._id.toString ? sub._id.toString() : sub._id;
      subcategoryMap[subcategoryId] = sub;
    });
    
    // Populate category and subcategory info
    products = products.map(product => {
      const populatedProduct = { ...product };
      
      const productCategoryId = product.categoryId && product.categoryId.toString ? product.categoryId.toString() : product.categoryId;
      if (productCategoryId && categoryMap[productCategoryId]) {
        const category = categoryMap[productCategoryId];
        populatedProduct.categoryId = {
          _id: category._id,
          name: category.name,
          slug: category.slug
        };
      }
      
      const productSubcategoryId = product.subcategoryId && product.subcategoryId.toString ? product.subcategoryId.toString() : product.subcategoryId;
      if (productSubcategoryId && subcategoryMap[productSubcategoryId]) {
        const subcategory = subcategoryMap[productSubcategoryId];
        populatedProduct.subcategoryId = {
          _id: subcategory._id,
          name: subcategory.name,
          slug: subcategory.slug
        };
      }
      
      return populatedProduct;
    });
    
    // Apply pagination
    const total = products.length;
    const skip = (page - 1) * limit;
    const paginatedProducts = products.slice(skip, skip + limit);
    
    return NextResponse.json({
      success: true,
      data: paginatedProducts,
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
    const body = await request.json();
    const { 
      name, 
      description, 
      styleCode, 
      sku,
      priceRange, 
      images, 
      sizes, 
      productDetails, 
      color,
      categoryId, 
      subcategoryId,
      tags,
      isFeatured = false,
      sortOrder = 0
    } = body;

    console.log('Creating product with data:', JSON.stringify(body, null, 2));

    // Validation
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Product name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Product description must be at least 10 characters long' },
        { status: 400 }
      );
    }

    if (!categoryId || !isValidId(categoryId)) {
      return NextResponse.json(
        { error: 'Valid category ID is required' },
        { status: 400 }
      );
    }

    if (!priceRange || !priceRange.min || !priceRange.max || priceRange.min < 0 || priceRange.max < priceRange.min) {
      return NextResponse.json(
        { error: 'Valid price range is required (min and max, with max >= min)' },
        { status: 400 }
      );
    }

    if (!images || !images.main) {
      return NextResponse.json(
        { error: 'Main product image is required' },
        { status: 400 }
      );
    }

    if (!sizes || !Array.isArray(sizes) || sizes.length === 0) {
      return NextResponse.json(
        { error: 'At least one size is required' },
        { status: 400 }
      );
    }

    if (!productDetails || !productDetails.material || !productDetails.productCare) {
      return NextResponse.json(
        { error: 'Product details (material and product care) are required' },
        { status: 400 }
      );
    }

    if (!color || !color.name) {
      return NextResponse.json(
        { error: 'Color information is required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const categories = await getAllCategories();
    const category = categories.find(cat => cat._id.toString() === categoryId.toString());
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Check if subcategory exists (if provided)
    if (subcategoryId && isValidId(subcategoryId)) {
      const subcategories = await getAllSubcategories();
      const subcategory = subcategories.find(sub => sub._id.toString() === subcategoryId.toString());
      if (!subcategory) {
        return NextResponse.json(
          { error: 'Subcategory not found' },
          { status: 400 }
        );
      }
    }

    // Generate slug from name
    const slug = generateSlug(name);

    // Generate style code if not provided
    const finalStyleCode = styleCode || generateStyleCode();

    // Generate SKU if not provided
    const colorCode = color.name.substring(0, 3).toUpperCase();
    const finalSku = sku || `${finalStyleCode}-${colorCode}`;

    const productData = {
      name: name.trim(),
      description: description.trim(),
      styleCode: finalStyleCode,
      sku: finalSku,
      priceRange: {
        min: Number(priceRange.min),
        max: Number(priceRange.max)
      },
      images: {
        main: images.main.trim(),
        gallery: images.gallery || []
      },
      sizes: sizes.map(size => ({
        size: size.size,
        available: size.available !== false,
        stock: Number(size.stock) || 0
      })),
      productDetails: {
        material: productDetails.material.trim(),
        productCare: productDetails.productCare.trim(),
        additionalInfo: productDetails.additionalInfo ? productDetails.additionalInfo.trim() : ''
      },
      color: {
        name: color.name.trim(),
        code: color.code ? color.code.trim() : ''
      },
      slug,
      categoryId,
      subcategoryId: subcategoryId || null,
      tags: tags || [],
      isFeatured: Boolean(isFeatured),
      sortOrder: Number(sortOrder) || 0,
      isActive: true
    };

    console.log('Creating product with processed data:', productData);

    // Create product using database adapter
    const newProduct = await createProduct(productData);
    
    // Add category and subcategory info for response
    newProduct.categoryId = {
      _id: category._id,
      name: category.name,
      slug: category.slug
    };

    if (newProduct.subcategoryId) {
      const subcategories = await getAllSubcategories();
      const subcategory = subcategories.find(sub => sub._id.toString() === newProduct.subcategoryId.toString());
      if (subcategory) {
        newProduct.subcategoryId = {
          _id: subcategory._id,
          name: subcategory.name,
          slug: subcategory.slug
        };
      }
    }

    console.log('Product created successfully:', newProduct);

    return NextResponse.json({
      success: true,
      data: newProduct,
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

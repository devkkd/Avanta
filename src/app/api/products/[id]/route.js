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

export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Populate category and subcategory info
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

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Support both JSON and multipart/form-data
    const contentType = request.headers.get('content-type') || '';
    let updates = { updatedAt: new Date() };

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const title = formData.get('title');
      const description = formData.get('description');
      const price = formData.get('price');
      const categoryId = formData.get('categoryId');
      const subcategoryId = formData.get('subcategoryId');
      const sku = formData.get('sku');
      const stock = formData.get('stock');
      const isFeatured = formData.get('isFeatured');
      const isActive = formData.get('isActive');

      if (title && title.trim().length >= 2) {
        updates.title = title.trim();
        // Generate new slug from title
        updates.slug = title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }
      
      if (description !== null) updates.description = description?.trim() || '';
      if (price !== null) updates.price = parseFloat(price) || 0;
      if (stock !== null) updates.stock = parseInt(stock) || 0;
      if (sku !== null) updates.sku = sku?.trim() || '';
      if (isFeatured !== null) updates.isFeatured = isFeatured === 'true';
      if (isActive !== null) updates.isActive = isActive === 'true';

      // Validate and set categoryId
      if (categoryId && isValidObjectId(categoryId)) {
        const category = await db.collection('categories').findOne({ _id: new ObjectId(categoryId) });
        if (!category) {
          return NextResponse.json(
            { error: 'Category not found' },
            { status: 400 }
          );
        }
        updates.categoryId = new ObjectId(categoryId);
      }

      // Validate and set subcategoryId
      if (subcategoryId && isValidObjectId(subcategoryId)) {
        const subcategory = await db.collection('subcategories').findOne({ _id: new ObjectId(subcategoryId) });
        if (!subcategory) {
          return NextResponse.json(
            { error: 'Subcategory not found' },
            { status: 400 }
          );
        }
        updates.subcategoryId = new ObjectId(subcategoryId);
      }

      // Handle image upload
      const file = formData.get('image');
      if (file && file.size) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadRes = await uploadBuffer(buffer, 'products');
        updates.$push = { images: uploadRes.secure_url };
      }
    } else {
      const body = await request.json();
      updates = { ...updates, ...body };
      
      // Validate categoryId if provided
      if (updates.categoryId && isValidObjectId(updates.categoryId)) {
        const category = await db.collection('categories').findOne({ _id: new ObjectId(updates.categoryId) });
        if (!category) {
          return NextResponse.json(
            { error: 'Category not found' },
            { status: 400 }
          );
        }
        updates.categoryId = new ObjectId(updates.categoryId);
      }

      // Validate subcategoryId if provided
      if (updates.subcategoryId && isValidObjectId(updates.subcategoryId)) {
        const subcategory = await db.collection('subcategories').findOne({ _id: new ObjectId(updates.subcategoryId) });
        if (!subcategory) {
          return NextResponse.json(
            { error: 'Subcategory not found' },
            { status: 400 }
          );
        }
        updates.subcategoryId = new ObjectId(updates.subcategoryId);
      }

      // Generate slug if title is being updated
      if (updates.title) {
        updates.slug = updates.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }
    }

    // Check if slug already exists (if title/slug is being updated)
    if (updates.slug) {
      const existingProduct = await db.collection('products').findOne({ 
        slug: updates.slug, 
        _id: { $ne: new ObjectId(id) } 
      });
      
      if (existingProduct) {
        return NextResponse.json(
          { error: 'Product with this title already exists' },
          { status: 400 }
        );
      }
    }

    const result = await db.collection('products').findOneAndUpdate(
      { _id: new ObjectId(id) },
      updates.$push ? { $set: updates, $push: updates.$push } : { $set: updates },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Populate category and subcategory info for response
    const product = result.value;
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

    return NextResponse.json({
      success: true,
      data: product,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    // Soft delete by setting isActive to false
    const result = await db.collection('products').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { isActive: false, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}

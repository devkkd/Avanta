import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-native';
import { generateSlug } from '@/models/Subcategory';
import { ObjectId } from 'mongodb';

// Helper function to validate ObjectId
function isValidObjectId(id) {
  try {
    return ObjectId.isValid(id) && (String(new ObjectId(id)) === String(id));
  } catch (error) {
    return false;
  }
}

// GET - Get subcategory by ID
export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid subcategory ID' },
        { status: 400 }
      );
    }

    // Get subcategory with category info
    const subcategory = await db.collection('subcategories').findOne({ _id: new ObjectId(id) });
    
    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Get category info
    if (subcategory.categoryId) {
      const category = await db.collection('categories').findOne({ _id: new ObjectId(subcategory.categoryId) });
      if (category) {
        subcategory.categoryId = {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          isActive: category.isActive
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: subcategory
    });
  } catch (error) {
    console.error('Get subcategory error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategory' },
      { status: 500 }
    );
  }
}

// PUT - Update subcategory
export async function PUT(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params
    const body = await request.json();
    const { name, description, categoryId, sortOrder, isActive, image } = body;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid subcategory ID' },
        { status: 400 }
      );
    }

    const updateData = { updatedAt: new Date() };
    
    if (name !== undefined) {
      if (name.trim().length < 2) {
        return NextResponse.json(
          { error: 'Subcategory name must be at least 2 characters long' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
      updateData.slug = generateSlug(name);
    }
    
    if (description !== undefined) updateData.description = description.trim();
    if (sortOrder !== undefined) updateData.sortOrder = parseInt(sortOrder) || 0;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);
    if (image !== undefined) updateData.image = image ? image.trim() : '';
    
    if (categoryId !== undefined) {
      if (!isValidObjectId(categoryId)) {
        return NextResponse.json(
          { error: 'Invalid category ID' },
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
      
      updateData.categoryId = new ObjectId(categoryId);
    }

    // Check if slug already exists (if name is being updated)
    if (updateData.slug) {
      const existingSubcategory = await db.collection('subcategories').findOne({ 
        slug: updateData.slug, 
        _id: { $ne: new ObjectId(id) } 
      });
      
      if (existingSubcategory) {
        return NextResponse.json(
          { error: 'Subcategory with this name already exists' },
          { status: 400 }
        );
      }
    }

    // Update subcategory
    const result = await db.collection('subcategories').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Get category info for response
    if (result.value.categoryId) {
      const category = await db.collection('categories').findOne({ _id: result.value.categoryId });
      if (category) {
        result.value.categoryId = {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          isActive: category.isActive
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: result.value,
      message: 'Subcategory updated successfully'
    });

  } catch (error) {
    console.error('Update subcategory error:', error);
    return NextResponse.json(
      { error: 'Failed to update subcategory' },
      { status: 500 }
    );
  }
}

// DELETE - Delete subcategory (soft delete)
export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { error: 'Invalid subcategory ID' },
        { status: 400 }
      );
    }

    // Soft delete by setting isActive to false
    const result = await db.collection('subcategories').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { isActive: false, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subcategory deleted successfully'
    });

  } catch (error) {
    console.error('Delete subcategory error:', error);
    return NextResponse.json(
      { error: 'Failed to delete subcategory' },
      { status: 500 }
    );
  }
}
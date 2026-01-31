import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-native';
import { generateSlug } from '@/models/Category';
import { ObjectId } from 'mongodb';

// Helper function to validate ObjectId
function isValidObjectId(id) {
  try {
    return ObjectId.isValid(id) && (String(new ObjectId(id)) === String(id));
  } catch (error) {
    return false;
  }
}

// GET - Get category by ID
export async function GET(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params

    console.log('GET category ID:', id);

    if (!isValidObjectId(id)) {
      console.log('Invalid ObjectId:', id);
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    console.log('Searching for category with ObjectId:', new ObjectId(id));
    const category = await db.collection('categories').findOne({ _id: new ObjectId(id) });
    console.log('Category found:', category ? 'YES' : 'NO');
    
    if (category) {
      console.log('Category details:', { id: category._id, name: category.name, active: category.isActive });
    }

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get category error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params
    const body = await request.json();
    const { name, description, sortOrder, isActive } = body;

    console.log('PUT category ID:', id);
    console.log('PUT request body:', body);

    if (!isValidObjectId(id)) {
      console.log('Invalid ObjectId:', id);
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // First check if category exists
    console.log('Checking if category exists...');
    const existingCategory = await db.collection('categories').findOne({ _id: new ObjectId(id) });
    console.log('Existing category:', existingCategory ? 'FOUND' : 'NOT FOUND');
    
    if (!existingCategory) {
      console.log('Category not found for update');
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    const updateData = { updatedAt: new Date() };
    
    if (name !== undefined) {
      if (name.trim().length < 2) {
        return NextResponse.json(
          { error: 'Category name must be at least 2 characters long' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
      updateData.slug = generateSlug(name);
    }
    
    if (description !== undefined) updateData.description = description.trim();
    if (sortOrder !== undefined) updateData.sortOrder = parseInt(sortOrder) || 0;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    console.log('Update data:', updateData);

    // Check if slug already exists (if name is being updated)
    if (updateData.slug) {
      const existingCategory = await db.collection('categories').findOne({ 
        slug: updateData.slug, 
        _id: { $ne: new ObjectId(id) } 
      });
      
      if (existingCategory) {
        return NextResponse.json(
          { error: 'Category with this name already exists' },
          { status: 400 }
        );
      }
    }

    // Update category using updateOne and then fetch updated document
    console.log('Performing update...');
    const updateResult = await db.collection('categories').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    console.log('Update result - matched:', updateResult.matchedCount, 'modified:', updateResult.modifiedCount);

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Fetch the updated document
    const updatedCategory = await db.collection('categories').findOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      data: updatedCategory,
      message: 'Category updated successfully'
    });

  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE - Delete category (soft delete)
export async function DELETE(request, { params }) {
  try {
    const { db } = await connectToDatabase();
    const { id } = await params; // await params

    console.log('DELETE category ID:', id);

    if (!isValidObjectId(id)) {
      console.log('Invalid ObjectId:', id);
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // First check if category exists
    const existingCategory = await db.collection('categories').findOne({ _id: new ObjectId(id) });
    console.log('Category exists for delete:', existingCategory ? 'YES' : 'NO');
    
    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Soft delete by setting isActive to false using updateOne
    const updateResult = await db.collection('categories').updateOne(
      { _id: new ObjectId(id) },
      { $set: { isActive: false, updatedAt: new Date() } }
    );

    console.log('Delete update result - matched:', updateResult.matchedCount, 'modified:', updateResult.modifiedCount);

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
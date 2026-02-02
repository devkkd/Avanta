import { NextResponse } from 'next/server';
import { getCategoryById, updateCategory, deleteCategory } from '@/lib/database-adapter';
import { generateSlug } from '@/models/Category';

// Helper function to validate ObjectId (for mock database compatibility)
function isValidId(id) {
  // For mock database, any string is valid
  // For MongoDB, check ObjectId format
  return id && typeof id === 'string' && id.length > 0;
}

// GET - Get category by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    console.log('GET category ID:', id);

    if (!isValidId(id)) {
      console.log('Invalid category ID:', id);
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const category = await getCategoryById(id);
    console.log('Category found:', category ? 'YES' : 'NO');
    
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
    const { id } = await params;
    const body = await request.json();
    const { name, description, sortOrder, isActive } = body;

    console.log('PUT category ID:', id);
    console.log('PUT request body:', body);

    if (!isValidId(id)) {
      console.log('Invalid category ID:', id);
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const updateData = {};
    
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

    // Update category using database adapter
    const updatedCategory = await updateCategory(id, updateData);
    
    console.log('API - Updated category result:', updatedCategory ? 'SUCCESS' : 'NULL/UNDEFINED');
    console.log('API - Updated category data:', updatedCategory);

    if (!updatedCategory) {
      console.log('API - Returning 404 because updatedCategory is falsy');
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    console.log('API - Returning success response');
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
    const { id } = await params;

    console.log('DELETE category ID:', id);

    if (!isValidId(id)) {
      console.log('Invalid category ID:', id);
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // Delete category using database adapter (soft delete)
    const result = await deleteCategory(id);

    if (!result) {
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
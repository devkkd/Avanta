import { NextResponse } from 'next/server';
import { getSubcategoryById, updateSubcategory, deleteSubcategory, getAllCategories } from '@/lib/database-adapter';
import { generateSlug } from '@/models/Subcategory';

// Helper function to validate ID (for mock database compatibility)
function isValidId(id) {
  return id && typeof id === 'string' && id.length > 0;
}

// GET - Get subcategory by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid subcategory ID' },
        { status: 400 }
      );
    }

    // Get subcategory using database adapter
    const subcategory = await getSubcategoryById(id);
    
    if (!subcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Get category info
    if (subcategory.categoryId) {
      const categories = await getAllCategories();
      const category = categories.find(cat => cat._id === subcategory.categoryId);
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
    const { id } = await params;
    const body = await request.json();
    const { name, description, categoryId, sortOrder, isActive, image } = body;

    console.log('PUT request received for subcategory:', id);
    console.log('Request body:', JSON.stringify(body, null, 2));

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid subcategory ID' },
        { status: 400 }
      );
    }

    const updateData = {};
    
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
      if (!isValidId(categoryId)) {
        console.log('Invalid category ID received:', categoryId);
        return NextResponse.json(
          { error: 'Invalid category ID' },
          { status: 400 }
        );
      }
      
      // Check if category exists
      const categories = await getAllCategories();
      console.log('Available categories for validation:', categories.map(c => ({ id: c._id.toString(), name: c.name })));
      console.log('Looking for categoryId:', categoryId);
      console.log('CategoryId type:', typeof categoryId);
      
      const category = categories.find(cat => cat._id.toString() === categoryId.toString());
      console.log('Category found:', category ? 'YES' : 'NO');
      
      if (!category) {
        console.log('Category not found. Available IDs:', categories.map(c => c._id.toString()));
        console.log('Requested ID:', categoryId);
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 400 }
        );
      }
      
      updateData.categoryId = categoryId;
    }

    // Update subcategory using database adapter
    const updatedSubcategory = await updateSubcategory(id, updateData);

    if (!updatedSubcategory) {
      return NextResponse.json(
        { error: 'Subcategory not found' },
        { status: 404 }
      );
    }

    // Get category info for response
    if (updatedSubcategory.categoryId) {
      const categories = await getAllCategories();
      const category = categories.find(cat => cat._id === updatedSubcategory.categoryId);
      if (category) {
        updatedSubcategory.categoryId = {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          isActive: category.isActive
        };
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedSubcategory,
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
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json(
        { error: 'Invalid subcategory ID' },
        { status: 400 }
      );
    }

    // Delete subcategory using database adapter (soft delete)
    const result = await deleteSubcategory(id);

    if (!result) {
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
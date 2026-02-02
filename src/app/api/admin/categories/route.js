import { NextResponse } from 'next/server';
import { getAllCategories, createCategory } from '@/lib/database-adapter';
import { generateSlug } from '@/models/Category';

// GET - Get all categories
export async function GET() {
  try {
    // Use database adapter (MongoDB or mock)
    const categories = await getAllCategories();
    
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST - Create new category
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description = '', sortOrder = 0 } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Category name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = generateSlug(name);

    const categoryData = {
      name: name.trim(),
      slug,
      description: description.trim(),
      sortOrder: parseInt(sortOrder) || 0,
      isActive: true
    };

    // Create category using database adapter
    const newCategory = await createCategory(categoryData);

    return NextResponse.json({
      success: true,
      data: newCategory,
      message: 'Category created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create category error:', error);
    
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-native';
import { generateSlug } from '@/models/Category';

// GET - Get all categories
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Admin should see all categories (active and inactive)
    const categories = await db.collection('categories')
      .find({}) // Remove isActive filter for admin
      .sort({ sortOrder: 1, name: 1 })
      .toArray();
    
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
    const { db } = await connectToDatabase();
    
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

    // Check if category with same slug already exists
    const existingCategory = await db.collection('categories').findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 400 }
      );
    }

    const categoryData = {
      name: name.trim(),
      slug,
      description: description.trim(),
      sortOrder: parseInt(sortOrder) || 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create category
    const result = await db.collection('categories').insertOne(categoryData);
    const newCategory = { ...categoryData, _id: result.insertedId };

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
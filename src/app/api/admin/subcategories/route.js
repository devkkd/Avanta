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

// GET - Get all subcategories
export async function GET(request) {
  try {
    const { db } = await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    let query = {}; // Admin should see all subcategories
    if (categoryId && isValidObjectId(categoryId)) {
      query.categoryId = new ObjectId(categoryId);
    }
    
    const subcategories = await db.collection('subcategories')
      .find(query)
      .sort({ sortOrder: 1, name: 1 })
      .toArray();
    
    // Populate category info for each subcategory
    for (let subcategory of subcategories) {
      if (subcategory.categoryId) {
        const category = await db.collection('categories').findOne({ _id: subcategory.categoryId });
        if (category) {
          // Include isActive so callers can decide whether to show subcategory
          subcategory.categoryId = {
            _id: category._id,
            name: category.name,
            slug: category.slug,
            isActive: category.isActive
          };
        } else {
          // If the category no longer exists, normalize to null
          subcategory.categoryId = null;
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      data: subcategories
    });
  } catch (error) {
    console.error('Get subcategories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}

// POST - Create new subcategory
export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    
    const body = await request.json();
    const { name, description = '', categoryId, sortOrder = 0, image = '' } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Subcategory name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!categoryId || !isValidObjectId(categoryId)) {
      return NextResponse.json(
        { error: 'Valid category ID is required' },
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

    // Generate slug from name
    const slug = generateSlug(name);

    // Check if subcategory with same slug already exists
    const existingSubcategory = await db.collection('subcategories').findOne({ slug });
    if (existingSubcategory) {
      return NextResponse.json(
        { error: 'Subcategory with this name already exists' },
        { status: 400 }
      );
    }

    const subcategoryData = {
      name: name.trim(),
      slug,
      description: description.trim(),
      image: image ? image.trim() : '',
      categoryId: new ObjectId(categoryId),
      sortOrder: parseInt(sortOrder) || 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Create subcategory
    const result = await db.collection('subcategories').insertOne(subcategoryData);
    const newSubcategory = { ...subcategoryData, _id: result.insertedId };
    
    // Add category info for response
    newSubcategory.categoryId = {
      _id: category._id,
      name: category.name,
      slug: category.slug
    };

    return NextResponse.json({
      success: true,
      data: newSubcategory,
      message: 'Subcategory created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Create subcategory error:', error);
    
    return NextResponse.json(
      { error: 'Failed to create subcategory' },
      { status: 500 }
    );
  }
}
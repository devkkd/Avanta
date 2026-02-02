import { NextResponse } from 'next/server';
import { getAllSubcategories, createSubcategory, getAllCategories } from '@/lib/database-adapter';
import { generateSlug } from '@/models/Subcategory';

// Helper function to validate ID (for mock database compatibility)
function isValidId(id) {
  return id && typeof id === 'string' && id.length > 0;
}

// GET - Get all subcategories
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    
    // Use database adapter (MongoDB or mock)
    let subcategories = await getAllSubcategories();
    
    // Filter by categoryId if provided
    if (categoryId && isValidId(categoryId)) {
      subcategories = subcategories.filter(sub => {
        // Handle both ObjectId and string comparisons
        const subCategoryId = sub.categoryId && sub.categoryId.toString ? sub.categoryId.toString() : sub.categoryId;
        return subCategoryId === categoryId;
      });
    }
    
    // Get all categories for population
    const categories = await getAllCategories();
    const categoryMap = {};
    categories.forEach(cat => {
      // Handle both ObjectId and string keys
      const categoryId = cat._id && cat._id.toString ? cat._id.toString() : cat._id;
      categoryMap[categoryId] = cat;
    });
    
    // Populate category info for each subcategory
    subcategories = subcategories.map(subcategory => {
      const subCategoryId = subcategory.categoryId && subcategory.categoryId.toString ? subcategory.categoryId.toString() : subcategory.categoryId;
      if (subCategoryId && categoryMap[subCategoryId]) {
        const category = categoryMap[subCategoryId];
        return {
          ...subcategory,
          categoryId: {
            _id: category._id,
            name: category.name,
            slug: category.slug,
            isActive: category.isActive
          }
        };
      }
      return {
        ...subcategory,
        categoryId: null
      };
    });
    
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
    const body = await request.json();
    const { name, description = '', categoryId, sortOrder = 0, image = '' } = body;

    console.log('Creating subcategory with data:', { name, categoryId, description, sortOrder });

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Subcategory name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    if (!categoryId || !isValidId(categoryId)) {
      console.log('Invalid or missing categoryId:', categoryId);
      return NextResponse.json(
        { error: 'Valid category ID is required' },
        { status: 400 }
      );
    }

    // Check if category exists
    const categories = await getAllCategories();
    console.log('Available categories:', categories.map(c => ({ id: c._id, name: c.name })));
    
    const category = categories.find(cat => cat._id.toString() === categoryId.toString());
    console.log('Category found:', category ? 'YES' : 'NO');
    console.log('Looking for categoryId:', categoryId);
    console.log('Category IDs in DB:', categories.map(c => c._id.toString()));
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = generateSlug(name);

    const subcategoryData = {
      name: name.trim(),
      slug,
      description: description.trim(),
      image: image ? image.trim() : '',
      categoryId,
      sortOrder: parseInt(sortOrder) || 0,
      isActive: true
    };

    console.log('Creating subcategory with data:', subcategoryData);

    // Create subcategory using database adapter
    const newSubcategory = await createSubcategory(subcategoryData);
    
    // Add category info for response
    newSubcategory.categoryId = {
      _id: category._id,
      name: category.name,
      slug: category.slug
    };

    console.log('Subcategory created successfully:', newSubcategory);

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
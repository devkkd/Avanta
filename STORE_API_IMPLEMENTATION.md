# Store API Implementation

## Overview
Replaced static JSON data with dynamic MongoDB API calls for category and subcategory pages.

## API Routes Created

### 1. Category Page API
**Endpoint:** `GET /api/store/[category_slug]`

**Purpose:** Fetch category, its subcategories, and all products

**Response:**
```json
{
  "success": true,
  "data": {
    "category": {
      "_id": "...",
      "name": "Suits Set",
      "slug": "suits-set",
      "description": "...",
      "sortOrder": 0
    },
    "subcategories": [
      {
        "_id": "...",
        "name": "Anarkali Suit",
        "slug": "anarkali-suit",
        "description": "...",
        "image": "...",
        "categoryId": "...",
        "sortOrder": 0,
        "productCount": 5
      }
    ],
    "products": [
      {
        "_id": "...",
        "name": "Product Name",
        "slug": "product-slug",
        "styleCode": "AV-001",
        "sku": "SKU-001",
        "description": "...",
        "categoryId": "...",
        "subcategoryId": "...",
        "images": [...],
        "priceRange": { "min": 500, "max": 1000 },
        "sizes": [...],
        "colors": [...],
        "fabric": "Cotton",
        "tags": [...],
        "isFeatured": false,
        "isActive": true,
        "sortOrder": 0
      }
    ]
  }
}
```

**Features:**
- Fetches category by slug
- Gets all active subcategories
- Gets all active products
- Calculates product count per subcategory
- Returns 404 if category not found

### 2. Subcategory Page API
**Endpoint:** `GET /api/store/[category_slug]/[subcategory_slug]`

**Purpose:** Fetch specific subcategory and its products

**Response:**
```json
{
  "success": true,
  "data": {
    "category": {
      "_id": "...",
      "name": "Suits Set",
      "slug": "suits-set",
      "description": "..."
    },
    "subcategory": {
      "_id": "...",
      "name": "Anarkali Suit",
      "slug": "anarkali-suit",
      "description": "...",
      "image": "...",
      "categoryId": "..."
    },
    "products": [...]
  }
}
```

**Features:**
- Validates category exists
- Validates subcategory exists and belongs to category
- Fetches only products for that subcategory
- Returns 404 if category or subcategory not found

## Frontend Changes

### Category Page (`src/app/store/[category_slug]/page.jsx`)

**Before:**
- Used static JSON imports
- Data loaded synchronously

**After:**
- Fetches data from API on mount
- Shows loading state
- Shows error state
- Dynamic product filtering and sorting

**Key Features:**
1. **Loading State**: Shows spinner while fetching
2. **Error Handling**: Shows error message if fetch fails
3. **Dynamic Filtering**: Filter by subcategory
4. **Sorting**: Sort by price (low-high, high-low)
5. **Product Count**: Shows count per subcategory

## Usage Examples

### Accessing Category Page:
```
/store/suits-set
/store/kurti-set
/store/anarkali-set
```

### Accessing Subcategory Page:
```
/store/suits-set/anarkali-suit
/store/suits-set/palazzo-suit
/store/kurti-set/straight-kurti
```

## Benefits

1. **Real-time Data**: Always shows latest products from database
2. **No Static Files**: No need to update JSON files
3. **Scalable**: Can handle thousands of products
4. **SEO Friendly**: Server-side data fetching
5. **Performance**: MongoDB indexes for fast queries
6. **Maintainable**: Single source of truth (database)

## Database Queries

### Category Page:
```javascript
// 1. Find category by slug
Category.findOne({ slug: category_slug, isActive: true })

// 2. Find subcategories
Subcategory.find({ categoryId: category._id, isActive: true })
  .sort({ sortOrder: 1, name: 1 })

// 3. Find products
Product.find({ categoryId: category._id, isActive: true })
  .sort({ sortOrder: 1, createdAt: -1 })
```

### Subcategory Page:
```javascript
// 1. Find category
Category.findOne({ slug: category_slug, isActive: true })

// 2. Find subcategory
Subcategory.findOne({ 
  slug: subcategory_slug,
  categoryId: category._id,
  isActive: true 
})

// 3. Find products
Product.find({ 
  categoryId: category._id,
  subcategoryId: subcategory._id,
  isActive: true 
})
```

## Error Handling

### API Errors:
- 404: Category/Subcategory not found
- 500: Database connection or query error

### Frontend Errors:
- Shows loading spinner during fetch
- Shows error message if API fails
- Graceful fallback to empty state

## Testing

1. **Test Category Page:**
   - Navigate to `/store/suits-set`
   - Should show category name, subcategories, and products
   - Click subcategory pills to filter
   - Use sort dropdown

2. **Test Subcategory Page:**
   - Navigate to `/store/suits-set/anarkali-suit`
   - Should show only products from that subcategory

3. **Test Error Cases:**
   - Navigate to `/store/invalid-slug`
   - Should show "Category not found" error

## Performance Optimization

1. **MongoDB Indexes**: 
   - Category: `{ slug: 1, isActive: 1 }`
   - Subcategory: `{ categoryId: 1, isActive: 1, sortOrder: 1 }`
   - Product: `{ categoryId: 1, isActive: 1 }`

2. **Lean Queries**: Using `.lean()` for faster queries

3. **Sorted Results**: Pre-sorted at database level

4. **Connection Pooling**: Reuses MongoDB connections

## Next Steps

1. Add pagination for large product lists
2. Add filters (price range, colors, sizes)
3. Add search within category
4. Add breadcrumbs navigation
5. Add SEO metadata per category

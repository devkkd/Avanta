# Dynamic Categories with Subcategories in Header

## Changes Made

### 1. API Route Created
**File:** `src/app/api/categories/route.js`

- Fetches all active categories from MongoDB
- Fetches all active subcategories
- Groups subcategories under their parent categories
- Returns structured data with categories and their subcategories

### 2. Header Component Updated
**File:** `src/components/Header.jsx`

#### Key Features:
- **Dynamic Data Fetching**: Categories are now fetched from MongoDB via API instead of static JSON
- **Subcategories Dropdown**: Each category shows its subcategories on hover
- **Responsive Design**: Works on both desktop and mobile
- **Theme Consistent**: Uses your existing color scheme (#1F1951, #E5E2D6)

#### Desktop Navigation:
- Categories display in the main navigation bar
- Hover over any category to see subcategories dropdown
- "All Categories" dropdown for overflow categories
- Subcategories are clickable and navigate to `/store/{category-slug}/{subcategory-slug}`

#### Mobile Navigation:
- Categories shown in sidebar menu
- Subcategories listed under each category
- Collapsible design for better UX

### 3. Styling Details
- **Category Hover**: Shows dropdown with rounded corners and shadow
- **Subcategory Items**: Styled with hover effects (background changes to #1F1951)
- **Typography**: Maintains uppercase, bold, tracking for brand consistency
- **Colors**: 
  - Primary: #1F1951 (Deep Purple)
  - Border: #E5E2D6 (Light Beige)
  - Hover: White text on #1F1951 background

## How It Works

1. **On Page Load**: Header component fetches categories from `/api/categories`
2. **Categories Display**: Shows first 6 categories in main nav, rest in "All Categories"
3. **Hover Interaction**: Hovering over category shows subcategories dropdown
4. **Navigation**: 
   - Category link: `/store/{category-slug}`
   - Subcategory link: `/store/{category-slug}/{subcategory-slug}`

## Example Categories Structure

```json
{
  "name": "SUITS SET",
  "slug": "suits-set",
  "subcategories": [
    { "name": "Anarkali Suit", "slug": "anarkali-suit" },
    { "name": "Palazzo Suit", "slug": "palazzo-suit" }
  ]
}
```

## Testing

1. Start your development server: `npm run dev`
2. Navigate to homepage
3. Hover over category names in header
4. Check subcategories dropdown appears
5. Test mobile menu by clicking hamburger icon

## Future Enhancements

- Add loading skeleton for better UX
- Cache categories data
- Add search functionality within categories
- Add category images in dropdown

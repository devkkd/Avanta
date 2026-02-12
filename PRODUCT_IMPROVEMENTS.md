# Product Improvements - isNew Field & Cloudinary Upload

## Changes Implemented

### 1. Added `isNew` Field to Product Model

**File:** `src/models/Product.js`

**New Field:**
```javascript
isNew: {
  type: Boolean,
  default: false
}
```

**Purpose:**
- Shows "NEW" badge on product cards when `isNew: true`
- Separate from `isFeatured` field
- Green badge for NEW, Pink badge for FEATURED

### 2. Updated ProductCard Component

**File:** `src/components/ProductCard.jsx`

**Key Changes:**

1. **Fixed Field Mapping:**
   - `product.images.main` → Main product image
   - `product.name` → Product name (was `product.title`)
   - `product.description` → Product description
   - Fallback support for old field names

2. **NEW Badge:**
   ```jsx
   {product.isNew && (
     <span className="bg-[#00C349] text-white ...">
       New
     </span>
   )}
   ```

3. **Badge Priority:**
   - If `isNew: true` → Shows green "NEW" badge
   - Else if `isFeatured: true` → Shows pink "FEATURED" badge
   - Only one badge shows at a time

**Badge Colors:**
- NEW: `#00C349` (Green)
- FEATURED: `#DE3163` (Pink)

### 3. Cloudinary Upload System

**File:** `src/lib/cloudinary.js`

**Functions:**

1. **`uploadToCloudinary(file, folder)`**
   - Uploads single image to Cloudinary
   - Auto-optimizes quality
   - Max dimensions: 1200x1600
   - Returns secure URL

2. **`uploadMultipleToCloudinary(files, folder)`**
   - Uploads multiple images
   - Returns array of URLs

3. **`deleteFromCloudinary(imageUrl)`**
   - Deletes image from Cloudinary
   - Extracts public_id from URL

**Features:**
- Auto format conversion (WebP when supported)
- Quality optimization
- Image resizing
- Folder organization

### 4. Upload API Route

**File:** `src/app/api/upload/route.js`

**Endpoint:** `POST /api/upload`

**Request Body:**
```json
{
  "image": "base64_encoded_image",  // For single upload
  "images": ["base64_1", "base64_2"], // For multiple upload
  "folder": "avanta-products"  // Optional, default: avanta-products
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/..."  // Single upload
    // OR
    "urls": ["url1", "url2", ...]  // Multiple upload
  }
}
```

### 5. Updated Admin Product Create Page

**File:** `src/app/admin/products/create/page.jsx`

**Changes:**

1. **Added `isNew` to formData:**
   ```javascript
   isNew: false
   ```

2. **Added UI Checkbox:**
   ```jsx
   <label className="flex items-center gap-2">
     <input
       type="checkbox"
       checked={formData.isNew}
       onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
       className="rounded border-gray-300 text-green-600 focus:ring-green-500"
     />
     <span className="text-sm text-gray-700">New Product (Show "NEW" Badge)</span>
   </label>
   ```

3. **Cloudinary Upload:**
   - Already integrated via `CloudinaryUpload` component
   - Already integrated via `MultipleImageUpload` component

### 6. Updated Admin Product Edit Page

**File:** `src/app/admin/products/edit/[id]/page.jsx`

**Changes:**
- Added `isNew: false` to formData initialization
- Field will be editable when UI is updated

## Environment Variables Required

Make sure `.env.local` has:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Usage Examples

### Creating Product with NEW Badge:

1. Go to `/admin/products/create`
2. Fill product details
3. Check "New Product (Show "NEW" Badge)" checkbox
4. Upload images via Cloudinary
5. Submit

### Frontend Display:

```jsx
// Product with isNew: true
<ProductCard product={{
  _id: "123",
  name: "Anarkali Suit",
  images: { main: "https://..." },
  priceRange: { min: 500, max: 1000 },
  description: "Beautiful suit",
  isNew: true  // Shows green "NEW" badge
}} />

// Product with isFeatured: true
<ProductCard product={{
  ...
  isFeatured: true,  // Shows pink "FEATURED" badge
  isNew: false
}} />
```

## Cloudinary Upload Flow

### Frontend (Admin Panel):

1. User selects image file
2. Convert to base64
3. POST to `/api/upload`
4. Receive Cloudinary URL
5. Save URL in product.images.main or product.images.gallery

### Example Code:

```javascript
// Upload single image
const uploadImage = async (file) => {
  const base64 = await convertToBase64(file);
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      image: base64,
      folder: 'avanta-products'
    })
  });
  
  const result = await response.json();
  return result.data.url; // Cloudinary URL
};

// Upload multiple images
const uploadMultiple = async (files) => {
  const base64Array = await Promise.all(
    files.map(file => convertToBase64(file))
  );
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      images: base64Array,
      folder: 'avanta-products'
    })
  });
  
  const result = await response.json();
  return result.data.urls; // Array of Cloudinary URLs
};
```

## Product Model Fields (Complete)

```javascript
{
  name: String,              // Product name
  description: String,       // Product description
  styleCode: String,         // Unique style code (e.g., AVT123456789)
  sku: String,              // Stock keeping unit
  slug: String,             // URL-friendly slug
  
  priceRange: {
    min: Number,            // Minimum price
    max: Number             // Maximum price
  },
  
  images: {
    main: String,           // Main product image URL (Cloudinary)
    gallery: [String]       // Additional images (Cloudinary)
  },
  
  sizes: [{
    size: String,           // XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL
    available: Boolean,     // Is size available?
    stock: Number           // Stock quantity
  }],
  
  productDetails: {
    material: String,       // Fabric/material info
    productCare: String,    // Care instructions
    additionalInfo: String  // Extra details
  },
  
  color: {
    name: String,           // Color name
    code: String            // Hex code (optional)
  },
  
  categoryId: ObjectId,     // Reference to Category
  subcategoryId: ObjectId,  // Reference to Subcategory
  
  tags: [String],           // Product tags
  
  isFeatured: Boolean,      // Show FEATURED badge
  isNew: Boolean,           // Show NEW badge (NEW!)
  isActive: Boolean,        // Is product active?
  sortOrder: Number,        // Display order
  totalStock: Number,       // Auto-calculated from sizes
  
  createdAt: Date,          // Auto-generated
  updatedAt: Date           // Auto-generated
}
```

## Testing

### Test NEW Badge:

1. Create product with `isNew: true`
2. Navigate to category page
3. Product should show green "NEW" badge

### Test Cloudinary Upload:

1. Go to product create page
2. Click upload image
3. Select image file
4. Image should upload to Cloudinary
5. URL should be saved in product

### Test Field Mapping:

1. Create product with all fields
2. Check product card shows:
   - Correct image (from `images.main`)
   - Correct name (from `name`)
   - Correct description
   - Correct price range

## Benefits

1. **NEW Badge**: Highlight new arrivals
2. **Cloudinary**: Fast, optimized image delivery
3. **Field Mapping**: Consistent data structure
4. **Auto Optimization**: Images auto-optimized for web
5. **CDN**: Fast image loading worldwide

## Next Steps

1. Add isNew checkbox to edit page UI
2. Add bulk upload for multiple products
3. Add image cropping before upload
4. Add image preview before upload
5. Add drag-and-drop for gallery images

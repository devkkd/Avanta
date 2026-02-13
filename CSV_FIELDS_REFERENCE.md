# 📋 CSV Fields Reference - Complete Guide

## Overview
Yeh document sab CSV fields ko detail mein explain karta hai jo bulk product upload ke liye use hote hain.

---

## 🔴 Required Fields (Must Have)

### 1. name
- **Type**: String
- **Description**: Product ka naam
- **Example**: `"Elegant Anarkali Suit"`
- **Validation**: 2-200 characters
- **Required**: ✅ Yes

### 2. description
- **Type**: String
- **Description**: Product ki detailed description
- **Example**: `"Beautiful embroidered anarkali suit perfect for weddings"`
- **Validation**: Max 5000 characters
- **Required**: ✅ Yes

### 3. categorySlug
- **Type**: String
- **Description**: Category ka slug (must exist in database)
- **Example**: `"anarkali-suit"`, `"kurti"`, `"gown"`, `"suits-set"`
- **Validation**: Must match existing category slug
- **Required**: ✅ Yes
- **Note**: Check database for available category slugs

### 4. priceMin
- **Type**: Number
- **Description**: Minimum price
- **Example**: `2500`, `800`, `1200`
- **Validation**: Must be >= 0
- **Required**: ✅ Yes

### 5. priceMax
- **Type**: Number
- **Description**: Maximum price
- **Example**: `3500`, `1200`, `1800`
- **Validation**: Must be >= priceMin
- **Required**: ✅ Yes

---

## 🟢 Optional Fields (Recommended)

### 6. subcategorySlug
- **Type**: String
- **Description**: Subcategory ka slug (optional but recommended)
- **Example**: `"embroidered-anarkali"`, `"designer-kurti"`, `"party-gown"`
- **Validation**: Must exist in database and belong to specified category
- **Required**: ❌ No
- **Auto-generated**: No
- **Note**: Agar provide karo to category ke under hona chahiye

### 7. mainImage
- **Type**: String (Path or URL)
- **Description**: Main product image
- **Examples**:
  - Local path: `"C:\Users\Admin\Pictures\images\product.jpg"`
  - Relative path: `"./images/product.jpg"`
  - URL: `"https://r2.dev/products/product.jpg"`
- **Validation**: Valid file path or URL
- **Required**: ❌ No (but highly recommended)
- **Auto-upload**: ✅ Yes (if local path)

### 8. galleryImages
- **Type**: String (Comma-separated paths or URLs)
- **Description**: Additional product images
- **Examples**:
  - Single: `"./images/product-1.jpg"`
  - Multiple: `"./images/product-1.jpg,./images/product-2.jpg,./images/product-3.jpg"`
  - Mixed: `"./images/img1.jpg,https://r2.dev/img2.jpg"`
- **Validation**: Valid file paths or URLs, comma-separated
- **Required**: ❌ No
- **Auto-upload**: ✅ Yes (if local paths)

### 9. sizes
- **Type**: String (Special format)
- **Description**: Available sizes with stock quantity
- **Format**: `"SIZE:STOCK,SIZE:STOCK"`
- **Examples**:
  - `"S:10,M:15,L:20,XL:10"`
  - `"M:20,L:25,XL:15,2XL:10"`
  - `"XS:5,S:10,M:15,L:20,XL:10,2XL:5,3XL:3"`
- **Valid Sizes**: XS, S, M, L, XL, 2XL, 3XL, 4XL, 5XL
- **Required**: ❌ No
- **Note**: Total stock auto-calculated from sizes

### 10. material
- **Type**: String
- **Description**: Fabric/material information
- **Examples**:
  - `"Georgette with embroidery work"`
  - `"Cotton blend"`
  - `"Net with sequin work"`
  - `"Rayon"`
- **Default**: `"Not specified"`
- **Required**: ❌ No

### 11. productCare
- **Type**: String
- **Description**: Care instructions
- **Examples**:
  - `"Dry clean only"`
  - `"Machine wash cold"`
  - `"Hand wash or dry clean"`
  - `"Machine wash gentle"`
- **Default**: `"Dry clean recommended"`
- **Required**: ❌ No

### 12. additionalInfo
- **Type**: String
- **Description**: Extra product information
- **Examples**:
  - `"Model height: 5'8"", wearing size M"`
  - `"Length: 42 inches"`
  - `"Includes matching dupatta"`
  - `"Set includes: Kurta, Palazzo, Dupatta"`
- **Default**: Empty string
- **Required**: ❌ No

### 13. colorName
- **Type**: String
- **Description**: Color name
- **Examples**: `"Red"`, `"Blue"`, `"Pink"`, `"Green"`, `"Black"`
- **Default**: `"Default"`
- **Required**: ❌ No

### 14. colorCode
- **Type**: String (Hex color code)
- **Description**: Hex color code
- **Examples**: `"#FF0000"`, `"#0000FF"`, `"#FFC0CB"`, `"#00FF00"`
- **Default**: `"#000000"`
- **Required**: ❌ No

### 15. styleCode
- **Type**: String
- **Description**: Unique style code
- **Examples**: `"AVT001"`, `"AVT002"`, `"AVT003"`
- **Validation**: Uppercase, unique
- **Required**: ❌ No
- **Auto-generated**: ✅ Yes (if not provided)
- **Format**: `AVT{timestamp}{random}` (e.g., `AVT1234567890`)

### 16. sku
- **Type**: String
- **Description**: Stock Keeping Unit (unique identifier)
- **Examples**: `"AVT001-RED"`, `"AVT002-BLU"`, `"AVT003-PIN"`
- **Validation**: Uppercase, unique
- **Required**: ❌ No
- **Auto-generated**: ✅ Yes (if not provided)
- **Format**: `{styleCode}-{colorCode}` (e.g., `AVT001-RED`)

### 17. slug
- **Type**: String
- **Description**: URL-friendly product identifier
- **Examples**: 
  - `"elegant-anarkali-suit-red"`
  - `"designer-kurti-set-blue"`
  - `"pink-party-gown"`
- **Validation**: Lowercase, hyphen-separated, unique
- **Required**: ❌ No
- **Auto-generated**: ✅ Yes (from product name if not provided)
- **Note**: Leave empty for auto-generation from name

### 18. isActive
- **Type**: Boolean
- **Description**: Product active status
- **Values**: `TRUE`, `FALSE`, `1`, `0`, `true`, `false`, `yes`, `no`
- **Default**: `TRUE`
- **Required**: ❌ No

### 19. isFeatured
- **Type**: Boolean
- **Description**: Featured product flag
- **Values**: `TRUE`, `FALSE`, `1`, `0`, `true`, `false`, `yes`, `no`
- **Default**: `FALSE`
- **Required**: ❌ No

### 20. isNew
- **Type**: Boolean
- **Description**: New arrival flag
- **Values**: `TRUE`, `FALSE`, `1`, `0`, `true`, `false`, `yes`, `no`
- **Default**: `FALSE`
- **Required**: ❌ No

### 21. tags
- **Type**: String (Comma-separated)
- **Description**: Product tags for search/filtering
- **Examples**:
  - `"wedding,festive,ethnic"`
  - `"casual,daily-wear,office"`
  - `"party,gown,evening-wear"`
- **Required**: ❌ No

### 22. sortOrder
- **Type**: Number
- **Description**: Display order (lower = higher priority)
- **Examples**: `1`, `2`, `3`, `10`, `100`
- **Default**: `0`
- **Required**: ❌ No

---

## 📊 Complete CSV Example

```csv
name,description,categorySlug,subcategorySlug,priceMin,priceMax,mainImage,galleryImages,sizes,material,productCare,additionalInfo,colorName,colorCode,styleCode,sku,slug,isActive,isFeatured,isNew,tags,sortOrder
"Elegant Anarkali Suit","Beautiful embroidered anarkali suit perfect for weddings","anarkali-suit","embroidered-anarkali",2500,3500,"C:\Users\Admin\Pictures\images\anarkali-red-main.jpg","C:\Users\Admin\Pictures\images\anarkali-red-1.jpg,C:\Users\Admin\Pictures\images\anarkali-red-2.jpg","S:10,M:15,L:20,XL:10","Georgette with embroidery","Dry clean only","Model height: 5'8"", wearing size M","Red","#FF0000","AVT001","AVT001-RED","elegant-anarkali-suit-red",TRUE,TRUE,TRUE,"wedding,festive,ethnic",1
```

---

## 🎯 Field Mapping to Product Model

### Product Model Structure:
```javascript
{
  name: String,                    // ← name
  description: String,             // ← description
  styleCode: String,               // ← styleCode (auto-generated)
  sku: String,                     // ← sku (auto-generated)
  slug: String,                    // ← slug (auto-generated from name)
  
  priceRange: {
    min: Number,                   // ← priceMin
    max: Number                    // ← priceMax
  },
  
  images: {
    main: String,                  // ← mainImage (auto-uploaded if local)
    gallery: [String]              // ← galleryImages (auto-uploaded if local)
  },
  
  sizes: [{
    size: String,                  // ← from sizes field
    stock: Number,                 // ← from sizes field
    available: Boolean             // ← auto-set to true
  }],
  
  productDetails: {
    material: String,              // ← material
    productCare: String,           // ← productCare
    additionalInfo: String         // ← additionalInfo
  },
  
  color: {
    name: String,                  // ← colorName
    code: String                   // ← colorCode
  },
  
  categoryId: ObjectId,            // ← from categorySlug lookup
  subcategoryId: ObjectId,         // ← from subcategorySlug lookup
  
  isActive: Boolean,               // ← isActive
  isFeatured: Boolean,             // ← isFeatured
  isNew: Boolean,                  // ← isNew
  
  tags: [String],                  // ← tags (split by comma)
  sortOrder: Number,               // ← sortOrder
  totalStock: Number               // ← auto-calculated from sizes
}
```

---

## 🔄 Auto-Generated Fields

### 1. styleCode
- **Generated when**: Not provided in CSV
- **Format**: `AVT{timestamp}{random}`
- **Example**: `AVT1234567890`
- **Logic**: `AVT` + last 6 digits of timestamp + 3 random digits

### 2. sku
- **Generated when**: Not provided in CSV
- **Format**: `{styleCode}-{colorCode}`
- **Example**: `AVT001-RED`
- **Logic**: styleCode + `-` + first 3 letters of colorName (uppercase)

### 3. slug
- **Generated when**: Not provided in CSV
- **Format**: Lowercase, hyphen-separated
- **Example**: `elegant-anarkali-suit-red`
- **Logic**: 
  - Convert name to lowercase
  - Remove special characters
  - Replace spaces with hyphens
  - Remove multiple hyphens

### 4. totalStock
- **Generated when**: Always (from sizes)
- **Logic**: Sum of all stock values from sizes array
- **Example**: If sizes = "S:10,M:15,L:20", then totalStock = 45

---

## 🎨 Image Path Formats

### Supported Formats:

1. **Windows Absolute Path**
   ```
   C:\Users\Admin\Pictures\images\product.jpg
   D:\Images\Products\anarkali-red.jpg
   ```

2. **Relative Path (from CSV location)**
   ```
   ./images/product.jpg
   ../images/product.jpg
   images/product.jpg
   ```

3. **Unix/Linux Path**
   ```
   /home/user/images/product.jpg
   ~/images/product.jpg
   ```

4. **Already Uploaded URL**
   ```
   https://pub-xxxxx.r2.dev/products/product.jpg
   https://example.com/images/product.jpg
   ```

### Auto-Upload Logic:
- **Local path detected** → Upload to R2 → Use R2 URL
- **URL detected** → Use as is (no upload)

---

## ✅ Validation Rules

### Required Field Validation:
- `name`: 2-200 characters
- `description`: Max 5000 characters
- `categorySlug`: Must exist in database
- `priceMin`: >= 0
- `priceMax`: >= priceMin

### Optional Field Validation:
- `subcategorySlug`: Must exist and belong to category
- `sizes`: Valid format "SIZE:STOCK"
- `colorCode`: Valid hex color (e.g., #FF0000)
- `styleCode`: Uppercase, unique
- `sku`: Uppercase, unique
- `slug`: Lowercase, unique
- `sortOrder`: >= 0

---

## 🐛 Common Errors & Solutions

### 1. "Category not found"
**Error**: `Category not found: xyz`
**Solution**: Check database for exact category slug

### 2. "Subcategory not found"
**Error**: `Subcategory not found: abc`
**Solution**: 
- Verify subcategory exists
- Check it belongs to specified category

### 3. "Duplicate SKU"
**Error**: `Duplicate key error: sku`
**Solution**: 
- Leave SKU empty for auto-generation
- Or provide unique SKU values

### 4. "Image upload failed"
**Error**: `Failed to upload ./images/product.jpg`
**Solution**:
- Check file path is correct
- Verify file exists
- Check file permissions

### 5. "Invalid size format"
**Error**: `Invalid size format`
**Solution**: Use format "S:10,M:20,L:15"

---

## 💡 Best Practices

### 1. Required Fields
Always provide:
- name
- description
- categorySlug
- priceMin
- priceMax

### 2. Images
- Use local paths for auto-upload
- Optimize images before upload (< 2MB)
- Use descriptive file names

### 3. Sizes
- Always provide size information
- Use standard size codes (S, M, L, XL)
- Include stock quantities

### 4. Auto-Generation
Leave these empty for auto-generation:
- styleCode
- sku
- slug

### 5. Boolean Values
Use consistent format:
- `TRUE` / `FALSE` (recommended)
- Or `1` / `0`
- Or `true` / `false`

---

## 📝 Quick Reference Table

| Field | Required | Auto-Generated | Example |
|-------|----------|----------------|---------|
| name | ✅ | ❌ | "Elegant Anarkali" |
| description | ✅ | ❌ | "Beautiful suit" |
| categorySlug | ✅ | ❌ | "anarkali-suit" |
| subcategorySlug | ❌ | ❌ | "embroidered-anarkali" |
| priceMin | ✅ | ❌ | 2500 |
| priceMax | ✅ | ❌ | 3500 |
| mainImage | ❌ | ❌ | "C:\images\product.jpg" |
| galleryImages | ❌ | ❌ | "img1.jpg,img2.jpg" |
| sizes | ❌ | ❌ | "S:10,M:15,L:20" |
| material | ❌ | ❌ | "Georgette" |
| productCare | ❌ | ❌ | "Dry clean only" |
| additionalInfo | ❌ | ❌ | "Model: 5'8"" |
| colorName | ❌ | ❌ | "Red" |
| colorCode | ❌ | ❌ | "#FF0000" |
| styleCode | ❌ | ✅ | "AVT001" |
| sku | ❌ | ✅ | "AVT001-RED" |
| slug | ❌ | ✅ | "elegant-anarkali" |
| isActive | ❌ | ❌ | TRUE |
| isFeatured | ❌ | ❌ | FALSE |
| isNew | ❌ | ❌ | TRUE |
| tags | ❌ | ❌ | "wedding,festive" |
| sortOrder | ❌ | ❌ | 1 |

---

## 🎉 Summary

**Total Fields**: 22
**Required**: 5 (name, description, categorySlug, priceMin, priceMax)
**Optional**: 17
**Auto-Generated**: 4 (styleCode, sku, slug, totalStock)

**Key Features**:
- ✅ Subcategory support
- ✅ Auto slug generation from name
- ✅ Auto image upload from local paths
- ✅ Complete Product model mapping
- ✅ Flexible boolean values
- ✅ Comprehensive validation

Happy uploading! 🚀

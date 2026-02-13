# 🚀 Bulk Product Upload Guide

## Overview
Yeh system tumhe CSV ya Excel file ke through multiple products ek saath upload karne ki facility deta hai with Cloudflare R2 storage.

## 📋 Setup Instructions

### 1. Cloudflare R2 Configuration

Pehle Cloudflare R2 bucket setup karo:

1. **Cloudflare Dashboard** pe jao
2. **R2** section mein jao
3. **Create Bucket** click karo
4. Bucket name: `avanta-products` (ya koi bhi naam)
5. **Create** click karo

### 2. API Tokens Generate Karo

1. R2 dashboard mein **Manage R2 API Tokens** pe jao
2. **Create API Token** click karo
3. Token name do (e.g., "Avanta Products Upload")
4. Permissions: **Object Read & Write**
5. **Create API Token** click karo
6. Token details save karo:
   - Access Key ID
   - Secret Access Key
   - Account ID

### 3. Environment Variables Setup

`.env.local` file mein yeh values update karo:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://developmentkontentkraftdigital_db_user:KKD%4011001@cluster0.jpjknyc.mongodb.net/avanta-web?retryWrites=true&w=majority

# Cloudflare R2 Configuration
CLOUDFLARE_R2_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_here
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_key_here
CLOUDFLARE_R2_BUCKET_NAME=avanta-products
CLOUDFLARE_R2_PUBLIC_URL=https://your-bucket.r2.dev
```

### 4. Public URL Setup

R2 bucket ko public accessible banana hai:

1. Bucket settings mein jao
2. **Public Access** enable karo
3. Custom domain add kar sakte ho (optional)
4. Public URL format: `https://pub-xxxxx.r2.dev` ya custom domain

## 📝 CSV File Format

### Required Fields:
- `name` - Product ka naam
- `description` - Product ki description
- `categorySlug` - Category slug (e.g., "anarkali-suit", "kurti")
- `priceMin` - Minimum price (number)
- `priceMax` - Maximum price (number)

### Optional Fields:
- `mainImage` - Main product image URL
- `galleryImages` - Multiple images (comma-separated URLs)
- `sizes` - Size aur stock (format: "S:10,M:20,L:15")
- `material` - Fabric/material info
- `productCare` - Care instructions
- `additionalInfo` - Extra information
- `colorName` - Color name (e.g., "Red", "Blue")
- `colorCode` - Hex color code (e.g., "#FF0000")
- `styleCode` - Unique style code (auto-generated if empty)
- `sku` - Stock keeping unit (auto-generated if empty)
- `isActive` - true/false or 1/0 (default: true)
- `isFeatured` - true/false or 1/0 (default: false)
- `isNew` - true/false or 1/0 (default: false)
- `tags` - Comma-separated tags
- `sortOrder` - Display order (number, default: 0)

### Example CSV:

```csv
name,description,categorySlug,priceMin,priceMax,mainImage,sizes,material,colorName,colorCode
"Red Anarkali","Beautiful anarkali suit","anarkali-suit",2500,3500,"https://r2.dev/img1.jpg","S:10,M:15,L:20","Georgette","Red","#FF0000"
"Blue Kurti","Designer kurti","kurti",800,1200,"https://r2.dev/img2.jpg","M:20,L:25","Cotton","Blue","#0000FF"
```

## 🎯 Usage Steps

### Method 1: Admin Panel se Upload

1. Development server start karo:
   ```bash
   npm run dev
   ```

2. Admin panel open karo:
   ```
   http://localhost:3000/admin/products/bulk-upload
   ```

3. Template download karo (optional)

4. CSV/Excel file select karo

5. "Upload Products" button click karo

6. Results check karo

### Method 2: Direct API Call

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/admin/products/bulk-upload', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);
```

## 📸 Image Upload

### Option 1: Pre-uploaded Images
Pehle images R2 mein upload karo, phir CSV mein URLs use karo.

### Option 2: Image Upload API
Separate API endpoint hai images upload karne ke liye:

```javascript
const formData = new FormData();
formData.append('images', file1);
formData.append('images', file2);

const response = await fetch('/api/admin/products/upload-image', {
  method: 'POST',
  body: formData
});

const { urls } = await response.json();
// Use these URLs in your CSV
```

## 🔍 Category Slugs

Available category slugs (check your database):
- `anarkali-suit`
- `kurti`
- `gown`
- `suits-set`
- `co-ord-set`
- `top`

## ⚠️ Common Issues

### 1. Category Not Found
**Error:** "Category not found: xyz"
**Solution:** Database mein category slug check karo. Exact match hona chahiye.

### 2. Duplicate SKU
**Error:** "Duplicate key error"
**Solution:** SKU unique hona chahiye. Auto-generate hone do ya unique value do.

### 3. Image Upload Failed
**Error:** "Failed to upload to R2"
**Solution:** 
- R2 credentials check karo
- Bucket permissions verify karo
- Public access enabled hai check karo

### 4. Invalid File Format
**Error:** "Invalid file format"
**Solution:** Only CSV (.csv) ya Excel (.xlsx, .xls) files supported hain.

## 📊 Response Format

Success response:
```json
{
  "success": true,
  "message": "Bulk upload completed. Success: 45, Failed: 5",
  "results": {
    "total": 50,
    "success": 45,
    "failed": 5,
    "errors": [
      {
        "row": 10,
        "data": "Product Name",
        "error": "Category not found"
      }
    ]
  }
}
```

## 🎨 Size Format Examples

```
Single size: "M:20"
Multiple sizes: "S:10,M:20,L:15,XL:5"
All sizes: "XS:5,S:10,M:15,L:20,XL:10,2XL:5,3XL:3"
```

## 🏷️ Tags Examples

```
"wedding,festive,ethnic"
"casual,daily-wear,office"
"party,evening-wear,designer"
```

## 📦 Dependencies

Already installed:
- `@aws-sdk/client-s3` - R2 upload ke liye
- `papaparse` - CSV parsing
- `xlsx` - Excel file parsing
- `multer` - File upload handling

## 🚀 Next Steps

1. `.env.local` mein Cloudflare credentials update karo
2. Template CSV download karo
3. Products ki details fill karo
4. Upload karo aur test karo
5. Production mein deploy karo

## 💡 Tips

- Pehle 2-3 products se test karo
- Images pehle upload karke URLs ready rakho
- Category slugs database se verify karo
- Large files ko batches mein upload karo
- Backup rakho original CSV ka

## 📞 Support

Koi issue ho to:
1. Console logs check karo
2. Network tab mein API response dekho
3. MongoDB connection verify karo
4. R2 credentials double-check karo

Happy Uploading! 🎉

# Backend API (Next.js API Routes)

## Environment
Copy `.env.local.example` to `.env.local` and fill in values:
- `MONGODB_URI` — MongoDB connection string (Atlas recommended)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials

## Start dev server
- Install deps: `npm install` (this will install `mongoose` and `cloudinary` now that they are in `package.json`)
- Run: `npm run dev`

## Admin / Create product
- Visit `http://localhost:3000/admin/new-product` to upload a product with an image using the built-in form (sends multipart/form-data to `/api/products`).

## Seeding data
- Run `npm run seed` (ensure `MONGODB_URI` is set in `.env.local`) to create a sample product in the database.

## Endpoints
- GET `/api/products` — list products
- POST `/api/products` — create product (multipart/form-data)
- GET `/api/products/:id` — get single
- PUT `/api/products/:id` — update (JSON or multipart)
- DELETE `/api/products/:id` — delete

## Example: Create product with image (curl)
curl -X POST "http://localhost:3000/api/products" \
  -F "title=Test Product" \
  -F "description=Nice" \
  -F "price=10" \
  -F "image=@/path/to/image.jpg"

## Example: Create product with fetch (frontend)
const formData = new FormData();
formData.append('title', 'Test Product');
formData.append('description', 'Nice');
formData.append('price', '10');
formData.append('image', fileInput.files[0]);

await fetch('/api/products', { method: 'POST', body: formData });

## Notes
- After changing `.env.local`, restart the dev server.
- Do not commit `.env.local` to source control.
- Use MongoDB Atlas for easy cloud DB and Cloudinary for images.

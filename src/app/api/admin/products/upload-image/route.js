import { NextResponse } from 'next/server';
import { uploadToR2 } from '@/lib/cloudflare-r2';

// Increase body size limit to 20MB for image uploads
export const config = {
  api: { bodyParser: { sizeLimit: '20mb' } },
};

// POST /api/admin/products/upload-image
// Accepts: FormData with multiple 'file' entries
// Returns: { success, data: { filename: url, ... } }
export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('file');

    if (!files?.length) {
      return NextResponse.json({ success: false, error: 'No images uploaded' }, { status: 400 });
    }

    const result = {}; // { originalFilename: r2Url }

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const url = await uploadToR2(buffer, file.name, file.type || 'image/jpeg');
      // Store by original filename so bulk-upload can match by name
      result[file.name] = url;
    }

    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error('Image Upload Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

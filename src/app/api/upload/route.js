import { NextResponse } from 'next/server';
import { uploadToR2, uploadMultipleToR2 } from '@/lib/cloudflare-r2';

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');

    // Handle FormData (multipart)
    if (contentType?.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');

      if (!file) {
        return NextResponse.json(
          { success: false, error: 'No file provided' },
          { status: 400 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const imageUrl = await uploadToR2(buffer, file.name, file.type || 'image/jpeg');

      return NextResponse.json({ success: true, url: imageUrl });
    }

    // Handle JSON (base64 or multiple)
    const body = await request.json();
    const { image, images } = body;

    // Single base64 image
    if (image) {
      const matches = image.match(/^data:(.+);base64,(.+)$/);
      if (!matches) {
        return NextResponse.json(
          { success: false, error: 'Invalid base64 image format' },
          { status: 400 }
        );
      }
      const contentTypeParsed = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      const ext = contentTypeParsed.split('/')[1] || 'jpg';
      const fileName = `upload-${Date.now()}.${ext}`;
      const imageUrl = await uploadToR2(buffer, fileName, contentTypeParsed);
      return NextResponse.json({ success: true, data: { url: imageUrl } });
    }

    // Multiple base64 images
    if (images && Array.isArray(images)) {
      const filesToUpload = images.map((img, i) => {
        const matches = img.match(/^data:(.+);base64,(.+)$/);
        if (!matches) throw new Error(`Invalid base64 format for image ${i}`);
        const ct = matches[1];
        const ext = ct.split('/')[1] || 'jpg';
        return {
          buffer: Buffer.from(matches[2], 'base64'),
          fileName: `upload-${Date.now()}-${i}.${ext}`,
          contentType: ct,
        };
      });
      const urls = await uploadMultipleToR2(filesToUpload);
      return NextResponse.json({ success: true, data: { urls } });
    }

    return NextResponse.json(
      { success: false, error: 'No image data provided' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

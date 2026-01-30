import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { uploadBuffer } from '@/lib/cloudinary';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;

    // Support both JSON and multipart/form-data
    const contentType = request.headers.get('content-type') || '';
    let updates = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const title = formData.get('title');
      const description = formData.get('description');
      const price = formData.get('price');

      if (title) updates.title = title;
      if (description) updates.description = description;
      if (price) updates.price = parseFloat(price);

      const file = formData.get('image');
      if (file && file.size) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadRes = await uploadBuffer(buffer, 'products');
        updates.$push = { images: uploadRes.secure_url };
      }
    } else {
      updates = await request.json();
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json({ ok: true, message: 'Connected to MongoDB' });
  } catch (err) {
    // Return the error message (useful for local debugging)
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

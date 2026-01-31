import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-native';

export async function GET() {
  try {
    const { client, db } = await connectToDatabase();
    
    // Test the connection
    await db.admin().ping();
    
    return NextResponse.json({ 
      success: true,
      status: 'connected',
      database: db.databaseName,
      message: 'Connected to MongoDB Atlas successfully'
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      message: 'Failed to connect to MongoDB Atlas'
    }, { status: 500 });
  }
}

import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client;
let clientPromise;

const options = {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  maxPoolSize: 10,
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  }
};

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('avanta-web');
    console.log('MongoDB connected successfully');
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function findAdmin(username) {
  try {
    const { db } = await connectToDatabase();
    const admin = await db.collection('admins').findOne({
      $or: [{ username }, { email: username }],
      isActive: true
    });
    return admin;
  } catch (error) {
    console.error('Find admin error:', error);
    throw error;
  }
}

export async function findAdminById(adminId) {
  try {
    const { db } = await connectToDatabase();
    const admin = await db.collection('admins').findOne({
      _id: new ObjectId(adminId),
      isActive: true
    });
    return admin;
  } catch (error) {
    console.error('Find admin by ID error:', error);
    throw error;
  }
}

export async function comparePassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export async function updateLastLogin(adminId) {
  try {
    const { db } = await connectToDatabase();
    await db.collection('admins').updateOne(
      { _id: new ObjectId(adminId) },
      { $set: { lastLogin: new Date() } }
    );
  } catch (error) {
    console.error('Update last login error:', error);
    throw error;
  }
}
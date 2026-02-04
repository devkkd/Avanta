import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

let client;
let clientPromise;

function getMongoUri() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }
  return MONGODB_URI;
}

function getClientPromise() {
  if (clientPromise) return clientPromise;
  
  const MONGODB_URI = getMongoUri();
  
  // Determine if this is an Atlas connection
  const isAtlasConnection = MONGODB_URI.includes('mongodb+srv://');

  const baseOptions = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 10000,
    family: 4, // Use IPv4, skip trying IPv6
    maxPoolSize: 10,
    minPoolSize: 1,
    maxIdleTimeMS: 30000,
  };

  // Configure options based on connection type
  const options = isAtlasConnection ? {
    ...baseOptions,
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    directConnection: false,
    serverApi: {
      version: '1',
      strict: false,
      deprecationErrors: false,
    }
  } : {
    ...baseOptions,
    // Local MongoDB options
    directConnection: true,
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
  
  return clientPromise;
}

export async function connectToDatabase() {
  try {
    const client = await getClientPromise();
    const db = client.db('avanta-web');
    
    // Test the connection
    await db.admin().ping();
    console.log('MongoDB connected successfully');
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    // For development, provide helpful error messages
    if (process.env.NODE_ENV === 'development') {
      if (error.message.includes('SSL') || error.message.includes('TLS')) {
        console.log('\n🚨 SSL/TLS Connection Issue Detected!');
        console.log('💡 Possible solutions:');
        console.log('1. Check if your MongoDB Atlas cluster is accessible');
        console.log('2. Verify your IP address is whitelisted in Atlas');
        console.log('3. Try using a local MongoDB instance for development');
        console.log('4. Check if your network/firewall blocks MongoDB connections');
        console.log('\n📝 To use local MongoDB:');
        console.log('   MONGODB_URI=mongodb://localhost:27017/avanta-web');
      }
    }
    
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
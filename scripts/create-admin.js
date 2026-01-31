const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

async function createAdmin() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    console.error('❌ MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db('avanta-web');
    
    // Check if admin already exists
    const existingAdmin = await db.collection('admins').findOne({
      $or: [
        { email: 'admin@avanta.com' },
        { username: 'admin' }
      ]
    });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists!');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Username:', existingAdmin.username);
      console.log('🔄 Active:', existingAdmin.isActive);
      console.log('');
      console.log('✅ You can login at: http://localhost:3000/admin/login');
      console.log('🔑 Use credentials: admin / admin123');
      return;
    }
    
    // Hash password
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create admin user
    const adminData = {
      username: 'admin',
      email: 'admin@avanta.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null
    };
    
    const result = await db.collection('admins').insertOne(adminData);
    
    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@avanta.com');
    console.log('👤 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('🆔 Admin ID:', result.insertedId);
    console.log('');
    console.log('✅ You can now login to admin panel at: http://localhost:3000/admin/login');
    console.log('⚠️  IMPORTANT: Change password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

createAdmin();
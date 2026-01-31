# MongoDB Atlas Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" 
3. Sign up with email or Google

### Step 2: Create Cluster
1. Choose **FREE** tier (M0 Sandbox)
2. Select **AWS** provider
3. Choose closest region (e.g., Mumbai for India)
4. Cluster Name: `avanta-cluster` (or any name)
5. Click **"Create Cluster"**

### Step 3: Create Database User
1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Username: `avanta-admin`
5. Password: Generate secure password (save it!)
6. Database User Privileges: **Read and write to any database**
7. Click **"Add User"**

### Step 4: Network Access
1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. Or add your current IP address
5. Click **"Confirm"**

### Step 5: Get Connection String
1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copy the connection string

### Step 6: Update .env.local
Replace the MONGODB_URI in your `.env.local` file:

```env
MONGODB_URI=mongodb+srv://avanta-admin:<password>@avanta-cluster.xxxxx.mongodb.net/avanta-web?retryWrites=true&w=majority
```

**Important:** Replace `<password>` with your actual database user password!

### Step 7: Test Connection
Run the seed command:
```bash
npm run seed
```

## 🔧 Alternative: Local MongoDB

If you prefer local MongoDB:

### Windows:
1. Download MongoDB Community Server
2. Install with default settings
3. Start MongoDB service
4. Use: `MONGODB_URI=mongodb://localhost:27017/avanta-web`

### Using Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## ✅ Verification

After successful setup, you should see:
```
Connected to MongoDB
✅ Admin user created successfully
📧 Email: admin@avanta.com
👤 Username: admin
🔑 Password: admin123
⚠️  IMPORTANT: Change password after first login!

🎉 Admin setup completed!
🚀 You can now login to admin panel
```

## 🚨 Troubleshooting

**Connection Refused Error:**
- Check if MongoDB service is running (local)
- Verify connection string format (Atlas)
- Check network access settings (Atlas)
- Ensure correct username/password (Atlas)

**Authentication Failed:**
- Double-check database user credentials
- Ensure user has proper permissions
- Verify password doesn't contain special characters that need encoding

## 📞 Need Help?

If you're still having issues:
1. Share your connection error
2. Confirm which option you chose (Atlas/Local)
3. Check if you can access MongoDB Atlas dashboard

---

**Recommended:** Use MongoDB Atlas for hassle-free setup!
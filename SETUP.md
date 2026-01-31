# Avanta Admin Panel Setup Guide

## 🚀 Complete Admin Panel Features

✅ **Database Connection** - MongoDB with Mongoose
✅ **Authentication System** - JWT-based admin login
✅ **Admin Layout** - Header, Sidebar, Dashboard
✅ **Footer Admin Button** - Direct access to admin panel
✅ **Responsive Design** - Mobile-friendly admin interface

## 📋 Setup Instructions

### 1. Database Setup (Choose one option)

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env.local` with your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/avanta-web
   ```

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use default connection string in `.env.local`:
   ```
   MONGODB_URI=mongodb://localhost:27017/avanta-web
   ```

### 2. Environment Variables
Update your `.env.local` file:
```env
# Database
MONGODB_URI=your-mongodb-connection-string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production

# JWT
JWT_SECRET=your-jwt-secret-key-here-change-this-in-production
```

### 3. Create Admin User
After setting up the database, run:
```bash
npm run seed
```

This will create admin user with:
- **Username:** admin
- **Password:** admin123
- **Email:** admin@avanta.com

⚠️ **IMPORTANT:** Change the default password after first login!

### 4. Access Admin Panel

1. **From Footer:** Click "Admin" link in footer
2. **Direct URL:** http://localhost:3000/admin/login
3. **Login with:** admin / admin123

## 🎯 Admin Panel Features

### Dashboard
- Overview statistics (ready for API integration)
- Clean interface for future product management
- Quick actions and navigation

### Navigation
- **Products:** Ready for API-based product management
- **Orders:** Placeholder for order management
- **Customers:** Placeholder for customer management
- **Analytics:** Placeholder for analytics
- **Settings:** System configuration

### Security Features
- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- Protected routes
- Session management

## 📝 Notes

- **Products:** Will be managed through API calls (no seed data)
- **Clean Start:** Only admin user is created, products added via admin panel
- **API Ready:** All endpoints ready for product CRUD operations

## 🔧 File Structure

```
src/
├── app/
│   └── admin/
│       ├── layout.jsx          # Admin layout wrapper
│       ├── login/page.jsx      # Login page
│       └── dashboard/page.jsx  # Main dashboard
├── components/
│   └── admin/
│       ├── AdminHeader.jsx     # Admin header
│       └── AdminSidebar.jsx    # Admin sidebar
├── context/
│   └── AdminContext.jsx        # Admin state management
├── models/
│   └── Admin.js               # Admin user model
└── api/
    └── admin/
        ├── login/route.js      # Login API
        ├── logout/route.js     # Logout API
        └── verify/route.js     # Token verification
```

## 🚨 Security Notes

1. **Change Default Password:** Immediately after first login
2. **Update Secrets:** Change JWT_SECRET and NEXTAUTH_SECRET in production
3. **HTTPS:** Use HTTPS in production
4. **Environment Variables:** Never commit .env.local to version control

## 🎨 Customization

The admin panel uses Tailwind CSS and is fully customizable:
- Colors: Purple/Blue gradient theme
- Layout: Responsive sidebar design
- Components: Modular and reusable

## 📱 Mobile Support

The admin panel is fully responsive:
- Mobile sidebar with overlay
- Touch-friendly navigation
- Optimized for tablets and phones

## 🔄 Next Steps

1. Set up your database connection
2. Create admin user
3. Login to admin panel
4. Start managing your products!

---

**Need Help?** The admin panel is ready to use with all authentication and layout features implemented!
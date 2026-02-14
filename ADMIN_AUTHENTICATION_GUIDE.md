# 🔐 Admin Authentication System - Complete Guide

## Overview
Complete JWT-based authentication system for admin panel with middleware protection.

---

## 🎯 Features

### ✅ Implemented:
1. **JWT Token Authentication** - Secure token-based auth
2. **Middleware Protection** - All admin routes protected
3. **Auto Redirect** - Unauthorized users redirected to login
4. **Token Verification** - Server-side JWT verification
5. **Cookie-based Storage** - Secure HTTP-only cookies
6. **Redirect After Login** - Return to intended page after login
7. **Token Expiry Handling** - Auto logout on expired tokens

---

## 🔧 How It Works

### 1. Middleware (`src/middleware.js`)

**Purpose**: Protect all admin routes from unauthorized access

**Flow**:
```
User visits /admin/dashboard
    ↓
Middleware checks for admin-token cookie
    ↓
Token exists? → Verify JWT
    ↓
Valid? → Allow access ✅
Invalid/Missing? → Redirect to /admin/login ❌
```

**Protected Routes**:
- `/admin/dashboard`
- `/admin/categories`
- `/admin/subcategories`
- `/admin/products`
- `/admin/orders`
- `/admin/users`
- `/admin/settings`
- `/admin/inquiries`
- `/admin/customer-inquiries`

**Public Routes** (No auth needed):
- `/admin/login`
- `/admin` (redirects to login)

### 2. Login Flow

```
1. User enters credentials
    ↓
2. POST /api/admin/login
    ↓
3. Verify username & password
    ↓
4. Generate JWT token
    ↓
5. Set HTTP-only cookie
    ↓
6. Redirect to dashboard (or intended page)
```

### 3. Token Structure

**JWT Payload**:
```javascript
{
  adminId: "507f1f77bcf86cd799439011",
  username: "admin",
  email: "admin@avanta.com",
  iat: 1234567890,  // Issued at
  exp: 1234654290   // Expires in 24 hours
}
```

**Cookie Settings**:
```javascript
{
  httpOnly: true,      // Not accessible via JavaScript
  secure: true,        // HTTPS only (production)
  sameSite: 'strict',  // CSRF protection
  maxAge: 86400000     // 24 hours
}
```

---

## 📝 Usage

### For Users:

#### 1. Login
```
URL: http://localhost:3000/admin/login

Credentials:
Username: admin
Password: Avanta@123
```

#### 2. Access Admin Panel
After login, you can access:
- Dashboard: `/admin/dashboard`
- Categories: `/admin/categories`
- Products: `/admin/products`
- Bulk Upload: `/admin/products/bulk-upload`
- etc.

#### 3. Logout
Click "Logout" button in sidebar or header
- Clears admin-token cookie
- Redirects to login page

### For Developers:

#### 1. Create Admin User
```bash
npm run create-admin
```

Follow prompts to create admin account.

#### 2. Check Authentication in Components
```javascript
import { useAdmin } from '@/context/AdminContext';

function MyComponent() {
  const { isAuthenticated, admin, authLoading } = useAdmin();
  
  if (authLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Not authenticated</div>;
  
  return <div>Welcome {admin.username}</div>;
}
```

#### 3. Protect API Routes
```javascript
import { verifyAdminToken } from '@/lib/auth';

export async function GET(request) {
  // Verify token
  const admin = await verifyAdminToken(request);
  
  if (!admin) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Admin is authenticated, proceed
  return NextResponse.json({ data: 'Protected data' });
}
```

---

## 🔐 Security Features

### 1. JWT Token Security
- **Signed with secret key** - Prevents tampering
- **Expiry time** - 24 hours (configurable)
- **HTTP-only cookies** - Not accessible via JavaScript
- **Secure flag** - HTTPS only in production

### 2. Middleware Protection
- **Server-side verification** - Can't be bypassed
- **Automatic redirect** - Unauthorized users redirected
- **Token validation** - Checks signature and expiry

### 3. Password Security
- **Bcrypt hashing** - Passwords never stored in plain text
- **Salt rounds: 10** - Strong hashing
- **No password in JWT** - Only admin ID stored

### 4. CSRF Protection
- **SameSite cookie** - Prevents cross-site attacks
- **Origin validation** - Checks request origin

---

## 🛠️ Configuration

### Environment Variables

```env
# JWT Secret (Change in production!)
JWT_SECRET=avanta-jwt-secret-2024-change-in-production

# Token expiry (in seconds)
JWT_EXPIRY=86400  # 24 hours
```

### Middleware Config

Edit `src/middleware.js` to add/remove protected routes:

```javascript
const protectedAdminRoutes = [
  '/admin/dashboard',
  '/admin/categories',
  // Add more routes here
];
```

---

## 🔄 Token Lifecycle

### 1. Token Creation (Login)
```javascript
// api/admin/login/route.js
const token = jwt.sign(
  { adminId, username, email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Set cookie
response.cookies.set('admin-token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 86400
});
```

### 2. Token Verification (Middleware)
```javascript
// src/middleware.js
const token = request.cookies.get('admin-token')?.value;
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
await jwtVerify(token, secret);
```

### 3. Token Deletion (Logout)
```javascript
// Client-side
document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

// Server-side
response.cookies.delete('admin-token');
```

---

## 🐛 Troubleshooting

### Issue 1: "Unauthorized" after login
**Cause**: Token not being set properly
**Solution**:
- Check JWT_SECRET in .env.local
- Verify cookie settings
- Check browser console for errors

### Issue 2: Redirected to login immediately
**Cause**: Token expired or invalid
**Solution**:
- Login again
- Check token expiry time
- Verify JWT_SECRET matches

### Issue 3: Can't access admin routes
**Cause**: Middleware not running
**Solution**:
- Restart dev server
- Check middleware.js file exists
- Verify matcher config

### Issue 4: Token not persisting
**Cause**: Cookie settings issue
**Solution**:
- Check httpOnly, secure, sameSite settings
- Verify domain/path settings
- Check browser cookie settings

---

## 📊 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    User Action                          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              Visit /admin/dashboard                     │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                   Middleware                            │
│  • Check for admin-token cookie                         │
│  • Verify JWT signature                                 │
│  • Check expiry                                         │
└─────────────────────────────────────────────────────────┘
                          ↓
                    ┌─────┴─────┐
                    │           │
              Valid Token    No/Invalid Token
                    │           │
                    ↓           ↓
        ┌───────────────┐  ┌──────────────────┐
        │ Allow Access  │  │ Redirect to      │
        │ Show Dashboard│  │ /admin/login     │
        └───────────────┘  └──────────────────┘
```

---

## 🎯 Best Practices

### 1. Token Management
- ✅ Use strong JWT_SECRET (min 32 characters)
- ✅ Set appropriate expiry time (24 hours recommended)
- ✅ Rotate secrets periodically
- ✅ Use different secrets for dev/prod

### 2. Cookie Security
- ✅ Always use httpOnly flag
- ✅ Use secure flag in production
- ✅ Set sameSite to 'strict'
- ✅ Use appropriate maxAge

### 3. Password Security
- ✅ Never log passwords
- ✅ Use bcrypt with salt rounds >= 10
- ✅ Enforce strong password policy
- ✅ Never store passwords in plain text

### 4. Error Handling
- ✅ Don't reveal sensitive info in errors
- ✅ Log authentication failures
- ✅ Rate limit login attempts
- ✅ Monitor suspicious activity

---

## 🔒 Production Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to strong random string
- [ ] Enable secure cookie flag
- [ ] Set up HTTPS
- [ ] Configure CORS properly
- [ ] Enable rate limiting
- [ ] Set up monitoring/logging
- [ ] Test token expiry
- [ ] Test logout functionality
- [ ] Verify middleware protection
- [ ] Check all admin routes are protected

---

## 📚 API Reference

### POST /api/admin/login
**Request**:
```json
{
  "username": "admin",
  "password": "Avanta@123"
}
```

**Response** (Success):
```json
{
  "success": true,
  "message": "Login successful",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@avanta.com"
  }
}
```

**Response** (Error):
```json
{
  "success": false,
  "error": "Invalid credentials"
}
```

---

## 🎉 Summary

**What's Protected**:
- ✅ All admin routes (except login)
- ✅ Server-side verification
- ✅ Automatic redirect on unauthorized access
- ✅ Token expiry handling

**Security Features**:
- ✅ JWT token authentication
- ✅ HTTP-only cookies
- ✅ Bcrypt password hashing
- ✅ CSRF protection
- ✅ Middleware protection

**User Experience**:
- ✅ Seamless login/logout
- ✅ Redirect to intended page after login
- ✅ Auto logout on token expiry
- ✅ Clear error messages

Your admin panel is now fully secured! 🔐🎉

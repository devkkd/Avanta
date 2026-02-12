# ✅ Inquiry System - Backend & Admin Complete

## 🎯 What's Implemented

Complete inquiry management system with backend APIs and admin panel!

## 📦 1. Database Schema

### Inquiry Model (`src/models/Inquiry.js`)

```javascript
{
  // Customer Details
  fullName: String (required),
  email: String (required, validated),
  phone: String (required),
  company: String (optional),
  location: String (optional),
  notes: String (optional),

  // Products Array
  products: [{
    productId: ObjectId (ref: Product),
    name: String,
    styleCode: String,
    image: String,
    material: String,
    color: String,
    productCare: String
  }],

  // Status Management
  status: Enum ['pending', 'contacted', 'quoted', 'converted', 'rejected'],
  
  // Admin Notes
  adminNotes: String,

  // Tracking
  ipAddress: String,
  userAgent: String,

  // Timestamps
  createdAt: Date (auto),
  updatedAt: Date (auto),
  contactedAt: Date,
  quotedAt: Date,
  convertedAt: Date
}
```

### Features:
- ✅ Validation on all required fields
- ✅ Email format validation
- ✅ Status enum with 5 states
- ✅ Automatic timestamps
- ✅ IP and User Agent tracking
- ✅ Product reference with details
- ✅ Indexes for performance

## 🔌 2. API Endpoints

### Public APIs

#### POST `/api/inquiries`
Create new inquiry from frontend

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "company": "ABC Store",
  "location": "Mumbai, India",
  "notes": "Need bulk pricing",
  "products": [/* array of product objects */]
}
```

**Response:**
```json
{
  "success": true,
  "data": {/* inquiry object */},
  "message": "Inquiry submitted successfully"
}
```

#### GET `/api/inquiries?email=xxx&phone=xxx`
Get inquiries by email or phone (limited data)

### Admin APIs

#### GET `/api/admin/inquiries`
Get all inquiries with filters

**Query Params:**
- `status` - Filter by status (pending, contacted, etc.)
- `search` - Search by name, email, phone, company
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [/* inquiries array */],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  },
  "counts": {
    "all": 50,
    "pending": 20,
    "contacted": 15,
    "quoted": 10,
    "converted": 3,
    "rejected": 2
  }
}
```

#### GET `/api/admin/inquiries/[id]`
Get single inquiry details

#### PUT `/api/admin/inquiries/[id]`
Update inquiry status or admin notes

**Request Body:**
```json
{
  "status": "contacted",
  "adminNotes": "Called customer, will send quote"
}
```

#### DELETE `/api/admin/inquiries/[id]`
Delete inquiry (hard delete)

## 🎨 3. Admin Panel

### Page: `/admin/inquiries`

### Features:

#### Stats Dashboard
- 6 status cards showing counts
- Click to filter by status
- Real-time updates

#### Search & Filter
- Search by name, email, phone, company
- Filter by status
- Instant results

#### Inquiries Table
- Customer name & company
- Email & phone
- Product count
- Status dropdown (inline update)
- Created date
- View & Delete actions

#### Inquiry Details Modal
- Full customer information
- All products with images
- Customer notes
- Status update
- Timeline (created, contacted, quoted, converted)
- Admin notes section

#### Status Management
- 5 status states with colors:
  - 🟡 Pending (yellow)
  - 🔵 Contacted (blue)
  - 🟣 Quoted (purple)
  - 🟢 Converted (green)
  - 🔴 Rejected (red)
- Inline status update from table
- Auto-timestamp on status change

## 🎯 4. Frontend Integration

### Cart Page (`src/app/cart/page.jsx`)

Updated `handleSubmit` function:
```javascript
const response = await fetch('/api/inquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...formData,
    products: Enquiries
  })
});
```

Features:
- ✅ Form validation
- ✅ API integration
- ✅ Success/error toasts
- ✅ Auto-clear form after submit
- ✅ Auto-clear enquiries after submit

## 📊 5. Admin Sidebar

Added "Inquiries" menu item:
- Icon: MessageSquare
- Route: `/admin/inquiries`
- Position: After Products, before Orders

## 🧪 Testing Guide

### 1. Test Frontend Submission

1. Visit: http://localhost:3000/store/suits-set
2. Click product → Add to enquiry
3. Go to `/cart`
4. Fill form:
   - Full Name: Test User
   - Email: test@example.com
   - Phone: +91 9876543210
   - Company: Test Store (optional)
   - Location: Mumbai (optional)
   - Notes: Need bulk pricing (optional)
5. Click "Submit Inquiry"
6. Should see success toast
7. Form and enquiries should clear

### 2. Test Admin Panel

1. Login to admin: http://localhost:3000/admin/login
2. Go to "Inquiries" in sidebar
3. See stats cards with counts
4. See inquiry in table
5. Click status dropdown → Change to "Contacted"
6. Click eye icon → View details modal
7. See all customer info and products
8. Update status in modal
9. Close modal
10. Search for inquiry by name/email
11. Filter by status
12. Delete inquiry (trash icon)

### 3. Test API Directly

```bash
# Create inquiry
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "products": [...]
  }'

# Get all inquiries (admin)
curl http://localhost:3000/api/admin/inquiries

# Update status
curl -X PUT http://localhost:3000/api/admin/inquiries/[id] \
  -H "Content-Type: application/json" \
  -d '{"status": "contacted"}'
```

## 📁 Files Created/Modified

### New Files:
1. `src/models/Inquiry.js` - Mongoose schema
2. `src/app/api/inquiries/route.js` - Public API
3. `src/app/api/admin/inquiries/route.js` - Admin list API
4. `src/app/api/admin/inquiries/[id]/route.js` - Admin single inquiry API
5. `src/app/admin/inquiries/page.jsx` - Admin panel page

### Modified Files:
1. `src/app/cart/page.jsx` - API integration
2. `src/components/admin/AdminSidebar.jsx` - Added inquiries link

## 🚀 Production Checklist

- [x] Database schema with validation
- [x] CRUD APIs (Create, Read, Update, Delete)
- [x] Status management with timestamps
- [x] Search and filter functionality
- [x] Pagination support
- [x] Admin authentication (existing)
- [x] Error handling
- [x] Toast notifications
- [x] Responsive design
- [x] Loading states
- [x] Empty states
- [x] Modal for details
- [x] Inline status updates
- [x] IP and User Agent tracking

## 🔐 Security Features

- ✅ Email validation
- ✅ Input sanitization (Mongoose)
- ✅ Max length validation
- ✅ Required field validation
- ✅ Admin-only routes (existing auth)
- ✅ IP tracking for audit
- ✅ User Agent tracking

## 📈 Future Enhancements (Optional)

1. **Email Notifications**
   - Send email to admin on new inquiry
   - Send confirmation email to customer
   - Send quote via email

2. **Export Functionality**
   - Export inquiries to CSV/Excel
   - Filter before export
   - Include all details

3. **Analytics Dashboard**
   - Conversion rate
   - Response time
   - Popular products
   - Customer locations

4. **Bulk Actions**
   - Select multiple inquiries
   - Bulk status update
   - Bulk delete

5. **Notes & Comments**
   - Multiple admin notes
   - Internal comments
   - Activity log

6. **Customer Portal**
   - Track inquiry status
   - View quotes
   - Accept/reject quotes

## ✅ Status

- ✅ Backend schema complete
- ✅ CRUD APIs working
- ✅ Admin panel functional
- ✅ Frontend integrated
- ✅ Status management working
- ✅ Search & filter working
- ✅ Production-ready UI

---

**Server**: http://localhost:3000  
**Admin Panel**: http://localhost:3000/admin/inquiries  
**Status**: ✅ Fully Functional & Production Ready

# Customer Inquiry System Documentation

## Overview
Complete customer inquiry system for product inquiries with backend schema, CRUD APIs, frontend integration, and admin management panel.

## Components Created

### 1. Database Model
**File:** `src/models/CustomerInquiry.js`

**Fields:**
- Company Information: `companyName`, `contactPersonName`
- Contact Details: `phoneNumber`, `email`, `city`, `country`
- Business Information: `businessType`, `quantityRequired`, `expectedOrderFrequency`, `targetDeliveryTimeline`
- Customization: `customisationRequirement`, `specialInstructions`
- Product Reference: `productId`, `productName` (optional)
- Status Management: `status` (pending, contacted, quoted, negotiating, converted, rejected)
- Admin Notes: `adminNotes`
- Tracking: `ipAddress`, `userAgent`, `statusHistory`
- Timestamps: `createdAt`, `updatedAt`

**Features:**
- Validation for all required fields
- Email format validation
- Enum validation for dropdown fields
- Status history tracking
- Indexes for performance

### 2. Public API Routes

#### POST `/api/customer-inquiries`
**File:** `src/app/api/customer-inquiries/route.js`

**Purpose:** Submit new customer inquiry from frontend form

**Features:**
- Accepts all form fields
- Automatically captures IP address and user agent
- Sets initial status to 'pending'
- Validation error handling
- Returns created inquiry data

### 3. Admin API Routes

#### GET `/api/admin/customer-inquiries`
**File:** `src/app/api/admin/customer-inquiries/route.js`

**Purpose:** Fetch all inquiries with filters and pagination

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `status` - Filter by status (all, pending, contacted, etc.)
- `search` - Search in company, name, email, phone, city, country
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)

**Returns:**
- Inquiries array with product population
- Pagination info (page, limit, total, pages)
- Status statistics (counts per status)

#### GET `/api/admin/customer-inquiries/[id]`
**File:** `src/app/api/admin/customer-inquiries/[id]/route.js`

**Purpose:** Fetch single inquiry details

**Returns:** Complete inquiry data with populated product reference

#### PUT `/api/admin/customer-inquiries/[id]`
**Purpose:** Update inquiry (status, admin notes)

**Body:**
```json
{
  "status": "contacted",
  "adminNotes": "Called customer, waiting for response"
}
```

#### DELETE `/api/admin/customer-inquiries/[id]`
**Purpose:** Permanently delete inquiry

### 4. Frontend Component

**File:** `src/components/ProductEnquiry.jsx`

**Features:**
- Fully integrated with API
- Form validation (all required fields marked with *)
- Loading states during submission
- Success/error toast notifications
- Form reset after successful submission
- Optional product reference (can be passed as props)

**Props:**
- `productId` (optional) - MongoDB ObjectId of product
- `productName` (optional) - Name of product for reference

**Form Fields:**
- Company Name *
- Contact Person Name *
- Phone / WhatsApp Number *
- Email Address *
- City *
- Country *
- Business Type * (dropdown)
- Quantity Required * (dropdown)
- Expected Order Frequency * (dropdown)
- Target Delivery Timeline * (dropdown)
- Customisation Requirement * (dropdown)
- Special Instructions (textarea)

**Dropdown Options:**

Business Type:
- Retailer
- Wholesaler
- Distributor
- Online Store
- Boutique
- Export House
- Other

Quantity Required:
- 50-100 pieces
- 100-500 pieces
- 500-1000 pieces
- 1000-5000 pieces
- 5000+ pieces

Expected Order Frequency:
- One-time order
- Monthly
- Quarterly
- Bi-annually
- Annually

Target Delivery Timeline:
- Within 1 week
- 1-2 weeks
- 2-4 weeks
- 1-2 months
- 2-3 months
- Flexible

Customisation Requirement:
- No customization needed
- Minor alterations
- Custom designs
- Private labeling
- Full customization

### 5. Admin Panel

**File:** `src/app/admin/customer-inquiries/page.jsx`

**Features:**

#### Stats Dashboard
- Total inquiries count
- Count by status (Pending, Contacted, Quoted, Negotiating, Converted, Rejected)
- Color-coded cards matching status colors

#### Filters & Search
- Search across: company name, contact person, email, phone, city, country
- Filter by status (all statuses + individual status filter)
- Real-time search and filter

#### Inquiries Table
- Company/Contact column
- Contact Info (email, phone)
- Business Details (type, quantity)
- Status dropdown (inline editing)
- Date created
- Actions (View, Delete)

#### Status Management
- Inline status dropdown in table
- Color-coded status badges:
  - Pending: Yellow
  - Contacted: Blue
  - Quoted: Purple
  - Negotiating: Orange
  - Converted: Green
  - Rejected: Red
- Instant status updates
- Status history tracking

#### Details Modal
- Full inquiry information display
- Status update dropdown
- All company and contact details
- Business requirements
- Special instructions
- Product reference (if applicable)
- Metadata (created date, updated date, IP address)
- Delete button

#### Pagination
- 20 items per page
- Previous/Next navigation
- Shows current range and total count

#### UI/UX Features
- Loading states with spinner
- Empty state with icon
- Hover effects on table rows
- Responsive design
- Toast notifications for all actions
- Confirmation dialog for delete
- Smooth transitions and animations

### 6. Admin Sidebar Integration

**File:** `src/components/admin/AdminSidebar.jsx`

**Added:** "Customer Inquiries" menu item with FileText icon

## Usage Examples

### Frontend Form Usage

```jsx
// Basic usage (general inquiry)
<ProductEnquiry />

// With product reference
<ProductEnquiry 
  productId="507f1f77bcf86cd799439011"
  productName="Flared Anarkali Suit Set"
/>
```

### API Usage Examples

```javascript
// Submit inquiry
const response = await fetch('/api/customer-inquiries', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    companyName: "Fashion Boutique",
    contactPersonName: "John Doe",
    phoneNumber: "+91 9876543210",
    email: "john@fashionboutique.com",
    city: "Mumbai",
    country: "India",
    businessType: "Retailer",
    quantityRequired: "100-500 pieces",
    expectedOrderFrequency: "Monthly",
    targetDeliveryTimeline: "2-4 weeks",
    customisationRequirement: "Minor alterations",
    specialInstructions: "Need samples first"
  })
});

// Fetch inquiries (admin)
const response = await fetch('/api/admin/customer-inquiries?status=pending&search=fashion');

// Update status (admin)
const response = await fetch('/api/admin/customer-inquiries/507f1f77bcf86cd799439011', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ status: 'contacted' })
});
```

## Status Workflow

1. **Pending** - New inquiry submitted
2. **Contacted** - Admin has reached out to customer
3. **Quoted** - Price quote sent to customer
4. **Negotiating** - In discussion about terms/pricing
5. **Converted** - Customer confirmed order
6. **Rejected** - Inquiry declined or customer not interested

## Security Features

- IP address tracking for all submissions
- User agent tracking
- Admin-only access to management APIs
- Validation on all inputs
- XSS protection through React
- CSRF protection through Next.js

## Performance Optimizations

- Database indexes on frequently queried fields
- Pagination for large datasets
- Lean queries for better performance
- Efficient search with regex indexes
- Status aggregation for statistics

## Future Enhancements

- Email notifications on new inquiries
- WhatsApp integration for direct contact
- Export inquiries to CSV/Excel
- Bulk status updates
- Admin notes with rich text editor
- Inquiry assignment to team members
- Follow-up reminders
- Analytics dashboard

## Testing

To test the system:

1. Visit any page with ProductEnquiry component
2. Fill out the form with valid data
3. Submit and verify success toast
4. Login to admin panel at `/admin/customer-inquiries`
5. Verify inquiry appears in the list
6. Test status updates
7. Test search and filters
8. View details modal
9. Test delete functionality

## Production Checklist

- ✅ Database schema with validation
- ✅ CRUD API routes
- ✅ Frontend form integration
- ✅ Admin management panel
- ✅ Status management
- ✅ Search and filters
- ✅ Pagination
- ✅ Error handling
- ✅ Loading states
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Security measures
- ✅ Performance optimizations

## Notes

- All required fields are marked with asterisk (*)
- Form validates on submit
- Status history is automatically tracked
- IP address and user agent captured automatically
- Product reference is optional (for product-specific inquiries)
- Admin can add notes for internal tracking
- Soft delete not implemented - uses hard delete

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import CustomerInquiry from '@/models/CustomerInquiry';
import Inquiry from '@/models/Inquiry';

// GET - Fetch latest pending notifications for admin bell
export async function GET() {
  try {
    await dbConnect();

    // Latest 5 pending wholesale inquiries
    const wholesaleInquiries = await CustomerInquiry.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('companyName contactPersonName createdAt status')
      .lean();

    // Latest 5 pending product inquiries
    const productInquiries = await Inquiry.find({ status: 'pending' })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('fullName company products createdAt status')
      .lean();

    const wholesalePendingCount = await CustomerInquiry.countDocuments({ status: 'pending' });
    const productPendingCount = await Inquiry.countDocuments({ status: 'pending' });

    const notifications = [
      ...wholesaleInquiries.map((i) => ({
        id: i._id,
        type: 'wholesale',
        title: 'New Wholesale Inquiry',
        subtitle: `${i.contactPersonName} - ${i.companyName}`,
        createdAt: i.createdAt,
        href: '/admin/customer-inquiries',
      })),
      ...productInquiries.map((i) => ({
        id: i._id,
        type: 'product',
        title: 'New Product Inquiry',
        subtitle: `${i.fullName}${i.company ? ` - ${i.company}` : ''} · ${i.products?.length || 0} product(s)`,
        createdAt: i.createdAt,
        href: '/admin/inquiries',
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 8);

    return NextResponse.json({
      success: true,
      data: {
        notifications,
        counts: {
          wholesale: wholesalePendingCount,
          product: productPendingCount,
          total: wholesalePendingCount + productPendingCount,
        },
      },
    });
  } catch (error) {
    console.error('Notifications error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NOTIFY_EMAIL_USER,
    pass: process.env.NOTIFY_EMAIL_PASS, // Gmail App Password
  },
});

/**
 * Send a new inquiry notification email to the admin.
 * @param {'wholesale' | 'product'} type
 * @param {object} data
 */
export async function sendInquiryNotification(type, data) {
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!to || !process.env.NOTIFY_EMAIL_USER || !process.env.NOTIFY_EMAIL_PASS) {
    console.warn('Email notification skipped — NOTIFY_EMAIL_* env vars not set.');
    return;
  }

  const isWholesale = type === 'wholesale';

  const subject = isWholesale
    ? `🛍️ New Wholesale Inquiry — ${data.companyName}`
    : `📦 New Product Inquiry — ${data.fullName}`;

  const rows = isWholesale
    ? [
        ['Company', data.companyName],
        ['Contact Person', data.contactPersonName],
        ['Phone / WhatsApp', data.phoneNumber],
        ['Email', data.email || '—'],
        ['City', data.city],
        ['Country', data.country],
        ['Business Type', data.businessType],
        ['Quantity Required', data.quantityRequired],
        ['Order Frequency', data.expectedOrderFrequency],
        ['Delivery Timeline', data.targetDeliveryTimeline],
        ['Customisation', data.customisationRequirement],
        ['Special Instructions', data.specialInstructions || '—'],
      ]
    : [
        ['Name', data.fullName],
        ['Phone', data.phone],
        ['Email', data.email || '—'],
        ['Company', data.company || '—'],
        ['Location', data.location || '—'],
        ['Products', (data.products || []).map(p => `${p.name} (${p.styleCode})`).join(', ') || '—'],
        ['Notes', data.notes || '—'],
      ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#555;background:#f9f9f9;border-bottom:1px solid #eee;white-space:nowrap;">${label}</td>
        <td style="padding:8px 12px;color:#222;border-bottom:1px solid #eee;">${value}</td>
      </tr>`
    )
    .join('');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:32px 0;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#1F1951;padding:24px 32px;">
            <p style="margin:0;color:#a5b4fc;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Avanta India</p>
            <h1 style="margin:6px 0 0;color:#fff;font-size:20px;font-weight:700;">
              ${isWholesale ? '🛍️ New Wholesale Inquiry' : '📦 New Product Inquiry'}
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:24px 32px 8px;">
            <p style="margin:0 0 16px;color:#444;font-size:14px;">
              A new <strong>${isWholesale ? 'wholesale' : 'product'} inquiry</strong> has been submitted on <strong>Avanta India</strong>. Details below:
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;font-size:13px;">
              ${tableRows}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding:24px 32px 32px;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/${isWholesale ? 'customer-inquiries' : 'inquiries'}"
               style="display:inline-block;background:#1F1951;color:#fff;text-decoration:none;padding:12px 28px;border-radius:50px;font-size:13px;font-weight:700;letter-spacing:0.5px;">
              View in Admin Panel →
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;padding:16px 32px;border-top:1px solid #eee;">
            <p style="margin:0;color:#aaa;font-size:11px;">This is an automated notification from Avanta India. Do not reply to this email.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"Avanta India" <${process.env.NOTIFY_EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

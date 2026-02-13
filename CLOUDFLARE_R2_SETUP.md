# 🌐 Cloudflare R2 Setup Guide

## Step-by-Step Setup

### 1️⃣ Create Cloudflare Account
1. Visit [cloudflare.com](https://cloudflare.com)
2. Sign up ya login karo
3. Dashboard pe jao

### 2️⃣ Enable R2 Storage
1. Left sidebar mein **R2** option pe click karo
2. Agar pehli baar use kar rahe ho to **Get Started** click karo
3. Payment method add karo (free tier available hai)

### 3️⃣ Create R2 Bucket
1. **Create bucket** button click karo
2. Bucket details:
   - **Name**: `avanta-products` (ya koi unique name)
   - **Location**: Automatic (recommended)
3. **Create bucket** click karo

### 4️⃣ Enable Public Access
1. Bucket open karo
2. **Settings** tab pe jao
3. **Public Access** section mein:
   - **Allow Access** enable karo
   - Public URL mil jayega (e.g., `https://pub-xxxxx.r2.dev`)
4. Is URL ko copy karke save karo

### 5️⃣ Create API Token
1. R2 Overview page pe jao
2. Right side mein **Manage R2 API Tokens** click karo
3. **Create API Token** click karo
4. Token configuration:
   - **Token name**: `Avanta Products Upload`
   - **Permissions**: 
     - ✅ Object Read & Write
     - ✅ Admin Read & Write (optional, for bucket management)
   - **TTL**: Never expire (ya apni requirement ke according)
5. **Create API Token** click karo

### 6️⃣ Save Credentials
Token create hone ke baad yeh details milenge:

```
Access Key ID: xxxxxxxxxxxxxxxxxxxx
Secret Access Key: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

⚠️ **IMPORTANT**: Secret key sirf ek baar dikhega, isliye turant save kar lo!

### 7️⃣ Get Account ID
1. Cloudflare dashboard pe jao
2. Right sidebar mein **Account ID** dikhega
3. Copy karo

### 8️⃣ Update .env.local File

Apni `.env.local` file mein yeh values update karo:

```env
# Cloudflare R2 Configuration
CLOUDFLARE_R2_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_R2_ACCESS_KEY_ID=your_access_key_id_here
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your_secret_access_key_here
CLOUDFLARE_R2_BUCKET_NAME=avanta-products
CLOUDFLARE_R2_PUBLIC_URL=https://pub-xxxxx.r2.dev
```

### 9️⃣ Test Connection

Terminal mein run karo:

```bash
npm run test-r2
```

Agar sab sahi hai to yeh message aayega:
```
✅ Successfully connected to R2
✅ Test file uploaded successfully
🎉 All tests passed!
```

## 🎯 Quick Reference

### R2 Dashboard URLs
- Main Dashboard: https://dash.cloudflare.com/
- R2 Overview: https://dash.cloudflare.com/?to=/:account/r2
- API Tokens: https://dash.cloudflare.com/?to=/:account/r2/api-tokens

### Pricing (as of 2024)
- **Storage**: $0.015 per GB/month
- **Class A Operations** (write): $4.50 per million requests
- **Class B Operations** (read): $0.36 per million requests
- **Free Tier**: 10 GB storage, 1 million Class A, 10 million Class B per month

### File Size Limits
- Single file: Up to 5 TB
- Multipart upload: Recommended for files > 100 MB

## 🔒 Security Best Practices

1. **API Tokens**:
   - Sirf required permissions do
   - Regular rotation karo
   - Production aur development ke liye alag tokens use karo

2. **Bucket Access**:
   - Public access sirf read-only rakho
   - Write access sirf API tokens ke through

3. **Environment Variables**:
   - `.env.local` ko `.gitignore` mein add karo
   - Production secrets alag rakho

## 🐛 Troubleshooting

### Error: "Access Denied"
**Solution**: 
- API token permissions check karo
- Bucket name sahi hai verify karo

### Error: "Endpoint not found"
**Solution**:
- Account ID correct hai check karo
- Endpoint URL format: `https://{account_id}.r2.cloudflarestorage.com`

### Error: "Bucket does not exist"
**Solution**:
- Bucket name exactly match hona chahiye
- Case-sensitive hai

### Public URL not working
**Solution**:
- Bucket settings mein public access enable karo
- Custom domain configure karo (optional)

## 🚀 Custom Domain Setup (Optional)

Agar custom domain use karna hai:

1. R2 bucket settings mein jao
2. **Custom Domains** section mein domain add karo
3. DNS records configure karo
4. `.env.local` mein public URL update karo

Example:
```env
CLOUDFLARE_R2_PUBLIC_URL=https://cdn.avanta.com
```

## 📊 Monitoring

R2 dashboard mein yeh metrics dekh sakte ho:
- Storage usage
- Request count
- Bandwidth usage
- Cost estimates

## 🎓 Additional Resources

- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [R2 API Reference](https://developers.cloudflare.com/r2/api/)

## ✅ Checklist

- [ ] Cloudflare account created
- [ ] R2 enabled
- [ ] Bucket created
- [ ] Public access enabled
- [ ] API token generated
- [ ] Credentials saved
- [ ] `.env.local` updated
- [ ] Connection tested with `npm run test-r2`
- [ ] Ready to upload products!

Happy uploading! 🎉

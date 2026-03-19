// Cloudinary has been replaced with Cloudflare R2.
// This file re-exports R2 functions under the old names for backwards compatibility.
export { uploadToR2 as uploadToCloudinary, uploadMultipleToR2 as uploadMultipleToCloudinary, deleteFromR2 as deleteFromCloudinary } from '@/lib/cloudflare-r2';

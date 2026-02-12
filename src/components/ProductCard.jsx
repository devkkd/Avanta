import React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import EnquiryBtn from "./EnquiryBtn";

const ProductCard = ({ product }) => {
  const priceText =
    product?.priceRange?.min && product?.priceRange?.max
      ? `₹${product.priceRange.min} – ₹${product.priceRange.max}`
      : "Price on request";

  // Get main image from product.images.main or fallback
  const mainImage = product?.images?.main || product?.image || "/placeholder.jpg";
  
  // Get product name
  const productName = product?.name || product?.title || "Untitled Product";
  
  // Get product description
  const productDescription = product?.description || "";
  
  // Get product slug for URL
  const productSlug = product?.slug || product?._id;

  return (
    <div className="flex flex-col justify-between group">
      {/* Image (Clickable) */}
      <Link href={`/product/${productSlug}`} className="block">
        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-sm bg-gray-100">
          <img
            src={mainImage}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* NEW Badge */}
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-[#00C349] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
              New
            </span>
          )}

          {/* Featured Badge */}
          {product.isFeatured && !product.isNew && (
            <span className="absolute top-4 left-4 bg-[#DE3163] text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        {/* Title (Clickable) */}
        <Link href={`/product/${productSlug}`}>
          <h3 className="font-semibold text-[#1a1a1a] text-lg hover:underline cursor-pointer">
            {productName}
          </h3>
        </Link>

        <p className="font-semibold text-[#1a1a1a] text-sm">
          {priceText}
        </p>

        <p className="text-gray-600 text-[11px] leading-relaxed pt-1 line-clamp-2">
          {productDescription}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-5">
          <EnquiryBtn product={product} />

              {/* <button className="w-10 h-10 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-sm">
                <MessageCircle size={20} fill="white" stroke="none" />
              </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

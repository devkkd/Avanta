"use client";

import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { useParams } from "next/navigation";
import productData from "@/data/ProductData.json";
import EnquiryBtn from "@/components/EnquiryBtn";
import ProductCard from "@/components/ProductCard"; // Import your ProductCard
import FAQ from "@/components/FAQ";
import ContactUs from "@/components/ContactUs";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";

const ProductDetailsPage = () => {
  const { product_id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  // 1. Find the current product
  const product = useMemo(() => {
    return productData.products.find(
      (p) => p._id === product_id && p.active
    );
  }, [product_id]);

  // 2. Find related products (Same subcategory, excluding current product)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productData.products
      .filter(
        (p) =>
          p.subcategoryId === product.subcategoryId &&
          p._id !== product._id &&
          p.active
      )
      .slice(0, 4); // Limit to 4 products as per the reference image
  }, [product]);

  if (!product) {
    return <div className="p-20 text-center text-gray-400 font-mont">Product not found</div>;
  }

  const allImages = [
    product.images?.main,
    ...(product.images?.gallery || [])
  ].filter(Boolean);

  return (
    <div className="max-w-[1441px] mx-auto px-4 py-12 font-sans overflow-hidden">
      {/* PRODUCT DETAIL SECTION */}
      <div className="flex flex-col lg:flex-row gap-12">

        {/* LEFT SECTION: IMAGE GALLERY */}
        <div className="flex flex-row gap-4 w-full lg:w-[55%] h-full">
          {/* Vertical Thumbnails */}
          <div className="hidden md:flex flex-col gap-2 w-24">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`cursor-pointer border-2 transition-all aspect-[3/4] overflow-hidden ${selectedImageIndex === idx ? "border-[#1e224f]" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
              >
                <img src={img} className="w-full h-full object-cover" alt={`Thumb ${idx}`} />
              </div>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="relative flex-1 aspect-[3/4] bg-gray-50 overflow-hidden rounded-sm group">
            <img
              src={allImages[selectedImageIndex]}
              className="w-full h-full object-cover transition-transform duration-500"
              alt={product.title}
            />
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => setSelectedImageIndex((prev) => (prev + 1) % allImages.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* RIGHT SECTION: CONTENT */}
        <div className="w-full lg:w-[45%] flex flex-col">
          <header className=" font-mont pb-6 ">
            <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-gray-900 leading-tight mb-4">
              {product.title.toUpperCase()}
            </h1>

            <div className="text-2xl font-semibold text-gray-900 mb-4">
              ₹{product.priceRange.min} to ₹{product.priceRange.max}
            </div>

            <p className="text-sm text-black font-mont tracking-wider">
              <span className="font-semibold ">Style Code :</span> {product.styleCode} — {product.color?.name?.toUpperCase()}
            </p>
          </header>

          <div className="space-y-8">
            {/* Description */}
            <section className=" leading-relaxed text-sm md:text-base">
              {product.description}
            </section>

            {/* Sizes */}
            <section>
              <h3 className="text-sm font-bold tracking-[0.1em] text-gray-900 mb-4 uppercase">
                Product Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    disabled={!s.available}
                    onClick={() => setSelectedSize(s.size)}
                    className={`min-w-[48px] h-12 px-3 rounded-full border text-xs font-medium transition-all
                      ${!s.available
                        ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                        : selectedSize === s.size
                          ? "bg-[#1e224f] text-white border-[#1e224f] shadow-md"
                          : "bg-white  border-gray-300 hover:border-gray-900"}`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </section>

            {/* Product Details */}
            <section className="border-t  border-gray-200 pt-6">
              <h3 className="text-sm font-bold tracking-[0.1em] text-gray-900 mb-4 uppercase">
                Product Details
              </h3>
              <div className="space-y-2 text-[15px]">
                <p><span className="font-bold text-gray-900">Material :</span> {product.productDetails.material}</p>
                <p><span className="font-bold text-gray-900">Product Care :</span> {product.productDetails.productCare}</p>
              </div>
            </section>

            {/* Action Buttons */}
            <section className="border-t border-gray-200 pt-8 flex flex-wrap items-center gap-3">
              <EnquiryBtn product={product} />
              <button className="bg-[#00D95F] text-white p-4 rounded-full hover:shadow-lg transition-all active:scale-90">
                <MessageCircle size={24} fill="white" />
              </button>
            </section>

            {/* Static Footer Text */}
            <footer className="pt-6">
              <h4 className="text-[15px] font-bold text-gray-900 mb-3">Send Product Enquiry</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Select your products and add them to the <span className="font-bold text-gray-800">“+Add to Cart”</span> to send one combined enquiry with a single click. You can also send an enquiry for a single product by clicking the <span className="font-bold text-gray-800">“Enquiry Now”</span> button.
              </p>
            </footer>
          </div>
        </div>
      </div>

      {/* YOU MAY ALSO LIKE SECTION */}
      {relatedProducts.length > 0 && (
        <section className="py-20 animate-in fade-in duration-700">
          <h2 className="text-3xl font-cinzel font-bold text-gray-900 mb-12 uppercase tracking-widest text-center md:text-left">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {relatedProducts.map((relatedProd) => (
              <ProductCard key={relatedProd._id} product={relatedProd} />
            ))}
          </div>
        </section>
      )}
      <FAQ />
      <ContactUs />
      <CraftsmanshipSection/>
    </div>
  );
};

export default ProductDetailsPage;
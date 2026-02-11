'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, IndianRupee, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProduct } from '@/context/ProductContext';
import Link from 'next/link';

const ProductDetailsPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
          if (data.data.sizes?.length > 0) {
            setSelectedSize(data.data.sizes.find(s => s.available)?.size || '');
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const allImages = product ? [product.images.main, ...(product.images.gallery || [])] : [];

  if (loading || !product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10 font-sans">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* LEFT: IMAGE SECTION (Vertical Thumbnails + Main Image) */}
        <div className="flex gap-4 w-full lg:w-3/5">
          {/* Vertical Thumbnails */}
          <div className="hidden md:flex flex-col gap-3 w-20">
            {allImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`cursor-pointer border-2 aspect-[3/4] overflow-hidden ${selectedImageIndex === idx ? 'border-gray-800' : 'border-transparent'}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Main Image Carrier */}
          <div className="relative flex-1 bg-gray-50  overflow-hidden">
            <img 
              src={allImages[selectedImageIndex]} 
              className="w-full h-full object-cover transition-all duration-500"
              alt="Main Product"
            />
            {/* Arrows */}
            <button 
              onClick={() => setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setSelectedImageIndex((prev) => (prev + 1) % allImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* RIGHT: CONTENT SECTION */}
        <div className="w-full lg:w-2/5 space-y-6">
          <header>
            <h1 className="text-3xl font-serif text-gray-800 tracking-wide">
              {product.name.toUpperCase()} (PRODUCT NAME)
            </h1>
            <div className="flex items-center text-xl font-semibold mt-2 text-gray-900">
              <span className="text-lg">₹</span>
              <span>{product.priceRange?.min} to ₹{product.priceRange?.max}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 tracking-widest">
              Style Code : {product.styleCode} - {product.color?.name?.toUpperCase() || 'LIME GREEN'}
            </p>
          </header>

          <div className="text-sm text-gray-600 leading-relaxed space-y-4 border-b pb-6">
            <p>Crafted for modern versatility, our tunics balance refined style with all-day comfort.</p>
            <p>Designed to transition seamlessly from casual to elevated looks, they pair effortlessly with leggings, denim, or tailored separates.</p>
            <p>A timeless essential for contemporary wardrobes, each piece reflects understated elegance and everyday ease.</p>
          </div>

          {/* Size Selection */}
          <section>
            <h3 className="text-sm font-bold tracking-widest mb-4">PRODUCT SIZE</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes?.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center text-xs transition-all
                    ${selectedSize === s.size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black text-gray-800'}
                  `}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </section>

          {/* Product Details Table-style */}
          <section className="pt-4">
            <h3 className="text-sm font-bold tracking-widest mb-4">PRODUCT DETAILS</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p><span className="font-bold">Material :</span> {product.productDetails?.material || 'Viscose Chinnon (100% Viscose)'}</p>
              <p><span className="font-bold">Product Care :</span> {product.productDetails?.productCare || 'Professional Dry Clean Only'}</p>
            </div>
          </section>

          {/* Action Buttons - EXACT IMAGE UI */}
          <section className="flex items-center gap-3 pt-4">
            <button className="flex-1 bg-[#1e224f] text-white py-3 px-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all">
              +Add to Cart
            </button>
            <button className="flex-1 bg-[#d6336c] text-white py-3 px-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all">
              Enquiry
            </button>
            <button className="bg-[#25D366] text-white p-3 rounded-full hover:bg-opacity-90">
              <MessageCircle size={24} fill="white" />
            </button>
          </section>

          {/* Footer Enquiry Text */}
          <div className="pt-6 border-t">
            <h4 className="font-bold text-sm mb-2">Send Product Enquiry</h4>
            <p className="text-[11px] text-gray-500 leading-normal">
              Select your products and add them to the <span className="font-bold">"+Add to Cart"</span> to send one combined enquiry with a single click. You can also send an enquiry for a single product by clicking the <span className="font-bold">"Enquiry Now"</span> button.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
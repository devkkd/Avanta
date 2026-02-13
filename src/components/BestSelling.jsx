"use client";

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import productData from "@/data/productData.json";

const BestSelling = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!productData?.products) return;

    // Filter only active and featured products
    const featuredList = productData.products.filter(p => p.active && p.featured);

    // Shuffle and pick 4
    const shuffled = [...featuredList]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    
    setFeaturedProducts(shuffled);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-[1440px] mx-auto bg-white py-16 px-4 md:px-10 font-sans ">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
            <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest font-mont">
              Avanta by Jaipur Kurti Gharana
            </h3>
            <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          </div>
          <h2 className="text-2xl md:text-4xl font-cinzel font-bold text-[#1a1a3d] mb-6 uppercase tracking-tight">
            Best Selling Products
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 min-h-[400px]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto bg-white py-16 px-4 md:px-10 font-sans ">
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest font-mont">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-cinzel font-bold text-[#1a1a3d] mb-6 uppercase tracking-tight">
          Best Selling Products
        </h2>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
"use client";

import React, { useMemo } from 'react';
import ProductCard from './ProductCard'; 
import productData from "@/data/productData.json"; //

const DiscoverMore = () => {
  // Logic to pick 8 random active products from the JSON
  const discoverProducts = useMemo(() => {
    if (!productData?.products) return [];

    // Filter only active products
    const activeProducts = productData.products.filter(p => p.active); 

    // Shuffle and pick a maximum of 8 products
    return [...activeProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
  }, []);

  return (
    <div className="bg-white py-16 px-4 md:px-8 max-w-[1440px] mx-auto font-sans">
      
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest font-mont">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-[#1a1a3d] mb-6 uppercase tracking-normal">
          Discover More
        </h2>
        
        <p className="text-sm md:text-[15px] text-gray-700 max-w-3xl mx-auto leading-relaxed italic font-mont">
          Explore thoughtfully curated styles crafted to elevate every occasion; uncover what inspires you next.
        </p>
      </div>

      {/* --- Products Grid using Shared ProductCard --- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {discoverProducts.map((product) => (
          <ProductCard key={product._id} product={product} /> //
        ))}
      </div>
    </div>
  );
};

export default DiscoverMore;
"use client";

import React, { useMemo } from 'react';
import ProductCard from './ProductCard'; //
import productData from "@/data/productData.json"; //

const RefinedSelection = () => {
  // Logic to pick 8 random active products from the JSON
  const refinedProducts = useMemo(() => {
    if (!productData?.products) return [];

    // Filter only active products to ensure availability
    const activeProducts = productData.products.filter(p => p.active); //

    // Shuffle and pick 8 products
    return [...activeProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
  }, []);

  return (
    <div className="bg-white py-16 px-4 md:px-8 max-w-[1440px] mx-auto font-sans">
      {/* --- Header Section --- */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <p className="text-sm md:text-base font-medium text-gray-800 leading-relaxed font-mont">
          A refined selection of our most sought-after designs, defined by craftsmanship, elegance, and contemporary appeal.
        </p>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
        {refinedProducts.map((product) => (
          <ProductCard key={product._id} product={product} /> //
        ))}
      </div>
    </div>
  );
};

export default RefinedSelection;
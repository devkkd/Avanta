"use client";

import React, { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { LayoutGrid, Maximize2, ChevronDown } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import mainCategories from "@/data/MainCategory.json";
import subCategories from "@/data/CategoryData.json";
import productData from "@/data/ProductData.json";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function CategoryPage() {
  const { category_slug } = useParams();

  const searchParams = useSearchParams();
  const subFromURL = searchParams.get("sub");

  const [activeSub, setActiveSub] = useState(subFromURL || null);

  const [sortBy, setSortBy] = useState("default");



  /* ================= MAIN CATEGORY ================= */
  const currentCategory =
    mainCategories.find((cat) => cat.slug === category_slug) ||
    mainCategories[0];

  const categoryId = currentCategory._id;

  useEffect(() => {
    setActiveSub(subFromURL || null);
  }, [subFromURL, categoryId]);

  /* ================= SUBCATEGORIES ================= */
  const currentSubcategories = useMemo(() => {
    return subCategories
      .filter(
        (sub) => sub.categoryId === categoryId && sub.isActive
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categoryId]);

  /* ================= PRODUCT COUNT MAP ================= */
  const productCountBySubcategory = useMemo(() => {
    const counts = {};

    productData.products.forEach((product) => {
      if (!product.active) return;
      if (product.categoryId !== categoryId) return;
      if (!product.subcategoryId) return;

      counts[product.subcategoryId] =
        (counts[product.subcategoryId] || 0) + 1;
    });

    return counts;
  }, [categoryId]);

  /* ================= FILTER + SORT PRODUCTS ================= */
  const filteredProducts = useMemo(() => {
    let products = productData.products.filter((product) => {
      if (!product.active) return false;
      if (product.categoryId !== categoryId) return false;
      if (!activeSub) return true;
      return product.subcategoryId === activeSub;
    });

    if (sortBy === "low-high") {
      products.sort(
        (a, b) => a.priceRange.min - b.priceRange.min
      );
    }

    if (sortBy === "high-low") {
      products.sort(
        (a, b) => b.priceRange.max - a.priceRange.max
      );
    }

    return products;
  }, [categoryId, activeSub, sortBy]);

  /* ================= RENDER ================= */
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen bg-white">
      {/* ================= TITLE ================= */}
      <h1 className="text-center text-3xl md:text-4xl font-cinzel font-bold tracking-[0.2em] text-gray-900 mb-10 uppercase">
        {currentCategory.name}
      </h1>

      {/* ================= SUBCATEGORY PILLS ================= */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
        {/* ALL */}
        <button
          onClick={() => setActiveSub(null)}
          className={`px-4 py-2 rounded-full text-[11px] md:text-xs font-medium transition-all duration-300 border
            ${activeSub === null
              ? "bg-black text-white border-black"
              : "bg-gray-50 text-gray-500 border-transparent hover:border-gray-200"
            }`}
        >
          All
        </button>

        {currentSubcategories.map((sub) => {
          const count = productCountBySubcategory[sub._id] || 0;

          return (
            <button
              key={sub._id}
              onClick={() => setActiveSub(sub._id)}
              className={`px-4 py-2 rounded-full text-[11px] md:text-xs font-medium transition-all duration-300 border flex items-center gap-2
                ${activeSub === sub._id
                  ? "bg-black text-white border-black"
                  : "bg-gray-50 text-gray-500 border-transparent hover:border-gray-200"
                }`}
            >
              <span>{sub.name}</span>
              <span className="text-[10px] opacity-70">
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= TOOLBAR ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 border-b border-gray-100 pb-5 gap-4">
        {/* Sort */}
        <div className="relative w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none border border-gray-300 rounded-lg px-4 py-2 pr-10 text-xs focus:outline-none bg-white cursor-pointer w-full sm:w-48 text-gray-600"
          >
            <option value="default">Sort by: Default</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            size={14}
          />
        </div>

        {/* View Icons */}
        <div className="flex items-center gap-5 text-gray-400">
          <span className="text-[11px] uppercase tracking-wider font-medium">
            View
          </span>
          <button className="p-1.5 bg-black text-white rounded-md">
            <LayoutGrid size={18} />
          </button>
          <button className="p-1.5 hover:text-black transition-colors">
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-sm py-20">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}

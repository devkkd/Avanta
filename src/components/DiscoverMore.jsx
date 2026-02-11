import React from 'react';
import ProductCard from './ProductCard'; // Ensure the path points to your shared component

const products = [
  { 
    id: 1, 
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 2, 
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 3, 
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 4, 
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 5, 
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 6, 
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 7, 
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 8, 
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop", 
    isNew: true,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
];

const DiscoverMore = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-8 max-w-[1440px] mx-auto font-sans">
      
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-[#1a1a1a] mb-6 uppercase tracking-normal">
          Discover More
        </h2>
        
        <p className="text-sm md:text-[15px] text-gray-700 max-w-3xl mx-auto leading-relaxed italic">
          Explore thoughtfully curated styles crafted to elevate every occasion; uncover what inspires you next.
        </p>
      </div>

      {/* --- Products Grid using Shared ProductCard --- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverMore;
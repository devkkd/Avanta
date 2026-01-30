import React from 'react';
import { MessageCircle } from 'lucide-react';

const products = [
  { id: 1, image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 2, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 3, image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 4, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 5, image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 6, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 7, image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 8, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop", isNew: true },
];

const DiscoverMore = () => {
  return (
    <div className="bg-white py-12 px-4 max-w-[1200px] mx-auto">
      
      {/* --- Header Section --- */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="h-[6px] w-[6px] bg-[#C51162] rounded-full"></span>
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#C51162] uppercase">
            Ananya By Jaipur Kurti Gharana
          </p>
          <span className="h-[6px] w-[6px] bg-[#C51162] rounded-full"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-[#1a1a1a]">
          Discover More
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
          Explore thoughtfully curated styles crafted to elevate every occasion; uncover what inspires you next.
        </p>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col">
            
            {/* Image Container with Border/Shadow effect like in UI */}
            <div className="relative aspect-[3/4] mb-3 overflow-hidden shadow-sm">
              {product.isNew && (
                <span className="absolute top-2 left-2 z-20 bg-[#C51162] text-white text-[9px] font-bold px-2 py-1 rounded shadow-md">
                  NEW
                </span>
              )}
              <img
                src={product.image}
                alt="Tunics Set"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="space-y-1">
              <h3 className="font-bold text-[#1a1a1a] text-[15px]">Tunics Set</h3>
              <p className="font-bold text-[#1a1a1a] text-[13px]">₹399 to ₹999</p>
              <p className="text-gray-500 text-[11px] leading-snug line-clamp-2">
                Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3">
                <button className="flex-1 border border-gray-300 rounded-full py-1.5 px-2 text-[9px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                  +Add to Cart
                </button>
                <button className="flex-1 border border-gray-300 rounded-full py-1.5 px-2 text-[9px] font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                  Enquiry
                </button>
                <button className="border border-gray-300 p-1.5 rounded-full text-gray-600 hover:text-green-600 transition-colors">
                  <MessageCircle size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverMore;
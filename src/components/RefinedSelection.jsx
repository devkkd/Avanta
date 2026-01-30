import React from 'react';
import { MessageCircle } from 'lucide-react';

const products = [
  { id: 1, image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", isNew: true },
  { id: 2, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop", isNew: true },
  { id: 3, image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 4, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 5, image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 6, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 7, image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop", isNew: false },
  { id: 8, image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop", isNew: true },
];

const RefinedSelection = () => {
  return (
    <div className="bg-white py-10 px-4 max-w-[1440px] mx-auto font-sans">
      {/* --- Header Section --- */}
      <div className="text-center mb-12 max-w-5xl mx-auto">
        <p className="text-[12px] font-mont md:text-[16px] text-[#0E0E0E] leading-relaxed">
          A refined selection of our most sought-after designs, defined by craftsmanship, elegance, and contemporary appeal.
        </p>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col">
            
            {/* Image Container */}
            <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#f9f9f9]">
              {product.isNew && (
                <span className="absolute top-3 left-3 z-20 bg-[#d81b60] text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase">
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
              <h3 className="font-bold text-[#1a1a1a] text-sm md:text-base">Tunics Set</h3>
              <p className="font-bold text-[#1a1a1a] text-sm">₹399 to ₹999</p>
              <p className="text-gray-600 text-[11px] md:text-[12px] leading-tight mb-4">
                Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3">
                <button className="flex-1 border border-gray-300 rounded-full py-2 px-1 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-colors">
                  +Add to Cart
                </button>
                <button className="flex-1 border border-gray-300 rounded-full py-2 px-1 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition-colors">
                  Enquiry
                </button>
                <button className="border border-gray-300 p-2 rounded-full hover:bg-green-500 hover:text-white transition-colors">
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefinedSelection;
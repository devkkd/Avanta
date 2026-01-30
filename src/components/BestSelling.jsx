import React from 'react';
import { MessageCircle } from 'lucide-react';

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop",
    title: "Tunics Set",
    price: "₹399 to ₹999",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    title: "Tunics Set",
    price: "₹399 to ₹999",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop",
    title: "Tunics Set",
    price: "₹399 to ₹999",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop",
    title: "Tunics Set",
    price: "₹399 to ₹999",
  },
];

const BestSelling = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-10 font-sans">
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
           <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
        </div>
        
        <h2 className="text-2xl md:text-4xl sm:py-3 font-bold font-cinzel text-[#1a1a3d] mb-6 uppercase ">
          Best Selling Products
        </h2>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col group">
            
            {/* Image Container */}
            <div className="relative aspect-[3/4.2] mb-4 overflow-hidden rounded-sm">
                {/* Background Curved Shape (Like in the image) */}
                <div className="absolute inset-0 bg-[#E8D9C5] opacity-50 transition-transform duration-500 group-hover:scale-105" 
                     style={{ borderRadius: '45% 45% 0 0' }}></div>
                
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 z-20 bg-[#D12E61] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase">
                    New
                </span>
            </div>

            {/* Product Details */}
            <div className="space-y-1 text-left px-1">
              <h3 className="font-bold text-[#1a1a1a] text-[17px]">{product.title}</h3>
              <p className="font-bold text-[#1a1a1a] text-[15px]">{product.price}</p>
              <p className="text-[#4a4a4a] text-[11px] leading-relaxed mb-4">
                Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3">
                <button className="flex-[1.8] border border-gray-300 hover:bg-[#1a1a3d] hover:text-white transition-colors text-[9px] font-bold py-2.5 rounded-full uppercase">
                  +Add to Cart
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-[#D12E61] hover:text-white transition-colors text-[9px] font-bold py-2.5 rounded-full uppercase text-center">
                  Enquiry
                </button>
                <button className="p-2 border border-gray-300 hover:bg-[#25D366] hover:text-white transition-colors rounded-full flex items-center justify-center">
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

export default BestSelling;
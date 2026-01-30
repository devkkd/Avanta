// import React from 'react';
// import { ShoppingCart, MessageCircle, Phone } from 'lucide-react';

// const products = [
//   {
//     id: 1,
//     image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", // Replace with your image
//     title: "Tunics Set",
//     price: "₹399 to ₹999",
//     desc: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.",
//     active: true,
//   },
//   {
//     id: 2,
//     image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
//     title: "Tunics Set",
//     price: "₹399 to ₹999",
//     desc: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.",
//     active: false,
//   },
//   {
//     id: 3,
//     image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop",
//     title: "Tunics Set",
//     price: "₹399 to ₹999",
//     desc: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.",
//     active: false,
//   },
//   {
//     id: 4,
//     image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop",
//     title: "Tunics Set",
//     price: "₹399 to ₹999",
//     desc: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.",
//     active: false,
//   },
// ];

// const CuratedArrivals = () => {
//   return (
//     <div className="bg-white py-16 px-4 sm:px-8 font-sans">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <div className="flex items-center justify-center gap-2 mb-4">
//           <span className="h-1.5 w-1.5 bg-pink-600 rounded-full"></span>
//           <span className="text-xs font-bold tracking-[0.2em] text-gray-800 uppercase">
//             Avanta by Jaipur Kurti Gharana
//           </span>
//           <span className="h-1.5 w-1.5 bg-pink-600 rounded-full"></span>
//         </div>
//         <h2 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-6 italic tracking-tight">
//           Curated New Arrivals
//         </h2>
//         <p className="max-w-3xl mx-auto text-gray-600 text-sm md:text-base leading-relaxed">
//           Discover our latest arrivals introduced five days a week. <br />
//           From Monday through Friday, explore newly launched styles arriving on-site, thoughtfully crafted to elevate your wardrobe with refined elegance.
//         </p>
//       </div>

//       {/* Grid Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
//         {products.map((product) => (
//           <div key={product.id} className="group">
//             {/* Product Image Container */}
//             <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm mb-4">
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               />
//               <span className="absolute top-3 left-3 bg-[#e91e63] text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
//                 New
//               </span>
//             </div>

//             {/* Product Details */}
//             <div className="space-y-2">
//               <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.title}</h3>
//               <p className="font-bold text-gray-900 text-sm">{product.price}</p>
//               <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2">
//                 {product.desc}
//               </p>

//               {/* Action Buttons */}
//               <div className="flex items-center gap-2 pt-4">
//                 {product.active ? (
//                   <>
//                     <button className="flex-1 bg-[#231f40] text-white text-[10px] font-bold py-3 px-2 rounded-full uppercase tracking-tight">
//                       +Add to Cart
//                     </button>
//                     <button className="flex-1 bg-[#e91e63] text-white text-[10px] font-bold py-3 px-2 rounded-full uppercase">
//                       Enquiry
//                     </button>
//                     <button className="p-2 bg-[#25d366] text-white rounded-full">
//                       <MessageCircle size={18} fill="currentColor" stroke="none" />
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button className="flex-1 border border-gray-200 text-gray-800 text-[10px] font-bold py-3 px-2 rounded-full uppercase tracking-tight hover:bg-gray-50">
//                       +Add to Cart
//                     </button>
//                     <button className="flex-1 border border-gray-200 text-gray-800 text-[10px] font-bold py-3 px-2 rounded-full uppercase hover:bg-gray-50">
//                       Enquiry
//                     </button>
//                     <button className="p-2 border border-gray-200 text-gray-400 rounded-full hover:bg-gray-50">
//                       <MessageCircle size={18} />
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CuratedArrivals;

import React from 'react';
import { MessageCircle } from 'lucide-react';

const products = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop",
    active: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    active: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop",
    active: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop",
    active: false,
  },
];

const CuratedArrivals = () => {
  return (
    <div className="bg-white py-12 px-6 font-sans tracking-tight">
      {/* --- Sub-Header Branding --- */}
       <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
        </div>
        
        <h2 className="text-2xl md:text-4xl sm:py-3 font-bold font-cinzel text-[#1a1a3d] mb-6 uppercase ">
         Curated New Arrivals
        </h2>
        
        <p className="text-[11px] font-mont md:text-sm font-medium text-[#0E0E0E] leading-relaxed px-4">
          Discover our latest arrivals introduced five days a week. <br></br>
From Monday through Friday, explore newly launched styles arriving on-site, thoughtfully crafted to elevate your wardrobe with refined elegance.
        </p>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 max-w-[1400px] mx-auto">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col">
            
            {/* Image Container with Subtle Arched Background Effect */}
            <div className="relative aspect-[3/4] mb-5 group cursor-pointer overflow-hidden rounded-sm bg-[#f3f3f3]">
                {/* Background design element (The arch in the image) */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#ebebeb] to-transparent opacity-40"></div>
                <img
                    src={product.image}
                    alt="Product"
                    className="w-full h-full object-cover relative z-10"
                />
                <span className="absolute top-3 left-3 z-20 bg-[#e91e63] text-white text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-widest">
                    New
                </span>
            </div>

            {/* Product Info */}
            <div className="space-y-1.5">
              <h3 className="font-bold font-mont text-[#1a1a1a] text-[16px]">Tunics Set</h3>
              <p className="font-bold font-mont text-[#1a1a1a] text-[14px]">₹399 to ₹999</p>
              <p className="text-black font-mont text-[12px] leading-snug">
                Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.
              </p>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 pt-4">
                {product.active ? (
                  <>
                    <button className="flex-[1.5]  border border-gray-300 hover:bg-[#1F1951] hover:text-white text-[10px] font-bold py-3.5 rounded-full uppercase tracking-tighter">
                      +Add to Cart
                    </button>
                    <button className="flex-1 hover:bg-[#DA295D] border border-gray-300 hover:text-white text-[10px] font-bold py-3.5 rounded-full uppercase">
                      Enquiry
                    </button>
                    <button className="p-2.5  border border-gray-300 hover:bg-[#00C349] hover:text-white rounded-full shadow-sm hover:opacity-90 transition-opacity">
                      <MessageCircle size={20} fill="currentColor" stroke="none" />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-[1.5]  border border-gray-300 hover:bg-[#1F1951] hover:text-white text-[10px] font-bold py-3.5 rounded-full uppercase tracking-tighter">
                      +Add to Cart
                    </button>
                    <button className="flex-1 hover:bg-[#DA295D] border border-gray-300 hover:text-white text-[10px] font-bold py-3.5 rounded-full uppercase">
                      Enquiry
                    </button>
                     <button className="p-2.5  border border-gray-300 hover:bg-[#00C349] hover:text-white rounded-full shadow-sm hover:opacity-90 transition-opacity">
                      <MessageCircle size={20} fill="currentColor" stroke="none" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CuratedArrivals;
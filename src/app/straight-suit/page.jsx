// import React from 'react';
// import { ChevronDown, LayoutGrid, Maximize2, ShoppingCart, MessageCircle, Phone } from 'lucide-react';
// import FAQ from '@/components/FAQ';
// import ContactUs from '@/components/ContactUs';
// import CraftsmanshipSection from '@/components/CraftsmanshipSection';

// const products = [
//   { id: 1, tag: 'NEW', title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=500' },
//   { id: 2, tag: 'NEW', title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500' },
//   { id: 3, tag: null, title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=500' },
//   { id: 4, tag: null, title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500' },
//   { id: 5, tag: null, title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500' },
//   { id: 6, tag: null, title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=500' },
//   { id: 7, tag: null, title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=500' },
//   { id: 8, tag: 'NEW', title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=500' },
// ];

// const SuitListing = () => {
//   return (
//     <div>
//     <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10 bg-white font-sans">
//       {/* Header Section */}
//       <div className="text-center mb-10">
//         <p className="text-sm font-semibold tracking-widest uppercase mb-1">Suits Set</p>
//         <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900 uppercase">
//           Straight Suit Sets
//         </h1>
//       </div>

//       {/* Filter Bar */}
//       <div className="flex justify-between items-center border-t border-gray-100 pt-6 mb-8">
//         <div className="relative group">
//           <button className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
//             SORT BY <ChevronDown size={14} />
//           </button>
//         </div>
        
//         <div className="flex items-center gap-4 text-gray-400">
//           <span className="text-[10px] uppercase font-bold text-gray-800">View</span>
//           <LayoutGrid size={18} className="text-blue-900 cursor-pointer" />
//           <div className="h-5 w-[1px] bg-gray-300"></div>
//           <Maximize2 size={18} className="cursor-pointer" />
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
//         {products.map((product) => (
//           <div key={product.id} className="group cursor-pointer">
//             {/* Image Container */}
//             <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
//               <img
//                 src={product.img}
//                 alt={product.title}
//                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//               />
//               {product.tag && (
//                 <span className="absolute top-3 left-3 bg-[#e91e63] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm">
//                   {product.tag}
//                 </span>
//               )}
//             </div>

//             {/* Product Info */}
//             <div className="space-y-1">
//               <h3 className="font-bold text-sm text-gray-900">{product.title}</h3>
//               <p className="text-sm font-semibold text-gray-800">{product.price}</p>
//               <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2">
//                 Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.
//               </p>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-2 mt-4">
//               <button className="flex-1 border border-gray-300 rounded-full py-2 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition">
//                 + Add to Cart
//               </button>
//               <button className="flex-1 border border-gray-300 rounded-full py-2 text-[10px] font-bold uppercase hover:bg-gray-100 transition">
//                 Enquiry
//               </button>
//               <button className="p-2 border border-gray-300 rounded-full hover:bg-green-50 transition text-green-600">
//                 <Phone size={14} fill="currentColor" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     <FAQ/>
//     <ContactUs/>
//     <CraftsmanshipSection/>
//     </div>
//   );
// };

// export default SuitListing;


'use client';

import React from 'react';
import { ChevronDown, LayoutGrid, Maximize2, ShoppingCart, MessageCircle, Phone, Heart } from 'lucide-react';
import FAQ from '@/components/FAQ';
import ContactUs from '@/components/ContactUs';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import { useProduct } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';

const products = [
  { id: 1, tag: 'NEW', title: 'Tunics Set', price: '₹399 to ₹999', img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=500' },
  { id: 2, tag: 'NEW', title: 'Designer Suit Set', price: '₹1299 to ₹1999', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500' },
  { id: 3, tag: null, title: 'Party Wear Set', price: '₹599 to ₹1199', img: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=500' },
  { id: 4, tag: null, title: 'Casual Wear Set', price: '₹499 to ₹899', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500' },
  { id: 5, tag: null, title: 'Formal Suit Set', price: '₹1799 to ₹2499', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500' },
  { id: 6, tag: null, title: 'Evening Gown Set', price: '₹999 to ₹1599', img: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=500' },
  { id: 7, tag: null, title: 'Bridal Suit Set', price: '₹2999 to ₹4999', img: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=500' },
  { id: 8, tag: 'NEW', title: 'Traditional Set', price: '₹799 to ₹1399', img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=500' },
];

const SuitListing = () => {
  const router = useRouter();
  const { addToCart, addToWishlist } = useProduct();
  const [sortOption, setSortOption] = React.useState('default');
  const [viewMode, setViewMode] = React.useState('grid');

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  const handleAddToWishlist = (e, product) => {
    e.stopPropagation();
    addToWishlist(product);
    alert(`${product.title} added to wishlist!`);
  };

  const handleQuickEnquiry = (e, productId) => {
    e.stopPropagation();
    router.push(`/products/${productId}#enquiry-form`);
  };

  // Sort products based on selected option
  const sortedProducts = React.useMemo(() => {
    const sorted = [...products];
    switch(sortOption) {
      case 'price-low-high':
        return sorted.sort((a, b) => {
          const priceA = parseInt(a.price.match(/\d+/)[0]);
          const priceB = parseInt(b.price.match(/\d+/)[0]);
          return priceA - priceB;
        });
      case 'price-high-low':
        return sorted.sort((a, b) => {
          const priceA = parseInt(a.price.match(/\d+/)[0]);
          const priceB = parseInt(b.price.match(/\d+/)[0]);
          return priceB - priceA;
        });
      case 'newest':
        return sorted.filter(p => p.tag === 'NEW').concat(sorted.filter(p => p.tag !== 'NEW'));
      default:
        return sorted;
    }
  }, [sortOption]);

  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-10 bg-white font-sans">
        {/* Header Section */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest uppercase mb-1">Suits Set</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900 uppercase">
            Straight Suit Sets
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our exclusive collection of premium suit sets, crafted with precision and style for every occasion.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-100 pt-6 mb-8 gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="relative group">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="flex items-center gap-2 border border-gray-300 rounded-full px-5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition appearance-none cursor-pointer"
              >
                <option value="default">SORT BY: Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            {/* Filter buttons */}
            <button className="border border-gray-300 rounded-full px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
              Size: All
            </button>
            <button className="border border-gray-300 rounded-full px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
              Color: All
            </button>
            <button className="border border-gray-300 rounded-full px-4 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition">
              Price Range
            </button>
          </div>
          
          <div className="flex items-center gap-4 text-gray-400">
            <span className="text-[10px] uppercase font-bold text-gray-800">View</span>
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1 ${viewMode === 'grid' ? 'text-blue-900' : 'text-gray-400'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <div className="h-5 w-[1px] bg-gray-300"></div>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1 ${viewMode === 'list' ? 'text-blue-900' : 'text-gray-400'}`}
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-x-6 gap-y-12`}>
          {sortedProducts.map((product) => (
            <div 
              key={product.id} 
              className={`group cursor-pointer ${viewMode === 'list' ? 'flex gap-6 items-start' : ''}`}
              onClick={() => handleProductClick(product.id)}
            >
              {/* Image Container */}
              <div className={`relative overflow-hidden bg-gray-100 mb-4 ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-[3/4]'}`}>
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#e91e63] text-white text-[10px] font-bold px-2.5 py-1 rounded-sm">
                    {product.tag}
                  </span>
                )}
                <button 
                  onClick={(e) => handleAddToWishlist(e, product)}
                  className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart size={16} className="text-gray-700" />
                </button>
              </div>

              {/* Product Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-gray-900">{product.title}</h3>
                  <p className="text-sm font-semibold text-gray-800">{product.price}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.
                    {viewMode === 'list' && ' Perfect for both casual and formal occasions. Made with premium fabric for maximum comfort.'}
                  </p>
                  
                  {/* Additional info for list view */}
                  {viewMode === 'list' && (
                    <div className="mt-4 text-xs text-gray-600">
                      <div className="flex gap-4">
                        <span>Material: 100% Cotton</span>
                        <span>Care: Machine Wash</span>
                        <span>Delivery: 5-7 Days</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className={`flex items-center gap-2 ${viewMode === 'list' ? 'mt-6' : 'mt-4'}`}>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="flex-1 border border-gray-300 rounded-full py-2 text-[10px] font-bold uppercase hover:bg-black hover:text-white transition"
                  >
                    + Add to Cart
                  </button>
                  <button 
                    onClick={(e) => handleQuickEnquiry(e, product.id)}
                    className="flex-1 border border-gray-300 rounded-full py-2 text-[10px] font-bold uppercase hover:bg-gray-100 transition"
                  >
                    Enquiry
                  </button>
                  <button className="p-2 border border-gray-300 rounded-full hover:bg-green-50 transition text-green-600">
                    <Phone size={14} fill="currentColor" />
                  </button>
                  {viewMode === 'list' && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/products/${product.id}`);
                      }}
                      className="border border-gray-300 rounded-full px-4 py-2 text-[10px] font-bold uppercase hover:bg-blue-50 hover:text-blue-700 transition"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-16">
          <button className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50">
            &lt;
          </button>
          {[1, 2, 3, 4, 5].map(num => (
            <button 
              key={num}
              className={`border rounded-full w-8 h-8 flex items-center justify-center text-sm ${num === 1 ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              {num}
            </button>
          ))}
          <button className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50">
            &gt;
          </button>
        </div>
      </div>
      <FAQ/>
      <ContactUs/>
      <CraftsmanshipSection/>
    </div>
  );
};

export default SuitListing;
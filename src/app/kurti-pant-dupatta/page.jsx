'use client';

import React from 'react';
import { ChevronDown, LayoutGrid, Maximize2, ShoppingCart, MessageCircle, Phone, Heart } from 'lucide-react';
import FAQ from '@/components/FAQ';
import ContactUs from '@/components/ContactUs';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import { useProduct } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';

const products = [
  { id: 1, tag: 'NEW', title: 'Kurti Pant Dupatta Set', price: '₹699 to ₹1299', img: 'https://images.unsplash.com/photo-1629284290363-4167f4e06890?q=80&w=500' },
  { id: 2, tag: 'NEW', title: 'Designer Kurti Set', price: '₹999 to ₹1799', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500' },
  { id: 3, tag: null, title: 'Party Wear Kurti Set', price: '₹899 to ₹1599', img: 'https://images.unsplash.com/photo-1578926314433-8b96265f4d3f?q=80&w=500' },
  { id: 4, tag: null, title: 'Casual Kurti Set', price: '₹499 to ₹899', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=500' },
  { id: 5, tag: null, title: 'Formal Kurti Set', price: '₹1199 to ₹1999', img: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?q=80&w=500' },
  { id: 6, tag: null, title: 'Evening Kurti Set', price: '₹799 to ₹1399', img: 'https://images.unsplash.com/photo-1629284290363-4167f4e06890?q=80&w=500' },
  { id: 7, tag: null, title: 'Wedding Kurti Set', price: '₹2299 to ₹3999', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=500' },
  { id: 8, tag: 'NEW', title: 'Traditional Kurti Set', price: '₹599 to ₹1199', img: 'https://images.unsplash.com/photo-1578926314433-8b96265f4d3f?q=80&w=500' },
];

const KurtiListing = () => {
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
          <p className="text-sm font-semibold tracking-widest uppercase mb-1">Ethnic Wear</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900 uppercase">
            Kurti Pant Dupatta Sets
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Discover our exclusive collection of elegant kurti-pant-dupatta sets, crafted with tradition and modern style for every celebration.
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
                    Elegant and comfortable kurti pant dupatta set perfect for traditional and casual occasions.
                    {viewMode === 'list' && ' Crafted with premium fabrics and traditional designs, perfect for every celebration.'}
                  </p>
                  
                  {/* Additional info for list view */}
                  {viewMode === 'list' && (
                    <div className="mt-4 text-xs text-gray-600">
                      <div className="flex gap-4">
                        <span>Material: Cotton Blend</span>
                        <span>Care: Hand Wash</span>
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

export default KurtiListing;

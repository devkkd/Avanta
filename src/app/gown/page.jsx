'use client';

import React from 'react';
import { ChevronDown, LayoutGrid, Maximize2, ShoppingCart, MessageCircle, Phone, Heart } from 'lucide-react';
import FAQ from '@/components/FAQ';
import ContactUs from '@/components/ContactUs';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import { useProduct } from '@/context/ProductContext';
import { useRouter } from 'next/navigation';

const products = [
  { id: 1, tag: 'NEW', title: 'Elegant Evening Gown', price: '₹1799 to ₹3499', img: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=500' },
  { id: 2, tag: 'NEW', title: 'Designer Evening Gown', price: '₹2299 to ₹4199', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500' },
  { id: 3, tag: null, title: 'Party Gown', price: '₹1599 to ₹2999', img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=500' },
  { id: 4, tag: null, title: 'Wedding Gown', price: '₹2899 to ₹5999', img: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500' },
  { id: 5, tag: null, title: 'Formal Gown', price: '₹1999 to ₹3699', img: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=500' },
  { id: 6, tag: null, title: 'Cocktail Gown', price: '₹1699 to ₹3199', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500' },
  { id: 7, tag: null, title: 'Royal Gown', price: '₹3299 to ₹5999', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500' },
  { id: 8, tag: 'NEW', title: 'Bridal Gown', price: '₹4299 to ₹7999', img: 'https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?q=80&w=500' },
];

const GownListing = () => {
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
          <p className="text-sm font-semibold tracking-widest uppercase mb-1">Premium Collection</p>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-gray-900 uppercase">
            Gowns
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Experience timeless elegance with our exquisite collection of gowns, perfect for weddings, parties, and unforgettable celebrations.
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
                    Stunning gown collection featuring exquisite designs perfect for special celebrations.
                    {viewMode === 'list' && ' Premium fabrics with intricate embroidery and elegant silhouettes for unforgettable moments.'}
                  </p>
                  
                  {/* Additional info for list view */}
                  {viewMode === 'list' && (
                    <div className="mt-4 text-xs text-gray-600">
                      <div className="flex gap-4">
                        <span>Material: Silk/Net/Georgette</span>
                        <span>Care: Dry Clean</span>
                        <span>Delivery: 10-14 Days</span>
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

export default GownListing;

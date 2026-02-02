// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Heart, Share2, IndianRupee, MessageCircle, Phone } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import { useProduct } from '@/context/ProductContext';
// import Link from 'next/link';

// const ProductDetailsPage = ({ params }) => {
//   const router = useRouter();
//   const { addToCart, addToWishlist } = useProduct();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [quantity, setQuantity] = useState(1);
//   const [productId, setProductId] = useState(null);
//   const [showEnquiryForm, setShowEnquiryForm] = useState(false);
//   const [enquiryForm, setEnquiryForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });

//   // Get product ID from params
//   useEffect(() => {
//     const getProductId = async () => {
//       const resolvedParams = await params;
//       setProductId(resolvedParams.id);
//     };
//     getProductId();
//   }, [params]);

//   // Fetch product details
//   useEffect(() => {
//     if (!productId) return;

//     const fetchProduct = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`/api/products/${productId}`);
//         const data = await response.json();

//         if (data.success) {
//           setProduct(data.data);
//           // Set first available size as default
//           if (data.data.sizes && data.data.sizes.length > 0) {
//             const firstAvailableSize = data.data.sizes.find(size => size.available);
//             if (firstAvailableSize) {
//               setSelectedSize(firstAvailableSize.size);
//             }
//           }
//         } else {
//           console.error('Product not found');
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   // Get all product images (main + gallery)
//   const getAllImages = () => {
//     if (!product || !product.images) return [];
//     const images = [];
//     if (product.images.main) images.push(product.images.main);
//     if (product.images.gallery) images.push(...product.images.gallery);
//     return images;
//   };

//   const allImages = getAllImages();

//   // Handle image navigation
//   const nextImage = () => {
//     setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
//   };

//   const prevImage = () => {
//     setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
//   };

//   // Handle add to cart
//   const handleAddToCart = () => {
//     if (!selectedSize) {
//       alert('Please select a size');
//       return;
//     }
    
//     const cartItem = {
//       ...product,
//       selectedSize,
//       quantity
//     };
    
//     addToCart(cartItem);
//     alert(`${product.name} added to cart!`);
//   };

//   // Handle enquiry form submission
//   const handleEnquirySubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the enquiry to your backend
//     console.log('Enquiry submitted:', enquiryForm);
//     alert('Enquiry sent successfully! We will contact you soon.');
//     setShowEnquiryForm(false);
//     setEnquiryForm({ name: '', email: '', phone: '', message: '' });
//   };

//   // Get available stock for selected size
//   const getSelectedSizeStock = () => {
//     if (!selectedSize || !product.sizes) return 0;
//     const sizeData = product.sizes.find(size => size.size === selectedSize);
//     return sizeData ? sizeData.stock : 0;
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="animate-pulse">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div className="space-y-4">
//               <div className="aspect-square bg-gray-200 rounded"></div>
//               <div className="grid grid-cols-5 gap-2">
//                 {[1, 2, 3, 4, 5].map(i => (
//                   <div key={i} className="aspect-square bg-gray-200 rounded"></div>
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//               <div className="h-6 bg-gray-200 rounded w-1/2"></div>
//               <div className="h-20 bg-gray-200 rounded"></div>
//               <div className="h-40 bg-gray-200 rounded"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//         <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
//         <Link href="/" className="text-blue-600 hover:text-blue-800">
//           Return to Home
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Product Images */}
//         <div className="space-y-4">
//           {/* Main Image */}
//           <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
//             {allImages.length > 0 ? (
//               <img
//                 src={allImages[selectedImageIndex]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center">
//                 <span className="text-gray-400">No Image Available</span>
//               </div>
//             )}
            
//             {/* Navigation Arrows */}
//             {allImages.length > 1 && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
//                 >
//                   <ChevronLeft size={20} />
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
//                 >
//                   <ChevronRight size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Thumbnail Images */}
//           {allImages.length > 1 && (
//             <div className="grid grid-cols-5 gap-2">
//               {allImages.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
//                     selectedImageIndex === index ? 'border-black' : 'border-transparent'
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt={`${product.name} ${index + 1}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Information */}
//         <div className="space-y-6">
//           {/* Product Title and Price */}
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               {product.name.toUpperCase()}
//             </h1>
//             <div className="flex items-center gap-2 mb-4">
//               <IndianRupee size={20} className="text-gray-600" />
//               <span className="text-2xl font-bold text-gray-900">
//                 {product.priceRange?.min} to {product.priceRange?.max}
//               </span>
//             </div>
//             <p className="text-sm text-gray-600 mb-4">
//               Style Code: {product.styleCode} - {product.color?.name?.toUpperCase()}
//             </p>
//           </div>

//           {/* Product Description */}
//           <div className="space-y-4">
//             <p className="text-gray-700 leading-relaxed">
//               {product.description}
//             </p>
            
//             {/* Additional product highlights */}
//             <div className="space-y-2 text-sm text-gray-600">
//               <p>Crafted for modern versatility, our tunics balance refined style with all-day comfort.</p>
//               <p>Designed to transition seamlessly from casual to elevated looks, they pair effortlessly with leggings, denim, or tailored separates.</p>
//               <p>A timeless essential for contemporary wardrobes, each piece reflects understated elegance and everyday ease.</p>
//             </div>
//           </div>

//           {/* Product Sizes */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">PRODUCT SIZE</h3>
//             <div className="grid grid-cols-5 gap-2">
//               {product.sizes?.map((sizeData) => (
//                 <button
//                   key={sizeData.size}
//                   onClick={() => setSelectedSize(sizeData.size)}
//                   disabled={!sizeData.available || sizeData.stock === 0}
//                   className={`py-3 px-4 border text-sm font-medium transition-colors ${
//                     selectedSize === sizeData.size
//                       ? 'border-black bg-black text-white'
//                       : sizeData.available && sizeData.stock > 0
//                       ? 'border-gray-300 hover:border-gray-400'
//                       : 'border-gray-200 text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   {sizeData.size}
//                 </button>
//               ))}
//             </div>
//             {selectedSize && (
//               <p className="text-sm text-gray-600 mt-2">
//                 Stock available: {getSelectedSizeStock()} pieces
//               </p>
//             )}
//           </div>

//           {/* Product Details */}
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">PRODUCT DETAILS</h3>
//             <div className="space-y-2 text-sm">
//               <div>
//                 <span className="font-medium">Material:</span> {product.productDetails?.material}
//               </div>
//               <div>
//                 <span className="font-medium">Product Care:</span> {product.productDetails?.productCare}
//               </div>
//               {product.productDetails?.additionalInfo && (
//                 <div>
//                   <span className="font-medium">Additional Info:</span> {product.productDetails.additionalInfo}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="space-y-4">
//             <div className="flex gap-4">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={!product.isActive || !selectedSize || getSelectedSizeStock() === 0}
//                 className="flex-1 bg-[#2D3748] text-white py-4 px-6 rounded-full font-semibold hover:bg-[#1A202C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 +Add to Cart
//               </button>
//               <button
//                 onClick={() => setShowEnquiryForm(true)}
//                 className="flex-1 bg-[#E53E3E] text-white py-4 px-6 rounded-full font-semibold hover:bg-[#C53030] transition-colors"
//               >
//                 Enquiry
//               </button>
//               <button className="bg-[#25D366] text-white py-4 px-6 rounded-full hover:bg-[#128C7E] transition-colors">
//                 <MessageCircle size={20} fill="currentColor" />
//               </button>
//             </div>

//             {/* Wishlist and Share */}
//             <div className="flex gap-4">
//               <button
//                 onClick={() => addToWishlist(product)}
//                 className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
//               >
//                 <Heart size={20} />
//                 Add to Wishlist
//               </button>
//               <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
//                 <Share2 size={20} />
//                 Share Product
//               </button>
//             </div>
//           </div>

//           {/* Send Product Enquiry Section */}
//           <div className="border-t pt-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Product Enquiry</h3>
//             <p className="text-sm text-gray-600 mb-4">
//               Select your products and add them to the "Add to Cart" to send one combined enquiry with a single click. You can also send an enquiry for a single product by clicking the "Enquiry Now" button.
//             </p>
//             <button
//               onClick={() => setShowEnquiryForm(true)}
//               className="text-blue-600 hover:text-blue-800 font-medium"
//             >
//               Send Enquiry Now →
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Enquiry Form Modal */}
//       {showEnquiryForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-xl font-bold mb-4">Product Enquiry</h2>
//             <form onSubmit={handleEnquirySubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={enquiryForm.name}
//                   onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   value={enquiryForm.email}
//                   onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone *
//                 </label>
//                 <input
//                   type="tel"
//                   value={enquiryForm.phone}
//                   onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Message
//                 </label>
//                 <textarea
//                   value={enquiryForm.message}
//                   onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
//                   rows="4"
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder={`I'm interested in ${product.name} (${product.styleCode})`}
//                 />
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Send Enquiry
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowEnquiryForm(false)}
//                   className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetailsPage;

'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, IndianRupee, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useProduct } from '@/context/ProductContext';
import Link from 'next/link';

const ProductDetailsPage = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
          if (data.data.sizes?.length > 0) {
            setSelectedSize(data.data.sizes.find(s => s.available)?.size || '');
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const allImages = product ? [product.images.main, ...(product.images.gallery || [])] : [];

  if (loading || !product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10 font-sans">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* LEFT: IMAGE SECTION (Vertical Thumbnails + Main Image) */}
        <div className="flex gap-4 w-full lg:w-3/5">
          {/* Vertical Thumbnails */}
          <div className="hidden md:flex flex-col gap-3 w-20">
            {allImages.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`cursor-pointer border-2 aspect-[3/4] overflow-hidden ${selectedImageIndex === idx ? 'border-gray-800' : 'border-transparent'}`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Main Image Carrier */}
          <div className="relative flex-1 bg-gray-50  overflow-hidden">
            <img 
              src={allImages[selectedImageIndex]} 
              className="w-full h-full object-cover transition-all duration-500"
              alt="Main Product"
            />
            {/* Arrows */}
            <button 
              onClick={() => setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setSelectedImageIndex((prev) => (prev + 1) % allImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* RIGHT: CONTENT SECTION */}
        <div className="w-full lg:w-2/5 space-y-6">
          <header>
            <h1 className="text-3xl font-serif text-gray-800 tracking-wide">
              {product.name.toUpperCase()} (PRODUCT NAME)
            </h1>
            <div className="flex items-center text-xl font-semibold mt-2 text-gray-900">
              <span className="text-lg">₹</span>
              <span>{product.priceRange?.min} to ₹{product.priceRange?.max}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 tracking-widest">
              Style Code : {product.styleCode} - {product.color?.name?.toUpperCase() || 'LIME GREEN'}
            </p>
          </header>

          <div className="text-sm text-gray-600 leading-relaxed space-y-4 border-b pb-6">
            <p>Crafted for modern versatility, our tunics balance refined style with all-day comfort.</p>
            <p>Designed to transition seamlessly from casual to elevated looks, they pair effortlessly with leggings, denim, or tailored separates.</p>
            <p>A timeless essential for contemporary wardrobes, each piece reflects understated elegance and everyday ease.</p>
          </div>

          {/* Size Selection */}
          <section>
            <h3 className="text-sm font-bold tracking-widest mb-4">PRODUCT SIZE</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes?.map((s) => (
                <button
                  key={s.size}
                  onClick={() => setSelectedSize(s.size)}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center text-xs transition-all
                    ${selectedSize === s.size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-black text-gray-800'}
                  `}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </section>

          {/* Product Details Table-style */}
          <section className="pt-4">
            <h3 className="text-sm font-bold tracking-widest mb-4">PRODUCT DETAILS</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p><span className="font-bold">Material :</span> {product.productDetails?.material || 'Viscose Chinnon (100% Viscose)'}</p>
              <p><span className="font-bold">Product Care :</span> {product.productDetails?.productCare || 'Professional Dry Clean Only'}</p>
            </div>
          </section>

          {/* Action Buttons - EXACT IMAGE UI */}
          <section className="flex items-center gap-3 pt-4">
            <button className="flex-1 bg-[#1e224f] text-white py-3 px-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all">
              +Add to Cart
            </button>
            <button className="flex-1 bg-[#d6336c] text-white py-3 px-2 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all">
              Enquiry
            </button>
            <button className="bg-[#25D366] text-white p-3 rounded-full hover:bg-opacity-90">
              <MessageCircle size={24} fill="white" />
            </button>
          </section>

          {/* Footer Enquiry Text */}
          <div className="pt-6 border-t">
            <h4 className="font-bold text-sm mb-2">Send Product Enquiry</h4>
            <p className="text-[11px] text-gray-500 leading-normal">
              Select your products and add them to the <span className="font-bold">"+Add to Cart"</span> to send one combined enquiry with a single click. You can also send an enquiry for a single product by clicking the <span className="font-bold">"Enquiry Now"</span> button.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
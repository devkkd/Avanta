import React from 'react';
import ProductCard from './ProductCard';

const bestSellingProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop",
    title: "Premium Tunics Set",
    price: "₹999 to ₹1499",
    description: "Our top-rated set featuring intricate embroidery and premium cotton fabric for all-day comfort.",
    isNew: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    title: "Royal Ethnic Wear",
    price: "₹1299 to ₹1999",
    description: "A customer favorite that combines traditional aesthetics with modern silhouettes.",
    isNew: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop",
    title: "Classic Office Set",
    price: "₹799 to ₹1199",
    description: "Designed for the modern woman, this set offers a sharp look with breathable fabric.",
    isNew: true,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop",
    title: "Daily Grace Tunics",
    price: "₹499 to ₹899",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.",
    isNew: false,
  },
];

const BestSelling = () => {
  return (
    <div className="max-w-[1440px] mx-auto bg-white py-16 px-4 md:px-10 font-sans ">
      {/* --- Header Section --- */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-cinzel font-bold text-[#1a1a3d] mb-6 uppercase">
          Best Selling Products
        </h2>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {bestSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
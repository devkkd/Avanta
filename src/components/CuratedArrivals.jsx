import React from 'react';
import ProductCard from './ProductCard';

const dummyProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop",
    title: "Embroidered Tunics Set",
    price: "₹899 to ₹1299",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease.",
    isNew: true,
    active: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    title: "Cotton Printed Set",
    price: "₹399 to ₹799",
    description: "Breathable cotton fabric with artisanal prints, perfect for your daily elegant office wear.",
    isNew: true,
    active: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop",
    title: "Designer Kurti Set",
    price: "₹1499 to ₹1999",
    description: "Experience premium craftsmanship with our curated designer collection for special occasions.",
    isNew: true,
    active: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop",
    title: "Floral Tunics Set",
    price: "₹599 to ₹999",
    description: "Brighten your wardrobe with our summer-ready floral prints and relaxed silhouettes.",
    isNew: true,
    active: false,
  },
];

const CuratedArrivals = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-8 font-sans">
      {/* Branding & Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-1.5 w-1.5 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-xs md:text-[13px] font-bold tracking-wider text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 bg-[#DE3163] rounded-full"></span>
        </div>

        <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-[#1a1a1a] mb-6 uppercase">
          Curated New Arrivals
        </h2>

        <p className="text-sm md:text-[15px] font-normal text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Discover our latest arrivals introduced five days a week.<br className="hidden md:block" />
          From Monday through Friday, explore newly launched styles arriving on-site.
        </p>
      </div>

      {/* Grid rendering using map */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
        {dummyProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default CuratedArrivals;
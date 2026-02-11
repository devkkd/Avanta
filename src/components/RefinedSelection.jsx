import React from 'react';
import ProductCard from './ProductCard'; // Ensure the path is correct

const products = [
  { 
    id: 1, 
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", 
    isNew: true,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 2, 
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop", 
    isNew: true,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 3, 
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 4, 
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 5, 
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 6, 
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 7, 
    image: "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?q=80&w=1887&auto=format&fit=crop", 
    isNew: false,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
  { 
    id: 8, 
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=1887&auto=format&fit=crop", 
    isNew: true,
    title: "Tunics Set",
    price: "₹399 to ₹999",
    description: "Effortlessly elegant and endlessly versatile, our tunics move from day to evening with ease."
  },
];

const RefinedSelection = () => {
  return (
    <div className="bg-white py-16 px-4 md:px-8 max-w-[1440px] mx-auto font-sans">
      {/* --- Header Section --- */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <p className="text-sm md:text-base font-medium text-gray-800 leading-relaxed">
          A refined selection of our most sought-after designs, defined by craftsmanship, elegance, and contemporary appeal.
        </p>
      </div>

      {/* --- Products Grid --- */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RefinedSelection;
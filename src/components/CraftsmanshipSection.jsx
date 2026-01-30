import React from 'react';
import { Heart, Spool, Heater } from 'lucide-react'; // Using similar vector-style icons

const CraftsmanshipSection = () => {
  const features = [
    {
      title: "Handcrafted in Jaipur",
      description: "Tradition woven into every thread, meticulously made by hand.",
      // Custom icon logic or SVG to match the heart-in-hand
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-[#D81B60]">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          <path d="M7 14c2 0 4-1 5-3m0 0c1 2 3 3 5 3" />
        </svg>
      )
    },
    {
      title: "Ethical Craftsmanship",
      description: "Created with integrity, guided by values at every stage of the process.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-[#D81B60]">
          <ellipse cx="12" cy="5" rx="4" ry="2" />
          <path d="M8 5v10c0 2 2 4 4 4s4-2 4-4V5" />
          <path d="M8 10h8M8 13h8" />
        </svg>
      )
    },
    {
      title: "Jaipur Handblock Textiles",
      description: "Pure Jaipur craft, rooted in heritage, luxurious to wear.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-[#D81B60]">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 px-4 bg-white font-serif">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header Section */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#D81B60]"></span>
          <h4 className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#2D3436] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h4>
          <span className="w-2 h-2 rounded-full bg-[#D81B60]"></span>
        </div>

        <h2 className="text-2xl md:text-4xl font-medium text-[#1A1A1A] mb-16 tracking-tight uppercase">
          The Art of Thoughtful Craftsmanship
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {features.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col items-center px-8 md:px-12 ${
                index !== features.length - 1 ? 'md:border-r border-gray-200' : ''
              }`}
            >
              <div className="mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-[#1A1A1A] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-[250px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
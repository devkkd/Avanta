import React from 'react';
import Image from 'next/image';

const commitments = [
  {
    title: "Exceptional Cotton",
    description: "We source only the finest cottons, chosen for their superior softness, breathability, and longevity ensuring every garment offers an elevated wearing experience.",
    image: "/images/collection/kurti.svg", // Replace with your image paths
  },
  {
    title: "Heritage, Reimagined",
    description: "At Avanta India, centuries-old Indian craftsmanship is thoughtfully reinterpreted through a contemporary lens, resulting in designs that are timeless, refined, and distinctly modern.",
    image: "/images/collection/kurti.svg",
  },
  {
    title: "Bespoke by Design",
    description: "For those seeking exclusivity, our bespoke customization service offers a personalized approach to luxury crafted with precision, discretion, and uncompromising attention to detail.",
    image: "/images/collection/kurti.svg",
  }
];

const CommitmentSection = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto bg-white">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-pink-600"></span>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-800">
            Avanta by Jaipur Kurti Gharana
          </span>
          <span className="h-2 w-2 rounded-full bg-pink-600"></span>
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 uppercase tracking-tight">
          Our Commitment To You
        </h2>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {commitments.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Image Container with Rounded Corners */}
            <div className="relative w-full aspect-[4/3] mb-6 overflow-hidden rounded-xl">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Content */}
            <div className="text-center px-2">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommitmentSection;
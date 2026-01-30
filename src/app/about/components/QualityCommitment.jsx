import React from 'react';

const QualityCommitment = () => {
  const topFeatures = [
    {
      title: "Attention to Details",
      desc: "Every stitch, cut, and finish is intentionally refined.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: "Timeless Craftsmanship",
      desc: "Designs inspired by heritage, tailored for today.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Premium Fabrics",
      desc: "Only the finest cottons sourced for superior comfort and durability.",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  const bottomFeatures = [
    { title: "Custom Manufacturing", desc: "Private label and customization options available for bulk orders.", icon: "◆" },
    { title: "Flexible MOQ", desc: "Minimum order quantities designed for businesses of all sizes.", icon: "◇" },
    { title: "1,000+ Retailers", desc: "Trusted by boutiques & retailers across India & 15+ countries worldwide.", icon: "✦" },
    { title: "Global Shipping", desc: "Reliable worldwide delivery with comprehensive export support.", icon: "♣" }
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto font-serif text-[#1a1a1a]">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase mb-8">
          Our Commitment to Quality
        </h2>
        <div className="max-w-4xl mx-auto space-y-6 text-sm md:text-base leading-relaxed text-gray-700">
          <p>
            At <span className="font-bold">Avanta India</span>, quality is not an attribute it is our foundation. From selecting premium-grade cottons to executing flawless stitching, every step of our process is guided by precision and purpose.
          </p>
          <p>
            Our skilled artisans and designers work closely in Jaipur to deliver garments that embody elegance, comfort, and longevity. Regardless of order size, our standards remain exacting.
          </p>
        </div>
      </div>

      {/* Top Features Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-b border-gray-100 pb-12">
        {topFeatures.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center px-4 md:border-r last:border-0 border-gray-200">
            <div className="mb-4 text-[#1a237e]">{item.icon}</div>
            <h3 className="font-bold mb-2 uppercase tracking-tight">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom Features Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {bottomFeatures.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center px-4 md:border-r last:border-0 border-gray-200">
            <div className="text-2xl mb-4 text-[#1a237e]">{item.icon}</div>
            <h3 className="font-bold mb-2 text-sm uppercase tracking-tight">{item.title}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QualityCommitment;
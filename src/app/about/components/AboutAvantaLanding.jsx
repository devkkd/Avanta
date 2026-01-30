import React from 'react';

const AboutAvantaLanding = () => {
  return (
    <div className="bg-white font-serif">
      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
        
        {/* Left Side: Text Content */}
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-wide">
            DESIGNED FOR RESELLERS, <br />
            BUILT FOR SCALE
          </h1>
          
          <div className="space-y-6 text-gray-700 leading-relaxed text-sm md:text-base">
            <p>
              Our strength lies in bulk manufacturing with uncompromising quality. 
              Whether you are curating a seasonal drop, stocking a boutique, or fulfilling 
              large retail requirements, <span className="font-bold">Avanta India</span> offers scalable solutions without 
              sacrificing craftsmanship, fit consistency, or fabric integrity.
            </p>
            
            <p>
              Every design undergoes careful quality checks, from fabric sourcing to final 
              finishing, ensuring your customers receive garments that look refined, feel 
              luxurious, and endure repeated wear.
            </p>
          </div>
        </div>

        {/* Right Side: Image Section */}
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden">
             {/* Replace with your actual image path */}
            <img 
              src="/images/banner/banner-1.svg" 
              alt="Avanta India Designs"
              className="object-cover w-full h-full rounded-sm"
            />
          </div>
        </div>
      </div>

      {/* Bottom Banner Section */}
      <div className="bg-[#1a1a3d] py-8 md:py-12">
        <h2 className="text-white text-center text-2xl md:text-4xl font-medium tracking-[0.2em] uppercase px-4">
          Made with Care, Crafted in Jaipur
        </h2>
      </div>
    </div>
  );
};

export default AboutAvantaLanding;
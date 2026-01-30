import React from 'react';
import Image from 'next/image';

const CraftedHeritage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20 font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Image Gallery Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-4 h-full">
          {/* Large Vertical Image (Left) */}
          <div className="row-span-2 relative h-[300px] md:h-[500px]">
            <Image 
              src="/images/collection/anarkali.svg" 
              alt="Tailor working" 
              fill
              className="object-cover rounded-sm"
            />
          </div>
          
          {/* Top Right Image */}
          <div className="relative h-[145px] md:h-[242px]">
            <Image 
              src="/images/collection/anarkali.svg" 
              alt="Clothing rack" 
              fill
              className="object-cover rounded-sm"
            />
          </div>
          
          {/* Bottom Right - Nested Grid for the smaller workshop shots */}
          <div className="grid grid-cols-2 gap-2 h-[145px] md:h-[242px]">
            <div className="relative">
              <Image src="/images/collection/anarkali.svg" alt="Workshop" fill className="object-cover rounded-sm" />
            </div>
            <div className="relative">
              <Image src="/images/collection/anarkali.svg" alt="Factory" fill className="object-cover rounded-sm" />
            </div>
            <div className="relative col-span-2">
               <Image src="/images/collection/anarkali.svg" alt="Cutting table" fill className="object-cover rounded-sm" />
            </div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col justify-center text-center lg:text-right space-y-8">
          <header className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-serif tracking-widest text-gray-900 uppercase leading-tight">
              Crafted Heritage
            </h2>
            <h2 className="text-3xl md:text-5xl font-serif tracking-widest text-gray-900 uppercase leading-tight">
              Contemporary Elegance
            </h2>
          </header>

          <div className="space-y-6 text-gray-700 leading-relaxed max-w-xl ml-auto">
            <p className="text-sm md:text-base">
              At <span className="font-bold">Avanta India</span>, we specialize in 
              <span className="font-bold"> Kurti-Pant-Dupatta Sets, Anarkalis, Co-ord Sets</span>, 
              and curated ethnic ensembles, all meticulously produced using 
              <span className="font-bold"> 60*60 pure cotton and flex cotton fabrics</span>. 
              Renowned for their softness, breathability, and durability, these fabrics ensure 
              effortless comfort across seasons while retaining a refined, polished finish.
            </p>

            <p className="text-sm md:text-base italic">
              Each garment reflects the soul of Jaipur expressed through graceful silhouettes, 
              precise tailoring, and trend-aware design. From subtle daily wear to statement 
              festive pieces, our collections are designed to resonate with modern Indian 
              women while honoring timeless traditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftedHeritage;
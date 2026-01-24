"use client";
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "/images/banner/banner-1.svg", // Replace with your image path
    title: "THE LEGACY OF CRAFT UNITED WITH MODERN DISTINCTION",
    subtitle: "Premium B2B Wholesale Ethnic Wear"
  },
  {
    image: "/images/banner/banner-1.svg",
    title: "TRADITION REIMAGINED FOR THE MODERN WOMAN",
    subtitle: "Exquisite Collections for Discerning Resellers"
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000 })]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="relative overflow-hidden group" ref={emblaRef}>
      <div className="flex">
        {slides.map((slide, index) => (
          <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[500px] md:h-[750px]">
            {/* Background Image */}
            <img 
              src={slide.image} 
              alt="Model" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Gradient for better text readability */}
            <div className="absolute inset-0 bg-black/5" />

            {/* Central Content Card */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-[#801830] text-white p-8 md:p-12 rounded-[40px] max-w-sm  text-center shadow-2xl pointer-events-auto border border-white/10 relative">
                
                {/* Decorative Flourish (Optional SVG) */}
                <div className="mb-4 opacity-80">
                  {/* <svg width="100%" height="20" viewBox="0 0 200 20" fill="none" className="mx-auto">
                    <path d="M10 10C50 10 60 2 100 2C140 2 150 10 190 10" stroke="white" strokeWidth="0.5" />
                  </svg> */}

                  <img src='/images/banner/Group.svg'/>
                </div>

                <h2 className="text-2xl  md:text-4xl font-cinzel font-semibold leading-tight  mb-6">
                  {slide.title}
                </h2>
                
                <p className="text-sm md:text-2xl font-light font-mont  opacity-90 mb-8">
                  {slide.subtitle}
                </p>

                <button className="bg-white font-mont text-black px-8 py-3 rounded-full text-md font-bold hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto">
                  Explore Collections <span className="text-lg">↓</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={scrollPrev}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all z-20"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>

      <button 
        onClick={scrollNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-white transition-all z-20"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-8 bg-gray-800' : 'w-2 bg-gray-400'}`} />
        ))}
      </div>
    </div>
  );
}
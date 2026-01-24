// "use client";
// import React from 'react'
// import useEmblaCarousel from 'embla-carousel-react'
// import Autoplay from 'embla-carousel-autoplay'

// const announcements = [
//   "Welcome To Avanta India By Jaipur Kurti Gharana Thoughtfully Crafted To Celebrate Heritage, Purpose-built For Discerning Resellers.",
//   "New Collection Arriving Soon - Stay Tuned!",
//   "Free Shipping on Bulk Orders Above ₹10,000"
// ];

// export default function AnnouncementBar() {
//   // Initialize Embla with Autoplay plugin
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])

//   const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
//   const scrollNext = () => emblaApi && emblaApi.scrollNext()

//   return (
//     <div className="bg-[#1F1951] text-white py-1 px-4 relative group">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
        
//         {/* Left Arrow */}
//         <button 
//           onClick={scrollPrev}
//           className="z-10 p-1 hover:text-gray-300 transition-colors"
//           aria-label="Previous announcement"
//         >
//           <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>

//         {/* Carousel Viewport */}
//         <div className="overflow-hidden flex-1 mx-4" ref={emblaRef}>
//           <div className="flex">
//             {announcements.map((text, index) => (
//               <div 
//                 key={index} 
//                 className="flex-[0_0_100%] font-mon min-w-0 text-center text-[11px] md:text-xs tracking-wide font-light"
//               >
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Arrow */}
//         <button 
//           onClick={scrollNext}
//           className="z-10 p-1 hover:text-gray-300 transition-colors"
//           aria-label="Next announcement"
//         >
//           <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   )
// }

"use client";
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const announcements = [
  "Welcome To Avanta India By Jaipur Kurti Gharana Thoughtfully Crafted To Celebrate Heritage, Purpose-built For Discerning Resellers.",
  "New Collection Arriving Soon - Stay Tuned!",
  "Free Shipping on Bulk Orders Above ₹10,000"
];

export default function AnnouncementBar() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 30 // Smooth transition
  }, [Autoplay({ delay: 5000, stopOnInteraction: false })])

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()

  return (
    <div className="bg-[#1F1951] text-white py-2 px-4 overflow-hidden">
      <div className="max-w-[1920px] mx-auto flex items-center justify-center relative">
        {/* Left Arrow - Hidden on mobile, visible on tablet+ */}
        <button 
          onClick={scrollPrev}
          className="hidden md:block absolute left-4 z-10 p-1 hover:text-gray-300 transition-colors"
          aria-label="Previous announcement"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Carousel Container */}
        <div className="w-full md:w-[90%] lg:w-[80%] overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {announcements.map((text, index) => (
              <div 
                key={index} 
                className="flex-[0_0_100%] min-w-0 text-center px-4"
              >
                <p className="text-[10px] lg:text-xs font-light tracking-wide leading-tight font-mont">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow - Hidden on mobile, visible on tablet+ */}
        <button 
          onClick={scrollNext}
          className="hidden md:block absolute right-4 z-10 p-1 hover:text-gray-300 transition-colors"
          aria-label="Next announcement"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}



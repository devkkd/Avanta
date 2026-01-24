// "use client";
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation } from 'swiper/modules';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// // Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';

// const Manufacturing = () => {
//   const indiaCities = [
//     { name: "Jaipur", img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=200&h=200&fit=crop" },
//     { name: "Mumbai", img: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=200&h=200&fit=crop" },
//     { name: "Delhi / NCR", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=200&h=200&fit=crop" },
//     { name: "Bengaluru", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=200&h=200&fit=crop" },
//     { name: "Chennai", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=200&h=200&fit=crop" },
//     { name: "Hyderabad", img: "https://images.unsplash.com/photo-1574439243171-4682330a6c0c?q=80&w=200&h=200&fit=crop" },
//     { name: "Kolkata", img: "https://images.unsplash.com/photo-1558431382-bb7b60c49733?q=80&w=200&h=200&fit=crop" },
//     { name: "Pune", img: "https://images.unsplash.com/photo-1570533036812-7bbec9283f58?q=80&w=200&h=200&fit=crop" },
//     { name: "Ahmedabad", img: "https://images.unsplash.com/photo-1616423641454-ec4004928062?q=80&w=200&h=200&fit=crop" },
//     { name: "Surat", img: "https://images.unsplash.com/photo-1603504104085-05f32eb2c3f8?q=80&w=200&h=200&fit=crop" },
//   ];

//   const manufacturingSlides = [
//     "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=800&h=500&fit=crop",
//     "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?q=80&w=800&h=500&fit=crop",
//     "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&h=500&fit=crop",
//   ];

//   return (
//     <div className="bg-white font-mont overflow-hidden">
      
//       {/* SECTION 1: TRUSTED ACROSS INDIA (Image 1) */}
//       <section className="py-16 max-w-[1440px] mx-auto px-4">
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-2 mb-4">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#D13B7F]"></span>
//             <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#1a1a3d] uppercase">
//               Avanta by Jaipur Kurti Gharana
//             </span>
//             <span className="w-1.5 h-1.5 rounded-full bg-[#D13B7F]"></span>
//           </div>
//           <h2 className="text-2xl md:text-4xl font-serif text-[#1a1a3d] mb-4 uppercase tracking-wide">
//             Trusted Across India and the World
//           </h2>
//           <p className="text-[11px] md:text-sm text-gray-500 max-w-4xl mx-auto leading-relaxed">
//             Our kurtis and ethnic collections are worn in leading cities across India and in major global fashion hubs. From domestic markets to international demand, our reach reflects the growing appreciation for modern Indian style everywhere.
//           </p>
//         </div>

//         {/* India Cities Grid */}
//         <div className="mb-12">
//           <h3 className="text-center text-lg font-serif text-[#1a1a3d] mb-8 uppercase tracking-widest">India Top Cities</h3>
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
//             {indiaCities.map((city, idx) => (
//               <div key={idx} className="flex flex-col items-center group">
//                 <div className="w-full aspect-square overflow-hidden rounded-2xl shadow-sm border border-gray-100 mb-2">
//                   <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
//                 </div>
//                 <span className="text-[10px] md:text-[11px] font-bold text-[#1a1a3d] text-center uppercase tracking-tighter">
//                   {city.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* SECTION 2: MANUFACTURING SLIDER (Image 2) */}
//       <section className="py-16 bg-gray-50/50 relative">
//         <div className="max-w-[1440px] mx-auto px-4">
//           <div className="text-center mb-10">
//             <div className="flex items-center justify-center gap-2 mb-4">
//               <span className="w-1.5 h-1.5 rounded-full bg-[#D13B7F]"></span>
//               <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#1a1a3d] uppercase">
//                 Avanta by Jaipur Kurti Gharana
//               </span>
//               <span className="w-1.5 h-1.5 rounded-full bg-[#D13B7F]"></span>
//             </div>
//             <h2 className="text-2xl md:text-4xl font-serif text-[#1a1a3d] mb-4 uppercase tracking-wide">
//               We're Manufacturing What Matters
//             </h2>
//             <p className="text-[11px] md:text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
//               Discover the products we build and the expertise behind them. This gallery of videos and photos highlights Avanta's diverse manufacturing output, showcasing quality, scale, and performance across industries.
//             </p>
//           </div>

//           {/* Autoplay Slider */}
//           <div className="relative px-0 md:px-12 group">
//             <Swiper
//               modules={[Autoplay, Navigation]}
//               spaceBetween={20}
//               slidesPerView={1.2}
//               centeredSlides={true}
//               loop={true}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               navigation={{
//                 nextEl: '.swiper-button-next-custom',
//                 prevEl: '.swiper-button-prev-custom',
//               }}
//               breakpoints={{
//                 768: { slidesPerView: 2, centeredSlides: false },
//                 1024: { slidesPerView: 3, centeredSlides: false },
//               }}
//               className="manufacturing-swiper"
//             >
//               {manufacturingSlides.map((url, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="aspect-[4/5] md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-lg border-4 border-white">
//                     <img src={url} alt="Manufacturing" className="w-full h-full object-cover" />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>

//             {/* Custom Navigation Arrows */}
//             <div className="flex justify-center items-center gap-8 mt-8">
//               <button className="swiper-button-prev-custom p-2 hover:bg-gray-200 rounded-full transition-colors">
//                 <ChevronLeft className="w-6 h-6 text-gray-600" />
//               </button>
//               <button className="swiper-button-next-custom p-2 hover:bg-gray-200 rounded-full transition-colors">
//                 <ChevronRight className="w-6 h-6 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style jsx global>{`
//         .font-serif { font-family: 'Cinzel', serif; }
//         .font-mont { font-family: 'Montserrat', sans-serif; }
//       `}</style>
//     </div>
//   );
// };

// export default Manufacturing;

"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ManufacturingSlider = () => {
  const slides = [
    { id: 1, type: "image", url: "https://images.unsplash.com/photo-1558444458-5df0052159fa?q=80&w=1000", isVideo: false },
    { id: 2, type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", isVideo: true },
    { id: 3, type: "image", url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000", isVideo: false },
  ];

  return (
    <div className="w-full bg-white py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="h-2 w-2 bg-pink-600 rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
            AVANTA BY JAIPUR KURTI GHARANA
          </h3>
          <span className="h-2 w-2 bg-pink-600 rounded-full"></span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold font-cinzel text-[#1a1a3d] mb-6 uppercase ">
          WE’RE MANUFACTURING WHAT MATTERS
        </h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed px-4">
          Discover the products we build and the expertise behind them. This gallery of videos and photos highlights Avanta's diverse manufacturing output, showcasing quality, scale, and performance across industries.
        </p>
      </div>

      {/* Slider Section */}
      <div className="relative group max-w-[1400px] mx-auto">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1.2}
          centeredSlides={true}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".prev-btn",
            nextEl: ".next-btn",
          }}
          breakpoints={{
            640: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.5 },
          }}
          className="rounded-2xl overflow-hidden"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden bg-gray-100 relative shadow-lg">
                {slide.isVideo ? (
                  <video
                    src={slide.url}
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={slide.url}
                    alt="Manufacturing"
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Overlay for Video Icon (Optional) */}
                {slide.isVideo && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/30 backdrop-blur-md p-4 rounded-full">
                      <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="flex justify-center gap-6 mt-8">
          <button className="prev-btn p-2 hover:bg-gray-100 rounded-full transition-all border border-gray-300">
            <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="next-btn p-2 hover:bg-gray-100 rounded-full transition-all border border-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManufacturingSlider;
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

// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";

// // Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";

// const ManufacturingSlider = () => {
//   const slides = [
//     { id: 1, type: "image", url: "https://images.unsplash.com/photo-1558444458-5df0052159fa?q=80&w=1000", isVideo: false },
//     { id: 2, type: "video", url: "https://www.w3schools.com/html/mov_bbb.mp4", isVideo: true },
//     { id: 3, type: "image", url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000", isVideo: false },
//   ];

//   return (
//     <div className="w-full bg-white py-16 px-4">
//       {/* Header Section */}
//       <div className="text-center mb-12 max-w-4xl mx-auto">
//         <div className="flex items-center justify-center gap-2 mb-4">
//           <span className="h-2 w-2 bg-pink-600 rounded-full"></span>
//           <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
//             AVANTA BY JAIPUR KURTI GHARANA
//           </h3>
//           <span className="h-2 w-2 bg-pink-600 rounded-full"></span>
//         </div>
//         <h2 className="text-2xl md:text-4xl font-bold font-cinzel text-[#1a1a3d] mb-6 uppercase ">
//           WE’RE MANUFACTURING WHAT MATTERS
//         </h2>
//         <p className="text-gray-600 text-sm md:text-base leading-relaxed px-4">
//           Discover the products we build and the expertise behind them. This gallery of videos and photos highlights Avanta's diverse manufacturing output, showcasing quality, scale, and performance across industries.
//         </p>
//       </div>

//       {/* Slider Section */}
//       <div className="relative group max-w-[1400px] mx-auto">
//         <Swiper
//           modules={[Autoplay, Navigation]}
//           spaceBetween={20}
//           slidesPerView={1.2}
//           centeredSlides={true}
//           loop={true}
//           autoplay={{ delay: 3000, disableOnInteraction: false }}
//           navigation={{
//             prevEl: ".prev-btn",
//             nextEl: ".next-btn",
//           }}
//           breakpoints={{
//             640: { slidesPerView: 1.5 },
//             1024: { slidesPerView: 2.5 },
//           }}
//           className="rounded-2xl overflow-hidden"
//         >
//           {slides.map((slide) => (
//             <SwiperSlide key={slide.id}>
//               <div className="h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden bg-gray-100 relative shadow-lg">
//                 {slide.isVideo ? (
//                   <video
//                     src={slide.url}
//                     autoPlay
//                     muted
//                     loop
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <img
//                     src={slide.url}
//                     alt="Manufacturing"
//                     className="w-full h-full object-cover"
//                   />
//                 )}
                
//                 {/* Overlay for Video Icon (Optional) */}
//                 {slide.isVideo && (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="bg-white/30 backdrop-blur-md p-4 rounded-full">
//                       <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
//                         <path d="M8 5v14l11-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Custom Navigation Arrows */}
//         <div className="flex justify-center gap-6 mt-8">
//           <button className="prev-btn p-2 hover:bg-gray-100 rounded-full transition-all border border-gray-300">
//             <svg className="w-6 h-6 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//           <button className="next-btn p-2 hover:bg-gray-100 rounded-full transition-all border border-gray-300">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManufacturingSlider;

// "use client";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

// // Swiper styles import karein
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-coverflow";

// const ManufacturingSlider = () => {
//   const slides = [
//     { id: 1, videoUrl: "/images/videos/853800-hd_1920_1080_25fps.mp4", thumbnail: "/images/banner/banner-1.svg" },
//     { id: 2, videoUrl: "/images/videos/15459704-uhd_3840_2160_24fps.mp4", thumbnail: "/images/banner/banner-1.svg" },
//     { id: 3, videoUrl: "/images/videos/15459708-uhd_3840_2160_24fps.mp4", thumbnail: "/images/banner/banner-1.svg" },
//     { id: 4, videoUrl: "/images/videos/15459708-uhd_3840_2160_24fps.mp4", thumbnail: "/images/banner/banner-1.svg" },
//   ];

//   return (
//     <div className="bg-white py-16 px-4 font-sans">
//       {/* Header Section */}
//       <div className="text-center mb-12">
//         <div className="flex items-center justify-center gap-2 mb-4">
//           <span className="h-2 w-2 bg-pink-600 rounded-full"></span>
//           <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-800">
//             Avanta by Jaipur Kurti Gharana
//           </h3>
//           <span className="h-2 w-2 bg-pink-600 rounded-full"></span>
//         </div>
//         <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 uppercase tracking-wide">
//           We're Manufacturing What Matters
//         </h2>
//         <p className="max-w-3xl mx-auto text-gray-600 text-sm leading-relaxed">
//           Discover the products we build and the expertise behind them. This gallery of videos and photos highlights 
//           Avanta's diverse manufacturing output, showcasing quality, scale, and performance across industries.
//         </p>
//       </div>

//       {/* Slider Container */}
//       <div className="relative max-w-7xl mx-auto">
//         <Swiper
//           modules={[Navigation, Autoplay, EffectCoverflow]}
//           effect={"coverflow"}
//           grabCursor={true}
//           centeredSlides={true}
//           loop={true}
//           slidesPerView={1.5} // Center slide bada dikhega aur side wale thode cut honge
//           spaceBetween={80}
//           coverflowEffect={{
//             rotate: 0,
//             stretch: 0,
//             depth: 100,
//             modifier: 1,
//             slideShadows: false,
//           }}
//           breakpoints={{
//             640: { slidesPerView: 1.5 },
//             1024: { slidesPerView: 2.2 }, // Image jaisa look dene ke liye
//           }}
//           navigation={{
//             nextEl: ".swiper-button-next-custom",
//             prevEl: ".swiper-button-prev-custom",
//           }}
//           className="mySwiper !pb-12"
//         >
//           {slides.map((slide) => (
//             <SwiperSlide key={slide.id}>
//               {({ isActive }) => (
//                 <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${isActive ? 'h-[450px]' : 'h-[400px] mt-[25px]'}`}>
//                   {isActive ? (
//                     <video
//                       autoPlay
//                       muted
//                       loop
//                       playsInline
//                       className="w-full h-full object-cover"
//                     >
//                       <source src={slide.videoUrl} type="video/mp4" />
//                     </video>
//                   ) : (
//                     <div className="relative w-full h-full">
//                         <img 
//                           src={slide.thumbnail} 
//                           alt="Manufacturing" 
//                           className="w-full h-full object-cover brightness-75"
//                         />
//                         {/* Play Overlay Icon for non-active slides */}
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
//                                 <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
//                             </div>
//                         </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Custom Navigation Arrows */}
//         <div className="flex justify-center items-center gap-10 mt-8">
//           <button className="swiper-button-prev-custom cursor-pointer transition-transform hover:scale-125">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
//           </button>
//           <button className="swiper-button-next-custom cursor-pointer transition-transform hover:scale-125">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManufacturingSlider;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

// Swiper styles import karein
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const ManufacturingSlider = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const videoRefs = useRef([]);
  
  const slides = [
    { 
      id: 1, 
      videoUrl: "/images/videos/853800-hd_1920_1080_25fps.mp4", 
      thumbnail: "/images/banner/banner-1.svg",
      fallbackThumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: 2, 
      videoUrl: "/images/videos/15459704-uhd_3840_2160_24fps.mp4", 
      thumbnail: "/images/banner/banner-1.svg",
      fallbackThumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: 3, 
      videoUrl: "/images/videos/15459708-uhd_3840_2160_24fps.mp4", 
      thumbnail: "/images/banner/banner-1.svg",
      fallbackThumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: 4, 
      videoUrl: "/images/videos/15459708-uhd_3840_2160_24fps.mp4", 
      thumbnail: "/images/banner/banner-1.svg",
      fallbackThumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
  ];

  // Handle slide change to update active video
  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.realIndex);
    
    // Pause all videos
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
      }
    });
    
    // Play active video
    if (videoRefs.current[swiper.realIndex]) {
      const playPromise = videoRefs.current[swiper.realIndex].play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented:", error);
        });
      }
    }
  };

  // Handle play button click for non-active slides
  const handleThumbnailClick = (index) => {
    const swiper = document.querySelector('.mySwiper').swiper;
    swiper.slideToLoop(index);
  };

  // Initialize videos on mount
  useEffect(() => {
    // Play the first video on mount
    if (videoRefs.current[0]) {
      const playPromise = videoRefs.current[0].play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Auto-play prevented on mount:", error);
        });
      }
    }
  }, []);

  return (
    <div className="bg-white py-8 md:py-16 px-4 md:px-6 lg:px-8 font-sans">
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
        </div>
        
        <h2 className="text-2xl md:text-4xl sm:py-3 font-bold font-cinzel text-[#1a1a3d] mb-6 uppercase ">
          We're Manufacturing What Matters
        </h2>
        
        <p className="text-[11px] font-mont md:text-sm font-medium text-[#0E0E0E] leading-relaxed px-4">
          Discover the products we build and the expertise behind them. This gallery of videos and photos highlights 
          Avanta's diverse manufacturing output,<br></br> showcasing quality, scale, and performance across industries.
        </p>
      </div>

      {/* Slider Container */}
      <div className="relative max-w-5xl xl:max-w-7xl mx-auto">
        <Swiper
          modules={[Navigation, Autoplay, EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={1.2}
          spaceBetween={20}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 80,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            480: { 
              slidesPerView: 1.2,
              spaceBetween: 30 
            },
            640: { 
              slidesPerView: 1.5,
              spaceBetween: 40,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }
            },
            768: { 
              slidesPerView: 1.6,
              spaceBetween: 50 
            },
            1024: { 
              slidesPerView: 2.2,
              spaceBetween: 60,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 120,
                modifier: 1.2,
                slideShadows: false,
              }
            },
            1280: { 
              slidesPerView: 1.5,
              spaceBetween: 80 
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          onSlideChange={handleSlideChange}
          onSwiper={(swiper) => {
            // Initialize navigation after swiper is ready
            setTimeout(() => {
              swiper.navigation.init();
              swiper.navigation.update();
            }, 100);
          }}
          className="mySwiper !pb-10 md:!pb-12"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              {({ isActive }) => (
                <div 
                  className={`relative overflow-hidden rounded-xl md:rounded-2xl transition-all duration-500 ${
                    isActive 
                      ? 'h-[280px] sm:h-[320px] md:h-[380px] lg:h-[380px] shadow-xl' 
                      : 'h-[240px] sm:h-[280px] md:h-[340px] lg:h-[380px] brightness-90 hover:brightness-100 cursor-pointer'
                  }`}
                  onClick={() => !isActive && handleThumbnailClick(index)}
                >
                  {isActive ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={el => videoRefs.current[index] = el}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={slide.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {/* Active video indicator */}
                      {/* <div className="absolute top-4 right-4 bg-black/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                        <span>Now Playing</span>
                      </div> */}
                    </div>
                  ) : (
                    <div className="relative w-full h-full group">
                      {/* Fallback image in case thumbnail doesn't load */}
                      <img 
                        src={slide.thumbnail} 
                        alt="Manufacturing"
                        onError={(e) => {
                          e.target.src = slide.fallbackThumbnail;
                        }}
                        className="w-full h-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-300"
                      />
                      
                      {/* Gradient overlay for better text visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      
                      {/* Play Overlay Icon for non-active slides */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/40 transition-all duration-300">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] md:border-l-[12px] border-l-white border-b-[6px] border-b-transparent ml-0.5 md:ml-1"></div>
                        </div>
                      </div>
                      
                      {/* Hover text */}
                      <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-xs font-medium">Click to play</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="flex justify-center items-center gap-8 md:gap-10 mt-2">
          <button 
            className="swiper-button-prev-custom cursor-pointer transition-all hover:scale-125 p-2 rounded-full hover:bg-gray-100 active:scale-110"
            aria-label="Previous slide"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-800"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          
          {/* Slide indicators */}
          {/* <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  index === activeSlideIndex 
                    ? 'w-6 md:w-8 bg-pink-600' 
                    : 'w-2 md:w-3 bg-gray-300'
                }`}
              ></div>
            ))}
          </div> */}
          
          <button 
            className="swiper-button-next-custom cursor-pointer transition-all hover:scale-125 p-2 rounded-full hover:bg-gray-100 active:scale-110"
            aria-label="Next slide"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-800"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManufacturingSlider;
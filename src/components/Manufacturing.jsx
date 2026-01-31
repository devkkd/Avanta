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
    // Use setTimeout to defer state update to avoid render-time updates
    setTimeout(() => {
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
    }, 0);
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
    <div className="bg-white py-8  px-4 md:px-6 lg:px-8 font-sans">
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
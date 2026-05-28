"use client";

import React, { useState, useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InstagramSection = () => {
  const reels = [
    { id: 1, video: '/images/videos/reel-1.mp4', poster: '/images/videos/thumb1.png', title: "Premium Kurti Sets - Elegance in every thread" },
    { id: 2, video: '/images/videos/reel-2.mp4', poster: '/images/videos/thumb2.png', title: "Heritage Jaipuri Craftsmanship & Prints" },
    { id: 3, video: '/images/videos/reel-3.mp4', poster: '/images/videos/thumb3.png', title: "Chic and Modern Anarkali Collections" },
    { id: 4, video: '/images/videos/reel-4.mp4', poster: '/images/videos/thumb4.png', title: "Wholesale Festive wear collection 2026" },
    { id: 5, video: '/images/videos/reel-5.mp4', poster: '/images/videos/thumb2.png', title: "A Showcase of Exquisite Craft and Color" },
    { id: 6, video: '/images/videos/reel-6.mp4', poster: '/images/videos/thumb1.png', title: "Discerning Styles for Resellers & Boutiques" },
    { id: 7, video: '/images/videos/reel-7.mp4', poster: '/images/videos/thumb3.png', title: "Traditional Heritage, Styled for Today" }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [activeReelId, setActiveReelId] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <section className="bg-white py-16 px-4 md:px-8 overflow-hidden">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold text-[#1a1a3d] uppercase tracking-widest">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-[#DE3163] rounded-full"></span>
        </div>
        
        <h2 className="text-2xl md:text-4xl font-cinzel font-bold mb-5 text-gray-900 tracking-tight uppercase">
         Stay Inspired
        </h2>
        
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto mb-6">
         Stay connected with Avanta India and be the first to discover our latest collections and trend-forward designs. Follow us on Instagram for exclusive previews, new launches, and refined style inspiration.
        </p>

        <a 
          href="https://www.instagram.com/__avanta__" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-opacity shadow-md"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0 3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Follow @__avanta__</span>
        </a>
      </div>

      {/* Slider Viewport */}
      <div className="max-w-7xl mx-auto px-4 relative group">
        <div className="overflow-hidden w-full" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6 pb-6">
            {reels.map((reel) => (
              <div 
                key={reel.id} 
                className="flex-[0_0_75%] sm:flex-[0_0_42%] lg:flex-[0_0_23.2%] min-w-0"
              >
                <ReelCard 
                  reel={reel} 
                  activeReelId={activeReelId} 
                  setActiveReelId={setActiveReelId} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Buttons */}
        {canScrollPrev && (
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white text-[#1a1a3d] p-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 active:scale-95 transition-all z-20 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {canScrollNext && (
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white text-[#1a1a3d] p-3 rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 active:scale-95 transition-all z-20 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
};

const ReelCard = ({ reel, activeReelId, setActiveReelId }) => {
  const videoRef = useRef(null);
  const isPlaying = activeReelId === reel.id;
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch((err) => {
        console.log("Auto-play failed/interrupted: ", err);
        setActiveReelId(null);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying, setActiveReelId, reel.id]);

  const togglePlay = () => {
    if (isPlaying) {
      setActiveReelId(null);
    } else {
      setActiveReelId(reel.id);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div 
      onClick={togglePlay}
      className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-black shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.poster}
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        preload="metadata"
      />

      {/* Play/Pause Center Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className={`p-4 rounded-full bg-black/35 backdrop-blur-sm transition-all duration-300 ${isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100 group-hover:bg-black/50'}`}>
          {isPlaying ? (
            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white fill-current translate-x-0.5" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </div>
      </div>

      {/* Mute/Unmute Top Right Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white hover:bg-black/60 transition-all active:scale-90"
      >
        {isMuted ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* Dark Overlay (gradient for text readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none z-0" />

      {/* Reel Info (Bottom Overlays) */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white flex flex-col gap-1.5 select-none pointer-events-none z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border border-white/30 shrink-0">
            <img src="/images/BNI-logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-bold tracking-wider">__avanta__</span>
        </div>
        <p className="text-[11px] font-medium text-white/90 line-clamp-2 leading-relaxed">
          {reel.title}
        </p>
        <span className="text-[9px] text-white/50 tracking-wider mt-0.5 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0 3.205-.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Watch on Instagram
        </span>
      </div>
    </div>
  );
};

export default InstagramSection;
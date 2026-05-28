import React from 'react';

const AvantaBanner = () => {
  return (
    <div className="w-full my-10 bg-gradient-to-b from-[#d9195c] to-[#6d092d]">
      
      {/* Container stretching to make images touch top/bottom */}
      <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row items-stretch overflow-hidden">

        {/* Top Images (on mobile, side-by-side for balanced look) */}
        <div className="flex w-full md:hidden gap-3 p-4 pb-0">
          <div className="flex-1 rounded-xl overflow-hidden h-52 shadow-lg">
            <img
              src="/images/manufacuring/image-44.svg"
              alt="Model Left"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 rounded-xl overflow-hidden h-52 shadow-lg">
            <img
              src="/images/manufacuring/image-43.svg"
              alt="Model Right"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Left Image (desktop only) */}
        <div className="hidden md:block w-1/5">
          <img
            src="/images/manufacuring/image-44.svg"
            alt="Model Left"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-white px-4 py-10 md:py-16 text-center">

          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <span className="w-2 h-2 bg-white rounded-full"></span>
            <p className="tracking-wider text-[10px] sm:text-xs md:text-sm font-semibold uppercase">
              Avanta by Jaipur Kurti Gharana
            </p>
            <span className="w-2 h-2 bg-white rounded-full"></span>
          </div>

          {/* Heading formatted for a single line in Title Case */}
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-cinzel font-bold leading-snug">
            This Season's Most Coveted Avanta Pieces
          </h1>

        </div>

        {/* Right Image (desktop only) */}
        <div className="hidden md:block w-1/5">
          <img
            src="/images/manufacuring/image-43.svg"
            alt="Model Right"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default AvantaBanner;
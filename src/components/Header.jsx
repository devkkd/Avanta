// "use client";
// import React from 'react';
// import Image from 'next/image';
// import { Search, Phone, MessageCircle, Instagram, ChevronDown } from 'lucide-react';

// export default function Header() {
//   const navigationItems = [
//     'HOME', 'ABOUT US', 'SUITS SET', 'KURTI SET', 'ANARKALI SET', 
//     'TOP & TUNICS', 'GOWN', 'CO-ORD SET', 'CONTACT US', 'DOWNLOAD CATALOG'
//   ];

//   return (
//     <header className="w-full bg-white font-sans">
//       {/* Top Header Section */}
//       <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-4">

//         {/* Left: Ship To & Search */}
//         <div className="flex items-center gap-4 flex-1">
//           {/* Ship To Selector */}
//           <div className="flex items-center gap-2 border border-blue-100 rounded-full px-4 py-2 bg-white shadow-sm min-w-max">
//             <span className="text-[12px] font-mont font-medium text-gray-500 uppercase tracking-tight">Ship To</span>
//             <img 
//               src="/images/flag.svg" 
//               alt="India Flag" 
//               className="w-5 h-3 object-cover" 
//             />
//             <span className="text-xs font-mont font-medium text-gray-800">INDIA</span>
//             <ChevronDown className="w-4 h-4 text-gray-400" />
//           </div>

//           {/* Search Bar */}
//           <div className="relative flex-1 max-w-xs">
//             <input 
//               type="text" 
//               placeholder="Search product or categories & more..." 
//               className="w-full pl-10 pr-4 py-2 border border-blue-100 rounded-full text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-200 placeholder:text-gray-300 shadow-sm"
//             />
//             <img src='/images/icon/search-normal.svg'  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200"/>

//           </div>
//         </div>

//         {/* Center: Logo */}
//         <div className="flex flex-col items-center flex-1">
//           <div className="relative">
//              {/* Replace with your actual logo file */}
//             <h1 className="text-4xl font-serif lowercase text-[#1a1a3d] leading-none">
//               <img src='/images/Avanta-Logo.svg' width={120} />
//             </h1>

//           </div>
//         </div>

//         {/* Right: Action Buttons */}
//         <div className="flex items-center gap-3 flex-1 justify-end">
//           <button className="flex items-center gap-2 bg-[#1a1a3d] text-white px-5 py-2.5 rounded-full text-[11px] font-semibold hover:bg-opacity-90 transition-all">
//             <Phone className="w-3.5 h-3.5" fill="currentColor" />
//             Call Now +
//           </button>

//           <button className="flex items-center gap-2 bg-[#00c647] text-white px-5 py-2.5 rounded-full text-[11px] font-semibold hover:bg-opacity-90 transition-all">
//             <MessageCircle className="w-3.5 h-3.5" fill="currentColor" />
//             Enquiry Now +
//           </button>

//           <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-[11px] font-semibold hover:bg-opacity-90 transition-all">
//             <div className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-md p-0.5">
//               <Instagram className="w-3.5 h-3.5 text-white" />
//             </div>
//             Instagram
//           </button>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav className="border-t border-gray-100">
//         <ul className="flex items-center justify-center gap-8 py-3">
//           {navigationItems.map((item, idx) => (
//             <li key={idx}>
//               <a 
//                 href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
//                 className={`text-[11px] font-bold tracking-wider transition-colors hover:text-blue-900 ${
//                   item === 'HOME' ? 'text-blue-900 border-b-2 border-blue-900 pb-1' : 'text-gray-600'
//                 }`}
//               >
//                 {item}
//               </a>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// "use client";
// import React, { useState, useEffect } from 'react';
// import { Phone, MessageCircle, Instagram, ChevronDown, Menu, X, Search } from 'lucide-react';

// export default function Header() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   // Handle scroll for glassmorphism effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navigationItems = [
//     'HOME', 'ABOUT US', 'SUITS SET', 'KURTI SET', 'ANARKALI SET', 
//     'TOP & TUNICS', 'GOWN', 'CO-ORD SET', 'CONTACT US', 'DOWNLOAD CATALOG ↓'
//   ];

//   return (
//     <>
//       {/* Header Container */}
//       <header className={`sticky top-0 w-full z-50 transition-all duration-300 font-mont 
//         ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white/60 backdrop-blur-sm'}`}>

//         <div className=" mx-auto px-4 lg:px-8 py-2 border">
//           {/* Top Bar */}
//           <div className="flex items-center justify-between py-4 relative">

//             {/* Left: Mobile Menu & Search (Desktop) */}
//             <div className="flex items-center gap-4  xl:ml-18  ">
//               <button 
//                 className="md:hidden p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
//                 onClick={() => setIsSidebarOpen(true)}
//               >
//                 <Menu className="w-6 h-6 text-[#1a1a3d]" />
//               </button>

//               <div className="hidden lg:flex items-center gap-2 border border-[#CFCCF5] rounded-full px-4 py-3 bg-white/50">
//                 <span className="text-xs font-semibold text-[#1a1a3d] uppercase">Ship To</span>
//                 <img src="/images/flag.svg" alt="IN" className="w-5 h-3 object-contain" />
//                 <span className="text-xs font-semibold text-[#1a1a3d]">INDIA</span>
//                 <ChevronDown className="w-3 h-3 text-gray-600" />
//               </div>

//               <div className="hidden md:relative md:flex items-center flex-1 md:max-w-[300px]">
//                 <input 
//                   type="text" 
//                   placeholder="Search product or categories & more..." 
//                   className="w-full pl-10 pr-4 py-3 border border-[#CFCCF5] rounded-full text-xs bg-white/50 focus:bg-white focus:outline-none transition-all"
//                 />
//                <img src='/images/icon/search-normal.svg'  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200"/>
//               </div>
//             </div>

//             {/* Center: Logo (Absolute Center) */}
//             <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
//               <img 
//                 src='/images/Avanta-Logo.svg' 
//                 alt="Avanta"
//                 className="w-28 sm:w-32 md:w-28 h-auto"
//               />
//               {/* <span className="hidden sm:block text-[8px] md:text-[10px] text-gray-500 tracking-[0.2em] mt-1 font-medium">
//                 JAIPUR | DELHI | CHANDIGARH
//               </span> */}
//             </div>

//             {/* Right: Actions */}
//             <div className="flex items-center justify-end gap-2 md:gap-3 flex-1">
//               <button className=" sm:flex items-center gap-2 bg-[#1F1951] text-white px-4 py-3 rounded-full text-[11px] font-bold transition-all">
//                 <img src='/images/icon/call-calling.svg' className='w-5 h-5'/>
//                 <span className="hidden lg:inline font-mont font-normal text-xs">Call Now +</span>
//               </button>

//               <button className="flex items-center gap-2 bg-[#00C349] text-white px-4 py-3 rounded-full text-[11px] font-bold hover:bg-[#00C349] transition-all">
//                <img src='  /images/icon/whatsapp-icon.svg' className='w-5 h-5'/>
//                 <span className="hidden lg:inline font-mont font-normal text-xs">Enquiry Now +</span>
//               </button>

//               <button className="hidden md:flex items-center gap-2 bg-[#0E0E0E] text-white px-4 py-3 rounded-full text-[11px] font-bold hover:bg-gray-800 transition-all">
//                   <img src='/images/icon/instagram-logo.svg' className='w-5 h-5'/>
//                 <span className="hidden lg:inline font-mont font-normal text-xs">Instagram</span>
//               </button>
//             </div>
//           </div>

//           {/* Desktop Nav */}
//           <nav className="hidden md:block border-t border-gray-100/50">
//             <ul className="flex items-center justify-center gap-6 lg:gap-10 py-4">
//               {navigationItems.map((item, idx) => (
//                 <li key={idx}>
//                   <a 
//                     href="#" 
//                     className={`text-[11px] font-bold tracking-widest hover:text-blue-700 transition-colors ${
//                       item === 'HOME' ? 'text-blue-800 border-b-2 border-blue-800 pb-1' : 'text-[#374151]'
//                     }`}
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </header>

//       {/* Mobile Sidebar Overlay */}
//       <div 
//         className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 md:hidden ${
//           isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={() => setIsSidebarOpen(false)}
//       />

//       {/* Mobile Sidebar Content */}
//       <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
//         isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         <div className="p-6 flex flex-col h-full">
//           <div className="flex items-center justify-between mb-8">
//             <img src='/images/Avanta-Logo.svg' alt="Logo" className="w-24" />
//             <button onClick={() => setIsSidebarOpen(false)}>
//               <X className="w-6 h-6 text-gray-500" />
//             </button>
//           </div>

//           <nav className="flex-1 overflow-y-auto">
//             <ul className="space-y-1">
//               {navigationItems.map((item, idx) => (
//                 <li key={idx}>
//                   <a 
//                     href="#" 
//                     className={`block py-3 px-4 text-sm font-bold tracking-wide rounded-lg transition-colors ${
//                       item === 'HOME' ? 'bg-blue-50 text-blue-800' : 'text-gray-700 hover:bg-gray-50'
//                     }`}
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="pt-6 border-t border-gray-100 mt-auto space-y-3">
//             <button className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest">
//               <Instagram className="w-4 h-4" />
//               Follow Us
//             </button>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }


"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    'HOME', 'ABOUT US', 'SUITS SET', 'KURTI SET', 'ANARKALI SET',
    'TOP & TUNICS', 'GOWN', 'CO-ORD SET', 'CONTACT US', 'DOWNLOAD CATALOG'
  ];

  return (
    <>
      {/* Header Container */}
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 font-mont 
        ${isScrolled ? 'bg-white/15 backdrop-blur-xl shadow-lg' : 'bg-white/5 backdrop-blur-lg'}`}>

        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 py-2">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3 md:py-4 relative">

            {/* Left: Mobile Menu & Location Selector */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-gray-800" />
              </button>

              {/* Location Selector - Desktop */}
              <div className="hidden md:flex items-center gap-2 border border-[#CFCCF5] rounded-full px-4 py-2.5 bg-white">
                <span className="text-xs font-medium text-gray-800 uppercase">Ship To</span>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/flag.svg"
                    alt="India Flag"
                    className="w-5 h-3.5 object-cover rounded-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect width='30' height='20' fill='%230f52ba'/%3E%3Ccircle cx='15' cy='10' r='4' fill='white'/%3E%3C/svg%3E";
                    }}
                  />
                  <span className="text-xs font-medium text-gray-800">INDIA</span>
                  <ChevronDown className="w-3 h-3 text-gray-600" />
                </div>
              </div>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex items-center relative w-[280px] lg:w-[350px]">
                <div className="absolute left-3.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search product or categories & more..."
                  className="w-full pl-10 pr-4 py-2.5 border border-[#CFCCF5] rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
                />
              </div>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <img
                src='/images/Avanta-Logo.svg'
                alt="Avanta India"
                className="w-28 md:w-32 h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='100' y='35' font-family='Arial' font-size='24' text-anchor='middle' fill='%231F1951'%3EAvanta India%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Call Button */}
              <button className="flex items-center gap-2 bg-[#1F1951] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-[#2A2468] transition-colors">
                <img src='/images/icon/call-calling.svg' className='w-5 h-5' />
                <span className="hidden lg:inline text-xs">Call Now +</span>
              </button>

              {/* WhatsApp Button */}
              <button className="flex items-center gap-2 bg-[#00C349] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-[#00A83F] transition-colors">
                 <img src='  /images/icon/whatsapp-icon.svg' className='w-5 h-5'/>
                <span className="hidden lg:inline text-xs">Enquiry Now +</span>
              </button>

              {/* Instagram Button */}
              <button className="hidden md:flex items-center gap-2 bg-[#0E0E0E] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
               <img src='/images/icon/instagram-logo.svg' className='w-5 h-5'/>
                <span className="hidden lg:inline text-xs">Instagram</span>
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block pt-3 pb-2">
            <ul className="flex items-center justify-center flex-wrap gap-3 lg:gap-6">
              {navigationItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className={`text-xs font-bold uppercase tracking-wider hover:text-[#1F1951] transition-colors px-2 py-1 ${item === 'HOME'
                        ? 'text-[#1F1951] border-b-2 border-[#1F1951] pb-1'
                        : 'text-gray-700'
                      }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar Content */}
      <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white z-70 shadow-2xl transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <img
              src='/images/Avanta-Logo.svg'
              alt="Avanta India"
              className="w-24"
            />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Mobile Search Bar */}
          <div className="mb-6 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {navigationItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${item === 'HOME'
                        ? 'bg-[#1F1951] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-6 border-t border-gray-200 mt-6 space-y-4">
            {/* Mobile Action Buttons */}
            <button className="w-full flex items-center justify-center gap-2 bg-[#1F1951] text-white py-3 rounded-lg font-medium text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-[#00C349] text-white py-3 rounded-lg font-medium text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm5.19 13.98c-.27.76-1.36 1.39-1.88 1.48-.51.09-1.15.15-2.71-.6-1.96-.95-3.24-3.37-3.34-3.53-.1-.16-.79-1.05-.79-2.01 0-.96.5-1.43.67-1.61.17-.18.37-.24.5-.24.12 0 .24 0 .34.01.1.01.24-.03.38.4.14.43.48 1.5.52 1.61.04.11.06.24 0 .37-.06.13-.09.21-.18.33-.09.12-.19.26-.27.35-.09.09-.18.19-.08.37.1.18.44.78.95 1.26.66.62 1.22.81 1.41.91.19.1.31.08.42-.05.11-.13.47-.55.6-.74.13-.19.26-.16.41-.1.15.06.94.44 1.1.52.16.08.26.12.3.19.04.07.04.43-.23 1.01z" />
              </svg>
              WhatsApp Enquiry
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
// "use client";
// import React, { useState, useEffect } from 'react';
// import { ChevronDown, Menu, X } from 'lucide-react';

// export default function Header() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navigationItems = [
//     'HOME', 'ABOUT US', 'SUITS SET', 'KURTI SET', 'ANARKALI SET',
//     'TOP & TUNICS', 'GOWN', 'CO-ORD SET', 'CONTACT US', 'DOWNLOAD CATALOG'
//   ];

//   return (
//     <>
//       {/* Header Container */}
//       <header className={`sticky top-0 w-full z-50 transition-all duration-300 font-mont 
//         ${isScrolled ? 'bg-white/15 backdrop-blur-xl shadow-lg' : 'bg-white/5 backdrop-blur-lg'}`}>

//         <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-2">
//           {/* Top Bar */}
//           <div className="flex items-center justify-between py-3 md:py-4 relative">

//             {/* Left: Mobile Menu & Location Selector */}
//             <div className="flex items-center gap-3 md:gap-6">
//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden p-2"
//                 onClick={() => setIsSidebarOpen(true)}
//                 aria-label="Open menu"
//               >
//                 <Menu className="w-5 h-5 text-gray-800" />
//               </button>

//               {/* Location Selector - Desktop */}
//               <div className="hidden md:flex items-center gap-2 border border-[#CFCCF5] rounded-full px-4 py-2.5 bg-white">
//                 <span className="text-xs font-medium text-gray-800 uppercase">Ship To</span>
//                 <div className="flex items-center gap-2">
//                   <img
//                     src="/images/flag.svg"
//                     alt="India Flag"
//                     className="w-5 h-3.5 object-cover rounded-sm"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 20'%3E%3Crect width='30' height='20' fill='%230f52ba'/%3E%3Ccircle cx='15' cy='10' r='4' fill='white'/%3E%3C/svg%3E";
//                     }}
//                   />
//                   <span className="text-xs font-medium text-gray-800">INDIA</span>
//                   <ChevronDown className="w-3 h-3 text-gray-600" />
//                 </div>
//               </div>

//               {/* Search Bar - Desktop */}
//               <div className="hidden lg:flex items-center relative w-[280px] lg:w-[300px]">
//                 <div className="absolute left-3.5">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search product or categories & more..."
//                   className="w-full pl-10 pr-4 py-2.5 border border-[#CFCCF5] rounded-full text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
//                 />
//               </div>
//             </div>

//             {/* Center: Logo */}
//             <div className="absolute left-1/2 -translate-x-1/2">
//               <img
//                 src='/images/Avanta-Logo.svg'
//                 alt="Avanta India"
//                 className="w-28 md:w-32 h-auto"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='100' y='35' font-family='Arial' font-size='24' text-anchor='middle' fill='%231F1951'%3EAvanta India%3C/text%3E%3C/svg%3E";
//                 }}
//               />
//             </div>

//             {/* Right: Action Buttons */}
//             <div className="flex items-center gap-2 md:gap-3">
//               {/* Call Button */}
//               <button className="hidden sm:flex items-center gap-2 bg-[#1F1951] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-[#2A2468] transition-colors">
//                 <img src='/images/icon/call-calling.svg' className='w-5 h-5' />
//                 <span className="hidden lg:inline text-xs">Call Now +</span>
//               </button>

//               {/* WhatsApp Button */}
//               <button className="flex items-center gap-2 bg-[#00C349] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-[#00A83F] transition-colors">
//                  <img src='  /images/icon/whatsapp-icon.svg' className='w-5 h-5'/>
//                 <span className="hidden lg:inline text-xs">Enquiry Now +</span>
//               </button>

//               {/* Instagram Button */}
//               <button className="hidden md:flex items-center gap-2 bg-[#0E0E0E] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors">
//                <img src='/images/icon/instagram-logo.svg' className='w-5 h-5'/>
//                 <span className="hidden lg:inline text-xs">Instagram</span>
//               </button>
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:block pt-3 pb-2 w-full">
//             <ul className="flex items-center justify-center flex-wrap gap-3 lg:gap-3">
//               {navigationItems.map((item, idx) => (
//                 <li key={idx}>
//                   <a
//                     href="#"
//                     className={`text-xs font-bold uppercase tracking-wider hover:text-[#1F1951] transition-colors px-2 py-1 ${item === 'HOME'
//                         ? 'text-[#1F1951] border-b-2 border-[#1F1951] pb-1'
//                         : 'text-gray-700'
//                       }`}
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
//         className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//           }`}
//         onClick={() => setIsSidebarOpen(false)}
//       />

//       {/* Mobile Sidebar Content */}
//       <aside className={`fixed top-0 left-0 h-full w-[280px] bg-white z-70 shadow-2xl transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//         <div className="p-6 flex flex-col h-full">
//           <div className="flex items-center justify-between mb-8">
//             <img
//               src='/images/Avanta-Logo.svg'
//               alt="Avanta India"
//               className="w-24"
//             />
//             <button
//               onClick={() => setIsSidebarOpen(false)}
//               className="p-2 hover:bg-gray-100 rounded-full"
//             >
//               <X className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>

//           {/* Mobile Search Bar */}
//           <div className="mb-6 relative">
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm"
//             />
//           </div>

//           <nav className="flex-1 overflow-y-auto">
//             <ul className="space-y-1">
//               {navigationItems.map((item, idx) => (
//                 <li key={idx}>
//                   <a
//                     href="#"
//                     className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${item === 'HOME'
//                         ? 'bg-[#1F1951] text-white'
//                         : 'text-gray-700 hover:bg-gray-100'
//                       }`}
//                     onClick={() => setIsSidebarOpen(false)}
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           <div className="pt-6 border-t border-gray-200 mt-6 space-y-4">
//             {/* Mobile Action Buttons */}
//             <button className="w-full flex items-center justify-center gap-2 bg-[#1F1951] text-white py-3 rounded-lg font-medium text-sm">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//               </svg>
//               Call Now
//             </button>

//             <button className="w-full flex items-center justify-center gap-2 bg-[#00C349] text-white py-3 rounded-lg font-medium text-sm">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm5.19 13.98c-.27.76-1.36 1.39-1.88 1.48-.51.09-1.15.15-2.71-.6-1.96-.95-3.24-3.37-3.34-3.53-.1-.16-.79-1.05-.79-2.01 0-.96.5-1.43.67-1.61.17-.18.37-.24.5-.24.12 0 .24 0 .34.01.1.01.24-.03.38.4.14.43.48 1.5.52 1.61.04.11.06.24 0 .37-.06.13-.09.21-.18.33-.09.12-.19.26-.27.35-.09.09-.18.19-.08.37.1.18.44.78.95 1.26.66.62 1.22.81 1.41.91.19.1.31.08.42-.05.11-.13.47-.55.6-.74.13-.19.26-.16.41-.1.15.06.94.44 1.1.52.16.08.26.12.3.19.04.07.04.43-.23 1.01z" />
//               </svg>
//               WhatsApp Enquiry
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
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SUITS SET', path: '/straight-suit' },
    { name: 'KURTI SET', path: '/kurti-pant-dupatta' },
    { name: 'ANARKALI SET', path: '/anarkali-suit' },
    { name: 'TOP & TUNICS', path: '/top-tunics' },
    { name: 'GOWN', path: '/gown' },
    { name: 'CO-ORD SET', path: '/co-ord-set' },
    { name: 'CONTACT US', path: '/contact' },
    { name: 'DOWNLOAD CATALOG', path: '/catalog' }
  ];

  return (
    <>
      {/* Header Container */}
      <header className={`sticky top-0 w-full z-50 transition-all duration-300 font-mont 
        ${isScrolled ? 'bg-white/15 backdrop-blur-xl shadow-lg' : 'bg-white/5 backdrop-blur-lg'}`}>

        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-2">
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
              <div className="hidden lg:flex items-center relative w-[280px] lg:w-[300px]">
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
              <a href="/">
                <img
                  src='/images/Avanta-Logo.svg'
                  alt="Avanta India"
                  className="w-28 md:w-32 h-auto"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Ctext x='100' y='35' font-family='Arial' font-size='24' text-anchor='middle' fill='%231F1951'%3EAvanta India%3C/text%3E%3C/svg%3E";
                  }}
                />
              </a>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Call Button */}
              <a 
                href="tel:+1234567890" 
                className="hidden sm:flex items-center gap-2 bg-[#1F1951] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-[#2A2468] transition-colors"
              >
                <img src='/images/icon/call-calling.svg' className='w-5 h-5' alt="Call" />
                <span className="hidden lg:inline text-xs">Call Now +</span>
              </a>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#00C349] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-[#00A83F] transition-colors"
              >
                <img src='/images/icon/whatsapp-icon.svg' className='w-5 h-5' alt="WhatsApp" />
                <span className="hidden lg:inline text-xs">Enquiry Now +</span>
              </a>

              {/* Instagram Button */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-[#0E0E0E] text-white px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors"
              >
                <img src='/images/icon/instagram-logo.svg' className='w-5 h-5' alt="Instagram" />
                <span className="hidden lg:inline text-xs">Instagram</span>
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block pt-3 pb-2 w-full">
            <ul className="flex items-center justify-center flex-wrap gap-2 lg:gap-3">
              {navigationItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.path}
                    className={`text-xs font-bold uppercase tracking-wider hover:text-[#1F1951] transition-colors px-2 py-1 whitespace-nowrap ${
                      item.name === 'HOME'
                        ? 'text-[#1F1951] border-b-2 border-[#1F1951] pb-1'
                        : 'text-gray-700'
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-70 shadow-2xl transition-transform duration-300 md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <a href="/" onClick={() => setIsSidebarOpen(false)}>
              <img
                src='/images/Avanta-Logo.svg'
                alt="Avanta India"
                className="w-24"
              />
            </a>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Close menu"
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {navigationItems.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.path}
                    className={`block py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
                      item.name === 'HOME'
                        ? 'bg-[#1F1951] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-6 border-t border-gray-200 mt-6 space-y-3">
            {/* Mobile Action Buttons */}
            <a 
              href="tel:+1234567890" 
              className="w-full flex items-center justify-center gap-2 bg-[#1F1951] text-white py-3 rounded-lg font-medium text-sm"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>

            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#00C349] text-white py-3 rounded-lg font-medium text-sm"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.91-9.91-9.91zm5.19 13.98c-.27.76-1.36 1.39-1.88 1.48-.51.09-1.15.15-2.71-.6-1.96-.95-3.24-3.37-3.34-3.53-.1-.16-.79-1.05-.79-2.01 0-.96.5-1.43.67-1.61.17-.18.37-.24.5-.24.12 0 .24 0 .34.01.1.01.24-.03.38.4.14.43.48 1.5.52 1.61.04.11.06.24 0 .37-.06.13-.09.21-.18.33-.09.12-.19.26-.27.35-.09.09-.18.19-.08.37.1.18.44.78.95 1.26.66.62 1.22.81 1.41.91.19.1.31.08.42-.05.11-.13.47-.55.6-.74.13-.19.26-.16.41-.1.15.06.94.44 1.1.52.16.08.26.12.3.19.04.07.04.43-.23 1.01z" />
              </svg>
              WhatsApp Enquiry
            </a>

            {/* Mobile Instagram Button */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#0E0E0E] text-white py-3 rounded-lg font-medium text-sm"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
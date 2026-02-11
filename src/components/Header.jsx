"use client";

import React, { useState } from 'react';
import { ChevronDown, Search, Menu, X, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import categories from "@/data/MainCategory.json";
import { useEnquiry } from "@/context/CartContext"; // Ensure path matches your project

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Enquiries } = useEnquiry(); // Consuming your context

  const staticLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" }
  ];

  const categoryLinks = categories
    .filter(cat => cat.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(cat => ({
      name: cat.name.toUpperCase(),
      href: `/store/${cat.slug}`
    }));

  const footerLinks = [
    { name: "CONTACT US", href: "/contact" },
    { name: "DOWNLOAD CATALOG ↓", href: "/catalog" }
  ];

  const navigation = [
    ...staticLinks,
    ...categoryLinks,
    ...footerLinks
  ];

  const MAX_VISIBLE_CATEGORIES = 6;
  const visibleCategories = categoryLinks.slice(0, MAX_VISIBLE_CATEGORIES);
  const overflowCategories = categoryLinks.slice(MAX_VISIBLE_CATEGORIES);

  return (
    <header className="sticky top-0 w-full z-50 font-sans">
      {/* Top Announcement Bar */}
      <div className="bg-[#1F1951] text-white py-2 px-4 flex items-center justify-center relative overflow-hidden">
        <button className="absolute left-4 lg:left-10 text-white/70 hover:text-white">
          <ChevronDown className="rotate-90 w-5 h-5" />
        </button>
        <p className="text-[10px] md:text-xs tracking-wide text-center px-8 font-light italic">
          Welcome To Avanta India By Jaipur Kurti Gharana Thoughtfully Crafted To Celebrate Heritage, Purpose-built For Discerning Resellers.
        </p>
        <button className="absolute right-4 lg:right-10 text-white/70 hover:text-white">
          <ChevronDown className="-rotate-90 w-5 h-5" />
        </button>
      </div>

      {/* Glassmorphism Header Content */}
      <div className="bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-4 py-4 lg:py-6">
          <div className="flex items-center justify-between gap-4 relative">

            {/* Left: Shipping & Search */}
            <div className="hidden lg:flex items-center gap-4 flex-1">
              <div className="flex items-center gap-2 border border-indigo-100/50 rounded-full px-4 py-2.5 bg-white/50 hover:bg-white transition-colors">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Ship To</span>
                <div className="flex items-center gap-1.5">
                  <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-4 h-3 object-cover" />
                  <span className="text-xs font-bold text-gray-800 uppercase">India</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </div>

              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search product or categories & more..."
                  className="w-full bg-white/40 border border-indigo-50/50 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50/30 transition-all"
                />
              </div>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 z-10">
              <Link href="/">
                <img src='/images/Avanta-Logo.svg' alt="Avanta India" className="w-28 md:w-32 h-auto" />
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 flex-1 justify-end">

              {/* Desktop Cart Section */}
              <Link href="/cart" className="relative group hidden lg:flex items-center mr-2">
                <ShoppingBag className="w-6 h-6 text-[#1F1951] group-hover:scale-110 transition-transform" />
                {Enquiries.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#E12B5E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                    {Enquiries.length}
                  </span>
                )}
              </Link>

              <div className="hidden lg:flex items-center gap-3">
                <button className="bg-[#1F1951] text-white flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-bold tracking-tight hover:scale-105 transition-all shadow-md">
                  <img src="/images/icon/call-calling.svg" alt="Call" className="w-3.5 h-3.5" />
                  Call Now →
                </button>
                <button className="bg-[#00C349] text-white flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-bold tracking-tight hover:scale-105 transition-all shadow-md">
                  <img src="/images/icon/whatsapp.svg" alt="WA" className="w-3.5 h-3.5" />
                  Enquiry Now →
                </button>
                <button className="bg-black text-white flex items-center gap-2 px-5 py-3 rounded-full text-[11px] font-bold tracking-tight hover:bg-zinc-800 transition-all shadow-md">
                  <img src="/images/icon/instagram.svg" alt="WA" className="w-3.5 h-3.5" />
                  Instagram
                </button>
              </div>

              {/* Mobile Right Section (Cart + Menu) */}
              <div className="flex items-center gap-3 lg:hidden">
                <Link href="/cart" className="relative">
                  <ShoppingBag className="w-6 h-6 text-[#1F1951]" />
                  {Enquiries.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#E12B5E] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                      {Enquiries.length}
                    </span>
                  )}
                </Link>
                <button className="p-2 text-[#1F1951]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

            </div>
          </div>

          {/* Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center justify-center mt-8 gap-10">
            {staticLinks.map(item => (
              <NavLink key={item.name} item={item} />
            ))}

            {visibleCategories.map(item => (
              <NavLink key={item.name} item={item} />
            ))}

            {overflowCategories.length > 0 && (
              <div className="relative group">
                <button className="flex items-center gap-1 text-[11px] font-bold tracking-[0.15em] text-gray-800 hover:text-[#1F1951] uppercase transition-colors">
                  All Categories
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[260px] bg-white border border-[#E5E2D6] rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
                  {overflowCategories.map((item, index) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-6 py-4 text-xs font-bold tracking-widest text-gray-700 hover:bg-[#1F1951] hover:text-white transition-colors border-b border-gray-50 last:border-0 uppercase"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {footerLinks.map(item => (
              <NavLink key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 bg-[#1F1951]/20 backdrop-blur-sm transition-opacity ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute left-0 top-0 h-full w-[85%] bg-white p-8 transition-transform duration-500 ease-out shadow-2xl ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex justify-between items-center mb-10">
            <img src='/images/Avanta-Logo.svg' alt="Avanta India" className="w-28 md:w-32 h-auto" />
            <X className="text-gray-400 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="flex flex-col gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xs font-bold tracking-[0.2em] border-b border-gray-50 pb-4 text-gray-700 uppercase"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

// NavLink Sub-component to keep code clean
const NavLink = ({ item }) => (
  <Link
    href={item.href}
    className="text-[11px] font-bold tracking-[0.15em] text-gray-800 hover:text-[#1F1951] transition-colors relative group uppercase"
  >
    {item.name}
    <span className="absolute -bottom-1 left-0 h-0.5 bg-[#1F1951] transition-all duration-300 w-0 group-hover:w-full"></span>
  </Link>
);

export default Header;
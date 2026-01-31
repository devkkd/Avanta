import React from 'react';
import { Instagram, Facebook, Youtube, Linkedin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fc] pt-12 pb-8 px-6 md:px-16 text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Logo Section --- */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-serif font-medium tracking-widest text-[#2d2a4a] mb-0">avanta</h2>
          <div className="w-40 h-[1px] bg-gray-300 my-1"></div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Jaipur Kurti Gharana</p>
        </div>

        {/* --- Main Links Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-[13px] uppercase tracking-wider">Avanta India By Jaipur Kurti Gharana</h3>
            <p className="text-xs leading-relaxed text-gray-600 text-justify">
              Avanta India is a celebration of refined Indian fashion where heritage craftsmanship meets contemporary design. 
              Rooted in Jaipur's rich textile legacy, each creation reflects timeless elegance, thoughtful detailing, and uncompromising quality.
            </p>
            <p className="text-xs font-bold italic text-gray-800">Exquisite Indian fashion, crafted with purpose.</p>
          </div>

          {/* Shop */}
          <div className="lg:pl-8">
            <h3 className="font-bold text-[13px] uppercase tracking-wider mb-5">Shop</h3>
            <ul className="text-xs space-y-3 text-gray-600">
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Suits Set</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Kurti Set</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Anarkali Set</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Top & Tunics Set</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Gown</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Co-ord Set</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-bold text-[13px] uppercase tracking-wider mb-5">About</h3>
            <ul className="text-xs space-y-3 text-gray-600">
              <li className="hover:translate-x-1 transition-transform cursor-pointer">About Us</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Crafted Heritage</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Designed For Resellers</li>
              <li className="hover:translate-x-1 transition-transform cursor-pointer">Founder Messages</li>
            </ul>
          </div>

          {/* Customer Care & Socials */}
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-[13px] uppercase tracking-wider mb-5">Customer Care</h3>
              <ul className="text-xs space-y-3 text-gray-600">
                <li className="hover:translate-x-1 transition-transform cursor-pointer">Contact Us</li>
                <li className="hover:translate-x-1 transition-transform cursor-pointer">FAQ's</li>
                <li className="hover:translate-x-1 transition-transform cursor-pointer">Privacy Policy</li>
                <li className="hover:translate-x-1 transition-transform cursor-pointer">Terms & Conditions</li>
              </ul>
            </div>
            
          
          </div>

            <div>
              <h3 className="font-bold text-[13px] uppercase tracking-wider mb-4">Follow Us</h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-xs text-gray-600 hover:text-pink-600 transition-colors">
                  <Instagram size={18} /> <span>@jaipur_kurti_gharana</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-xs text-gray-600 hover:text-blue-600 transition-colors">
                  <Facebook size={18} /> <span>@jaipur_kurti_gharana</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-xs text-gray-600 hover:text-red-600 transition-colors">
                  <Youtube size={18} /> <span>@jaipur_kurti_gharana</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-xs text-gray-600 hover:text-blue-800 transition-colors">
                  <Linkedin size={18} /> <span>@jaipur_kurti_gharana</span>
                </a>
              </div>
            </div>
        </div>

        <hr className="border-gray-200 mb-10" />

        {/* --- Mid Section: Newsletter & Catalog --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="max-w-md">
            <h3 className="font-bold text-sm mb-2">Stay Connected</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Be the first to discover new collections, exclusive launches, and curated style inspiration. 
              Follow us on Instagram and stay connected to the world of Avanta.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full md:w-auto">
            <div className="max-w-[200px]">
              <h3 className="font-bold text-sm mb-1">Download</h3>
              <p className="text-xs text-gray-500">Explore our complete range and latest collections.</p>
            </div>
            <button className="bg-[#1e1b3a] text-white px-8 py-4 rounded text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-black transition-all shadow-lg whitespace-nowrap">
              Download Catalog +
            </button>
          </div>
        </div>

        {/* --- Footer Bottom Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-[11px] text-gray-400">© Avanta India. All rights reserved.</p>
            <a 
              href="/admin/login" 
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              Admin Login
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#1e1b3a] text-white flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-semibold hover:opacity-90 transition-opacity shadow-md">
              <Phone size={14} /> Call Now →
            </button>
            <button className="bg-[#00c853] text-white flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-semibold hover:opacity-90 transition-opacity shadow-md">
              <span className="text-lg leading-none">✆</span> Enquiry Now →
            </button>
          </div>
        </div>

        {/* --- Decorative Large Text --- */}
        <div className="text-center mt-16 select-none pointer-events-none">
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif text-gray-200/60 tracking-tight uppercase">
            Designed with Tradition. Crafted for today.
          </h1>
        </div>
      </div>
    </footer>
  );
}
"use client";
import Image from 'next/image';
const collections = [
  { title: "SUITS SETS", image: "/images/banner/banner-1.svg", bgColor: "bg-orange-50", buttonColor: "bg-rose-500", reverse: false },
  { title: "KURTI SETS", image: "/images/banner/banner-1.svg", bgColor: "bg-pink-50", buttonColor: "bg-white", reverse: true },
  { title: "ANARKALI SETS", image: "/images/banner/banner-1.svg", bgColor: "bg-blue-50", buttonColor: "bg-white", reverse: false },
  { title: "TOP & TUNICS", image: "/images/banner/banner-1.svg", bgColor: "bg-pink-50", buttonColor: "bg-white", reverse: true },
  { title: "GOWN", image: "/images/banner/banner-1.svg", bgColor: "bg-orange-50", buttonColor: "bg-white", reverse: false },
  { title: "CO-ORD SETS", image: "/images/banner/banner-1.svg", bgColor: "bg-orange-50", buttonColor: "bg-white", reverse: true },
];

export default function PremiumCollections() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="h-2 w-2 bg-pink-600 rounded-full"></span>
        <p className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">JANASYA BY JAIPUR KURTI CHAKRA</p>
        <span className="h-2 w-2 bg-pink-600 rounded-full"></span>
        <h2 className="text-3xl font-serif font-bold text-slate-800">PREMIUM COLLECTIONS</h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-100">
        {collections.map((item, index) => (
          <div 
            key={index} 
            className={`flex items-center ${item.reverse ? 'flex-row-reverse' : 'flex-row'} ${item.bgColor} h-[350px] overflow-hidden`}
          >
            {/* Image Section with Arch Clip-path */}
            <div className="w-1/2 h-full relative p-4">
              <div className="relative w-full h-full overflow-hidden border-2 border-white/50" 
                   style={{ clipPath: 'path("M0,50 Q50,0 100,50 L100,100 L0,100 Z")', transform: 'scale(1.1)' }}>
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="w-1/2 p-8 flex flex-col justify-center items-start">
              <h3 className="text-xl font-serif font-semibold mb-3 tracking-tight">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed mb-6">
                100+ suit designs. Extensive color systems ranging from 250 to 500+ options.
              </p>
              <button className={`px-4 py-2 text-[10px] font-bold tracking-widest border border-gray-300 transition-all hover:bg-black hover:text-white uppercase ${item.buttonColor === 'bg-rose-500' ? 'bg-rose-500 text-white border-none' : 'bg-transparent'}`}>
                Explore Collections →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
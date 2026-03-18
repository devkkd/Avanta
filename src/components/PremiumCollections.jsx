import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const collections = [
  {
    title: "COTTON SUIT",
    description: "Breathable, lightweight cotton suits crafted for everyday elegance. 500+ designs with vibrant color options from 250 to 500+ shades.",
    bgColor: "bg-[#FFF4D9]",
    img: "/images/collection/suit.svg",
    reverse: false,
    slug: "cotton-suit",
  },
  {
    title: "CO-ORD SETS",
    description: "Perfectly matched co-ordinated sets for a polished, effortless look. Mix, match and style with ease across 300+ curated designs.",
    bgColor: "bg-[#F9FBE7]",
    img: "/images/collection/co.svg",
    reverse: true,
    slug: "co-ord-sets",
  },
  {
    title: "TOP & TUNIC",
    description: "Versatile tops and tunics designed for modern women. Pair with palazzos, jeans or leggings — 400+ styles to choose from.",
    bgColor: "bg-[#FCE4EC]",
    img: "/images/collection/top.svg",
    reverse: false,
    slug: "top-tunic",
  },
  {
    title: "MUSLIN DUPATTA SETS",
    description: "Soft, airy muslin dupatta sets with delicate prints and rich embroidery. A timeless choice for festive and casual occasions alike.",
    bgColor: "bg-[#F3E5F5]",
    img: "/images/collection/kurti.svg",
    reverse: true,
    slug: "muslin-dupatta-sets",
  },
  {
    title: "ANARKALI DUPATTA SETS",
    description: "Graceful anarkali silhouettes paired with flowing dupattas. Crafted for celebrations with 300+ designs in rich, festive hues.",
    bgColor: "bg-[#F2F9FF]",
    img: "/images/collection/anarkali.svg",
    reverse: false,
    slug: "anarkali-dupatta-sets",
  },
  {
    title: "GOWN",
    description: "Floor-length gowns that blend tradition with contemporary flair. Statement pieces for weddings, parties and special occasions.",
    bgColor: "bg-[#FFF3E0]",
    img: "/images/collection/gown.svg",
    reverse: true,
    slug: "gown",
  },
];

const PremiumCollections = () => {
  return (
    <section className=" w-full bg-white">
      
      {/* Header */}
      <div className="text-center mb-8 md:mb-8">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
          <h3 className="text-[10px] md:text-sm font-bold font-mont text-[#1a1a3d] uppercase">
            Avanta by Jaipur Kurti Gharana
          </h3>
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 bg-pink-600 rounded-full"></span>
        </div>

        <h2 className="text-xl md:text-4xl sm:py-3 font-bold font-cinzel text-[#1a1a3d] mb-6 uppercase">
          Premium Collections
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {collections.map((item, index) => (
          <Link
            key={index}
            href={`/store/${item.slug}`}
            className={`relative flex h-[160px] md:h-[260px] ${item.bgColor} ${
              index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'
            } md:${item.reverse ? 'flex-row-reverse' : 'flex-row'} group cursor-pointer`}
          >
            {/* BG Cover Image */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'url("/images/bg-cover.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            ></div>

            {/* Image Side */}
            <div className="relative w-1/2 md:w-2/3 h-full flex items-center justify-center overflow-hidden z-10">
              <div className="relative w-full h-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-contain object-bottom"
                  priority
                />
              </div>
            </div>

            {/* Content Side */}
            <div className="relative z-10 w-1/2 md:w-1/2 px-3 py-4 md:px-6 md:py-5 md:p-8 flex flex-col justify-end items-start">
              <h3 className="text-sm md:text-lg font-cinzel font-bold text-gray-800 mb-1 md:mb-2 tracking-tight leading-tight">
                {item.title}
              </h3>
              <p className="text-[10px] md:text-[12px] text-black mb-2 md:mb-3 font-mont leading-relaxed line-clamp-3">
                {item.description}
              </p>
              <button className="px-3 py-1.5 md:px-5 md:py-2 rounded-full border border-gray-400 text-[9px] md:text-[10px] font-bold uppercase text-gray-700 transition-all duration-300 group-hover:bg-[#DA295D] group-hover:text-white group-hover:border-transparent">
                Explore +
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PremiumCollections;

import React from 'react';
import { Star } from 'lucide-react';

const PartnershipSection = () => {
  const features = [
    {
      title: "7 Years",
      subtitle: "Brand Excellence",
      description: "Established, compliant, and brand-led. Avanta operates as a fully registered entity with a proven track record in manufacturing and product innovation."
    },
    {
      title: "5,000+",
      subtitle: "Trusted Customers",
      description: "Businesses of all sizes rely on Avanta for consistent quality, reliable supply, and transparent service. Our customer base spans distributors, retailers, brands, and global sourcing partners."
    },
    {
      title: "200+",
      subtitle: "Designs Every Month",
      description: "Stay competitive with a constant pipeline of fresh and trend-driven product designs. Our design studio continuously launches updated SKUs to meet market demand and seasonal shifts."
    },
    {
      title: "Why Partner with Avanta?",
      subtitle: "",
      description: "From product innovation to reliable delivery, Avanta combines speed, capacity, and experience to strengthen your business. Connect with a manufacturing partner built for scale and long-term growth."
    },
    {
      title: "Easy to Reach, Fast to Respond",
      subtitle: "",
      description: "Our team prioritizes rapid communication and seamless coordination. Whether it's inquiries, sampling, or production updates, you get responsive support without delays."
    },
    {
      title: "White Label Manufacturing",
      subtitle: "",
      description: "Produce your designs under your own brand with complete confidentiality and scalable manufacturing support. Avanta ensures quality, consistency, and end-to-end fulfillment tailored to your private labeling needs."
    }
  ];

  return (
    <section className="bg-[#1a1a4b] text-white py-10 px-6 md:px-12 lg:px-24 font-sans flex flex-col justify-center relative overflow-hidden">
      {/* Background Pattern - Using your PNG file */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/images/pattern.png")',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundSize: 'auto'
        }}

      ></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <p className="text-xs tracking-[0.3em] uppercase mb-3 opacity-80 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            Avanta by Jaipur Kurti Charana
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          </p>
          <h2 className="text-2xl md:text-4xl font-cinzel font-bold tracking-wide mb-3">
            WHY PARTNER WITH AVANTA
          </h2>
          <p className="text-sm md:text-base opacity-90 font-light">
            Building successful partnerships through quality, reliability, and innovation
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 relative">
          {/* Horizontal Divider for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/20 -translate-y-1/2"></div>

          {features.map((item, index) => (
            <div
              key={index}
              className={`px-6 py-4 flex flex-col items-start relative
                ${index % 3 !== 2 ? 'md:border-r border-white/20' : ''}
                ${index < 3 ? 'md:pb-8' : 'md:pt-8'}
              `}
            >
              <div className="mb-3">
                <Star className="w-5 h-5 fill-white text-white rotate-12" />
              </div>

              <h3 className="text-lg font-bold mb-1">{item.title}</h3>
              {item.subtitle && <h4 className="text-base font-semibold mb-2">{item.subtitle}</h4>}

              <p className="text-sm leading-relaxed opacity-70 font-light text-justify">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
import React from 'react';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 md:py-20 font-sans text-[#333]">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Left Section: Contact Details */}
        <div className="w-full lg:w-1/3">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-800">
              Avanta by Jaipur Kurti Gharana
            </h3>
            <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif mb-12 italic text-black">
            Contact Us
          </h1>

          <div className="space-y-8">
            {/* Address */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg mb-2">Address</h4>
              <p className="text-sm leading-relaxed text-gray-600 max-w-xs">
                Plot No-6, Aaykar Nagar-II, New Sanganer Rd, near Ricco Kanta Choraha, Mansarovar, Jaipur, Rajasthan 302020 - INDIA
              </p>
            </div>

            {/* Phone */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg mb-2">Phone No</h4>
              <p className="text-sm text-gray-600">+91-9784562130</p>
            </div>

            {/* Email */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg mb-2">Email</h4>
              <p className="text-sm text-gray-600">jaipurkurtigharana@gmail.com</p>
            </div>

            {/* Business Hours */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-bold text-lg mb-2">Business Hours</h4>
              <p className="text-sm text-gray-600">Weekdays - 11AM to 8PM</p>
            </div>
          </div>
        </div>

        {/* Right Section: Images */}
        <div className="w-full lg:w-2/3 flex flex-col md:flex-row gap-6 h-[500px] md:h-[600px]">
          {/* Hawa Mahal Image */}
          <div className="relative flex-1 h-full rounded-2xl overflow-hidden shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop" 
              alt="Hawa Mahal Jaipur"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Map Image */}
          <div className="relative flex-1 h-full rounded-2xl overflow-hidden shadow-lg border border-gray-100">
             {/* Note: In a real app, replace this img with an iframe for Google Maps */}
            <img 
              src="https://maps.googleapis.com/maps/api/staticmap?center=26.8530,75.7600&zoom=15&size=600x800&markers=color:red%7C26.8530,75.7600&key=YOUR_API_KEY" 
              alt="Location Map"
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
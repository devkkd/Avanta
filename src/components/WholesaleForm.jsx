import React from 'react';
import { Upload } from 'lucide-react';

const WholesaleForm = () => {
  return (
    <div className="flex flex-col max-w-[90rem] mx-auto lg:flex-row bg-[#F9F9FF]">
      {/* Left Side: Image Section */}
      <div className="w-full lg:w-2/5 relative">
        <img
          src="/images/commitment/bulk.jpg" // Apni image ka path yahan dalein
          alt="Fashion Model"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Form Section */}
      <div className="w-full lg:w-3/5 p-5 md:p-8 lg:p-12 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl font-serif text-center mb-6 tracking-wide uppercase">
          Bulk Orders & Wholesale Partnerships
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Company Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Company Name</label>
            <input
              type="text"
              placeholder="Enter Company Name"
              className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Business Type */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Business Type</label>
            <select className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none bg-white">
              <option>Select Business Type</option>
              <option>Retailer</option>
              <option>Distributor</option>
            </select>
          </div>

          {/* Contact Person Name */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Contact Person Name</label>
            <input
              type="text"
              placeholder="Enter Contact Person Name"
              className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Phone/WhatsApp */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Phone / WhatsApp Number</label>
            <input
              type="text"
              placeholder="Enter Phone / WhatsApp Number"
              className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Country</label>
            <select className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none bg-white">
              <option>Select Country</option>
              <option>India</option>
              <option>USA</option>
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">City</label>
            <input
              type="text"
              placeholder="Enter City Name"
              className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            />
          </div>

          {/* Approximate Quantity */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Approximate Quantity</label>
            <select className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none bg-white">
              <option>Select Approximate Quantity</option>
              <option>10-50</option>
              <option>50-200</option>
              <option>200+</option>
            </select>
          </div>

          {/* Business Verification Proof Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Business Verification Proof</label>
            <select className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none bg-white">
              <option>Select your business verification proof</option>
              <option>GST Certificate</option>
              <option>Trade License</option>
            </select>
          </div>

          {/* Upload Section */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-700">Upload Business Verification Proof</label>
            <div className="relative">
              <input type="file" className="hidden" id="fileUpload" />
              <label
                htmlFor="fileUpload"
                className="flex items-center justify-between p-2.5 border border-gray-200 rounded-md cursor-pointer bg-white text-gray-400 text-xs"
              >
                <span>Upload Image</span>
                <Upload size={16} />
              </label>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-xs font-medium text-gray-700">Special Instructions</label>
            <textarea
              rows={3}
              placeholder="Write Special Instructions for Your Requirement here..."
              className="p-2.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 bg-white"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-2">
            <button
              type="submit"
              className="bg-[#1D1B4B] text-white px-8 py-2.5 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition-all text-sm font-medium"
            >
              Submit Enquiry <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WholesaleForm;
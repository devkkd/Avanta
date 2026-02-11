import React from 'react';

const ProductEnquiry = () => {
  return (
    <section className="bg-[#F9F8FF] py-16 px-4 md:px-8">
      <div className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-center text-gray-900 mb-10 tracking-widest uppercase">
          Product Enquiry
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
              <input type="text" placeholder="Enter Company Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person Name</label>
              <input type="text" placeholder="Enter Contact Person Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone / WhatsApp Number</label>
              <input type="text" placeholder="Enter Phone / WhatsApp Number" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
              <input type="text" placeholder="Enter City Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Order Frequency</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-500 appearance-none">
                <option>Select Expected Order Frequency</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-500 appearance-none">
                <option>Select Business Type</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input type="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-500 appearance-none">
                <option>Select Country</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity Required</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-500 appearance-none">
                <option>Select Quantity Required</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Delivery Timeline</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-500 appearance-none">
                <option>Select Target Delivery Timeline</option>
              </select>
            </div>
          </div>

          {/* Full Width Fields */}
          <div className="md:col-span-2 space-y-6 mt-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Customisation Requirement</label>
              <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm text-gray-500 appearance-none">
                <option>Select Customisation Requirement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Special Instructions</label>
              <textarea 
                rows="4" 
                placeholder="Write Special Instructions here..." 
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white text-sm"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button className="bg-[#1e1b4b] text-white px-10 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#2e2a6e] transition-colors">
                Submit Enquiry <span>→</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProductEnquiry;
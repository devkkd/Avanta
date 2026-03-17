"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight, Loader2, CheckCircle } from "lucide-react";

const DELAY_MS = 2500; // show after 2.5s

export default function InquiryPopup() {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    contactPersonName: "",
    phoneNumber: "",
    email: "",
    city: "",
    country: "India",
    businessType: "Retailer",
    quantityRequired: "50-100 pieces",
    expectedOrderFrequency: "Monthly",
    targetDeliveryTimeline: "2-4 weeks",
    customisationRequirement: "No customization needed",
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/customer-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => setVisible(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[999] flex flex-col items-end gap-2">

      {/* Minimized pill */}
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className="flex items-center gap-2 bg-[#1F1951] text-white px-4 py-3 rounded-full shadow-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2d2852] transition-all animate-bounce-slow"
        >
          <img src="/images/icon/whatsapp.svg" alt="" className="w-4 h-4" />
          Quick Inquiry
          <ChevronRight size={14} />
        </button>
      ) : (
        /* Full popup */
        <div className="w-[320px] sm:w-[360px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden animate-slide-up">

          {/* Header */}
          <div className="bg-[#1F1951] px-5 py-4 flex items-center justify-between">
            <div>
              <p className="text-white font-bold text-sm tracking-wide">Quick Wholesale Inquiry</p>
              <p className="text-blue-200 text-[11px] mt-0.5">Get pricing & MOQ details instantly</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMinimized(true)}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Minimize"
              >
                <span className="block w-4 h-0.5 bg-current rounded" />
              </button>
              <button
                onClick={() => setVisible(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 px-6 gap-3">
              <CheckCircle size={40} className="text-green-500" />
              <p className="text-sm font-semibold text-gray-800 text-center">Thank you! We'll reach out shortly.</p>
              <p className="text-xs text-gray-400 text-center">Our team will contact you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3 max-h-[420px] overflow-y-auto">

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Company</label>
                  <input
                    name="companyName"
                    required
                    value={form.companyName}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Contact</label>
                  <input
                    name="contactPersonName"
                    required
                    value={form.contactPersonName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Phone</label>
                  <input
                    name="phoneNumber"
                    required
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="+91 XXXXX"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@email.com (optional)"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">City</label>
                  <input
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Business</label>
                  <select
                    name="businessType"
                    value={form.businessType}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-gray-50"
                  >
                    <option>Retailer</option>
                    <option>Wholesaler</option>
                    <option>Distributor</option>
                    <option>Online Store</option>
                    <option>Boutique</option>
                    <option>Export House</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Quantity Required</label>
                <select
                  name="quantityRequired"
                  value={form.quantityRequired}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#1F1951]/20 focus:border-[#1F1951] bg-gray-50"
                >
                  <option>50-100 pieces</option>
                  <option>100-500 pieces</option>
                  <option>500-1000 pieces</option>
                  <option>1000-5000 pieces</option>
                  <option>5000+ pieces</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1F1951] hover:bg-[#2d2852] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                ) : (
                  <>Send Inquiry <ChevronRight size={14} /></>
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center">
                We'll respond within 24 hours · No spam
              </p>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

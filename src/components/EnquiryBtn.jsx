"use client";

import { useEnquiry } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function EnquiryBtn({ product }) {
  const { Enquiries, addEnquiry, removeEnquiry } = useEnquiry();

  // Using _id to match your product data structure
  const isAdded = Enquiries.some(
    (item) => item._id === product._id
  );

  const handleClick = (e) => {
    e.preventDefault();
    if (isAdded) {
      removeEnquiry(product._id);
      toast.error("Removed from Enquiry list");
      console.log("remove", product._id);
    } else {
        addEnquiry(product);
        toast.success("Added to Enquiry list");
        console.log("added", product._id);
    }
  }; 

  return (
    <button
      onClick={handleClick}
      className={`w-full border py-3 rounded-lg md:rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-wide transition-all duration-300 active:scale-95
        ${
          isAdded
            ? "bg-red-500 border-red-500 text-white"
            : "bg-[#231f40] border-[#231f40] text-white hover:bg-[#2d2852]"
        }`}
    >
      {isAdded ? "Remove" : "+ Add to Cart"}
    </button>
  );
}
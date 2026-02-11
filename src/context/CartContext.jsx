"use client";
import { createContext, useContext, useState, useEffect } from "react";

const EnquiryContext = createContext();

export function EnquiryProvider({ children }) {
    const [Enquiries, setEnquiries] = useState([]);


    // Load Enquiries from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("Enquiries");
        if (saved) setEnquiries(JSON.parse(saved));
    }, []);

    // Save Enquiries to localStorage
    useEffect(() => {
        localStorage.setItem("Enquiries", JSON.stringify(Enquiries));
        console.log(Enquiries, "new")
    }, [Enquiries]);

    // Add Enquiry (no duplicates)
    const addEnquiry = (product) => {
        setEnquiries((prev) => {
            const exists = prev.some(item => item._id === product._id);
            if (exists) return prev;
            return [...prev, product];
        });
    };


    // Remove Enquiry
const removeEnquiry = (id) => {
  setEnquiries((prev) => prev.filter(item => item._id !== id));
};


    // Clear all Enquiries
    const clearEnquiries = () => setEnquiries([]);

    return (
        <EnquiryContext.Provider
            value={{ Enquiries, addEnquiry, removeEnquiry, clearEnquiries }}
        >
            {children}
        </EnquiryContext.Provider>
    );
}

export const useEnquiry = () => useContext(EnquiryContext);

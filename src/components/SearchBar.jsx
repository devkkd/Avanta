"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Debounced search
  const search = useCallback(async (q) => {
    if (!q || q.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(q.trim())}&limit=8`);
      const data = await res.json();
      setResults(data.success ? data.data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (query.trim().length >= 2) {
      setLoading(true);
      debounceRef.current = setTimeout(() => search(query), 350);
    } else {
      setResults([]);
      setLoading(false);
    }
    return () => clearTimeout(debounceRef.current);
  }, [query, search]);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
    } else if (e.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      window.location.href = `/product/${results[activeIndex].slug}`;
    }
  };

  const clear = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  };

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={containerRef} className="relative flex-1 max-w-sm">
      {/* Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIndex(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search products, categories..."
          className="w-full bg-white/40 border border-indigo-50/50 rounded-full py-2.5 pl-11 pr-10 text-sm focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-50/30 transition-all"
          autoComplete="off"
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 z-[100] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-gray-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-400">
              No products found for &quot;{query}&quot;
            </div>
          ) : (
            <>
              <div className="px-4 pt-3 pb-1">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Products ({results.length})
                </p>
              </div>
              <ul>
                {results.map((product, i) => (
                  <li key={product._id}>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={() => { setOpen(false); setQuery(""); }}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${activeIndex === i ? "bg-indigo-50" : ""}`}
                    >
                      {/* Product Image */}
                      <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        {product.images?.main ? (
                          <img
                            src={product.images.main}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                            <Search className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{product.name}</p>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">
                          {product.categoryId?.name}
                          {product.subcategoryId?.name ? ` · ${product.subcategoryId.name}` : ""}
                        </p>
                        {product.priceRange && (
                          <p className="text-xs font-bold text-[#1F1951] mt-1">
                            ₹{product.priceRange.min.toLocaleString()} – ₹{product.priceRange.max.toLocaleString()}
                          </p>
                        )}
                      </div>

                      <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* View all results */}
              <div className="border-t border-gray-50 px-4 py-3">
                <Link
                  href={`/store?search=${encodeURIComponent(query)}`}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="flex items-center justify-between text-[11px] font-bold text-[#1F1951] hover:text-indigo-800 uppercase tracking-widest transition-colors"
                >
                  <span>View all results for &quot;{query}&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

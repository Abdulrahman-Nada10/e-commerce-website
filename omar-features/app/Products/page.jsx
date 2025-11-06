// Synchronized Products Listing Page using ProductContext
"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { ChevronLeft, ChevronRight, Loader2, Search, Filter } from "lucide-react";
import ProductCard from "../components/features/ProductCard";
import Header from "./Header";
import { useProducts } from "../context/ProductContext";

const ACCENT_COLOR = "#4EC5F5";
const TEXT_COLOR = "#060010";
const BG_COLOR = "#ffffff";

const NUM_ROWS = 6;

const ProductsListingPage = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const carouselRefs = useRef([...Array(NUM_ROWS)].map(() => React.createRef()));

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const isActive = product.active !== false; // Show active products by default
      return matchesSearch && matchesCategory && isActive;
    });
  }, [products, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return ['All', ...uniqueCategories];
  }, [products]);

  const REPEATED_PRODUCTS = useMemo(() => {
    if (filteredProducts.length === 0) return [];
    return [...filteredProducts, ...filteredProducts];
  }, [filteredProducts]);

  
  const scroll = (direction) => {
    const scrollAmount = 324;
    carouselRefs.current.forEach((ref, i) => {
      const isEven = i % 2 === 0;
      const moveLeft = isEven ? direction === "left" : direction === "right";
      if (ref.current) {
        ref.current.scrollBy({
          left: moveLeft ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    });
  };

  const CardRow = ({ items, customRef, initialDirection }) => {
    return (
      
      <div className="relative my-4">
       
        <div
          ref={customRef}
          className="flex space-x-6 overflow-x-scroll scrollbar-hide py-4 snap-x snap-mandatory"
          style={{
            direction: initialDirection === "rtl" ? "rtl" : "ltr",
            paddingLeft:
              initialDirection === "rtl" ? "calc(50% - 150px)" : "initial",
          }}
        >
          {items.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="shrink-0 w-[300px] mx-3 snap-start"
              style={{ direction: "ltr" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section>
      <Header/>
    <div
      className="w-full py-16 relative transition-opacity duration-1000"
      style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }}
    >
     
      <div className="max-w-7xl mx-auto px-6">
        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2
              className="text-2xl font-bold text-left uppercase tracking-wider"
              style={{ color: TEXT_COLOR }}
            >
              Our Products
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                  style={{ color: TEXT_COLOR }}
                />
              </div>
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white w-full sm:w-48"
                  style={{ color: TEXT_COLOR }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: ACCENT_COLOR }}
            />
          </div>
        ) : (
          <div className="relative">
        
            <button
              onClick={() => scroll("left")}
              className="absolute z-10 top-1/2 -translate-y-1/2 -left-1 sm:-left-2 md:left-3 flex items-center justify-center rounded-full shadow-md hover:shadow-xl hover:scale-103 transition-all duration-300 w-16 h-16 sm:w-16 sm:h-16 md:w-16 md:h-16 pl-4"
              style={{ backgroundColor: ACCENT_COLOR, color: TEXT_COLOR }}
            >
              <ChevronLeft className="w-16 h-16 sm:w-40 sm:h-40 md:w-32 md:h-32" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute z-10 top-1/2 -translate-y-1/2 right-1 sm:-right-2 md:-right-3 flex items-center justify-center rounded-full shadow-md hover:shadow-xl hover:scale-103 transition-all duration-300 w-16 h-16 sm:w-16 sm:h-16 md:w-16 md:h-16 pl-4"
              style={{ backgroundColor: ACCENT_COLOR, color: TEXT_COLOR }}
            >
              <ChevronRight className="w-16 h-16 sm:w-32 sm:h-32 md:w-32 md:h-32" />
            </button>

            {[...Array(NUM_ROWS)].map((_, i) => {
              const isEven = i % 2 === 0;
              return (
                <CardRow
                  key={i}
                  items={isEven ? REPEATED_PRODUCTS : [...REPEATED_PRODUCTS].reverse()}
                  customRef={carouselRefs.current[i]}
                  initialDirection={isEven ? "ltr" : "rtl"}
                />
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      </div>
    </section>
  );
};

export default ProductsListingPage;

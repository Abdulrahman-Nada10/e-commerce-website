// components/sections/ExclusiveOffersSection.jsx
"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import ProductCard from '../features/ProductCard'; 

const ACCENT_COLOR = '#4EC5F5';
const TEXT_COLOR = '#060010';
const BG_COLOR = '#ffffff'; 

const API_URL = "https://fakestoreapi.com/products?limit=10"; 

const ExclusiveOffersSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const carouselRefTop = useRef(null); 
    const carouselRefBottom = useRef(null); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const REPEATED_PRODUCTS = useMemo(() => {
        if (products.length === 0) return [];
        return [...products, ...products];
    }, [products]);


    const scroll = (direction) => {
        const scrollAmount = 324; 
        
        if (carouselRefTop.current && carouselRefBottom.current) {
            
            if (direction === 'right') {
                carouselRefTop.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                
                carouselRefBottom.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else { 
                carouselRefTop.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                
                carouselRefBottom.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const CardRow = ({ items, customRef, initialDirection }) => {
        return (
            <div className="relative">
                
                <div 
                    ref={customRef} 
                    className="flex space-x-6 overflow-x-scroll scrollbar-hide py-4 snap-x snap-mandatory"
                    style={{ 
                        direction: initialDirection === 'rtl' ? 'rtl' : 'ltr', 
                        paddingLeft: initialDirection === 'rtl' ? 'calc(50% - 150px)' : 'initial'
                    }}
                >
                    {items.map((product, index) => (
                        <div 
                            key={`${product.id}-${index}`} 
                            className={`shrink-0 w-[300px] mx-3 snap-start`} 
                            style={{ direction: 'ltr' }} 
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <section 
            className="w-full py-16 relative transition-opacity duration-1000" 
            style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }}
        >
            <div className="max-w-7xl mx-auto px-6">
                
                <h2 className="text-3xl font-bold mb-10 text-left uppercase tracking-wider">
                    Exclusive Offers
                </h2>

                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loader2 className="w-8 h-8 animate-spin" style={{ color: ACCENT_COLOR }} />
                    </div>
                ) : (
                    <div className="relative">
                        <button 
                            onClick={() => scroll('left')}
                            className="absolute z-10 top-1/2 -left-3 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hidden md:block"
                            style={{ backgroundColor: ACCENT_COLOR, color: TEXT_COLOR }}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        
                        <button 
                            onClick={() => scroll('right')}
                            className="absolute z-10 top-1/2 -right-3 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hidden md:block"
                            style={{ backgroundColor: ACCENT_COLOR, color: TEXT_COLOR }}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <CardRow 
                            items={REPEATED_PRODUCTS} 
                            customRef={carouselRefTop} 
                            initialDirection="ltr"
                        />
                        
                        <CardRow 
                            items={[...REPEATED_PRODUCTS].reverse()} 
                            customRef={carouselRefBottom} 
                            initialDirection="rtl" 
                        />
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
        </section>
    );
};

export default ExclusiveOffersSection;
// components/features/ProductCard.jsx
"use client";

import React from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

const ACCENT_COLOR = '#4EC5F5'; 
const TEXT_COLOR = '#060010';   
const CARD_BG = '#ffffff';

const ProductCard = ({ product }) => {
    
    const { id, title, price, description, image } = product;
    
    const glowStyle = {
        '--accent-color': ACCENT_COLOR,
        '--text-color': TEXT_COLOR,
    };

    return (
        <div 
            className="product-card bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 transform hover:scale-[1.02] border border-gray-100 shrink-0 w-full"
            style={{ 
                backgroundColor: CARD_BG,
            }}
        >
            <div className="relative w-full h-72 overflow-hidden p-6 flex items-center justify-center">
                <Image
                    src={image}
                    alt={title}
                    width={250}
                    height={288} 
                    className="object-contain transition-transform duration-500 hover:scale-110"
                    priority={false}
                />
            </div>

            <div className="p-5 pt-3" style={{ color: TEXT_COLOR }}>
                
                <h3 className="text-base font-semibold truncate mb-1 text-gray-800" title={title}>
                    {title}
                </h3>

                <p className="text-xs text-gray-500 mb-2 line-clamp-2 min-h-[30px]">
                    {description || "No description available."}
                </p>

                <div className="flex justify-between items-center mt-4">
                    
                    <p className="text-xl font-extrabold" style={{ color: TEXT_COLOR }}>
                        ${price.toFixed(2)}
                    </p>

                    <button
                        className="flex items-center space-x-2 py-2 px-4 rounded-full font-bold text-sm transition-all duration-300 button-glow-min"
                        style={glowStyle}
                        onClick={() => console.log(`Added product ${id} to cart`)}
                    >
                        <ShoppingCart className="w-4 h-4"/>
                        <span>Add</span>
                    </button>
                </div>
            </div>

            <style jsx>{`
                .button-glow-min {
                    background-color: var(--accent-color);
                    color: var(--text-color);
                    border: 1px solid var(--accent-color);
                }

                .button-glow-min:hover {
                    color: ${CARD_BG} !important; 
                    background-color: ${TEXT_COLOR} !important; /* لون خلفية داكن عند التحويم */
                    border-color: ${TEXT_COLOR} !important;

                    /* Button Glow Effect: توهج خفيف وأنيق حول الزر */
                    box-shadow: 
                        0 0 5px rgba(6, 0, 16, 0.4), /* ظل داكن خفيف */
                        0 0 15px rgba(78, 197, 245, 0.8); /* توهج أزرق ناعم */
                }
                
                .button-glow-min:hover svg {
                    color: ${CARD_BG} !important; 
                }
            `}</style>
        </div>
    );
};

export default ProductCard;
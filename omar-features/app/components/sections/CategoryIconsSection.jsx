// sections/CategoryIconsSection.jsx
"use client";

import React from 'react';
import { 
    Sofa, Armchair, Lamp, Bed, Table, PaintBucket,
    Monitor, BookOpen, Box, Microwave 
} from 'lucide-react'; 

const ACCENT_COLOR = '#4EC5F5'; 
const TEXT_COLOR = '#060010';    
const SECTION_BG = '#ffffff';   

const FURNITURE_CATEGORIES = [
    { name: 'Living Room', icon: Sofa, slug: 'living-room' },
    { name: 'Dining Tables', icon: Table, slug: 'dining-tables' },
    { name: 'Office Chairs', icon: Armchair, slug: 'office-chairs' },
    { name: 'Lighting', icon: Lamp, slug: 'lighting' },
    { name: 'Bed & Bath', icon: Bed, slug: 'bed-bath' },
    { name: 'Home Decor', icon: PaintBucket, slug: 'home-decor' },
    { name: 'Office Desks', icon: Monitor, slug: 'office-desks' },
    { name: 'Shelving', icon: BookOpen, slug: 'shelving' },
    { name: 'Storage Solutions', icon: Box, slug: 'storage' },
    { name: 'Kitchen Appliances', icon: Microwave, slug: 'kitchen-appliances' },
];

const REPEATED_CATEGORIES = [...FURNITURE_CATEGORIES, ...FURNITURE_CATEGORIES, ...FURNITURE_CATEGORIES];

const CategoryIconsSection = () => {

    const CategoryItem = ({ category, index }) => (
        <a 
            key={index} 
            href={`/categories/${category.slug}`} 
            className="category-icon-item flex flex-col items-center group shrink-0 w-[150px] text-center cursor-pointer transition-colors duration-300 mx-4" 
        >
            <div 
                className={`
                    w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full border-2 border-gray-200 transition-all duration-300 mb-2 
                    relative bg-[#f7f7f7] shadow-md 
                    group-hover:border-[${ACCENT_COLOR}] 
                    /* ✅ FIX: إزالة المسافات السفلية (_) لتهدئة تحذير IntelliSense */
                    group-hover:shadow-[0_0_8px_var(--tw-glow-color),0_0_20px_var(--tw-glow-color),0_0_30px_rgba(78,197,245,0.7)]
                `}
                style={{ 
                    '--tw-glow-color': ACCENT_COLOR,
                }} 
            >
                <category.icon 
                    className={`
                        w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 
                        text-[${ACCENT_COLOR}] /* ✅ إعادة ضبط اللون الأصلي */
                        group-hover:text-[${TEXT_COLOR}]
                    `}
                />
            </div>
            
            <p className="text-sm font-semibold transition-colors duration-300 group-hover:text-gray-700 whitespace-normal">
                {category.name}
            </p>
        </a>
    );

    return (
        <section className="w-full pt-2 pb-16 overflow-hidden" style={{ backgroundColor: SECTION_BG, color: TEXT_COLOR }}>
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <h2 className="text-2xl font-bold text-left uppercase tracking-wider" style={{ color: TEXT_COLOR }}>
                    Product Categories
                </h2>
            </div>
            
            <div className="w-full relative overflow-hidden" style={{ backgroundColor: SECTION_BG }}>
                
                <div 
                    className="marquee-content-categories whitespace-nowrap will-change-transform flex"
                    onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                    onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
                >
                    {REPEATED_CATEGORIES.map((category, index) => (
                        <CategoryItem key={index} category={category} index={index}/>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee-categories {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-33.333%); } 
                }
                
                .marquee-content-categories {
                    animation: marquee-categories 25s linear infinite; 
                    display: inline-flex;
                    min-width: 300%; 
                }
                
                .category-icon-item .rounded-full {
                    position: relative;
                    background-color: #f7f7f7;
                    transition: box-shadow 0.3s ease-in-out, border-color 0.3s ease-in-out;
                }
            `}</style>
        </section>
    );
};

export default CategoryIconsSection;
// sections/CategoryIconsSection.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import {
  Sofa,
  Armchair,
  Lamp,
  Bed,
  Table,
  PaintBucket,
  Monitor,
  BookOpen,
  Box,
  Microwave,
} from "lucide-react";

const ACCENT_COLOR = "#4EC5F5";
const TEXT_COLOR = "#060010";
const SECTION_BG = "#ffffff";

const CategoryIconsSection = () => {
  const { categories } = useProducts();
  const [apiCategories, setApiCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:7118/api/Categories?languageCode=ar&search=Living%20Room&isActive=true");
        const data = await response.json();

        if (data.success && data.data) {
          setApiCategories(data.data);
        } else {
          setApiCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        // Fallback to mock data matching API structure
        const fallbackCategories = [
          {
            categoryID: 1,
            title: "غرفة المعيشة",
            description: "مجموعة واسعة من أثاث غرفة المعيشة لتوفير الراحة والخصوصية",
            icon: "fa-solid fa-couch",
            isActive: true,
            displayOrder: 1,
            createdAt: "2025-11-03T00:30:06.387"
          }
        ];
        setApiCategories(fallbackCategories);
      }
    };
    fetchCategories();
  }, []);

  // Icon mapping based on category title or icon field
  const getIconForCategory = (category) => {
    // First try to map by title
    const titleIconMap = {
      "غرفة المعيشة": Sofa,
      "Living Room": Sofa,
      "Dining Tables": Table,
      "Office Chairs": Armchair,
      "Lighting": Lamp,
      "Bed & Bath": Bed,
      "Home Decor": PaintBucket,
      "Office Desks": Monitor,
      "Shelving": BookOpen,
      "Storage Solutions": Box,
      "Kitchen Appliances": Microwave,
    };

    // Check title first
    if (category.title && titleIconMap[category.title]) {
      return titleIconMap[category.title];
    }

    // Fallback to Sofa
    return Sofa;
  };

  const REPEATED_CATEGORIES = [
    ...apiCategories,
    ...apiCategories,
    ...apiCategories,
  ];

  const CategoryItem = ({ category, index }) => {
    const IconComponent = getIconForCategory(category);

    return (
      <a
        key={index}
        href={`/categories/${category.categoryID}`}
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
            "--tw-glow-color": ACCENT_COLOR,
          }}
        >
          <IconComponent
            className={`
                          w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 
                          text-[${ACCENT_COLOR}] /* ✅ إعادة ضبط اللون الأصلي */
                          group-hover:text-[${TEXT_COLOR}]
                      `}
          />
        </div>

        <p className="text-sm font-semibold transition-colors duration-300 group-hover:text-gray-700 whitespace-normal">
          {category.title}
        </p>
      </a>
    );
  };

  return (
    <section
      className="w-full pt-2 pb-16 overflow-hidden"
      style={{ backgroundColor: SECTION_BG, color: TEXT_COLOR }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-16 mt-8">
        <h2
          className="text-2xl font-bold text-left uppercase tracking-wider"
          style={{ color: TEXT_COLOR }}
        >
          Product Categories
        </h2>
      </div>

      <div
        className="w-full relative overflow-hidden"
        style={{ backgroundColor: SECTION_BG }}
      >
        <div
          className="marquee-content-categories whitespace-nowrap will-change-transform flex"
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {REPEATED_CATEGORIES.map((category, index) => (
            <CategoryItem key={index} category={category} index={index} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-categories {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
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

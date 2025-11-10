"use client";

import { motion } from "framer-motion";
import FeatureSection from "./FeatureSection";
import { sectionsData, SectionData } from "../components/constants/DataAbout";
import Header from "./Header";
import AnimatedButton from "../components/constants/AnimatedButton"; 
export default function AboutPage() {
  return (
    <div className="relative w-full overflow-hidden bg-white">
      {/* ===================================================
          ====== 1. Hero / Header Section ======
      =================================================== */}
     <Header/>

      {/* ===================================================
          ====== 2. Overview Section ======
      =================================================== */}
      <motion.div
        className="relative z-10 text-center px-4 my-24"
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.9 }}
      >
        <h2 className="font-bold text-3xl mb-6">Overview</h2>
        <p className="max-w-2xl mx-auto text-gray-700 text-lg leading-relaxed">
          At TechNest, we offer a wide range of stylish and high-quality
          furniture to transform your living spaces. From elegant sofas and
          cozy chairs to functional tables and storage solutions, each piece
          is designed with comfort and durability in mind. Our collections
          blend modern design with timeless craftsmanship to suit any home.
        </p>
      </motion.div>

      <div className="relative bg-blue-50 overflow-hidden py-24">
 
        <div className="absolute top-20 right-0 w-5/6 h-300 bg-blue-100 rounded-[6rem] translate-x-1/4 -translate-y-1/4 z-0"></div>
        <div className="absolute bottom-0 left-0 w-5/6 h-400 bg-blue-100 rounded-[6rem] -translate-x-1/4 translate-y-1/4 z-0"></div>

        <div className="relative z-10 px-6 md:px-20 py-16 space-y-16">
          {sectionsData.map((section: SectionData, index: number) => (
            <div key={index} className="relative z-10">
              <FeatureSection {...section} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

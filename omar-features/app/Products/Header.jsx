"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "../components/gsap/AnimatedBackground";
import GlowPillButton from "../components/gsap/GlowPillButton";

const baseColor = "#4EC5F5";
const changingWords = [
  "QUALITY",
  "FURNITURE",
  "COMFORT",
  "DESIGN",
  "STYLE",
  "LUXURY",
  "AESTHETICS",
];

const Header = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(
        (prevIndex) => (prevIndex + 1) % changingWords.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <header className="relative w-full min-h-[70vh] md:min-h-[70vh] lg:min-h-70vh flex flex-col items-center justify-center overflow-hidden font-['Poppins'] bg-[#E0F7FA] px-4 sm:px-8 md:px-12 py-16">
      <AnimatedBackground />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-center h-full"
      >
        <div className="w-full max-w-4xl p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl">
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-snug text-gray-800 flex flex-col items-center justify-center"
          >
            <span className="whitespace-nowrap text-balance px-2">
              THE NEXT VERSION OF
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  style={{ color: baseColor }}
                  className="inline-block ml-2"
                >
                  {changingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>

            <span className="block text-center mt-3 text-base sm:text-xl md:text-2xl">
              TO GET WHAT YOU DESERVE.
            </span>
          </motion.p>

          <div className="mt-10 flex justify-center">
            <GlowPillButton
              baseColor={baseColor}
              className="bg-[#4EC5F5] hover:bg-[#0056D2] text-white font-semibold py-3 px-8 sm:px-10 md:px-12 text-sm sm:text-base rounded-full transition duration-300"
            >
              EXPLORE
            </GlowPillButton>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;

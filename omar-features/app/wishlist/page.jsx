"use client";

import React from "react";
import { motion } from "framer-motion";
import WishlistHeader from "../components/wishlist/WishlistHeader";
import WishlistGrid from "../components/wishlist/WishlistGrid";
import AnimatedBackground from "../components/gsap/AnimatedBackground";

const WishlistPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50/30 to-gray-50 pt-24 pb-12 relative overflow-hidden"
    >

      <div className="absolute inset-0 -z-10">
        <AnimatedBackground/>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <WishlistHeader />
        <WishlistGrid />
      </div>
    </motion.div>
  );
};

export default WishlistPage;
// components/wishlist/WishlistHeader.jsx
"use client";

import React from "react";
import { Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { selectWishlist } from '../../store/slices/wishlistSlice';
import { COLORS } from "../constants/Colors";

const WishlistHeader = () => {
  const wishlist = useSelector(selectWishlist);
  const wishlistItemCount = wishlist ? wishlist.length : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center mb-12 relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-linear-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-linear-to-br from-pink-100 to-purple-100 rounded-full blur-3xl opacity-50"
        />
      </div>

      <div className="flex items-center justify-center mb-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.2 
          }}
          className="relative"
        >
          <Heart 
            className="w-12 h-12 mr-4 fill-current" 
            style={{ color: COLORS.primary }} 
          />
          
          {/* Animated sparkles around heart */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-5xl font-black bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent"
        >
          My Wishlist
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="inline-flex items-center gap-3 bg-linear-to-r from-blue-50 to-cyan-50 px-6 py-3 rounded-full shadow-md"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: COLORS.primary }}
        />
        <p className="text-gray-700 font-semibold">
          <motion.span
            key={wishlistItemCount}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black"
            style={{ color: COLORS.primary }}
          >
            {wishlistItemCount}
          </motion.span>
          {' '}
          <span className="text-base">
            {wishlistItemCount === 1 ? 'item' : 'items'} saved
          </span>
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-4 text-gray-500 text-sm"
      >
        Your curated collection of favorites
      </motion.p>
    </motion.div>
  );
};

export default WishlistHeader;


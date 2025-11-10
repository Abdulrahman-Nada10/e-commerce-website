// components/wishlist/WishlistGrid.jsx
"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from 'react-redux';
import { selectWishlist } from '../../store/slices/wishlistSlice';
import WishlistItem from "./WishlistItem";
import { Heart, Sparkles } from "lucide-react";
import { COLORS } from "../constants/Colors";

const WishlistGrid = () => {
  const wishlist = useSelector(selectWishlist);

  // No loading or error states needed for context-based wishlist

  if (!wishlist || wishlist.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center py-20 bg-linear-to-br from-gray-50 to-blue-50 rounded-3xl shadow-lg mx-4 relative overflow-hidden"
      >
        
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 text-blue-100"
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 text-blue-100"
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <Heart className="w-24 h-24 text-gray-300 mb-6" />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-24 h-24 border-4 border-blue-200 rounded-full opacity-30" />
          </motion.div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-700 mb-3"
        >
          Your wishlist is empty
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-center max-w-md mb-8 px-4"
        >
          Start adding products to your wishlist to keep track of items you love.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(78, 197, 245, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-xl font-bold text-white shadow-lg"
          style={{ backgroundColor: COLORS.primary }}
          onClick={() => window.location.href = '/'}
        >
          Start Shopping
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <AnimatePresence mode="popLayout">
        {wishlist.map((product, index) => (
          <WishlistItem key={product.id} product={product} index={index} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default WishlistGrid;


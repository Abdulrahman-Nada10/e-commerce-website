// components/wishlist/WishlistItem.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { removeFromWishlist } from '../../store/slices/wishlistSlice';
import { COLORS } from "../constants/Colors";
import DefaultButton from "../Ui/DefaultButton";
import toast from 'react-hot-toast';

const WishlistItem = ({ product, index }) => {
  const { id, title, price, description, image } = product;
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${title} added to cart!`, {
      style: {
        background: '#10B981',
        color: '#fff',
      },
      icon: '🛒',
    });
  };

  const handleRemoveFromWishlist = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromWishlist(id));
      toast.success(`${title} removed from wishlist!`, {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
        icon: '💔',
      });
    }, 300);
  };

  const direction = index % 2 === 0 ? -100 : 100;

  return (
    <AnimatePresence mode="wait">
      <motion.div
  layout
  initial={{ opacity: 0, x: direction }}
  animate={{
              opacity: isRemoving ? 0 : 1,
          x: isRemoving ? direction : 0,
          scale: isRemoving ? 0.8 : 1
  }}
  exit={{
    opacity: 0,
    x: direction,
    scale: 0.8,
    height: 0,
    marginBottom: 0
  }}
  transition={{
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96],
    delay: index * 0.1
  }}

        whileHover={{ y: -4 }}
        className="wishlist-item bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative group"
      >

        <div className="absolute inset-0 bg-linear-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-center p-6 relative z-10">

          <motion.div
            className="relative w-28 h-28 shrink-0 mr-6 overflow-hidden rounded-xl bg-gray-100"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={image}
              alt={title}
              width={112}
              height={112}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              priority={false}
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md"
            >
              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            </motion.div>
          </motion.div>


          <div className="grow min-w-0">
            <motion.h3
              className="text-xl font-bold mb-2 text-gray-800 truncate pr-2"
              title={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {title}
            </motion.h3>

            <motion.p
              className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {description || "No description available."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="flex items-baseline gap-2"
            >
              <span className="text-2xl font-black bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ${price.toFixed(2)}
              </span>
            </motion.div>
          </div>


          <motion.div
            className="flex items-center gap-3 ml-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >

            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(78, 197, 245, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:shadow-xl"
              style={{
                backgroundColor: COLORS.primary,
                color: COLORS.textLight,
              }}

            >
              <DefaultButton
              className="py-3 px-6 rounded-xl flex items-center space-x-2  "
               onClick={handleAddToCart}
               >


                <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Add to Cart</span>

              </DefaultButton>

            </motion.div>


            <motion.button
              whileHover={{
                scale: 1.1,
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRemoveFromWishlist}
              className="relative p-3 rounded-xl bg-linear-to-r from-red-500 to-pink-600 text-white shadow-md hover:shadow-xl transition-all duration-300 group/btn overflow-hidden"
              aria-label="Remove from wishlist"
            >
              <div className="absolute inset-0 bg-linear-to-r from-red-600 to-pink-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />

              <motion.div
                className="relative z-10"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Trash2 className="w-5 h-5" />
              </motion.div>

              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ scale: 0, opacity: 0.5 }}
                whileHover={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{ background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)" }}
              />
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          className="h-1 bg-linear-to-r from-blue-500 via-cyan-400 to-blue-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
          style={{ transformOrigin: direction > 0 ? "left" : "right" }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default WishlistItem;

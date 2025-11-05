"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCart } from "../../context/CartContext";
import AnimatedBackground from "../gsap/AnimatedBackground";
import GlowPillButton from "../gsap/GlowPillButton";

const baseColor = "#4EC5F5";
const pillColor = "#ffffff";
const textColor = "#060010";

const changingWords = ["FUTURE", "STYLE", "CHOICE", "VIBE", "POWER"];

const CartSection = () => {
  const { cart, removeFromCart, updateQuantity, addToCart } = useCart();
  const [currentWord, setCurrentWord] = useState(changingWords[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => {
        const currentIndex = changingWords.indexOf(prev);
        return changingWords[(currentIndex + 1) % changingWords.length];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const shippingEstimate = 0;
  const estimatedTax = subtotal * 0.1;
  const total = subtotal + shippingEstimate + estimatedTax;

  const CartItem = ({ item, isLast }) => (
    <div
      className={`flex flex-col sm:flex-row items-center sm:items-start py-6 relative ${
        isLast ? "" : "border-b border-gray-200"
      }`}
    >
      <button
        onClick={() => removeFromCart(item.id)}
        className="absolute top-2 right-2 text-red-500 hover:text-red-600 transition p-1 rounded-full z-10"
        title="Remove item"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>

      <div className="w-24 h-24 relative rounded-lg overflow-hidden shrink-0 sm:mr-6 bg-white">
        <Image
          src={item.image || "/images/placeholder.jpg"}
          alt={item.name || "Product Image"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex-1 flex flex-col mt-4 sm:mt-0">
        <p className="font-semibold text-[#060010] text-lg">{item.name}</p>
        <p className="text-[#060010]/70 mt-1">${item.price.toFixed(2)}</p>

        <div className="flex items-center mt-4">
          <button
            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
            className="font-bold border border-[#060010]/40 rounded-l-md w-8 h-8 flex items-center justify-center hover:bg-white transition"
            disabled={(item.quantity || 1) <= 1}
          >
            -
          </button>

          <span className="w-10 h-8 flex items-center justify-center bg-white text-black border border-[#060010]/40 rounded-md mx-1">
            {item.quantity || 1}
          </span>

          <button
            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
            className="font-bold border border-[#060010]/40 rounded-r-md w-8 h-8 flex items-center justify-center hover:bg-white transition"
          >
            +
          </button>
        </div>
      </div>

      <div className="shrink-0 w-24 mt-4 sm:mt-0 flex justify-end">
        <span className="font-semibold text-[#060010] text-lg">
          ${(item.price * (item.quantity || 1)).toFixed(2)}
        </span>
      </div>
    </div>
  );

  const relatedProducts = [
    { id: "r1", name: "Cool T-Shirt", price: 29.99, image: "/images/placeholder.jpg" },
    { id: "r2", name: "Running Shoes", price: 59.99, image: "/images/placeholder.jpg" },
    { id: "r3", name: "Smart Watch", price: 99.99, image: "/images/placeholder.jpg" },
    { id: "r4", name: "Hoodie", price: 45.99, image: "/images/placeholder.jpg" },
    { id: "r5", name: "Sunglasses", price: 25.99, image: "/images/placeholder.jpg" },
  ];

  return (
    <div className="font-['Poppins']">
      <header className="relative w-full min-h-[70vh] md:min-h-[70vh] lg:min-h-70vh flex flex-col items-center justify-center overflow-hidden bg-white border-b border-[#060010]/20 shadow-sm">
        <AnimatedBackground baseColor={baseColor} />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide mb-4 text-[#060010]">
            YOUR CART, YOUR
            <motion.span
              key={currentWord}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#4EC5F5]"
            >
              {currentWord}
            </motion.span>
          </h1>
          <Link href="/products">
            <GlowPillButton
              baseColor={baseColor}
              className="mt-2 py-3 px-8 text-white font-semibold rounded-full text-lg shadow-lg hover:scale-105 transition-all"
            >
              SHOP NOW
            </GlowPillButton>
          </Link>
        </motion.div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-xl shadow-lg border border-[#060010]/20">
            <h2 className="text-xl font-bold mb-6 text-[#060010] tracking-wide border-b pb-4 border-[#060010]/20">
              SHOPPING CART ({cart.length})
            </h2>
            {cart.length === 0 ? (
              <p className="text-[#060010]/70 text-center py-10">Your cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <CartItem key={item.id} item={item} isLast={index === cart.length - 1} />
              ))
            )}
          </section>

          <section className="mt-10 bg-white p-6 rounded-xl shadow-lg border border-[#060010]/20">
            <h2 className="text-xl font-bold mb-4 text-[#060010]">Related Products</h2>
            <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-300">
              {relatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="min-w-[180px] shrink-0 border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
                >
                  <div className="w-full h-40 bg-gray-100 rounded-lg mb-2 relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className="font-semibold text-[#060010]">{product.name}</p>
                  <p className="text-[#060010]/70">${product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 w-full py-1 text-sm bg-[#4EC5F5] text-white rounded-md hover:opacity-80 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <section className="p-6 bg-white border border-[#060010]/20 rounded-xl shadow-xl sticky top-20 flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-6 text-[#060010] tracking-wide border-b pb-4 border-[#060010]/20 text-center">
              ORDER SUMMARY
            </h2>

            <div className="space-y-3 text-[#060010]/90 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingEstimate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t border-[#060010]/20">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-center w-full">
              <Link href="/checkout" className="w-full flex justify-center">
                <GlowPillButton
                  baseColor={baseColor}
                  className="mt-3 py-3 px-8 rounded-full text-white font-semibold uppercase shadow-lg hover:scale-105 transition-all"
                >
                  CHECKOUT
                </GlowPillButton>
              </Link>
            </div>

            <Link href="/products">
              <button className="w-full mt-3 py-2 font-medium text-[#060010] hover:text-[#4EC5F5] transition-all">
                CONTINUE SHOPPING
              </button>

            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CartSection;
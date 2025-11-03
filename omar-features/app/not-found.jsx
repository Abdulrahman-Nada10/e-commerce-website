"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft, Compass, AlertCircle } from "lucide-react";
import Link from "next/link";
import AnimatedBackground from "./components/gsap/AnimatedBackground";
import DefaultButton from "./components/Ui/DefaultButton";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#E0F7FA] text-[#060010] font-['Poppins'] pt-20 pb-10 overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center">
  
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              type: "spring",
              bounce: 0.4
            }}
            className="mb-8"
          >
            <h1 className="text-8xl md:text-9xl font-bold text-[#4EC5F5] mb-4 tracking-wider">
              404
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-[#060010] mb-4"
            >
              Page Not Found
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </motion.p>
          </motion.div>

          <div className="flex justify-center items-center gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -100, y: 20 }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 1.0,
                delay: 0.8,
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              className="hidden md:flex items-center justify-center w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
            >
              <Compass className="text-[#4EC5F5]" size={32} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: [0, 360]
              }}
              transition={{
                duration: 1.2,
                delay: 1.0,
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
              className="w-32 h-32 bg-linear-to-br from-[#4EC5F5] to-[#87CEEB] rounded-full flex items-center justify-center shadow-xl relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center"
              >
                <AlertCircle className="text-[#4EC5F5]" size={32} />
              </motion.div>
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-[#4EC5F5] rounded-full"
              />
              <motion.div
                animate={{
                  y: [10, -10, 10],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#87CEEB] rounded-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100, y: -20 }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: [0, -5, 5, 0]
              }}
              transition={{
                duration: 1.0,
                delay: 0.8,
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }
              }}
              className="hidden md:flex items-center justify-center w-24 h-24 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
            >
              <ArrowLeft className="text-[#4EC5F5]" size={32} />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/">
                <DefaultButton className="rounded-full py-3 px-8 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-2 items-center">
                     <Home size={20} />
                  Go Home
                     
                    </div>
                </DefaultButton>
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="flex items-center px-8 py-3 border-2 border-[#4EC5F5] text-[#4EC5F5] rounded-full font-semibold hover:bg-[#4EC5F5] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft size={20} className="mr-2" />
              Go Back
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12 max-w-md mx-auto"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
            >
              <h3 className="text-lg font-semibold text-[#060010] mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                If you believe this is an error, please contact our support team.
              </p>
              <div className="flex justify-center">
                <Link href="/help">
                  <span className="text-[#4EC5F5] hover:underline text-sm font-medium">
                    Contact Support
                  </span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

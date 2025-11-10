"use client";
import { motion } from "framer-motion";
import AnimatedButton from "../components/constants/AnimatedButton"; // أو المسار الصحيح عندك
import { COLORS } from "../components/constants/Colors";

interface FeatureSectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  buttonText: string;
  buttonLink: string;
}

export default function FeatureSection({
  title,
  description,
  image,
  reverse = false,
  buttonText,
  buttonLink,
}: FeatureSectionProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-start justify-center my-20 ${
        reverse ? "md:flex-row-reverse" : ""
      } gap-30 max-w-7xl mx-auto px-6`} 
    >
   
      <motion.img
        src={image}
        alt={title}
        className="w-5/6 md:w-1/2 rounded-2xl h-68 shadow-2xl object-cover"
        initial={{ x: reverse ? 200 : -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />

      <motion.div
        className="w-full md:w-1/2 text-center md:text-left"
        initial={{ x: reverse ? -200 : 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }} 
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-4" style={{ color: COLORS.primary }}>
          {title}
        </h2>
        <p className="text-lg mb-6" style={{ color: COLORS.textDark }}>
          {description}
        </p>

        <AnimatedButton
          onClick={() => window.location.href = buttonLink}
          filled={true} 
        >
          {buttonText}
        </AnimatedButton>
      </motion.div>
    </div>
  );
}


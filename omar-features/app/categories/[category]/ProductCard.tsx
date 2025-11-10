"use client";
import { motion } from "framer-motion";
import { COLORS } from "../../components/constants/Colors";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  index?: number;
}

export default function ProductCard({ name, price, image, index = 0 }: ProductCardProps) {
  return (
    <motion.div
  initial={{ opacity: 0, y: 50, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  transition={{
    duration: 0.8,
    delay: index * 0.2,
    ease: [0.25, 0.1, 0.25, 1],
  }}
  viewport={{ once: true, amount: 0.3 }}
  whileHover={{
    y: -10,
    scale: 1.03,
    boxShadow: `0 15px 30px ${COLORS.primary}40`,
  }}
  className="flex flex-col items-center justify-start rounded-2xl border-2 bg-white transition-all duration-500 p-4 cursor-pointer"
  style={{ borderColor: COLORS.primary }}
>

  <motion.div
    className="w-full h-48 rounded-2xl overflow-hidden mb-4 relative"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover"
    />
  
    <motion.div
      className="absolute inset-0 bg-black/10 opacity-0"
      whileHover={{ opacity: 0.1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.div>

  <p className="font-semibold text-lg text-gray-700 mb-1 text-center">{name}</p>

  
  <motion.p
    className="font-bold text-gray-500 text-sm"
    whileHover={{ color: COLORS.primary }}
    transition={{ duration: 0.3 }}
  >
    {price}
  </motion.p>
</motion.div>

  );
}

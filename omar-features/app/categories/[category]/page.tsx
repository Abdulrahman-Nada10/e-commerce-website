"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { productsData } from "../../components/constants/DataAbout";
import ProductCard from "./ProductCard";
import Header from "../Header";

export default function CategoryPage() {
  const { category } = useParams();
  const products = productsData[category as string] || [];

  const titles: Record<string, string> = {
    bedrooms: "Bedroom Collection",
    kids: "Kids Room Collection",
    living: "Living Room Collection",
    kitchen: "Kitchen Collection",
  };

  // أنيميشن الكونتينر - ظهور متتابع وهادئ
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.3,
      },
    },
  };

  // أنيميشن كل منتج
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl font-bold mb-10 text-center text-gray-800 tracking-wide"
        >
          {titles[category as string] || "Category"}
        </motion.h1>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            No products available yet.
          </p>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show" 
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          >
            {products.map((p) => (
              <motion.div key={p.id} variants={itemVariants}>
                <ProductCard name={p.name} price={p.price} image={p.image} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Header from "./Header";

import GlowPillButton from "../components/gsap/GlowPillButton";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  // fadeUp animation helper
  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: "easeOut" } },
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="w-full relative z-10">
        <Header />
      </div>

      {/* Page Content Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center px-4 pt-24 pb-20 relative z-20"
      >
        <motion.div
          className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-10 border border-gray-100 z-20"
        >
          {/* Title + Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl  text-black font-bold text-center mb-3 text-primary">
              Contact Us
            </h1>
            <p className="text-center  text-black mb-10 text-sm text-textDark">
              We’d love to hear from you. Send us a message
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 text-center"
          >
            {[
              { Icon: Mail, text: "support@example.com" },
              { Icon: Phone, text: "+20-123-456-789" },
              { Icon: MapPin, text: "Cairo, Egypt" },
            ].map(({ Icon, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.08 }}
                className="flex  text-black flex-col items-center gap-2 cursor-pointer"
              >
                <div className="p-3 rounded-full hover:bg-indigo-50 transition-all duration-300">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm  text-black font-medium text-textDark">
                  {text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form Inputs */}
          <form className="space-y-5">
            {[
              { placeholder: "Your Name", value: form.name, key: "name" },
              { placeholder: "Your Email", value: form.email, key: "email" },
              { placeholder: "Your Message...", value: form.message, key: "message", textarea: true },
            ].map((field, i) =>
              field.textarea ? (
                <motion.textarea
                  key={field.key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  rows={4}
                  placeholder={field.placeholder}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full text-black p-4 border border-gray-300 rounded-xl shadow-sm text-sm
                  focus:ring-4 focus:ring-indigo-200 focus:border-transparent outline-none"
                />
              ) : (
                <motion.input
                  key={field.key}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  type={field.key === "email" ? "email" : "text"}
                  placeholder={field.placeholder}
                  value={field.key === "name" ? form.name : form.email}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full text-black p-4 border border-gray-300 rounded-xl shadow-sm text-sm
                  focus:ring-4 focus:ring-indigo-200 focus:border-transparent outline-none"
                />
              )
            )}

            {/* Send Button */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex justify-center  text-black"
            >
              <GlowPillButton onClick={() => {}}>
                Send
              </GlowPillButton>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

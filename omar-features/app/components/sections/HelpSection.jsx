// app/components/sections/HelpSection.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import AnimatedBackground from "../gsap/AnimatedBackground";
import GlowPillButton from "../gsap/GlowPillButton";

const baseColor = "#4EC5F5";
const textColorHex = "#060010";

const rotatingWords = ["SUPPORT", "ANSWERS", "CLARITY", "HELP"];

const faqs = [
  {
    id: 1,
    question: "What are the available shipping options?",
    answer: "We offer Standard Shipping (3-7 business days) and Express Shipping (1-2 business days). Estimated costs are displayed during the checkout process.",
  },
  {
    id: 2,
    question: "How can I return or exchange a product?",
    answer: "Products can be returned within 30 days of the purchase date. Please visit our 'Returns' page to initiate the process. Items must be unused and in original packaging.",
  },
  {
    id: 3,
    question: "Do you offer a product warranty?",
    answer: "Yes, all electronic devices come with a one-year warranty against manufacturing defects. Check the product page for specific warranty details.",
  },
  {
    id: 4,
    question: "Which payment methods do you accept?",
    answer: "We accept Visa, MasterCard, and American Express, as well as payments via PayPal and Apple Pay.",
  },
];

const FAQItem = ({ faq, isOpen, onClick }) => {
  return (
    <div className={`border-b border-[#060010]/10 rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-md bg-gray-50' : 'bg-[#ffffff]'}`}>
      <motion.button
        onClick={onClick}
        className="flex justify-between items-center w-full p-5 text-left font-semibold text-lg"
        style={{ color: textColorHex }}
      >
        <span>{faq.question}</span>
        {isOpen ? (
          <MinusIcon className="w-5 h-5 text-[#4EC5F5] shrink-0" />
        ) : (
          <PlusIcon className="w-5 h-5 text-[#060010]/70 shrink-0" />
        )}
      </motion.button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-5 pt-0"
          >
            <p className="text-[#060010]/80 leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const HelpSection = () => {
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const toggleFAQ = (id) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };
  
  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000); 
  };

  const currentWord = rotatingWords[currentWordIndex];

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
            NEED QUICK
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
          <Link href="#contact-form">
            <GlowPillButton
              baseColor={baseColor}
              className="m-5 mt-5 py-3 px-8 text-white font-semibold rounded-full text-lg shadow-lg hover:scale-105 transition-all"
            >
            Send your Issue          
              </GlowPillButton>
          </Link>
        </motion.div>
      </header>

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`bg-[#ffffff] p-8 rounded-xl shadow-2xl border border-[#060010]/10 mb-12`}
        >
            <h2 className={`text-3xl font-extrabold mb-8 text-center text-[#060010] tracking-tight`}>
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openQuestionId === faq.id}
                  onClick={() => toggleFAQ(faq.id)}
                />
              ))}
            </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          id="contact-form"
          className={`bg-[#ffffff] p-8 rounded-xl shadow-2xl border border-[#060010]/10`}
        >
          <h2
 className={`text-3xl font-extrabold mb-8 text-center text-[#060010] tracking-tight border-b pb-4 border-[#060010]/10`}
 >
            Leave your issue and we will contact you
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#060010]/90 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleFormChange}
                required
                className="w-full p-3 border border-[#060010]/20 rounded-lg focus:ring-2 focus:ring-[#4EC5F5] focus:border-[#4EC5F5] outline-none transition text-[#060010]/90"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#060010]/90 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleFormChange}
                required
                className="w-full text-[#060010]/90 p-3 border border-[#060010]/20 rounded-lg focus:ring-2 focus:ring-[#4EC5F5] focus:border-[#4EC5F5] outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#060010]/90 mb-2">Message / Issue</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formState.message}
                onChange={handleFormChange}
                required
                className="w-full text-[#060010]/90 p-3 border border-[#060010]/20 rounded-lg focus:ring-2 focus:ring-[#4EC5F5] focus:border-[#4EC5F5] outline-none transition"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-[#4EC5F5] text-white font-bold rounded-lg shadow-lg hover:bg-[#34b6e5] transition-all"
              disabled={isSubmitted}
            >
              Send Message
            </button>
          
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 mt-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center font-medium"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default HelpSection;
"use client";

import { motion } from "framer-motion";
import GlowPillButton from "../gsap/GlowPillButton";
import Link from "next/link";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const Header = () => {
    return (
        <div className='relative w-full min-h-[50vh] flex flex-col items-center justify-center shadow-xl overflow-hidden bg-[#E0F7FA] px-4 sm:px-8 md:px-12 py-16'>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto text-center h-full"
            >
                <h1 className='text-[#4EC5F5] font-bold text-3xl'>{"Deep Dive Into Innovation".toUpperCase()}</h1>
                <div className="mt-10 flex justify-center">
                    <GlowPillButton
                        baseColor="#4EC5F5"
                        className="bg-[#4EC5F5] hover:bg-[#0056D2] text-white font-semibold py-3 px-8 sm:px-10 md:px-12 text-sm sm:text-base rounded-full transition duration-300"
                    >
                        Shop Now
                    </GlowPillButton>
                </div>
            </motion.div>
        </div>
    )
}

export default Header

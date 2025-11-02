// app/components/sections/AboutSection.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  SparklesIcon,
  GlobeAltIcon,
  UsersIcon,
  CodeBracketIcon,
  ServerStackIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import AnimatedBackground from "../gsap/AnimatedBackground";
import GlowPillButton from "../gsap/GlowPillButton";

const baseColor = "#4EC5F5";
const textColor = "#060010";

const rotatingWords = ["STORY", "JOURNEY", "VISION", "PURPOSE"];

const teamMembers = [
  {
    id: 1,
    name: "Eng. Malek",
    title: "Senior Frontend Developer",
    bio: "Oversaw the primary interface logic, ensuring responsive design and smooth user interactions across the platform.",
    image: "/images/team-malek.jpg",
  },
  {
    id: 2,
    name: "Omar",
    title: "Backend Developer",
    bio: "Managed database schemas, API integrations, and implemented secure data handling for the e-commerce functionalities.",
    image: "/images/team-omar.jpg",
  },
  {
    id: 3,
    name: "Mina",
    title: "Frontend Developer",
    bio: "Focused on translating design mockups into functional components, maintaining visual consistency and accessibility.",
    image: "/images/team-mina.jpg",
  },
  {
    id: 4,
    name: "Sohaila",
    title: "Backend Developer",
    bio: "Defined the overall system architecture, ensuring backend scalability and performance optimization.",
    image: "/images/team-sohaila.jpg",
  },
  {
    id: 5,
    name: "Ahd",
    title: "Quality Assurance & Documentation",
    bio: "Led testing, bug identification, and maintained detailed documentation for smooth project delivery.",
    image: "/images/team-ahd.jpg",
  },
  {
    id: 6,
    name: "Asmaa",
    title: "Project Coordinator & Content",
    bio: "Handled project coordination and ensured all written content aligns with the brand tone and quality.",
    image: "/images/team-asmaa.jpg",
  },
];

const AboutSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = rotatingWords[currentWordIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-['Poppins'] bg-white">
      <header className="relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden bg-white border-b border-[#060010]/10 shadow-sm">
        <AnimatedBackground baseColor={baseColor} />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide mb-4 text-[#060010]">
            DISCOVER OUR{" "}
            <span className="text-[#4EC5F5] transition-opacity duration-500">
              {currentWord}
            </span>
          </h1>
          <Link href="#mission">
            <GlowPillButton
              baseColor={baseColor}
              className="mt-3 py-3 px-8 text-white font-semibold rounded-full text-lg shadow-md hover:scale-105 transition-all"
            >
              LEARN MORE
            </GlowPillButton>
          </Link>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          id="story"
          className="space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#060010]">
            Our Story: Crafting Digital Comfort
          </h2>
          <p className="text-lg text-center text-[#060010]/80 max-w-3xl mx-auto">
            This e-commerce project was born from a collaborative training initiative
            between dedicated Frontend and Backend developers. Our mission was to build
            a fully functional, beautiful online furniture store from the ground up.
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center bg-[#F8FBFD] p-8 rounded-2xl shadow-md border border-[#4EC5F5]/10">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Modern interior design"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-[#060010]">
                Merging Code & Comfort
              </h3>
              <p className="text-[#060010]/75 leading-relaxed">
                Our focus was dual: mastering modern development practices while
                creating a seamless, aesthetically pleasing platform for showcasing
                high-quality furniture.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          id="mission"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-[#060010]">
            Our Project Values
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { icon: CodeBracketIcon, title: "Clean Code", desc: "Maintainable, scalable, and clean code practices." },
              { icon: UsersIcon, title: "Collaboration", desc: "Seamless teamwork between frontend and backend." },
              { icon: SparklesIcon, title: "User Experience", desc: "Focused on simplicity, clarity, and delight." },
              { icon: ServerStackIcon, title: "Scalability", desc: "Efficient backend designed for future growth." },
              { icon: GlobeAltIcon, title: "Accessibility", desc: "Inclusive design for all users and devices." },
              { icon: RocketLaunchIcon, title: "Performance", desc: "Fast and smooth experience across the site." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-[#4EC5F5]/20 bg-white shadow-sm hover:shadow-md transition-all text-center"
              >
                <Icon className="w-10 h-10 text-[#4EC5F5] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#060010]">{title}</h3>
                <p className="text-sm text-[#060010]/70 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          id="team"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-[#060010]">
            Meet The Development Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="p-5 rounded-xl border border-[#4EC5F5]/10 bg-white shadow-sm hover:shadow-md flex items-center gap-5 transition-all"
              >
                <div className="w-20 h-20 relative rounded-full overflow-hidden border-2 border-[#4EC5F5] shrink-0">
                  <Image
                    src={member.image || "/images/placeholder.jpg"}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 80px, 100px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-[#060010]">{member.name}</h4>
                  <p className="text-[#4EC5F5] text-sm font-medium mb-1">{member.title}</p>
                  <p className="text-sm text-[#060010]/70">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12 border-t border-[#4EC5F5]/20"
        >
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-[#060010]">
            Ready to design your space?
          </h3>
          <p className="text-[#060010]/80 mb-6 max-w-xl mx-auto">
            Explore our latest collections crafted with quality and comfort in mind.
          </p>
          <Link href="/products">
            <GlowPillButton
              baseColor={baseColor}
              className="py-3 px-10 text-white font-semibold rounded-full text-lg shadow-md hover:scale-105 transition-all"
            >
              See products
            </GlowPillButton>
          </Link>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutSection;

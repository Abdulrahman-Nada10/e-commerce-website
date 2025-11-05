"use client";

import React from 'react';
import { motion } from 'framer-motion';

const BASE_BG = '#E0F7FA';
const BUBBLE_COLOR = 'rgba(135, 206, 250, 0.6)'; 
const BUBBLE_COLOR_LIGHT = 'rgba(255, 255, 255, 0.9)'; 

const bubbles = [
  { size: 100, x: '10%', y: '20%', duration: 15, delay: 0, color: BUBBLE_COLOR },
  { size: 150, x: '80%', y: '50%', duration: 18, delay: 2, color: BUBBLE_COLOR_LIGHT },
  { size: 60, x: '45%', y: '10%', duration: 12, delay: 4, color: BUBBLE_COLOR },
  { size: 200, x: '20%', y: '85%', duration: 20, delay: 6, color: BUBBLE_COLOR_LIGHT },
  { size: 80, x: '90%', y: '15%', duration: 14, delay: 8, color: BUBBLE_COLOR },
  { size: 120, x: '30%', y: '60%', duration: 16, delay: 10, color: BUBBLE_COLOR_LIGHT },
  { size: 70, x: '65%', y: '75%', duration: 13, delay: 1, color: BUBBLE_COLOR },
  { size: 180, x: '5%', y: '50%', duration: 19, delay: 3, color: BUBBLE_COLOR_LIGHT },
];

const getAnimation = (duration) => ({
  initial: { y: 0, opacity: 0.6, scale: 0.9 },
  animate: {
    y: [0, -50, 0], 
    opacity: [0.6, 0.9, 0.6], 
    scale: [0.9, 1.1, 0.9],  
    transition: {
      duration: duration,  
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror",
    },
  },
});


const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: BASE_BG }}>
      
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at bottom, rgba(135, 206, 250, 0.1) 0%, transparent 60%)' }} />

      {bubbles.map((bubble, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-xl" 
          style={{
            width: bubble.size,
            height: bubble.size,
            top: bubble.y,
            left: bubble.x,
            background: bubble.color,
          }}
          variants={getAnimation(bubble.duration)}
          initial="initial"
          animate="animate"
          transition={{ delay: bubble.delay, ...getAnimation(bubble.duration).animate.transition }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
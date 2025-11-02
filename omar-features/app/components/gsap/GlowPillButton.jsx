// components/GlowPillButton.jsx
"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const baseColor = '#4EC5F5'; 
const pillColor = '#ffffff'; 
const textColor = '#060010'; 
const duration = 0.7; 

const GlowPillButton = ({ children, href = '/products' }) => {
  const linkRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const tlRef = useRef(null);
  const activeTweenRef = useRef(null);
  const router = useRouter();

  const calculatePillDimensions = () => {
    const pill = linkRef.current;
    const circle = circleRef.current;
    if (!pill || !circle) return;

    const rect = pill.getBoundingClientRect();
    const w = rect.width || 180; 
    const h = rect.height || 52; 
    
    const R = ((w * w) / 4 + h * h) / (2 * h);
    const D = Math.ceil(2 * R) + 2;
    const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
    const originY = D - delta;

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.bottom = `-${delta}px`;

    gsap.set(circle, {
      xPercent: -50,
      scale: 0,
      transformOrigin: `50% ${originY}px`,
      backgroundColor: baseColor, 
    });

    const label = labelRef.current;
    const hoverLabel = hoverLabelRef.current;

    if (label) gsap.set(label, { y: 0, color: textColor });
    if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0, color: pillColor });

    tlRef.current?.kill();
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, { scale: 1.2, xPercent: -50, duration: duration, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
    
    if (label) {
      tl.to(label, { y: -(h + 8), color: pillColor, duration: duration, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
    }

    if (hoverLabel) {
      gsap.set(hoverLabel, { y: h + 8, opacity: 0 }); 
      tl.to(hoverLabel, { y: 0, opacity: 1, duration: duration, ease: 'power3.easeOut', overwrite: 'auto' }, 0);
    }

    tlRef.current = tl;
  };

  useEffect(() => {
    calculatePillDimensions();
    const onResize = () => calculatePillDimensions();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: duration,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, {
      duration: 0.4,
      ease: 'power3.easeOut',
      overwrite: 'auto'
    });
  };

  const handleClick = () => {
    activeTweenRef.current?.kill();
    tlRef.current?.tweenTo(0, {
        duration: 0.2, 
        ease: 'power1.easeOut',
        onComplete: () => router.push(href)
    });
  };

  const basePillClasses =
    'relative overflow-hidden inline-flex items-center justify-center h-[52px] min-w-[180px] no-underline rounded-full box-border font-semibold text-[18px] leading-none uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-6 transition-colors duration-200 shadow-xl';

  return (
    <motion.button
      ref={linkRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      className={`${basePillClasses} bg-white text-black`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: "backOut" }}
      style={{
        height: '52px',
        width: 'auto', 
        padding: '0 24px', 
        backgroundColor: pillColor, 
        color: textColor, 
      }}
    >
      <div 
        ref={circleRef} 
        className="absolute left-1/2 rounded-full" 
        style={{ zIndex: 1, backgroundColor: baseColor }}
      />
      
      <div ref={labelRef} className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
        <span className="font-semibold text-lg" style={{ color: textColor }}>
          {children}
        </span>
      </div>

      <div ref={hoverLabelRef} className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 2 }}>
        <span className="font-semibold text-lg" style={{ color: pillColor }}>
          {children}
        </span>
      </div>
    </motion.button>
  );
};

export default GlowPillButton;
// components/MobileToggle.jsx
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const MobileToggle = ({ isOpen, toggleOpen, ease = 'power3.easeOut' }) => {
    const hamburgerRef = useRef(null);
    useEffect(() => {
        const lines = hamburgerRef.current?.querySelectorAll('.hamburger-line');
        if (!lines || lines.length < 2) return;

        const lineOffset = 3.5; 

        if (isOpen) {
            gsap.to(lines[0], { rotation: 45, y: lineOffset, duration: 0.3, ease });
            gsap.to(lines[1], { rotation: -45, y: -lineOffset, duration: 0.3, ease });
        } else {
            gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
            gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
        }
    }, [isOpen, ease]);


    return (
        <button
            ref={hamburgerRef}
            onClick={toggleOpen}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="flex flex-col items-center justify-center gap-1.5 cursor-pointer p-2 relative rounded-lg transition-colors duration-200 hover:bg-gray-100 z-50 focus:outline-none" 
            style={{ width: '40px', height: '40px' }}
        >
            <span
                className="hamburger-line w-6 h-0.5 rounded origin-center"
                style={{ background: '#000', willChange: 'transform' }}
            />
            <span
                className="hamburger-line w-6 h-0.5 rounded origin-center"
                style={{ background: '#000', willChange: 'transform' }}
            />
        </button>
    );
};

export default MobileToggle;
// components/MobileMenu.jsx
"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import MobileToggle from './MobileToggle';

const navItems = [
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Profile', href: '/profile' },
];

const baseColor = '#4EC5F5'; 
const textColor = '#060010';
const hoverTextColor = '#060010'; 

const MobileNavLink = ({ href, children, closeMenu }) => {
    const linkRef = useRef(null);
    const circleRef = useRef(null);
    const labelRef = useRef(null); 
    const hoverLabelRef = useRef(null); 
    const tlRef = useRef(null);
    const activeTweenRef = useRef(null);

    useEffect(() => {
        const pill = linkRef.current;
        const circle = circleRef.current;
        const label = labelRef.current;
        const hoverLabel = hoverLabelRef.current;

        if (!pill || !circle || !label || !hoverLabel) return;

        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        
        const R = Math.sqrt(w * w + h * h) / 2;
        const D = Math.ceil(2 * R) + 5;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        gsap.set(circle, {
            scale: 0,
            x: '50%',
            y: '50%',
            bottom: '50%',
            right: '50%',
            transformOrigin: '50% 50%'
        });

        const linkHeight = h;
        gsap.set(label, { y: 0 }); 
        gsap.set(hoverLabel, { y: linkHeight + 8, opacity: 0 });

        tlRef.current?.kill();
        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.easeOut', duration: 0.3 } });
        const textFlipDuration = 0.3;
        const textFlipStart = 0; 

        tl.to(circle, { scale: 1, duration: 0.35, ease: 'power3.out', overwrite: 'auto' }, 0);
        
     
        tl.to(label, { y: -linkHeight - 8, duration: textFlipDuration, ease: 'power3.out' }, textFlipStart);
        
        tl.to(hoverLabel, { y: 0, opacity: 1, duration: textFlipDuration, ease: 'power3.out' }, textFlipStart);
        
        tlRef.current = tl;
    }, []);

    const handleEnter = () => {
        const tl = tlRef.current;
        if (!tl) return;
        activeTweenRef.current?.kill();
        activeTweenRef.current = tl.tweenTo(tl.duration(), {
            duration: 1.2, 
            ease: 'power2.out',
            overwrite: 'auto'
        });
    };

    const handleLeave = () => {
        const tl = tlRef.current;
        if (!tl) return;
        activeTweenRef.current?.kill();
        activeTweenRef.current = tl.tweenTo(0, {
            duration: 0.4, 
            ease: 'power2.out',
            overwrite: 'auto'
        });
    };
    
    const handleClick = () => {
        const tl = tlRef.current;
        if (tl) {
            tl.tweenTo(tl.duration(), { duration: 0.1, onComplete: closeMenu }); 
        } else {
            closeMenu();
        }
    };

    return (
        <li className="relative rounded-lg overflow-hidden list-none p-0 m-0" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
            <Link
                ref={linkRef}
                href={href}
                onClick={handleClick}
                className="relative block w-full text-left text-xl py-3 px-4 font-medium z-10"
                style={{ color: textColor }} 
            >
                <span className="label-stack relative inline-block leading-none z-2 overflow-hidden h-[1.3em]">
                    <span
                        ref={labelRef}
                        className="pill-label relative z-2 inline-block leading-none"
                        style={{ willChange: 'transform' }}
                    >
                        {children}
                    </span>
                    <span
                        ref={hoverLabelRef}
                        className="pill-label-hover absolute left-0 top-0 z-3 inline-block"
                        style={{ color: hoverTextColor, willChange: 'transform, opacity' }}
                        aria-hidden="true"
                    >
                        {children}
                    </span>
                </span>
            </Link>
            
            <span
                ref={circleRef}
                className="absolute rounded-full z-0 block pointer-events-none"
                style={{ background: baseColor, willChange: 'transform' }}
                aria-hidden="true"
            />
        </li>
    );
};



const MobileMenu = ({ isOpen, setIsOpen, ease = 'power3.out' }) => {
    const menuRef = useRef(null);
    const backdropRef = useRef(null);
    const listRef = useRef(null);
    const tlRef = useRef(null);
    

    useEffect(() => {
        const menu = menuRef.current;
        const backdrop = backdropRef.current;
        const items = listRef.current?.children;
        
        if (!menu || !backdrop || !items) return;

        tlRef.current?.kill(); 

        const tl = gsap.timeline({ paused: true, defaults: { ease, duration: 0.4 } });
        tlRef.current = tl;

        tl.fromTo(backdrop, { opacity: 0, visibility: 'hidden' }, { opacity: 1, visibility: 'visible', duration: 0.2 }, 0);
        
        gsap.set(menu, { visibility: 'hidden' });
        tl.fromTo(
            menu, 
            { x: '100%', visibility: 'hidden' }, 
            { x: 0, visibility: 'visible', duration: 0.4, ease: 'back.out(0.6)' }, 
            0.1
        );

         tl.fromTo(
             items, 
             { opacity: 0, x: 50 }, 
             { opacity: 1, x: 0, stagger: 0.08, duration: 0.3 }, 
             0.3
         );


        if (isOpen) {
            tl.play();
        } else {
            tl.reverse(0.3);
        }

    }, [isOpen, ease]);


    return (
        <>
            <div 
                ref={backdropRef}
                className={`fixed inset-0 z-40 md:hidden bg-black/60 transition-opacity duration-200 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} 
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
            />

            <div
                ref={menuRef}
                className="fixed top-16 right-0 h-[calc(100%-4rem)] w-1/3 max-w-sm bg-white shadow-2xl z-50 p-15 md:hidden overflow-y-auto rounded-tl-2xl"
                style={{ willChange: 'transform, opacity' }}
            >

                
                <nav className="flex flex-col gap-4">
                    <ul
                        ref={listRef}
                        className="flex flex-col gap-2 list-none p-0 m-0"
                    >
                        {navItems.map((item, i) => (
                            <MobileNavLink 
                                key={item.name} 
                                href={item.href} 
                                closeMenu={() => setIsOpen(false)} 
                            >
                                {item.name}
                            </MobileNavLink>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default MobileMenu;
// components/Navbar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ShoppingCart, User, Heart, Package } from "lucide-react";
import MobileToggle from "../features/MobileToggle";
import MobileMenu from "../features/MobileMenu";
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemCount } from '../../store/slices/cartSlice';
import { selectWishlistItemCount } from '../../store/slices/wishlistSlice';
import { selectOrders } from '../../store/slices/orderSlice';

const navItems = [
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contactus" },
  { name: "Help", href: "/help" },
];

// NavLink component with pill hover effect
const NavLink = ({ href, children, index }) => {
  const linkRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const tlRef = useRef(null);
  const activeTweenRef = useRef(null);

  const baseColor = "#4EC5F5";
  const pillColor = "#ffffff";
  const textColor = "#060010";
  const ease = 'power3.easeOut';

  const calculatePillDimensions = () => {
    const pill = linkRef.current;
    const circle = circleRef.current;
    if (!pill || !circle) return;

    const rect = pill.getBoundingClientRect();
    const { width: w, height: h } = rect;
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

    tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

    if (label) {
      tl.to(label, { y: -(h + 8), color: pillColor, duration: 2, ease, overwrite: 'auto' }, 0);
    }

    if (hoverLabel) {
      gsap.set(hoverLabel, { y: Math.ceil(h + 100), opacity: 0 });
      tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
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
      duration: 0.7,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, {
      duration: 0.4,
      ease,
      overwrite: 'auto'
    });
  };

  const pillStyle = {
    background: pillColor,
    color: textColor,
    height: "42px",
    paddingLeft: "18px",
    paddingRight: "18px",
  };

  const basePillClasses =
    "relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full font-semibold text-[16px] leading-none uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0 transition-colors duration-200";

  return (
    <div className="flex h-full" style={{ gap: "3px" }}>
      <Link
        ref={linkRef}
        href={href}
        className={basePillClasses}
        style={pillStyle}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <span
          className="hover-circle absolute left-1/2 bottom-0 rounded-full z-1 block pointer-events-none"
          style={{ background: baseColor, willChange: "transform" }}
          ref={circleRef}
        />
        <span className="label-stack relative inline-block leading-none z-2 overflow-hidden h-[1em]">
          <span className="pill-label relative z-2 inline-block leading-none" ref={labelRef}>
            {children}
          </span>
          <span
            className="pill-label-hover absolute left-0 top-0 z-3 inline-block"
            style={{ color: textColor }}
            ref={hoverLabelRef}
          >
            {children}
          </span>
        </span>
      </Link>
    </div>
  );
};

// IconButton component
const IconButton = ({ ariaLabel, children }) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
      {children}
    </div>
  );
};

// NavBar component
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const cartItemCount = useSelector(selectCartItemCount);
  const wishlistItemCount = useSelector(selectWishlistItemCount);
  const ordersCount = useSelector(selectOrders).length;
  const baseColor = "#4EC5F5";

useEffect(()=> {
  if(navRef.current){
    gsap.set(navRef.current,{y:-100 , opacity :0});
    gsap.to(navRef.current,{
      y:0,
      opacity:1,
      duration:1,
      ease:"power2.out",
    });
  }
},[]);

  return (
    <>
      <nav ref={navRef}
       className="fixed top-0 left-0 w-full bg-white shadow-md z-50" 
       style={{ backgroundColor: 'white', opacity: 1, visibility: 'visible' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="text-2xl font-extrabold tracking-wider" style={{ color: baseColor }}>
                Shopylx
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex grow justify-center space-x-0 ml-2 rounded-[27px] overflow-hidden" style={{ height: "48px", background: "#ffffff" }}>
              <div className="list-none flex items-stretch m-0 p-[3px] h-full" style={{ gap: "3px" }}>
                {navItems.map((item, index) => (
                  <NavLink key={item.name} href={item.href} index={index}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-1">
              <IconButton ariaLabel="Cart">
                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-5 w-5 text-gray-700 transition-colors hover:text-indigo-600" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </IconButton>

              <IconButton ariaLabel="Wishlist">
                <Link href="/wishlist" className="relative">
                  <Heart className="h-5 w-5 text-gray-700 transition-colors hover:text-indigo-600" />
                  {wishlistItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistItemCount}
                    </span>
                  )}
                </Link>
              </IconButton>

              <IconButton ariaLabel="Orders">
                <Link href="/orders" className="relative">
                  <Package className="h-5 w-5 text-gray-700 transition-colors hover:text-indigo-600" />
                  {ordersCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {ordersCount}
                    </span>
                  )}
                </Link>
              </IconButton>

              <IconButton ariaLabel="User Profile">
                <Link href="/profile" className="relative">
                  <User className="h-5 w-5 text-gray-700 transition-colors hover:text-indigo-600" />
                </Link>
              </IconButton>

              {/* Mobile Menu Toggle */}
              <div className="lg:hidden ml-2">
                <MobileToggle isOpen={isMobileMenuOpen} toggleOpen={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
    </>
  );
};

// Example Questions Page
const QuestionsPage = () => {
  const questions = [
    "What is your favorite color?",
    "What is your hobby?",
    "Where do you live?",
    "What is your favorite food?",
  ];

  useEffect(() => {
    // Animate each question card
    gsap.from(".question-card", {
      opacity: 0,
      y: -50,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="pt-24 max-w-3xl mx-auto space-y-4">
      {questions.map((q, i) => (
        <div
          key={i}
          className="question-card bg-white p-4 rounded-lg shadow-md"
        >
          {q}
        </div>
      ))}
    </div>
  );
};

export { NavBar, QuestionsPage };
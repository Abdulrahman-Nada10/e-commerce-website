// components/Navbar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ShoppingCart, User, Heart, Package } from "lucide-react";
import MobileToggle from "../features/MobileToggle";
import MobileMenu from "../features/MobileMenu";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useOrder } from "../../context/OrderContext";

// Nav items
const navItems = [
  { name: "Products", href: "/Products" },
  { name: "Categories", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact Us", href: "/contactus" },
  { name: "Help", href: "/help" },

];

// NavLink component
const NavLink = ({ href, children }) => {
  const linkRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const tlRef = useRef(null);
  const activeTweenRef = useRef(null);

  const baseColor = "#4EC5F5";
  const pillColor = "#ffffff";
  const textColor = "#060010";

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
    });

    const label = labelRef.current;
    const hoverLabel = hoverLabelRef.current;

    if (label) gsap.set(label, { y: 0 });
    if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

    tlRef.current?.kill();
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: "power3.easeOut" }, 0);
    if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: "power3.easeOut" }, 0);
    if (hoverLabel)
      tl.to(hoverLabel, { y: 0, opacity: 1, duration: 2, ease: "power3.easeOut" }, 0);

    tlRef.current = tl;
  };

  useEffect(() => {
    calculatePillDimensions();
    const onResize = () => calculatePillDimensions();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), { duration: 0.7, ease: "power3.easeOut" });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, { duration: 0.4, ease: "power3.easeOut" });
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

// NavBar component
const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const { cartItemCount } = useCart();
  const { wishlistItemCount } = useWishlist();
  const { orders } = useOrder();
  const baseColor = "#4EC5F5";
  const ordersCount = orders.length;

  useEffect(() => {
    const navEl = navRef.current;
    if (navEl) {
      gsap.from(navEl, { opacity: 0, y: -50, duration: 1, ease: "power3.out" });
    }
  }, []);

  const IconButton = ({ children, ariaLabel, className = "" }) => (
    <button
      className={`p-2 rounded-full transition-colors hover:bg-gray-100 focus:outline-none ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );

  return (
    <>
      <nav ref={navRef} className="fixed top-0 left-0 w-full bg-white shadow-md z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="shrink-0 order-1 md:order-0">
              <Link href="/" className="text-2xl font-extrabold tracking-wider" style={{ color: baseColor }}>
                Shopylx
              </Link>
            </div>

            <div className="hidden md:flex grow justify-center space-x-0 ml-2 rounded-[27px] overflow-hidden" style={{ height: "48px", background: "#ffffff" }}>
              <div className="list-none flex items-stretch m-0 p-[3px] h-full" style={{ gap: "3px" }}>
                {navItems.map((item) => (
                  <NavLink key={item.name} href={item.href}>
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-1 order-2 md:order-0">
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

              <div className="md:hidden ml-2">
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

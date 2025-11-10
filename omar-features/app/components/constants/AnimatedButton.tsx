"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const AnimatedButton = ({ children, href, onClick, filled = true }) => {
  const btnRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const tlRef = useRef(null);
  const activeTweenRef = useRef(null);

  const baseColor = "#4EC5F5";
  const pillColor = filled ? baseColor : "#ffffff";
  const textColor = filled ? "#ffffff" : "#060010";

  const calculatePillDimensions = () => {
    const pill = btnRef.current;
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

    tl.to(circle, { scale: 1.2, xPercent: -50, duration: 1.6, ease: "power3.out" }, 0);
    tl.to(label, { y: -(h + 8), duration: 1.6, ease: "power3.out" }, 0);
    tl.to(hoverLabel, { y: 0, opacity: 1, duration: 1.6, ease: "power3.out" }, 0);

    tlRef.current = tl;
  };

  useEffect(() => {
    calculatePillDimensions();
    window.addEventListener("resize", calculatePillDimensions);
    return () => window.removeEventListener("resize", calculatePillDimensions);
  }, []);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, {
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold uppercase tracking-wide px-8 py-3"
      style={{
        background: pillColor,
        color: textColor,
        position: "relative",
      }}
    >
      <span
        ref={circleRef}
        className="absolute left-1/2 bottom-0 rounded-full"
        style={{ background: baseColor }}
        aria-hidden="true"
      />
      <span className="relative inline-block leading-none overflow-hidden h-[1em]">
        <span ref={labelRef} className="relative inline-block leading-none">
          {children}
        </span>
        <span
          ref={hoverLabelRef}
          className="absolute left-0 top-0 inline-block"
          style={{ color: textColor }}
        >
          {children}
        </span>
      </span>
    </button>
  );
};

export default AnimatedButton;

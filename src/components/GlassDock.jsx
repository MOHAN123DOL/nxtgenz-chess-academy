import React, { useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { cn } from "../lib/utils";
import "./GlassDock.css";

// MorphSVGPlugin ships free inside the gsap package. If registration ever fails, icons simply stay static.
let morphReady = false;
try {
  gsap.registerPlugin(MorphSVGPlugin);
  morphReady = true;
} catch (e) {
  console.warn("GSAP MorphSVGPlugin unavailable, morphing icons disabled.", e);
}

// Shapes used by the original morph animation: a flame-like intermediate, then the final icon.
const FLAME_A = "M12 21C12 21 15.3954 18.8605 13.3637 16C12.0647 14.1711 9.51275 11.9823 9 10C8 6.134 10.134 3 12 3C13.866 3 16 6.134 15 10C14.4873 11.9823 11.9353 14.1711 10.6363 16C8.60464 18.8605 12 21 12 21Z";
const FLAME_B = "M12 21C12 21 14.0216 19.0215 14.3637 16C14.6026 13.8898 13.5128 11.9823 13 10C12 6.134 13.134 3 12 3C10.866 3 12 6.134 11 10C10.4873 11.9823 9.39736 13.8898 9.6363 16C9.97843 19.0215 12 21 12 21Z";

// Home keeps its own three-step morph (arrow -> spike -> house). Email uses the flame steps.
const MORPH = {
  home: {
    rest: "M3 18V10.5339C3 9.57062 3.46259 8.66591 4.24353 8.1019L10.2435 3.76856C11.2921 3.01128 12.7079 3.01128 13.7565 3.76856L19.7565 8.1019C20.5374 8.66591 21 9.57062 21 10.5339V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18Z",
    steps: [
      { d: "M12.6387 3.53796L15.1949 7.69178C15.7004 8.51322 15.7802 9.5276 15.4092 10.4179L11.3846 20.0769C11.2016 20.516 11.5243 21 12 21V21C12.4757 21 12.7984 20.516 12.6154 20.0769L8.5908 10.4179C8.21983 9.5276 8.29956 8.51322 8.80506 7.69178L11.3613 3.53796C11.6541 3.06206 12.3459 3.06206 12.6387 3.53796Z", duration: 0.1 },
      { d: "M12.1483 3.46366L12.8548 8.05624C12.9493 8.67024 12.8508 9.29842 12.573 9.85405L8.08541 18.8292C7.58673 19.8265 8.31198 21 9.42705 21H14.5729C15.688 21 16.4133 19.8265 15.9146 18.8292L11.427 9.85405C11.1492 9.29842 11.0507 8.67024 11.1452 8.05624L11.8517 3.46366C11.8778 3.29407 12.1222 3.29407 12.1483 3.46366Z", duration: 0.09 },
    ],
    final: "M21 18V10.5339C21 9.57062 20.5374 8.66591 19.7565 8.1019L13.7565 3.76856C12.7079 3.01128 11.2921 3.01128 10.2435 3.76856L4.24353 8.1019C3.46259 8.66591 3 9.57062 3 10.5339V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18Z",
    finalDuration: 0.71,
  },
  email: {
    rest: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
    steps: [{ d: FLAME_A, duration: 0.1 }, { d: FLAME_B, duration: 0.05 }],
    final: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
    finalDuration: 0.7,
  },
};

// Helper for the morphing icons (Home and Contact). Same sequence as the uploaded component:
// shrink and fade, pass through the intermediate shapes, then spring back to the icon.
function MorphingIcon({ type, trigger }) {
  const wrapRef = useRef(null);
  const pathRef = useRef(null);
  const cfg = MORPH[type];

  useEffect(() => {
    if (!trigger || !morphReady || !wrapRef.current || !pathRef.current) return;
    const wrap = wrapRef.current;
    const path = pathRef.current;
    gsap.killTweensOf([wrap, path]);
    gsap.to(wrap, {
      "--dock-scale": 0.25,
      "--dock-opacity": 0,
      duration: 0.1,
      onComplete: () => {
        gsap.to(path, {
          keyframes: [
            ...cfg.steps.map((s) => ({ morphSVG: s.d, duration: s.duration })),
            {
              morphSVG: cfg.final,
              duration: cfg.finalDuration,
              ease: "elastic.out(1, .9)",
              onStart: () => {
                gsap.to(wrap, { "--dock-scale": 1, duration: cfg.finalDuration, ease: "elastic.out(1, .9)" });
                gsap.to(wrap, { "--dock-opacity": 1, duration: 0.2 });
              },
            },
          ],
        });
      },
    });
  }, [trigger]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={wrapRef} className="dock-morph">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path ref={pathRef} d={cfg.rest} />
      </svg>
    </span>
  );
}

/**
 * GlassDock: floating glass dock with a sliding tooltip.
 * items: [{ title, icon, href, morph? }]  morph = "home" | "email" turns on the GSAP morphing icon.
 * Each item is a real router link, so navigation does not reload the page and the active route is highlighted.
 */
export const GlassDock = React.forwardRef(function GlassDock({ items, className, dockClassName, ...props }, ref) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const [tick, setTick] = useState({ index: null, n: 0 }); // fires morph animation on hover or tap
  const [tipX, setTipX] = useState(0);
  const itemRefs = useRef([]);
  const hideTimer = useRef(null);
  const reduce = useReducedMotion();

  const measure = useCallback((index) => {
    const el = itemRefs.current[index];
    if (el) setTipX(el.offsetLeft + el.offsetWidth / 2);
  }, []);

  const show = (index) => {
    clearTimeout(hideTimer.current);
    if (hoveredIndex !== null && index !== hoveredIndex) setDirection(index > hoveredIndex ? 1 : -1);
    measure(index);
    setHoveredIndex(index);
    setTick((t) => ({ index, n: t.n + 1 }));
  };
  const hide = () => {
    setHoveredIndex(null);
    setDirection(0);
  };
  // Touch has no hover: tapping shows the label briefly while the page changes.
  const showBriefly = (index) => {
    show(index);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(hide, 1400);
  };

  useEffect(() => () => clearTimeout(hideTimer.current), []);
  useEffect(() => {
    if (hoveredIndex === null) return;
    const onResize = () => measure(hoveredIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hoveredIndex, measure]);

  return (
    <div ref={ref} className={cn("dock-wrap", className)} {...props}>
      <div className={cn("glass-dock", dockClassName)} onMouseLeave={hide}>
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className="dock-tip"
              initial={{ opacity: 0, scale: 0.92, y: 12, x: tipX }}
              animate={{ opacity: 1, scale: 1, y: -58, x: tipX }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              aria-hidden="true"
            >
              <div className="dock-tip-box">
                <div className="dock-tip-text">
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.span
                      key={items[hoveredIndex].title}
                      initial={{ x: reduce ? 0 : direction > 0 ? 35 : -35, opacity: 0, filter: reduce ? "blur(0px)" : "blur(6px)" }}
                      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ x: reduce ? 0 : direction > 0 ? -35 : 35, opacity: 0, filter: reduce ? "blur(0px)" : "blur(6px)" }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      {items[hoveredIndex].title}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {items.map((el, index) => {
          const Icon = el.icon;
          const isHovered = hoveredIndex === index;
          const morph = el.morph && MORPH[el.morph] ? el.morph : null;
          return (
            <NavLink
              key={el.title}
              to={el.href}
              end={el.href === "/"}
              ref={(node) => { itemRefs.current[index] = node; }}
              aria-label={el.title}
              className={({ isActive }) => cn("dock-item", isActive && "is-active")}
              onMouseEnter={() => show(index)}
              onFocus={() => show(index)}
              onBlur={hide}
              onPointerDown={(e) => { if (e.pointerType === "touch") showBriefly(index); }}
            >
              <motion.span
                className="dock-icon"
                whileTap={{ scale: 0.92 }}
                animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -3 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {morph ? <MorphingIcon type={morph} trigger={tick.index === index ? tick.n : 0} /> : <Icon className="dock-lucide" aria-hidden="true" />}
              </motion.span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
});

GlassDock.displayName = "GlassDock";
export default GlassDock;

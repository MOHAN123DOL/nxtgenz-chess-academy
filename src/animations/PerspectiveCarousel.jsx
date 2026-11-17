import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SmartImage from "../components/SmartImage.jsx";
import "./PerspectiveCarousel.css";

// Ported from the uploaded PerspectiveCarousel (framer-motion 3D rotation), used for medal photos only.
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const SPRING = { type: "spring", bounce: 0.14, duration: 0.9 };

export default function PerspectiveCarousel({ items, slideWidth = 200, rotationStep = 60, inactiveScale = 0.85 }) {
  const [index, setIndex] = useState(0);
  if (!items.length) return null;
  const max = items.length - 1;
  const select = (i) => setIndex(clamp(i, 0, max));

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); select(index - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); select(index + 1); }
  };

  return (
    <div className="pc-root" role="region" aria-roledescription="carousel" aria-label="Medals carousel" tabIndex={0} onKeyDown={onKeyDown}>
      <div className="pc-viewport" style={{ perspective: "1200px" }}>
        <motion.div className="pc-track" animate={{ x: -(index * slideWidth + slideWidth / 2) }} transition={SPRING}>
          {items.map((item, i) => {
            const isActive = i === index;
            return (
              <div key={item.title + i} style={{ width: slideWidth, flexShrink: 0, perspective: "1200px" }}>
                <motion.div className="pc-slide" animate={{ rotateY: (index - i) * rotationStep, scale: isActive ? 1 : inactiveScale }} transition={SPRING} style={{ transformStyle: "preserve-3d" }}>
                  <button type="button" className="pc-img" aria-label={`Show ${item.title}`} aria-current={isActive ? "true" : undefined} onClick={() => select(i)}>
                    <SmartImage src={item.src} alt={item.alt ?? item.title} />
                  </button>
                  <motion.p animate={{ filter: isActive ? "blur(0px)" : "blur(2px)", opacity: isActive ? 1 : 0 }} transition={SPRING}>{item.title}</motion.p>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
      <div className="pc-controls">
        <button type="button" aria-label="Previous medal" disabled={index === 0} onClick={() => select(index - 1)}><ChevronLeft size={20} /></button>
        <div className="pc-dots">
          {items.map((item, i) => (
            <button key={item.title + i} type="button" aria-label={`Show ${item.title}`} className={i === index ? "on" : ""} onClick={() => select(i)} />
          ))}
        </div>
        <button type="button" aria-label="Next medal" disabled={index === max} onClick={() => select(index + 1)}><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

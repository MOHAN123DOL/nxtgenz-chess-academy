import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SmartImage from "../components/SmartImage.jsx";
import "./AchievementStack.css";

// Ported from the uploaded TestimonialsCard (framer-motion stack), shows photo, title, where and prize.
export default function AchievementStack({ items }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const rotations = useMemo(() => [4, -2, -9, 7], []);

  useEffect(() => { if (active > items.length - 1) setActive(0); }, [items.length, active]);
  if (!items.length) return null;
  const current = items[active];

  const go = (next) => {
    if (next < 0 || next > items.length - 1) return;
    setDirection(next > active ? 1 : -1);
    setActive(next);
  };

  return (
    <div className="ach-wrap">
      <div className="ach-stack" style={{ perspective: "1400px" }}>
        <AnimatePresence custom={direction}>
          {items.map((item, index) => {
            const isActive = index === active;
            const offset = index - active;
            return (
              <motion.div
                key={item.id}
                className="ach-card"
                initial={{ x: offset * 15, y: Math.abs(offset) * 6, scale: 0.85 - Math.abs(offset) * 0.04, rotateZ: rotations[index % 4], opacity: isActive ? 1 : 0.8, zIndex: 10 - Math.abs(offset) }}
                animate={isActive
                  ? { x: [offset * 15, direction === 1 ? -200 : 200, 0], y: [Math.abs(offset) * 6, 0, 0], scale: [0.85, 1.05, 1], rotateZ: [rotations[index % 4], -5, 0], opacity: 1, zIndex: 100 }
                  : { x: offset * 15, y: Math.abs(offset) * 6, rotateZ: rotations[index % 4], scale: 0.85 - Math.abs(offset) * 0.04, opacity: 0.85, zIndex: 10 - Math.abs(offset) }}
                exit={{ x: direction === 1 ? -250 : 250, scale: 0.75, rotateZ: direction === 1 ? -10 : 10, opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <SmartImage src={item.image} alt={item.title} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="ach-text">
        <div className="ach-counter">{active + 1} / {items.length}</div>
        <AnimatePresence mode="wait">
          <motion.div key={current.id} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }} transition={{ duration: 0.35 }}>
            <h3>{current.title}</h3>
            <dl>
              <div><dt>Where</dt><dd>{current.place}</dd></div>
              <div><dt>Prize</dt><dd>{current.prize}</dd></div>
            </dl>
          </motion.div>
        </AnimatePresence>
        {items.length > 1 && (
          <div className="ach-nav">
            <button type="button" aria-label="Previous achievement" disabled={active === 0} onClick={() => go(active - 1)}><ArrowLeft size={16} /></button>
            <button type="button" aria-label="Next achievement" disabled={active === items.length - 1} onClick={() => go(active + 1)}><ArrowRight size={16} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

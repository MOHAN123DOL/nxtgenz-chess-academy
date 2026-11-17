import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, RefreshCcw, X } from "lucide-react";
import { cn } from "../lib/utils";
import "./InteractiveBook.css";

/**
 * InteractiveBook (uploaded component, ported to JSX and plain CSS, two-colour theme).
 * Wide screens: the original 3D book. The cover swings open, pages turn around the spine, the book slides to centre.
 * Narrow screens (a two-page spread cannot be read on a phone): the same pages are shown one side at a time
 * with a page-turn animation, plus buttons, dots and swipe.
 *
 * pages: [{ pageNumber, front: { title, text, points, glyph }, back: { title, text, points, glyph } }]
 */
const OPEN_DURATION = 1.5;
const EASING = [0.25, 0, 0, 1];
const BOOK_W = 340;
const BOOK_H = 480;

function Leaf({ side }) {
  if (!side) return null;
  return (
    <div className="book-leaf">
      {side.glyph && <span className="book-glyph" aria-hidden="true">{side.glyph}</span>}
      {side.title && <h3>{side.title}</h3>}
      {side.text && <p>{side.text}</p>}
      {side.points?.length > 0 && <ul>{side.points.map((p) => <li key={p}>{p}</li>)}</ul>}
    </div>
  );
}

function useWide() {
  const [wide, setWide] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return wide;
}

export default function InteractiveBook({ coverImage, bookTitle = "Book Title", bookAuthor = "Author Name", coverGlyph = "♞", openLabel = "Click to open", endLabel = "The end", restartLabel = "Read again", pages, className }) {
  const wide = useWide();
  return wide
    ? <SpreadBook {...{ coverImage, bookTitle, bookAuthor, coverGlyph, openLabel, endLabel, restartLabel, pages, className }} />
    : <SinglePageBook {...{ coverImage, bookTitle, bookAuthor, coverGlyph, openLabel, endLabel, restartLabel, pages, className }} />;
}

function Cover({ coverImage, bookTitle, bookAuthor, coverGlyph }) {
  return (
    <div className="book-cover-art">
      {coverImage && <div className="book-cover-photo" style={{ backgroundImage: `url(${coverImage})` }} />}
      <div className="book-cover-title">
        {!coverImage && <span className="book-cover-glyph" aria-hidden="true">{coverGlyph}</span>}
        <h2>{bookTitle}</h2>
        <p>{bookAuthor}</p>
      </div>
      <div className="book-spine-line" />
    </div>
  );
}

/* ---------- Wide: 3D spread ---------- */
function SpreadBook({ coverImage, bookTitle, bookAuthor, coverGlyph, openLabel, endLabel, restartLabel, pages, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const [hover, setHover] = useState(false);

  const next = (e) => { e?.stopPropagation(); setIndex((i) => (i < pages.length - 1 ? i + 1 : i)); };
  const prev = (e) => { e?.stopPropagation(); setIndex((i) => (i >= 0 ? i - 1 : i)); };
  const close = (e) => { e?.stopPropagation(); setIsOpen(false); setIndex(-1); };
  const restart = (e) => { e?.stopPropagation(); setIndex(-1); };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, pages.length]);

  return (
    <div className={cn("book-stage", className)} style={{ "--bw": `${BOOK_W}px`, "--bh": `${BOOK_H}px` }}>
      <motion.div className="book" initial={{ x: 0 }} animate={{ x: isOpen ? BOOK_W / 2 : 0 }} transition={{ duration: OPEN_DURATION, ease: EASING }}>
        {/* Front cover */}
        <motion.div
          className="book-cover"
          initial={{ rotateY: 0, zIndex: 100 }}
          animate={{ rotateY: isOpen ? -180 : hover ? -15 : 0, zIndex: isOpen ? 0 : 100 }}
          transition={{ rotateY: { duration: OPEN_DURATION, ease: EASING }, zIndex: { delay: isOpen ? OPEN_DURATION * 0.6 : OPEN_DURATION * 0.4 } }}
          onHoverStart={() => !isOpen && setHover(true)}
          onHoverEnd={() => setHover(false)}
        >
          <button type="button" className="book-face book-cover-front" aria-label={`${openLabel}: ${bookTitle}`} disabled={isOpen} onClick={() => setIsOpen(true)} onFocus={() => !isOpen && setHover(true)} onBlur={() => setHover(false)}>
            <Cover {...{ coverImage, bookTitle, bookAuthor, coverGlyph }} />
          </button>
          <div className="book-face book-cover-back" onClick={prev}>
            <div className="book-cover-inner"><h2>{bookTitle}</h2></div>
          </div>
        </motion.div>

        {/* Pages */}
        <div className="book-pages">
          {pages.map((page, i) => {
            const flipped = i <= index;
            return (
              <motion.div
                key={page.pageNumber}
                className="book-page"
                initial={{ rotateY: 0, zIndex: pages.length - i }}
                animate={{ rotateY: flipped ? -180 : 0, zIndex: flipped ? i + 1 : pages.length - i }}
                transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
              >
                <div className="book-face book-page-front" onClick={next} aria-hidden={flipped}>
                  <span className="book-folio right">{page.pageNumber * 2 - 1}</span>
                  <Leaf side={page.front} />
                </div>
                <div className="book-face book-page-back" onClick={prev} aria-hidden={!flipped}>
                  <span className="book-folio left">{page.pageNumber * 2}</span>
                  <Leaf side={page.back} />
                </div>
              </motion.div>
            );
          })}
          <div className="book-back-cover">
            <p>{endLabel}</p>
            <button type="button" className="btn btn-primary" onClick={restart}><RefreshCcw size={14} aria-hidden="true" /> {restartLabel}</button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="book-controls" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Previous page" disabled={index < 0} onClick={prev}><ChevronLeft size={20} /></button>
            <button type="button" aria-label="Next page" disabled={index >= pages.length - 1} onClick={next}><ChevronRight size={20} /></button>
            <button type="button" aria-label="Close book" onClick={close}><X size={20} /></button>
          </motion.div>
        )}
      </AnimatePresence>
      {!isOpen && <p className="book-hint">{openLabel}</p>}
    </div>
  );
}

/* ---------- Narrow: one side at a time ---------- */
function SinglePageBook({ coverImage, bookTitle, bookAuthor, coverGlyph, openLabel, endLabel, restartLabel, pages, className }) {
  const leaves = pages.flatMap((p) => [
    { key: `${p.pageNumber}-f`, number: p.pageNumber * 2 - 1, side: p.front },
    { key: `${p.pageNumber}-b`, number: p.pageNumber * 2, side: p.back },
  ]);
  const [pos, setPos] = useState(-1); // -1 cover, 0..n-1 leaves, n = end
  const [dir, setDir] = useState(1);
  const startX = useRef(null);
  const last = leaves.length;

  const go = (n) => {
    if (n < -1 || n > last) return;
    setDir(n > pos ? 1 : -1);
    setPos(n);
  };

  const onPointerDown = (e) => { startX.current = e.clientX; };
  const onPointerUp = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? pos + 1 : pos - 1);
  };

  const leaf = pos >= 0 && pos < last ? leaves[pos] : null;

  return (
    <div className={cn("book-single", className)}>
      <div className="book-single-frame" onPointerDown={onPointerDown} onPointerUp={onPointerUp} style={{ touchAction: "pan-y" }}>
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.div
            key={pos}
            custom={dir}
            className="book-single-page"
            initial={{ rotateY: dir > 0 ? 70 : -70, opacity: 0, transformPerspective: 1200 }}
            animate={{ rotateY: 0, opacity: 1, transformPerspective: 1200 }}
            exit={{ rotateY: dir > 0 ? -70 : 70, opacity: 0, transformPerspective: 1200 }}
            transition={{ duration: 0.4, ease: [0.645, 0.045, 0.355, 1] }}
            style={{ transformOrigin: dir > 0 ? "left center" : "right center" }}
          >
            {pos === -1 && (
              <button type="button" className="book-single-cover" onClick={() => go(0)} aria-label={`${openLabel}: ${bookTitle}`}>
                <Cover {...{ coverImage, bookTitle, bookAuthor, coverGlyph }} />
              </button>
            )}
            {leaf && (
              <div className="book-single-leaf">
                <span className="book-folio right">{leaf.number}</span>
                <Leaf side={leaf.side} />
              </div>
            )}
            {pos === last && (
              <div className="book-single-end">
                <p>{endLabel}</p>
                <button type="button" className="btn btn-primary" onClick={() => go(-1)}><RefreshCcw size={14} aria-hidden="true" /> {restartLabel}</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="book-single-controls">
        <button type="button" aria-label="Previous page" disabled={pos <= -1} onClick={() => go(pos - 1)}><ChevronLeft size={20} /></button>
        <span className="book-single-count">{pos < 0 ? openLabel : pos >= last ? endLabel : `${pos + 1} / ${last}`}</span>
        <button type="button" aria-label="Next page" disabled={pos >= last} onClick={() => go(pos + 1)}><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

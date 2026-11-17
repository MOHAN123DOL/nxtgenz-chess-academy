import { useEffect, useRef, useState } from "react";
import "./ChessBoardBackground.css";

// Converted from the uploaded HexagonBackground: a chessboard grid whose squares light up as the cursor moves.
// It now fills its nearest positioned parent (the hero), so it never covers white sections or causes overflow.
export default function ChessBoardBackground({ size }) {
  const ref = useRef(null);
  const [grid, setGrid] = useState({ cols: 0, rows: 0, cell: 64 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    const update = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const cell = size || (w < 600 ? 48 : 72);
      setGrid({ cols: Math.ceil(w / cell), rows: Math.ceil(h / cell), cell });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [size]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !fine) return;
    const el = ref.current;
    const parent = el.parentElement;
    let last = null;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / grid.cell);
      const row = Math.floor((e.clientY - rect.top) / grid.cell);
      if (col < 0 || row < 0 || col >= grid.cols) return;
      const idx = row * grid.cols + col;
      if (idx === last) return;
      last = idx;
      const sq = el.children[idx];
      if (!sq) return;
      sq.classList.add("lit");
      setTimeout(() => sq.classList.remove("lit"), 700);
    };
    parent.addEventListener("pointermove", onMove, { passive: true });
    return () => parent.removeEventListener("pointermove", onMove);
  }, [grid]);

  const squares = [];
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      squares.push(<div key={`${r}-${c}`} className={(r + c) % 2 ? "sq dark" : "sq light"} />);
    }
  }

  return (
    <div
      ref={ref}
      className="chess-bg"
      aria-hidden="true"
      style={{ gridTemplateColumns: `repeat(${grid.cols}, ${grid.cell}px)`, gridAutoRows: `${grid.cell}px` }}
    >
      {squares}
    </div>
  );
}

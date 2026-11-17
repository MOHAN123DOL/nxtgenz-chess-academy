import { useEffect, useState } from "react";
import InteractiveParticles from "./InteractiveParticles";
import "./NxtGenzParticles.css";

// Turns a word (the footer credit, "NXT GENZ") into the image the particle effect samples.
async function makeWordImage(word) {
  try { await document.fonts.load('800 220px "Bricolage Grotesque"'); } catch { /* fall back to system font */ }
  const W = 1200, H = 330;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  let px = 250;
  ctx.font = `800 ${px}px "Bricolage Grotesque", "Inter", sans-serif`;
  const w = ctx.measureText(word).width;
  if (w > W * 0.94) { px = Math.floor(px * (W * 0.94) / w); ctx.font = `800 ${px}px "Bricolage Grotesque", "Inter", sans-serif`; }
  ctx.fillText(word, W / 2, H / 2 + px * 0.04);
  return c.toDataURL("image/png");
}

export default function NxtGenzParticles({ word, onError }) {
  const [src, setSrc] = useState(null);
  useEffect(() => {
    let alive = true;
    makeWordImage(word).then((s) => alive && setSrc(s));
    return () => { alive = false; };
  }, [word]);
  if (!src) return null;
  return <InteractiveParticles src={src} label={word} onError={onError} className="nxt-particles" />;
}

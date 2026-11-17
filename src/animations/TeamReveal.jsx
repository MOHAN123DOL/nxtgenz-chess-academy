import { useEffect, useState } from "react";
import SmartImage from "../components/SmartImage.jsx";
import "./TeamReveal.css";

// Ported from the uploaded TeamRevealGrid (plain CSS). Hover, focus or tap reveals a member; auto-rotates when idle.
export default function TeamReveal({ members, autoPlay = true, rotationInterval = 2800 }) {
  const [activeId, setActiveId] = useState(members[0]?.id ?? null);
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    if (!autoPlay || interacting || members.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setActiveId((cur) => {
        const i = members.findIndex((m) => m.id === cur);
        return members[(i + 1) % members.length].id;
      });
    }, Math.max(rotationInterval, 1200));
    return () => clearInterval(timer);
  }, [autoPlay, interacting, members, rotationInterval]);

  return (
    <ul className="team-grid">
      {members.map((m) => {
        const active = m.id === activeId;
        return (
          <li key={m.id}>
            <button
              type="button"
              aria-expanded={active}
              className={`team-card ${active ? "active" : ""}`}
              onClick={() => setActiveId(m.id)}
              onPointerEnter={(e) => { if (e.pointerType === "mouse") { setInteracting(true); setActiveId(m.id); } }}
              onPointerLeave={(e) => { if (e.pointerType === "mouse") setInteracting(false); }}
              onFocus={() => { setInteracting(true); setActiveId(m.id); }}
              onBlur={() => setInteracting(false)}
            >
              <div className="team-photo">
                <SmartImage src={m.image} alt={m.name} />
                <div className="team-details"><p>{m.expertise}</p></div>
              </div>
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

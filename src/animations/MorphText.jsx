import { useId } from "react";
import "./MorphText.css";

// Ported from the uploaded MorphText: threshold SVG filter + CSS keyframes. Plain CSS, no Tailwind.
export default function MorphText({ words = ["CREATE", "DESIGN", "DEVELOP"], interval = 3000, fontSize = "clamp(2.2rem, 9vw, 6rem)", className = "" }) {
  const uid = useId().replace(/:/g, "");
  const filterId = `morph-threshold-${uid}`;
  const wordDuration = interval / 1000;
  const total = wordDuration * words.length;

  return (
    <div className={`morph-root ${className}`} role="text" aria-label={words.join(", ")}>
      <svg aria-hidden="true" focusable="false" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div className="morph-container" style={{ fontSize, filter: `url(#${filterId})` }} aria-hidden="true">
        <div className="morph-rotator">
          {words.map((word, i) => (
            <span key={word} className="morph-word" style={{ animationDelay: `${i * wordDuration}s`, animationDuration: `${total}s` }}>
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

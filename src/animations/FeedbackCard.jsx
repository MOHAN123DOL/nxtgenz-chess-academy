import { useState } from "react";
import { Smile, Frown, Send } from "lucide-react";
import "./FeedbackCard.css";

// Ported from the uploaded Uiverse feedback card (Tailwind classes rewritten as plain CSS).
export default function FeedbackCard({ title, placeholder, sendLabel, onSend }) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");
  return (
    <div className="feedback-card glass">
      <h3>{title}</h3>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label={placeholder} />
      <div className="feedback-row">
        <button type="button" className={mood === "Happy" ? "on" : ""} aria-label="Happy" aria-pressed={mood === "Happy"} onClick={() => setMood("Happy")}><Smile size={20} /></button>
        <button type="button" className={mood === "Unhappy" ? "on" : ""} aria-label="Unhappy" aria-pressed={mood === "Unhappy"} onClick={() => setMood("Unhappy")}><Frown size={20} /></button>
        <button type="button" className="feedback-send" disabled={!text.trim()} onClick={() => onSend({ text: text.trim(), mood })}>
          <Send size={18} /> <span>{sendLabel}</span>
        </button>
      </div>
    </div>
  );
}

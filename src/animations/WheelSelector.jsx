import "./WheelSelector.css";

// Ported from the uploaded Uiverse wheel selector. Controlled: pass options (3 labels), value index, onChange.
export default function WheelSelector({ options, value, onChange, hint = "Tap to spin", name = "wheel" }) {
  const shift = `${(1 - value) * 30}deg`;
  return (
    <div className="wheel-selector">
      <div className="hint-pop">{hint}</div>
      <div className="radio-input" style={{ "--shift": shift }} role="radiogroup" aria-label={hint}>
        {options.map((label, i) => (
          <div key={label} className={`wheel-label ${i === value ? "active" : ""}`} style={{ "--angle": `${(i - 1) * 30}deg` }}>
            <input type="radio" name={name} checked={i === value} onChange={() => onChange(i)} className="wheel-radio" aria-label={label} />
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span className="label">{label}</span>
          </div>
        ))}
        <button type="button" className="next-trigger" aria-label="Show next level" onClick={() => onChange((value + 1) % options.length)} />
        <div className="glass-overlay" />
      </div>
    </div>
  );
}

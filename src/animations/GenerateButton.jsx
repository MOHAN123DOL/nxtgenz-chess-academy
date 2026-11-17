import { ChevronUp, ArrowRight } from "lucide-react";
import "./GenerateButton.css";

// STAND-IN: the VengeanceUI "generate-button" source was not provided (only an npx command).
// Swap this file's markup for the real component once its source is available.
export default function GenerateButton({ label = "Next", onClick, floating = false, direction = "next", disabled = false }) {
  const Icon = direction === "up" || floating ? ChevronUp : ArrowRight;
  return (
    <button
      type="button"
      className={`gen-btn ${floating ? "gen-floating" : ""}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <span className="gen-label">{floating ? "" : label}</span>
      <Icon size={18} />
    </button>
  );
}

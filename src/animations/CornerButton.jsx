import "./CornerButton.css";

// Ported from the uploaded CornerButton (plain CSS, recoloured to the two-colour theme).
const PencilIcon = () => (
  <svg className="corner-btn-svg" viewBox="0 0 24 24" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.6744 11.4075L15.7691 17.1233C15.7072 17.309 15.5586 17.4529 15.3709 17.5087L3.69348 20.9803C3.22819 21.1186 2.79978 20.676 2.95328 20.2155L6.74467 8.84131C6.79981 8.67588 6.92419 8.54263 7.08543 8.47624L12.472 6.25822C12.696 6.166 12.9535 6.21749 13.1248 6.38876L17.5294 10.7935C17.6901 10.9542 17.7463 11.1919 17.6744 11.4075Z" />
    <path d="M3.2959 20.6016L9.65986 14.2376" />
    <path d="M17.7917 11.0557L20.6202 8.22724C21.4012 7.44619 21.4012 6.17986 20.6202 5.39881L18.4989 3.27749C17.7178 2.49645 16.4515 2.49645 15.6704 3.27749L12.842 6.10592" />
  </svg>
);

export default function CornerButton({ children = "Send", showIcon = true, className = "", ...props }) {
  return (
    <div className="corner-btn-wrapper">
      <div className="corner-line horizontal top" aria-hidden="true" />
      <div className="corner-line vertical right" aria-hidden="true" />
      <div className="corner-line horizontal bottom" aria-hidden="true" />
      <div className="corner-line vertical left" aria-hidden="true" />
      <div className="corner-dot top left" aria-hidden="true" />
      <div className="corner-dot top right" aria-hidden="true" />
      <div className="corner-dot bottom right" aria-hidden="true" />
      <div className="corner-dot bottom left" aria-hidden="true" />
      <button className={`corner-btn ${className}`} {...props}>
        <span>{children}</span>
        {showIcon ? <PencilIcon /> : null}
      </button>
    </div>
  );
}

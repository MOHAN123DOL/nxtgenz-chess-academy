import { useState } from "react";

// Shows a chessboard + knight placeholder if the image file has not been added yet.
// Photos themselves are never filtered or tinted.
export default function SmartImage({ src, alt, className = "", style, ...rest }) {
  const [failed, setFailed] = useState(!src);
  return (
    <div className={`smart-image ${failed ? "is-empty" : ""} ${className}`} style={style}>
      {failed ? (
        <span className="smart-image-piece" aria-hidden="true">♞</span>
      ) : (
        <img src={src} alt={alt} loading="lazy" draggable={false} onError={() => setFailed(true)} {...rest} />
      )}
    </div>
  );
}

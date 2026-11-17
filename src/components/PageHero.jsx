import SmartImage from "./SmartImage";
import ChessBoardBackground from "../animations/ChessBoardBackground";

// Shared purple hero for About, Courses, Gallery and Contact. Text and photo come from each page's data file.
export default function PageHero({ title, subtitle, image, imageAlt = "" }) {
  return (
    <section className="page-hero checker-edge">
      <ChessBoardBackground />
      <div className="container page-hero-grid">
        <div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="hero-photo"><SmartImage src={image} alt={imageAlt} /></div>
      </div>
    </section>
  );
}

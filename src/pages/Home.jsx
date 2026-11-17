import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, Layers, Monitor, Trophy, Quote, ArrowRight } from "lucide-react";
import { academyData } from "../data/academyData";
import { homeData } from "../data/homeData";
import { coursesData } from "../data/coursesData";
import useSeo from "../components/useSeo";
import SmartImage from "../components/SmartImage";
import ChessBoardBackground from "../animations/ChessBoardBackground";
import MorphText from "../animations/MorphText";
import "./Home.css";

const icons = { Crown, Layers, Monitor, Trophy };

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      if (reduce) return setN(to);
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6 } };

export default function Home() {
  useSeo(homeData.seo);
  const { hero, stats, aboutPreview, why, coursesPreview, testimonials, cta } = homeData;
  const { currency, priceSuffix } = coursesData;

  return (
    <>
      <section className="home-hero band-dark checker-edge">
        <ChessBoardBackground />
        <div className="container hero-grid">
          <div className="hero-inner">
            <p className="hero-kicker">{hero.trustedLine}</p>
            <MorphText words={hero.morphWords} />
            <h1 className="hero-name">{academyData.name.toUpperCase()}</h1>
            <p className="hero-headline">{hero.headline}</p>
            <p className="hero-desc">{hero.description}</p>
            <div className="hero-actions">
              <Link to={hero.primaryButton.to} className="btn btn-primary">{hero.primaryButton.label} <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link to={hero.secondaryButton.to} className="btn btn-ghost">{hero.secondaryButton.label}</Link>
            </div>
          </div>
          <div className="hero-photo home-photo"><SmartImage src={hero.backgroundImage} alt="" /></div>
        </div>
      </section>

      <section className="section band-light">
        <div className="container grid grid-4 stats">
          {stats.map((s) => (
            <motion.div key={s.label} className="card stat" {...reveal}>
              <strong><Counter to={s.value} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {aboutPreview.show && (
        <section className="section band-dark">
          <div className="container grid grid-2 about-preview">
            <motion.div {...reveal}>
              <h2 className="section-title">{aboutPreview.title}</h2>
              <p className="section-sub">{aboutPreview.text}</p>
              <Link to={aboutPreview.link.to} className="btn btn-ghost" style={{ marginTop: "1.75rem" }}>{aboutPreview.link.label}</Link>
            </motion.div>
            <motion.div className="about-img" {...reveal}>
              <SmartImage src={aboutPreview.image} alt={aboutPreview.imageAlt} />
            </motion.div>
          </div>
        </section>
      )}

      <section className="section band-light">
        <div className="container">
          <h2 className="section-title">{why.title}</h2>
          <div className="grid grid-4" style={{ marginTop: "2rem" }}>
            {why.items.map((item) => {
              const Icon = icons[item.icon] || Crown;
              return (
                <motion.article key={item.title} className="card why-card" {...reveal}>
                  <span className="icon-tile"><Icon size={26} aria-hidden="true" /></span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <h2 className="section-title">{coursesPreview.title}</h2>
          <p className="section-sub">{coursesPreview.subtitle}</p>
          <div className="grid grid-3" style={{ marginTop: "2rem" }}>
            {coursesData.courses.map((c) => (
              <motion.article key={c.id} className="card preview-course" {...reveal}>
                <span className="chip-label">{c.level}</span>
                <h3>{c.name}</h3>
                <p>{c.summary}</p>
                <p className="preview-price">{currency}{c.price.toLocaleString("en-IN")}<small>{priceSuffix}</small></p>
              </motion.article>
            ))}
          </div>
          <Link to="/courses" className="btn btn-primary" style={{ marginTop: "2.25rem" }}>{coursesPreview.buttonLabel}</Link>
        </div>
      </section>

      <section className="section band-light">
        <div className="container">
          <h2 className="section-title">{testimonials.title}</h2>
          <p className="form-note">{testimonials.note}</p>
          <div className="grid grid-3" style={{ marginTop: "1.5rem" }}>
            {testimonials.items.map((t, i) => (
              <motion.blockquote key={t.name} className="card quote-card" {...reveal} transition={{ duration: 0.6, delay: i * 0.08 }}>
                <Quote size={26} aria-hidden="true" />
                <p>{t.text}</p>
                <footer>{t.name}</footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-light cta-section">
        <div className="container cta-band band-dark">
          <h2 className="section-title">{cta.title}</h2>
          <Link to={cta.button.to} className="btn btn-primary">{cta.button.label}</Link>
        </div>
      </section>
    </>
  );
}

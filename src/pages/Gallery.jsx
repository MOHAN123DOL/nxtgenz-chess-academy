import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { galleryData } from "../data/galleryData";
import useSeo from "../components/useSeo";
import SmartImage from "../components/SmartImage";
import PageHero from "../components/PageHero";
import PerspectiveCarousel from "../animations/PerspectiveCarousel";
import AchievementStack from "../animations/AchievementStack";
import "./Gallery.css";

export default function Gallery() {
  useSeo(galleryData.seo);
  const { hero, categories, items, medals, medalsTitle, achievements, achievementsTitle, highlightsTitle } = galleryData;
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const visible = category === "All" ? items : items.filter((i) => i.category === category);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.backgroundImage} />

      <section className="section band-light">
        <div className="container">
          <div className="filters" role="tablist" aria-label="Gallery categories">
            {categories.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={category === c} className={`chip ${category === c ? "on" : ""}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          <motion.div layout className="photo-grid">
            <AnimatePresence>
              {visible.map((item) => (
                <motion.button
                  layout key={item.id} type="button" className="photo card"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.35 }}
                  onClick={() => setSelected(item)} aria-label={`Enlarge: ${item.title}`}
                >
                  <span className="photo-img"><SmartImage src={item.src} alt={item.title} /></span>
                  <span className="photo-caption">{item.title}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <h2 className="section-title center">{medalsTitle}</h2>
          <PerspectiveCarousel items={medals} />
        </div>
      </section>

      <section className="section band-light">
        <div className="container">
          <h2 className="section-title center">{achievementsTitle}</h2>
          <div style={{ marginTop: "2rem" }}><AchievementStack items={achievements} /></div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <h2 className="section-title">{highlightsTitle}</h2>
          <div className="grid grid-3" style={{ marginTop: "1.5rem" }}>
            {achievements.map((a) => (
              <article key={a.id} className="card highlight">
                <h3>{a.title}</h3>
                <p>{a.place}</p>
                <strong>{a.prize}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <button type="button" className="lightbox-close" aria-label="Close image" onClick={() => setSelected(null)}><X size={24} /></button>
            <motion.div className="lightbox-img" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
              <div className="lightbox-photo"><SmartImage src={selected.src} alt={selected.title} /></div>
              <p>{selected.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

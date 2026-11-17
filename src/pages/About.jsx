import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Target, Eye, Check } from "lucide-react";
import { aboutData } from "../data/aboutData";
import { galleryData } from "../data/galleryData";
import useSeo from "../components/useSeo";
import SmartImage from "../components/SmartImage";
import PageHero from "../components/PageHero";
import TeamReveal from "../animations/TeamReveal";
import AchievementStack from "../animations/AchievementStack";
import InteractiveBook from "../animations/InteractiveBook";
import "./About.css";

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6 } };

export default function About() {
  useSeo(aboutData.seo);
  const { hero, story, mission, vision, whyChess, owner, coaches, community, learningPath } = aboutData;

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.backgroundImage} />

      <section className="section band-light">
        <div className="container grid grid-2 story">
          <motion.div {...reveal}>
            <h2 className="section-title">{story.title}</h2>
            {story.text.map((p) => <p key={p} className="section-sub" style={{ marginBottom: "1rem" }}>{p}</p>)}
          </motion.div>
          <motion.div className="framed story-img" {...reveal}><SmartImage src={story.image} alt="Chess training at the academy" /></motion.div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container grid grid-2">
          <motion.article className="card mv-card" {...reveal}><span className="icon-tile"><Target size={26} aria-hidden="true" /></span><h3>{mission.title}</h3><p>{mission.text}</p></motion.article>
          <motion.article className="card mv-card" {...reveal}><span className="icon-tile"><Eye size={26} aria-hidden="true" /></span><h3>{vision.title}</h3><p>{vision.text}</p></motion.article>
        </div>
      </section>

      <section className="section band-light">
        <div className="container">
          <h2 className="section-title">{whyChess.title}</h2>
          <ul className="why-list">
            {whyChess.items.map((i) => <li key={i} className="card"><Check size={20} aria-hidden="true" /> <span>{i}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <h2 className="section-title">{owner.title}</h2>
          <motion.div className="card owner-card" {...reveal}>
            <div className="owner-photo"><SmartImage src={owner.image} alt={`${owner.name}, ${owner.role}`} /></div>
            <div>
              <h3>{owner.name}</h3>
              <p className="owner-role">{owner.role}</p>
              <p>{owner.bio}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section band-light">
        <div className="container">
          <h2 className="section-title">{coaches.title}</h2>
          <p className="section-sub" style={{ marginBottom: "2rem" }}>{coaches.description}</p>
          <TeamReveal members={coaches.members} />
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <h2 className="section-title center">{aboutData.achievementsTitle}</h2>
          <div style={{ marginTop: "2rem" }}><AchievementStack items={galleryData.achievements} /></div>
        </div>
      </section>

      <section className="section band-light learning">
        <div className="container">
          <h2 className="section-title center">{learningPath.title}</h2>
          <p className="section-sub center" style={{ marginBottom: "2.5rem" }}>{learningPath.text}</p>
          <InteractiveBook
            coverImage={learningPath.coverImage}
            coverGlyph={learningPath.coverGlyph}
            bookTitle={learningPath.bookTitle}
            bookAuthor={learningPath.bookAuthor}
            openLabel={learningPath.openLabel}
            endLabel={learningPath.endLabel}
            restartLabel={learningPath.restartLabel}
            pages={learningPath.pages}
          />
        </div>
      </section>

      <section className="section band-light cta-section">
        <div className="container cta-band band-dark">
          <h2 className="section-title">{community.title}</h2>
          <p className="section-sub">{community.text}</p>
          <Link to={community.button.to} className="btn btn-primary">{community.button.label}</Link>
        </div>
      </section>
    </>
  );
}

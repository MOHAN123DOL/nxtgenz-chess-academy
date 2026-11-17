import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { academyData } from "../data/academyData";
import { coursesData } from "../data/coursesData";
import "./Footer.css";

const socialIcons = { instagram: Instagram, facebook: Facebook, youtube: Youtube, linkedin: Linkedin };
// three.js is loaded only when the footer is near the screen.
const NxtGenzParticles = lazy(() => import("../animations/NxtGenzParticles"));

function CreditWordmark({ name }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }, { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showParticles = near && !failed && !reduce;
  return (
    <div ref={ref} className="credit-visual">
      <p className="credit-static" aria-hidden={showParticles}>{name}</p>
      {showParticles && (
        <Suspense fallback={null}>
          <div className="credit-particles"><NxtGenzParticles word={name} onError={() => setFailed(true)} /></div>
        </Suspense>
      )}
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const { address, socialLinks, footer } = academyData;
  const cardLinks = ["instagram", "facebook", "youtube"].map((k) => ({ key: k, href: socialLinks[k], Icon: socialIcons[k] }));

  return (
    <footer className="site-footer band-dark checker-top">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand-card" tabIndex={0}>
            <div className="bc-border" />
            <div className="bc-content">
              <div className="bc-logo"><span className="bc-n">N</span><span className="bc-rest">XT GENZ</span></div>
              <span className="bc-sub">{footer.brandBottomText}</span>
            </div>
          </div>
          <p>{footer.blurb}</p>
        </div>

        <div>
          <h4>Quick links</h4>
          <ul>{academyData.nav.map((n) => <li key={n.path}><Link to={n.path}>{n.label}</Link></li>)}</ul>
        </div>

        <div>
          <h4>Courses</h4>
          <ul>{coursesData.courses.map((c) => <li key={c.id}><Link to="/courses">{c.name}</Link></li>)}</ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="contact-list">
            <li><Phone size={16} aria-hidden="true" /> <a href={`tel:${academyData.phone.replace(/\s/g, "")}`}>{academyData.phone}</a></li>
            <li><Mail size={16} aria-hidden="true" /> <a href={`mailto:${academyData.email}`}>{academyData.email}</a></li>
            <li><MapPin size={16} aria-hidden="true" /> <span>{address.street}, {address.area}, {address.city}, {address.state} {address.pincode}</span></li>
          </ul>
        </div>

        <div className="footer-social">
          <div className="social-card" tabIndex={0}>
            <div className="sc-bg" />
            <div className="sc-logo">{footer.socialCardLabel}</div>
            {cardLinks.map(({ key, href, Icon }, i) => (
              <a key={key} href={href || "#"} target={href ? "_blank" : undefined} rel="noopener noreferrer" aria-label={key} className={`sc-box sc-box${i + 1}`}>
                <span className="sc-icon"><Icon size={20} aria-hidden="true" /></span>
              </a>
            ))}
            <div className="sc-box sc-box4" />
          </div>
        </div>
      </div>

      <div className="container credit">
        <p className="credit-label">{footer.credit.label}</p>
        <CreditWordmark name={footer.credit.name} />
      </div>
      <p className="copyright">© {year} {academyData.name}. All rights reserved.</p>
    </footer>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Monitor } from "lucide-react";
import { coursesData } from "../data/coursesData";
import useSeo from "../components/useSeo";
import PageHero from "../components/PageHero";
import PricingTiers from "../components/PricingTiers";
import WheelSelector from "../animations/WheelSelector";
import SeatsClock from "../animations/SeatsClock";
import GenerateButton from "../animations/GenerateButton";
import "./Courses.css";

export default function Courses() {
  useSeo(coursesData.seo);
  const { hero, courses, currency, priceSuffix, pricing, picker, online, benefits, seats, enrollCta } = coursesData;
  const [level, setLevel] = useState(0);
  const picked = courses[level];
  const price = (n) => `${currency}${n.toLocaleString("en-IN")}`;
  const { billing } = pricing;

  // Course data -> pricing cards. Yearly price (when the switch is enabled) is the monthly price minus the discount.
  const tiers = courses.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.summary,
    badge: c.badge,
    featured: c.featured,
    meta: `${pricing.durationLabel}: ${c.duration}`,
    price: billing.enabled
      ? { monthly: c.price, yearly: Math.round(c.price * (1 - billing.yearlyDiscountPercent / 100)) }
      : c.price,
    cta: { label: `${pricing.ctaPrefix} ${c.level}`, to: "/contact" },
    featuresLabel: pricing.featuresLabel,
    features: c.features,
  }));

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.backgroundImage} />

      <section className="section band-light">
        <div className="container">
          <h2 className="section-title center">{pricing.title}</h2>
          <p className="section-sub center" style={{ marginBottom: "2.5rem" }}>{pricing.subtitle}</p>
          <PricingTiers
            tiers={tiers}
            currency={currency}
            periodLabel={priceSuffix}
            showBillingSwitch={billing.enabled}
            billingLabels={{ monthly: billing.monthlyLabel, yearly: billing.yearlyLabel }}
            yearlyDiscountLabel={billing.enabled && billing.yearlyDiscountPercent ? `-${billing.yearlyDiscountPercent}%` : null}
          />
        </div>
      </section>

      <section className="section band-dark">
        <div className="container grid grid-2 picker">
          <div>
            <h2 className="section-title">{picker.title}</h2>
            <p className="section-sub">{picker.subtitle}</p>
            <div className="picker-summary card" aria-live="polite">
              <h3>{picked.name}</h3>
              <p>{picked.summary}</p>
              <p className="course-meta">{picked.duration} · {price(picked.price)}{priceSuffix}</p>
              <div style={{ marginTop: "1rem" }}>
                <GenerateButton label={picker.nextLabel} onClick={() => setLevel((level + 1) % courses.length)} />
              </div>
            </div>
          </div>
          <WheelSelector options={courses.map((c) => c.wheelLabel)} value={level} onChange={setLevel} name="course-level-preview" />
        </div>
      </section>

      <section className="section band-light">
        <div className="container card online">
          <span className="icon-tile"><Monitor size={28} aria-hidden="true" /></span>
          <div>
            <h2 className="section-title">{online.title}</h2>
            <p className="section-sub">{online.text}</p>
            <ul className="online-points">{online.points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container">
          <h2 className="section-title">{benefits.title}</h2>
          <ul className="benefit-list">{benefits.items.map((b) => <li key={b} className="card"><Check size={20} aria-hidden="true" /> <span>{b}</span></li>)}</ul>
        </div>
      </section>

      <section className="section band-light cta-section">
        <div className="container band-dark cta-band seats-band">
          <SeatsClock label={seats.label} seatsLeft={seats.left} seatsTotal={seats.total} />
          <div className="enroll-cta">
            <h2 className="section-title">{enrollCta.title}</h2>
            <Link to={enrollCta.button.to} className="btn btn-primary">{enrollCta.button.label}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

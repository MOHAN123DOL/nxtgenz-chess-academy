import * as React from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "../lib/utils";
import "./PricingTiers.css";

/**
 * PricingTiers (uploaded component, rebuilt in plain CSS, two-colour theme).
 * Kept from the upload: billing switch with sliding thumb and arrow-key support, rolling price digits,
 * featured card, dotted divider, staggered reveal. The Tailwind-only parts (dark-mode variants, blue and gray buttons,
 * Phosphor icons, enterprise row) were dropped. Everything is driven by props, which the Courses page fills from coursesData.
 *
 * tier: { id, name, description, price: { monthly, yearly } | number, featured, cta: { label, to }, featuresLabel, features: string[] }
 */
const BILLING = ["monthly", "yearly"];
const EASE_OUT = [0.22, 1, 0.36, 1];
const ROLL = {
  enter: (d) => ({ y: d * 14, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (d) => ({ y: d * -14, opacity: 0 }),
};

export default function PricingTiers({
  tiers,
  currency = "₹",
  locale = "en-IN",
  periodLabel = "/month",
  billing,
  defaultBilling = "monthly",
  onBillingChange,
  billingLabels = { monthly: "Monthly", yearly: "Yearly" },
  yearlyDiscountLabel = null,
  showBillingSwitch = false,
  animateIn = true,
  className,
}) {
  const [internal, setInternal] = React.useState(defaultBilling);
  const active = billing ?? internal;
  const formatter = React.useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const select = (next) => {
    if (next === active) return;
    if (billing === undefined) setInternal(next);
    onBillingChange?.(next);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("pricing", className)}>
        {showBillingSwitch && (
          <BillingSwitch value={active} onChange={select} labels={billingLabels} discountLabel={yearlyDiscountLabel} />
        )}
        <div className="pricing-grid">
          {tiers.map((tier, i) => (
            <TierCard
              key={tier.id}
              tier={tier}
              billing={active}
              currency={currency}
              formatter={formatter}
              periodLabel={periodLabel}
              {...(animateIn
                ? { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.6, delay: i * 0.06, ease: EASE_OUT } }
                : {})}
            />
          ))}
        </div>
      </div>
    </MotionConfig>
  );
}

function BillingSwitch({ value, onChange, labels, discountLabel }) {
  const refs = React.useRef([]);
  const onKeyDown = (e) => {
    const cur = BILLING.indexOf(value);
    const last = BILLING.length - 1;
    let next;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = cur === 0 ? last : cur - 1;
    else if (e.key === "ArrowRight" || e.key === "ArrowDown") next = cur === last ? 0 : cur + 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    onChange(BILLING[next]);
    refs.current[next]?.focus();
  };
  return (
    <div role="radiogroup" aria-label="Billing period" onKeyDown={onKeyDown} className="billing-switch">
      <span aria-hidden="true" className={cn("billing-thumb", value === "yearly" && "is-yearly")} />
      {BILLING.map((cycle, i) => (
        <button
          key={cycle}
          ref={(n) => { refs.current[i] = n; }}
          type="button"
          role="radio"
          aria-checked={cycle === value}
          tabIndex={cycle === value ? 0 : -1}
          onClick={() => onChange(cycle)}
          className={cn("billing-option", cycle === value && "is-on")}
        >
          {labels[cycle]}
          {cycle === "yearly" && discountLabel ? <span className="billing-chip">{discountLabel}</span> : null}
        </button>
      ))}
    </div>
  );
}

const TierCard = React.forwardRef(function TierCard({ tier, billing, currency, formatter, periodLabel, ...motionProps }, ref) {
  const amount = typeof tier.price === "number" ? tier.price : tier.price[billing];
  return (
    <motion.article ref={ref} className={cn("tier", tier.featured && "is-featured")} {...motionProps}>
      {tier.badge && <span className="tier-badge">{tier.badge}</span>}
      <header className="tier-head">
        <h3>{tier.name}</h3>
        {tier.description && <p>{tier.description}</p>}
      </header>
      <div className="tier-body">
        <div className="tier-price">
          <span className="tier-amount"><RollingValue amount={amount} text={`${currency}${formatter.format(amount)}`} /></span>
          <span className="tier-period">{periodLabel}</span>
        </div>
        {tier.meta && <p className="tier-meta">{tier.meta}</p>}
        <Link to={tier.cta.to} className="btn btn-primary tier-cta">{tier.cta.label}</Link>
        <svg aria-hidden="true" className="tier-rule" fill="none">
          <line x1="0.75" x2="100%" y1="1.25" y2="1.25" stroke="currentColor" strokeDasharray="0.01 6" strokeLinecap="round" strokeWidth="2" />
        </svg>
        {tier.featuresLabel && <p className="tier-features-label">{tier.featuresLabel}</p>}
        <ul className="tier-features">
          {tier.features.map((f) => (
            <li key={f}><Check size={18} aria-hidden="true" /><span>{f}</span></li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
});

// Rolls up when the price rises and down when it drops. With reduced motion it is a plain crossfade.
function RollingValue({ amount, text }) {
  const reduce = useReducedMotion();
  const prev = React.useRef(amount);
  const direction = amount === prev.current ? 1 : amount > prev.current ? 1 : -1;
  React.useEffect(() => { prev.current = amount; }, [amount]);
  const offset = reduce ? 0 : direction;
  return (
    <AnimatePresence mode="popLayout" initial={false} custom={offset}>
      <motion.span key={text} custom={offset} variants={ROLL} initial="enter" animate="center" exit="exit" transition={{ duration: 0.32, ease: EASE_OUT }} className="roll">
        {text}
      </motion.span>
    </AnimatePresence>
  );
}

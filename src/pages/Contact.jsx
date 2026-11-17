import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { academyData } from "../data/academyData";
import { contactData } from "../data/contactData";
import { coursesData } from "../data/coursesData";
import useSeo from "../components/useSeo";
import PageHero from "../components/PageHero";
import CornerButton from "../animations/CornerButton";
import WheelSelector from "../animations/WheelSelector";
import FeedbackCard from "../animations/FeedbackCard";
import "./Contact.css";

const waLink = (text) => `https://wa.me/${academyData.whatsapp}?text=${encodeURIComponent(text)}`;
const openWhatsApp = (text) => window.open(waLink(text), "_blank", "noopener,noreferrer");
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const phoneOk = (v) => v.replace(/\D/g, "").length >= 10;

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="err" role="alert">{error}</span>}
    </div>
  );
}

export default function Contact() {
  useSeo(contactData.seo);
  const { hero, info, contactForm, enrollForm, levelPickerLabel, feedback, whatsappButtonLabel, mapZoom } = contactData;
  const { address, workingHours, socialLinks } = academyData;
  const courses = coursesData.courses;

  const [c, setC] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [cErr, setCErr] = useState({});
  const [e, setE] = useState({ studentName: "", age: "", parentName: "", phone: "", email: "", mode: enrollForm.classModes[0], message: "" });
  const [level, setLevel] = useState(0);
  const [eErr, setEErr] = useState({});

  const fullAddress = `${address.street}, ${address.area}, ${address.city}, ${address.state} ${address.pincode}, ${address.country}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&z=${mapZoom}&output=embed`;

  const submitContact = (ev) => {
    ev.preventDefault();
    const err = {};
    if (c.name.trim().length < 2) err.name = "Enter your full name.";
    if (!emailOk(c.email)) err.email = "Enter a valid email address.";
    if (!phoneOk(c.phone)) err.phone = "Enter a phone number with at least 10 digits.";
    if (!c.subject.trim()) err.subject = "Enter a subject.";
    if (c.message.trim().length < 10) err.message = "Write at least 10 characters.";
    setCErr(err);
    if (Object.keys(err).length) return;
    openWhatsApp(`Hello ${academyData.name},\nName: ${c.name}\nEmail: ${c.email}\nPhone: ${c.phone}\nSubject: ${c.subject}\n\n${c.message}`);
  };

  const submitEnroll = (ev) => {
    ev.preventDefault();
    const err = {};
    const age = Number(e.age);
    if (e.studentName.trim().length < 2) err.studentName = "Enter the student's name.";
    if (!age || age < 4 || age > 99) err.age = "Enter an age between 4 and 99.";
    if (e.parentName.trim().length < 2) err.parentName = "Enter the parent or guardian's name.";
    if (!phoneOk(e.phone)) err.phone = "Enter a phone number with at least 10 digits.";
    if (!emailOk(e.email)) err.email = "Enter a valid email address.";
    setEErr(err);
    if (Object.keys(err).length) return;
    const course = courses[level];
    openWhatsApp(`Enrollment request for ${academyData.name}\nStudent: ${e.studentName} (age ${e.age})\nParent: ${e.parentName}\nPhone: ${e.phone}\nEmail: ${e.email}\nCourse: ${course.name}\nClass mode: ${e.mode}\n${e.message ? `\nMessage: ${e.message}` : ""}`);
  };

  const setCF = (k) => (ev) => setC({ ...c, [k]: ev.target.value });
  const setEF = (k) => (ev) => setE({ ...e, [k]: ev.target.value });
  const cf = contactForm.fields;
  const ef = enrollForm.fields;

  return (
    <>
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.backgroundImage} />

      <section className="section band-light">
        <div className="container grid grid-3">
          <article className="card info-card"><span className="icon-tile"><Phone size={24} aria-hidden="true" /></span><h3>Phone</h3><a href={`tel:${academyData.phone.replace(/\s/g, "")}`}>{academyData.phone}</a></article>
          <article className="card info-card"><span className="icon-tile"><Mail size={24} aria-hidden="true" /></span><h3>Email</h3><a href={`mailto:${academyData.email}`}>{academyData.email}</a></article>
          <article className="card info-card"><span className="icon-tile"><Clock size={24} aria-hidden="true" /></span><h3>{info.hoursTitle}</h3><p>Mon-Sat: {workingHours.weekdays}</p><p>Sunday: {workingHours.sunday}</p></article>
        </div>
      </section>

      <section className="section band-dark">
        <div className="container grid grid-2 forms">
          <form className="card form-card" onSubmit={submitContact} noValidate>
            <h2>{contactForm.title}</h2>
            <Field id="c-name" label={cf.name} error={cErr.name}><input id="c-name" value={c.name} onChange={setCF("name")} autoComplete="name" /></Field>
            <Field id="c-email" label={cf.email} error={cErr.email}><input id="c-email" type="email" value={c.email} onChange={setCF("email")} autoComplete="email" /></Field>
            <Field id="c-phone" label={cf.phone} error={cErr.phone}><input id="c-phone" type="tel" value={c.phone} onChange={setCF("phone")} autoComplete="tel" /></Field>
            <Field id="c-subject" label={cf.subject} error={cErr.subject}><input id="c-subject" value={c.subject} onChange={setCF("subject")} /></Field>
            <Field id="c-message" label={cf.message} error={cErr.message}><textarea id="c-message" rows={4} value={c.message} onChange={setCF("message")} /></Field>
            <CornerButton type="submit" showIcon>{contactForm.submitLabel}</CornerButton>
            <p className="form-note">{contactForm.note}</p>
          </form>

          <form className="card form-card" onSubmit={submitEnroll} noValidate>
            <h2>{enrollForm.title}</h2>
            <Field id="e-student" label={ef.studentName} error={eErr.studentName}><input id="e-student" value={e.studentName} onChange={setEF("studentName")} /></Field>
            <div className="two-col">
              <Field id="e-age" label={ef.age} error={eErr.age}><input id="e-age" type="number" min="4" max="99" value={e.age} onChange={setEF("age")} /></Field>
              <Field id="e-parent" label={ef.parentName} error={eErr.parentName}><input id="e-parent" value={e.parentName} onChange={setEF("parentName")} /></Field>
            </div>
            <div className="two-col">
              <Field id="e-phone" label={ef.phone} error={eErr.phone}><input id="e-phone" type="tel" value={e.phone} onChange={setEF("phone")} /></Field>
              <Field id="e-email" label={ef.email} error={eErr.email}><input id="e-email" type="email" value={e.email} onChange={setEF("email")} /></Field>
            </div>
            <div>
              <p className="wheel-label-text">{ef.course}: <strong>{courses[level].name}</strong></p>
              <WheelSelector options={courses.map((x) => x.wheelLabel)} value={level} onChange={setLevel} hint={levelPickerLabel} name="course-level-enroll" />
            </div>
            <Field id="e-mode" label={ef.mode}>
              <select id="e-mode" value={e.mode} onChange={setEF("mode")}>{enrollForm.classModes.map((m) => <option key={m}>{m}</option>)}</select>
            </Field>
            <Field id="e-message" label={ef.message}><textarea id="e-message" rows={3} value={e.message} onChange={setEF("message")} /></Field>
            <button type="submit" className="btn btn-primary">{enrollForm.submitLabel}</button>
            <p className="form-note">{enrollForm.note}</p>
          </form>
        </div>
      </section>

      <section className="section band-light">
        <div className="container grid grid-2 map-row">
          <div>
            <h2 className="section-title">{info.locationTitle}</h2>
            <p className="section-sub"><MapPin size={16} style={{ display: "inline", marginRight: 6 }} aria-hidden="true" />{fullAddress}</p>
            <p className="form-note" style={{ marginTop: "0.5rem" }}>Address shown is a placeholder until you set the real one in academyData.js.</p>
            <ul className="social-links">
              {Object.entries(socialLinks).filter(([, url]) => url).map(([name, url]) => (
                <li key={name}><a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{name}</a></li>
              ))}
            </ul>
            <div style={{ marginTop: "1.5rem" }}>
              <FeedbackCard title={feedback.title} placeholder={feedback.placeholder} sendLabel={feedback.sendLabel}
                onSend={({ text, mood }) => openWhatsApp(`Feedback for ${academyData.name}${mood ? ` (${mood})` : ""}:\n${text}`)} />
            </div>
          </div>
          <div className="map card">
            <iframe title="Academy location map" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </section>

      <a className="wa-float" href={waLink(`Hello ${academyData.name}, I would like to know more.`)} target="_blank" rel="noopener noreferrer" aria-label={whatsappButtonLabel}>
        <MessageCircle size={22} aria-hidden="true" /> <span>{whatsappButtonLabel}</span>
      </a>
    </>
  );
}

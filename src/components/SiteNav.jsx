import { Link } from "react-router-dom";
import { Home, Info, BookOpen, Image as ImageIcon, Mail } from "lucide-react";
import GlassDock from "./GlassDock";
import { academyData } from "../data/academyData";
import "./SiteNav.css";

// Maps academyData.nav (Home, About, Courses, Gallery, Contact) onto the uploaded GlassDock.
// Mounted once in App.jsx, outside <Routes>, so the same navigation appears on every page.
const ICONS = { Home, About: Info, Courses: BookOpen, Gallery: ImageIcon, Contact: Mail };
// The uploaded dock only ships morph animations for "home" and "email"; they are used for Home and Contact.
const MORPH = { Home: "home", Contact: "email" };

export default function SiteNav() {
  const items = academyData.nav.map((n) => ({ title: n.label, href: n.path, icon: ICONS[n.label] || Home, morph: MORPH[n.label] }));
  return (
    <>
      <Link to="/" className="site-brand" aria-label={`${academyData.name} home`}>
        <span className="site-brand-mark" aria-hidden="true">♞</span>
        <span>{academyData.shortName}</span>
      </Link>
      <nav aria-label="Main navigation">
        <GlassDock items={items} />
      </nav>
    </>
  );
}

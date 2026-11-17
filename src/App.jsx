import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import SiteNav from "./components/SiteNav.jsx";
import Footer from "./components/Footer.jsx";
import GenerateButton from "./animations/GenerateButton.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Courses from "./pages/Courses.jsx";
import Gallery from "./pages/Gallery.jsx";
import Contact from "./pages/Contact.jsx";

function ScrollToTopOnRoute() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function GoToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return <GenerateButton floating label="Go to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} />;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTopOnRoute />
      {/* The uploaded dock navigation: rendered once here, outside <Routes>, so every page shares it. */}
      <SiteNav />
      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <GoToTop />
    </MotionConfig>
  );
}

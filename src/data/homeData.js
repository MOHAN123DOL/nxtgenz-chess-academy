export const homeData = {
  seo: {
    title: "NXT GENZ Chess Academy | Chess Coaching for Every Level",
    description: "Expert chess coaching, tournament preparation and online and offline classes at NXT GENZ Chess Academy.",
    ogImage: "/images/hero-chess.jpg"
  },
  hero: {
    backgroundImage: "/images/hero-chess.jpg",
    headline: "Think Ahead. Play Smart. Become a Champion.",
    trustedLine: "Trusted by students. Your next step is",
    morphWords: ["STRATEGY", "FOCUS", "CHAMPION"],
    description:
      "Building the next generation of chess champions through expert coaching, strategic thinking, and competitive excellence.",
    primaryButton: { label: "Explore Courses", to: "/courses" },
    secondaryButton: { label: "Join Our Academy", to: "/contact" }
  },
  // Sample values, not verified academy achievements.
  stats: [
    { value: 500, suffix: "+", label: "Students Trained" },
    { value: 15, suffix: "+", label: "Expert Coaches" },
    { value: 50, suffix: "+", label: "Tournament Wins" },
    { value: 10, suffix: "+", label: "Years of Excellence" }
  ],
  aboutPreview: {
    show: true,
    title: "A chess academy built around how champions think",
    text: "We teach chess as a way of thinking: calculating ahead, staying calm under pressure and learning from every game. Classes are small, structured and led by experienced coaches.",
    image: "/images/about-chess.jpg",
    imageAlt: "Students practising chess at the academy",
    link: { label: "About the academy", to: "/about" }
  },
  why: {
    title: "Why choose us",
    items: [
      { icon: "Crown", title: "Professional Coaching", text: "Structured lessons from experienced tournament players." },
      { icon: "Layers", title: "Beginner to Advanced Training", text: "A clear path from first moves to competitive play." },
      { icon: "Monitor", title: "Online & Offline Classes", text: "Learn at the academy or from home, same curriculum." },
      { icon: "Trophy", title: "Tournament Preparation", text: "Openings, endgames and match-day practice." }
    ]
  },
  coursesPreview: { title: "Find your level", subtitle: "Three programs, one path from beginner to advanced.", buttonLabel: "View all courses" },
  testimonials: {
    title: "What students and parents say",
    note: "Sample feedback for layout purposes.",
    items: [
      { name: "Parent of a Beginner student", text: "My daughter now looks forward to every class. She is more patient and focused at home too." },
      { name: "Intermediate student", text: "The weekly game reviews showed me exactly where I was losing points." },
      { name: "Advanced student", text: "Tournament prep sessions gave me real confidence before my first rated event." }
    ]
  },
  cta: {
    title: "Your Journey to Chess Mastery Starts Here",
    button: { label: "Join Now", to: "/contact" }
  }
};

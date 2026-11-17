export const coursesData = {
  seo: {
    title: "Courses | NXT GENZ Chess Academy",
    description: "Beginner, intermediate and advanced chess courses, online and offline.",
    ogImage: "/images/courses-chess.jpg"
  },
  hero: { backgroundImage: "/images/courses-chess.jpg", title: "Chess Training Programs", subtitle: "Pick the level that matches your game." },
  currency: "₹",
  priceSuffix: "/month",
  pricing: {
    title: "Choose your program",
    subtitle: "Pick the level that matches your game. Every program includes a trial class.",
    ctaPrefix: "Enroll in",
    durationLabel: "Duration",
    featuresLabel: "What you learn:",
    // Turn on a Monthly / Yearly switch. yearlyDiscountPercent takes that percentage off the monthly price.
    billing: { enabled: false, yearlyDiscountPercent: 0, monthlyLabel: "Monthly", yearlyLabel: "Yearly" }
  },
  picker: { title: "Which level fits you?", subtitle: "Spin the wheel to preview each program.", nextLabel: "Next level" },
  courses: [
    {
      id: "beginner",
      name: "Beginner Chess",
      wheelLabel: "Beginner",
      level: "Beginner",
      duration: "3 Months",
      price: 1499,
      summary: "Learn how the pieces move, basic tactics and simple checkmates.",
      features: ["Piece movement and rules", "Basic checkmates", "Simple tactics", "Weekly practice games"]
    },
    {
      id: "intermediate",
      featured: true,
      badge: "Most popular",
      name: "Intermediate Chess",
      wheelLabel: "Intermediate",
      level: "Intermediate",
      duration: "6 Months",
      price: 2499,
      summary: "Strengthen openings, middlegame plans and calculation.",
      features: ["Opening repertoire", "Middlegame planning", "Tactical patterns", "Game analysis"]
    },
    {
      id: "advanced",
      name: "Advanced Chess",
      wheelLabel: "Advanced",
      level: "Advanced",
      duration: "12 Months",
      price: 3999,
      summary: "Deep preparation for rated tournaments and strong opponents.",
      features: ["Advanced endgames", "Opening preparation", "Tournament strategy", "Personal game review"]
    }
  ],
  online: {
    title: "Online chess coaching",
    text: "Join live classes from anywhere. Same curriculum and coaches, with recorded game reviews.",
    points: ["Live video classes", "Shared digital board", "Weekly game reviews"]
  },
  benefits: {
    title: "Course benefits",
    items: ["Small batches", "Structured curriculum", "Progress tracking", "Tournament guidance", "Online and offline options", "Trial class available"]
  },
  // Sample value; update when batches change.
  seats: { total: 20, left: 6, label: "Grab your seat: few left" },
  enrollCta: { title: "Ready to enroll?", button: { label: "Enroll now", to: "/contact" } }
};

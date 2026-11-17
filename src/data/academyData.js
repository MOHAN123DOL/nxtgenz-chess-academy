// Single source of truth for academy details. NOTE: phone, email and address are PLACEHOLDERS.
export const academyData = {
  name: "NXT GENZ Chess Academy",
  shortName: "NXT GENZ",
  tagline: "Think Ahead. Play Smart. Become a Champion.",
  description:
    "Building the next generation of chess champions through expert coaching, strategic thinking, and competitive excellence.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "contact@nxtgenzchess.example",
  address: {
    street: "Chess Academy Road",
    area: "Fairlands",
    city: "Salem",
    state: "Tamil Nadu",
    pincode: "636016",
    country: "India"
  },
  workingHours: {
    weekdays: "9:00 AM - 8:00 PM",
    sunday: "9:00 AM - 1:00 PM"
  },
  socialLinks: {
    instagram: "",
    facebook: "",
    youtube: "",
    linkedin: ""
  },
  nav: [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Courses", path: "/courses" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" }
  ],
  joinLabel: "Join Now",
  footer: {
    blurb: "Expert chess coaching for every level, online and offline.",
    socialCardLabel: "Socials",
    brandBottomText: "chess academy",
    // Credit line above the particle wordmark in the footer.
    credit: { label: "This website was built by", name: "NXT GENZ" }
  }
};

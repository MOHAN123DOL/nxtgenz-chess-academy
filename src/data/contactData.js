export const contactData = {
  seo: {
    title: "Contact & Enrollment | NXT GENZ Chess Academy",
    description: "Contact NXT GENZ Chess Academy or enroll in a course via WhatsApp.",
    ogImage: "/images/contact-chess.jpg"
  },
  hero: { backgroundImage: "/images/contact-chess.jpg", title: "Contact & Enrollment", subtitle: "Ask a question or reserve your seat." },
  info: { title: "Get in touch", locationTitle: "Academy location", hoursTitle: "Working hours" },
  contactForm: {
    title: "Send us a message",
    submitLabel: "Send on WhatsApp",
    note: "This opens WhatsApp with your message. Nothing is stored on this website.",
    fields: { name: "Full Name", email: "Email", phone: "Phone Number", subject: "Subject", message: "Message" }
  },
  enrollForm: {
    title: "Course enrollment",
    submitLabel: "Enroll on WhatsApp",
    note: "This opens WhatsApp with your details. Nothing is stored on this website.",
    classModes: ["Online", "Offline (at academy)", "Either"],
    fields: {
      studentName: "Student Name", age: "Age", parentName: "Parent Name", phone: "Phone Number",
      email: "Email", course: "Course Selection", mode: "Preferred Class Mode", message: "Message"
    }
  },
  levelPickerLabel: "Pick a level (tap the wheel)",
  feedback: { title: "Feedback", placeholder: "What's your feedback?", sendLabel: "Send feedback on WhatsApp" },
  whatsappButtonLabel: "Chat on WhatsApp",
  mapZoom: 15
};

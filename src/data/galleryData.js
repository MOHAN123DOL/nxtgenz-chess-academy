// Replace the sample image paths with your real photos in public/images/gallery.
export const galleryData = {
  seo: {
    title: "Gallery & Achievements | NXT GENZ Chess Academy",
    description: "Photos from classes and tournaments, plus student achievements and medals.",
    ogImage: "/images/gallery-chess.jpg"
  },
  hero: { backgroundImage: "/images/gallery-chess.jpg", title: "Gallery & Achievements", subtitle: "Classes, tournaments and proud moments." },
  categories: ["All", "Training", "Tournaments", "Happy Moments"],
  items: [
    { id: 1, src: "/images/gallery/training-1.jpg", title: "Morning training session", category: "Training" },
    { id: 2, src: "/images/gallery/training-2.jpg", title: "Coach reviewing a game", category: "Training" },
    { id: 3, src: "/images/gallery/tournament-1.jpg", title: "Inter-academy tournament", category: "Tournaments" },
    { id: 4, src: "/images/gallery/tournament-2.jpg", title: "Final round", category: "Tournaments" },
    { id: 5, src: "/images/gallery/happy-1.jpg", title: "Winners celebrate", category: "Happy Moments" },
    { id: 6, src: "/images/gallery/happy-2.jpg", title: "First trophy", category: "Happy Moments" }
  ],
  // Medal photos only; happy moments stay in the grid above.
  medals: [
    { src: "/images/gallery/medal-1.jpg", title: "Gold medal" },
    { src: "/images/gallery/medal-2.jpg", title: "Silver medal" },
    { src: "/images/gallery/medal-3.jpg", title: "Bronze medal" },
    { src: "/images/gallery/medal-4.jpg", title: "Best Junior trophy" }
  ],
  medalsTitle: "Medals won",
  // Sample entries. Replace with real students, places and prizes.
  achievements: [
    { id: "a1", title: "Student Name 1", place: "District Championship", prize: "Gold medal", image: "/images/gallery/achievement-1.jpg" },
    { id: "a2", title: "Student Name 2", place: "State Under-15 Open", prize: "Silver medal", image: "/images/gallery/achievement-2.jpg" },
    { id: "a3", title: "Student Name 3", place: "Inter-school Rapid", prize: "Best Junior trophy", image: "/images/gallery/achievement-3.jpg" }
  ],
  achievementsTitle: "Student achievements",
  highlightsTitle: "Championship highlights"
};

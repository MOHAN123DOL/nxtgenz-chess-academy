export const aboutData = {
  seo: {
    title: "About | NXT GENZ Chess Academy",
    description: "Meet the coaches and the story behind NXT GENZ Chess Academy.",
    ogImage: "/images/about-chess.jpg"
  },
  hero: { backgroundImage: "/images/about-chess.jpg", title: "About Us", subtitle: "A modern academy for the next generation of chess players." },
  story: {
    title: "Our story",
    text: [
      "NXT GENZ Chess Academy began with a simple idea: every student can learn to think clearly, and chess is one of the best ways to practise it.",
      "Today we coach students of all ages, in person and online, from their first game to their first tournament."
    ],
    image: "/images/about-chess.jpg"
  },
  mission: { title: "Our mission", text: "To make high-quality chess coaching accessible and to build focus, patience and strategic thinking in every student." },
  vision: { title: "Our vision", text: "To be the academy where the next generation of champions starts, on the board and beyond it." },
  whyChess: {
    title: "Why chess matters",
    items: [
      "Builds concentration and patience",
      "Improves planning and problem solving",
      "Teaches students to learn from mistakes",
      "Prepares students for competition"
    ]
  },
  // Replace with the real owner details and photo.
  owner: {
    title: "Meet the owner",
    name: "Owner Name",
    role: "Founder & Head Coach",
    bio: "Add the owner's background, playing experience and coaching philosophy here.",
    image: "/images/owner.jpg"
  },
  coaches: {
    title: "Meet our coaches",
    description: "Sample coach profiles. Replace with your real team.",
    members: [
      { id: "coach-1", name: "Coach One", role: "Opening Specialist", expertise: "Builds a reliable opening repertoire from day one.", image: "" },
      { id: "coach-2", name: "Coach Two", role: "Endgame Coach", expertise: "Turns small advantages into wins.", image: "" },
      { id: "coach-3", name: "Coach Three", role: "Junior Coach", expertise: "Makes first lessons fun and clear.", image: "" },
      { id: "coach-4", name: "Coach Four", role: "Tournament Coach", expertise: "Prepares students for match-day pressure.", image: "" }
    ]
  },
  achievementsTitle: "Academy achievements",
  // Learning path shown as an interactive book. Each sheet has a front and a back side.
  // Edit, add or remove sheets freely; page numbers are generated from the sheet's pageNumber.
  learningPath: {
    title: "Your learning path",
    text: "Open the book and turn the pages to learn how every piece moves, from the board to checkmate.",
    bookTitle: "Chess Basics",
    bookAuthor: "NXT GENZ Chess Academy",
    coverImage: "",
    coverGlyph: "♞",
    openLabel: "Click to open",
    endLabel: "End of chapter one",
    restartLabel: "Read again",
    pages: [
      { pageNumber: 1,
        front: { glyph: "♔", title: "The board", text: "Chess is played on an 8 by 8 board of 64 squares. Set it up so each player has a light square in the bottom right corner.", points: ["White always moves first", "Pieces take turns, one move each", "Columns are files, rows are ranks"] },
        back: { glyph: "♟", title: "The pieces", text: "Each player starts with 16 pieces.", points: ["1 king and 1 queen", "2 rooks, 2 bishops, 2 knights", "8 pawns"] } },
      { pageNumber: 2,
        front: { glyph: "♖", title: "The rook", text: "The rook moves in straight lines, any number of squares, forwards, backwards or sideways.", points: ["It cannot jump over pieces", "It captures by landing on an enemy piece"] },
        back: { glyph: "♗", title: "The bishop", text: "The bishop moves diagonally, any number of squares.", points: ["It stays on one colour for the whole game", "Each side has a light-squared and a dark-squared bishop"] } },
      { pageNumber: 3,
        front: { glyph: "♕", title: "The queen", text: "The queen is the strongest piece. She moves like a rook and a bishop combined: in any straight line or diagonal." },
        back: { glyph: "♔", title: "The king", text: "The king moves one square in any direction. He is the most important piece, but he can never move into danger." } },
      { pageNumber: 4,
        front: { glyph: "♘", title: "The knight", text: "The knight moves in an L shape: two squares in one direction, then one square sideways.", points: ["It is the only piece that can jump over others"] },
        back: { glyph: "♙", title: "The pawn", text: "Pawns move forward one square, or two squares on their first move.", points: ["They capture one square diagonally", "A pawn that reaches the far side becomes a queen, rook, bishop or knight"] } },
      { pageNumber: 5,
        front: { glyph: "+", title: "Check", text: "A king under attack is in check. You must get out of check on your move.", points: ["Move the king away", "Block the attack", "Capture the attacking piece"] },
        back: { glyph: "#", title: "Checkmate", text: "If a king is in check and no move can stop it, that is checkmate. The game ends and the player who delivered it wins." } },
      { pageNumber: 6,
        front: { glyph: "♜", title: "Castling", text: "Castling moves the king two squares towards a rook, and the rook jumps to the other side of the king.", points: ["Neither piece may have moved before", "No pieces between them", "The king cannot be in check, or pass through check"] },
        back: { glyph: "=", title: "A draw", text: "Not every game has a winner. Stalemate is a draw: the player to move is not in check but has no legal move. Next, practise these moves in class." } }
    ]
  },
  community: { title: "Join our community", text: "Come to a trial class and meet the coaches.", button: { label: "Book a trial", to: "/contact" } }
};

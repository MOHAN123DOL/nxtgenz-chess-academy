# NXT GENZ Chess Academy

    npm install
    npm run dev

Edit all content in `src/data/*.js`. Put images in `public/images/` (paths are listed in the data files).
Phone, email and address in `academyData.js` are placeholders.

## Theme and navigation
- Only two UI colours are used: `--primary` #27187E and `--secondary` #F7F7FF (defined in `src/index.css`).
- Navigation is the GlassDock (`src/components/GlassDock.jsx`), mounted once in `App.jsx` through `SiteNav`. Links come from `academyData.nav`.
- Learning-path book content: `aboutData.learningPath`. Pricing cards are built from `coursesData.courses` and `coursesData.pricing`.
- Footer credit and particle wordmark text: `academyData.footer.credit`.

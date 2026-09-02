import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const linfopressCurtainLayeringCss = `
/* ==========================================================================
   LINFOPRESS STICKY CURTAIN SCREEN LAYERING (1-TO-1 MATCH WITH ZIONIC)
   ========================================================================== */
.linfopress-main-page-wrapper {
  overflow-x: clip !important;
  overflow-y: visible !important;
  position: relative !important;
  width: 100% !important;
}

@media (min-width: 992px) {
  /* 1. Hero Screen Pins Sticky in Background */
  .linfopress-hero-stage {
    position: -webkit-sticky !important;
    position: sticky !important;
    top: 0px !important;
    z-index: 1 !important;
    width: 100% !important;
    height: 100vh !important;
    min-height: 700px !important;
    overflow: hidden !important;
    will-change: transform;
  }

  /* 2. Ticker Slides UP and Layers Over Hero with Deep Shadow */
  .linfopress-infinite-ticker-section {
    position: relative !important;
    z-index: 10 !important;
    box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
  }

  /* 3. Subsequent Sections Layer Smoothly */
  .linfopress-tech-bento-section {
    position: relative !important;
    z-index: 11 !important;
    box-shadow: 0 -25px 70px rgba(0, 0, 0, 0.35) !important;
  }

  .linfopress-procedure-section {
    position: relative !important;
    z-index: 12 !important;
  }

  .linfopress-advantages-grid-section {
    position: relative !important;
    z-index: 13 !important;
  }

  .linfopress-matrix-section {
    position: relative !important;
    z-index: 14 !important;
  }

  .linfopress-doctor-section {
    position: relative !important;
    z-index: 15 !important;
  }

  .linfopress-why-and-package-section {
    position: relative !important;
    z-index: 16 !important;
  }

  .linfopress-faq-section {
    position: relative !important;
    z-index: 17 !important;
  }

  .linfopress-partner-stage-section {
    position: relative !important;
    z-index: 18 !important;
  }

  .linfopress-seo-clean-section {
    position: relative !important;
    z-index: 19 !important;
  }
}
`;

css += '\n' + linfopressCurtainLayeringCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully added Linfopress sticky curtain layering styles!');

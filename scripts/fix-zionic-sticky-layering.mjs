import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const stickyFixCss = `
/* ==========================================================================
   ZIONIC PAGE: BULLETPROOF STICKY CURTAIN SCREEN LAYERING (DESKTOP)
   ========================================================================== */
html, body {
  overflow-x: clip !important;
}

.zionic-main-page-wrapper {
  overflow-x: clip !important;
  overflow-y: visible !important;
  position: relative !important;
  width: 100% !important;
}

@media (min-width: 992px) {
  /* 1. Hero Screen Pins Sticky Underneath */
  .zionic-official-hero {
    position: -webkit-sticky !important;
    position: sticky !important;
    top: 72px !important;
    z-index: 1 !important;
    width: 100% !important;
    height: calc(100vh - 72px) !important;
    min-height: calc(100vh - 72px) !important;
    overflow: hidden !important;
    will-change: transform;
  }

  /* 2. Ticker & Technologies Slide UP and Layer directly on top of Hero */
  .zionic-infinite-ticker-section {
    position: relative !important;
    z-index: 10 !important;
    box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
  }

  .zionic-tech-bento-section {
    position: relative !important;
    z-index: 11 !important;
    box-shadow: 0 -25px 70px rgba(0, 0, 0, 0.35) !important;
  }

  .zionic-manipula-section {
    position: relative !important;
    z-index: 12 !important;
    box-shadow: 0 -25px 70px rgba(0, 0, 0, 0.15) !important;
  }

  .zionic-ba-section {
    position: relative !important;
    z-index: 13 !important;
  }

  .zionic-reasons-section {
    position: relative !important;
    z-index: 14 !important;
    box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
  }

  .zionic-matrix-section {
    position: relative !important;
    z-index: 15 !important;
  }

  .zionic-video-banner-section {
    position: relative !important;
    z-index: 16 !important;
    box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
  }

  .zionic-booking-section {
    position: relative !important;
    z-index: 17 !important;
    box-shadow: 0 -25px 70px rgba(0, 0, 0, 0.25) !important;
  }
}
`;

// Append at the very end of custom.css
css += '\n' + stickyFixCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully applied bulletproof sticky curtain layering CSS!');

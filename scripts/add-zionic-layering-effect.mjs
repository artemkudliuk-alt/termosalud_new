import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const layeringCss = `
/* ==========================================================================
   ZIONIC PAGE: STICKY CURTAIN SCREEN LAYERING (MAIN PAGE SLIDE OVERLAP)
   ========================================================================== */
@media (min-width: 992px) {
  /* 1. Hero Screen Pins as Sticky Underneath */
  .zionic-official-hero {
    position: sticky !important;
    top: 72px !important;
    z-index: 1 !important;
    height: calc(100vh - 72px) !important;
    min-height: calc(100vh - 72px) !important;
  }

  /* 2. Ticker & Technologies Slide UP and Layer Over Hero with Deep Shadow */
  .zionic-infinite-ticker-section {
    position: relative !important;
    z-index: 10 !important;
    box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.7) !important;
  }

  .zionic-tech-bento-section {
    position: relative !important;
    z-index: 11 !important;
  }

  /* 3. Manipula Section Layers Smoothly */
  .zionic-manipula-section {
    position: relative !important;
    z-index: 12 !important;
    box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.12) !important;
  }

  /* 4. Clinical Results Layers */
  .zionic-ba-section {
    position: relative !important;
    z-index: 13 !important;
  }

  /* 5. 5 Reasons Dark Bento Layers */
  .zionic-reasons-section {
    position: relative !important;
    z-index: 14 !important;
    box-shadow: 0 -25px 70px rgba(0, 0, 0, 0.6) !important;
  }

  /* 6. Matrix & Booking Section Layers */
  .zionic-matrix-section {
    position: relative !important;
    z-index: 15 !important;
  }

  .zionic-video-banner-section {
    position: relative !important;
    z-index: 16 !important;
    box-shadow: 0 -25px 70px rgba(0, 0, 0, 0.7) !important;
  }

  .zionic-booking-section {
    position: relative !important;
    z-index: 17 !important;
    box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.2) !important;
  }
}
`;

// Append or update in custom.css
const marker = '/* ==========================================================================\n   ZIONIC PAGE: STICKY CURTAIN SCREEN LAYERING';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + layeringCss;
} else {
  css += '\n' + layeringCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully added sticky curtain screen layering to Zionic page!');

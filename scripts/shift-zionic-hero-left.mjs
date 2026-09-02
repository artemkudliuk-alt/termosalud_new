import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const heroShiftLeftCss = `
/* ==========================================================================
   ZIONIC HERO: SHIFT CONTENT 100PX TO THE LEFT
   ========================================================================== */
.zionic-hero-container {
  position: relative !important;
  z-index: 3 !important;
  width: 100% !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
  padding-left: 30px !important;
  padding-right: 30px !important;
}

.zionic-hero-content {
  max-width: 820px !important;
  margin-left: 0 !important; /* Shifted left by 100px */
  padding-left: 0 !important;
}

@media (max-width: 767px) {
  .zionic-hero-container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  .zionic-hero-content {
    margin-left: 0 !important;
  }
}
`;

css += '\n' + heroShiftLeftCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully shifted Zionic hero content 100px to the left!');

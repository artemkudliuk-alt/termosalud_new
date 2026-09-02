import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const heroShiftLeftExactCss = `
/* ==========================================================================
   ZIONIC HERO: OPTIMAL LEFT SHIFT WITHOUT TEXT CLIPPING
   ========================================================================== */
.zionic-hero-container {
  position: relative !important;
  z-index: 3 !important;
  width: 100% !important;
  max-width: 1560px !important;
  margin: 0 auto !important;
  padding-left: 36px !important;
  padding-right: 24px !important;
}

.zionic-hero-content {
  max-width: 820px !important;
  margin-left: 0 !important;
  transform: none !important;
  padding-left: 0 !important;
}

@media (max-width: 991px) {
  .zionic-hero-container {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
`;

css += '\n' + heroShiftLeftExactCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully adjusted Zionic hero left alignment cleanly!');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fullCurtainSlideCss = `
/* ==========================================================================
   RESTORE 1-TO-1 FULL CURTAIN SCREEN LAYERING WITH ZIONIC
   ========================================================================== */
@media (min-width: 992px) {
  html body.template-linfopress .linfopress-hero-stage,
  .linfopress-hero-stage {
    position: -webkit-sticky !important;
    position: sticky !important;
    top: 0px !important;
    left: 0 !important;
    z-index: 1 !important;
    width: 100% !important;
    height: 100vh !important;
    min-height: 700px !important;
    overflow: hidden !important;
  }

  /* Screen 2 and subsequent sections layer continuously like a curtain */
  html body.template-linfopress .linfopress-infinite-ticker-section,
  .linfopress-infinite-ticker-section {
    position: relative !important;
    z-index: 10 !important;
    box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
  }
}
`;

css += '\n' + fullCurtainSlideCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully saved full curtain slide rules in custom.css!');

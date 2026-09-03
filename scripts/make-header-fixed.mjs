import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fixedHeaderCss = `
/* ==========================================================================
   PERMANENT FIXED HEADER ON LIGHT PLAQUE (MOBILE & DESKTOP)
   ========================================================================== */

header,
header.header,
.header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  max-width: 100vw !important;
  z-index: 99999 !important;
  background: rgba(255, 255, 255, 0.96) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border: none !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08) !important;
  border-radius: 0px !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04) !important;
  box-sizing: border-box !important;
}

@media (min-width: 992px) {
  header,
  header.header,
  .header {
    height: 84px !important;
    padding: 0 clamp(24px, 4vw, 56px) !important;
  }

  /* Body / Hero top clearance for fixed 84px header */
  body:not(.template-zionic):not(.template-linfopress) {
    padding-top: 84px !important;
  }

  .zionic-official-hero,
  .linfopress-hero-stage {
    padding-top: 84px !important;
  }
}

@media (max-width: 991px) {
  header,
  header.header,
  .header {
    height: 58px !important;
    padding: 0 16px !important;
  }

  /* Body / Hero top clearance for fixed 58px header */
  body:not(.template-zionic):not(.template-linfopress) {
    padding-top: 58px !important;
  }

  .zionic-official-hero,
  .linfopress-hero-stage {
    padding-top: 68px !important;
  }
}
`;

css += '\n' + fixedHeaderCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully appended fixed header rules to custom.css');

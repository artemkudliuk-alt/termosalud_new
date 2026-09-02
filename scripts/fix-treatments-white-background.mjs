import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const treatmentsWhiteCss = `
/* ==========================================================================
   ZIONIC 5 REASONS / TREATMENTS FULLSCREEN INFOGRAPHIC SECTION (PURE WHITE)
   ========================================================================== */
.zionic-treatments-fullscreen-section {
  position: relative !important;
  z-index: 15 !important;
  background: #ffffff !important;
  background-color: #ffffff !important;
  padding: 100px 0 60px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.treatments-infographic-viewport {
  position: relative !important;
  width: 100% !important;
  max-width: 1440px !important;
  margin: 40px auto 0 auto !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 20px !important;
  background: #ffffff !important;
  background-color: #ffffff !important;
}

.treatments-infographic-viewport img {
  width: 100% !important;
  max-width: 960px !important;
  height: auto !important;
  max-height: 85vh !important;
  object-fit: contain !important;
  display: block !important;
  margin: 0 auto !important;
  background: #ffffff !important;
  background-color: #ffffff !important;
  mix-blend-mode: normal !important;
}

@media (max-width: 767px) {
  .zionic-treatments-fullscreen-section {
    padding: 70px 0 40px 0 !important;
  }
  .treatments-infographic-viewport img {
    max-width: 100% !important;
  }
}
`;

const markerT = '/* ==========================================================================\n   ZIONIC 5 REASONS / TREATMENTS FULLSCREEN INFOGRAPHIC SECTION';
if (css.includes(markerT)) {
  const nextMarker = '/* ==========================================================================\n   ZIONIC CREATIVE INDICATIONS';
  const before = css.substring(0, css.indexOf(markerT));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + treatmentsWhiteCss + '\n\n' + after;
} else {
  css += '\n' + treatmentsWhiteCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully set 5 Reasons / Treatments Infographic section to pure white background!');

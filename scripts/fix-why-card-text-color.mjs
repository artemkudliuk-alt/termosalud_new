import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const whyCardDarkTextCss = `
/* ==========================================================================
   FIX WHY SECTION WHITE CARDS TEXT CONTRAST (DARK GRAPHITE TEXT)
   ========================================================================== */
html body .linfopress-why-section .why-card-item .why-card-text,
html body .linfopress-why-section .why-card-text,
html body .why-card-item p,
html body .why-card-text,
.why-card-item .why-card-text,
.why-card-item p {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 600 !important;
  line-height: 1.5 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

html body .linfopress-why-section .why-card-item .why-card-num,
html body .why-card-item .why-card-num,
.why-card-item .why-card-num {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 32px !important;
  font-weight: 900 !important;
  line-height: 1 !important;
  margin-bottom: 12px !important;
  opacity: 1 !important;
  visibility: visible !important;
}
`;

css += '\n' + whyCardDarkTextCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully fixed why card text color to dark graphite');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const squareIndicationsCss = `
/* ==========================================================================
   SQUARE CARDS & WIDER FRAMES FOR INDICATIONS / CONTRAINDICATIONS
   ========================================================================== */
html body.template-zionic .zionic-matrix-section .container-fluid,
html body.template-zionic .zionic-matrix-section .container {
  max-width: 1440px !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
}

html body.template-zionic .zionic-creative-matrix-grid.exact-original-matrix,
.zionic-creative-matrix-grid.exact-original-matrix,
.zionic-creative-matrix-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 48px !important;
  max-width: 1400px !important;
  margin: 0 auto !important;
  width: 100% !important;
}

html body.template-zionic .matrix-creative-card,
html body.template-zionic .matrix-creative-card.exact-indications,
html body.template-zionic .matrix-creative-card.exact-contraindications,
html body .matrix-creative-card.exact-indications,
html body .matrix-creative-card.exact-contraindications,
.matrix-creative-card,
.exact-indications,
.exact-contraindications {
  border-radius: 0px !important; /* Square corners */
}

html body.template-zionic .matrix-creative-card.exact-indications,
html body .matrix-creative-card.exact-indications,
.exact-indications {
  background: #111111 url('/wp-content/uploads/2026/03/bg-black-silk.jpg') center/cover no-repeat !important;
  border: 1px solid #27272a !important;
  border-radius: 0px !important;
  padding: 56px 48px !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25) !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

html body.template-zionic .matrix-creative-card.exact-contraindications,
html body .matrix-creative-card.exact-contraindications,
.exact-contraindications {
  background: transparent !important;
  border: none !important;
  border-radius: 0px !important;
  box-shadow: none !important;
  padding: 56px 36px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

@media (max-width: 991px) {
  html body.template-zionic .zionic-creative-matrix-grid.exact-original-matrix,
  .zionic-creative-matrix-grid.exact-original-matrix {
    grid-template-columns: 1fr !important;
    gap: 36px !important;
  }
}
`;

css += '\n' + squareIndicationsCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended square indications styles with wider frames to custom.css');

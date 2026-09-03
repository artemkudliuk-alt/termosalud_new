import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const matrixCss = `
/* Exact High Specificity Indications & Contraindications */
html body.template-zionic .matrix-creative-card.exact-indications,
html body .matrix-creative-card.exact-indications,
.exact-indications {
  background: #111111 url('/wp-content/uploads/2026/03/bg-black-silk.jpg') center/cover no-repeat !important;
  border: 1px solid #27272a !important;
  border-radius: 16px !important;
  padding: 44px 40px !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25) !important;
}

html body.template-zionic .matrix-creative-card.exact-contraindications,
html body .matrix-creative-card.exact-contraindications,
.exact-contraindications {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 44px 20px !important;
}

html body.template-zionic .exact-indications .matrix-main-head,
.exact-indications .matrix-main-head,
.exact-indications h3 {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 800 !important;
  text-transform: none !important;
  margin: 0 0 24px 0 !important;
}

html body.template-zionic .exact-contraindications .matrix-main-head,
.exact-contraindications .matrix-main-head,
.exact-contraindications h3 {
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 800 !important;
  text-transform: none !important;
  margin: 0 0 24px 0 !important;
}

.exact-indications .exact-list-item .item-text {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 500 !important;
}

.exact-contraindications .exact-list-item .item-text {
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 500 !important;
}
`;

css += '\n' + matrixCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully appended high-specificity CSS styles');

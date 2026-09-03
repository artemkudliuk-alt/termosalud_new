import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const partnerFormRefinements = `
/* Partner Stage Form & Guarantees Refinements */
html body.template-zionic .zionic-partner-stage-section .section-main-title,
.zionic-partner-stage-section .section-main-title {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(30px, 3.2vw, 44px) !important;
  font-weight: 800 !important;
  color: #111111 !important;
  margin-bottom: 16px !important;
}

html body.template-zionic .guarantees-head-title,
.guarantees-head-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  line-height: 1.35 !important;
  margin: 18px 0 14px 0 !important;
  padding-left: 0 !important;
  text-transform: none !important;
}

html body.template-zionic .form-card-title,
.form-card-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  line-height: 1.3 !important;
  text-transform: none !important;
  margin-bottom: 8px !important;
}
`;

css += '\n' + partnerFormRefinements;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended partner form refinements to custom.css');

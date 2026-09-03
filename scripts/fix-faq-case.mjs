import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fixCaseCss = `
/* FAQ Title and Questions Sentence Case matching screenshots */
html body.template-zionic .exact-faq-question,
.exact-faq-question,
.exact-faq-btn,
.exact-faq-item span {
  text-transform: none !important;
}

html body.template-zionic .exact-zionic-faq .section-main-title,
.exact-zionic-faq .section-main-title {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 800 !important;
  font-size: clamp(30px, 3.2vw, 44px) !important;
  color: #18181b !important;
}
`;

css += '\n' + fixCaseCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended FAQ case fix to custom.css');

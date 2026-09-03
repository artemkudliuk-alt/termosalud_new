import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fixFaqIndexColor = `
/* Fix FAQ Index and Icon Colors */
html body.template-zionic .faq-accordion-card .faq-q-index,
html body.template-zionic .faq-accordion-card.active .faq-q-index,
.faq-accordion-card .faq-q-index,
.faq-accordion-card.active .faq-q-index {
  background: transparent !important;
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 800 !important;
  width: auto !important;
  height: auto !important;
  display: inline-block !important;
}

html body.template-zionic .faq-accordion-card:not(.active) .faq-q-index,
.faq-accordion-card:not(.active) .faq-q-index {
  color: #71717a !important;
}

html body.template-zionic .faq-accordion-card.active .faq-icon,
html body.template-zionic .faq-accordion-card .faq-icon,
.faq-accordion-card.active .faq-icon,
.faq-accordion-card .faq-icon {
  background: transparent !important;
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  width: 28px !important;
  height: 28px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
`;

css += '\n' + fixFaqIndexColor;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Fixed FAQ index and icon styling in custom.css');

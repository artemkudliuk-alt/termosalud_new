import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fixTitleRule = `
html body.template-linfopress section#why h2,
html body.template-linfopress section#why h2.why-main-title,
html body.template-linfopress section#why .why-main-title,
html body.template-linfopress section:not(#hero)#why h2,
html body.template-linfopress section.linfopress-why-section h2 {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(34px, 3.8vw, 48px) !important;
  font-weight: 700 !important;
  line-height: 1.25 !important;
  color: #111827 !important;
  text-align: center !important;
  margin: 0 auto 52px auto !important;
}
`;

css += '\n' + fixTitleRule;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully appended high-specificity rule for #why title!');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const partnerPadding = `
html body.template-zionic .zionic-partner-stage-section,
.zionic-partner-stage-section {
  padding: 110px 0 120px 0 !important;
  background: #ffffff !important;
  position: relative !important;
  z-index: 10 !important;
}
`;

css += '\n' + partnerPadding;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended partner padding to custom.css');

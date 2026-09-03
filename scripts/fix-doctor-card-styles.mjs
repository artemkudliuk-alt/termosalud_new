import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fixDocCard = `
/* Fix Doctor Card Dark Background & Text Colors */
html body.template-zionic .exact-doctor-card .exact-doctor-info,
.exact-doctor-card .exact-doctor-info,
.exact-doctor-info {
  background: transparent !important;
  padding: 16px 4px 8px 4px !important;
}

html body.template-zionic .exact-doctor-card .exact-doc-name,
.exact-doctor-card .exact-doc-name,
.exact-doc-name {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  margin: 0 0 8px 0 !important;
  text-transform: none !important;
}

html body.template-zionic .exact-doctor-card .exact-doc-desc,
.exact-doctor-card .exact-doc-desc,
.exact-doc-desc {
  color: #cbd5e1 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  line-height: 1.45 !important;
  font-weight: 500 !important;
  margin: 0 !important;
}
`;

css += '\n' + fixDocCard;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Fixed doctor card styles');

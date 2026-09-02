import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const aosOverride = `
/* Ensure all AOS animated elements are always visible and beautiful */
.zionic-main-page-wrapper [data-aos] {
  opacity: 1 !important;
  transform: none !important;
  visibility: visible !important;
  transition: opacity 0.4s ease, transform 0.4s ease !important;
}
`;

css += '\n' + aosOverride;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

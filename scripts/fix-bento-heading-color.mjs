import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const bentoFix = `
/* All Bento Tech Cards (Zionic & Linfopress) heading and text color */
.tech-bento-card .tech-card-heading,
.tech-bento-card h3,
.tech-bento-card .bento-head-title,
.linfopress-tech-card .tech-card-heading,
.linfopress-tech-card h3,
html body.template-zionic .tech-card-heading,
html body.template-linfopress .tech-card-heading {
  color: #ffffff !important;
}

.tech-bento-card .tech-card-desc,
.tech-bento-card p,
.linfopress-tech-card p,
html body.template-zionic .tech-bento-card p,
html body.template-linfopress .linfopress-tech-card p {
  color: #cbd5e1 !important;
}
`;

css += '\n' + bentoFix;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully fixed bento heading color to white');

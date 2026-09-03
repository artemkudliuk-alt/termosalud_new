import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const darkCardFix = `
/* Ensure text inside dark bento/tech cards is bright white/light slate */
html body.template-linfopress .linfopress-tech-card .tech-card-heading,
html body.template-linfopress .linfopress-tech-card h3,
.linfopress-tech-card .tech-card-heading,
.linfopress-tech-card h3 {
  color: #ffffff !important;
}

html body.template-linfopress .linfopress-tech-card p,
html body.template-linfopress .linfopress-tech-card li,
.linfopress-tech-card p,
.linfopress-tech-card li {
  color: #e2e8f0 !important;
}

html body.template-zionic .tech-bento-card-dark .bento-head-title,
html body.template-zionic .tech-bento-card-dark h3,
html body.template-zionic .bento-card-dark h3,
html body.template-zionic .bento-dark h3,
.tech-bento-card-dark h3,
.bento-card-dark h3,
.tech-bento-card .bento-bottom-content h3,
.tech-bento-card .bento-bottom-content .bento-head-title {
  color: #ffffff !important;
}

html body.template-zionic .tech-bento-card-dark p,
html body.template-zionic .tech-bento-card-dark li,
html body.template-zionic .bento-card-dark p,
.tech-bento-card .bento-bottom-content p {
  color: #cbd5e1 !important;
}
`;

css += '\n' + darkCardFix;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully fixed dark card heading colors');

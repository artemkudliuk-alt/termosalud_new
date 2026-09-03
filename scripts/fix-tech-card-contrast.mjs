import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const contrastFix = `
/* Absolute highest specificity for tech card dark theme contrast */
html body .tech-card-content h3,
html body .tech-card-content .tech-card-heading,
html body.template-zionic .tech-bento-card h3,
html body.template-zionic .tech-card-heading,
html body.template-linfopress .linfopress-tech-card h3,
html body.template-linfopress .tech-card-heading,
.tech-bento-card h3,
.linfopress-tech-card h3,
.tech-card-heading {
  color: #ffffff !important;
}

html body .tech-card-content p,
html body .tech-card-content .tech-card-text,
html body .tech-card-content li,
html body .tech-card-content li span,
html body.template-zionic .tech-bento-card p,
html body.template-zionic .tech-bento-card li,
html body.template-zionic .tech-bento-card li span,
html body.template-linfopress .linfopress-tech-card p,
html body.template-linfopress .linfopress-tech-card li,
html body.template-linfopress .linfopress-tech-card li span,
.tech-card-text {
  color: #e2e8f0 !important;
}

html body .tech-card-content .bullet-check,
html body .bullet-check {
  color: #ffffff !important;
}
`;

css += '\n' + contrastFix;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully applied absolute high-specificity dark card contrast fix');

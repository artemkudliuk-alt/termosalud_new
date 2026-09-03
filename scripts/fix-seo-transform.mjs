import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fixTransform = `
/* Ensure Sentence Case for SEO Article Title and Button */
html body.template-zionic #seo-article h2,
html body.template-zionic .seo-article-main-title,
#seo-article h2,
.seo-article-main-title {
  text-transform: none !important;
}

html body.template-zionic #seo-article button,
#seoToggleBtn,
.seo-btn-label {
  text-transform: none !important;
}
`;

css += '\n' + fixTransform;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Fixed SEO text-transform');

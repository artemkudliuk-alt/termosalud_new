import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const lockSeoRules = `
/* ==========================================================================
   PERFECT EDITORIAL SEO ARTICLE RULES FOR LINFOPRESS
   ========================================================================== */
html body.template-linfopress section#seo-article h2.seo-article-main-title,
html body.template-linfopress section#seo-article h2,
html body.template-linfopress .seo-clean-section h2,
html body.template-linfopress .seo-article-main-title {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(26px, 3.2vw, 38px) !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  line-height: 1.3 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 24px 0 !important;
  text-align: left !important;
}

html body.template-linfopress .seo-article-card {
  text-align: left !important;
}
`;

css += '\n' + lockSeoRules;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully saved locked SEO rules in custom.css!');

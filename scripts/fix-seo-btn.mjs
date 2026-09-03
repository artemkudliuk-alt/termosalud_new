import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const transparentBtnCss = `
/* Transparent clean link button for SEO toggle matching screenshot */
html body.template-zionic .seo-toggle-btn,
.seo-article-card .seo-toggle-btn,
.seo-toggle-btn {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 6px !important;
  margin: 36px auto 0 auto !important;
  padding: 4px 12px !important;
  cursor: pointer !important;
}

html body.template-zionic .seo-toggle-btn:hover,
.seo-article-card .seo-toggle-btn:hover,
.seo-toggle-btn:hover {
  background: transparent !important;
  color: #000000 !important;
}
`;

css += '\n' + transparentBtnCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended transparent button styles');

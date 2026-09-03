import fs from 'fs';

// 1. Update src/js/main.js to use "Читати далі" / "Приховати"
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');
js = js.replace(
  "if (label) label.textContent = 'Читати повністю';",
  "if (label) label.textContent = 'Читати далі';"
);
fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');
console.log('Updated toggle labels in src/js/main.js');

// 2. Update button label in scripts/process-html.mjs
let processHtml = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
processHtml = processHtml.replace(
  '<span class="seo-btn-label">Читати повністю</span>',
  '<span class="seo-btn-label">Читати далі</span>'
);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processHtml, 'utf8');
console.log('Updated button label in scripts/process-html.mjs');

// 3. Ensure sentence case and exact styling in custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');
const seoCss = `
/* Exact SEO Clean Section Styles */
html body.template-zionic .seo-article-main-title,
.seo-article-main-title {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(26px, 2.6vw, 34px) !important;
  font-weight: 800 !important;
  color: #18181b !important;
  line-height: 1.3 !important;
  margin-bottom: 20px !important;
}

html body.template-zionic .seo-article-sub-title,
.seo-article-sub-title {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(20px, 2vw, 24px) !important;
  font-weight: 800 !important;
  color: #18181b !important;
  line-height: 1.35 !important;
  margin: 32px 0 16px 0 !important;
}

html body.template-zionic .seo-article-card p,
.seo-article-card p {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  color: #54595f !important;
  line-height: 1.65 !important;
  font-weight: 500 !important;
  margin-bottom: 18px !important;
}

html body.template-zionic .seo-article-bullets li,
.seo-article-bullets li {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  color: #54595f !important;
  line-height: 1.6 !important;
  font-weight: 500 !important;
}

html body.template-zionic .seo-article-bullets li strong,
.seo-article-bullets li strong {
  color: #18181b !important;
  font-weight: 700 !important;
}

.seo-toggle-btn {
  background: transparent !important;
  border: none !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  margin: 28px auto 0 auto !important;
  cursor: pointer !important;
  outline: none !important;
}

.seo-toggle-btn:hover {
  color: #000000 !important;
}
`;

css += '\n' + seoCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended SEO styles to custom.css');

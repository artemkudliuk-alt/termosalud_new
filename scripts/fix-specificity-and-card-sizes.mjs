import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Replace all general section:not(...) h2 with explicit exclusion of package and why
css = css.replace(/html body section:not\(#hero-clean-section\):not\(#zionic-official-hero\):not\(#hero\) h2/g, 'html body section:not(#hero-clean-section):not(#zionic-official-hero):not(#hero):not(#package):not(#why) h2');
css = css.replace(/html body\.template-linfopress section:not\(#hero\) h2/g, 'html body.template-linfopress section:not(#hero):not(#package):not(#why) h2');
css = css.replace(/html body\.template-zionic section:not\(#zionic-official-hero\) h2/g, 'html body.template-zionic section:not(#zionic-official-hero):not(#package):not(#why) h2');

const ultimateSpecificDarkCss = `
/* ==========================================================================
   ULTRA-HIGH SPECIFICITY CONTRAST RULES FOR ALL DARK & GRAY SECTIONS
   ========================================================================== */
html body:not(#_x):not(#_y):not(#_z) #package h2,
html body:not(#_x):not(#_y):not(#_z) #package .package-title,
html body:not(#_x):not(#_y):not(#_z) #why h2,
html body:not(#_x):not(#_y):not(#_z) #why .why-main-title,
html body:not(#_x):not(#_y):not(#_z) .linfopress-package-section h2,
html body:not(#_x):not(#_y):not(#_z) .linfopress-package-section .package-title,
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section h2,
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section .why-main-title,
html body:not(#_x):not(#_y):not(#_z) .why-this h2,
html body:not(#_x):not(#_y):not(#_z) .package-section h2,
html body:not(#_x):not(#_y):not(#_z) section#package h2,
html body:not(#_x):not(#_y):not(#_z) section#why h2 {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(38px, 4.2vw, 56px) !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  text-align: center !important;
  opacity: 1 !important;
  visibility: visible !important;
  margin-bottom: 14px !important;
}

html body:not(#_x):not(#_y):not(#_z) #package p,
html body:not(#_x):not(#_y):not(#_z) #package .package-subtitle,
html body:not(#_x):not(#_y):not(#_z) #why p,
html body:not(#_x):not(#_y):not(#_z) .linfopress-package-section p,
html body:not(#_x):not(#_y):not(#_z) .linfopress-package-section .package-subtitle,
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section p,
html body:not(#_x):not(#_y):not(#_z) .why-this p,
html body:not(#_x):not(#_y):not(#_z) .package-section p,
html body:not(#_x):not(#_y):not(#_z) section#package p,
html body:not(#_x):not(#_y):not(#_z) section#why p {
  color: #cbd5e1 !important;
  font-family: 'Inter', 'Montserrat', sans-serif !important;
  font-size: 19.5px !important;
  line-height: 1.6 !important;
  text-align: center !important;
  opacity: 1 !important;
  visibility: visible !important;
}

/* EXPANDED PACKAGE CARDS: Bigger, wider, more expansive */
html body .linfopress-package-section .package-items-grid,
html body .package-items-grid {
  display: grid !important;
  grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
  gap: 24px !important;
  width: 100% !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
}

@media (max-width: 1200px) {
  html body .linfopress-package-section .package-items-grid,
  html body .package-items-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 768px) {
  html body .linfopress-package-section .package-items-grid,
  html body .package-items-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}

html body .package-item-card {
  background: #111827 !important;
  border: 1px solid #334155 !important;
  padding: 24px 20px !important;
  min-height: 320px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: space-between !important;
  box-sizing: border-box !important;
}

html body .package-item-card .package-img-wrap {
  width: 100% !important;
  height: 200px !important;
  background: #ffffff !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 16px !important;
  box-sizing: border-box !important;
}

html body .package-item-card .package-item-name,
html body .package-item-card h3,
html body .package-item-card p {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  line-height: 1.4 !important;
  text-align: center !important;
  margin-top: 16px !important;
}
`;

css += '\n' + ultimateSpecificDarkCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully applied ultra-high specificity dark section contrast and expanded cards');

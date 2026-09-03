import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// 1. Remove #why and .linfopress-why-section from all #ffffff and #cbd5e1 rules
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) #why h2,/g, '');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) #why \.why-main-title,/g, '');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) \.linfopress-why-section h2,/g, '');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) \.linfopress-why-section \.why-main-title,/g, '');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) \.why-this h2,/g, '');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) section#why h2/g, '');

css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) #why p[^,]*,/g, '');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) \.linfopress-why-section p[^,]*,/g, '');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) \.why-this p[^,]*,/g, '');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) section#why p[^,]*,/g, '');

// Also clean any other broad rules
css = css.replace(/html body\.template-linfopress section#why p[^,]*,/g, '');
css = css.replace(/html body\.template-linfopress \.linfopress-why-section p[^,]*,/g, '');
css = css.replace(/html body \.linfopress-why-section p[^,]*,/g, '');

const perfectWhyLightStyles = `
/* ==========================================================================
   LINFOPRESS WHY SECTION - CRISP DEEP DARK GRAPHITE ON LIGHT BACKGROUND
   ========================================================================== */
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section h2,
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section .why-main-title,
html body:not(#_x):not(#_y):not(#_z) #why .why-main-title,
html body:not(#_x):not(#_y):not(#_z) #why h2,
.linfopress-why-section h2,
.why-main-title {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 3.6vw, 52px) !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  text-align: center !important;
  letter-spacing: -0.5px !important;
  margin-bottom: 40px !important;
  opacity: 1 !important;
  visibility: visible !important;
}

html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section .why-card-item .why-card-num,
html body:not(#_x):not(#_y):not(#_z) #why .why-card-num,
.why-card-num {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 34px !important;
  font-weight: 900 !important;
  line-height: 1 !important;
  margin-bottom: 12px !important;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}

html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section .why-card-item .why-card-text,
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section .why-card-text,
html body:not(#_x):not(#_y):not(#_z) #why .why-card-text,
html body:not(#_x):not(#_y):not(#_z) #why .why-card-item p,
.why-card-text,
.why-card-item p {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 600 !important;
  line-height: 1.5 !important;
  opacity: 1 !important;
  visibility: visible !important;
  margin: 0 !important;
}

html body .why-card-item {
  background: #ffffff !important;
  border: 1.5px solid #0f172a !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03) !important;
}
`;

css += '\n' + perfectWhyLightStyles;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully updated Linfopress Why Section to deep dark graphite text');

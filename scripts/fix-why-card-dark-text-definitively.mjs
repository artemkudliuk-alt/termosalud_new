import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Replace overly broad #why p with specific #why p:not(.why-card-text)
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) #why p/g, 'html body:not(#_x):not(#_y):not(#_z) #why p:not(.why-card-text):not(.why-item-desc):not(.why-card-item p)');
css = css.replace(/html body:not\(#_x\):not\(#_y\):not\(#_z\) \.linfopress-why-section p/g, 'html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section p:not(.why-card-text):not(.why-item-desc):not(.why-card-item p)');
css = css.replace(/html body \.linfopress-why-section p/g, 'html body .linfopress-why-section p:not(.why-card-text):not(.why-item-desc):not(.why-card-item p)');
css = css.replace(/html body\.template-linfopress \.linfopress-why-section p/g, 'html body.template-linfopress .linfopress-why-section p:not(.why-card-text):not(.why-item-desc):not(.why-card-item p)');
css = css.replace(/html body\.template-linfopress section#why p/g, 'html body.template-linfopress section#why p:not(.why-card-text):not(.why-item-desc):not(.why-card-item p)');

const definitiveDarkTextCss = `
/* ==========================================================================
   DEFINITIVE DARK TEXT ON WHITE WHY-CARDS (DESKTOP & MOBILE)
   ========================================================================== */
html body:not(#_x):not(#_y):not(#_z) #why .why-card-item .why-card-text,
html body:not(#_x):not(#_y):not(#_z) #why .why-card-text,
html body:not(#_x):not(#_y):not(#_z) #why .why-card-item p,
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section .why-card-item .why-card-text,
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section .why-card-text,
html body:not(#_x):not(#_y):not(#_z) .why-card-item .why-card-text,
html body:not(#_x):not(#_y):not(#_z) .why-card-item p,
.why-card-text,
.why-card-item p {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 600 !important;
  line-height: 1.5 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

html body:not(#_x):not(#_y):not(#_z) #why .why-card-item .why-card-num,
html body:not(#_x):not(#_y):not(#_z) .linfopress-why-section .why-card-num,
html body:not(#_x):not(#_y):not(#_z) .why-card-num,
.why-card-num {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 34px !important;
  font-weight: 900 !important;
  line-height: 1 !important;
  margin-bottom: 12px !important;
}
`;

css += '\n' + definitiveDarkTextCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully fixed why card text color with high specificity exclusion');

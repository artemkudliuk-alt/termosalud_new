import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Replace overly broad section:not(#hero) h2 with section that excludes dark sections
css = css.replace(/html body\.template-linfopress section:not\(#hero\) h2/g, 'html body.template-linfopress section:not(#hero):not(#package):not(.linfopress-package-section):not(#why):not(.linfopress-why-section) h2');
css = css.replace(/html body\.template-zionic section:not\(#zionic-official-hero\) h2/g, 'html body.template-zionic section:not(#zionic-official-hero):not(#package):not(.package-section):not(#why):not(.why-this) h2');

const ultimateDarkSectionOverride = `
/* ==========================================================================
   FINAL ABSOLUTE OVERRIDE: 100% PURE WHITE TEXT FOR ALL DARK SECTIONS
   ========================================================================== */
html body .linfopress-package-section h2,
html body .linfopress-package-section .package-title,
html body .package-section h2,
html body .package-title,
html body .linfopress-why-section h2,
html body .why-this h2,
html body .why-main-title,
html body #why h2,
html body #package h2,
html body.template-linfopress .linfopress-package-section h2,
html body.template-linfopress .linfopress-package-section .package-title,
html body.template-linfopress .linfopress-why-section h2,
html body.template-linfopress .why-main-title,
html body.template-zionic .package-section h2,
html body.template-zionic .why-this h2,
html body.template-linfopress section#package h2,
html body.template-linfopress section#why h2,
html body.template-zionic section#why h2 {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(38px, 4.2vw, 54px) !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  text-align: center !important;
  margin-bottom: 14px !important;
  opacity: 1 !important;
  visibility: visible !important;
}

html body .linfopress-package-section p,
html body .linfopress-package-section .package-subtitle,
html body .package-section p,
html body .package-subtitle,
html body .linfopress-why-section p,
html body .why-this p,
html body #why p,
html body #package p,
html body.template-linfopress .linfopress-package-section p,
html body.template-linfopress .linfopress-package-section .package-subtitle,
html body.template-linfopress .linfopress-why-section p,
html body.template-zionic .why-this p,
html body.template-linfopress section#package p,
html body.template-linfopress section#why p,
html body.template-zionic section#why p {
  color: #cbd5e1 !important;
  font-family: 'Inter', 'Montserrat', sans-serif !important;
  font-size: 19.5px !important;
  line-height: 1.6 !important;
  text-align: center !important;
  opacity: 1 !important;
  visibility: visible !important;
}

/* Card titles and text in dark sections */
html body .linfopress-package-section .package-item-name,
html body .package-item-card .package-item-name,
html body .package-item-card h3,
html body .package-item-card p,
html body .why-this-item h3,
html body .why-showcase-card h3 {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  text-align: center !important;
}
`;

css += '\n' + ultimateDarkSectionOverride;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully applied ultimate dark section contrast overrides');

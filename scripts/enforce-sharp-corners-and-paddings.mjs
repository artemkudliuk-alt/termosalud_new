import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// 1. Update FAQ styles to strict 0px sharp corners
css = css.replace(/border-radius:\s*16px\s*!important;/g, 'border-radius: 0px !important;');
css = css.replace(/border-radius:\s*14px\s*!important;/g, 'border-radius: 0px !important;');
css = css.replace(/border-radius:\s*9px\s*!important;/g, 'border-radius: 0px !important;');
css = css.replace(/border-radius:\s*8px\s*!important;/g, 'border-radius: 0px !important;');
css = css.replace(/border-radius:\s*50%\s*!important;\s*\/\* FAQ toggle \*\//g, 'border-radius: 0px !important;');
css = css.replace(/border-radius:\s*16px 16px 0 0\s*!important;/g, 'border-radius: 0px !important;');

// 2. Add Mobile Gutter Harmonization (matching main page 16px side paddings with zero inner grid waste)
const mobilePaddingsAndSharpCss = `
/* ==========================================================================
   STRICT SHARP CORNERS (0PX) & MOBILE SIDE PADDINGS (HARMONIZED WITH MAIN PAGE)
   ========================================================================== */

/* Strict 0px Sharp Corners across FAQ, Cards & Badges */
.faq-accordion-card,
.linfopress-faq-accordion .faq-accordion-card,
html body.template-zionic .faq-accordion-card,
html body.template-linfopress .faq-accordion-card,
.faq-q-index,
.linfopress-faq-accordion .faq-q-index,
html body.template-zionic .faq-q-index,
html body.template-linfopress .faq-q-index,
.faq-icon,
.faq-toggle-icon,
.linfopress-faq-accordion .faq-toggle-icon,
html body.template-zionic .faq-icon,
html body.template-linfopress .faq-toggle-icon,
.faq-toggle-header,
.faq-card-header {
  border-radius: 0px !important;
}

/* Mobile Side Paddings: Exactly 16px left/right like the Main page */
@media (max-width: 768px) {
  /* Ensure all containers on Zionic and Linfopress have standard 16px gutters */
  .template-zionic .container,
  .template-zionic .container-fluid,
  .template-linfopress .container,
  .template-linfopress .container-fluid,
  .zionic-main-page-wrapper .container,
  .linfopress-page-container .container,
  .zionic-tech-bento-section .container,
  .zionic-doctors-section .container,
  .zionic-certificates-section .container,
  .zionic-matrix-section .container,
  .linfopress-why-section .container,
  .linfopress-package-section .container,
  .linfopress-matrix-section .container,
  .linfopress-tech-bento-section .container,
  .linfopress-advantages-grid-section .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Remove double padding from grids so cards get full width (341px) */
  .tech-bento-grid,
  .linfopress-tech-bento-grid,
  .zionic-doctors-grid,
  .linfopress-doctor-row,
  .zionic-certificates-grid,
  .zionic-creative-matrix-grid,
  .linfopress-split-grid,
  .package-items-grid,
  .results-tiles-grid,
  .why-cards-col,
  .faq-accordion-grid,
  .linfopress-faq-accordion {
    padding-left: 0px !important;
    padding-right: 0px !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  /* Ensure cards take 100% of the container width */
  .tech-bento-card,
  .linfopress-tech-card,
  .doctor-luxury-card,
  .expert-review-card,
  .cert-scan-card,
  .matrix-creative-card,
  .package-item-card,
  .result-tile-card,
  .faq-accordion-card,
  .presentation-form-card {
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    border-radius: 0px !important;
  }
}
`;

css += '\n' + mobilePaddingsAndSharpCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully enforced strict sharp corners and 16px mobile gutters');

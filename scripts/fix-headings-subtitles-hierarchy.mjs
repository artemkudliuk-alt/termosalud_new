import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Replace desktop subtitle 22px with 18px
css = css.replace(/font-size:\s*22px\s*!important;\s*\n\s*font-weight:\s*400\s*!important;\s*\n\s*line-height:\s*1.65\s*!important;/g, 'font-size: 18px !important;\n  font-weight: 400 !important;\n  line-height: 1.6 !important;');

const hierarchyCss = `
/* ==========================================================================
   PERFECT HEADING & SUBTITLE HIERARCHY (1-TO-1 MATCH WITH MAIN PAGE)
   ========================================================================== */

/* Desktop & Tablet Headings */
@media (min-width: 769px) {
  html body.template-zionic section:not(#hero) h2,
  html body.template-zionic h2.section-main-title,
  html body.template-zionic .section-main-title,
  html body.template-linfopress section:not(#hero) h2,
  html body.template-linfopress h2.section-main-title,
  html body.template-linfopress .section-main-title,
  .section-main-title {
    font-family: 'Montserrat', sans-serif !important;
    font-size: clamp(34px, 3.8vw, 46px) !important;
    font-weight: 500 !important;
    line-height: 1.18 !important;
    letter-spacing: -0.5px !important;
    color: #0f172a !important;
    margin-bottom: 16px !important;
    text-transform: uppercase !important;
  }

  html body.template-zionic .section-main-sub,
  html body.template-linfopress .section-main-sub,
  .section-main-sub,
  .section-subtitle,
  .section-desc {
    font-family: 'Montserrat', 'Inter', sans-serif !important;
    font-size: 18px !important;
    font-weight: 400 !important;
    line-height: 1.6 !important;
    color: #475569 !important;
    max-width: 860px !important;
    margin: 0 auto !important;
  }
}

/* Mobile Headings & Subtitles (<768px) */
@media (max-width: 768px) {
  html body.template-zionic section:not(#hero) h2,
  html body.template-zionic h2.section-main-title,
  html body.template-zionic .section-main-title,
  html body.template-linfopress section:not(#hero) h2,
  html body.template-linfopress h2.section-main-title,
  html body.template-linfopress .section-main-title,
  .zionic-main-page-wrapper .section-main-title,
  .linfopress-page-container .section-main-title,
  .section-main-title,
  .presentation-main-head,
  .treatments-title,
  .matrix-main-title,
  .ba-title,
  .package-title {
    font-family: 'Montserrat', sans-serif !important;
    font-size: clamp(28px, 7.2vw, 34px) !important;
    font-weight: 500 !important;
    line-height: 1.18 !important;
    letter-spacing: -0.5px !important;
    color: #0f172a !important;
    margin-bottom: 12px !important;
    text-transform: uppercase !important;
    word-break: normal !important;
    hyphens: none !important;
  }

  html body.template-zionic .section-main-sub,
  html body.template-linfopress .section-main-sub,
  .section-main-sub,
  .presentation-sub-head,
  .treatments-subtitle,
  .matrix-sub-desc,
  .package-subtitle,
  .section-subtitle,
  .section-desc {
    font-family: 'Montserrat', 'Inter', sans-serif !important;
    font-size: 16px !important;
    font-weight: 400 !important;
    line-height: 1.5 !important;
    color: #475569 !important;
    padding: 0 4px !important;
    margin: 0 auto !important;
  }
}
`;

css += '\n' + hierarchyCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully aligned headings and subtitles hierarchy');

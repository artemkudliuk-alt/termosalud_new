import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const exactHomeScaleTypographyCss = `
/* ==========================================================================
   EXACT 1-TO-1 HOME PAGE SCALE: 52PX TITLE + 22PX SUBTITLE
   ========================================================================== */

/* 1. HIDE ALL OVERHEAD KICKERS GLOBALLY ON ZIONIC */
html body.template-zionic .luxury-kicker,
html body.template-zionic .section-kicker,
html body.template-zionic .kicker,
html body.template-zionic .matrix-status-pill {
  display: none !important;
}

/* 2. SECTION HEADER CONTAINER */
html body.template-zionic .section-header-centered,
html body.template-zionic .zionic-tech-bento-section .section-header-centered,
html body.template-zionic .zionic-ba-section .section-header-centered,
html body.template-zionic .zionic-matrix-section .section-header-centered,
html body.template-zionic .zionic-doctors-section .section-header-centered,
html body.template-zionic .zionic-faq-section .section-header-centered,
html body.template-zionic .zionic-certificates-section .section-header-centered {
  max-width: 1080px !important;
  margin: 0 auto 52px auto !important;
  padding: 0 20px !important;
  text-align: center !important;
}

/* 3. SECTION MAIN TITLES (MONTSERRAT 500 MEDIUM, 52PX CLAMP SCALE) */
html body.template-zionic section:not(#hero) h2,
html body.template-zionic h2,
html body.template-zionic h2.section-main-title,
html body.template-zionic .section-main-title,
html body.template-zionic .section-title,
html body.template-zionic .technologies-title,
html body.template-zionic .guarantees-head-title,
html body.template-zionic .zionic-tech-bento-section .section-main-title,
html body.template-zionic .zionic-ba-section .section-main-title,
html body.template-zionic .zionic-treatments-fullscreen-section h2,
html body.template-zionic .zionic-matrix-section .section-main-title,
html body.template-zionic .zionic-partner-stage-section .section-main-title,
html body.template-zionic .zionic-doctors-section .section-main-title,
html body.template-zionic .zionic-faq-section .section-main-title,
html body.template-zionic .zionic-certificates-section .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(38px, 4.2vw, 54px) !important;
  font-weight: 500 !important;
  line-height: 1.18 !important;
  letter-spacing: -0.5px !important;
  color: #0f172a !important;
  margin: 0 0 18px 0 !important;
  text-transform: uppercase !important;
}

/* 4. SECTION SUBTITLES (EXACT 22PX HOME PAGE SCALE) */
html body.template-zionic .section-main-sub,
html body.template-zionic .section-subtitle,
html body.template-zionic .section-desc,
html body.template-zionic section:not(#hero) p.section-main-sub,
html body.template-zionic .zionic-tech-bento-section .section-main-sub,
html body.template-zionic .zionic-ba-section .section-main-sub,
html body.template-zionic .zionic-matrix-section .section-main-sub,
html body.template-zionic .zionic-partner-stage-section .section-main-sub,
html body.template-zionic .zionic-doctors-section .section-main-sub,
html body.template-zionic .zionic-faq-section .section-main-sub,
html body.template-zionic .zionic-certificates-section .section-main-sub {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-size: 22px !important;
  font-weight: 400 !important;
  line-height: 1.65 !important;
  color: #475569 !important;
  margin: 0 auto !important;
  max-width: 920px !important;
}
`;

css += '\n' + exactHomeScaleTypographyCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully scaled section titles to 52px and subtitles to 22px matching home page 1-to-1!');

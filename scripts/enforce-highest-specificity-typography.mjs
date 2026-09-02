import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const bulletproofTypographyCss = `
/* ==========================================================================
   BULLETPROOF HIGH-SPECIFICITY ZIONIC TYPOGRAPHY (MONTSERRAT 900, ZERO KICKERS)
   ========================================================================== */

/* 1. HIDE ALL OVERHEAD KICKERS GLOBALLY ON ZIONIC */
html body.template-zionic .luxury-kicker,
html body.template-zionic .section-kicker,
html body.template-zionic .kicker,
html body.template-zionic .matrix-status-pill {
  display: none !important;
}

/* 2. SECTION MAIN TITLES (MONTSERRAT 900 BLACK) */
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
  font-size: clamp(34px, 3.6vw, 44px) !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  letter-spacing: -0.5px !important;
  color: #111111 !important;
  margin: 0 0 16px 0 !important;
  text-transform: none !important;
}

/* 3. SECTION SUBTITLES (MONTSERRAT / INTER 500, 18.5PX) */
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
  font-size: 18.5px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  color: #52525b !important;
  margin: 0 auto 52px auto !important;
  max-width: 920px !important;
}

/* 4. CARD TITLES & HEADINGS (MONTSERRAT 900) */
html body.template-zionic .tech-card-heading,
html body.template-zionic .tech-bento-card h3,
html body.template-zionic .presentation-title-clean,
html body.template-zionic .doctor-name,
html body.template-zionic .faq-q-text,
html body.template-zionic .cert-scan-title,
html body.template-zionic .matrix-main-head {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 900 !important;
  line-height: 1.3 !important;
  letter-spacing: -0.3px !important;
}

html body.template-zionic .tech-card-heading {
  color: #ffffff !important;
}

html body.template-zionic .presentation-title-clean {
  color: #111111 !important;
}

html body.template-zionic .doctor-name {
  color: #111111 !important;
}

html body.template-zionic .faq-q-text {
  color: #ffffff !important;
}

html body.template-zionic .cert-scan-title {
  color: #111111 !important;
}

html body.template-zionic .matrix-main-head {
  color: #ffffff !important;
}
`;

css += '\n' + bulletproofTypographyCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully written bulletproof high-specificity typography styles!');

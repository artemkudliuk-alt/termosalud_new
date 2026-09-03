import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const faqPlusAndCenterHeadingCss = `
/* ==========================================================================
   PERFECT FAQ ACCORDION SPACING ON MOBILE (NO TEXT OVERLAP WITH PLUS ICON)
   ========================================================================== */
.faq-toggle-header,
.faq-card-header,
.linfopress-faq-accordion .faq-card-header,
.faq-accordion-card .faq-toggle-header {
  position: relative !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: 14px !important;
  box-sizing: border-box !important;
}

.faq-q-index,
.linfopress-faq-accordion .faq-q-index {
  flex-shrink: 0 !important;
  min-width: 32px !important;
  width: 32px !important;
  height: 32px !important;
}

.faq-q-text,
.linfopress-faq-accordion .faq-q-text,
html body.template-zionic .faq-q-text,
html body.template-linfopress .faq-q-text,
html body .faq-q-text {
  flex: 1 1 auto !important;
  min-width: 0 !important; /* CRITICAL FOR FLEXBOX: prevents text from overflowing and pushing into plus icon */
  margin: 0 !important;
  padding-right: 20px !important; /* GUARANTEES AT LEAST 20PX CLEAR DISTANCE FROM PLUS ICON */
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16.5px !important;
  line-height: 1.4 !important;
  word-break: normal !important;
  overflow-wrap: break-word !important;
  hyphens: none !important;
}

.faq-icon,
.faq-toggle-icon,
.linfopress-faq-accordion .faq-toggle-icon {
  flex-shrink: 0 !important;
  min-width: 32px !important;
  width: 32px !important;
  height: 32px !important;
  margin-left: auto !important; /* FORCES PLUS ICON TO STAY FIRMLY ANCHORED ON THE RIGHT */
}

@media (max-width: 768px) {
  .faq-toggle-header,
  .faq-card-header,
  .linfopress-faq-accordion .faq-card-header {
    padding: 16px 14px !important;
    gap: 12px !important;
  }

  .faq-q-text,
  .linfopress-faq-accordion .faq-q-text,
  html body.template-zionic .faq-q-text,
  html body.template-linfopress .faq-q-text,
  html body .faq-q-text {
    font-size: 14.5px !important;
    line-height: 1.35 !important;
    padding-right: 18px !important;
    margin-right: 4px !important;
  }
}

/* ==========================================================================
   PARTNER / PRESENTATION SECTION HEADINGS - CENTERED
   ========================================================================== */
.presentation-section .section-header-centered,
.partner-stage-section .section-header-centered,
.application-presentation .section-header-centered,
.presentation-header,
.zionic-partner-stage-section .section-header-centered,
.linfopress-partner-stage-section .section-header-centered {
  text-align: center !important;
  margin: 0 auto 40px auto !important;
  max-width: 900px !important;
  width: 100% !important;
}

.presentation-section h2,
.partner-stage-section h2,
.application-presentation h2,
.zionic-partner-stage-section h2,
.linfopress-partner-stage-section h2 {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
}

.presentation-section p,
.partner-stage-section p,
.application-presentation p,
.zionic-partner-stage-section p,
.linfopress-partner-stage-section p {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
  display: block !important;
}
`;

css += '\n' + faqPlusAndCenterHeadingCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully added FAQ spacing and centered partner headings');

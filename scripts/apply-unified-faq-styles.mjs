import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const unifiedFaqCss = `
/* ==========================================================================
   UNIFIED LUXURY FAQ STYLES (MATCHING LINFOPRESS 1-TO-1)
   ========================================================================== */
html body.template-zionic .zionic-faq-section,
html body.template-linfopress .linfopress-faq-section {
  background: #ffffff !important;
  padding: 100px 0 110px 0 !important;
}

html body.template-zionic .faq-accordion-card,
html body.template-linfopress .faq-accordion-card {
  background: #18181b !important; /* DARK SLEEK LUXURY CARD */
  border: 1.5px solid #27272a !important;
  border-radius: 0px !important; /* STRICT 0PX SHARP CORNERS */
  margin-bottom: 16px !important;
  overflow: hidden !important;
  transition: all 0.25s ease !important;
}

html body.template-zionic .faq-accordion-card:hover,
html body.template-linfopress .faq-accordion-card:hover {
  border-color: #3f3f46 !important;
}

html body.template-zionic .faq-toggle-header,
html body.template-linfopress .faq-card-header {
  width: 100% !important;
  background: transparent !important;
  border: none !important;
  padding: 24px 30px !important;
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
  text-align: left !important;
  cursor: pointer !important;
}

html body.template-zionic .faq-q-index,
html body.template-linfopress .faq-q-index {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 900 !important;
  color: #71717a !important;
  min-width: 28px !important;
  flex-shrink: 0 !important;
  display: inline-block !important;
}

html body.template-zionic .faq-q-text,
html body.template-linfopress .faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  text-transform: none !important; /* NO SCREAMING ALL-CAPS! */
  line-height: 1.4 !important;
  letter-spacing: 0px !important;
  flex: 1 1 auto !important;
  margin: 0 !important;
  text-align: left !important;
}

html body.template-zionic .faq-icon,
html body.template-linfopress .faq-toggle-icon {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  flex-shrink: 0 !important;
  width: 32px !important;
  height: 32px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #27272a !important;
  border-radius: 0px !important;
}

html body.template-zionic .faq-answer-body,
html body.template-linfopress .faq-card-body {
  padding: 0 30px 26px 78px !important;
}

html body.template-zionic .faq-answer-body p,
html body.template-linfopress .faq-card-body p {
  font-family: 'Inter', sans-serif !important;
  font-size: 15.5px !important;
  line-height: 1.7 !important;
  color: #a1a1aa !important;
  margin: 0 !important;
  text-align: left !important;
}
`;

css += '\n' + unifiedFaqCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written unified FAQ styles in custom.css!');

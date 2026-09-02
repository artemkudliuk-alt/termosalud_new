import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const luxuryFaqCss = `
/* ==========================================================================
   ZIONIC FAQ ACCORDION - PRECISION LUXURY ALIGNMENT & LARGE FONTS
   ========================================================================== */
.zionic-faq-section {
  position: relative !important;
  z-index: 19 !important;
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-faq-section .section-header-centered {
  text-align: center !important;
  max-width: 900px !important;
  margin: 0 auto 50px auto !important;
  padding: 0 20px !important;
}

.zionic-faq-section .luxury-kicker {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #71717a !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.zionic-faq-section .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 3.8vw, 48px) !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 16px 0 !important;
  text-transform: uppercase !important;
}

.zionic-faq-section .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 18.5px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 800px !important;
}

.faq-accordion-grid {
  max-width: 1000px !important;
  margin: 0 auto !important;
  padding: 0 20px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
  box-sizing: border-box !important;
}

.faq-accordion-card {
  position: relative !important;
  width: 100% !important;
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  transition: all 0.25s ease !important;
  box-sizing: border-box !important;
}

.faq-accordion-card.active,
.faq-accordion-card:hover {
  border-color: #111111 !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04) !important;
}

.faq-toggle-header {
  position: relative !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 26px 32px !important;
  background: #ffffff !important;
  border: none !important;
  text-align: left !important;
  cursor: pointer !important;
  gap: 24px !important;
  box-sizing: border-box !important;
  border-radius: 0 !important;
}

.faq-toggle-header:hover {
  background: #fafafa !important;
}

.faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18.5px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  line-height: 1.35 !important;
  letter-spacing: -0.2px !important;
  flex: 1 1 auto !important;
  margin: 0 !important;
}

/* Fix displaced icon: strictly flex-aligned, no absolute positioning */
.faq-icon,
.template-zionic .faq-icon {
  position: static !important;
  top: auto !important;
  right: auto !important;
  bottom: auto !important;
  left: auto !important;
  background: #f4f4f5 !important;
  background-image: none !important;
  border: 1px solid #d4d4d8 !important;
  border-radius: 0 !important;
  width: 36px !important;
  height: 36px !important;
  min-width: 36px !important;
  min-height: 36px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  color: #111111 !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
  transition: all 0.25s ease !important;
}

.faq-toggle-header:hover .faq-icon {
  background: #111111 !important;
  color: #ffffff !important;
  border-color: #111111 !important;
}

.faq-accordion-card.active .faq-icon {
  background: #111111 !important;
  color: #ffffff !important;
  border-color: #111111 !important;
}

.faq-answer-body {
  padding: 0 32px 28px 32px !important;
  box-sizing: border-box !important;
}

.faq-answer-body p {
  font-family: 'Inter', sans-serif !important;
  font-size: 16.5px !important;
  color: #52525b !important;
  line-height: 1.65 !important;
  margin: 0 !important;
}
`;

const markerF = '/* ==========================================================================\n   ZIONIC FAQ ACCORDION';
const markerOldF = '/* ==========================================================================\n   ZIONIC FAQ LUXURY STYLES';

if (css.includes(markerF)) {
  const nextMarker = '/* ==========================================================================\n   ZIONIC CERTIFICATES';
  const before = css.substring(0, css.indexOf(markerF));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + luxuryFaqCss + '\n\n' + after;
} else if (css.includes(markerOldF)) {
  const nextMarker = '/* ==========================================================================\n   ZIONIC CERTIFICATES';
  const before = css.substring(0, css.indexOf(markerOldF));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + luxuryFaqCss + '\n\n' + after;
} else {
  css += '\n' + luxuryFaqCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully applied luxury FAQ accordion styles with fixed icons and large fonts!');

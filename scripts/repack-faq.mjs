import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// The unified luxury repackaged FAQ stylesheet
const repackagedFaqCss = `
/* ==========================================================================
   UNIFIED REPACKAGED LUXURY FAQ ACCORDION (ZIONIC & LINFOPRESS)
   Modern, elegant, high-end medical aesthetic with gentle curvature
   ========================================================================== */

/* Section wrapper: clean luxury background */
.zionic-faq-section,
.linfopress-faq-section,
html body.template-zionic .zionic-faq-section,
html body.template-linfopress .linfopress-faq-section {
  background: #f8fafc !important;
  padding: 85px 0 95px 0 !important;
  border-top: 1px solid #e2e8f0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

@media (max-width: 768px) {
  .zionic-faq-section,
  .linfopress-faq-section,
  html body.template-zionic .zionic-faq-section,
  html body.template-linfopress .linfopress-faq-section {
    padding: 48px 0 56px 0 !important;
  }
}

.zionic-faq-section .container,
.linfopress-faq-section .container {
  max-width: 880px !important;
  padding-left: 20px !important;
  padding-right: 20px !important;
  box-sizing: border-box !important;
}

@media (max-width: 768px) {
  .zionic-faq-section .container,
  .linfopress-faq-section .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}

/* Accordion Grid / Container: Wide, centered, no wasted space */
.faq-accordion-grid,
.linfopress-faq-accordion {
  max-width: 840px !important;
  width: 100% !important;
  margin: 0 auto !important;
  padding: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  box-sizing: border-box !important;
}

/* 1. The Card: Modern rounded corners (16px), clean light luxury style */
.faq-accordion-card,
.linfopress-faq-accordion .faq-accordion-card,
html body.template-zionic .faq-accordion-card,
html body.template-linfopress .faq-accordion-card {
  position: relative !important;
  width: 100% !important;
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 16px !important; /* Gentle modern curvature */
  overflow: hidden !important;
  padding: 0 !important;
  margin-bottom: 0 !important;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.03) !important;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease !important;
  box-sizing: border-box !important;
  cursor: pointer !important;
}

.faq-accordion-card:hover,
.linfopress-faq-accordion .faq-accordion-card:hover,
html body.template-zionic .faq-accordion-card:hover,
html body.template-linfopress .faq-accordion-card:hover {
  border-color: #cbd5e1 !important;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06) !important;
  transform: translateY(-1px) !important;
}

/* Active State: subtle dark accent border & soft elevation */
.faq-accordion-card.active,
.linfopress-faq-accordion .faq-accordion-card.active,
html body.template-zionic .faq-accordion-card.active,
html body.template-linfopress .faq-accordion-card.active {
  background: #ffffff !important;
  border-color: #0f172a !important;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08) !important;
  transform: translateY(-1px) !important;
}

/* 2. Header / Trigger Row */
.faq-toggle-header,
.faq-card-header,
.linfopress-faq-accordion .faq-card-header,
html body.template-zionic .faq-toggle-header,
html body.template-linfopress .faq-card-header {
  position: relative !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 20px 24px !important;
  background: transparent !important;
  border: none !important;
  text-align: left !important;
  cursor: pointer !important;
  gap: 16px !important;
  box-sizing: border-box !important;
  user-select: none !important;
  border-radius: 16px 16px 0 0 !important;
}

@media (max-width: 768px) {
  .faq-toggle-header,
  .faq-card-header,
  .linfopress-faq-accordion .faq-card-header,
  html body.template-zionic .faq-toggle-header,
  html body.template-linfopress .faq-card-header {
    padding: 16px 16px !important;
    gap: 12px !important;
  }
}

/* 3. Number Badge (01, 02, 03...) */
.faq-q-index,
.linfopress-faq-accordion .faq-q-index,
html body.template-zionic .faq-q-index,
html body.template-linfopress .faq-q-index {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 32px !important;
  height: 32px !important;
  border-radius: 9px !important;
  background: #f1f5f9 !important;
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  flex-shrink: 0 !important;
  transition: all 0.25s ease !important;
}

.faq-accordion-card.active .faq-q-index,
.linfopress-faq-accordion .faq-accordion-card.active .faq-q-index,
html body.template-zionic .faq-accordion-card.active .faq-q-index,
html body.template-linfopress .faq-accordion-card.active .faq-q-index {
  background: #0f172a !important;
  color: #ffffff !important;
}

/* 4. Question Text: Deep Charcoal Black, Balanced Hierarchy */
.faq-q-text,
.linfopress-faq-accordion .faq-q-text,
html body.template-zionic .faq-q-text,
html body.template-linfopress .faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  line-height: 1.35 !important;
  letter-spacing: -0.2px !important;
  flex: 1 1 auto !important;
  margin: 0 !important;
  hyphens: none !important;
  word-break: normal !important;
  text-transform: none !important;
  transition: color 0.2s ease !important;
}

@media (max-width: 768px) {
  .faq-q-text,
  .linfopress-faq-accordion .faq-q-text,
  html body.template-zionic .faq-q-text,
  html body.template-linfopress .faq-q-text {
    font-size: 14.5px !important;
    line-height: 1.35 !important;
  }
}

/* 5. Circular Toggle Icon */
.faq-icon,
.faq-toggle-icon,
.linfopress-faq-accordion .faq-toggle-icon,
html body.template-zionic .faq-icon,
html body.template-linfopress .faq-toggle-icon {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 32px !important;
  height: 32px !important;
  min-width: 32px !important;
  border-radius: 50% !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
  transition: all 0.25s ease !important;
}

.faq-accordion-card.active .faq-icon,
.faq-accordion-card.active .faq-toggle-icon,
.linfopress-faq-accordion .faq-accordion-card.active .faq-toggle-icon,
html body.template-zionic .faq-accordion-card.active .faq-icon,
html body.template-linfopress .faq-accordion-card.active .faq-toggle-icon {
  background: #0f172a !important;
  border-color: #0f172a !important;
  color: #ffffff !important;
}

/* 6. Answer Body: Clear display toggle & generous readable layout */
.faq-answer-body,
.faq-card-body,
.linfopress-faq-accordion .faq-card-body,
html body.template-zionic .faq-answer-body,
html body.template-linfopress .faq-card-body {
  padding: 0 24px 20px 24px !important;
  box-sizing: border-box !important;
}

.faq-accordion-card:not(.active) .faq-answer-body,
.faq-accordion-card:not(.active) .faq-card-body,
.linfopress-faq-accordion .faq-accordion-card:not(.active) .faq-card-body,
html body.template-zionic .faq-accordion-card:not(.active) .faq-answer-body,
html body.template-linfopress .faq-accordion-card:not(.active) .faq-card-body {
  display: none !important;
}

.faq-accordion-card.active .faq-answer-body,
.faq-accordion-card.active .faq-card-body,
.linfopress-faq-accordion .faq-accordion-card.active .faq-card-body,
html body.template-zionic .faq-accordion-card.active .faq-answer-body,
html body.template-linfopress .faq-accordion-card.active .faq-card-body {
  display: block !important;
  animation: faqSmoothOpen 0.25s ease forwards !important;
}

@keyframes faqSmoothOpen {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .faq-answer-body,
  .faq-card-body,
  .linfopress-faq-accordion .faq-card-body,
  html body.template-zionic .faq-answer-body,
  html body.template-linfopress .faq-card-body {
    padding: 0 16px 16px 16px !important;
  }
}

.faq-answer-body p,
.faq-card-body p,
.linfopress-faq-accordion .faq-card-body p,
html body.template-zionic .faq-answer-body p,
html body.template-linfopress .faq-card-body p {
  font-family: 'Golos Text', 'Inter', sans-serif !important;
  font-size: 15px !important;
  line-height: 1.6 !important;
  color: #475569 !important;
  margin: 0 !important;
  padding-top: 14px !important;
  border-top: 1px solid #f1f5f9 !important;
  text-align: left !important;
}

@media (max-width: 768px) {
  .faq-answer-body p,
  .faq-card-body p,
  .linfopress-faq-accordion .faq-card-body p,
  html body.template-zionic .faq-answer-body p,
  html body.template-linfopress .faq-card-body p {
    font-size: 13.5px !important;
    line-height: 1.55 !important;
  }
}
`;

// Replace lines 16850-16938 in custom.css
const oldBlock1Start = css.indexOf('html body.template-linfopress .linfopress-faq-section {');
const oldBlock1End = css.indexOf('/* ==========================================================================\n   TRANSITIONS-DEV:', oldBlock1Start);

if (oldBlock1Start !== -1 && oldBlock1End !== -1) {
  css = css.slice(0, oldBlock1Start) + repackagedFaqCss + '\n\n' + css.slice(oldBlock1End);
  console.log('Replaced old FAQ block 1');
} else {
  // Append to the end
  css += '\n' + repackagedFaqCss;
  console.log('Appended repackaged FAQ css');
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Updated src/css/custom.css with repackaged luxury FAQ styling');

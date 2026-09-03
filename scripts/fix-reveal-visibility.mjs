import fs from 'fs';

// 1. Update src/css/custom.css to ensure no text is hidden by opacity: 0
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const safetyVisibilityCss = `
/* ==========================================================================
   PERMANENT CONTENT VISIBILITY GUARANTEE (ANTI-DISAPPEARING CONTENT)
   All headers, text, cards, and advantages are 100% visible at all times.
   ========================================================================== */
.t-reveal-header,
.t-reveal-header-sub,
.t-reveal-item,
.t-reveal-from-left,
.t-reveal-from-right,
.t-reveal-scale,
.blur-reveal,
.section-main-title,
.section-main-sub,
.adv-item-card,
.adv-text,
.adv-index,
.linfopress-advantages-row,
.linfopress-advantages-col-list,
.tech-bento-card,
.matrix-creative-card,
.doctor-luxury-card,
.package-item-card,
.presentation-form-card {
  opacity: 1 !important;
  visibility: visible !important;
  filter: none !important;
  transform: none !important;
}

/* Specific styling for Linfopress 9 Advantages list items */
.adv-item-card {
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
  padding: 18px 24px !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.adv-item-card .adv-index {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 900 !important;
  color: #0f172a !important;
  min-width: 36px !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.adv-item-card .adv-text,
.adv-item-card p.adv-text,
.adv-item-card p {
  font-family: 'Inter', 'Montserrat', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 500 !important;
  color: #1e293b !important;
  line-height: 1.55 !important;
  margin: 0 !important;
  opacity: 1 !important;
  visibility: visible !important;
  display: block !important;
}
`;

css += '\n' + safetyVisibilityCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully added permanent content visibility rules to custom.css');

// 2. Simplify initBlurRevealOnScroll in src/js/main.js so it never hides elements
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const newInitBlurReveal = `function initBlurRevealOnScroll() {
  // Ensure all elements are immediately visible
  document.querySelectorAll('.t-reveal-header, .t-reveal-header-sub, .t-reveal-item, .t-reveal-from-left, .t-reveal-from-right, .t-reveal-scale, .blur-reveal').forEach((el) => {
    el.classList.add('is-revealed');
  });
}`;

js = js.replace(/function initBlurRevealOnScroll\(\) \{[\s\S]*?\n\}/, newInitBlurReveal);
fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');
console.log('Successfully updated initBlurRevealOnScroll in main.js to guarantee immediate visibility');

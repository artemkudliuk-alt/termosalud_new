import fs from 'fs';

// 1. Update src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const updatedLuxuryFaqCss = `
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
  font-size: clamp(38px, 4vw, 50px) !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 16px 0 !important;
  text-transform: uppercase !important;
}

.zionic-faq-section .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 19px !important;
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

/* Question Title - EXTRA LARGE & BOLD */
.faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.35 !important;
  letter-spacing: -0.2px !important;
  flex: 1 1 auto !important;
  margin: 0 !important;
}

/* Fix displaced icon: strictly flex-aligned */
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
  width: 38px !important;
  height: 38px !important;
  min-width: 38px !important;
  min-height: 38px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 26px !important;
  font-weight: 700 !important;
  color: #111111 !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
  transition: all 0.25s ease !important;
}

.faq-toggle-header:hover .faq-icon,
.faq-accordion-card.active .faq-icon {
  background: #111111 !important;
  color: #ffffff !important;
  border-color: #111111 !important;
}

/* Controlled Accordion Collapse & Expand */
.faq-accordion-card .faq-answer-body {
  display: none !important;
  padding: 0 32px 28px 32px !important;
  box-sizing: border-box !important;
}

.faq-accordion-card.active .faq-answer-body {
  display: block !important;
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
if (css.includes(markerF)) {
  const nextMarker = '/* ==========================================================================\n   ZIONIC CERTIFICATES';
  const before = css.substring(0, css.indexOf(markerF));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + updatedLuxuryFaqCss + '\n\n' + after;
} else {
  css += '\n' + updatedLuxuryFaqCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// 2. Update src/js/main.js
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const oldFaqJs = `  // FAQ Accordion click
  document.querySelectorAll('.faq-toggle-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.faq-accordion-card');
      const body = card.querySelector('.faq-answer-body');
      const icon = btn.querySelector('.faq-icon');
      if (body.style.display === 'none' || !body.style.display) {
        body.style.display = 'block';
        if (icon) icon.textContent = '−';
      } else {
        body.style.display = 'none';
        if (icon) icon.textContent = '+';
      }
    });
  });`;

const newFaqJs = `  // FAQ Accordion click - Precision Toggle
  document.querySelectorAll('.faq-toggle-header').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.faq-accordion-card');
      if (!card) return;
      const isCurrentlyActive = card.classList.contains('active');
      const icon = card.querySelector('.faq-icon');

      if (isCurrentlyActive) {
        card.classList.remove('active');
        if (icon) icon.textContent = '+';
      } else {
        card.classList.add('active');
        if (icon) icon.textContent = '−';
      }
    });
  });`;

if (js.includes(oldFaqJs)) {
  js = js.replace(oldFaqJs, newFaqJs);
} else {
  // Regex replace if slight differences
  js = js.replace(/\/\/\s*FAQ Accordion click[\s\S]*?\}\);\s*\}\);/, newFaqJs);
}

fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

// 3. Update scripts/process-html.mjs
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
htmlMjs = htmlMjs.replace('<div class="faq-answer-body" style="display: block;">', '<div class="faq-answer-body">');
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

console.log('Successfully updated FAQ accordion toggle logic and enlarged titles to 20px Montserrat 900!');

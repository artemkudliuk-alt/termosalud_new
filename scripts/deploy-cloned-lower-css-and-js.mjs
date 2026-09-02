import fs from 'fs';

// ==========================================================================
// 1. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const lowerClonedScreensCss = `
/* ==========================================================================
   ZIONIC LOWER SCREENS: DOCTORS, FAQ, REAL CERTIFICATES & EXPANDABLE SEO
   ========================================================================== */

/* 1. DOCTORS & EXPERT REVIEWS */
.zionic-doctors-section {
  position: relative !important;
  z-index: 19 !important;
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-doctors-section .section-header-centered {
  text-align: center !important;
  max-width: 960px !important;
  margin: 0 auto 56px auto !important;
  padding: 0 20px !important;
}

.zionic-doctors-section .luxury-kicker {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #71717a !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.zionic-doctors-section .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 3.8vw, 48px) !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 16px 0 !important;
  text-transform: uppercase !important;
}

.zionic-doctors-section .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 18.5px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 860px !important;
}

.zionic-doctors-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 30px !important;
  max-width: 1400px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 991px) {
  .zionic-doctors-grid {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
    max-width: 560px !important;
  }
}

.doctor-luxury-card {
  background: #18181b !important;
  border: 1px solid #27272a !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.12) !important;
  transition: all 0.35s ease !important;
}

.doctor-luxury-card:hover {
  transform: translateY(-6px) !important;
  border-color: #52525b !important;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.22) !important;
}

.doctor-photo-frame {
  position: relative !important;
  width: 100% !important;
  height: 380px !important;
  overflow: hidden !important;
  background: #09090b !important;
}

.doctor-photo-frame img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center top !important;
  display: block !important;
  transition: transform 0.5s ease !important;
}

.doctor-luxury-card:hover .doctor-photo-frame img {
  transform: scale(1.04) !important;
}

.doctor-card-info {
  padding: 26px 24px 30px 24px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
  background: #18181b !important;
}

.doctor-header-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 12px !important;
  margin-bottom: 4px !important;
}

.doctor-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  margin: 0 !important;
  line-height: 1.25 !important;
}

.doctor-phd-badge {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  background: #27272a !important;
  border: 1px solid #3f3f46 !important;
  padding: 4px 10px !important;
  border-radius: 0 !important;
  text-transform: uppercase !important;
}

.doctor-specialty {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 700 !important;
  color: #d4d4d8 !important;
  margin: 0 !important;
  line-height: 1.4 !important;
}

.doctor-clinic {
  font-family: 'Inter', sans-serif !important;
  font-size: 14.5px !important;
  color: #a1a1aa !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}


/* 2. FAQ ACCORDION */
.zionic-faq-section {
  position: relative !important;
  z-index: 20 !important;
  background: #f4f4f5 !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.faq-accordion-grid {
  max-width: 1000px !important;
  margin: 0 auto !important;
  padding: 0 20px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
  box-sizing: border-box !important;
}

.faq-accordion-card {
  position: relative !important;
  width: 100% !important;
  background: #18181b !important;
  border: 1px solid #27272a !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  transition: all 0.25s ease !important;
}

.faq-accordion-card.active {
  background: #111111 !important;
  border-color: #3f3f46 !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
}

.faq-toggle-header {
  position: relative !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 24px 30px !important;
  background: transparent !important;
  border: none !important;
  text-align: left !important;
  cursor: pointer !important;
  gap: 20px !important;
  box-sizing: border-box !important;
  border-radius: 0 !important;
}

.faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18.5px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  line-height: 1.35 !important;
  flex: 1 1 auto !important;
  margin: 0 !important;
  transition: color 0.2s ease !important;
}

.faq-accordion-card.active .faq-q-text {
  color: #ffffff !important;
}

.faq-icon {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  background: #27272a !important;
  border: 1px solid #3f3f46 !important;
  width: 36px !important;
  height: 36px !important;
  min-width: 36px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 0 !important;
  flex-shrink: 0 !important;
  transition: all 0.25s ease !important;
}

.faq-accordion-card.active .faq-icon {
  background: #ffffff !important;
  color: #111111 !important;
  border-color: #ffffff !important;
}

.faq-accordion-card .faq-answer-body {
  display: none !important;
  padding: 0 30px 26px 30px !important;
  box-sizing: border-box !important;
}

.faq-accordion-card.active .faq-answer-body {
  display: block !important;
}

.faq-answer-body p {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #a1a1aa !important;
  line-height: 1.65 !important;
  margin: 0 !important;
}


/* 3. REAL CERTIFICATES & SCANS */
.zionic-certificates-section {
  position: relative !important;
  z-index: 21 !important;
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-cert-scans-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 40px !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 767px) {
  .zionic-cert-scans-grid {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
}

.cert-scan-card {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 24px !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.3s ease !important;
}

.cert-scan-card:hover {
  border-color: #111111 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1) !important;
}

.cert-scan-frame {
  position: relative !important;
  width: 100% !important;
  height: 480px !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 12px !important;
  box-sizing: border-box !important;
}

.cert-scan-frame img {
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
  display: block !important;
  transition: transform 0.3s ease !important;
}

.cert-scan-card:hover .cert-scan-frame img {
  transform: scale(1.02) !important;
}

.cert-scan-badge {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  border: 1px solid #d4d4d8 !important;
  padding: 5px 12px !important;
  margin-bottom: 8px !important;
  width: fit-content !important;
}

.cert-scan-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 8px 0 !important;
  line-height: 1.3 !important;
}

.cert-scan-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 14.5px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}


/* 4. MODERN SEO EXPANDABLE ARTICLE */
.zionic-seo-clean-section {
  position: relative !important;
  z-index: 22 !important;
  background: #ffffff !important;
  padding: 90px 0 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.seo-article-card {
  max-width: 1100px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

.seo-article-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(28px, 3.2vw, 38px) !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.25 !important;
  margin: 0 0 24px 0 !important;
}

.seo-article-sub-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.35 !important;
  margin: 36px 0 16px 0 !important;
}

.seo-article-card p {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #52525b !important;
  line-height: 1.75 !important;
  margin: 0 0 20px 0 !important;
}

.seo-article-bullets {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 24px 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
}

.seo-article-bullets li {
  position: relative !important;
  padding-left: 24px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 15.5px !important;
  color: #52525b !important;
  line-height: 1.7 !important;
}

.seo-article-bullets li::before {
  content: "•" !important;
  position: absolute !important;
  left: 6px !important;
  top: 0 !important;
  color: #111111 !important;
  font-weight: 900 !important;
  font-size: 20px !important;
}

.seo-article-bullets li strong {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 800 !important;
  color: #111111 !important;
}

/* Expandable logic */
.seo-expandable-content {
  display: none;
  overflow: hidden;
}

.seo-expandable-content.expanded {
  display: block !important;
  animation: fadeInSeo 0.4s ease forwards !important;
}

@keyframes fadeInSeo {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.seo-toggle-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  background: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #111111 !important;
  padding: 13px 26px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  border-radius: 0 !important;
  margin-top: 10px !important;
  transition: all 0.25s ease !important;
}

.seo-toggle-btn:hover {
  background: #ffffff !important;
  color: #111111 !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12) !important;
}
`;

const markerCloned = '/* ==========================================================================\n   ZIONIC LOWER SCREENS';
if (css.includes(markerCloned)) {
  const nextMarker = '/* ==========================================================================\n   BULLETPROOF ZERO-BLEED';
  const before = css.substring(0, css.indexOf(markerCloned));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + lowerClonedScreensCss + '\n\n' + after;
} else {
  // Replace old FAQ and Cert section styles
  const startMarker = '/* ==========================================================================\n   ZIONIC FAQ ACCORDION';
  const nextMarker = '/* ==========================================================================\n   BULLETPROOF ZERO-BLEED';
  if (css.includes(startMarker) && css.includes(nextMarker)) {
    const before = css.substring(0, css.indexOf(startMarker));
    const after = css.substring(css.indexOf(nextMarker));
    css = before + lowerClonedScreensCss + '\n\n' + after;
  } else {
    css += '\n' + lowerClonedScreensCss;
  }
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// ==========================================================================
// 2. UPDATE src/js/main.js
// ==========================================================================
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const seoToggleCode = `
// SEO Article Toggle
window.toggleZionicSeoArticle = function() {
  const content = document.getElementById('seoExpandableContent');
  const btn = document.getElementById('seoToggleBtn');
  if (!content || !btn) return;
  
  const isExpanded = content.classList.contains('expanded');
  const label = btn.querySelector('.seo-btn-label');
  const arrow = btn.querySelector('.seo-btn-arrow');
  
  if (isExpanded) {
    content.classList.remove('expanded');
    if (label) label.textContent = 'Читати повністю';
    if (arrow) arrow.textContent = '∨';
  } else {
    content.classList.add('expanded');
    if (label) label.textContent = 'Приховати';
    if (arrow) arrow.textContent = '∧';
  }
};
`;

if (!js.includes('window.toggleZionicSeoArticle')) {
  js = seoToggleCode + '\n' + js;
}

fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully deployed CSS and JS for all 4 cloned lower screens!');

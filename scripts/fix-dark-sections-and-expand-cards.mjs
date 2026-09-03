import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const darkThemeAndExpandedCardsCss = `
/* ==========================================================================
   PERFECT CONTRAST ON ALL DARK & GRAY SECTIONS + EXPANDED CARD SIZES
   Guarantees pure white/light text on all dark backgrounds & larger cards
   ========================================================================== */

/* 1. PACKAGE SECTION (Linfopress & Zionic) */
.linfopress-package-section,
.package-section,
section.linfopress-package-section,
html body.template-linfopress .linfopress-package-section,
html body.template-zionic .package-section {
  background: #090d16 !important;
  padding: 100px 0 !important;
}

html body.template-linfopress .linfopress-package-section h2,
html body.template-linfopress .linfopress-package-section .package-title,
html body.template-linfopress .linfopress-package-section .section-main-title,
html body.template-zionic .package-section h2,
.package-title,
.linfopress-package-section .package-title {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(38px, 4.2vw, 54px) !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  text-align: center !important;
  margin-bottom: 14px !important;
}

html body.template-linfopress .linfopress-package-section p.package-subtitle,
html body.template-linfopress .linfopress-package-section p,
html body.template-zionic .package-section p,
.package-subtitle,
.linfopress-package-section .package-subtitle {
  color: #cbd5e1 !important;
  font-family: 'Inter', 'Montserrat', sans-serif !important;
  font-size: 19.5px !important;
  line-height: 1.6 !important;
  text-align: center !important;
  max-width: 860px !important;
  margin: 0 auto 50px auto !important;
}

/* Package Cards Grid - Expanded & Large */
.linfopress-package-section .package-items-grid,
.package-items-grid {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 24px !important;
  width: 100% !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
  padding: 0 !important;
}

@media (max-width: 1200px) {
  .linfopress-package-section .package-items-grid,
  .package-items-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 768px) {
  .linfopress-package-section .package-items-grid,
  .package-items-grid {
    grid-template-columns: 1fr !important;
    gap: 18px !important;
  }
}

/* Individual Package Card - Bigger, Expanded */
.linfopress-package-section .package-item-card,
.package-item-card {
  background: #111827 !important;
  border: 1px solid #334155 !important;
  padding: 24px 20px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: space-between !important;
  min-height: 310px !important;
  box-sizing: border-box !important;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
}

.linfopress-package-section .package-item-card:hover,
.package-item-card:hover {
  transform: translateY(-6px) !important;
  border-color: #64748b !important;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45) !important;
}

/* Inner white photo stage for accessories */
.linfopress-package-section .package-img-wrap,
.package-item-card .package-img-wrap,
.package-item-card .package-img-box {
  width: 100% !important;
  height: 200px !important;
  background: #ffffff !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 18px !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

.linfopress-package-section .package-img-wrap img,
.package-item-card img {
  max-width: 100% !important;
  max-height: 100% !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  display: block !important;
}

.linfopress-package-section .package-item-name,
.package-item-card .package-item-name,
.package-item-card h3,
.package-item-card p {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17.5px !important;
  font-weight: 700 !important;
  line-height: 1.4 !important;
  text-align: center !important;
  margin: 18px 0 0 0 !important;
}

/* 2. WHY SECTIONS (Video Background Dark Stage) */
.linfopress-why-section,
.why-this,
section#why,
html body.template-linfopress section#why,
html body.template-zionic section#why {
  background: #090d16 !important;
}

html body.template-linfopress section#why h2,
html body.template-linfopress section#why h2.why-main-title,
html body.template-zionic section#why h2,
.why-main-title {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(38px, 4.2vw, 54px) !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  text-align: center !important;
}

html body.template-linfopress section#why p,
html body.template-zionic section#why p,
.why-this-p,
.why-subtitle {
  color: #cbd5e1 !important;
  font-size: 19.5px !important;
}

.why-this-item,
.why-showcase-card {
  background: #111827 !important;
  border: 1px solid #334155 !important;
  color: #ffffff !important;
}

.why-this-item h3,
.why-this-item .why-item-title,
.why-showcase-card h3 {
  color: #ffffff !important;
  font-size: 22px !important;
  font-weight: 800 !important;
}

.why-this-item p,
.why-this-item .why-item-desc,
.why-showcase-card p {
  color: #cbd5e1 !important;
  font-size: 16.5px !important;
  line-height: 1.6 !important;
}

/* 3. TECH BENTO CARDS (Zionic & Linfopress 4 Phases) - Expanded & Bright White Text */
.linfopress-tech-grid,
.tech-bento-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 32px !important;
  width: 100% !important;
}

@media (max-width: 991px) {
  .linfopress-tech-grid,
  .tech-bento-grid {
    grid-template-columns: 1fr !important;
    gap: 24px !important;
  }
}

.linfopress-tech-card,
.tech-bento-card {
  background: #111827 !important;
  border: 1px solid #334155 !important;
  overflow: hidden !important;
}

.linfopress-tech-card .tech-card-body,
.tech-bento-card .tech-card-content {
  padding: 32px !important;
  background: #111827 !important;
}

@media (max-width: 768px) {
  .linfopress-tech-card .tech-card-body,
  .tech-bento-card .tech-card-content {
    padding: 24px 18px !important;
  }
}

.linfopress-tech-card .tech-card-heading,
.tech-bento-card .tech-card-heading,
.linfopress-tech-card h3,
.tech-bento-card h3 {
  color: #ffffff !important;
  font-size: clamp(22px, 2.2vw, 27px) !important;
  font-weight: 800 !important;
  margin-bottom: 16px !important;
}

.linfopress-tech-card p,
.linfopress-tech-card li,
.tech-bento-card p,
.tech-bento-card li,
.tech-card-list li {
  color: #e2e8f0 !important;
  font-size: 16.5px !important;
  line-height: 1.6 !important;
}

.linfopress-tech-card .bullet-check,
.tech-bento-card .bullet-check {
  color: #ffffff !important;
  font-weight: 900 !important;
}

.linfopress-tech-card .tech-card-cta,
.tech-bento-card .tech-card-cta {
  color: #ffffff !important;
  font-weight: 700 !important;
  font-size: 15px !important;
  margin-top: 20px !important;
}

/* 4. CLINICAL MATRIX CARDS (Indications vs Contraindications) */
.matrix-creative-card.indications-card,
.matrix-creative-card.contraindications-card {
  padding: 36px !important;
  background: #334155 !important;
  border: 1px solid #475569 !important;
}

@media (max-width: 768px) {
  .matrix-creative-card.indications-card,
  .matrix-creative-card.contraindications-card {
    padding: 24px 16px !important;
  }
}

.matrix-creative-card .matrix-main-head {
  color: #ffffff !important;
  font-size: 28px !important;
  font-weight: 800 !important;
  margin-bottom: 8px !important;
}

.matrix-creative-card .matrix-sub-head {
  color: #cbd5e1 !important;
  font-size: 16.5px !important;
  margin-bottom: 28px !important;
}

/* Inside item rows are crisp white cards with dark slate text */
.matrix-item-row {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  padding: 18px 20px !important;
}

.matrix-item-row .item-title {
  color: #0f172a !important;
  font-size: 18px !important;
  font-weight: 800 !important;
}

.matrix-item-row .item-desc {
  color: #475569 !important;
  font-size: 15.5px !important;
  line-height: 1.55 !important;
}

.matrix-item-row .item-index,
.matrix-item-row .item-alert-icon {
  font-size: 18px !important;
  font-weight: 900 !important;
}
`;

css += '\n' + darkThemeAndExpandedCardsCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully injected perfect contrast rules for dark sections and expanded all cards');

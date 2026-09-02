import fs from 'fs';

// ==========================================================================
// 1. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const updatedIndicationsAndTypographyCss = `
/* ==========================================================================
   GLOBAL ZIONIC TYPOGRAPHY & WIDTH HARMONIZATION (1-TO-1 WITH HOME PAGE)
   ========================================================================== */
.zionic-main-page-wrapper .container,
.zionic-main-page-wrapper .container-fluid {
  max-width: 1440px !important;
  margin: 0 auto !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
  box-sizing: border-box !important;
}

/* SECTION TITLES & SUBTITLES */
.zionic-main-page-wrapper .section-header-centered {
  text-align: center !important;
  max-width: 1100px !important;
  margin: 0 auto 56px auto !important;
  padding: 0 20px !important;
}

.zionic-main-page-wrapper .luxury-kicker {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.zionic-main-page-wrapper .section-main-title,
.zionic-main-page-wrapper h2.section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(34px, 3.8vw, 48px) !important;
  font-weight: 900 !important;
  line-height: 1.2 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  margin: 0 0 16px 0 !important;
}

.zionic-main-page-wrapper .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 19px !important;
  font-weight: 400 !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 900px !important;
}

/* ==========================================================================
   INDICATIONS & CONTRAINDICATIONS (REFINED GRAY ARCHITECTURAL THEME)
   ========================================================================== */
.zionic-matrix-section {
  position: relative !important;
  z-index: 16 !important;
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-creative-matrix-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 36px !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
  align-items: stretch !important;
}

@media (max-width: 991px) {
  .zionic-creative-matrix-grid {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
}

.matrix-creative-card {
  padding: 44px 38px !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.04) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.matrix-creative-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08) !important;
}

/* BOTH CARDS IN ELEGANT LIGHT GRAY / ZINC THEME */
.matrix-creative-card.indications-card,
.matrix-creative-card.contraindications-card {
  background: #f4f4f5 !important; /* Refined Gray background */
  border: 1px solid #d4d4d8 !important; /* Graphite border */
  color: #111111 !important;
}

.matrix-card-header {
  margin-bottom: 30px !important;
  border-bottom: 1px solid #e4e4e7 !important;
  padding-bottom: 24px !important;
}

.matrix-status-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  padding: 5px 12px !important;
  border-radius: 0 !important;
  margin-bottom: 14px !important;
  background: #ffffff !important;
  border: 1px solid #d4d4d8 !important;
  color: #111111 !important;
}

.matrix-status-pill.pill-positive .pill-dot {
  width: 7px !important;
  height: 7px !important;
  background: #111111 !important;
  display: inline-block !important;
}

.matrix-status-pill.pill-warning .pill-cross {
  color: #111111 !important;
  font-weight: 900 !important;
}

.matrix-main-head,
.indications-card .matrix-main-head,
.contraindications-card .matrix-main-head {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 26px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.25 !important;
  margin: 0 0 8px 0 !important;
}

.matrix-sub-head,
.indications-card .matrix-sub-head,
.contraindications-card .matrix-sub-head {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #52525b !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

.matrix-items-stack {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}

.matrix-item-row {
  display: flex !important;
  align-items: flex-start !important;
  gap: 16px !important;
  padding: 16px 20px !important;
  background: #ffffff !important; /* Pure white item card */
  border: 1px solid #e4e4e7 !important;
  border-radius: 0 !important;
  transition: all 0.25s ease !important;
}

.matrix-item-row:hover {
  border-color: #111111 !important;
  transform: translateX(4px) !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05) !important;
}

.item-index {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  flex-shrink: 0 !important;
  padding-top: 2px !important;
}

.item-alert-icon {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 900 !important;
  color: #71717a !important;
  flex-shrink: 0 !important;
  padding-top: 1px !important;
}

.item-content {
  display: flex !important;
  flex-direction: column !important;
  gap: 4px !important;
}

.item-title,
.indications-card .item-title,
.contraindications-card .item-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17.5px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.35 !important;
  margin: 0 !important;
}

.item-desc,
.indications-card .item-desc,
.contraindications-card .item-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}
`;

css += '\n' + updatedIndicationsAndTypographyCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully updated Indications section to refined gray theme and harmonized full page typography!');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const indicationsFooterGrayCss = `
/* ==========================================================================
   INDICATIONS & CONTRAINDICATIONS (EXACT FOOTER GRAY BACKGROUND #54595f)
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

.matrix-creative-card,
.matrix-creative-card.indications-card,
.matrix-creative-card.contraindications-card {
  background: #54595f !important; /* EXACT SIGNATURE FOOTER GRAY */
  border: 1px solid #474b50 !important;
  padding: 44px 38px !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12) !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}

.matrix-creative-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.18) !important;
  border-color: #6b7280 !important;
}

.matrix-card-header {
  margin-bottom: 30px !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18) !important;
  padding-bottom: 24px !important;
}

.matrix-status-pill,
.indications-card .matrix-status-pill,
.contraindications-card .matrix-status-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  padding: 6px 14px !important;
  border-radius: 0 !important;
  margin-bottom: 14px !important;
  background: rgba(255, 255, 255, 0.15) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: #ffffff !important;
}

.matrix-status-pill.pill-positive .pill-dot {
  width: 7px !important;
  height: 7px !important;
  background: #ffffff !important;
  display: inline-block !important;
}

.matrix-status-pill.pill-warning .pill-cross {
  color: #ffffff !important;
  font-weight: 900 !important;
}

.matrix-main-head,
.indications-card .matrix-main-head,
.contraindications-card .matrix-main-head {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 27px !important;
  font-weight: 900 !important;
  color: #ffffff !important; /* Crisp White Main Title */
  line-height: 1.25 !important;
  margin: 0 0 8px 0 !important;
}

.matrix-sub-head,
.indications-card .matrix-sub-head,
.contraindications-card .matrix-sub-head {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #e2e8f0 !important; /* Crisp Subtitle */
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
  padding: 18px 22px !important;
  background: #ffffff !important; /* Crisp Pure White Item Tile */
  border: 1px solid #e4e4e7 !important;
  border-radius: 0 !important;
  transition: all 0.25s ease !important;
}

.matrix-item-row:hover {
  border-color: #111111 !important;
  transform: translateX(4px) !important;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12) !important;
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

const markerIndications = '/* ==========================================================================\n   INDICATIONS & CONTRAINDICATIONS';
if (css.includes(markerIndications)) {
  const p1 = css.substring(0, css.indexOf(markerIndications));
  css = p1 + indicationsFooterGrayCss;
} else {
  css += '\n' + indicationsFooterGrayCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully set indications cards background to exact footer gray #54595f!');

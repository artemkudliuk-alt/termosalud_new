import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const baSectionWhiteCss = `
/* ==========================================================================
   ZIONIC B&A RESULTS SECTION (PURE WHITE BACKGROUND & HIGH-CONTRAST TILES)
   ========================================================================== */
.zionic-ba-section {
  position: relative !important;
  z-index: 13 !important;
  background: #ffffff !important;
  background-color: #ffffff !important;
  padding: 100px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-ba-section .section-header-centered {
  text-align: center !important;
  max-width: 900px !important;
  margin: 0 auto 50px auto !important;
  padding: 0 20px !important;
}

.zionic-ba-section .luxury-kicker {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #71717a !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.zionic-ba-section .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 3.8vw, 48px) !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 16px 0 !important;
  text-transform: uppercase !important;
}

.zionic-ba-section .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 18.5px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 800px !important;
}

.zionic-split-results-layout {
  display: grid !important;
  grid-template-columns: 46% 54% !important;
  gap: 36px !important;
  align-items: stretch !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 991px) {
  .zionic-split-results-layout {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
}

.zionic-horizontal-compare-viewport {
  position: relative !important;
  width: 100% !important;
  height: 100% !important;
  min-height: 520px !important;
  background: #111111 !important;
  overflow: hidden !important;
  border: 1px solid #e4e4e7 !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08) !important;
  user-select: none !important;
  cursor: ew-resize !important;
}

.case-selector-grid,
.zionic-case-tiles-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 16px !important;
  height: 100% !important;
  align-content: stretch !important;
}

@media (max-width: 576px) {
  .case-selector-grid,
  .zionic-case-tiles-grid {
    grid-template-columns: 1fr !important;
  }
}

.case-selector-card,
.zionic-case-tile {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 24px 22px !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  cursor: pointer !important;
  transition: all 0.25s ease !important;
  box-sizing: border-box !important;
}

.case-selector-card:hover,
.zionic-case-tile:hover {
  border-color: #111111 !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06) !important;
  transform: translateY(-2px) !important;
}

.case-selector-card.active,
.zionic-case-tile.active {
  background: #111111 !important;
  border-color: #111111 !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
}

.case-card-top {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  margin-bottom: 14px !important;
}

.case-card-num {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  border: 1px solid #d4d4d8 !important;
  padding: 4px 10px !important;
  border-radius: 0 !important;
}

.case-selector-card.active .case-card-num,
.zionic-case-tile.active .case-card-num {
  background: #27272a !important;
  color: #ffffff !important;
  border-color: #3f3f46 !important;
}

.case-card-sessions {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  border: 1px solid #d4d4d8 !important;
  padding: 4px 10px !important;
  border-radius: 0 !important;
  text-transform: uppercase !important;
}

.case-selector-card.active .case-card-sessions,
.zionic-case-tile.active .case-card-sessions {
  background: #27272a !important;
  color: #ffffff !important;
  border-color: #3f3f46 !important;
}

.case-card-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 8px 0 !important;
  line-height: 1.3 !important;
}

.case-selector-card.active .case-card-title,
.zionic-case-tile.active .case-card-title {
  color: #ffffff !important;
}

.case-card-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  color: #52525b !important;
  line-height: 1.55 !important;
  margin: 0 !important;
}

.case-selector-card.active .case-card-desc,
.zionic-case-tile.active .case-card-desc {
  color: #d4d4d8 !important;
}
`;

// Replace in custom.css
const markerBA = '/* ==========================================================================\n   ZIONIC B&A RESULTS SECTION';
if (css.includes(markerBA)) {
  const nextMarker = '/* ==========================================================================\n   ZIONIC 5 REASONS';
  const before = css.substring(0, css.indexOf(markerBA));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + baSectionWhiteCss + '\n\n' + after;
} else {
  css += '\n' + baSectionWhiteCss;
}

// Also ensure in bulletproof reset section .zionic-ba-section has background: #ffffff !important;
css = css.replace(/\.zionic-ba-section\s*\{\s*position:\s*relative\s*!important;\s*z-index:\s*13\s*!important;\s*background:\s*#111111\s*!important;\s*\}/g, '.zionic-ba-section {\n  position: relative !important;\n  z-index: 13 !important;\n  background: #ffffff !important;\n}');

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully set B&A Results section background to pure white with high-contrast active cards!');

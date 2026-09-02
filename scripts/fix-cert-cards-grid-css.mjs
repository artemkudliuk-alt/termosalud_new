import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const certCardsCss = `
/* ==========================================================================
   ZIONIC CERTIFICATES 4-COLUMN LUXURY GRID
   ========================================================================== */
.zionic-certificates-section {
  position: relative !important;
  z-index: 20 !important;
  background: #f4f4f5 !important;
  padding: 100px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-certificates-section .section-header-centered {
  text-align: center !important;
  max-width: 900px !important;
  margin: 0 auto 50px auto !important;
  padding: 0 20px !important;
}

.zionic-certificates-section .luxury-kicker {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #71717a !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.zionic-certificates-section .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 3.8vw, 48px) !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 16px 0 !important;
  text-transform: uppercase !important;
}

.zionic-certificates-section .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 18.5px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 800px !important;
}

.zionic-cert-cards-grid {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 24px !important;
  max-width: 1400px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 1199px) {
  .zionic-cert-cards-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 576px) {
  .zionic-cert-cards-grid {
    grid-template-columns: 1fr !important;
  }
}

.zionic-cert-card {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 36px 30px !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  transition: all 0.3s ease !important;
  box-sizing: border-box !important;
}

.zionic-cert-card:hover {
  border-color: #111111 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06) !important;
}

.cert-card-badge {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12.5px !important;
  font-weight: 900 !important;
  letter-spacing: 1px !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  padding: 6px 14px !important;
  margin-bottom: 20px !important;
  width: fit-content !important;
  border: 1px solid #d4d4d8 !important;
}

.cert-card-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 12px 0 !important;
  line-height: 1.3 !important;
}

.cert-card-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}
`;

const markerCert = '/* ==========================================================================\n   ZIONIC CERTIFICATES 4-COLUMN';
if (css.includes(markerCert)) {
  const nextMarker = '/* ==========================================================================\n   BULLETPROOF ZERO-BLEED';
  const before = css.substring(0, css.indexOf(markerCert));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + certCardsCss + '\n\n' + after;
} else {
  css += '\n' + certCardsCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully added styles for .zionic-cert-cards-grid and .zionic-cert-card!');

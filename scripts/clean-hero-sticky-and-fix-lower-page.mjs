import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Replace all sticky/fixed occurrences for hero
css = css.replace(/\.zionic-official-hero\s*\{[\s\S]*?position:\s*(sticky|fixed)[^;]*;[\s\S]*?\}/g, (match) => {
  return match.replace(/position:\s*(sticky|fixed)\s*!important;/g, 'position: relative !important;')
              .replace(/position:\s*(sticky|fixed);/g, 'position: relative;');
});

// Also replace any standalone sticky rules affecting hero
css = css.replace(/position:\s*sticky\s*!important;\s*top:\s*0\s*!important;\s*z-index:\s*1\s*!important;/g, 'position: relative !important; z-index: 2 !important;');

// Now append a bulletproof, definitive reset at the very bottom of custom.css
const bulletproofResetCss = `
/* ==========================================================================
   BULLETPROOF ZERO-BLEED FLOW RESET FOR ZIONIC PAGE
   ========================================================================== */
.zionic-official-hero {
  position: relative !important;
  top: auto !important;
  bottom: auto !important;
  left: auto !important;
  right: auto !important;
  z-index: 2 !important;
  width: 100% !important;
  height: 90vh !important;
  min-height: 650px !important;
  max-height: 850px !important;
  overflow: hidden !important;
  background: #111111 !important;
}

.zionic-official-hero video,
.zionic-official-hero .hero-video-bg {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  pointer-events: none !important;
}

.zionic-infinite-ticker-section {
  position: relative !important;
  z-index: 10 !important;
  background: #111111 !important;
}

.zionic-tech-bento-section {
  position: relative !important;
  z-index: 11 !important;
  background: #ffffff !important;
}

.zionic-manipula-fullscreen-section {
  position: relative !important;
  z-index: 12 !important;
  background: #ffffff !important;
}

.zionic-ba-section {
  position: relative !important;
  z-index: 13 !important;
  background: #111111 !important;
}

.zionic-procedure-showcase-section {
  position: relative !important;
  z-index: 14 !important;
  background: #ffffff !important;
}

.zionic-treatments-fullscreen-section {
  position: relative !important;
  z-index: 15 !important;
  background: #ffffff !important;
}

.zionic-matrix-section {
  position: relative !important;
  z-index: 16 !important;
  background: #ffffff !important;
}

.zionic-video-fullscreen-banner {
  position: relative !important;
  z-index: 17 !important;
  background: #111111 !important;
}

.zionic-partner-stage-section {
  position: relative !important;
  z-index: 18 !important;
  background: #f4f4f5 !important;
}

.zionic-faq-section {
  position: relative !important;
  z-index: 19 !important;
  background: #ffffff !important;
}

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

.certificates-luxury-grid {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 24px !important;
  max-width: 1400px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 1199px) {
  .certificates-luxury-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 576px) {
  .certificates-luxury-grid {
    grid-template-columns: 1fr !important;
  }
}

.certificate-card {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 32px 28px !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  transition: all 0.3s ease !important;
  box-sizing: border-box !important;
}

.certificate-card:hover {
  border-color: #111111 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06) !important;
}

.cert-badge-tag {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 900 !important;
  letter-spacing: 1px !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  padding: 6px 12px !important;
  margin-bottom: 20px !important;
  width: fit-content !important;
  border: 1px solid #d4d4d8 !important;
}

.certificate-card h4 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 12px 0 !important;
  line-height: 1.3 !important;
}

.certificate-card p {
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.zionic-seo-clean-section {
  position: relative !important;
  z-index: 21 !important;
  background: #ffffff !important;
  padding: 90px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-seo-clean-section h2 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(28px, 3vw, 36px) !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin-bottom: 24px !important;
  line-height: 1.25 !important;
}

.zionic-seo-clean-section h3 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  margin: 32px 0 16px 0 !important;
  line-height: 1.3 !important;
}

.zionic-seo-clean-section p {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #52525b !important;
  line-height: 1.7 !important;
  margin-bottom: 18px !important;
}

.footer {
  position: relative !important;
  z-index: 25 !important;
  background: #111111 !important;
  width: 100% !important;
}
`;

const markerReset = '/* ==========================================================================\n   BULLETPROOF ZERO-BLEED FLOW RESET';
if (css.includes(markerReset)) {
  css = css.substring(0, css.indexOf(markerReset)) + bulletproofResetCss;
} else {
  css += '\n' + bulletproofResetCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully eliminated all sticky bleed-throughs and set definitive opaque z-index layers for lower page!');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const curtainAndPkgCss = `
/* ==========================================================================
   LINFOPRESS STRICT CURTAIN STAGE: SCREEN 2 SLIDES OVER SCREEN 1 ONLY
   ========================================================================== */
.linfopress-hero-curtain-track {
  position: relative !important;
  width: 100% !important;
}

@media (min-width: 992px) {
  .linfopress-hero-curtain-track {
    position: relative !important;
    width: 100% !important;
  }
  
  /* Sticky only within .linfopress-hero-curtain-track */
  .linfopress-hero-curtain-track .linfopress-hero-stage {
    position: -webkit-sticky !important;
    position: sticky !important;
    top: 0px !important;
    z-index: 1 !important;
    width: 100% !important;
    height: 100vh !important;
    min-height: 700px !important;
    overflow: hidden !important;
  }

  /* Screen 2 slides up over Screen 1 like a curtain */
  .linfopress-hero-curtain-track .linfopress-infinite-ticker-section {
    position: relative !important;
    z-index: 10 !important;
    box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
  }
}

/* Ensure ALL sections after the curtain track have normal document flow and solid backgrounds */
.linfopress-tech-bento-section,
.linfopress-procedure-section,
.linfopress-advantages-grid-section,
.linfopress-matrix-section,
.linfopress-doctor-section,
.linfopress-why-section,
.linfopress-package-section,
.linfopress-faq-section,
.linfopress-partner-stage-section {
  position: relative !important;
  z-index: 20 !important;
}

/* ==========================================================================
   LINFOPRESS PACKAGE SECTION STYLING
   ========================================================================== */
.linfopress-package-section {
  background: #ffffff !important;
  padding: 80px 0 90px 0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

.linfopress-package-section .linfopress-package-box {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 20px !important;
  padding: 50px 40px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
}

.linfopress-package-section .package-header {
  text-align: center !important;
  margin-bottom: 40px !important;
}

.linfopress-package-section .package-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(26px, 2.6vw, 34px) !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  margin: 0 0 12px 0 !important;
}

.linfopress-package-section .package-subtitle {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #64748b !important;
  max-width: 600px !important;
  margin: 0 auto !important;
}

.linfopress-package-section .package-items-grid {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 20px !important;
}

.linfopress-package-section .package-item-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 14px !important;
  padding: 20px 16px !important;
  text-align: center !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: flex-start !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease !important;
}

.linfopress-package-section .package-item-card:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08) !important;
}

.linfopress-package-section .package-img-wrap {
  width: 100% !important;
  height: 140px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-bottom: 16px !important;
}

.linfopress-package-section .package-img-wrap img {
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
}

.linfopress-package-section .package-item-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #1e293b !important;
  line-height: 1.4 !important;
  margin: 0 !important;
}

@media (max-width: 991px) {
  .linfopress-package-section .package-items-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 575px) {
  .linfopress-package-section .package-items-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

css += '\n' + curtainAndPkgCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully saved curtain and package styles in custom.css!');

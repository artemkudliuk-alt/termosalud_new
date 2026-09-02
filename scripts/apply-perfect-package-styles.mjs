import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const finalPackageCss = `
/* ==========================================================================
   LINFOPRESS PACKAGE SECTION - PERFECT DARK FULL-WIDTH SHOWCASE
   ========================================================================== */
.linfopress-package-section {
  background: #090d14 !important; /* DARK LUXURY OBSIDIAN BACKGROUND */
  padding: 95px 0 110px 0 !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  position: relative !important;
  z-index: 20 !important;
  width: 100% !important;
}

.linfopress-package-section .package-container {
  max-width: 1440px !important;
  padding: 0 32px !important;
  margin: 0 auto !important;
}

.linfopress-package-section .package-header {
  text-align: center !important;
  margin-bottom: 54px !important;
}

html body.template-linfopress section#package h2.package-title,
html body.template-linfopress section#package h2,
html body.template-linfopress section#package .package-title,
html body.template-linfopress .linfopress-package-section h2.package-title,
html body.template-linfopress .linfopress-package-section h2,
.package-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(34px, 3.8vw, 48px) !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  text-align: center !important;
  margin: 0 auto 16px auto !important;
  text-transform: none !important;
  letter-spacing: -0.5px !important;
  display: block !important;
}

.linfopress-package-section .package-subtitle {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: #94a3b8 !important;
  max-width: 680px !important;
  margin: 0 auto !important;
  text-align: center !important;
}

/* 5 CARDS IN CRISP BLACK FRAMES STRETCHED */
.linfopress-package-section .package-items-grid {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 20px !important;
  width: 100% !important;
}

.linfopress-package-section .package-item-card {
  background: #111622 !important;
  border: 1.5px solid #1e293b !important; /* CRISP BLACK / DEEP GRAPHITE FRAME */
  border-radius: 0px !important; /* STRICT 0PX SHARP CORNERS */
  padding: 24px 18px 26px 18px !important;
  text-align: center !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: space-between !important;
  min-height: 290px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease !important;
}

.linfopress-package-section .package-item-card:hover {
  transform: translateY(-4px) !important;
  border-color: #54595f !important;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6) !important;
}

/* INNER DISPLAY WRAPPER */
.linfopress-package-section .package-img-wrap {
  width: 100% !important;
  height: 180px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-bottom: 20px !important;
  background: #ffffff !important; /* SEAMLESS CLEAN PRODUCT BACKGROUND */
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 0px !important;
  padding: 14px !important;
}

.linfopress-package-section .package-img-wrap img {
  max-width: 100% !important;
  max-height: 100% !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  transition: transform 0.3s ease !important;
}

.linfopress-package-section .package-item-card:hover .package-img-wrap img {
  transform: scale(1.06) !important;
}

.linfopress-package-section .package-item-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  line-height: 1.4 !important;
  margin: 0 !important;
  text-align: center !important;
}

@media (max-width: 1199px) {
  .linfopress-package-section .package-items-grid {
    grid-template-columns: repeat(3, 1fr) !important;
  }
}

@media (max-width: 767px) {
  .linfopress-package-section .package-items-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 480px) {
  .linfopress-package-section .package-items-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

css += '\n' + finalPackageCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully saved perfected package styles in custom.css!');

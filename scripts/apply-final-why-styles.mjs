import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const finalWhyStyles = `
/* ==========================================================================
   LINFOPRESS WHY SECTION - SIGNATURE FOOTER GRAY (#54595f) ADAPTATION
   ========================================================================== */
.linfopress-why-section {
  position: relative !important;
  z-index: 16 !important;
  width: 100% !important;
  background: #f0f3f6 !important;
  padding: 90px 0 80px 0 !important;
  overflow: hidden !important;
}

.linfopress-why-section .why-this-video-bg {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
  background: #f0f3f6 !important;
}

.linfopress-why-section .why-bg-video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  opacity: 0.12 !important;
}

.linfopress-why-section .why-video-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(180deg, rgba(240, 243, 246, 0.88) 0%, rgba(240, 243, 246, 0.96) 100%) !important;
}

.linfopress-why-section .why-inner-container {
  position: relative !important;
  z-index: 2 !important;
  max-width: 1440px !important;
  padding: 0 32px !important;
  margin: 0 auto !important;
}

/* Title: Natural case "Чому саме Linfopress Evolution PRO", Centered */
html body.template-linfopress .linfopress-why-section h2.why-main-title,
html body.template-linfopress .linfopress-why-section h2,
html body.template-linfopress .why-main-title,
.why-main-title {
  font-family: 'Montserrat', 'Golos Text', sans-serif !important;
  font-size: clamp(34px, 3.8vw, 48px) !important;
  font-weight: 700 !important;
  line-height: 1.22 !important;
  letter-spacing: -0.5px !important;
  color: #111827 !important;
  text-align: center !important;
  margin: 0 auto 52px auto !important;
  text-transform: none !important;
  display: block !important;
}

.linfopress-why-section .why-showcase-row {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 48px !important;
}

.linfopress-why-section .why-model-col {
  flex: 0 0 38% !important;
  max-width: 440px !important;
  display: flex !important;
  justify-content: center !important;
}

.linfopress-why-section .why-model-img-wrap {
  width: 100% !important;
  max-width: 420px !important;
}

.linfopress-why-section .why-model-img {
  width: 100% !important;
  height: auto !important;
  display: block !important;
  object-fit: contain !important;
  filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.09)) !important;
}

.linfopress-why-section .why-cards-col {
  flex: 1 1 62% !important;
  max-width: 820px !important;
}

.linfopress-why-section .why-cards-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 20px !important;
}

/* CARDS IN OUR SIGNATURE FOOTER GRAY #54595f */
.linfopress-why-section .why-card-item {
  background: #54595f !important; /* EXACT SIGNATURE FOOTER GRAY */
  border: 1.5px solid rgba(255, 255, 255, 0.15) !important;
  border-radius: 14px !important;
  padding: 24px 28px !important;
  min-height: 130px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.14) !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
}

.linfopress-why-section .why-card-item:hover {
  transform: translateY(-3px) !important;
  border-color: #facc15 !important;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22) !important;
}

.linfopress-why-section .why-card-num {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 38px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
  color: #facc15 !important; /* Premium brand yellow */
  margin-bottom: 12px !important;
}

.linfopress-why-section .why-card-text {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 600 !important;
  line-height: 1.45 !important;
  color: #ffffff !important;
  margin: 0 !important;
}

@media (max-width: 991px) {
  .linfopress-why-section .why-showcase-row {
    flex-direction: column !important;
    gap: 30px !important;
  }
  .linfopress-why-section .why-model-col,
  .linfopress-why-section .why-cards-col {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
  .linfopress-why-section .why-cards-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

css += '\n' + finalWhyStyles;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully saved final why styles in custom.css!');

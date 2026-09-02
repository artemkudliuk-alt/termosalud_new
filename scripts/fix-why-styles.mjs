import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const perfectWhyCss = `
/* ==========================================================================
   PERFECT OPAQUE LINFOPRESS WHY SECTION (1-TO-1 USER SCREENSHOT)
   ========================================================================== */
.linfopress-why-section {
  position: relative !important;
  z-index: 16 !important;
  width: 100% !important;
  background: #f0f3f6 !important;
  padding: 100px 0 90px 0 !important;
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
  opacity: 0.1 !important;
}

.linfopress-why-section .why-video-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: #f0f3f6 !important;
  opacity: 0.8 !important;
}

.linfopress-why-section .why-inner-container {
  position: relative !important;
  z-index: 2 !important;
  max-width: 1440px !important;
  padding: 0 32px !important;
  margin: 0 auto !important;
}

html body.template-linfopress .linfopress-why-section h2.why-main-title,
html body.template-linfopress .why-main-title,
.why-main-title {
  font-family: 'Montserrat', 'Golos Text', sans-serif !important;
  font-size: clamp(34px, 3.6vw, 48px) !important;
  font-weight: 700 !important;
  line-height: 1.25 !important;
  letter-spacing: -0.5px !important;
  color: #111827 !important;
  text-align: center !important;
  margin: 0 auto 50px auto !important;
  text-transform: none !important;
  display: block !important;
}

.linfopress-why-section .why-showcase-row {
  display: flex !important;
  align-items: center !important;
  gap: 48px !important;
}

.linfopress-why-section .why-model-col {
  flex: 0 0 36% !important;
  max-width: 36% !important;
  display: flex !important;
  justify-content: center !important;
}

.linfopress-why-section .why-model-img-wrap {
  width: 100% !important;
  max-width: 440px !important;
}

.linfopress-why-section .why-model-img {
  width: 100% !important;
  height: auto !important;
  display: block !important;
  object-fit: contain !important;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.08)) !important;
}

.linfopress-why-section .why-cards-col {
  flex: 1 1 64% !important;
  max-width: 64% !important;
}

.linfopress-why-section .why-cards-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 20px !important;
}

.linfopress-why-section .why-card-item {
  background: #181d26 !important;
  border-radius: 14px !important;
  padding: 26px 28px !important;
  min-height: 130px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18) !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease !important;
}

.linfopress-why-section .why-card-item:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.25) !important;
}

.linfopress-why-section .why-card-num {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 36px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
  color: #ffeb3b !important;
  margin-bottom: 12px !important;
}

.linfopress-why-section .why-card-text {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 600 !important;
  line-height: 1.45 !important;
  color: #ffffff !important;
}
`;

css += '\n' + perfectWhyCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written perfect why section styles!');

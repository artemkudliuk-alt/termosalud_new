import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const partnerCleanBackgroundCss = `
/* ==========================================================================
   ZIONIC PARTNER & PRESENTATION STAGE - CLEAN NATIVE FORM (NO WHITE BOX PLATE)
   ========================================================================== */
.zionic-partner-stage-section {
  position: relative !important;
  z-index: 18 !important;
  background: #f4f4f5 !important;
  padding: 100px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

/* Header spacing */
.zionic-partner-stage-section .presentation-header {
  text-align: center !important;
  max-width: 980px !important;
  margin: 0 auto 50px auto !important;
  padding: 0 20px !important;
}

.zionic-partner-stage-section .luxury-kicker {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #71717a !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.zionic-partner-stage-section .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 3.8vw, 48px) !important;
  font-weight: 900 !important;
  color: #111111 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 16px 0 !important;
  text-transform: uppercase !important;
}

.zionic-partner-stage-section .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 19px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 860px !important;
}

/* Grid */
.zionic-partner-stage-section .presentation-stage-grid {
  display: grid !important;
  grid-template-columns: 48% 52% !important;
  gap: 40px !important;
  align-items: flex-start !important;
  max-width: 1400px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 991px) {
  .zionic-partner-stage-section .presentation-stage-grid {
    grid-template-columns: 1fr !important;
    gap: 36px !important;
  }
}

/* Left Visual Column */
.zionic-partner-stage-section .presentation-visual-col {
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
}

.zionic-partner-stage-section .presentation-photo-frame {
  position: relative !important;
  width: 100% !important;
  height: 340px !important;
  min-height: 340px !important;
  overflow: hidden !important;
  border: 1px solid #e4e4e7 !important;
  background: #ffffff !important;
  margin-bottom: 0 !important;
}

.zionic-partner-stage-section .presentation-photo-frame .presentation-showcase-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  display: block;
}

.partner-guarantees-stack {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
}

.guarantees-head-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 10px 0 12px 0 !important;
  padding-left: 68px !important; /* Exactly aligned with the headings in the text */
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
}

@media (max-width: 576px) {
  .guarantees-head-title {
    padding-left: 0 !important;
  }
}

.guarantee-item-row {
  display: flex !important;
  align-items: flex-start !important;
  gap: 16px !important;
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 16px 20px !important;
  border-radius: 0 !important;
  transition: all 0.25s ease !important;
}

.guarantee-item-row:hover {
  border-color: #27272a !important;
  transform: translateX(4px) !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05) !important;
}

.guarantee-num {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  border: 1px solid #d4d4d8 !important;
  width: 32px !important;
  height: 32px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.guarantee-text strong {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  margin-bottom: 4px !important;
}

.guarantee-text span {
  display: block !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 14.5px !important;
  color: #52525b !important;
  line-height: 1.55 !important;
}

/* Right Form Column - NATIVE FORM WITHOUT WHITE BOX PLATE */
.zionic-partner-stage-section .presentation-form-col {
  display: flex !important;
  flex-direction: column !important;
}

.zionic-partner-stage-section .presentation-form-card {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 0 !important;
  box-shadow: none !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  gap: 20px !important;
  box-sizing: border-box !important;
}

.zionic-partner-stage-section .form-card-header {
  margin-bottom: 0 !important;
}

.zionic-partner-stage-section .partner-card-kicker {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1.5px !important;
  color: #71717a !important;
  text-transform: uppercase !important;
  margin-bottom: 6px !important;
}

.zionic-partner-stage-section .form-card-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 10px 0 !important;
  line-height: 1.25 !important;
  letter-spacing: -0.3px !important;
}

.zionic-partner-stage-section .form-card-subtitle {
  font-family: 'Inter', sans-serif !important;
  font-size: 15.5px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.zionic-partner-stage-section .presentation-open-form {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
  margin-top: 4px !important;
}

.zionic-partner-stage-section .form-group-item {
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
}

.zionic-partner-stage-section .form-label-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12.5px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.8px !important;
}

.zionic-partner-stage-section .luxury-form-input {
  font-family: 'Inter', sans-serif !important;
  font-size: 15.5px !important;
  padding: 14px 16px 14px 44px !important;
  background: #ffffff !important;
  border: 1px solid #d4d4d8 !important;
  color: #111111 !important;
  border-radius: 0 !important;
  transition: all 0.25s ease !important;
}

.zionic-partner-stage-section .luxury-form-input:focus {
  border-color: #111111 !important;
  outline: none !important;
  box-shadow: 0 0 0 2px rgba(17, 17, 17, 0.1) !important;
}

.zionic-partner-stage-section .messenger-pills-row {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 10px !important;
}

.zionic-partner-stage-section .messenger-pill {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 8px !important;
  padding: 12px 14px !important;
  background: #ffffff !important;
  border: 1px solid #d4d4d8 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  cursor: pointer !important;
  border-radius: 0 !important;
  transition: all 0.2s ease !important;
}

.zionic-partner-stage-section .messenger-pill.active,
.zionic-partner-stage-section .messenger-pill:hover {
  border-color: #111111 !important;
  background: #ffffff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
}

.zionic-partner-stage-section .submit-presentation-btn {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px !important;
  background: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #111111 !important;
  padding: 17px 28px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  font-weight: 900 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  border-radius: 0 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  margin-top: 6px !important;
}

.zionic-partner-stage-section .submit-presentation-btn:hover {
  background: #ffffff !important;
  color: #111111 !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
}

.zionic-partner-stage-section .form-privacy-note {
  font-family: 'Inter', sans-serif !important;
  font-size: 12.5px !important;
  color: #71717a !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}
`;

const markerP = '/* ==========================================================================\n   ZIONIC PARTNER & PRESENTATION STAGE';
if (css.includes(markerP)) {
  const nextMarker = '/* ==========================================================================\n   ZIONIC FAQ';
  const before = css.substring(0, css.indexOf(markerP));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + partnerCleanBackgroundCss + '\n\n' + after;
} else {
  css += '\n' + partnerCleanBackgroundCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully removed white box plate from form card!');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const partnerCss = `
/* ==========================================================================
   EXACT PARTNER SECTION STYLES (MATCHING SCREENSHOT)
   ========================================================================== */
.exact-partner-section {
  padding: 85px 0 95px 0 !important;
  background: #ffffff !important;
}

html body.template-zionic .exact-partner-title,
.exact-partner-title {
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(32px, 3.5vw, 46px) !important;
  font-weight: 800 !important;
  text-transform: none !important;
  margin: 0 auto !important;
  text-align: center !important;
}

.exact-partner-split-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 48px !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  align-items: start !important;
}

/* Left Form Card */
.exact-partner-form-card {
  background: #181a1f !important;
  border-radius: 12px !important;
  padding: 40px 36px !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2) !important;
}

.exact-partner-form-lead {
  color: #f1f5f9 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.55 !important;
  font-weight: 500 !important;
  margin-bottom: 24px !important;
}

.exact-form-group {
  margin-bottom: 14px !important;
}

.exact-form-input {
  width: 100% !important;
  background: #474f5d !important;
  border: 1px solid #5a6475 !important;
  border-radius: 6px !important;
  padding: 14px 18px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  color: #ffffff !important;
  outline: none !important;
  transition: border-color 0.2s ease, background 0.2s ease !important;
}

.exact-form-input::placeholder {
  color: #cbd5e1 !important;
}

.exact-form-input:focus {
  border-color: #38bdf8 !important;
  background: #4f5867 !important;
}

.exact-messengers-row {
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
  margin: 16px 0 !important;
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
}

.exact-msg-label {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  cursor: pointer !important;
  user-select: none !important;
}

.exact-msg-check {
  accent-color: #38bdf8 !important;
  width: 16px !important;
  height: 16px !important;
  cursor: pointer !important;
}

.exact-form-submit-btn {
  width: 100% !important;
  max-width: 240px !important;
  background: #5eead4 !important;
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  padding: 14px 24px !important;
  border: none !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  margin-top: 20px !important;
  transition: background 0.2s ease, transform 0.2s ease !important;
}

.exact-form-submit-btn:hover {
  background: #2dd4bf !important;
  transform: translateY(-2px) !important;
}

/* Right Column: 5 Partnership Blocks */
.exact-blocks-header {
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 800 !important;
  margin: 0 0 24px 0 !important;
  line-height: 1.3 !important;
}

.exact-blocks-stack {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}

.exact-block-item {
  background: #1e2430 !important;
  border-radius: 10px !important;
  padding: 22px 24px !important;
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}

.exact-block-item:hover {
  transform: translateX(4px) !important;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12) !important;
}

.exact-block-num {
  color: #38bdf8 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
}

.exact-block-text {
  color: #f1f5f9 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.5 !important;
  font-weight: 500 !important;
  margin: 0 !important;
}

@media (max-width: 991px) {
  .exact-partner-split-grid {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }
}
`;

css += '\n' + partnerCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully appended partner styles to custom.css');

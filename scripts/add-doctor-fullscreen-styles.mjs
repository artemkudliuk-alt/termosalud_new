import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const docFullscreenCss = `
/* ==========================================================================
   LINFOPRESS DOCTOR CLINICAL REVIEW FULLSCREEN SHOWCASE
   ========================================================================== */
.linfopress-doctor-section {
  position: relative !important;
  z-index: 15 !important;
  width: 100% !important;
  background: #f8fafc !important;
  padding: 80px 0 0 0 !important;
  overflow: hidden !important;
}

.linfopress-doctor-section .doctor-header-container {
  margin-bottom: 36px !important;
}

.linfopress-doctor-fullscreen-stage {
  position: relative !important;
  width: 100% !important;
  min-height: 640px !important;
  display: flex !important;
  align-items: center !important;
  overflow: hidden !important;
  border-top: 1px solid #e2e8f0 !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

.linfopress-doctor-fullscreen-stage .doctor-bg-media-wrap {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
}

.linfopress-doctor-fullscreen-stage .doctor-bg-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: 80% center !important;
  display: block !important;
}

/* GRADIENT ON LEFT THIRD/HALF - LIGHTENS TO PURE WHITE/LIGHT FOR MAXIMUM READABILITY */
.linfopress-doctor-fullscreen-stage .doctor-bg-gradient-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.98) 32%,
    rgba(255, 255, 255, 0.92) 46%,
    rgba(255, 255, 255, 0.75) 58%,
    rgba(255, 255, 255, 0.25) 74%,
    rgba(255, 255, 255, 0) 100%
  ) !important;
  pointer-events: none !important;
}

.doctor-fullscreen-container {
  position: relative !important;
  z-index: 2 !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
  padding: 64px 32px !important;
  width: 100% !important;
}

.doctor-fullscreen-content {
  max-width: 660px !important;
  text-align: left !important;
}

.doctor-quote-badge {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  background: rgba(84, 89, 95, 0.12) !important;
  border: 1px solid rgba(84, 89, 95, 0.3) !important;
  padding: 6px 14px !important;
  border-radius: 9999px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.8px !important;
  color: #1e293b !important;
  margin-bottom: 24px !important;
  text-transform: uppercase !important;
}

.doctor-badge-dot {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
  background: #facc15 !important;
}

.doctor-statement-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(22px, 2.2vw, 29px) !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  color: #0f172a !important;
  margin: 0 0 22px 0 !important;
  letter-spacing: -0.3px !important;
}

.doctor-statement-desc {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.72 !important;
  color: #334155 !important;
  margin: 0 0 32px 0 !important;
}

.doctor-author-profile {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
  padding-top: 18px !important;
  border-top: 1px solid rgba(84, 89, 95, 0.22) !important;
}

.doctor-author-avatar {
  width: 62px !important;
  height: 62px !important;
  border-radius: 50% !important;
  overflow: hidden !important;
  border: 2px solid #54595f !important;
  flex-shrink: 0 !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
}

.author-avatar-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.doctor-author-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  margin: 0 0 4px 0 !important;
}

.doctor-author-title {
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  color: #64748b !important;
  margin: 0 !important;
}

@media (max-width: 991px) {
  .linfopress-doctor-fullscreen-stage {
    min-height: auto !important;
    padding: 60px 0 !important;
  }
  .linfopress-doctor-fullscreen-stage .doctor-bg-gradient-overlay {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.96) 0%,
      rgba(255, 255, 255, 0.92) 75%,
      rgba(255, 255, 255, 0.6) 100%
    ) !important;
  }
  .doctor-fullscreen-content {
    max-width: 100% !important;
  }
}
`;

css += '\n' + docFullscreenCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written doctor fullscreen styles in custom.css!');

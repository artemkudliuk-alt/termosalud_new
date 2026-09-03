import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const doctorLeftShiftCss = `
/* ==========================================================================
   DOCTOR FULLSCREEN STAGE - SHIFT CONTENT TO THE LEFT & REMOVE BADGE
   ========================================================================== */
.linfopress-doctor-fullscreen-stage .doctor-fullscreen-container {
  position: relative !important;
  z-index: 3 !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 80px 40px !important;
  padding-left: clamp(32px, 6vw, 110px) !important;
  box-sizing: border-box !important;
}

.linfopress-doctor-fullscreen-stage .doctor-fullscreen-content {
  max-width: 680px !important;
  text-align: left !important;
}

.linfopress-doctor-fullscreen-stage .doctor-bg-img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: 85% center !important;
  display: block !important;
}

.linfopress-doctor-fullscreen-stage .doctor-bg-gradient-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    rgba(255, 255, 255, 0.98) 30%,
    rgba(255, 255, 255, 0.94) 44%,
    rgba(255, 255, 255, 0.75) 56%,
    rgba(255, 255, 255, 0.2) 72%,
    rgba(255, 255, 255, 0) 100%
  ) !important;
  pointer-events: none !important;
}

.linfopress-doctor-fullscreen-stage .doctor-statement-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(22px, 2.2vw, 30px) !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  color: #18181b !important;
  margin: 0 0 20px 0 !important;
}

.linfopress-doctor-fullscreen-stage .doctor-statement-desc {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 400 !important;
  line-height: 1.75 !important;
  color: #27272a !important;
  margin: 0 0 28px 0 !important;
}

.linfopress-doctor-fullscreen-stage .doctor-author-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #18181b !important;
  margin: 0 0 4px 0 !important;
}

.linfopress-doctor-fullscreen-stage .doctor-author-title {
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  color: #54595f !important;
  margin: 0 !important;
}
`;

css += '\n' + doctorLeftShiftCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully applied doctor section left shift and removed badge');

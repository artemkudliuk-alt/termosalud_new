import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const sharpWhyCardStyles = `
/* ==========================================================================
   LINFOPRESS WHY SECTION - MAIN PAGE STYLE (SHARP CORNERS, MONOCHROME)
   ========================================================================== */
.linfopress-why-section .why-card-item {
  background: #ffffff !important;
  border: 1.5px solid #0f172a !important; /* STRICT SHARP FRAME IN MAIN PAGE STYLE */
  border-radius: 0px !important; /* STRICT 0PX SHARP CORNERS */
  padding: 24px 28px !important;
  min-height: 130px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.03) !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
}

.linfopress-why-section .why-card-item:hover {
  transform: translateY(-3px) !important;
  border-color: #0f172a !important;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08) !important;
}

.linfopress-why-section .why-card-num {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 34px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
  color: #0f172a !important; /* REMOVED YELLOW -> SIGNATURE DEEP GRAPHITE */
  margin-bottom: 12px !important;
  letter-spacing: -0.5px !important;
}

.linfopress-why-section .why-card-text {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  line-height: 1.45 !important;
  color: #1e293b !important;
  margin: 0 !important;
}
`;

css += '\n' + sharpWhyCardStyles;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully saved sharp why cards styles in custom.css!');

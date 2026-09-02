import fs from 'fs';

// 1. Clean CSS
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Replace all #fbbf24 with clean white or light zinc #ffffff / #e4e4e7
css = css.replaceAll('#fbbf24', '#ffffff');
css = css.replaceAll('rgba(251, 191, 36, 0.4)', 'rgba(255, 255, 255, 0.3)');
css = css.replaceAll('rgba(251, 191, 36, 0.5)', 'rgba(255, 255, 255, 0.3)');
css = css.replaceAll('rgba(251, 191, 36, 0.6)', 'rgba(255, 255, 255, 0.3)');
css = css.replaceAll('rgba(251, 191, 36, 0.8)', 'rgba(255, 255, 255, 0.5)');
css = css.replaceAll('rgba(251, 191, 36, 0.9)', 'rgba(255, 255, 255, 0.5)');
css = css.replaceAll('rgba(251, 191, 36', 'rgba(255, 255, 255');
css = css.replaceAll('highlight-gold-box', 'highlight-hero-box');

// Full-width edge-to-edge Manipula showcase CSS
const fullWidthManipulaCss = `
/* ==========================================================================
   ZIONIC FULLSCREEN MANIPULA SHOWCASE (100% FULL WIDTH EDGE-TO-EDGE)
   ========================================================================== */
.zionic-manipula-fullscreen-section {
  position: relative !important;
  z-index: 12 !important;
  width: 100% !important;
  max-width: 100vw !important;
  background: #111111 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
  border-top: none !important;
  border-bottom: none !important;
  box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
}

.manipula-fullscreen-wrapper {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
  background: #111111 !important;
}

.manipula-fullscreen-img {
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  max-height: none !important;
  min-height: 0 !important;
  object-fit: cover !important;
  display: block !important;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
}

/* Zero Yellow / Pure Monochrome & Clean White Highlights */
.tech-bento-card:hover {
  border-color: #52525b !important;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.5) !important;
}

.tech-badge-tag {
  background: #111111 !important;
  border: 1px solid #3f3f46 !important;
  color: #ffffff !important;
}

.tech-bento-card:hover .tech-badge-tag {
  border-color: #ffffff !important;
  color: #ffffff !important;
  background: #000000 !important;
}

.tech-bullets-list li .bullet-check {
  color: #ffffff !important;
  text-shadow: none !important;
}

.tech-bullets-list li:hover .bullet-check {
  transform: scale(1.15) !important;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8) !important;
}

.reason-bento-box.highlight-hero-box {
  grid-column: span 2;
  border-color: #3f3f46 !important;
  background: #18181b !important;
}

.trust-pill .trust-check {
  color: #ffffff !important;
}
`;

// Append or update in custom.css
const marker = '/* ==========================================================================\n   ZIONIC FULLSCREEN MANIPULA SHOWCASE';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + fullWidthManipulaCss;
} else {
  css += '\n' + fullWidthManipulaCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// 2. Update process-html.mjs to remove any highlight-gold-box or inline yellow
let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
processCode = processCode.replaceAll('highlight-gold-box', 'highlight-hero-box');
processCode = processCode.replaceAll('#fbbf24', '#ffffff');
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

console.log('Successfully removed ALL yellow/gold colors and made Manipula image 100% full-width edge-to-edge!');

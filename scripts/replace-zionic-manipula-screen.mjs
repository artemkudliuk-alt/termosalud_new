import fs from 'fs';

// 1. Copy image to public and dist folders
const srcImg = 'C:/nextweb/termosalud/ChatGPT Image 2 сент. 2026 г., 21_27_07.png';
fs.copyFileSync(srcImg, 'public/zionic_manipula_official_infographic.png');
fs.copyFileSync(srcImg, 'public/wp-content/uploads/zionic_official/zionic_manipula_full_hq.png');

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// 2. New Section HTML: Full-bleed uncropped screen image filling full width and height
const newManipulaScreenHtml = `      <!-- 3. FULLSCREEN UNCOMPROMISED MANIPULA INFOGRAPHIC SHOWCASE -->
      <section class="zionic-manipula-fullscreen-section" id="manipula">
        <div class="manipula-fullscreen-wrapper">
          <img 
            src="/public/zionic_manipula_official_infographic.png" 
            alt="Технологічна досконалість маніпули Zionic" 
            class="manipula-fullscreen-img"
            loading="lazy"
          >
        </div>
      </section>`;

// Replace old section in process-html.mjs
processCode = processCode.replace(/<section class="zionic-manipula-section"[\s\S]*?<\/section>/i, newManipulaScreenHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 3. Update CSS in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const manipulaFullscreenCss = `
/* ==========================================================================
   ZIONIC FULLSCREEN MANIPULA SHOWCASE (100% FULL WIDTH & HEIGHT UNCOMPROMISED)
   ========================================================================== */
.zionic-manipula-fullscreen-section {
  position: relative !important;
  z-index: 12 !important;
  width: 100% !important;
  background: #111111 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
  border-top: 1px solid #27272a;
  border-bottom: 1px solid #27272a;
  box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
}

.manipula-fullscreen-wrapper {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #111111;
  padding: 0;
}

.manipula-fullscreen-img {
  width: 100% !important;
  height: auto !important;
  min-height: 60vh;
  max-height: 95vh;
  object-fit: contain !important;
  display: block !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

@media (max-width: 991px) {
  .manipula-fullscreen-img {
    min-height: auto;
    max-height: none;
  }
}
`;

// Append or update in custom.css
const marker = '/* ==========================================================================\n   ZIONIC FULLSCREEN MANIPULA SHOWCASE';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + manipulaFullscreenCss;
} else {
  css += '\n' + manipulaFullscreenCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully replaced manipula section with full-width/height uncropped infographic image!');

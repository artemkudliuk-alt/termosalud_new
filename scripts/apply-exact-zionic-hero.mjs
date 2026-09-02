import fs from 'fs';

// 1. Update process-html.mjs for Zionic
let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const zionicHero = `      <section class="zionic-official-hero">
        <div class="zionic-hero-bg-media">
          <video autoplay loop muted playsinline class="zionic-hero-bg-video" preload="auto">
            <source src="/zionic.mp4" type="video/mp4">
          </video>
          <div class="zionic-hero-overlay"></div>
        </div>

        <div class="container zionic-hero-container">
          <div class="zionic-hero-content">
            <div class="zionic-hero-logo-wrap">
              <img src="/wp-content/themes/zionic/assets/images/zionic.svg" alt="Zionic" class="zionic-official-logo" width="180" height="38">
            </div>

            <h1 class="zionic-hero-title">
              <span>РЕЗИСТИВНИЙ</span>
              <span>РАДІОЧАСТОТНИЙ</span>
              <span>РОТАЦІЙНИЙ</span>
              <span>ГЛИБОКИЙ</span>
              <span>МАСАЖ</span>
            </h1>

            <p class="zionic-hero-subtitle">
              Перший апарат, що поєднує технологію активного глибокого ротаційного масажу (MARP) з резистивною радіочастотою для корекції фігури.
            </p>

            <div class="zionic-hero-actions">
              <a href="#test-drive" class="zionic-btn-link-action">
                <span>Замовити презентацію</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button type="button" class="zionic-btn-video-badge js-open-video-lightbox" data-video-id="CYsDii-PZ7s">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Відео процедури</span>
              </button>
            </div>
          </div>
        </div>
      </section>`;

const zionicStart = processCode.indexOf("if (pageName === 'zionic') {");
const zionicEnd = processCode.indexOf("if (pageName === 'linfopress')", zionicStart);

const newZionicBlock = `if (pageName === 'zionic') {
    const modernZionicHtml = \`
${zionicHero}
    \`;

    // Replace the inner content of zionic page (keeping only Hero and Footer)
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="zionic-main-page-wrapper">\\n\${modernZionicHtml}\\n</div>\\n\`);
  }

  `;

processCode = processCode.substring(0, zionicStart) + newZionicBlock + processCode.substring(zionicEnd);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. Add styles to custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const zionicHeroCss = `
/* ZIONIC HERO EXACT SCREENSHOT STYLES */
.zionic-official-hero {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 72px);
  min-height: calc(100dvh - 72px);
  display: flex;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

.zionic-hero-bg-media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.zionic-hero-bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.zionic-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 2;
  pointer-events: none;
}

.zionic-hero-container {
  position: relative;
  z-index: 3;
  width: 100%;
}

.zionic-hero-content {
  max-width: 680px;
  margin-left: clamp(10px, 3vw, 40px);
}

.zionic-hero-logo-wrap {
  margin-bottom: 24px;
}

.zionic-official-logo {
  height: clamp(38px, 3.8vw, 54px);
  width: auto;
  display: block;
}

.zionic-hero-title {
  display: flex !important;
  flex-direction: column !important;
  font-family: 'Montserrat', 'Golos Text', sans-serif !important;
  font-size: clamp(34px, 4vw, 58px) !important;
  font-weight: 900 !important;
  line-height: 1.05 !important;
  letter-spacing: -0.5px !important;
  color: #1e293b !important;
  text-transform: uppercase !important;
  margin: 0 0 16px 0 !important;
}

.zionic-hero-title span {
  display: block;
  color: #1e293b !important;
}

.zionic-hero-subtitle {
  font-family: 'Inter', sans-serif !important;
  font-size: clamp(13px, 1.2vw, 15px) !important;
  font-weight: 500 !important;
  color: #334155 !important;
  line-height: 1.5 !important;
  max-width: 520px !important;
  margin: 0 0 24px 0 !important;
}

.zionic-hero-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.zionic-btn-link-action {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.zionic-btn-link-action:hover {
  opacity: 0.8;
  transform: translateX(2px);
}

.zionic-btn-video-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #0f172a;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s ease;
}

.zionic-btn-video-badge:hover {
  background: #0f172a;
  color: #ffffff;
}
`;

css += '\n' + zionicHeroCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Applied exact Zionic Hero styling & structure.');

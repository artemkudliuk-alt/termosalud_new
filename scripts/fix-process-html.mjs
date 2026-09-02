import fs from 'fs';

// Let's reset process-html.mjs to git head
import { execSync } from 'child_process';
execSync('git checkout scripts/process-html.mjs');

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Hero section for Zionic
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
              <img src="/wp-content/themes/zionic/assets/images/logo-zionic.svg" alt="ZIONIC Medical & Aesthetic" class="zionic-official-logo" width="220" height="42">
            </div>
            
            <h1 class="zionic-hero-title">
              <span class="title-top">РЕЗИСТИВНИЙ РАДІОЧАСТОТНИЙ</span>
              <span class="title-bottom">РОТАЦІЙНИЙ ГЛИБОКИЙ МАСАЖ</span>
            </h1>

            <p class="zionic-hero-subtitle">
              Перший апарат, що поєднує технологію активного глибокого ротаційного масажу (MARP) з резистивною радіочастотою для корекції фігури.
            </p>

            <div class="zionic-hero-actions">
              <a href="#test-drive" class="zionic-btn-primary">
                <span>Замовити презентацію</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button type="button" class="zionic-btn-secondary js-open-video-lightbox" data-video-id="K1v77enueJ8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Відео процедури</span>
              </button>
            </div>
          </div>
        </div>
      </section>`;

// Replace zionic block in processCode
const zionicStart = processCode.indexOf("if (pageName === 'zionic') {");
const zionicEnd = processCode.indexOf("if (pageName === 'linfopress')", zionicStart);

const newZionicBlock = `if (pageName === 'zionic') {
    const modernZionicHtml = \`
${zionicHero}
    \`;

    // Replace inner content of zionic page (Hero + Footer only)
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="zionic-main-page-wrapper">\\n\${modernZionicHtml}\\n</div>\\n\`);
  }

  `;

processCode = processCode.substring(0, zionicStart) + newZionicBlock + processCode.substring(zionicEnd);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');
console.log('Successfully updated scripts/process-html.mjs: Zionic has Hero + Footer only!');

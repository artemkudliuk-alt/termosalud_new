import fs from 'fs';

let body = fs.readFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', 'utf8');

// Escape backticks and ${ for JS template string safety
body = body.replace(/`/g, '\\`').replace(/\${/g, '\\${');

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

if (zionicStart === -1 || zionicEnd === -1) {
  console.error('Could not locate zionic block boundaries');
  process.exit(1);
}

const newZionicBlock = `if (pageName === 'zionic') {
    const modernZionicHtml = \`
${zionicHero}

${body}
    \`;

    // Replace the inner content of zionic page
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="zionic-main-page-wrapper">\\n\${modernZionicHtml}\\n</div>\\n\`);
  }

  `;

const updatedProcessCode = processCode.substring(0, zionicStart) + newZionicBlock + processCode.substring(zionicEnd);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', updatedProcessCode, 'utf8');
console.log('Successfully updated scripts/process-html.mjs with 100% clone of Zionic body and custom Hero stage!');

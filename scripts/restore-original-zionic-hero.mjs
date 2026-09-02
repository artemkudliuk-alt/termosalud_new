import fs from 'fs';

const origZionicHero = `      <!-- 1. ZIONIC OFFICIAL LUXURY HERO -->
      <section class="zionic-official-hero">
        <div class="zionic-hero-bg-media">
          <video autoplay loop muted playsinline class="zionic-hero-bg-video" preload="auto">
            <source src="/zionic.mp4" type="video/mp4">
          </video>
          <div class="zionic-hero-overlay"></div>
        </div>

        <div class="container zionic-hero-container">
          <div class="zionic-hero-content">
            <div class="zionic-hero-logo-wrap">
              <img src="/wp-content/uploads/zionic_official/Zionic-Aesthetic-logotipo.png" alt="Zionic Aesthetic" class="zionic-official-logo">
            </div>

            <h1 class="zionic-hero-title">
              <span class="zionic-word-top">НОВА ЕРА</span>
              <span class="zionic-word-bottom">КОРЕКЦІЇ ТІЛА</span>
            </h1>

            <p class="zionic-hero-desc">
              КОМБІНОВАНИЙ МОНОПОЛЯРНИЙ RF ТА РОТАЦІЙНИЙ МАСАЖ MARP
            </p>

            <div class="zionic-hero-actions">
              <a href="#application" class="zionic-primary-btn">
                <span>Замовити тест-драйв у клініку</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button type="button" class="zionic-secondary-btn" id="open_zionic_video_btn" data-video-id="CYsDii-PZ7s">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Відео-демонстрація</span>
              </button>
            </div>
          </div>
        </div>
      </section>`;

let body = fs.readFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', 'utf8');
body = body.replace(/`/g, '\\`').replace(/\${/g, '\\${');

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const zionicStart = processCode.indexOf("if (pageName === 'zionic') {");
const zionicEnd = processCode.indexOf("if (pageName === 'linfopress')", zionicStart);

const newZionicBlock = `if (pageName === 'zionic') {
    const modernZionicHtml = \`
${origZionicHero}

${body}
    \`;

    // Replace the inner content of zionic page
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="zionic-main-page-wrapper">\\n\${modernZionicHtml}\\n</div>\\n\`);
  }

  `;

const updatedProcessCode = processCode.substring(0, zionicStart) + newZionicBlock + processCode.substring(zionicEnd);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', updatedProcessCode, 'utf8');
console.log('Successfully restored original Zionic Hero + 1-to-1 cloned body in scripts/process-html.mjs');

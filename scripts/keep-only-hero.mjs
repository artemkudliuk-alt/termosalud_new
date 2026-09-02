import fs from 'fs';

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const heroCode = `      <!-- 1. HERO STAGE (OFFICIAL BLACK LUXURY VIDEO HERO) -->
      <section class="linfopress-hero-stage" id="hero">
        <div class="linfopress-hero-media-wrapper">
          <video autoplay loop muted playsinline class="linfopress-hero-video-bg" preload="auto" poster="/photo_limfo.png">
            <source src="/limfo.mp4" type="video/mp4">
          </video>
          <div class="linfopress-hero-overlay"></div>
        </div>

        <div class="container linfopress-hero-container">
          <div class="linfopress-hero-content-box">
            
            <!-- Cloud Brand Outline Icon (Enlarged) -->
            <div class="linfopress-cloud-brand-icon">
              <svg width="96" height="58" viewBox="0 0 68 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 38H52C59.732 38 66 31.732 66 24C66 16.7118 60.4439 10.7226 53.3087 10.0678C51.3411 4.24949 45.6601 0 39 0C30.4079 0 23.3276 6.72622 22.8465 15.2017C21.3197 14.4328 19.5934 14 17.7778 14C11.2731 14 6 19.2731 6 25.7778C6 26.6896 6.10372 27.5772 6.29969 28.4307C2.62886 29.8052 0 33.3768 0 37.5556C0 37.8048 0.00947094 38.0519 0.028169 38.2965" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <h1 class="linfopress-official-hero-title">
              <span class="hero-word-primary">ТОЧНІСТЬ</span>
              <span class="hero-word-secondary">КОМФОРТ</span>
            </h1>

            <h2 class="linfopress-official-hero-kicker">ПРЕСОТЕРАПІЯ З НАЙБІЛЬШИМ РОЗМІРНИМ РЯДОМ НА РИНКУ</h2>
            <p class="linfopress-official-hero-desc">Ідеальне доповнення для комплексних процедур моделювання тіла та лімфодренажу</p>

            <div class="linfopress-hero-actions">
              <a href="#application" class="linfopress-btn-pill-white">
                <span>ЗАМОВИТИ ТЕСТ-ДРАЙВ</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button class="linfopress-btn-ghost-dark" id="open-linfopress-video-btn" data-video-id="K1v77enueJ8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>ВІДЕО-ДЕМОНСТРАЦІЯ</span>
              </button>
            </div>
          </div>
        </div>
      </section>`;

const newLinfopressBlock = `  // Linfopress Evolution PRO: Hero Stage + Footer Only
  if (pageName === 'linfopress') {
    const modernLinfopressHtml = \`
${heroCode}
    \`;

    // Replace inner content of linfopress page
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="linfopress-main-page-wrapper">\\n\${modernLinfopressHtml}\\n</div>\\n\`);
  }`;

const startIdx = processCode.indexOf("// Modern Linfopress Evolution PRO Page Structure");
const endIdx = processCode.indexOf("  // Modern Luxury Spanish Footer", startIdx);

const newProcessCode = processCode.substring(0, startIdx) + newLinfopressBlock + '\n\n' + processCode.substring(endIdx);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', newProcessCode, 'utf8');
console.log('Successfully updated scripts/process-html.mjs to keep ONLY Hero screen and Footer!');

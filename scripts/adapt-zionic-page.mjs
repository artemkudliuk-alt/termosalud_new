import fs from 'fs';

let body = fs.readFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', 'utf8');

// 1. Clean .ba_slider HTML to have clean slides and sharp navigation controls
const cleanBaSlider = `<div class="ba_slider aos-init" data-aos="fade-up" data-aos-delay="400">
  <div class="swiper-container zionic-ba-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/ba-1-optimized.png" alt="Клінічні результати ZIONIC 1" loading="lazy"></div>
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/ba-2-optimized.png" alt="Клінічні результати ZIONIC 2" loading="lazy"></div>
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/ba-3-optimized.png" alt="Клінічні результати ZIONIC 3" loading="lazy"></div>
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/imgi_12_result-8-optimized.png" alt="Клінічні результати ZIONIC 4" loading="lazy"></div>
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/imgi_16_result-3-optimized.png" alt="Клінічні результати ZIONIC 5" loading="lazy"></div>
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/imgi_14_result-1-optimized.png" alt="Клінічні результати ZIONIC 6" loading="lazy"></div>
    </div>
    <div class="zionic-slider-controls">
      <button type="button" class="zionic-slider-btn prev-btn" aria-label="Попередній слайд">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>
      <div class="zionic-slider-pagination"></div>
      <button type="button" class="zionic-slider-btn next-btn" aria-label="Наступний слайд">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </div>
  </div>
</div>`;

// Replace old ba_slider with cleanBaSlider
body = body.replace(/<div class="ba_slider[\s\S]*?<\/div><\/div><\/div><\/div>/i, cleanBaSlider + '</div></div>');

// 2. Clean .experience-slider
const cleanExpSlider = `<div class="experience-slider aos-init" data-aos="fade-up" data-aos-delay="200">
  <div class="swiper-container zionic-exp-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/procedure-1-optimized.png" alt="Процедура ZIONIC 1" loading="lazy"></div>
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" alt="Процедура ZIONIC 2" loading="lazy"></div>
      <div class="swiper-slide"><img src="/wp-content/uploads/2026/03/procedure-3-optimized.jpg" alt="Процедура ZIONIC 3" loading="lazy"></div>
    </div>
    <div class="zionic-slider-controls">
      <button type="button" class="zionic-slider-btn prev-btn" aria-label="Попередній слайд">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>
      <div class="zionic-slider-pagination"></div>
      <button type="button" class="zionic-slider-btn next-btn" aria-label="Наступний слайд">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </div>
  </div>
</div>`;

body = body.replace(/<div class="experience-slider[\s\S]*?<\/div><\/div><\/div><\/div>/i, cleanExpSlider + '</div></div>');

// Save cleaned body
fs.writeFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', body, 'utf8');

// 3. Update scripts/process-html.mjs
const zionicHero = `      <!-- 1. ZIONIC OFFICIAL LUXURY HERO -->
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

let escapedBody = body.replace(/`/g, '\\`').replace(/\${/g, '\\${');

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const zionicStart = processCode.indexOf("if (pageName === 'zionic') {");
const zionicEnd = processCode.indexOf("if (pageName === 'linfopress')", zionicStart);

const newZionicBlock = `if (pageName === 'zionic') {
    const modernZionicHtml = \`
${zionicHero}

${escapedBody}
    \`;

    // Replace the inner content of zionic page
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="zionic-main-page-wrapper">\\n\${modernZionicHtml}\\n</div>\\n\`);
  }

  `;

processCode = processCode.substring(0, zionicStart) + newZionicBlock + processCode.substring(zionicEnd);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

console.log('Successfully updated scripts/process-html.mjs with cleaned Zionic body!');

import fs from 'fs';

let body = fs.readFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', 'utf8');

// 1. Clean BA Slider
const modernBaSlider = `<div class="ba_slider aos-init" data-aos="fade-up" data-aos-delay="400">
  <div class="zionic-gallery-carousel zionic-ba-carousel">
    <div class="zionic-carousel-track">
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/ba-1-optimized.png" alt="Клінічні результати ZIONIC 1"></div>
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/ba-2-optimized.png" alt="Клінічні результати ZIONIC 2"></div>
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/ba-3-optimized.png" alt="Клінічні результати ZIONIC 3"></div>
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/imgi_12_result-8-optimized.png" alt="Клінічні результати ZIONIC 4"></div>
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/imgi_16_result-3-optimized.png" alt="Клінічні результати ZIONIC 5"></div>
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/imgi_14_result-1-optimized.png" alt="Клінічні результати ZIONIC 6"></div>
    </div>
    <div class="zionic-slider-controls">
      <button type="button" class="zionic-slider-btn prev-btn" aria-label="Попередній слайд">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>
      <button type="button" class="zionic-slider-btn next-btn" aria-label="Наступний слайд">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </div>
  </div>
</div>`;

body = body.replace(/<div class="ba_slider[\s\S]*?<\/div><\/div><\/div><\/div>/i, modernBaSlider + '</div></div>');

// 2. Clean Experience Slider
const modernExpSlider = `<div class="experience-slider aos-init" data-aos="fade-up" data-aos-delay="200">
  <div class="zionic-gallery-carousel zionic-exp-carousel">
    <div class="zionic-carousel-track">
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/procedure-1-optimized.png" alt="Процедура ZIONIC 1"></div>
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" alt="Процедура ZIONIC 2"></div>
      <div class="zionic-carousel-item"><img src="/wp-content/uploads/2026/03/procedure-3-optimized.jpg" alt="Процедура ZIONIC 3"></div>
    </div>
    <div class="zionic-slider-controls">
      <button type="button" class="zionic-slider-btn prev-btn" aria-label="Попередній слайд">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </button>
      <button type="button" class="zionic-slider-btn next-btn" aria-label="Наступний слайд">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </button>
    </div>
  </div>
</div>`;

body = body.replace(/<div class="experience-slider[\s\S]*?<\/div><\/div><\/div><\/div>/i, modernExpSlider + '</div></div>');

fs.writeFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', body, 'utf8');

// 3. Update scripts/process-html.mjs
let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

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

// 4. Update CSS in custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const updatedCarouselCss = `
/* ZIONIC SHARP CAROUSELS */
.zionic-gallery-carousel {
  position: relative;
  width: 100%;
  margin-top: 24px;
}

.zionic-carousel-track {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding: 10px 0 20px 0;
}

.zionic-carousel-track::-webkit-scrollbar {
  display: none;
}

.zionic-carousel-item {
  flex: 0 0 calc(33.333% - 14px);
  min-width: 320px;
  scroll-snap-align: start;
  background: #ffffff;
  border: 1px solid #e4e4e7 !important;
  border-radius: 0 !important;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 991px) {
  .zionic-carousel-item {
    flex: 0 0 calc(50% - 10px);
    min-width: 280px;
  }
}

@media (max-width: 640px) {
  .zionic-carousel-item {
    flex: 0 0 90%;
    min-width: 260px;
  }
}

.zionic-carousel-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.zionic-carousel-item img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  border-radius: 0 !important;
}

.zionic-slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.zionic-slider-btn {
  width: 48px;
  height: 48px;
  background: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #27272a !important;
  border-radius: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.zionic-slider-btn:hover {
  background: #ffffff !important;
  color: #111111 !important;
  border-color: #111111 !important;
}
`;

css += '\n' + updatedCarouselCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// 5. Update main.js
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const jsScript = `
// 22. Zionic Sharp Carousel Click Handler
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.zionic-gallery-carousel').forEach(carousel => {
    const track = carousel.querySelector('.zionic-carousel-track');
    const prev = carousel.querySelector('.prev-btn');
    const next = carousel.querySelector('.next-btn');
    if (track && prev && next) {
      prev.addEventListener('click', () => {
        const itemWidth = track.querySelector('.zionic-carousel-item')?.offsetWidth || 340;
        track.scrollBy({ left: -(itemWidth + 20), behavior: 'smooth' });
      });
      next.addEventListener('click', () => {
        const itemWidth = track.querySelector('.zionic-carousel-item')?.offsetWidth || 340;
        track.scrollBy({ left: itemWidth + 20, behavior: 'smooth' });
      });
    }
  });
});
`;

if (!js.includes('22. Zionic Sharp Carousel Click Handler')) {
  js += '\n' + jsScript;
  fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');
}

console.log('Successfully set up clean sharp sliders!');

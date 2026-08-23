import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pages = [
  { name: 'index', outDir: rootDir, outFile: 'index.html' },
  { name: 'about-us', outDir: path.join(rootDir, 'about-us'), outFile: 'index.html' },
  { name: 'zionic', outDir: path.join(rootDir, 'zionic'), outFile: 'index.html' },
  { name: 'linfopress', outDir: path.join(rootDir, 'linfopress'), outFile: 'index.html' }
];

function cleanHtml(raw, pageName) {
  let html = raw;

  // Domain replacements
  html = html.replaceAll('https://termosalud.com.ua/about-us/', '/about-us/');
  html = html.replaceAll('https://termosalud.com.ua/zionic/', '/zionic/');
  html = html.replaceAll('https://termosalud.com.ua/linfopress/', '/linfopress/');
  html = html.replaceAll('https://termosalud.com.ua/wp-content/', '/wp-content/');
  html = html.replaceAll('https://termosalud.com.ua/', '/');
  html = html.replaceAll('http://termosalud.com.ua/', '/');

  // Remove the buggy inline lazyload script
  html = html.replace(/<script>\s*\(async\s*\(\)\s*=>\s*\{\s*if\s*\('loading'\s*in\s*HTMLImageElement\.prototype\)[\s\S]*?<\/script>/gi, '');

  // Convert data-src to src="..."
  html = html.replace(/\bdata-src=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi, (match, p1, p2, p3) => {
    const val = p1 || p2 || p3;
    return `src="${val}"`;
  });

  // Remove lazy loading attributes & classes to ensure instant rendering
  html = html.replace(/\bloading=["']?lazy["']?/gi, 'loading="eager"');
  html = html.replace(/\bclass=(["'])(.*?)\blazyload\b(.*?)\1/gi, 'class=$1$2$3$1');

  // Ensure src attributes are quoted
  html = html.replace(/\bsrc=(?!["'])([^\s>]+)/gi, 'src="$1"');

  // Ensure poster attributes are quoted
  html = html.replace(/\bposter=(?!["'])([^\s>]+)/gi, 'poster="$1"');

  // Ensure href attributes are quoted
  html = html.replace(/\bhref=(?!["'])([^\s>]+)/gi, 'href="$1"');

  // Remove analytics / GTM
  html = html.replace(/<script[^>]*googletagmanager[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script[^>]*gtm\.js[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<!--\s*Google Tag Manager[\s\S]*?End Google Tag Manager\s*-->/gi, '');
  html = html.replace(/<noscript><iframe[^>]*googletagmanager[\s\S]*?<\/noscript>/gi, '');

  // If page is index, inject clean Hero, Option 1 Modern Split Cards, Animated Why Us section, Presentation section, Partners carousel, and Scroll-Revealed SEO text
  if (pageName === 'index') {
    const heroCleanSection = `
      <!-- Screen 1: Clean 4K Hero Video Banner (Ukrainian Title, English Device Names) -->
      <section class="hero-clean-section">
        <video autoplay loop muted playsinline class="hero-clean-video" preload="auto">
          <source src="/wp-content/uploads/2024/02/EMPOWER-BEAUTY-TOGETHER-4K.mp4" type="video/mp4">
        </video>

        <div class="hero-clean-container">
          <!-- Left Column: Title & Description in Ukrainian -->
          <div class="hero-left-col">
            <h1 class="hero-clean-title">
              <span class="word-empower">ПІДСИЛЮЙТЕ</span>
              <span class="word-beauty">КРАСУ</span>
              <span class="word-together">РАЗОМ</span>
            </h1>
            <p class="hero-clean-subtitle">
              Підсилюйте природну красу та здоров'я за допомогою найефективніших і найбезпечніших неінвазивних технологій.
            </p>
          </div>

          <!-- Right Column: Interactive Product Showcase (English Device Names) -->
          <div class="hero-right-col">
            <div class="hero-product-slider">
              <!-- Slide 1: ZIONIC -->
              <div class="hero-product-slide active" data-slide="0">
                <div class="product-info">
                  <h2 class="product-name">ZIONIC<br><span>MARP SYSTEM</span></h2>
                  <a href="/zionic/" class="product-btn">
                    <span>ДЕТАЛЬНІШЕ</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
                <div class="product-image-wrap">
                  <img src="/wp-content/uploads/2026/03/zionic-optimized.png" alt="ZIONIC">
                </div>
              </div>

              <!-- Slide 2: LINFOPRESS EVOLUTION PRO -->
              <div class="hero-product-slide" data-slide="1">
                <div class="product-info">
                  <h2 class="product-name">LINFOPRESS<br><span>EVOLUTION PRO</span></h2>
                  <a href="/linfopress/" class="product-btn">
                    <span>ДЕТАЛЬНІШЕ</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
                <div class="product-image-wrap">
                  <img src="/wp-content/uploads/2026/03/linfopress-optimized.png" alt="Linfopress Evolution PRO">
                </div>
              </div>
            </div>

            <!-- Vertical Pagination Dots (2 Devices) -->
            <div class="hero-slider-dots">
              <button class="slider-dot active" data-index="0" aria-label="Zionic"></button>
              <button class="slider-dot" data-index="1" aria-label="Linfopress"></button>
            </div>
          </div>
        </div>
      </section>
    `;

    // Modern Screen 2: Clean 4K Video Showcase on Pure White Background with Direct Borderless Corner Typography
    const modernScreen2Section = `
      <!-- Screen 2: Clean 4K Video Showcase on Pure White Canvas with Centered Header and Corner Info -->
      <section id="our-products" class="our-prods-clean-video">
        <div class="our-prods-header" data-aos="fade-up">
          <div class="our-prods-badge">Інноваційні технології Termosalud</div>
          <h2>Флагманське обладнання для клінік</h2>
          <p>Преміальні апаратні рішення з високою рентабельністю, швидкою окупністю та доведеною клінічною ефективністю</p>
        </div>

        <div class="clean-video-wrapper">
          <video autoplay loop muted playsinline class="clean-video-player" preload="auto">
            <source src="/wp-content/uploads/2026/03/2screen.mp4" type="video/mp4">
            <source src="/2screen.mp4" type="video/mp4">
          </video>

          <!-- Subtle Soft Corner Vignette Overlays (Only in corners, center remains 100% bright) -->
          <div class="corner-vignette corner-vignette-tl"></div>
          <div class="corner-vignette corner-vignette-br"></div>

          <!-- Top-Left Corner Content: Linfopress Evolution PRO (Pure borderless typography) -->
          <div class="video-corner-content corner-linfopress-top" data-aos="fade-right">
            <div class="corner-meta-row">
              <span class="corner-badge badge-linfo">Пресотерапія 4-го покоління</span>
              <span class="corner-tag">24 Сектори</span>
            </div>
            <h3 class="corner-title">Linfopress <span>EVOLUTION PRO</span></h3>
            <ul class="corner-bullets">
              <li><span class="corner-check">✓</span> 24 незалежні сектори послідовного тиску</li>
              <li><span class="corner-check">✓</span> Медична сертифікація безпеки CE Medical</li>
              <li><span class="corner-check">✓</span> Високий попит та щоденний прибуток</li>
            </ul>
            <div class="corner-btn-row">
              <a href="/linfopress/" class="corner-btn-primary">
                <span>Дізнатись більше</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button class="corner-btn-secondary header-btn" data-target="#popup_request">Тест-драйв</button>
            </div>
          </div>

          <!-- Bottom-Right Corner Content: ZIONIC MARP System (Pure borderless typography) -->
          <div class="video-corner-content corner-zionic-bottom" data-aos="fade-left">
            <div class="corner-meta-row">
              <span class="corner-badge badge-zionic">MARP + RF Technology</span>
              <span class="corner-tag">Made in Spain</span>
            </div>
            <h3 class="corner-title">ZIONIC <span>MARP SYSTEM</span></h3>
            <ul class="corner-bullets">
              <li><span class="corner-check">✓</span> Одночасна дія: ліполіз, ліфтинг та тонус</li>
              <li><span class="corner-check">✓</span> Безболісно та без реабілітації для пацієнта</li>
              <li><span class="corner-check">✓</span> Швидка окупність від 3 до 4 місяців</li>
            </ul>
            <div class="corner-btn-row">
              <a href="/zionic/" class="corner-btn-primary">
                <span>Дізнатись більше</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button class="corner-btn-secondary header-btn" data-target="#popup_request">Тест-драйв</button>
            </div>
          </div>

        </div>
      </section>
    `;

    // Modern Screen 3: Architectural Swiss Bento Grid with 100% Authentic Text from Original Site (Awwwards Grade)
    const modernWhyUsSection = `
      <!-- Screen 3: Architectural Swiss Bento Grid (Full Height, Generous Spacing, Unclipped Cards) -->
      <section class="why-us-bento-section" id="why-us">
        <div class="bento-container">
          
          <!-- Header -->
          <div class="why-us-header" data-aos="fade-up">
            <div class="why-us-badge">Надійний партнер вашої клініки</div>
            <h2>Чому провідні клініки обирають Termosalud</h2>
            <p>Повний комплекс підтримки бізнесу: від оригінального сертифікованого обладнання до навчання лікарів та маркетингу</p>
          </div>

          <!-- Asymmetric Bento Grid (6 Pillars Architecture) -->
          <div class="swiss-bento-grid">

            <!-- Bento 1 (Hero Left Module, Spans 2 Rows): Вигода -->
            <div class="bento-card bento-hero-card" data-aos="fade-up" data-aos-delay="50">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta">
                  <div class="bento-meta-left">
                    <div class="bento-icon-pod pod-finance">
                      <svg class="bento-svg" viewBox="0 0 32 32" fill="none">
                        <rect x="3" y="4" width="26" height="24" rx="0" stroke="currentColor" stroke-width="1.8" fill="rgba(93,135,150,0.06)"/>
                        <rect class="bar-anim-1" x="7" y="17" width="3.5" height="7" fill="currentColor" opacity="0.4"/>
                        <rect class="bar-anim-2" x="14" y="13" width="3.5" height="11" fill="currentColor" opacity="0.7"/>
                        <rect class="bar-anim-3" x="21" y="9" width="3.5" height="15" fill="currentColor"/>
                        <path class="arrow-growth" d="M7 15L14 10L19 12L24.5 6" stroke="#2f855a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path class="arrow-tip" d="M20.5 6H24.5V10" stroke="#2f855a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <span class="bento-index">01 / ФІНАНСОВА ВИГОДА</span>
                  </div>
                  <span class="bento-pill-tag">Швидкий ROI</span>
                </div>
                
                <h3 class="bento-title">Вигода</h3>
                <p class="bento-desc">
                  Ефективна інвестиція, що швидко окупається для клініки та лікаря. Постійний високий попит пацієнтів на послуги моделювання тіла та пресотерапії забезпечує швидку окупність апаратів Zionic та Linfopress Evolution Pro.
                </p>

                <!-- Interactive Live ROI Stat Box -->
                <div class="bento-roi-display">
                  <div class="roi-metric-col">
                    <div class="roi-big-number">
                      <span class="num-highlight">3–4</span>
                      <span class="num-label">МІСЯЦІ</span>
                    </div>
                    <span class="roi-subtext">Середній термін повної окупності</span>
                  </div>
                  
                  <div class="roi-graph-track">
                    <div class="roi-graph-bar"></div>
                  </div>
                  <div class="roi-graph-meta">
                    <span>Старт: 0 міс.</span>
                    <span class="roi-badge-highlight">+340% ROI за 1 рік</span>
                  </div>
                </div>

                <!-- Feature Checkpoints -->
                <div class="bento-feature-pills">
                  <div class="bento-feature-item">
                    <span class="bento-check">✓</span>
                    <span>Постійний щоденний попит пацієнтів</span>
                  </div>
                  <div class="bento-feature-item">
                    <span class="bento-check">✓</span>
                    <span>Швидка окупність для лікаря та клініки</span>
                  </div>
                  <div class="bento-feature-item">
                    <span class="bento-check">✓</span>
                    <span>Готові фінансові моделі прибутковості</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bento 2 (Top Right Module, Spans 2 Columns): Безпека -->
            <div class="bento-card bento-safety-card" data-aos="fade-up" data-aos-delay="150">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta">
                  <div class="bento-meta-left">
                    <div class="bento-icon-pod pod-safety">
                      <svg class="bento-svg" viewBox="0 0 32 32" fill="none">
                        <path class="shield-contour" d="M16 3L6 7.5V15.5C6 22.5 10.5 27.5 16 29C21.5 27.5 26 22.5 26 15.5V7.5L16 3Z" stroke="currentColor" stroke-width="1.8" fill="rgba(93,135,150,0.06)" stroke-linejoin="round"/>
                        <path class="ecg-line" d="M10 16.5H12.5L14.5 11.5L17.5 21L19.5 16.5H22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle class="shield-dot" cx="22.5" cy="8.5" r="3.5" fill="#1e232e" stroke="currentColor" stroke-width="1.2"/>
                        <path d="M21.2 8.5L22.2 9.5L24 7.5" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <span class="bento-index">02 / КЛІНІЧНА БЕЗПЕКА</span>
                  </div>
                  <span class="bento-pill-tag tag-safety">Доказова медицина</span>
                </div>
                
                <h3 class="bento-title">Безпека</h3>
                <p class="bento-desc">
                  Безпека, що базується на принципах медицини. Наявність найвищих стандартів сертифікації США, Азії, України, Європи. Відсутність ризиків ускладнень підтверджено клінічними дослідженнями.
                </p>

                <!-- Stamp Badges Grid -->
                <div class="bento-cert-grid">
                  <div class="cert-seal">
                    <span class="seal-code">FDA</span>
                    <span class="seal-name">США Approved</span>
                  </div>
                  <div class="cert-seal">
                    <span class="seal-code">CE 0120</span>
                    <span class="seal-name">Medical Directive</span>
                  </div>
                  <div class="cert-seal">
                    <span class="seal-code">ISO 13485</span>
                    <span class="seal-name">Quality Standard</span>
                  </div>
                  <div class="cert-seal">
                    <span class="seal-code">UA MED</span>
                    <span class="seal-name">Сертифіковано</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bento 3 (Mid Right - Col 2): Популярність -->
            <div class="bento-card bento-mini-card" data-aos="fade-up" data-aos-delay="200">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta">
                  <div class="bento-meta-left">
                    <div class="bento-icon-pod pod-global">
                      <svg class="bento-svg" viewBox="0 0 32 32" fill="none">
                        <circle cx="16" cy="16" r="11.5" stroke="currentColor" stroke-width="1.6" fill="rgba(93,135,150,0.06)"/>
                        <ellipse class="globe-lat" cx="16" cy="16" rx="5" ry="11.5" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
                        <path d="M5 12C9 13.5 13 14 16 14C19 14 23 13.5 27 12" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
                        <path d="M5 20C9 18.5 13 18 16 18C19 18 23 18.5 27 20" stroke="currentColor" stroke-width="1.3" opacity="0.6"/>
                        <circle class="orbit-star-pulse" cx="23.5" cy="9.5" r="4.5" fill="#1e232e" stroke="currentColor" stroke-width="1.2"/>
                        <path d="M23.5 7.5L24.2 8.8L25.6 9L24.5 10L24.8 11.5L23.5 10.8L22.2 11.5L22.5 10L21.4 9L22.8 8.8L23.5 7.5Z" fill="#ffff00"/>
                      </svg>
                    </div>
                    <span class="bento-index">03 / СВІТ</span>
                  </div>
                </div>
                <div class="bento-stat-hero">
                  <span class="bento-stat-num">40+</span>
                  <span class="bento-stat-lbl">Країн світу</span>
                </div>
                <h4 class="bento-subhead">Популярність</h4>
                <p class="bento-micro-desc">
                  Апарати компанії Termosalud вже давно стали популярними в клініках Європи та США. Їхня висока ефективність та надійність, висока безпека та медична сертифікація, а також модний хай-тек дизайн і дорогі матеріали зробили Zionic та Linfopress найбажанішими апаратами серед фахівців та пацієнтів. Тепер ці апарати працюють і в провідних клініках України.
                </p>
              </div>
            </div>

            <!-- Bento 4 (Mid Right - Col 3): Навчання -->
            <div class="bento-card bento-mini-card" data-aos="fade-up" data-aos-delay="250">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta">
                  <div class="bento-meta-left">
                    <div class="bento-icon-pod pod-academy">
                      <svg class="bento-svg" viewBox="0 0 32 32" fill="none">
                        <path class="cap-poly" d="M16 4.5L3.5 10.5L16 16.5L28.5 10.5L16 4.5Z" stroke="currentColor" stroke-width="1.8" fill="rgba(93,135,150,0.06)" stroke-linejoin="round"/>
                        <path d="M8 13.5V19.5C8 22 11.5 24.5 16 24.5C20.5 24.5 24 22 24 19.5V13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
                        <path class="laser-beam-anim" d="M26.5 11.5V21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        <circle cx="26.5" cy="22.5" r="1.5" fill="currentColor"/>
                        <circle class="stylus-core-glow" cx="16" cy="16.5" r="3.5" fill="#1e232e" stroke="currentColor" stroke-width="1.2"/>
                        <path d="M16 15V18M14.5 16.5H17.5" stroke="#ffff00" stroke-width="1.4" stroke-linecap="round"/>
                      </svg>
                    </div>
                    <span class="bento-index">04 / АКАДЕМІЯ</span>
                  </div>
                </div>
                <div class="bento-stat-hero">
                  <span class="bento-stat-num">100%</span>
                  <span class="bento-stat-lbl">Постановка руки</span>
                </div>
                <h4 class="bento-subhead">Навчання</h4>
                <p class="bento-micro-desc">
                  Система навчання, заснована на експертному досвіді та передовій науці. Високий професійний рівень стартових та повторних навчань для партнерів. Закордонні стажування у найкращих клініках та тренінгових центрах.
                </p>
              </div>
            </div>

            <!-- Bento 5 (Bottom Row Left, Spans 1.5 Col): Сервіс -->
            <div class="bento-card bento-wide-card" data-aos="fade-up" data-aos-delay="300">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta">
                  <div class="bento-meta-left">
                    <div class="bento-icon-pod pod-service">
                      <svg class="bento-svg" viewBox="0 0 32 32" fill="none">
                        <path class="gear-rotate-anim" d="M14 4H18L18.7 6.4C19.4 6.7 20.1 7.1 20.7 7.6L23 6.7L25.5 9.2L24.6 11.5C25.1 12.1 25.5 12.8 25.8 13.5L28.2 14.2V17.8L25.8 18.5C25.5 19.2 25.1 19.9 24.6 20.5L25.5 22.8L23 25.3L20.7 24.4C20.1 24.9 19.4 25.3 18.7 25.6L18 28H14L13.3 25.6C12.6 25.3 11.9 24.9 11.3 24.4L9 25.3L6.5 22.8L7.4 20.5C6.9 19.9 6.5 19.2 6.2 18.5L3.8 17.8V14.2L6.2 13.5C6.5 12.8 6.9 12.1 7.4 11.5L6.5 9.2L9 6.7L11.3 7.6C11.9 7.1 12.6 6.7 13.3 6.4L14 4Z" stroke="currentColor" stroke-width="1.6" fill="rgba(93,135,150,0.06)" stroke-linejoin="round"/>
                        <circle cx="16" cy="16" r="5.5" fill="#1e232e" stroke="currentColor" stroke-width="1.2"/>
                        <path class="clock-needle-anim" d="M16 13V16L18 17.5" stroke="#ffff00" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <span class="bento-index">05 / ПІДТРИМКА</span>
                  </div>
                  <span class="bento-pill-tag">24/7 Сервіс</span>
                </div>
                <h4 class="bento-subhead">Сервіс</h4>
                <p class="bento-micro-desc">
                  Найвищі стандарти сервісного супроводу як важлива складова партнерських взаємовідносин. Висококваліфіковані фахівці у всіх підрозділах компанії забезпечують найкращі умови для комфортної співпраці з преміальними брендами.
                </p>
              </div>
            </div>

            <!-- Bento 6 (Bottom Row Right, Spans 1.5 Col): Професіоналізм -->
            <div class="bento-card bento-wide-card" data-aos="fade-up" data-aos-delay="350">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta">
                  <div class="bento-meta-left">
                    <div class="bento-icon-pod pod-team">
                      <svg class="bento-svg" viewBox="0 0 32 32" fill="none">
                        <circle cx="8" cy="12" r="3" stroke="currentColor" stroke-width="1.4" fill="rgba(93,135,150,0.06)"/>
                        <path d="M3 23C3 19.5 5.5 17.5 8 17.5C9.5 17.5 11 18.2 12 19.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                        <circle cx="24" cy="12" r="3" stroke="currentColor" stroke-width="1.4" fill="rgba(93,135,150,0.06)"/>
                        <path d="M29 23C29 19.5 26.5 17.5 24 17.5C22.5 17.5 21 18.2 20 19.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                        <circle cx="16" cy="9.5" r="4" stroke="currentColor" stroke-width="1.7" fill="rgba(93,135,150,0.1)"/>
                        <path d="M9.5 24.5C9.5 20.5 12.5 18 16 18C19.5 18 22.5 20.5 22.5 24.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
                        <circle class="expert-diamond-shine" cx="22.5" cy="21.5" r="4" fill="#1e232e" stroke="currentColor" stroke-width="1.2"/>
                        <path d="M22.5 19L23.2 20.5L24.8 20.8L23.6 22L23.9 23.5L22.5 22.7L21.1 23.5L21.4 22L20.2 20.8L21.8 20.5L22.5 19Z" fill="#ffff00"/>
                      </svg>
                    </div>
                    <span class="bento-index">06 / ЕКСПЕРТИЗА</span>
                  </div>
                  <span class="bento-pill-tag">Експертна підтримка</span>
                </div>
                <h4 class="bento-subhead">Професіоналізм</h4>
                <p class="bento-micro-desc">
                  Ми — професіонали з багаторічним досвідом в індустрії, які безперервно підвищують кваліфікацію, здобувають нові знання та ефективно впроваджують їх у свою роботу. Наші лікарі, менеджери, інженери за десятки років роботи допомогли побудувати та розвинути велику кількість успішних бізнесів у сфері естетичної медицини. Таким чином ми гарантуємо всебічну експертну підтримку на кожному етапі розвитку вашої клініки.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;

    // Modern Screen 4: Full-Width 21:9 Living Banner Stage (Background Image covers full width | Form overlaid on the right)
    const modernPresentationSection = `
      <!-- Screen 4: Full-Width Living Banner Presentation Stage -->
      <section class="application-presentation" id="presentation-section">
        
        <!-- Section Header -->
        <div class="container">
          <div class="presentation-header" data-aos="fade-up">
            <div class="presentation-badge">Персональний тест-драйв</div>
            <h2>Замовте презентацію та пробну процедуру</h2>
            <p>Оцініть можливості та результативність обладнання Termosalud у вашій клініці або в нашому демонстраційному центрі</p>
          </div>
        </div>

        <!-- Full-Width 21:9 Banner Stage (Continuous Canvas) -->
        <div class="fullwidth-living-banner" data-aos="fade-up" data-aos-delay="100">
          
          <!-- Full-Width Background Image Layer -->
          <img src="/wp-content/themes/zionic/assets/images/zionic_banner_21_9_clean.png" alt="Zionic Pro Max Treatment" class="living-banner-bg-img">
          
          <!-- Content Container with Form Floating on the Right -->
          <div class="container living-banner-content-container">
            <div class="banner-form-overlay-wrap">
              <div class="pastel-concierge-card">
                
                <div class="form-header-meta">
                  <span class="meta-tag">ЕКСКЛЮЗИВ ДЛЯ КЛІНІК</span>
                  <h3 class="form-title">Заявка на виїзний тест-драйв</h3>
                </div>

                <!-- Format Switcher: Clinic vs Showroom -->
                <div class="format-switcher-wrap">
                  <span class="format-label">Формат презентації:</span>
                  <div class="format-switcher">
                    <button type="button" class="format-tab-btn active" data-format="clinic">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1"/></svg>
                      <span>У вашій клініці (Виїзд)</span>
                    </button>
                    <button type="button" class="format-tab-btn" data-format="showroom">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
                      <span>Шоурум (Київ)</span>
                    </button>
                  </div>
                </div>

                <!-- Device Selector Pills -->
                <div class="device-selector-wrap">
                  <span class="format-label">Оберіть обладнання для тесту:</span>
                  <div class="device-pills-row">
                    <label class="device-pill active">
                      <input type="radio" name="target_device" value="Zionic" checked class="device-radio">
                      <span class="device-pill-dot dot-cyan"></span>
                      <span>Zionic (MARP + RF)</span>
                    </label>
                    <label class="device-pill">
                      <input type="radio" name="target_device" value="Linfopress" class="device-radio">
                      <span class="device-pill-dot dot-emerald"></span>
                      <span>Linfopress Pro</span>
                    </label>
                    <label class="device-pill">
                      <input type="radio" name="target_device" value="Both" class="device-radio">
                      <span class="device-pill-dot dot-gold"></span>
                      <span>Обидва апарати</span>
                    </label>
                  </div>
                </div>

                <!-- Main Booking Form -->
                <form class="presentation-clean-form" onsubmit="event.preventDefault(); document.querySelector('.form-success-toast')?.classList.add('show'); setTimeout(() => document.querySelector('.form-success-toast')?.classList.remove('show'), 4000);">
                  
                  <div class="form-group-item">
                    <label class="form-label-text" for="pres_name">Ваше ім'я та посада</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="pres_name" placeholder="Наприклад: Наталія, головний лікар" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="pres_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="pres_phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>

                    <div class="form-group-item">
                      <label class="form-label-text" for="pres_city">Місто / Назва клініки</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21.5C12 21.5 19 14.5 19 9.5C19 5.5 16 2.5 12 2.5C8 2.5 5 5.5 5 9.5C5 14.5 12 21.5 12 21.5Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></path><circle cx="12" cy="9.5" r="2.5" stroke-width="1.6" fill="currentColor"></circle></svg>
                        <input type="text" id="pres_city" placeholder="Київ / Назва клініки" required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для підтвердження</label>
                    <div class="messenger-pills-row">
                      <label class="messenger-pill active">
                        <input type="radio" name="messenger" value="Whatsapp" checked class="messenger-radio">
                        <span class="pill-dot dot-green"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="messenger" value="Viber" class="messenger-radio">
                        <span class="pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="messenger" value="Telegram" class="messenger-radio">
                        <span class="pill-dot dot-blue"></span>
                        <span>Telegram</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="shimmer-submit-btn">
                    <span class="btn-text">ЗАБРОНЮВАТИ ВИЇЗНИЙ ТЕСТ-ДРАЙВ</span>
                    <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>

                  <!-- Trust Highlights under CTA -->
                  <div class="form-trust-bullets">
                    <div class="trust-bullet-item">
                      <span class="bullet-check">✓</span>
                      <span>0 ₴ за виїзд та доставку</span>
                    </div>
                    <div class="trust-bullet-item">
                      <span class="bullet-check">✓</span>
                      <span>Тест на ваших пацієнтах</span>
                    </div>
                    <div class="trust-bullet-item">
                      <span class="bullet-check">✓</span>
                      <span>Сертифікат для персоналу</span>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>

        </div>
      </section>
    `;

    // Modern Screen 5: Clean Interactive Partners Carousel Section
    const modernPartnersSection = `
      <!-- Screen 5: Modern Partners Carousel with Ambient Glowing Cards -->
      <section class="partners">
        <div class="container">
          <div class="partners-header" data-aos="fade-up">
            <div class="partners-badge">Довіра лідерів ринку</div>
            <h2>Провідні клініки України обирають Termosalud</h2>
            <p>Провідні медичні центри, клініки естетичної медицини та преміальні SPA-комплекси, що обрали технології Termosalud</p>
          </div>
        </div>

        <div class="modern-partners-carousel-wrap" data-aos="fade-up" data-aos-delay="100">
          <div class="partners-marquee-track">
            <!-- Item 1: L'Clinic -->
            <a href="https://share.google/hXAf7ws08CGnL6BBG" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/lclcinic-optimized.jpg" alt="L'Clinic" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">L'Clinic</h3>
                <p class="partner-category">Клініка інновацій • Київ / Одеса</p>
              </div>
            </a>

            <!-- Item 2: Expert Med SPA -->
            <a href="https://med-spa.od.ua/" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/medspa-optimized.jpg" alt="Expert Med SPA" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">Expert Med SPA</h3>
                <p class="partner-category">Преміальний центр естетики • Одеса</p>
              </div>
            </a>

            <!-- Item 3: Осоння Карпати -->
            <a href="https://osonnya.com/" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/osonya-optimized.jpg" alt="Комплекс Осоння Карпати" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">«Осоння Карпати»</h3>
                <p class="partner-category">Курортний SPA-комплекс • Карпати</p>
              </div>
            </a>

            <!-- Item 4: Гірська Тиса -->
            <a href="https://tisa.uz.ua/" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/tisa-optimized.jpg" alt="Санаторій Гірська Тиса" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">«Гірська Тиса»</h3>
                <p class="partner-category">Оздоровчий комплекс • Закарпаття</p>
              </div>
            </a>

            <!-- Item 5: IYA Clinic -->
            <a href="https://www.instagram.com/iya_clinic" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/iya-optimized.jpg" alt="IYA Clinic" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">IYA Clinic</h3>
                <p class="partner-category">Клініка естетичної медицини • Київ</p>
              </div>
            </a>

            <!-- Item 6: St Esthetic -->
            <a href="https://www.stesthetic.com/" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/stethethic-optimized.jpg" alt="St Esthetic" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">St Esthetic</h3>
                <p class="partner-category">Центр апаратної косметології • Київ</p>
              </div>
            </a>

            <!-- Duplicate Set for continuous seamless infinite loop -->
            <a href="https://share.google/hXAf7ws08CGnL6BBG" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/lclcinic-optimized.jpg" alt="L'Clinic" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">L'Clinic</h3>
                <p class="partner-category">Клініка інновацій • Київ / Одеса</p>
              </div>
            </a>

            <a href="https://med-spa.od.ua/" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/medspa-optimized.jpg" alt="Expert Med SPA" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">Expert Med SPA</h3>
                <p class="partner-category">Преміальний центр естетики • Одеса</p>
              </div>
            </a>

            <a href="https://osonnya.com/" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/osonya-optimized.jpg" alt="Комплекс Осоння Карпати" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">«Осоння Карпати»</h3>
                <p class="partner-category">Курортний SPA-комплекс • Карпати</p>
              </div>
            </a>

            <a href="https://tisa.uz.ua/" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/tisa-optimized.jpg" alt="Санаторій Гірська Тиса" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">«Гірська Тиса»</h3>
                <p class="partner-category">Оздоровчий комплекс • Закарпаття</p>
              </div>
            </a>

            <a href="https://www.instagram.com/iya_clinic" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/iya-optimized.jpg" alt="IYA Clinic" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">IYA Clinic</h3>
                <p class="partner-category">Клініка естетичної медицини • Київ</p>
              </div>
            </a>

            <a href="https://www.stesthetic.com/" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/stethethic-optimized.jpg" alt="St Esthetic" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Партнер Termosalud</span>
                  </span>
                </div>
              </div>
              <div class="partner-card-info">
                <h3 class="partner-title">St Esthetic</h3>
                <p class="partner-category">Центр апаратної косметології • Київ</p>
              </div>
            </a>
          </div>
        </div>
      </section>
    `;

    // Modern Screen 6: SEO Section with Scroll Blur-In Reveal and No Read More Button
    const modernSeoSection = `
      <!-- Screen 6: Modern SEO & About Article with Scroll Blur-In Reveal -->
      <section class="seo_text">
        <div class="container">
          <div class="seo_text_content">
            <div class="seo-badge blur-reveal">
              <span>Експертиза та якість</span>
            </div>
            
            <h2 class="seo-main-title blur-reveal">Преміальне косметологічне обладнання для естетичної медицини в Україні</h2>
            
            <p class="seo-lead-p blur-reveal">
              Сучасний ринок естетичної медицини диктує найвищі стандарти якості. Пацієнти обирають клініки, які пропонують безпечні, комфортні та результативні процедури з науково доведеною дією. Компанія <strong>Termosalud Україна</strong> — ваш надійний стратегічний партнер та офіційний ексклюзивний дистриб'ютор провідного іспанського обладнання на ринку України.
            </p>

            <p class="blur-reveal">
              Ми пропонуємо інноваційні флагманські апарати брендів <strong>ZIONIC</strong> та <strong>LINFOPRESS</strong>, які дозволяють медичним центрам виходити на безумовні лідерські позиції та пропонувати клієнтам послуги найвищого світового рівня.
            </p>

            <div class="seo-highlight-card blur-reveal">
              <h3 class="seo-sub-title">Чому провідні клініки та медичні центри обирають Termosalud:</h3>
              <ul class="seo-specs-grid">
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fill-opacity="0.15" stroke-width="1.8" stroke-linejoin="round"></path><path d="M8.5 12L11 14.5L15.5 9.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </span>
                  <div>
                    <strong>Затребуваність високих технологій:</strong>
                    <span>Ретельно відбираємо апарати, які відповідають світовим трендам і мають стабільно високий попит серед пацієнтів.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fill-opacity="0.15" stroke-width="1.8" stroke-linejoin="round"></path><path d="M8.5 12L11 14.5L15.5 9.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </span>
                  <div>
                    <strong>Висока рентабельність та окупність:</strong>
                    <span>Швидка окупність інвестицій (від 3–4 місяців) забезпечує безпечне та прогнозоване зростання прибутку вашої клініки.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fill-opacity="0.15" stroke-width="1.8" stroke-linejoin="round"></path><path d="M8.5 12L11 14.5L15.5 9.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </span>
                  <div>
                    <strong>Медична безпека (FDA, CE, ISO):</strong>
                    <span>Обладнання пройшло найсуворіші клінічні випробування в Європі та США, гарантуючи повну безпеку процедур.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fill-opacity="0.15" stroke-width="1.8" stroke-linejoin="round"></path><path d="M8.5 12L11 14.5L15.5 9.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </span>
                  <div>
                    <strong>Комплексна академія навчання:</strong>
                    <span>Багаторівнева підготовка ваших лікарів, постановка руки, готові протоколи лікування та міжнародні стажування.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fill-opacity="0.15" stroke-width="1.8" stroke-linejoin="round"></path><path d="M8.5 12L11 14.5L15.5 9.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </span>
                  <div>
                    <strong>Офіційна сервісна підтримка 24/7:</strong>
                    <span>Власний склад оригінальних запчастин в Україні, швидкий виїзд інженера та підмінний фонд обладнання без простоїв.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" fill="currentColor" fill-opacity="0.15" stroke-width="1.8" stroke-linejoin="round"></path><path d="M8.5 12L11 14.5L15.5 9.5" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  </span>
                  <div>
                    <strong>Експертний консалтинг та маркетинг:</strong>
                    <span>Допомагаємо інтегрувати апаратний напрямок у вашу бізнес-модель та залучати потік платоспроможних клієнтів.</span>
                  </div>
                </li>
              </ul>
            </div>

            <h2 class="seo-second-title blur-reveal">Інвестиції в успішне майбутнє вашої клініки</h2>
            
            <p class="blur-reveal">
              Розвиток напрямку апаратної корекції тіла та пресотерапії — один із найприбутковіших векторів сучасної естетичної медицини. Пацієнти все частіше обирають безпечні та приємні неінвазивні процедури з миттєвим видимим ефектом. Обладнання Termosalud формує стабільно високу лояльність та забезпечує регулярні візити пацієнтів.
            </p>

            <p class="blur-reveal">
              Переконайтеся у винятковій якості та ефективності технологій особисто. Залиште заявку на нашому сайті, і наші сертифіковані експерти організують індивідуальну презентацію та тест-драйв флагманського обладнання.
            </p>
          </div>
        </div>
      </section>
    `;

    // Inject Hero clean section after header
    html = html.replace('</header>', `</header>\n${heroCleanSection}`);

    // Replace the old our-prods block completely with modernScreen2Section
    html = html.replace(/<div[\s\n]+class=our-prods>[\s\S]*?<\/div><\/div><\/div><\/div><\/div>/i, modernScreen2Section);

    // Replace old why-us block with modernWhyUsSection
    html = html.replace(/<div[\s\n]+class=why-us>[\s\S]*?<\/div><\/div><\/div><\/div><\/div>/i, modernWhyUsSection);

    // Replace old application-presentation block completely up to partners (removes old duplicate photo container)
    html = html.replace(/<div[\s\n]+class=application-presentation>[\s\S]*?(?=<div[\s\n]+class=partners>)/i, `${modernPresentationSection}\n`);

    // Replace old partners block and seo_text block with modern versions
    html = html.replace(/<div[\s\n]+class=partners>[\s\S]*?<section[\s\n]+class="seo_text\s*"[\s\S]*?<\/section>/i, `${modernPartnersSection}\n${modernSeoSection}`);
  }

  // Modern Ultra-Compact Single-Line Footer (Universal for all pages)
  const modernCompactFooter = `
    <!-- Modern Sleek 1-Line Footer -->
    <footer class="modern-compact-footer">
      <div class="container-fluid" style="max-width: 1480px; margin: 0 auto; padding: 0 24px;">
        <div class="compact-footer-line">
          <!-- Left: Logo & Copyright -->
          <div class="footer-left">
            <a href="/" class="compact-footer-logo">
              <img src="/wp-content/themes/zionic/assets/images/footer-logo.svg" alt="Termosalud">
            </a>
            <span class="footer-divider">•</span>
            <span class="compact-footer-copy">© 2026 Termosalud Україна</span>
          </div>

          <!-- Middle: Navigation -->
          <nav class="compact-footer-nav">
            <a href="#our-products">Обладнання</a>
            <a href="/zionic/">ZIONIC</a>
            <a href="/linfopress/">LINFOPRESS</a>
            <a href="/about-us/">Про нас</a>
          </nav>

          <!-- Right: Direct Inline Contacts -->
          <div class="compact-footer-contacts">
            <a href="tel:+380937205277" class="compact-footer-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>+380 93 720 52 77</span>
            </a>
            <span class="footer-divider">•</span>
            <a href="mailto:shop@termosalud.com.ua" class="compact-footer-link">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>shop@termosalud.com.ua</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;

  html = html.replace(/<footer[\s\S]*?<\/footer>/i, modernCompactFooter);

  // Add styles & 10 Curated Minimalist Google Fonts
  const headInject = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Mulish:wght@300;400;500;600;700;800;900&family=Onest:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Unbounded:wght@300;400;600;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/css/custom.css">
`;

  const fontPickerDockHtml = `
    <!-- Interactive Font Picker Dock (10 Curated Cyrillic Font Families) -->
    <div id="font-picker-widget" class="font-picker-dock">
      <div class="font-dock-label">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
        <span>Шрифт сайту</span>
      </div>
      <div class="font-dock-options-wrap">
        <button class="font-opt-btn active" data-font="montserrat" data-family="'Montserrat', sans-serif">
          <span>Montserrat</span>
          <span class="font-opt-tag">Оригінал</span>
        </button>
        <button class="font-opt-btn" data-font="manrope" data-family="'Manrope', sans-serif">
          <span>Manrope</span>
          <span class="font-opt-tag">Swiss Tech</span>
        </button>
        <button class="font-opt-btn" data-font="jakarta" data-family="'Plus Jakarta Sans', sans-serif">
          <span>Jakarta Sans</span>
          <span class="font-opt-tag">Modern</span>
        </button>
        <button class="font-opt-btn" data-font="inter" data-family="'Inter', sans-serif">
          <span>Inter</span>
          <span class="font-opt-tag">Pixel Clear</span>
        </button>
        <button class="font-opt-btn" data-font="onest" data-family="'Onest', sans-serif">
          <span>Onest</span>
          <span class="font-opt-tag">Кирилиця Pro</span>
        </button>
        <button class="font-opt-btn" data-font="outfit" data-family="'Outfit', sans-serif">
          <span>Outfit</span>
          <span class="font-opt-tag">Aesthetic</span>
        </button>
        <button class="font-opt-btn" data-font="golos" data-family="'Golos Text', sans-serif">
          <span>Golos</span>
          <span class="font-opt-tag">Editorial</span>
        </button>
        <button class="font-opt-btn" data-font="unbounded" data-family="'Unbounded', sans-serif">
          <span>Unbounded</span>
          <span class="font-opt-tag">Hi-Tech</span>
        </button>
        <button class="font-opt-btn" data-font="playfair" data-family="'Playfair Display', serif" data-heading="'Playfair Display', serif" data-body="'Montserrat', sans-serif">
          <span>Playfair + Luxe</span>
          <span class="font-opt-tag">Fashion Serif</span>
        </button>
        <button class="font-opt-btn" data-font="mulish" data-family="'Mulish', sans-serif">
          <span>Mulish</span>
          <span class="font-opt-tag">Minimal</span>
        </button>
      </div>
      <button id="font-dock-toggle" class="font-dock-toggle-btn" title="Згорнути / Розгорнути меню шрифтів">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>

    <script>
      (function() {
        const saved = localStorage.getItem('termosalud_font') || 'montserrat';
        const widget = document.getElementById('font-picker-widget');
        const btns = document.querySelectorAll('.font-opt-btn');
        const toggle = document.getElementById('font-dock-toggle');

        function applyFont(fontKey) {
          const btn = document.querySelector('.font-opt-btn[data-font="' + fontKey + '"]');
          if (!btn) return;
          btns.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');

          const bodyFamily = btn.getAttribute('data-body') || btn.getAttribute('data-family');
          const headingFamily = btn.getAttribute('data-heading') || btn.getAttribute('data-family');

          document.documentElement.style.setProperty('--active-font', bodyFamily);
          document.documentElement.style.setProperty('--active-heading-font', headingFamily);
          localStorage.setItem('termosalud_font', fontKey);
        }

        if (saved) applyFont(saved);

        btns.forEach(function(btn) {
          btn.addEventListener('click', function() {
            applyFont(btn.getAttribute('data-font'));
          });
        });

        if (toggle && widget) {
          toggle.addEventListener('click', function() {
            const isMin = widget.classList.toggle('minimized');
            toggle.innerHTML = isMin ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>';
          });
        }
      })();
    </script>
  `;

  const footerInject = `
  ${fontPickerDockHtml}
  <script type="module" src="/src/js/main.js"></script>
`;

  if (html.includes('</head>')) {
    html = html.replace('</head>', `${headInject}\n</head>`);
  }
  if (html.includes('</body>')) {
    html = html.replace('</body>', `${footerInject}\n</body>`);
  } else {
    html += footerInject;
  }

  return html;
}

for (const p of pages) {
  const rawFile = path.join(rootDir, 'docs/research/raw_html', `${p.name}.html`);
  if (!fs.existsSync(rawFile)) continue;
  const raw = fs.readFileSync(rawFile, 'utf-8');
  const processed = cleanHtml(raw, p.name);

  fs.mkdirSync(p.outDir, { recursive: true });
  fs.writeFileSync(path.join(p.outDir, p.outFile), processed, 'utf-8');
  console.log(`Generated ${path.join(p.outDir, p.outFile)} (${processed.length} bytes)`);
}

console.log('HTML pages successfully regenerated with modern SEO Blur-In Reveal Section!');

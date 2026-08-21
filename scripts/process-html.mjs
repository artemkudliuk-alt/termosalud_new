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
              <!-- Slide 1: INÜO -->
              <div class="hero-product-slide active" data-slide="0">
                <div class="product-info">
                  <h2 class="product-name">INÜO</h2>
                  <a href="#popup_request" class="product-btn header-btn">
                    <span>ДЕТАЛЬНІШЕ</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
                <div class="product-image-wrap">
                  <img src="/wp-content/uploads/2026/07/slider-inuo-home.png" alt="INÜO">
                </div>
              </div>

              <!-- Slide 2: ZIONIC PRO MAX -->
              <div class="hero-product-slide" data-slide="1">
                <div class="product-info">
                  <h2 class="product-name">ZIONIC<br><span>PRO MAX</span></h2>
                  <a href="/zionic/" class="product-btn">
                    <span>ДЕТАЛЬНІШЕ</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
                <div class="product-image-wrap">
                  <img src="/wp-content/uploads/2026/07/ZIONIC-PRO-MAX-home-slider.png" alt="ZIONIC PRO MAX">
                </div>
              </div>

              <!-- Slide 3: LINFOPRESS EVOLUTION PRO -->
              <div class="hero-product-slide" data-slide="2">
                <div class="product-info">
                  <h2 class="product-name">LINFOPRESS<br><span>EVOLUTION PRO</span></h2>
                  <a href="/linfopress/" class="product-btn">
                    <span>ДЕТАЛЬНІШЕ</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                </div>
                <div class="product-image-wrap">
                  <img src="/wp-content/uploads/2026/03/linfopress-optimized.png" alt="Linfopress Evolution PRO">
                </div>
              </div>
            </div>

            <!-- Vertical Pagination Dots -->
            <div class="hero-slider-dots">
              <button class="slider-dot active" data-index="0" aria-label="Slide 1"></button>
              <button class="slider-dot" data-index="1" aria-label="Slide 2"></button>
              <button class="slider-dot" data-index="2" aria-label="Slide 3"></button>
            </div>
          </div>
        </div>
      </section>
    `;

    // Modern Option 1 Screen 2: Modern Split Cards
    const modernScreen2Section = `
      <!-- Screen 2: Modern Split Cards (Option 1) -->
      <section id="our-products" class="our-prods">
        <div class="container">
          <div class="our-prods-header" data-aos="fade-up">
            <div class="our-prods-badge">Інноваційні технології Termosalud</div>
            <h2><span class="first-word-stripe">Флагманське</span> обладнання для клінік</h2>
            <p>Преміальні апаратні рішення з високою рентабельністю, швидкою окупністю та доведеною клінічною ефективністю</p>
          </div>

          <div class="modern-split-grid">
            <!-- Card 1: Linfopress Evolution PRO -->
            <div class="modern-product-card" data-aos="fade-up" data-aos-delay="100">
              <div class="card-top-meta">
                <span class="card-badge">Пресотерапія 4-го покоління</span>
                <span class="card-origin">Іспанія • 24 сектори</span>
              </div>

              <div class="card-visual-podium">
                <div class="podium-ambient-glow"></div>
                <img src="/wp-content/uploads/2026/03/linfopress-optimized.png" alt="Linfopress Evolution PRO" class="card-device-img">
              </div>

              <div class="card-content-wrap">
                <h3 class="card-device-title">Linfopress Evolution PRO</h3>
                <p class="card-device-desc">
                  Професійна система циклічної пресотерапії для ефективного лімфодренажу, моделювання контурів тіла та реабілітації.
                </p>

                <ul class="card-specs-list">
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.6" opacity="0.3"></circle><path d="M8 12.5L10.8 15.2L16 9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                    <span>24 незалежні сектори послідовного тиску</span>
                  </li>
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.6" opacity="0.3"></circle><path d="M8 12.5L10.8 15.2L16 9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                    <span>Індивідуальні протоколи для кожного клієнта</span>
                  </li>
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.6" opacity="0.3"></circle><path d="M8 12.5L10.8 15.2L16 9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                    <span>Швидка окупність інвестицій від 3–4 місяців</span>
                  </li>
                </ul>

                <div class="card-actions-group">
                  <a href="/linfopress/" class="card-btn-primary">
                    <span>Дізнатись більше</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                  <button class="card-btn-secondary header-btn" data-target="#popup_request">Тест-драйв</button>
                </div>
              </div>
            </div>

            <!-- Card 2: ZIONIC -->
            <div class="modern-product-card" data-aos="fade-up" data-aos-delay="200">
              <div class="card-top-meta">
                <span class="card-badge">RF + Ротаційний масаж</span>
                <span class="card-origin">Іспанія • MARP Technology</span>
              </div>

              <div class="card-visual-podium">
                <div class="podium-ambient-glow"></div>
                <img src="/wp-content/uploads/2026/03/zionic-optimized.png" alt="Zionic" class="card-device-img">
              </div>

              <div class="card-content-wrap">
                <h3 class="card-device-title">ZIONIC</h3>
                <p class="card-device-desc">
                  Перша у світі запатентована технологія, що поєднує глибокий ротаційний масаж активної дії (MARP) та резистивний RF.
                </p>

                <ul class="card-specs-list">
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.6" opacity="0.3"></circle><path d="M8 12.5L10.8 15.2L16 9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                    <span>Поєднання MARP масажу та RF енергії 2.0</span>
                  </li>
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.6" opacity="0.3"></circle><path d="M8 12.5L10.8 15.2L16 9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                    <span>Зменшення об'ємів, ліфтинг та усунення целюліту</span>
                  </li>
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.6" opacity="0.3"></circle><path d="M8 12.5L10.8 15.2L16 9" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    </span>
                    <span>Помітний клінічний результат вже з 1-ї процедури</span>
                  </li>
                </ul>

                <div class="card-actions-group">
                  <a href="/zionic/" class="card-btn-primary">
                    <span>Дізнатись більше</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </a>
                  <button class="card-btn-secondary header-btn" data-target="#popup_request">Тест-драйв</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Modern Screen 3: Why Us (Чому ми) with animated micro-interaction icons
    const modernWhyUsSection = `
      <!-- Screen 3: Modern Why Us with Animated Micro-Interaction Icons -->
      <section class="why-us">
        <div class="container">
          <div class="why-us-header" data-aos="fade-up">
            <div class="why-us-badge">Надійний партнер вашої клініки</div>
            <h2><span class="first-word-stripe">Чому</span> провідні клініки обирають Termosalud</h2>
            <p>Повний комплекс підтримки бізнесу: від оригінального сертифікованого обладнання до навчання лікарів та маркетингу</p>
          </div>

          <div class="modern-why-grid">
            <!-- Card 1: Світове визнання -->
            <div class="modern-why-card" data-aos="fade-up" data-aos-delay="0">
              <div class="why-icon-pod">
                <svg class="duotone-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="12" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.8"/>
                  <ellipse cx="16" cy="16" rx="5" ry="12" stroke="currentColor" stroke-width="1.4" opacity="0.6"/>
                  <path d="M4.5 12.5C8 14 12 14.5 16 14.5C20 14.5 24 14 27.5 12.5" stroke="currentColor" stroke-width="1.4" opacity="0.6"/>
                  <path d="M4.5 19.5C8 18 12 17.5 16 17.5C20 17.5 24 18 27.5 19.5" stroke="currentColor" stroke-width="1.4" opacity="0.6"/>
                  <path d="M16 4V28" stroke="currentColor" stroke-width="1.4" opacity="0.6"/>
                  <circle cx="23" cy="9" r="5" fill="#1e232e" stroke="#5d8796" stroke-width="1.5"/>
                  <path d="M23 6.8L23.9 8.6L25.8 8.9L24.4 10.2L24.8 12L23 11.1L21.2 12L21.6 10.2L20.2 8.9L22.1 8.6L23 6.8Z" fill="#ffff00"/>
                </svg>
              </div>
              <h3 class="why-card-title">Світове визнання</h3>
              <p class="why-card-text">
                Апарати Termosalud визнані лідерами в клініках Європи та США. Висока клінічна ефективність, хай-тек дизайн та бездоганна надійність зробили їх вибором №1 серед провідних фахівців.
              </p>
            </div>

            <!-- Card 2: Висока рентабельність -->
            <div class="modern-why-card" data-aos="fade-up" data-aos-delay="100">
              <div class="why-icon-pod">
                <svg class="duotone-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="5" width="24" height="22" rx="6" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.8"/>
                  <rect x="8" y="18" width="3.5" height="5" rx="1.5" fill="currentColor" opacity="0.4"/>
                  <rect x="14.25" y="14" width="3.5" height="9" rx="1.5" fill="currentColor" opacity="0.6"/>
                  <rect x="20.5" y="10" width="3.5" height="13" rx="1.5" fill="currentColor" fill-opacity="0.9"/>
                  <path d="M8 16L14 11L19 13L24.5 7.5" stroke="#5d8796" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M20.5 7.5H24.5V11.5" stroke="#5d8796" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="why-card-title">Висока рентабельність</h3>
              <p class="why-card-text">
                Ефективна інвестиція зі швидкою окупністю від 3–4 місяців. Стабільно високий попит пацієнтів на процедури моделювання тіла гарантує щоденний прогнозований прибуток.
              </p>
            </div>

            <!-- Card 3: Медична безпека -->
            <div class="modern-why-card" data-aos="fade-up" data-aos-delay="200">
              <div class="why-icon-pod">
                <svg class="duotone-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3L6 7V15C6 22 10.5 27.5 16 29C21.5 27.5 26 22 26 15V7L16 3Z" fill="currentColor" fill-opacity="0.12" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                  <path d="M10.5 16H13L14.8 11.5L17.2 20.5L19 16H21.5" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="22" cy="9" r="4.5" fill="#1e232e" stroke="#5d8796" stroke-width="1.5"/>
                  <path d="M20.5 9L21.5 10L23.5 8" stroke="#ffff00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="why-card-title">Медична безпека (FDA, CE)</h3>
              <p class="why-card-text">
                Безпека на засадах доказової медицини. Обладнання має найвищі міжнародні сертифікати якості США (FDA), Європи (CE) та України. Ризики ускладнень зведені до нуля.
              </p>
            </div>

            <!-- Card 4: Академія та навчання -->
            <div class="modern-why-card" data-aos="fade-up" data-aos-delay="300">
              <div class="why-icon-pod">
                <svg class="duotone-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 5L3 11.5L16 18L29 11.5L16 5Z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                  <path d="M8 14.5V20.5C8 23 11.5 25.5 16 25.5C20.5 25.5 24 23 24 20.5V14.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <path d="M27 12.5V22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="27" cy="23.5" r="1.5" fill="currentColor"/>
                  <circle cx="16" cy="18" r="3.5" fill="#1e232e" stroke="#5d8796" stroke-width="1.5"/>
                  <path d="M16 16.5V19.5M14.5 18H17.5" stroke="#ffff00" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <h3 class="why-card-title">Академія та навчання</h3>
              <p class="why-card-text">
                Авторська система підготовки фахівців. Проводимо базові та поглиблені тренінги з постановкою руки, передаємо протоколи лікування та організовуємо закордонні стажування.
              </p>
            </div>

            <!-- Card 5: Офіційний сервіс -->
            <div class="modern-why-card" data-aos="fade-up" data-aos-delay="400">
              <div class="why-icon-pod">
                <svg class="duotone-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 3.5H18L18.8 6.2C19.6 6.5 20.4 7 21.1 7.6L23.7 6.6L26.5 9.4L25.5 12C26.1 12.7 26.6 13.5 26.9 14.3L29.5 15.1V18.9L26.9 19.7C26.6 20.5 26.1 21.3 25.5 22L26.5 24.6L23.7 27.4L21.1 26.4C20.4 27 19.6 27.5 18.8 27.8L18 30.5H14L13.2 27.8C12.4 27.5 11.6 27 10.9 26.4L8.3 27.4L5.5 24.6L6.5 22C5.9 21.3 5.4 20.5 5.1 19.7L2.5 18.9V15.1L5.1 14.3C5.4 13.5 5.9 12.7 6.5 12L5.5 9.4L8.3 6.6L10.9 7.6C11.6 7 12.4 6.5 13.2 6.2L14 3.5Z" fill="currentColor" fill-opacity="0.1" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
                  <circle cx="16" cy="17" r="6" fill="#1e232e" stroke="#5d8796" stroke-width="1.5"/>
                  <path d="M16 13.5V17L18.5 18.5" stroke="#ffff00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="why-card-title">Офіційний сервіс 24/7</h3>
              <p class="why-card-text">
                Пряма гарантія від виробника, склад оригінальних комплектуючих в Україні, оперативний виїзд інженера та наявність підмінного фонду апаратів без простоїв для клініки.
              </p>
            </div>

            <!-- Card 6: Команда експертів -->
            <div class="modern-why-card" data-aos="fade-up" data-aos-delay="500">
              <div class="why-icon-pod">
                <svg class="duotone-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="12" r="3.5" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.4"/>
                  <path d="M2.5 24C2.5 20.5 5 18 8 18C10 18 11.8 19 12.8 20.6" stroke="currentColor" stroke-width="1.4" opacity="0.6" stroke-linecap="round"/>
                  
                  <circle cx="24" cy="12" r="3.5" fill="currentColor" fill-opacity="0.3" stroke="currentColor" stroke-width="1.4"/>
                  <path d="M29.5 24C29.5 20.5 27 18 24 18C22 18 20.2 19 19.2 20.6" stroke="currentColor" stroke-width="1.4" opacity="0.6" stroke-linecap="round"/>

                  <circle cx="16" cy="9.5" r="4.5" fill="currentColor" fill-opacity="0.2" stroke="currentColor" stroke-width="1.8"/>
                  <path d="M9 25.5C9 21 12 18 16 18C20 18 23 21 23 25.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  <circle cx="22" cy="22" r="4.5" fill="#1e232e" stroke="#5d8796" stroke-width="1.5"/>
                  <path d="M22 19.5L22.8 21.2L24.5 21.5L23.2 22.8L23.5 24.5L22 23.6L20.5 24.5L20.8 22.8L19.5 21.5L21.2 21.2L22 19.5Z" fill="#ffff00"/>
                </svg>
              </div>
              <h3 class="why-card-title">Команда експертів</h3>
              <p class="why-card-text">
                Понад 15 років успішного досвіду в індустрії естетичної медицини. Наші лікарі-тренери та консультанти допомогли запустити та розвинути сотні провідних клінік в Україні.
              </p>
            </div>
          </div>
        </div>
      </section>
    `;

    // Modern Screen 4: Application Presentation Section with Shimmering Form and Cinematic Photo
    const modernPresentationSection = `
      <!-- Screen 4: Modern Presentation & Test-Drive Section -->
      <section class="application-presentation">
        <div class="container">
          <div class="presentation-header" data-aos="fade-up">
            <div class="presentation-badge">Персональний тест-драйв</div>
            <h2><span class="first-word-stripe">Замовте</span> презентацію та пробну процедуру</h2>
            <p>Оцініть можливості та результативність обладнання Termosalud у вашій клініці або в нашому демонстраційному центрі</p>
          </div>

          <div class="presentation-grid-wrap">
            <!-- Left Column: Shimmering Animated Luxury Form Card -->
            <div class="presentation-form-card" data-aos="fade-up-right" data-aos-delay="100">
              <div class="shimmer-border-halo"></div>
              <div class="form-card-inner">
                <div class="form-top-badge">
                  <span class="pulse-dot"></span>
                  <span>Ексклюзивно для фахівців</span>
                </div>
                <h3 class="form-title">Заявка на тест-драйв апаратів</h3>
                <div class="form-notice">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></circle><path d="M12 7V12" stroke-width="2.2" stroke-linecap="round"></path><circle cx="12" cy="16" r="1" fill="currentColor"></circle></svg>
                  <span>Увага! Консультуємо виключно керівників та лікарів клінік естетичної медицини.</span>
                </div>

                <form class="presentation-clean-form" onsubmit="event.preventDefault(); document.querySelector('.form-success-toast')?.classList.add('show'); setTimeout(() => document.querySelector('.form-success-toast')?.classList.remove('show'), 4000);">
                  <div class="form-group-item">
                    <label class="form-label-text" for="pres_name">Ваше ім'я</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="pres_name" placeholder="Ім'я та прізвище" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для зв'язку</label>
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

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="pres_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="pres_phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>

                    <div class="form-group-item">
                      <label class="form-label-text" for="pres_city">Місто</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21.5C12 21.5 19 14.5 19 9.5C19 5.5 16 2.5 12 2.5C8 2.5 5 5.5 5 9.5C5 14.5 12 21.5 12 21.5Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></path><circle cx="12" cy="9.5" r="2.5" stroke-width="1.6" fill="currentColor"></circle></svg>
                        <input type="text" id="pres_city" placeholder="Ваше місто" required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text" for="pres_email">Email (необов'язково)</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="5" width="18" height="14" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><path d="M3 7L12 13L21 7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                      <input type="email" id="pres_email" placeholder="example@clinic.com" class="luxury-form-input">
                    </div>
                  </div>

                  <button type="submit" class="shimmer-submit-btn">
                    <span class="btn-text">ЗАМОВИТИ ПРЕЗЕНТАЦІЮ</span>
                    <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    <span class="btn-sweep-light"></span>
                  </button>
                </form>
              </div>
            </div>

            <!-- Right Column: Cinematic Presentation Masterclass Image with Floating Badges -->
            <div class="presentation-media-card" data-aos="fade-up-left" data-aos-delay="200">
              <div class="media-ambient-halo"></div>
              <div class="media-image-container">
                <img src="/wp-content/themes/zionic/assets/images/presentation.webp" alt="Termosalud Masterclass Presentation" class="cinematic-presentation-img">
                
                <!-- Floating Glass Badge: Top -->
                <div class="floating-glass-pill top-right">
                  <div class="pill-icon-wrap">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="13" r="8" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M12 9V13L15 15" stroke-width="2" stroke-linecap="round"></path><path d="M10 2.5H14" stroke-width="2" stroke-linecap="round"></path></svg>
                  </div>
                  <span>Практичний майстер-клас 1-on-1</span>
                </div>

                <!-- Floating Glass Badge: Bottom -->
                <div class="floating-glass-card bottom-left">
                  <div class="badge-star-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="1.6" opacity="0.4"></circle><path d="M12 4.5L14 8.8L18.5 9.4L15.2 12.5L16 17L12 14.8L8 17L8.8 12.5L5.5 9.4L10 8.8L12 4.5Z" fill="#ffff00" stroke="#1e232e" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                  </div>
                  <div class="badge-content-text">
                    <div class="badge-strong">Офіційний тренер Termosalud</div>
                    <div class="badge-sub">Постановка руки лікаря та клінічні протоколи</div>
                  </div>
                </div>
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
            <h2><span class="first-word-stripe">Провідні</span> клініки України обирають Termosalud</h2>
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
            
            <h2 class="seo-main-title blur-reveal"><span class="first-word-stripe">Преміальне</span> косметологічне обладнання для естетичної медицини в Україні</h2>
            
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

            <h2 class="seo-second-title blur-reveal"><span class="first-word-stripe">Інвестиції</span> в успішне майбутнє вашої клініки</h2>
            
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

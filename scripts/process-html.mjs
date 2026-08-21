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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span>24 незалежні сектори послідовного тиску</span>
                  </li>
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span>Індивідуальні протоколи для кожного клієнта</span>
                  </li>
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
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
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span>Поєднання MARP масажу та RF енергії 2.0</span>
                  </li>
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    <span>Зменшення об'ємів, ліфтинг та усунення целюліту</span>
                  </li>
                  <li>
                    <span class="spec-icon-check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10"></polyline>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                  <span>Увага! Консультуємо виключно керівників та лікарів клінік естетичної медицини.</span>
                </div>

                <form class="presentation-clean-form" onsubmit="event.preventDefault(); document.querySelector('.form-success-toast')?.classList.add('show'); setTimeout(() => document.querySelector('.form-success-toast')?.classList.remove('show'), 4000);">
                  <div class="form-group-item">
                    <label class="form-label-text" for="pres_name">Ваше ім'я</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
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
                        <span class="pill-dot dot-cyan"></span>
                        <span>Telegram</span>
                      </label>
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="pres_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        <input type="tel" id="pres_phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>

                    <div class="form-group-item">
                      <label class="form-label-text" for="pres_city">Місто</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        <input type="text" id="pres_city" placeholder="Ваше місто" required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text" for="pres_email">Email (необов'язково)</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polygon points="12 6 12 12 16 14"></polygon></svg>
                  </div>
                  <span>Практичний майстер-клас 1-on-1</span>
                </div>

                <!-- Floating Glass Badge: Bottom -->
                <div class="floating-glass-card bottom-left">
                  <div class="badge-star-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <div>
                    <strong>Затребуваність високих технологій:</strong>
                    <span>Ретельно відбираємо апарати, які відповідають світовим трендам і мають стабільно високий попит серед пацієнтів.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <div>
                    <strong>Висока рентабельність та окупність:</strong>
                    <span>Швидка окупність інвестицій (від 3–4 місяців) забезпечує безпечне та прогнозоване зростання прибутку вашої клініки.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <div>
                    <strong>Медична безпека (FDA, CE, ISO):</strong>
                    <span>Обладнання пройшло найсуворіші клінічні випробування в Європі та США, гарантуючи повну безпеку процедур.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <div>
                    <strong>Комплексна академія навчання:</strong>
                    <span>Багаторівнева підготовка ваших лікарів, постановка руки, готові протоколи лікування та міжнародні стажування.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <div>
                    <strong>Офіційна сервісна підтримка 24/7:</strong>
                    <span>Власний склад оригінальних запчастин в Україні, швидкий виїзд інженера та підмінний фонд обладнання без простоїв.</span>
                  </div>
                </li>
                <li>
                  <span class="seo-check-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
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

  // Add styles & fonts
  const headInject = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/css/custom.css">
`;

  const footerInject = `
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

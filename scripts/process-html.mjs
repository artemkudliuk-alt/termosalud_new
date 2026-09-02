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

  // Clean Minimalist Header (Matching Original Termosalud Spanish Aesthetic)
  const modernHeaderHtml = `
    <header class="header">
      <!-- 1. Mobile Left: Black Hamburger Menu Button (Hidden on Desktop) -->
      <div class="header-left-nav">
        <button class="custom-burger-btn" id="custom-burger-btn" aria-label="Меню" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- 2. Logo: Left-aligned on Desktop, Centered on Mobile -->
      <a href="/" class="logo header-logo" aria-label="Termosalud">
        <picture>
          <source srcset="/wp-content/themes/zionic/assets/images/logo.svg" media="(min-width: 992px)">
          <img src="/wp-content/themes/zionic/assets/images/logo.svg" alt="Termosalud Medical & Aesthetic">
        </picture>
      </a>

      <!-- 3. Navigation Dropdown / Center Menu -->
      <div class="header-center" id="mobile-nav-panel">
        <nav class="header-block-on-main">
          <ul>
            <li><a href="/zionic/">Zionic</a></li>
            <li><a href="/linfopress/">Linfopress</a></li>
            <li><a href="#why-us">Переваги</a></li>
            <li><a href="/about-us/">Про нас</a></li>
            <li><a href="#about-brand">Контакти</a></li>
          </ul>
        </nav>

        <!-- Telegram & Phone inside Mobile Drawer Menu -->
        <div class="mobile-menu-socials">
          <a href="https://t.me/EstetPartners" target="_blank" rel="noopener noreferrer" class="mobile-menu-tg-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span>Написати в Telegram</span>
          </a>
          <a class="mobile-menu-phone" href="tel:+380937205277">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>+380 93 720 52 77</span>
          </a>
        </div>
      </div>

      <!-- 4. Header Right: Desktop Phone & CTA + Mobile Presentation Button -->
      <div class="header-right-actions">
        <a class="header-phone desktop-only-phone" href="tel:+380937205277">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          <span>+380 93 720 52 77</span>
        </a>

        <button class="header-btn desktop-only-cta" data-target="#popup_request">
          Заявка на презентацію
        </button>

        <!-- Compact Presentation Button on Mobile (Right side) -->
        <button class="header-btn header-btn-compact mobile-only-cta" data-target="#popup_request">
          ПРЕЗЕНТАЦІЯ
        </button>
      </div>
    </header>
  `;


  let html = raw;
  // Remove canonical links that cause Vite build EISDIR error
  html = html.replace(/<link[\s\S]*?rel=["']?canonical["']?[\s\S]*?>/gi, '');

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
  // Inject modern header across all pages
  html = html.replace(/<header[\s\S]*?<\/header>/i, modernHeaderHtml);

  if (pageName === 'index') {
    
    // Clean Minimalist Header (Matching Original Termosalud Spanish Aesthetic)
    

    const heroCleanSection = `
      <!-- Screen 1: Clean 4K Hero Video Banner (Ukrainian Title, English Device Names) -->
      <section class="hero-clean-section">
        <video autoplay loop muted playsinline class="hero-clean-video" preload="auto">
          <source src="/wp-content/uploads/2024/02/EMPOWER-BEAUTY-TOGETHER-4K.mp4" type="video/mp4">
        </video>

        <div class="hero-clean-container">
          <!-- Left Column: Title & Logo -->
          <div class="hero-left-col">
            <h1 class="hero-clean-title">
              <span class="word-empower">НОВА</span>
              <span class="word-beauty">ЕРА КРАСИ</span>
              <span class="hero-subtext">
                <span class="hero-subline">ЗА ДОПОМОГОЮ ПРЕМІАЛЬНИХ АПАРАТНИХ РІШЕНЬ</span>
              </span>
            </h1>
            <div class="hero-logo-wrap">
              <img src="/wp-content/themes/zionic/assets/images/logo.svg" alt="Termosalud Medical & Aesthetic" class="hero-termosalud-logo">
            </div>
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

            <!-- Vertical Arrow Switchers (Hover-Triggered Up / Down) -->
            <div class="hero-slider-arrows">
              <button class="slider-arrow slider-arrow-up active" data-index="0" aria-label="Zionic MARP System">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
              <button class="slider-arrow slider-arrow-down" data-index="1" aria-label="Linfopress Evolution PRO">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;

    // Modern Screen 2: Flagship Equipment Showcase (Zionic Showcase with Full-Width Video Banner + Description + YouTube Live Demo)
    const modernScreen2Section = `
      <!-- Screen 2: Flagship Equipment Showcase (Zionic Showcase with Full-Width Video Banner + Description + YouTube Live Demo) -->
      <section id="our-products" class="zionic-showcase-section">
        
        <!-- 1. Main Section Header (Inside Container) -->
        <div class="container">
          <div class="zionic-section-header">
            <h2>Інноваційні технології Termosalud</h2>
            <p>Преміальні апаратні рішення з високою рентабельністю, швидкою окупністю та доведеною клінічною ефективністю</p>
          </div>
        </div>

        <!-- ================= 1. ZIONIC MONOLITH GREY BLOCK ================= -->
        <div class="apparatus-monolith-block zionic-monolith" id="zionic-monolith-block">
          
          <!-- Full-Width 100% Video Banner -->
          <div class="zionic-video-banner-fullwidth">
            <div class="video-banner-media">
              <video autoplay loop muted playsinline class="video-banner-bg" preload="auto" poster="/photo_zionic.png">
                <source src="/zionic.mp4" type="video/mp4">
              </video>
              <div class="video-banner-overlay"></div>
            </div>
            <div class="video-banner-content">
              <h3 class="video-banner-title">ZIONIC MARP SYSTEM</h3>
            </div>
          </div>

          <!-- Zionic Duo Block (Card + Video) -->
          <div class="zionic-duo-wrapper">
            <div class="container">
              <div class="zionic-duo-container">
                
                <!-- Left Column: Compact Luxury Monochrome Card -->
                <div class="zionic-compact-card">
                  <div class="split-badge-row">
                    <span class="split-badge">✦ MARP + RF TECHNOLOGY</span>
                    <span class="split-tag">MADE IN SPAIN</span>
                  </div>
                  
                  <h3 class="split-title">ZIONIC <span>MARP SYSTEM</span></h3>
                  
                  <ul class="split-bullets">
                    <li><span class="split-check">✓</span> Одночасна дія: ліполіз, ліфтинг та тонус</li>
                    <li><span class="split-check">✓</span> Безболісно та без реабілітації для пацієнта</li>
                    <li><span class="split-check">✓</span> Швидка окупність від 3 до 4 місяців</li>
                  </ul>

                  <div class="split-btn-group">
                    <a href="/zionic/" class="split-btn split-btn-ghost">
                      ДІЗНАТИСЬ БІЛЬШЕ
                    </a>
                    <button class="split-btn split-btn-ghost-muted header-btn" data-target="#popup_request">
                      ТЕСТ-ДРАЙВ
                    </button>
                  </div>
                </div>

                <!-- Right Column: Video Player with Play Button Only -->
                <div class="zionic-youtube-compact-wrapper" data-video-id="CYsDii-PZ7s" data-video-title="ZIONIC MARP SYSTEM Presentation">
                  <div class="expert-video-thumb" style="background-image: url('/wp-content/uploads/2026/03/zionic_expert_cover.png'); background-position: center;">
                    <div class="expert-thumb-info">
                      <span class="expert-thumb-badge">ВІДЕООГЛЯД</span>
                      <h4 class="expert-thumb-title">ЕКСПЕРТИ<br>ПРО ZIONIC</h4>
                      <p class="expert-thumb-subtitle">Клінічний досвід L'Clinic</p>
                    </div>
                    <div class="video-facade-play">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        <!-- ================= 2. LINFOPRESS MONOLITH GREY BLOCK ================= -->
        <div class="apparatus-monolith-block linfopress-monolith" id="linfopress-monolith-block">
          
          <!-- Full-Width 100% Video Banner for Linfopress -->
          <div class="zionic-video-banner-fullwidth linfo-video-banner-fullwidth">
            <div class="video-banner-media">
              <video autoplay loop muted playsinline class="video-banner-bg" preload="auto" poster="/photo_limfo.png">
                <source src="/limfo.mp4" type="video/mp4">
              </video>
              <div class="video-banner-overlay"></div>
            </div>
            <div class="video-banner-content">
              <h3 class="video-banner-title">LINFOPRESS EVOLUTION PRO</h3>
            </div>
          </div>

          <!-- Linfopress Duo Block (Video + Card) -->
          <div class="zionic-duo-wrapper">
            <div class="container">
              <div class="zionic-duo-container duo-reverse">
                
                <!-- Left Column: Video Player with Play Button Only -->
                <div class="zionic-youtube-compact-wrapper" data-video-id="K1v77enueJ8" data-video-title="LINFOPRESS EVOLUTION PRO Presentation">
                  <div class="expert-video-thumb" style="background-image: url('/wp-content/uploads/2026/03/linfopress_expert_cover.png');">
                    <div class="expert-thumb-info">
                      <span class="expert-thumb-badge">ВІДЕООГЛЯД</span>
                      <h4 class="expert-thumb-title">ЕКСПЕРТИ<br>ПРО LINFOPRESS</h4>
                      <p class="expert-thumb-subtitle">Клінічний досвід L'Clinic</p>
                    </div>
                    <div class="video-facade-play">
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>

                <!-- Right Column: Compact Luxury Monochrome Card -->
                <div class="zionic-compact-card">
                  <div class="split-badge-row">
                    <span class="split-badge">✦ 4-IN-1 CYCLIC PRESSOTHERAPY</span>
                    <span class="split-tag">MADE IN SPAIN</span>
                  </div>
                  
                  <h3 class="split-title">LINFOPRESS <span>EVOLUTION PRO</span></h3>
                  
                  <ul class="split-bullets">
                    <li><span class="split-check">✓</span> 24 незалежні пневмосектори з перекриттям</li>
                    <li><span class="split-check">✓</span> Безперервний лімфодренаж та зняття набряків</li>
                    <li><span class="split-check">✓</span> Автоматичне вимірювання артеріального тиску</li>
                  </ul>

                  <div class="split-btn-group">
                    <a href="/linfopress/" class="split-btn split-btn-ghost">
                      ДІЗНАТИСЬ БІЛЬШЕ
                    </a>
                    <button class="split-btn split-btn-ghost-muted header-btn" data-target="#popup_request">
                      ТЕСТ-ДРАЙВ
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    `;

    // Modern Screen 3: Architectural 6-Row Interactive Benefits Accordion (Awwwards Grade)
    const modernWhyUsSection = `
      <!-- Screen 3: Architectural 6-Row Interactive Benefits Dropdown Accordion (One Screen Height Experience) -->
      <section class="why-us-bento-section" id="why-us">
        <div class="bento-container">
          
          <!-- Header -->
          <div class="why-us-header">
            <h2>Чому провідні клініки обирають Termosalud</h2>
            <p>Повний комплекс підтримки бізнесу: від оригінального сертифікованого обладнання до навчання лікарів та маркетингу</p>
          </div>

          <!-- 6-Row Interactive Accordion Stack -->
          <div class="swiss-bento-grid">

            <!-- Row 1: Вигода -->
            <div class="bento-card is-open" data-card="01">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta bento-accordion-toggle">
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
                    <div class="bento-meta-text">
                      <span class="bento-index">01 / ФІНАНСОВА ВИГОДА</span>
                      <div class="bento-title-row">
                        <h3 class="bento-title">Вигода</h3>
                        <span class="bento-pill-tag tag-consumables">НЕМАЄ РОЗХІДНИКІВ</span>
                        <span class="bento-pill-tag">Швидкий ROI</span>
                      </div>
                    </div>
                  </div>
                  <div class="bento-meta-right">
                    <span class="bento-chevron" aria-label="Розгорнути">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                
                <div class="bento-body-collapse">
                  <div class="bento-collapse-grid">
                    <div class="bento-body-left">
                      <p class="bento-desc">
                        Ефективна інвестиція, що швидко окупається для клініки та лікаря. Постійний високий попит пацієнтів на послуги моделювання тіла та пресотерапії забезпечує швидку окупність апаратів Zionic та Linfopress Evolution Pro.
                      </p>
                      <div class="bento-feature-pills">
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span><strong>НЕМАЄ РОЗХІДНИКІВ:</strong> 0 грн додаткових витрат на процедури</span>
                        </div>
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

                    <div class="bento-body-right">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 2: Безпека -->
            <div class="bento-card" data-card="02">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta bento-accordion-toggle">
                  <div class="bento-meta-left">
                    <div class="bento-icon-pod pod-safety">
                      <svg class="bento-svg" viewBox="0 0 32 32" fill="none">
                        <path class="shield-contour" d="M16 3L6 7.5V15.5C6 22.5 10.5 27.5 16 29C21.5 27.5 26 22.5 26 15.5V7.5L16 3Z" stroke="currentColor" stroke-width="1.8" fill="rgba(93,135,150,0.06)" stroke-linejoin="round"/>
                        <path class="ecg-line" d="M10 16.5H12.5L14.5 11.5L17.5 21L19.5 16.5H22" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle class="shield-dot" cx="22.5" cy="8.5" r="3.5" fill="#1e232e" stroke="currentColor" stroke-width="1.2"/>
                        <path d="M21.2 8.5L22.2 9.5L24 7.5" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="bento-meta-text">
                      <span class="bento-index">02 / КЛІНІЧНА БЕЗПЕКА</span>
                      <div class="bento-title-row">
                        <h3 class="bento-title">Безпека</h3>
                        <span class="bento-pill-tag tag-safety">Доказова медицина</span>
                      </div>
                    </div>
                  </div>
                  <div class="bento-meta-right">
                    <span class="bento-chevron" aria-label="Розгорнути">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                
                <div class="bento-body-collapse">
                  <div class="bento-collapse-grid">
                    <div class="bento-body-left">
                      <p class="bento-desc">
                        Безпека, що базується на принципах медицини. Наявність найвищих стандартів сертифікації США, Азії, України, Європи. Відсутність ризиків ускладнень підтверджено клінічними дослідженнями.
                      </p>
                      <div class="bento-feature-pills">
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>100% неінвазивні безпечні протоколи</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Клінічно доведена ефективність</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Повна відповідність стандартам МОЗ</span>
                        </div>
                      </div>
                    </div>

                    <div class="bento-body-right">
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
                </div>
              </div>
            </div>

            <!-- Row 3: Популярність -->
            <div class="bento-card" data-card="03">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta bento-accordion-toggle">
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
                    <div class="bento-meta-text">
                      <span class="bento-index">03 / МІЖНАРОДНЕ ВИЗНАННЯ</span>
                      <div class="bento-title-row">
                        <h3 class="bento-title">Популярність</h3>
                        <span class="bento-pill-tag">40+ Країн</span>
                      </div>
                    </div>
                  </div>
                  <div class="bento-meta-right">
                    <span class="bento-chevron" aria-label="Розгорнути">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                
                <div class="bento-body-collapse">
                  <div class="bento-collapse-grid">
                    <div class="bento-body-left">
                      <p class="bento-desc">
                        Апарати компанії Termosalud вже давно стали популярними в клініках Європи та США. Їхня висока ефективність та надійність, висока безпека та медична сертифікація, а також модний хай-тек дизайн і дорогі матеріали зробили Zionic та Linfopress найбажанішими апаратами серед фахівців та пацієнтів.
                      </p>
                      <div class="bento-feature-pills">
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Визнання провідних естетичних клінік Європи</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Преміальний європейський дизайн та збірка</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Висока лояльність та повторні візити пацієнтів</span>
                        </div>
                      </div>
                    </div>

                    <div class="bento-body-right">
                      <div class="bento-stat-hero-box">
                        <div class="stat-big-highlight">40+</div>
                        <div class="stat-highlight-label">Країн світу використовують Termosalud</div>
                        <div class="stat-sub-highlight">1 200+ успішних інсталяцій у клініках</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 4: Навчання -->
            <div class="bento-card" data-card="04">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta bento-accordion-toggle">
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
                    <div class="bento-meta-text">
                      <span class="bento-index">04 / АКАДЕМІЯ TERMOSALUD</span>
                      <div class="bento-title-row">
                        <h3 class="bento-title">Навчання</h3>
                        <span class="bento-pill-tag">100% Практика</span>
                      </div>
                    </div>
                  </div>
                  <div class="bento-meta-right">
                    <span class="bento-chevron" aria-label="Розгорнути">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                
                <div class="bento-body-collapse">
                  <div class="bento-collapse-grid">
                    <div class="bento-body-left">
                      <p class="bento-desc">
                        Система навчання, заснована на експертному досвіді та передовій науці. Високий професійний рівень стартових та повторних навчань для партнерів. Закордонні стажування у найкращих клініках та тренінгових центрах Іспанії.
                      </p>
                      <div class="bento-feature-pills">
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Офіційна сертифікація лікарів-косметологів</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Авторські протоколи та постановка руки</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Регулярні майстер-класи та підвищення кваліфікації</span>
                        </div>
                      </div>
                    </div>

                    <div class="bento-body-right">
                      <div class="bento-stat-hero-box">
                        <div class="stat-big-highlight">100%</div>
                        <div class="stat-highlight-label">Постановка руки та протоколи</div>
                        <div class="stat-sub-highlight">Сертифікат міжнародного зразка</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 5: Сервіс -->
            <div class="bento-card" data-card="05">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta bento-accordion-toggle">
                  <div class="bento-meta-left">
                    <div class="bento-icon-pod pod-service">
                      <svg class="bento-svg" viewBox="0 0 32 32" fill="none">
                        <path class="gear-rotate-anim" d="M14 4H18L18.7 6.4C19.4 6.7 20.1 7.1 20.7 7.6L23 6.7L25.5 9.2L24.6 11.5C25.1 12.1 25.5 12.8 25.8 13.5L28.2 14.2V17.8L25.8 18.5C25.5 19.2 25.1 19.9 24.6 20.5L25.5 22.8L23 25.3L20.7 24.4C20.1 24.9 19.4 25.3 18.7 25.6L18 28H14L13.3 25.6C12.6 25.3 11.9 24.9 11.3 24.4L9 25.3L6.5 22.8L7.4 20.5C6.9 19.9 6.5 19.2 6.2 18.5L3.8 17.8V14.2L6.2 13.5C6.5 12.8 6.9 12.1 7.4 11.5L6.5 9.2L9 6.7L11.3 7.6C11.9 7.1 12.6 6.7 13.3 6.4L14 4Z" stroke="currentColor" stroke-width="1.6" fill="rgba(93,135,150,0.06)" stroke-linejoin="round"/>
                        <circle cx="16" cy="16" r="5.5" fill="#1e232e" stroke="currentColor" stroke-width="1.2"/>
                        <path class="clock-needle-anim" d="M16 13V16L18 17.5" stroke="#ffff00" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="bento-meta-text">
                      <span class="bento-index">05 / СЕРВІСНИЙ СУПРОВІД</span>
                      <div class="bento-title-row">
                        <h3 class="bento-title">Сервіс</h3>
                        <span class="bento-pill-tag">24/7 Сервіс</span>
                      </div>
                    </div>
                  </div>
                  <div class="bento-meta-right">
                    <span class="bento-chevron" aria-label="Розгорнути">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                
                <div class="bento-body-collapse">
                  <div class="bento-collapse-grid">
                    <div class="bento-body-left">
                      <p class="bento-desc">
                        Найвищі стандарти сервісного супроводу як важлива складова партнерських взаємовідносин. Власний офіційний сервісний центр у Києві, оригінальні комплектуючі та оперативна інженерна підтримка.
                      </p>
                      <div class="bento-feature-pills">
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Офіційна гарантія та оперативний сервіс</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Наявність оригінальних запчастин на складі в Києві</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Підмінний апарат на час планового обслуговування</span>
                        </div>
                      </div>
                    </div>

                    <div class="bento-body-right">
                      <div class="bento-stat-hero-box">
                        <div class="stat-big-highlight">24/7</div>
                        <div class="stat-highlight-label">Офіційний сервіс у Києві</div>
                        <div class="stat-sub-highlight">Безперебійна робота вашої клініки</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Row 6: Професіоналізм -->
            <div class="bento-card" data-card="06">
              <div class="bento-card-spotlight"></div>
              <div class="bento-card-inner">
                <div class="bento-top-meta bento-accordion-toggle">
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
                    <div class="bento-meta-text">
                      <span class="bento-index">06 / ЕКСПЕРТИЗА ТА ДОСВІД</span>
                      <div class="bento-title-row">
                        <h3 class="bento-title">Професіоналізм</h3>
                        <span class="bento-pill-tag">Експертна підтримка</span>
                      </div>
                    </div>
                  </div>
                  <div class="bento-meta-right">
                    <span class="bento-chevron" aria-label="Розгорнути">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </span>
                  </div>
                </div>
                
                <div class="bento-body-collapse">
                  <div class="bento-collapse-grid">
                    <div class="bento-body-left">
                      <p class="bento-desc">
                        Ми — професіонали з багаторічним досвідом в індустрії. Допомогли побудувати та розвинути велику кількість успішних бізнесів у сфері естетичної медицини. Гарантуємо всебічну маркетингову та бізнес-підтримку на кожному етапі.
                      </p>
                      <div class="bento-feature-pills">
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Маркетингова підтримка та залучення пацієнтів</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Готові бізнес-плани та консультації</span>
                        </div>
                        <div class="bento-feature-item">
                          <span class="bento-check">✓</span>
                          <span>Індивідуальний супровід персонального менеджера</span>
                        </div>
                      </div>
                    </div>

                    <div class="bento-body-right">
                      <div class="bento-stat-hero-box">
                        <div class="stat-big-highlight">15+</div>
                        <div class="stat-highlight-label">Років досвіду в естетичній медицині</div>
                        <div class="stat-sub-highlight">Повний маркетинговий супровід</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    `;

    // Modern Screen 4: Luxury 2-Column Presentation Stage with Open High-Converting Booking Form
    const modernPresentationSection = `
      <!-- Screen 4: Open Presentation & Test-Drive Stage -->
      <section class="application-presentation" id="presentation-section">
        
        <!-- Section Header -->
        <div class="container">
          <div class="presentation-header">
            <h2>Замовте презентацію та пробну процедуру</h2>
            <p>Оцініть можливості та результативність обладнання Termosalud у вашій клініці або в нашому демонстраційному центрі</p>
          </div>

          <!-- 2-Column Stage: Left Visual + Right Open Interactive Form -->
          <div class="presentation-stage-grid">
            
            <!-- Left Column: Visual Media Card with Photo & Trust Highlights -->
            <div class="presentation-visual-col">
              <div class="presentation-photo-frame">
                <img
                  src="/photo_form.png?v=1787685047"
                  class="presentation-showcase-img"
                  alt="Termosalud Test Drive Presentation"
                />
                <div class="presentation-photo-overlay"></div>
                <div class="presentation-floating-tag">
                  <span class="live-pulse-dot"></span>
                  <span>Ексклюзивний тест-драйв для клінік</span>
                </div>
              </div>
              
              <div class="presentation-trust-features">
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Безкоштовний виїзд до вашої клініки</strong>
                    <span>Привеземо апарат та проведемо тест безпосередньо у вашому кабінеті</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Розрахунок фінансової окупності</strong>
                    <span>Персональний бізнес-план повернення інвестицій за 3–4 місяці</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Навчання лікарів та сертифікація</strong>
                    <span>Повний супровід та авторські протоколи від сертифікованих тренерів</span>
                  </div>
                </div>
              </div>

              <!-- Mobile-Only CTA Trigger Button (Opens Full Pop-Up Modal on Mobile) -->
              <div class="presentation-mobile-cta-wrap">
                <button type="button" class="living-stage-glass-btn pulse-attention" data-target="#popup_request" aria-label="Замовити виїзний тест-драйв">
                  <span class="pulse-spark"></span>
                  <span class="btn-text-stacked">
                    <span class="btn-line-1">ЗАМОВИТИ ВИЇЗНИЙ</span>
                    <span class="btn-line-2">ТЕСТ-ДРАЙВ</span>
                  </span>
                  <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>

            <!-- Right Column: Open High-Converting Booking Form (Desktop Only) -->
            <div class="presentation-form-col desktop-only-form">
              <div class="presentation-form-card">
                <div class="form-card-header">
                  <h3 class="form-card-title">Заявка на виїзний тест-драйв</h3>
                  <p class="form-card-subtitle">Заповніть форму, і наш фахівець узгодить з вами зручний день та формат тестування</p>
                </div>

                <!-- Format Switcher: Clinic vs Showroom -->
                <div class="format-switcher-wrap">
                  <span class="format-label">Формат тестування:</span>
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
                  <span class="format-label">Оберіть апарат:</span>
                  <div class="device-pills-row">
                    <label class="device-pill active">
                      <input type="radio" name="presentation_device" value="Zionic" checked class="device-radio">
                      <span class="device-pill-dot dot-cyan"></span>
                      <span>Zionic (MARP + RF)</span>
                    </label>
                    <label class="device-pill">
                      <input type="radio" name="presentation_device" value="Linfopress" class="device-radio">
                      <span class="device-pill-dot dot-emerald"></span>
                      <span>Linfopress Pro</span>
                    </label>
                    <label class="device-pill">
                      <input type="radio" name="presentation_device" value="Both" class="device-radio">
                      <span class="device-pill-dot dot-gold"></span>
                      <span>Обидва апарати</span>
                    </label>
                  </div>
                </div>

                <!-- Open Form Inputs -->
                <form class="presentation-open-form" onsubmit="event.preventDefault(); document.querySelector('.form-success-toast')?.classList.add('show'); setTimeout(() => document.querySelector('.form-success-toast')?.classList.remove('show'), 4000);">
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
                      <label class="form-label-text" for="pres_city">Місто / Клініка</label>
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
                        <input type="radio" name="pres_messenger" value="Whatsapp" checked class="messenger-radio">
                        <span class="pill-dot dot-green"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="pres_messenger" value="Viber" class="messenger-radio">
                        <span class="pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="pres_messenger" value="Telegram" class="messenger-radio">
                        <span class="pill-dot dot-blue"></span>
                        <span>Telegram</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="shimmer-submit-btn">
                    <span>ЗАМОВИТИ ПРЕЗЕНТАЦІЮ</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
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
          <div class="partners-header">
            <h2>Провідні клініки України обирають Termosalud</h2>
            <p>Провідні медичні центри, клініки естетичної медицини та преміальні SPA-комплекси, що обрали технології Termosalud</p>
          </div>
        </div>

        <div class="modern-partners-carousel-wrap">
          <div class="partners-marquee-track">
            <!-- Item 1: L'Clinic -->
            <a href="https://share.google/hXAf7ws08CGnL6BBG" target="_blank" rel="noopener noreferrer" class="modern-partner-card">
              <div class="partner-card-img-wrap">
                <img src="/wp-content/uploads/2026/03/lclcinic-optimized.jpg" alt="L'Clinic" class="partner-img">
                <div class="partner-card-overlay">
                  <span class="partner-verified-badge">
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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
                    <span class="partner-live-dot"></span>
                    <span>Партнер Termosalud</span>
                  </span>
                  <div class="partner-action-tag">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    <span>Переглянути</span>
                  </div>
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

    // Modern Screen 6: Swiss Editorial Luxury Article with Scroll Blur-In Reveal
    const modernSeoSection = `
      <!-- Screen 6: Swiss Editorial Luxury Article with Scroll Blur-In Reveal -->
      <section class="seo_text">
        <div class="container">
          <div class="editorial-grid-layout">
            
            <!-- Left Editorial Column: Headline & Brand Manifesto -->
            <div class="editorial-left-col">
              <h2 class="editorial-main-title blur-reveal">
                Преміальне косметологічне обладнання для естетичної медицини
              </h2>

              <div class="editorial-quote-card blur-reveal">
                <p>«Termosalud Україна — стратегічний партнер клінік, які обирають бездоганну європейську безпеку та доведену клінічну результативність.»</p>
                <div class="editorial-quote-author">Офіційний дистриб'ютор в Україні</div>
              </div>

              <div class="editorial-stat-badges blur-reveal">
                <div class="stat-badge-item">
                  <span class="stat-num">30+</span>
                  <span class="stat-label">років досвіду розробок</span>
                </div>
                <div class="stat-badge-item">
                  <span class="stat-num">100%</span>
                  <span class="stat-label">виробництво в Іспанії</span>
                </div>
              </div>
            </div>

            <!-- Right Editorial Column: Narrative Flow & Structured Pillars -->
            <div class="editorial-right-col">
              
              <p class="editorial-lead-p blur-reveal">
                Сучасний ринок естетичної медицини диктує найвищі стандарти якості. Пацієнти обирають медичні центри, які пропонують безпечні, комфортні та результативні протоколи з науково доведеною дією. Компанія <strong>Termosalud Україна</strong> є офіційним ексклюзивним дистриб'ютором інноваційного обладнання <strong>ZIONIC</strong> та <strong>LINFOPRESS</strong>.
              </p>

              <div class="editorial-pillars-list">
                
                <div class="editorial-pillar-row blur-reveal">
                  <div class="pillar-num">01</div>
                  <div class="pillar-body">
                    <h4>Клінічна результативність (FDA, CE, ISO)</h4>
                    <p>Обладнання пройшло суворі клінічні дослідження в Європі та США, забезпечуючи прогнозований результат із першої процедури.</p>
                  </div>
                </div>

                <div class="editorial-pillar-row blur-reveal">
                  <div class="pillar-num">02</div>
                  <div class="pillar-body">
                    <h4>Висока рентабельність та швидка окупність</h4>
                    <p>Окупність інвестицій від 3–4 місяців гарантує стабільне та безпечне масштабування бізнес-показників вашої клініки.</p>
                  </div>
                </div>

                <div class="editorial-pillar-row blur-reveal">
                  <div class="pillar-num">03</div>
                  <div class="pillar-body">
                    <h4>Академія навчання та протоколи</h4>
                    <p>Повна сертифікація та постановка руки ваших лікарів, готові клінічні схеми лікування та підтримка експертів.</p>
                  </div>
                </div>

                <div class="editorial-pillar-row blur-reveal">
                  <div class="pillar-num">04</div>
                  <div class="pillar-body">
                    <h4>Офіційний сервіс 24/7 та підмінний фонд</h4>
                    <p>Власний склад оригінальних запчастин в Україні, оперативний виїзд інженерів і надання підмінного апарата без простоїв.</p>
                  </div>
                </div>

              </div>

              <div class="editorial-conclusion blur-reveal">
                <p>
                  Розвиток апаратного напрямку — один із найприбутковіших векторів сучасної косметології. Обладнання Termosalud формує високу лояльність преміальних пацієнтів та гарантує стабільний потік повторних візитів.
                </p>
              </div>

            </div>

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

  // ==========================================
  // ZIONIC SUBPAGE REDESIGN (OFFICIAL TERMOSALUD LUXURY ARCHITECTURE)
  // ==========================================
  if (pageName === 'zionic') {
    const modernZionicHtml = `
      <!-- 1. ZIONIC OFFICIAL LUXURY HERO -->
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
      </section>

      <!-- 2. PILLARS + 3D MANIPULA SHOWCASE (CLONED FROM TERMOSALUD WITH UKRAINIAN LOCALIZATION) -->
      <section class="zionic-pillars-section" id="zionic-advantages">
        <div class="container">
          <div class="zionic-pillars-split-wrap">
            
            <!-- Left Column: Information & Minimalist Benefits -->
            <div class="zionic-pillars-info-col">
              <div class="zionic-pillars-intro-box">
                <span class="section-kicker">ПЕРЕВАГИ ДЛЯ КЛІНІКИ</span>
                <h2 class="zionic-pillars-headline">ШВИДКО + РЕНТАБЕЛЬНО</h2>
                <p class="zionic-pillars-desc">
                  Втілення 35 років інновацій іспанської естетичної медицини Termosalud. Синергія активного ротаційного масажу (MARP) та монополярного RF 470 кГц гарантує бездоганні клінічні результати для лідерів індустрії.
                </p>
              </div>

              <!-- Minimalist Airy Highlights -->
              <div class="zionic-minimal-pillars-list">
                <!-- Point 1 -->
                <div class="pillar-min-item">
                  <div class="pillar-min-bullet">01</div>
                  <div class="pillar-min-body">
                    <h3 class="pillar-min-title">Висока рентабельність</h3>
                    <p class="pillar-min-text">
                      Швидка окупність інвестицій від 3 до 6 місяців, високий чек сеансу та відсутність дорогих витратних матеріалів.
                    </p>
                  </div>
                </div>

                <!-- Point 2 -->
                <div class="pillar-min-item">
                  <div class="pillar-min-bullet">02</div>
                  <div class="pillar-min-body">
                    <h3 class="pillar-min-title">Запатентована технологія</h3>
                    <p class="pillar-min-text">
                      Перша у світі комбінована система резистивного RF 470 кГц та активного ротаційного масажу MARP під сенсорним контролем.
                    </p>
                  </div>
                </div>

                <!-- Point 3 -->
                <div class="pillar-min-item">
                  <div class="pillar-min-bullet">03</div>
                  <div class="pillar-min-body">
                    <h3 class="pillar-min-title">Швидкі та стійкі результати</h3>
                    <p class="pillar-min-text">
                      Помітне зменшення об'ємів та підвищення пружності шкіри вже після 1-го сеансу.
                    </p>
                  </div>
                </div>
              </div>

              <!-- CTA Button under left info -->
              <div class="zionic-pillars-cta-wrap">
                <button class="zionic-sharp-contact-btn" data-target="#popup_request">
                  <span>ЗАМОВИТИ ПРЕЗЕНТАЦІЮ</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>

            <!-- Right Column: Clean 3D Manipula Showcase Box (Desktop only) -->
            <div class="zionic-pillars-image-col">
              <div class="zionic-manipula-showcase-box">
                <img src="/wp-content/uploads/zionic_official/ZIONIC-_manipulo2-copia-e1713857050153.png" alt="Zionic Deep Action Manipula 3D" class="zionic-manipula-zoom-img" id="zionic-scroll-manipula">
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- CURTAIN SLIDE STAGE: INFOGRAPHIC -> MANIPULA -->
      <div class="zionic-curtain-stage">
        <!-- 3. FULL-WIDTH TECHNICAL INFOGRAPHIC (CLONED FROM TERMOSALUD) -->
        <section class="zionic-fullwidth-infographic-section" id="technologies">
          <div class="zionic-infographic-fullwidth-container desktop-infographic-wrap">
            <img src="/zionic_infografia_new.png" alt="Zionic Full-Width Technical Infographic" class="zionic-infographic-fullwidth-img" loading="lazy">
          </div>

          <!-- Mobile Adapted Technical Showcase (Edge-to-Edge Infographic + Clean Swiss Breakdown Cards) -->
          <div class="zionic-mobile-tech-block">
            <div class="container">
              <div class="zionic-mobile-tech-header">
                <span class="section-kicker">ТЕХНОЛОГІЧНА ПЕРЕВАГА</span>
                <h2 class="zionic-unified-section-title">Запатентований синергічний вплив</h2>
              </div>
            </div>

            <!-- Edge-to-Edge Full-Width Infographic (No border, no frame, full width) -->
            <div class="zionic-mobile-infographic-fullwidth">
              <img src="/zionic_infografia_new.png" alt="Zionic Технічна інфографіка" class="mobile-infographic-edge-img" loading="lazy">
            </div>

            <div class="container">
              <div class="zionic-mobile-tech-cards">
                <div class="zionic-tech-card">
                  <div class="tech-card-header">
                    <span class="tech-card-metric">50 мм</span>
                    <span class="tech-card-badge">Глибина</span>
                  </div>
                  <h4>Глибина проникнення до 5 см</h4>
                  <p>Цілеспрямований прогрів гіподерми, фіброзних перемичок та прилеглих м'язових волокон без термічного опіку епідермісу.</p>
                </div>
                <div class="zionic-tech-card">
                  <div class="tech-card-header">
                    <span class="tech-card-metric">470 кГц</span>
                    <span class="tech-card-badge">RF енергія</span>
                  </div>
                  <h4>Резистивний монополярний RF</h4>
                  <p>Золотий медичний стандарт селективного ліполізу. Стимулює природний апоптоз адипоцитів і скорочення колагенового каркасу.</p>
                </div>
                <div class="zionic-tech-card">
                  <div class="tech-card-header">
                    <span class="tech-card-metric">MARP</span>
                    <span class="tech-card-badge">Механіка</span>
                  </div>
                  <h4>Ротаційний масаж MARP</h4>
                  <p>Інтенсивне тривимірне обертання роликів під сенсорним контролем тиску. Потужний лімфодренаж і вирівнювання рельєфу.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. MANIPULA DEEP ACTION BREAKDOWN (PREMIUM SWISS MEDICAL SPLIT) -->
        <section class="zionic-manipula-section" id="manipula">
          <div class="container">
            <div class="zionic-section-header">
              <span class="section-kicker">МАЙСТЕРНІСТЬ ІНЖЕНЕРІЇ</span>
              <h2>Маніпула Deep Action: Досконалість інженерії</h2>
              <p class="section-subtitle">
                Ергономічна конструкція зі змінними насадками для прицільної та комфортної роботи лікаря по будь-якій зоні тіла.
              </p>
            </div>

            <div class="zionic-manipula-split-layout">
              <!-- Left: Doctor Hands Photo with Pure Frame -->
              <div class="zionic-manipula-media-col">
                <div class="manipula-photo-frame">
                  <img src="/wp-content/uploads/zionic_official/manipulo-deep-action-1024x683.jpg" alt="Маніпула Deep Action Zionic у роботі лікаря" class="manipula-full-photo" loading="lazy">
                </div>
              </div>

              <!-- Right: Swiss Minimalist Spec Rows -->
              <div class="zionic-manipula-specs-col">
                <div class="manipula-swiss-list">
                  
                  <div class="manipula-swiss-item">
                    <div class="swiss-item-bullet">01</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Змінні обертові насадки</h3>
                      <p class="swiss-item-desc">Комплект зі змінних сфер різного діаметру для анатомічної адаптації під малі та великі зони тіла (живіт, стегна, сідниці, руки, спина).</p>
                    </div>
                  </div>

                  <div class="manipula-swiss-item">
                    <div class="swiss-item-bullet">02</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Сенсорний 2,8" дисплей на ручці</h3>
                      <p class="swiss-item-desc">Прямий контроль швидкості ротації, температури нагріву та потужності RF безпосередньо з маніпули під час сеансу без відволікання від пацієнта.</p>
                    </div>
                  </div>

                  <div class="manipula-swiss-item">
                    <div class="swiss-item-bullet">03</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Потужність генератора до 200 Вт</h3>
                      <p class="swiss-item-desc">Високоефективна резистивна діатермія забезпечує швидке досягнення терапевтичної гіпертермії (39–42°C) у глибоких шарах гіподерми.</p>
                    </div>
                  </div>

                  <div class="manipula-swiss-item">
                    <div class="swiss-item-bullet">04</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Інтелектуальні сенсори безпеки</h3>
                      <p class="swiss-item-desc">Постійний моніторинг температури та сили притискання з автоматичним захистом від перегріву для 100% безпеки та комфорту клієнта.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- SECOND CURTAIN SLIDE STAGE: ACCURACY -> TREATMENTS -->
      <div class="zionic-curtain-stage-2">
        <!-- 5. ACCURACY & VIDEO DEMONSTRATION (CINEMATIC SPLIT SHOWCASE) -->
        <section class="zionic-accuracy-section" id="zionic-accuracy">
          <div class="container">
            <div class="accuracy-cinematic-split">
              
              <!-- Left Column: Clinical Control Info -->
              <div class="accuracy-info-col">
                <div class="accuracy-header-box">
                  <span class="section-kicker kicker-light">КЛІНІЧНИЙ КОНТРОЛЬ</span>
                  <h2 class="accuracy-title">ВІДТВОРЮВАНІСТЬ ТА ПРЕЦИЗІЙНА ТОЧНІСТЬ</h2>
                  <p class="accuracy-desc">
                    Інтуїтивний інтерфейс з відображенням параметрів у реальному часі дозволяє зберігати індивідуальні протоколи пацієнтів та відтворювати перевірені результати від сеансу до сеансу.
                  </p>
                </div>

                <div class="accuracy-highlights-list">
                  <div class="accuracy-highlight-item">
                    <div class="accuracy-hl-bullet">01</div>
                    <div class="accuracy-hl-text">
                      <h4>Сенсорний контроль 470 кГц</h4>
                      <p>Автоматичне калібрування потужності за показниками імпедансу тканин у реальному часі.</p>
                    </div>
                  </div>

                  <div class="accuracy-highlight-item">
                    <div class="accuracy-hl-bullet">02</div>
                    <div class="accuracy-hl-text">
                      <h4>100% повторюваність протоколів</h4>
                      <p>Збереження персональних налаштувань пацієнта для гарантованого результату кожного разу.</p>
                    </div>
                  </div>
                </div>

                <div class="accuracy-cta-row">
                  <button class="zionic-sharp-contact-btn zionic-btn-light" data-target="#popup_request">
                    <span>ЗАМОВИТИ ПРЕЗЕНТАЦІЮ</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </div>

              <!-- Right Column: 16:9 Cinematic Video Player Card -->
              <div class="accuracy-video-col">
                <div class="accuracy-cinema-player-box">
                  <div class="video-preview-wrapper" data-video-id="CYsDii-PZ7s">
                    <img src="/wp-content/uploads/2026/03/zio-1.mp4_snapshot_00.02.383-optimized.jpg" alt="Відео демонстрація Zionic" class="accuracy-video-thumb">
                    
                    <div class="accuracy-play-pulse-btn">
                      <div class="play-pulse-ring"></div>
                      <div class="play-pulse-core">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                      </div>
                    </div>

                    <div class="accuracy-video-bottom-bar">
                      <span class="video-live-pill">LIVE ДЕМОНСТРАЦІЯ</span>
                      <span class="video-caption-text">Процедура моделювання тіла ZIONIC</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- 6. TREATMENT AREAS & PROTOCOLS (SWISS MINIMALIST SPLIT) -->
        <section class="zionic-treatments-section" id="treatment-areas">
          <div class="container">
            <div class="zionic-section-header">
              <span class="section-kicker">КЛІНІЧНІ ПРОТОКОЛИ</span>
              <h2>Зони застосування та показання</h2>
              <p class="section-subtitle">
                Zionic розроблений для комплексної роботи з усім тілом та вирішення найпоширеніших естетичних завдань пацієнтів.
              </p>
            </div>

            <div class="treatments-swiss-layout">
              <!-- Left: Seamless Circle Image on Pure White Background (No Frame) -->
              <div class="treatments-media-col">
                <img src="/zionic_treatments_ukr.png" alt="Контуринг тіла Zionic - протоколи лікування" class="treatments-clean-circle-img" loading="lazy">
              </div>

              <!-- Right: Swiss Minimalist Rows -->
              <div class="treatments-list-col">
                <div class="treatments-swiss-list">

                  <!-- Item 01 -->
                  <div class="treatment-swiss-item">
                    <div class="swiss-item-bullet">01</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Зменшення жирових відкладень та ліполіз</h3>
                      <p class="swiss-item-desc">Локальне розщеплення жирових клітин, зменшення об'ємів живота, боків і спини завдяки глибокому монополярному прогріву 470 кГц.</p>
                    </div>
                  </div>

                  <!-- Item 02 -->
                  <div class="treatment-swiss-item">
                    <div class="swiss-item-bullet">02</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Антицелюлітна дія (Стадії I, II та III)</h3>
                      <p class="swiss-item-desc">Глибоке розгладження фіброзних перемичок «апельсинової кірки», вирівнювання рельєфу та відновлення щільності стегон і сідниць.</p>
                    </div>
                  </div>

                  <!-- Item 03 -->
                  <div class="treatment-swiss-item">
                    <div class="swiss-item-bullet">03</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Підтягнення шкіри та ефект «Push-Up»</h3>
                      <p class="swiss-item-desc">Миттєве скорочення та стимуляція неоколагенезу, виразний ліфтинг сідниць, внутрішньої поверхні стегон та розтягнутої шкіри після пологів.</p>
                    </div>
                  </div>

                  <!-- Item 04 -->
                  <div class="treatment-swiss-item">
                    <div class="swiss-item-bullet">04</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Активація кровообігу та лімфодренаж</h3>
                      <p class="swiss-item-desc">Потужна активна ротація MARP стимулює судинне русло, ліквідує тканинний застій та прискорює виведення токсинів і надлишку рідини.</p>
                    </div>
                  </div>

                  <!-- Item 05 -->
                  <div class="treatment-swiss-item">
                    <div class="swiss-item-bullet">05</div>
                    <div class="swiss-item-content">
                      <h3 class="swiss-item-title">Ефект тонусування та ремоделювання</h3>
                      <p class="swiss-item-desc">Усунення в'ялості в зоні трицепса, підтяжка контуру рук, зміцнення м'язово-апоневротичного каркаса всього тіла.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- 7. CLINICAL RESULTS / BEFORE & AFTER -->
      <section class="zionic-results-section" id="results">
        <div class="container">
          <div class="zionic-section-header">
            <span class="section-kicker">РЕЗУЛЬТАТИ ТЕРАПІЇ</span>
            <h2>Доведені результати лікування</h2>
            <p class="section-subtitle">
              Фотографії реальних пацієнтів після проходження стандартного курсу процедур на апараті ZIONIC.
            </p>
          </div>

          <div class="results-gallery-grid">
            <div class="result-card">
              <div class="result-img-wrap">
                <img src="/wp-content/uploads/zionic_official/Zionic_C.jpg" alt="Результат лікування целюліту стегон Zionic">
              </div>
              <div class="result-meta">
                <h4>Корекція форми стегон та лікування целюліту</h4>
                <div class="result-badge-row">
                  <span class="badge-sessions">Курс: 8 сеансів</span>
                  <span class="badge-tech">MARP + RF 470 кГц</span>
                </div>
              </div>
            </div>

            <div class="result-card">
              <div class="result-img-wrap">
                <img src="/wp-content/uploads/zionic_official/Zionic_B-scaled.jpg" alt="Результат ремоделювання живота Zionic">
              </div>
              <div class="result-meta">
                <h4>Підтяжка шкіри та зменшення об'єму живота</h4>
                <div class="result-badge-row">
                  <span class="badge-sessions">Курс: 6 сеансів</span>
                  <span class="badge-tech">MARP + RF 470 кГц</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. ZIONIC COMPREHENSIVE UNIFIED KNOWLEDGE & FAQ HUB (SCREEN 1) -->
      <section class="zionic-unified-info-section" id="faq">
        <div class="container">
          
          <!-- Section Header -->
          <div class="zionic-unified-header zionic-section-header">
            <span class="section-kicker">ЕКСПЕРТИЗА ТА ВІДПОВІДІ</span>
            <h2 class="unified-title">Все, що потрібно знати про ZIONIC</h2>
            <p class="unified-subtitle">
              Технологічні переваги, фінансова модель для клінік, клінічні протоколи та відповіді на головні запитання
            </p>
          </div>

          <!-- Single Unified Knowledge Container -->
          <div class="zionic-unified-knowledge-card">
            
            <!-- Category Quick-Nav Filters -->
            <div class="knowledge-filter-bar">
              <button type="button" class="knowledge-filter-btn active" data-filter="all">Всі теми</button>
              <button type="button" class="knowledge-filter-btn" data-filter="business">Інвестиції та окупність</button>
              <button type="button" class="knowledge-filter-btn" data-filter="tech">Технологія Rollactive</button>
              <button type="button" class="knowledge-filter-btn" data-filter="clinical">Протоколи та безпека</button>
              <button type="button" class="knowledge-filter-btn" data-filter="training">Навчання лікарів</button>
            </div>

            <!-- Unified Accordion Items List -->
            <div class="knowledge-accordion-list">
              
              <!-- Item 1: Business & Investment -->
              <div class="knowledge-item active" data-category="business">
                <button type="button" class="knowledge-trigger" aria-expanded="true">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">01</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Рентабельність та інвестиції</span>
                      <h3 class="knowledge-item-title">Купити апарат Zionic: чому це вигідна інвестиція для клініки?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body" style="display: block;">
                  <div class="knowledge-body-inner">
                    <p>
                      У сучасній естетичній медицині найбільший попит мають неінвазивні методики, що поєднують високу результативність, комфорт та повну відсутність періоду реабілітації. Рішення купити апарат Zionic відкриває для вашої клініки можливість запропонувати преміальний комплексний догляд за фігурою.
                    </p>
                    <p>
                      <strong>Швидка окупність та маржинальність:</strong> середній термін повернення інвестицій становить від 3 до 6 місяців при навантаженні всього 3–4 пацієнти на день. Завдяки повній відсутності дорогих одноразових витратних матеріалів (картриджів чи одноразових насадок), чиста маржинальність кожної процедури перевищує 85%, забезпечуючи стабільний та прогнозований прибуток вашого медичного центру.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item 2: Rollactive RF Technology -->
              <div class="knowledge-item" data-category="tech">
                <button type="button" class="knowledge-trigger" aria-expanded="false">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">02</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Унікальна технологія</span>
                      <h3 class="knowledge-item-title">У чому полягає синергія запатентованої технології Rollactive RF?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body">
                  <div class="knowledge-body-inner">
                    <p>
                      Секрет найвищої клінічної ефективності ZIONIC полягає в одночасному поєднанні двох взаємопідсилюючих факторів в одній ергономічній маніпулі Deep Action:
                    </p>
                    <ul class="knowledge-bullet-list">
                      <li><strong>Монополярний резистивний RF 470 кГц:</strong> глибока теплова дія проникає в дерму та гіподерму, стимулюючи неоколагенез, ущільнюючи розтягнуту шкіру та розщеплюючи жирові клітини.</li>
                      <li><strong>Інтелектуальний ротаційний масаж MARP:</strong> активна механічна ротація з частотою до 3 000 000 імпульсів за секунду активує кровообіг, розм'якшує фіброзні спайки та забезпечує глибокий медичний лімфодренаж.</li>
                    </ul>
                    <p>
                      Така дія не просто тимчасово зменшує об'єми за рахунок виведення води, а структурно реконструює тканини та ефективно лікує навіть застарілі форми фіброзного целюліту (стадії I, II та III).
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item 3: Clinical Protocol & Sessions -->
              <div class="knowledge-item" data-category="clinical">
                <button type="button" class="knowledge-trigger" aria-expanded="false">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">03</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Клінічний протокол</span>
                      <h3 class="knowledge-item-title">Скільки процедур потрібно для отримання стійкого результату?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body">
                  <div class="knowledge-body-inner">
                    <p>
                      Перші відчутні зміни — підвищення пружності шкіри, зняття набряків та відчуття легкості в тілі — помітні вже після перших 1–2 сеансів. Для досягнення вираженого стійкого ефекту моделювання контурів, зменшення об'ємів живота і стегон та усунення целюліту рекомендовано стандартний курс із 6–10 процедур з періодичністю 2–3 рази на тиждень. Отриманий результат зберігається тривалий час за умови дотримання підтримуючих сеансів раз на 1–2 місяці.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item 4: Painlessness & Safety -->
              <div class="knowledge-item" data-category="clinical">
                <button type="button" class="knowledge-trigger" aria-expanded="false">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">04</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Комфорт та безпека</span>
                      <h3 class="knowledge-item-title">Чи болюча процедура та як влаштована система захисту пацієнта?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body">
                  <div class="knowledge-body-inner">
                    <p>
                      Процедура на апараті ZIONIC є на 100% безболісною та атравматичною. Пацієнт відчуває лише приємне глибоке зігрівання та розслаблюючу дію масажних сфер.
                    </p>
                    <p>
                      <strong>Безпека медичного рівня:</strong> маніпула обладнана вбудованими сенсорами безперервного моніторингу температури та датчиками тиску притискання. Якщо температура шкіри досягає заданого порогу безпеки, система автоматично модулює потужність RF, повністю виключаючи ризик перегріву або опіку.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item 5: Training & Certification -->
              <div class="knowledge-item" data-category="training">
                <button type="button" class="knowledge-trigger" aria-expanded="false">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">05</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Навчання та сервіс</span>
                      <h3 class="knowledge-item-title">Чи проводиться офіційне навчання та сертифікація лікарів клініки?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body">
                  <div class="knowledge-body-inner">
                    <p>
                      Так, обов'язково! При купівлі або оренді апарата ZIONIC сертифікований лікар-методист компанії Termosalud Україна проводить повне очне практичне навчання спеціалістів вашої клініки. Програма включає постановку руки лікаря, вивчення індивідуальних клінічних протоколів для різних зон тіла та видачу іменних сертифікатів міжнародного зразка.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- 9. ZIONIC TEST-DRIVE APPLICATION & PRESENTATION STAGE (SCREEN 2) -->
      <section class="application-presentation zionic-presentation-stage" id="application">
        <div class="container">
          <div class="presentation-header">
            <span class="section-kicker">ТЕСТ-ДРАЙВ ТА ПРЕЗЕНТАЦІЯ</span>
            <h2>Замовте виїзний тест-драйв ZIONIC у вашу клініку</h2>
            <p>Оцініть можливості та результативність апарата Termosalud безпосередньо на ваших пацієнтах або в нашому демонстраційному центрі</p>
          </div>

          <!-- 2-Column Stage: Left Visual + Right Open Interactive Form -->
          <div class="presentation-stage-grid">
            
            <!-- Left Column: Visual Media Card with Photo & Trust Highlights -->
            <div class="presentation-visual-col">
              <div class="presentation-photo-frame">
                <img
                  src="/photo_zionic.png"
                  class="presentation-showcase-img"
                  alt="Zionic Test Drive Presentation"
                />
                <div class="presentation-photo-overlay"></div>
                <div class="presentation-floating-tag">
                  <span class="live-pulse-dot"></span>
                  <span>Ексклюзивний тест-драйв для клінік</span>
                </div>
              </div>
              
              <div class="presentation-trust-features">
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Безкоштовний виїзд до вашої клініки</strong>
                    <span>Привеземо апарат та проведемо тест безпосередньо у вашому кабінеті</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Розрахунок фінансової окупності</strong>
                    <span>Персональний бізнес-план повернення інвестицій за 3–6 місяців</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Навчання лікарів та сертифікація</strong>
                    <span>Повний супровід та авторські протоколи від сертифікованих тренерів Termosalud</span>
                  </div>
                </div>
              </div>

              <!-- Direct Contact Box -->
              <div class="zionic-direct-call-box">
                <div class="direct-call-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div class="direct-call-info">
                  <span class="direct-call-label">Гаряча лінія для керівників та лікарів:</span>
                  <a href="tel:+380937205277" class="direct-call-number">+380 93 720 52 77</a>
                </div>
              </div>
            </div>

            <!-- Right Column: Open High-Converting Booking Form -->
            <div class="presentation-form-col">
              <div class="presentation-form-card">
                <div class="form-card-header">
                  <h3 class="form-card-title">Заявка на виїзний тест-драйв</h3>
                  <p class="form-card-subtitle">Заповніть форму, і наш фахівець узгодить з вами зручний день та формат тестування</p>
                </div>

                <!-- Format Switcher: Clinic vs Showroom -->
                <div class="format-switcher-wrap">
                  <span class="format-label">Формат тестування:</span>
                  <div class="format-switcher">
                    <button type="button" class="format-tab-btn active" data-format="clinic">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1"/></svg>
                      <span>У вашій клініці (виїзд)</span>
                    </button>
                    <button type="button" class="format-tab-btn" data-format="showroom">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
                      <span>У шоурумі (Київ)</span>
                    </button>
                  </div>
                </div>

                <!-- Main Booking Form -->
                <form class="glass-modal-form zionic-stage-form" onsubmit="event.preventDefault(); document.querySelector('.form-success-toast')?.classList.add('show'); setTimeout(() => document.querySelector('.form-success-toast')?.classList.remove('show'), 4000);">
                  <div class="form-group-item">
                    <label class="form-label-text" for="zionic_stage_name">Ваше ім'я та посада</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="zionic_stage_name" name="name" placeholder="Наприклад: Вікторія, головний лікар" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="zionic_stage_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="zionic_stage_phone" name="phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>

                    <div class="form-group-item">
                      <label class="form-label-text" for="zionic_stage_city">Місто / Назва клініки</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21.5C12 21.5 19 14.5 19 9.5C19 5.5 16 2.5 12 2.5C8 2.5 5 5.5 5 9.5C5 14.5 12 21.5 12 21.5Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></path><circle cx="12" cy="9.5" r="2.5" stroke-width="1.6" fill="currentColor"></circle></svg>
                        <input type="text" id="zionic_stage_city" name="city" placeholder="Київ, Клініка..." required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для підтвердження</label>
                    <div class="messenger-pills-row">
                      <label class="messenger-pill active">
                        <input type="radio" name="zionic_stage_messenger" value="Whatsapp" checked class="messenger-radio">
                        <span class="pill-dot dot-green"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="zionic_stage_messenger" value="Telegram" class="messenger-radio">
                        <span class="pill-dot dot-blue"></span>
                        <span>Telegram</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="zionic_stage_messenger" value="Viber" class="messenger-radio">
                        <span class="pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="zionic_stage_messenger" value="Call" class="messenger-radio">
                        <span class="pill-dot dot-dark"></span>
                        <span>Дзвінок</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="shimmer-submit-btn">
                    <span>Замовити безкоштовний тест-драйв</span>
                    <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>

                  <div class="form-trust-bullets">
                    <div class="trust-bullet-item">
                      <span class="bullet-check">✓</span>
                      <span>0 грн за виїзд та доставку</span>
                    </div>
                    <div class="trust-bullet-item">
                      <span class="bullet-check">✓</span>
                      <span>Без зобов'язань купівлі</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ZIONIC VIDEO LIGHTBOX MODAL -->
      <div id="zionic_video_modal" class="popup glass-popup-modal zionic-video-lightbox" role="dialog" aria-modal="true" style="display: none;">
        <div class="glass-modal-backdrop" data-close-video-modal></div>
        <div class="zionic-video-lightbox-card">
          <button type="button" class="zionic-video-modal-close" data-close-video-modal aria-label="Закрити">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="zionic-video-lightbox-frame" id="zionic_modal_video_container"></div>
          <div class="zionic-video-lightbox-caption">
            <span class="video-live-pill">LIVE ДЕМОНСТРАЦІЯ</span>
            <span class="video-lightbox-title">Клінічна процедура моделювання тіла ZIONIC</span>
          </div>
        </div>
      </div>
    `;

    // Replace the inner content of zionic page (up to footer, replacing old raw seo_text as well)
    html = html.replace(/<div[\s\n]+class=center>[\s\S]*?(?=<footer|$)/i, `<div class="zionic-main-page-wrapper">\n${modernZionicHtml}\n</div>\n`);
  }

  // Modern Linfopress Evolution PRO Page Structure (Cloned from Official Termosalud with Ukrainian Localization)
  if (pageName === 'linfopress') {
    const modernLinfopressHtml = `
      <!-- 1. HERO STAGE (OFFICIAL BLACK LUXURY VIDEO HERO) -->
      <section class="linfopress-hero-stage" id="hero">
        <div class="linfopress-hero-media-wrapper">
          <video autoplay loop muted playsinline class="linfopress-hero-video-bg" preload="auto" poster="/photo_limfo.png">
            <source src="/limfo.mp4" type="video/mp4">
          </video>
          <div class="linfopress-hero-overlay"></div>
        </div>

        <div class="container linfopress-hero-container">
          <div class="linfopress-hero-content-box">
            
            <!-- Cloud Brand Outline Icon -->
            <div class="linfopress-cloud-brand-icon">
              <svg width="68" height="42" viewBox="0 0 68 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 38H52C59.732 38 66 31.732 66 24C66 16.7118 60.4439 10.7226 53.3087 10.0678C51.3411 4.24949 45.6601 0 39 0C30.4079 0 23.3276 6.72622 22.8465 15.2017C21.3197 14.4328 19.5934 14 17.7778 14C11.2731 14 6 19.2731 6 25.7778C6 26.6896 6.10372 27.5772 6.29969 28.4307C2.62886 29.8052 0 33.3768 0 37.5556C0 37.8048 0.00947094 38.0519 0.028169 38.2965" stroke="#ffffff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>

            <h1 class="linfopress-official-hero-title">
              <span class="hero-word-primary">ТОЧНІСТЬ</span>
              <span class="hero-yellow-bar"></span>
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

            <!-- Trust Bar / Key Specs -->
            <div class="linfopress-hero-trust-bar">
              <div class="hero-trust-item">
                <span class="hero-trust-metric">24</span>
                <span class="hero-trust-label">Камери з косим перекриттям</span>
              </div>
              <div class="hero-trust-divider"></div>
              <div class="hero-trust-item">
                <span class="hero-trust-metric">100%</span>
                <span class="hero-trust-label">Автономний сеанс Hands-Free</span>
              </div>
              <div class="hero-trust-divider"></div>
              <div class="hero-trust-item">
                <span class="hero-trust-metric">4</span>
                <span class="hero-trust-label">Клінічні цикли компресії</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. PILLARS + UNIT SHOWCASE (CLONED FROM TERMOSALUD WITH UKRAINIAN LOCALIZATION) -->
      <section class="zionic-pillars-section linfopress-pillars-section" id="linfopress-advantages">
        <div class="container">
          <div class="zionic-pillars-split-wrap">
            
            <!-- Left Column: Information & Minimalist Benefits -->
            <div class="zionic-pillars-info-col">
              <div class="zionic-pillars-intro-box">
                <span class="section-kicker">ПЕРЕВАГИ ДЛЯ КЛІНІКИ ТА ЛІКАРЯ</span>
                <h2 class="zionic-pillars-headline">АВТОНОМНІСТЬ + РЕНТАБЕЛЬНІСТЬ</h2>
                <p class="zionic-pillars-desc">
                  Втілення 35 років досвіду іспанської медичної інженерії Termosalud. Інтелектуальна пневматична компресія з біоміметичним пульсом, що ідеально поєднується з будь-якими апаратними та естетичними процедурами.
                </p>
              </div>

              <!-- Minimalist Airy Highlights -->
              <div class="zionic-minimal-pillars-list">
                <!-- Point 1 -->
                <div class="pillar-min-item">
                  <div class="pillar-min-bullet">01</div>
                  <div class="pillar-min-body">
                    <h3 class="pillar-min-title">100% Заповнюваність кабінету</h3>
                    <p class="pillar-min-text">
                      Автономна процедура «hands-free», що не вимагає постійної присутності лікаря, забезпечуючи максимальну маржинальність без витратних матеріалів.
                    </p>
                  </div>
                </div>

                <!-- Point 2 -->
                <div class="pillar-min-item">
                  <div class="pillar-min-bullet">02</div>
                  <div class="pillar-min-body">
                    <h3 class="pillar-min-title">Найбільший розмірний ряд на ринку</h3>
                    <p class="pillar-min-text">
                      Адаптивний костюм із 3 рівнями регулювання блискавок підходить для пацієнтів зростом від 1.50 м до 2.00 м та вагою до 58 розміру одягу.
                    </p>
                  </div>
                </div>

                <!-- Point 3 -->
                <div class="pillar-min-item">
                  <div class="pillar-min-bullet">03</div>
                  <div class="pillar-min-body">
                    <h3 class="pillar-min-title">Швидкі результати з 1-го сеансу</h3>
                    <p class="pillar-min-text">
                      Миттєве зняття набряків, розвантаження венозного русла, лімфодренаж та відчуття неймовірної легкості в усьому тілі.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <!-- Right Column: Machine Unit Showcase -->
            <div class="zionic-pillars-image-col">
              <div class="zionic-manipula-showcase-box">
                <img src="/wp-content/uploads/linfopress_official/linfopress_hero_machine.png" alt="Linfopress Evolution PRO Апарат та Костюм" class="zionic-manipula-zoom-img">
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 3. TECHNICAL SUIT ARCHITECTURE (24 SECTORS & COMFORT) -->
      <section class="linfopress-tech-section" id="suit-technology">
        <div class="container">
          <div class="zionic-section-header">
            <span class="section-kicker">АНАТОМІЧНА ДОСКОНАЛІСТЬ</span>
            <h2>24 ПЕРЕКРИВНІ СЕКЦІЇ ТА СИСТЕМА ДАТЧИКІВ</h2>
            <p class="section-subtitle">
              Унікальна конструкція костюма з косим перекриттям виключає зони зворотного тиску та гарантує фізіологічно точний відтік лімфи.
            </p>
          </div>

          <div class="linfopress-tech-grid">
            <!-- Card 1 -->
            <div class="linfopress-card">
              <div class="linfopress-card-media">
                <img src="/wp-content/uploads/linfopress_official/tech_24_chambers.png" alt="24 косі камери перекриття" loading="lazy">
              </div>
              <div class="linfopress-card-body">
                <span class="linfopress-num">01</span>
                <h3>24 косі камери перекриття</h3>
                <p>Особливе розташування секцій ялинкою запобігає розривам тиску та спрямовує рух рідини від периферії до центральних вузлів.</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="linfopress-card">
              <div class="linfopress-card-media">
                <img src="/wp-content/uploads/linfopress_official/tech_pillow.png" alt="Ергономічний валик під шию" loading="lazy">
              </div>
              <div class="linfopress-card-body">
                <span class="linfopress-num">02</span>
                <h3>Ергономічний валик під шию</h3>
                <p>Анатомічна подушка підтримує шийний відділ хребта, знімає напругу трапецієподібних м'язів та забезпечує повний релакс.</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="linfopress-card">
              <div class="linfopress-card-media">
                <img src="/wp-content/uploads/linfopress_official/tech_ankle.png" alt="Вільна зона щиколотки" loading="lazy">
              </div>
              <div class="linfopress-card-body">
                <span class="linfopress-num">03</span>
                <h3>Вільна зона щиколотки</h3>
                <p>Продумане звільнення гомілковостопного суглоба гарантує коректний венозний відтік без травмування судинної сітки.</p>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="linfopress-card">
              <div class="linfopress-card-media">
                <img src="/wp-content/uploads/linfopress_official/tech_sensors.png" alt="Сенсорний контроль та калібрування" loading="lazy">
              </div>
              <div class="linfopress-card-body">
                <span class="linfopress-num">04</span>
                <h3>Сенсорне калібрування камер</h3>
                <p>Мікропроцесорний контроль тиску в кожній окремій камері з індивідуальним налаштуванням під клінічні задачі пацієнта.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. ANIMATED PROTOCOL MODES (OFFICIAL TERMOSALUD GIFS) -->
      <section class="linfopress-protocols-section" id="protocols">
        <div class="container">
          <div class="zionic-section-header">
            <span class="section-kicker">КЛІНІЧНІ ПРОТОКОЛИ</span>
            <h2>4 РЕЖИМИ БІОМІМЕТИЧНОГО ПУЛЬСУ</h2>
            <p class="section-subtitle">
              Запатентовані алгоритми пневмокомпресії, що точно відтворюють фізіологічні рухи венозного та лімфатичного повернення.
            </p>
          </div>

          <div class="linfopress-protocols-grid">
            <!-- Mode 1: Pre-Therapy -->
            <div class="protocol-card">
              <div class="protocol-gif-wrap">
                <img src="/wp-content/uploads/linfopress_official/protocol_pretherapy.gif" alt="Протокол Pre-Therapy" loading="lazy">
                <span class="protocol-badge">Етап 1: Підготовка</span>
              </div>
              <div class="protocol-content">
                <h3>Pre-Therapy</h3>
                <p class="protocol-desc">
                  Розкриття основних лімфатичних колекторів. Рекомендовано як обов'язковий початковий цикл для прискорення дренажу перед інтенсивною терапією.
                </p>
                <div class="protocol-tags">
                  <span>Відкриття вузлів</span>
                  <span>Зняття спазму</span>
                </div>
              </div>
            </div>

            <!-- Mode 2: Wave -->
            <div class="protocol-card">
              <div class="protocol-gif-wrap">
                <img src="/wp-content/uploads/linfopress_official/protocol_wave.gif" alt="Протокол Wave" loading="lazy">
                <span class="protocol-badge">Етап 2: Перистальтика</span>
              </div>
              <div class="protocol-content">
                <h3>Wave (Хвильова дія)</h3>
                <p class="protocol-desc">
                  Послідовна компресія хвилями від дистальних ділянок до центру тіла. Створює потужний перистальтичний масаж для лікування целюліту та релаксації.
                </p>
                <div class="protocol-tags">
                  <span>Антицелюліт</span>
                  <span>М'язовий релакс</span>
                </div>
              </div>
            </div>

            <!-- Mode 3: Lympha -->
            <div class="protocol-card">
              <div class="protocol-gif-wrap">
                <img src="/wp-content/uploads/linfopress_official/protocol_lympha.gif" alt="Протокол Lympha" loading="lazy">
                <span class="protocol-badge">Етап 3: Дренаж</span>
              </div>
              <div class="protocol-content">
                <h3>Lympha (Градієнтний дренаж)</h3>
                <p class="protocol-desc">
                  Повні хвилі знизу вгору з поступовим зниженням тиску в напрямку цистерни Пекке. Найпотужніший терапевтичний вплив для виведення набряків.
                </p>
                <div class="protocol-tags">
                  <span>Виведення рідини</span>
                  <span>Детоксикація</span>
                </div>
              </div>
            </div>

            <!-- Mode 4: Relaxing -->
            <div class="protocol-card">
              <div class="protocol-gif-wrap protocol-img-placeholder">
                <img src="/wp-content/uploads/linfopress_official/linfopress_treatment_wide.png" alt="Протокол Relaxing" loading="lazy">
                <span class="protocol-badge">Етап 4: Відновлення</span>
              </div>
              <div class="protocol-content">
                <h3>Relaxing (Релаксація)</h3>
                <p class="protocol-desc">
                  Рівномірна заспокійлива дія на кожну камеру протягом сталого часу. Ідеально для фінішу сеансу, при втомі ніг, після вагітності чи інтенсивних тренувань.
                </p>
                <div class="protocol-tags">
                  <span>Післяпологове відновлення</span>
                  <span>Легкість ніг</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. ACCURACY & VIDEO DEMONSTRATION (CINEMATIC SPLIT SHOWCASE) -->
      <section class="zionic-accuracy-section linfopress-accuracy-section" id="linfopress-video-section">
        <div class="container">
          <div class="accuracy-cinematic-split">
            
            <!-- Left Column: Clinical Control Info -->
            <div class="accuracy-info-col">
              <div class="accuracy-header-box">
                <span class="section-kicker kicker-light">КЛІНІЧНИЙ КОНТРОЛЬ</span>
                <h2 class="accuracy-title">БІОМІМЕТИЧНА ТОЧНІСТЬ ТА БЕЗПЕКА</h2>
                <p class="accuracy-desc">
                  Інтуїтивний сенсорний інтерфейс з відображенням параметрів тиску в реальному часі дозволяє зберігати індивідуальні програми пацієнтів та гарантувати 100% повторюваність результату.
                </p>
              </div>

              <div class="accuracy-highlights-list">
                <div class="accuracy-highlight-item">
                  <div class="accuracy-hl-bullet">01</div>
                  <div class="accuracy-hl-text">
                    <h4>Сенсорне роздільне регулювання</h4>
                    <p>Точний вибір тиску в кожній камері залежно від стану судинної сітки пацієнта.</p>
                  </div>
                </div>

                <div class="accuracy-highlight-item">
                  <div class="accuracy-hl-bullet">02</div>
                  <div class="accuracy-hl-text">
                    <h4>Повна автономність лікаря</h4>
                    <p>Апарат проводить повний цикл терапії без необхідності ручного супроводу спеціаліста.</p>
                  </div>
                </div>
              </div>

              <div class="accuracy-cta-row">
                <button class="zionic-sharp-contact-btn zionic-btn-light" data-target="#popup_request">
                  <span>ЗАМОВИТИ ПРЕЗЕНТАЦІЮ</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </div>
            </div>

            <!-- Right Column: 16:9 Cinematic Video Player Card -->
            <div class="accuracy-video-col">
              <div class="accuracy-cinema-player-box">
                <div class="video-preview-wrapper" data-video-id="K1v77enueJ8">
                  <img src="/wp-content/uploads/linfopress_official/linfopress_treatment_wide.png" alt="Відео демонстрація Linfopress" class="accuracy-video-thumb">
                  
                  <div class="accuracy-play-pulse-btn">
                    <div class="play-pulse-ring"></div>
                    <div class="play-pulse-core">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 3 20 12 6 21 6 3"></polygon></svg>
                    </div>
                  </div>

                  <div class="accuracy-video-bottom-bar">
                    <span class="video-live-pill">LIVE ДЕМОНСТРАЦІЯ</span>
                    <span class="video-caption-text">Процедура пресотерапії Linfopress Evolution PRO</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 6. TREATMENT AREAS & INDICATIONS (SWISS MINIMALIST SPLIT) -->
      <section class="zionic-treatments-section" id="treatment-indications">
        <div class="container">
          <div class="zionic-section-header">
            <span class="section-kicker">СФЕРИ ЗАСТОСУВАННЯ</span>
            <h2>ПОКАЗАННЯ ТА СИНЕРГІЯ З BODYCONTOURING</h2>
            <p class="section-subtitle">
              Linfopress Evolution PRO є ідеальним фізіологічним доповненням до будь-яких апаратних протоколів корекції фігури.
            </p>
          </div>

          <div class="treatments-swiss-layout">
            <!-- Left: Seamless Circle / Suit Photo -->
            <div class="treatments-media-col">
              <img src="/wp-content/uploads/linfopress_official/linfopress_suit_full.png" alt="Linfopress костюм для всього тіла" class="treatments-clean-circle-img" loading="lazy">
            </div>

            <!-- Right: Swiss Minimalist Rows -->
            <div class="treatments-list-col">
              <div class="treatments-swiss-list">

                <!-- Item 01 -->
                <div class="treatment-swiss-item">
                  <div class="swiss-item-bullet">01</div>
                  <div class="swiss-item-content">
                    <h3 class="swiss-item-title">Лікування целюліту (Стадії I, II та III)</h3>
                    <p class="swiss-item-desc">Розм'якшення щільних фіброзних перемичок, зняття інтерстиціального набряку та вирівнювання рельєфу стегон і сідниць.</p>
                  </div>
                </div>

                <!-- Item 02 -->
                <div class="treatment-swiss-item">
                  <div class="swiss-item-bullet">02</div>
                  <div class="swiss-item-content">
                    <h3 class="swiss-item-title">Усунення затримки рідини та набряків</h3>
                    <p class="swiss-item-desc">Швидка евакуація зайвої рідини та токсинів через стимуляцію лімфатичної системи всього тіла.</p>
                  </div>
                </div>

                <!-- Item 03 -->
                <div class="treatment-swiss-item">
                  <div class="swiss-item-bullet">03</div>
                  <div class="swiss-item-content">
                    <h3 class="swiss-item-title">Синдром «важких ніг» та венозний застій</h3>
                    <p class="swiss-item-desc">Покращення периферичного кровообігу, зняття напруги та втоми після тривалого стояння або перельотів.</p>
                  </div>
                </div>

                <!-- Item 04 -->
                <div class="treatment-swiss-item">
                  <div class="swiss-item-bullet">04</div>
                  <div class="swiss-item-content">
                    <h3 class="swiss-item-title">Реабілітація після хірургії та ліпосакції</h3>
                    <p class="swiss-item-desc">Прискорене загоєння тканин, профілактика сером і фіброзу, швидке розсмоктування гематом у післяопераційний період.</p>
                  </div>
                </div>

                <!-- Item 05 -->
                <div class="treatment-swiss-item">
                  <div class="swiss-item-bullet">05</div>
                  <div class="swiss-item-content">
                    <h3 class="swiss-item-title">Синергія з ZIONIC, Criocuum та RF</h3>
                    <p class="swiss-item-desc">Завершення процедур ліполізу та моделювання пресотерапією прискорює виведення зруйнованих адипоцитів у 2 рази.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. SUIT ADAPTABILITY (ALL SIZES & HEIGHTS) -->
      <section class="linfopress-adaptability-section" id="suit-adaptability">
        <div class="container">
          <div class="zionic-section-header">
            <span class="section-kicker">УНІВЕРСАЛЬНІСТЬ</span>
            <h2>АДАПТАЦІЯ ДЛЯ БУДЬ-ЯКОЇ АНАТОМІЇ</h2>
            <p class="section-subtitle">
              Завдяки 3 рівням блискавок костюм ідеально сідає на будь-яку комплекцію пацієнта.
            </p>
          </div>

          <div class="linfopress-sizes-grid">
            <div class="size-card">
              <div class="size-img-wrap">
                <img src="/wp-content/uploads/linfopress_official/benefit_size_a.png" alt="Адаптація за зростом" loading="lazy">
              </div>
              <div class="size-card-info">
                <span class="size-badge">Зріст</span>
                <h4>Від 1,50 м до 2,00 м</h4>
                <p>Анатомічні регулювання довжини штанин для точного попадання камер у лімфовузли.</p>
              </div>
            </div>

            <div class="size-card">
              <div class="size-img-wrap">
                <img src="/wp-content/uploads/linfopress_official/benefit_size_b.png" alt="Адаптація за об'ємом" loading="lazy">
              </div>
              <div class="size-card-info">
                <span class="size-badge">Об'єм</span>
                <h4>Розміри одягу до 58</h4>
                <p>Потрійна система блискавок дозволяє комфортно розмістити пацієнтів різної статури.</p>
              </div>
            </div>

            <div class="size-card">
              <div class="size-img-wrap">
                <img src="/wp-content/uploads/linfopress_official/benefit_size_c.png" alt="Охоплення всього тіла" loading="lazy">
              </div>
              <div class="size-card-info">
                <span class="size-badge">Комплекс</span>
                <h4>Охоплення 100% зон тіла</h4>
                <p>Стопи, литки, стегна, сідниці, живіт, спина та додаткові манжети для верхніх кінцівок.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. LINFOPRESS COMPREHENSIVE KNOWLEDGE & FAQ HUB -->
      <section class="zionic-unified-info-section" id="faq">
        <div class="container">
          
          <!-- Section Header -->
          <div class="zionic-unified-header zionic-section-header">
            <span class="section-kicker">ЕКСПЕРТИЗА ТА ВІДПОВІДІ</span>
            <h2 class="unified-title">Все, що потрібно знати про LINFOPRESS EVOLUTION PRO</h2>
            <p class="unified-subtitle">
              Фінансова модель для клінік, технічні інновації, клінічні протоколи та відповіді на головні запитання
            </p>
          </div>

          <!-- Single Unified Knowledge Container -->
          <div class="zionic-unified-knowledge-card">
            
            <!-- Category Quick-Nav Filters (Smooth horizontal swipe ribbon) -->
            <div class="knowledge-filter-bar">
              <button type="button" class="knowledge-filter-btn active" data-filter="all">Всі теми</button>
              <button type="button" class="knowledge-filter-btn" data-filter="business">Інвестиції та окупність</button>
              <button type="button" class="knowledge-filter-btn" data-filter="tech">Технологія костюма</button>
              <button type="button" class="knowledge-filter-btn" data-filter="clinical">Протоколи та безпека</button>
              <button type="button" class="knowledge-filter-btn" data-filter="training">Навчання лікарів</button>
            </div>

            <!-- Unified Accordion Items List -->
            <div class="knowledge-accordion-list">
              
              <!-- Item 1: Business & Investment -->
              <div class="knowledge-item active" data-category="business">
                <button type="button" class="knowledge-trigger" aria-expanded="true">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">01</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Рентабельність та інвестиції</span>
                      <h3 class="knowledge-item-title">Чому покупка Linfopress Evolution PRO — це 100% автономне джерело прибутку клініки?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body" style="display: block;">
                  <div class="knowledge-body-inner">
                    <p>
                      Головна перевага Linfopress Evolution PRO полягає у концепції «hands-free»: лікар або асистент лише одягає костюм на пацієнта та обирає необхідну програму на сенсорному дисплеї, після чого апарат самостійно проводить повноцінний 30–45 хвилинний сеанс.
                    </p>
                    <p>
                      <strong>Швидка окупність та нульові витратні матеріали:</strong> відсутність дорогих картриджів та висока пропускна здатність кабінету дозволяють повернути інвестиції вже за 2–4 місяці експлуатації, доповнюючи чеки процедур масажу, RF-ліфтингу чи кріоліполізу.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item 2: Chamber Tech -->
              <div class="knowledge-item" data-category="tech">
                <button type="button" class="knowledge-trigger" aria-expanded="false">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">02</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Унікальна конструкція</span>
                      <h3 class="knowledge-item-title">Чим косі перекривні камери Linfopress відрізняються від звичайної пресотерапії?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body">
                  <div class="knowledge-body-inner">
                    <p>
                      У звичайних бюджетних апаратах камери розташовані прямо паралельно, створюючи "сліпі зони" або зворотний рух лімфи при перемиканні секцій. У Linfopress Evolution PRO встановлено 24 незалежні камери у формі риб'ячої кістки (ялинкою) з частковим накладанням одна на одну.
                    </p>
                    <p>
                      Це гарантує безперервну фізіологічну хвилю компресії, що жене застійну лімфу строго до пахових та підключичних колекторів без ризику судинного застою.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item 3: Clinical Protocols -->
              <div class="knowledge-item" data-category="clinical">
                <button type="button" class="knowledge-trigger" aria-expanded="false">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">03</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Клінічний протокол</span>
                      <h3 class="knowledge-item-title">Скільки процедур потрібно для відчутного терапевтичного ефекту?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body">
                  <div class="knowledge-body-inner">
                    <p>
                      Зняття тяжкості в кінцівках та виведення надлишку рідини відчутні вже під час першого 30-хвилинного сеансу. Для закріплення стійкого антицелюлітного ефекту та профілактики варикозного застою призначається курс із 8–12 процедур з періодичністю 2–3 рази на тиждень.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item 4: Synergy -->
              <div class="knowledge-item" data-category="clinical">
                <button type="button" class="knowledge-trigger" aria-expanded="false">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">04</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Комбіновані програми</span>
                      <h3 class="knowledge-item-title">Як Linfopress підсилює ефект апарату ZIONIC та кріоліполізу?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body">
                  <div class="knowledge-body-inner">
                    <p>
                      Після термо-механічного ліполізу (ZIONIC) або кріодеструкції жирових клітин вивільнені тригліцериди та токсини потрапляють у міжклітинний простір. Проведення сеансу Linfopress одразу після основної процедури прискорює їхній лімфатичний дренаж та елімінацію печінкою, подвоюючи видимий результат схуднення та попереджаючи інтоксикацію.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Item 5: Training & Certification -->
              <div class="knowledge-item" data-category="training">
                <button type="button" class="knowledge-trigger" aria-expanded="false">
                  <div class="knowledge-left-meta">
                    <span class="knowledge-num">05</span>
                    <div class="knowledge-title-wrap">
                      <span class="knowledge-cat-tag">Навчання та сервіс</span>
                      <h3 class="knowledge-item-title">Чи надається офіційне практичне навчання лікарів клініки?</h3>
                    </div>
                  </div>
                  <div class="knowledge-action-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19" class="icon-v"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                </button>
                <div class="knowledge-body">
                  <div class="knowledge-body-inner">
                    <p>
                      Так, Termosalud Україна надає безкоштовне очне навчання для спеціалістів та адміністраторів вашого медичного центру. Програма включає налаштування індивідуальних параметрів, вивчення протоколів ліпосакційного супроводу та видачу сертифікатів міжнародного зразка.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <!-- 9. TEST-DRIVE APPLICATION & PRESENTATION STAGE -->
      <section class="application-presentation zionic-presentation-stage" id="application">
        <div class="container">
          <div class="presentation-header">
            <span class="section-kicker">ТЕСТ-ДРАЙВ ТА ПРЕЗЕНТАЦІЯ</span>
            <h2>Замовте виїзний тест-драйв Linfopress Evolution PRO у вашу клініку</h2>
            <p>Оцініть можливості та результативність пресотерапії Termosalud безпосередньо у вашому кабінеті або в нашому шоурумі</p>
          </div>

          <!-- 2-Column Stage: Left Visual + Right Open Interactive Form -->
          <div class="presentation-stage-grid">
            
            <!-- Left Column: Visual Media Card with Photo & Trust Highlights -->
            <div class="presentation-visual-col">
              <div class="presentation-photo-frame">
                <img
                  src="/wp-content/uploads/linfopress_official/linfopress_treatment_wide.png"
                  class="presentation-showcase-img"
                  alt="Linfopress Evolution PRO Тест-драйв"
                  loading="lazy"
                />
                <div class="presentation-floating-tag">
                  <span class="live-pulse-dot"></span>
                  <span>Ексклюзивний тест-драйв для клінік</span>
                </div>
              </div>
              
              <div class="presentation-trust-features">
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Безкоштовний виїзд до вашої клініки</strong>
                    <span>Привеземо апарат та проведемо тест безпосередньо у вашому кабінеті</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Розрахунок фінансової окупності</strong>
                    <span>Персональний бізнес-план повернення інвестицій за 2–4 місяці</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Навчання лікарів та сертифікація</strong>
                    <span>Повний супровід та авторські протоколи від тренерів Termosalud</span>
                  </div>
                </div>
              </div>

              <!-- Direct Contact Box -->
              <div class="zionic-direct-call-box">
                <div class="direct-call-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div class="direct-call-info">
                  <span class="direct-call-label">Гаряча лінія для керівників та лікарів:</span>
                  <a href="tel:+380937205277" class="direct-call-number">+380 93 720 52 77</a>
                </div>
              </div>
            </div>

            <!-- Right Column: Open High-Converting Booking Form -->
            <div class="presentation-form-col">
              <div class="presentation-form-card">
                <div class="form-card-header">
                  <h3 class="form-card-title">Заявка на виїзний тест-драйв</h3>
                  <p class="form-card-subtitle">Заповніть форму, і наш фахівець узгодить з вами зручний день та формат тестування</p>
                </div>

                <!-- Format Switcher: Clinic vs Showroom -->
                <div class="format-switcher-wrap">
                  <span class="format-label">Формат тестування:</span>
                  <div class="format-switcher">
                    <button type="button" class="format-tab-btn active" data-format="clinic">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1"/></svg>
                      <span>У вашій клініці (виїзд)</span>
                    </button>
                    <button type="button" class="format-tab-btn" data-format="showroom">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
                      <span>У шоурумі (Київ)</span>
                    </button>
                  </div>
                </div>

                <!-- Main Booking Form -->
                <form class="glass-modal-form zionic-stage-form" onsubmit="event.preventDefault(); document.querySelector('.form-success-toast')?.classList.add('show'); setTimeout(() => document.querySelector('.form-success-toast')?.classList.remove('show'), 4000);">
                  <input type="hidden" name="requested_apparatus" value="Linfopress Evolution PRO">
                  
                  <div class="form-group-item">
                    <label class="form-label-text" for="linfopress_stage_name">Ваше ім'я та посада</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="linfopress_stage_name" name="name" placeholder="Наприклад: Вікторія, головний лікар" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="linfopress_stage_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="linfopress_stage_phone" name="phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>

                    <div class="form-group-item">
                      <label class="form-label-text" for="linfopress_stage_city">Місто / Назва клініки</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21.5C12 21.5 19 14.5 19 9.5C19 5.5 16 2.5 12 2.5C8 2.5 5 5.5 5 9.5C5 14.5 12 21.5 12 21.5Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></path><circle cx="12" cy="9.5" r="2.5" stroke-width="1.6" fill="currentColor"></circle></svg>
                        <input type="text" id="linfopress_stage_city" name="city" placeholder="Київ, Клініка..." required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для підтвердження</label>
                    <div class="messenger-pills-row">
                      <label class="messenger-pill active">
                        <input type="radio" name="linfopress_stage_messenger" value="Whatsapp" checked class="messenger-radio">
                        <span class="pill-dot dot-green"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="linfopress_stage_messenger" value="Telegram" class="messenger-radio">
                        <span class="pill-dot dot-blue"></span>
                        <span>Telegram</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="linfopress_stage_messenger" value="Viber" class="messenger-radio">
                        <span class="pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="linfopress_stage_messenger" value="Call" class="messenger-radio">
                        <span class="pill-dot dot-dark"></span>
                        <span>Дзвінок</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="shimmer-submit-btn">
                    <span>Замовити безкоштовний тест-драйв</span>
                    <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>

                  <div class="form-trust-bullets">
                    <div class="trust-bullet-item">
                      <span class="bullet-check">✓</span>
                      <span>0 грн за виїзд та доставку</span>
                    </div>
                    <div class="trust-bullet-item">
                      <span class="bullet-check">✓</span>
                      <span>Без зобов'язань купівлі</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- LINFOPRESS VIDEO LIGHTBOX MODAL -->
      <div id="linfopress_video_modal" class="popup glass-popup-modal zionic-video-lightbox" role="dialog" aria-modal="true" style="display: none;">
        <div class="glass-modal-backdrop" data-close-video-modal></div>
        <div class="zionic-video-lightbox-card">
          <button type="button" class="zionic-video-modal-close" data-close-video-modal aria-label="Закрити">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          <div class="zionic-video-lightbox-frame" id="linfopress_modal_video_container"></div>
          <div class="zionic-video-lightbox-caption">
            <span class="video-live-pill">LIVE ДЕМОНСТРАЦІЯ</span>
            <span class="video-lightbox-title">Клінічна пресотерапія LINFOPRESS EVOLUTION PRO</span>
          </div>
        </div>
      </div>
    `;

    // Replace the inner content of linfopress page
    html = html.replace(/<div[\s\n]+class=center>[\s\S]*?(?=<footer|$)/i, `<div class="zionic-main-page-wrapper linfopress-main-page-wrapper">\n${modernLinfopressHtml}\n</div>\n`);
  }

  // Modern Luxury Spanish Footer (Centered Logo + 2 Balanced Structured Columns)
  const modernLuxuryFooter = `
    <!-- Modern Luxury Spanish Footer -->
    <footer class="modern-luxury-footer">
      <div class="footer-container">
        
        <!-- 1. Top: Centered Luxury Brand Block -->
        <div class="footer-brand-centered">
          <a href="/" class="footer-main-logo">
            <img src="/wp-content/themes/zionic/assets/images/footer-logo.svg" alt="Termosalud Medical & Aesthetic">
          </a>
          <p class="footer-brand-sub">Офіційний ексклюзивний дистриб'ютор в Україні</p>
        </div>

        <!-- 2. Middle: 2 Balanced Structured Columns -->
        <div class="footer-two-columns">
          
          <!-- Column 1: Navigation & Equipment -->
          <div class="footer-col footer-col-nav">
            <h4 class="footer-col-title">Обладнання</h4>
            <ul class="footer-links-list">
              <li><a href="#our-products">Все обладнання</a></li>
              <li><a href="/zionic/">Zionic (MARP + RF)</a></li>
              <li><a href="/linfopress/">Linfopress Pro</a></li>
              <li><a href="/about-us/">Про нас</a></li>
            </ul>
          </div>

          <!-- Column 2: Direct Contacts & Support -->
          <div class="footer-col footer-col-contacts">
            <h4 class="footer-col-title">Контакти</h4>
            <div class="footer-contact-items">
              <a href="tel:+380937205277" class="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+380 93 720 52 77</span>
              </a>
              <a href="mailto:shop@termosalud.com.ua" class="footer-contact-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>shop@termosalud.com.ua</span>
              </a>
              <div class="footer-contact-item footer-location-text">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>Київ, шоурум та сервіс</span>
              </div>
            </div>
          </div>

        </div>

        <!-- 3. Bottom: Fine Copyright Bar -->
        <div class="footer-bottom-bar">
          <p>© 2026 Termosalud Україна. Всі права захищені.</p>
          <p class="footer-made-in">Розроблено в Іспанії • 100% Європейська якість</p>
        </div>

      </div>
    </footer>

    <!-- Minimalist Scroll-to-Top Button (Sharp Spanish Luxury) -->
    <button class="scroll-to-top" id="scrollToTopBtn" aria-label="Піднятися нагору">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  `;

  // State-Of-The-Art Spanish Liquid Glass Pop-Up Modal (Universal for all pages)
  const modernGlassPopupModal = `
    <!-- State-Of-The-Art Spanish Liquid Glass Pop-Up Modal -->
    <div id="popup_request" class="popup glass-popup-modal" role="dialog" aria-modal="true" aria-labelledby="glassModalTitle">
      <div class="glass-modal-backdrop" data-close-modal></div>
      <div class="glass-modal-card">
        <button type="button" class="glass-modal-close popup_close" aria-label="Закрити">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="glass-modal-header">
          <div class="glass-modal-badge">
            <span class="pulse-spark"></span>
            <span>ЕКСКЛЮЗИВ ДЛЯ КЛІНІК</span>
          </div>
          <h3 id="glassModalTitle" class="glass-modal-title">Заявка на виїзний тест-драйв</h3>
          <p class="glass-modal-subtitle">
            Протестуйте преміальне обладнання Termosalud безпосередньо у вашій клініці або в нашому демонстраційному центрі в Києві
          </p>
        </div>

        <!-- Format Switcher: Clinic vs Showroom -->
        <div class="format-switcher-wrap">
          <span class="format-label">Формат тестування:</span>
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
          <span class="format-label">Оберіть апарат для тесту:</span>
          <div class="device-pills-row">
            <label class="device-pill active">
              <input type="radio" name="modal_device" value="Zionic" checked class="device-radio">
              <span class="device-pill-dot dot-cyan"></span>
              <span>Zionic (MARP + RF)</span>
            </label>
            <label class="device-pill">
              <input type="radio" name="modal_device" value="Linfopress" class="device-radio">
              <span class="device-pill-dot dot-emerald"></span>
              <span>Linfopress Pro</span>
            </label>
            <label class="device-pill">
              <input type="radio" name="modal_device" value="Both" class="device-radio">
              <span class="device-pill-dot dot-gold"></span>
              <span>Обидва апарати</span>
            </label>
          </div>
        </div>

        <!-- Main Booking Form -->
        <form class="glass-modal-form" onsubmit="event.preventDefault(); document.getElementById('popup_request')?.classList.remove('is-active', 'show'); document.querySelector('.form-success-toast')?.classList.add('show'); setTimeout(() => document.querySelector('.form-success-toast')?.classList.remove('show'), 4000);">
          <div class="form-group-item">
            <label class="form-label-text" for="modal_name">Ваше ім'я та посада</label>
            <div class="input-with-icon">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
              <input type="text" id="modal_name" placeholder="Наприклад: Наталія, головний лікар" required class="luxury-form-input">
            </div>
          </div>

          <div class="form-row-2col">
            <div class="form-group-item">
              <label class="form-label-text" for="modal_phone">Телефон</label>
              <div class="input-with-icon">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                <input type="tel" id="modal_phone" placeholder="+380" required class="luxury-form-input">
              </div>
            </div>

            <div class="form-group-item">
              <label class="form-label-text" for="modal_city">Місто / Назва клініки</label>
              <div class="input-with-icon">
                <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 21.5C12 21.5 19 14.5 19 9.5C19 5.5 16 2.5 12 2.5C8 2.5 5 5.5 5 9.5C5 14.5 12 21.5 12 21.5Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></path><circle cx="12" cy="9.5" r="2.5" stroke-width="1.6" fill="currentColor"></circle></svg>
                <input type="text" id="modal_city" placeholder="Київ / Назва клініки" required class="luxury-form-input">
              </div>
            </div>
          </div>

          <div class="form-group-item">
            <label class="form-label-text">Зручний месенджер для підтвердження</label>
            <div class="messenger-pills-row">
              <label class="messenger-pill active">
                <input type="radio" name="modal_messenger" value="Whatsapp" checked class="messenger-radio">
                <span class="pill-dot dot-green"></span>
                <span>WhatsApp</span>
              </label>
              <label class="messenger-pill">
                <input type="radio" name="modal_messenger" value="Viber" class="messenger-radio">
                <span class="pill-dot dot-purple"></span>
                <span>Viber</span>
              </label>
              <label class="messenger-pill">
                <input type="radio" name="modal_messenger" value="Telegram" class="messenger-radio">
                <span class="pill-dot dot-blue"></span>
                <span>Telegram</span>
              </label>
            </div>
          </div>

          <button type="submit" class="shimmer-submit-btn modal-submit-btn">
            <span class="btn-text">ЗАБРОНЮВАТИ ВИЇЗНИЙ ТЕСТ-ДРАЙВ</span>
            <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>

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
              <span>Без зобов'язань покупки</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  `;

  // Remove old raw WordPress popup completely
  html = html.replace(/<div[\s\n]+id="?popup_request"?[\s\S]*?(?=<script[\s\n]+type=speculationrules|<script[\s\n]+src=|\n*<\/body>)/i, '');

  html = html.replace(/<footer[\s\S]*?<\/footer>/i, modernLuxuryFooter);

  // Add styles & Google Fonts
  const headInject = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700;800&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Onest:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/css/custom.css?v=${Date.now()}">
  <style>
    .split-title, .split-title *, .split-panel .split-title, .split-panel h3, .split-content .split-title, .split-content h3 {
      color: #f1f5f9 !important;
      text-shadow: 0 2px 14px rgba(0, 0, 0, 0.85) !important;
    }
    .split-title span {
      color: #cbd5e1 !important;
    }
  </style>
`;

  const footerInject = `
  ${modernGlassPopupModal}
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

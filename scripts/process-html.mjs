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

      <!-- 1. HERO SECTION (RESTORED EXACT ORIGINAL) -->
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
              <img src="/wp-content/uploads/zionic_official/Zionic-Aesthetic-logotipo.png" alt="Zionic Aesthetic" class="zionic-official-logo" width="220" height="48">
            </div>

            <h1 class="zionic-hero-title">
              <span class="zionic-word-top">НОВА ЕРА</span>
              <span class="zionic-word-bottom">КОРЕКЦІЇ ТІЛА</span>
            </h1>

            <p class="zionic-hero-desc">
              КОМБІНОВАНИЙ МОНОПОЛЯРНИЙ RF ТА РОТАЦІЙНИЙ МАСАЖ MARP
            </p>

            <div class="zionic-hero-actions">
              <a href="#test-drive" class="zionic-primary-btn">
                <span>Замовити тест-драйв у клініку</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button type="button" class="zionic-secondary-btn" id="open_zionic_video_btn" data-video-id="CYsDii-PZ7s">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Відео-демонстрація</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. 5-PILL HORIZONTAL LUXURY ADVANTAGES (MAIN PAGE & LINFOPRESS STYLE) -->
            <!-- 2. INFINITE MOVING LUXURY ADVANTAGES TICKER (PAUSES ON HOVER) -->
      <section class="zionic-infinite-ticker-section" id="advantages-icons">
        <div class="zionic-ticker-bg-media">
          <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/04/video-placeholder-optimized.png">
            <source src="/wp-content/themes/zionic/assets/images/presentation-video.mp4" type="video/mp4">
          </video>
          <div class="zionic-ticker-overlay"></div>
        </div>

        <div class="zionic-ticker-viewport">
          <div class="zionic-ticker-track">
            <!-- SET 1 -->
            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-highway_arrows-1.svg" alt="Максимальний ліфтинг" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Максимальний ліфтинг</h4>
                <p class="pillar-desc">Найглибший монополярний RF у поєднанні з ротаційним масажем MARP</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-working_mom-1.svg" alt="Персоналізація" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Персоналізація</h4>
                <p class="pillar-desc">Автоматичний підбір індивідуальної програми під кожного пацієнта</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-venus_de_milo-1.svg" alt="Лікування целюліту" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Лікування целюліту</h4>
                <p class="pillar-desc">Ефективна дія при едематозних та фіброзних стадіях целюліту</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-waist-1.svg" alt="Моделювання фігури" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Моделювання фігури</h4>
                <p class="pillar-desc">Найкомфортніший апарат для корекції силуету без болю та синців</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-trust-1.svg" alt="Реабілітація" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Реабілітація</h4>
                <p class="pillar-desc">Швидке відновлення та підтяжка тканин після ліпосакцій</p>
              </div>
            </div>

            <!-- SET 2 (DUPLICATE FOR SEAMLESS 100% INFINITE LOOP) -->
            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-highway_arrows-1.svg" alt="Максимальний ліфтинг" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Максимальний ліфтинг</h4>
                <p class="pillar-desc">Найглибший монополярний RF у поєднанні з ротаційним масажем MARP</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-working_mom-1.svg" alt="Персоналізація" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Персоналізація</h4>
                <p class="pillar-desc">Автоматичний підбір індивідуальної програми під кожного пацієнта</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-venus_de_milo-1.svg" alt="Лікування целюліту" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Лікування целюліту</h4>
                <p class="pillar-desc">Ефективна дія при едематозних та фіброзних стадіях целюліту</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-waist-1.svg" alt="Моделювання фігури" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Моделювання фігури</h4>
                <p class="pillar-desc">Найкомфортніший апарат для корекції силуету без болю та синців</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-trust-1.svg" alt="Реабілітація" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Реабілітація</h4>
                <p class="pillar-desc">Швидке відновлення та підтяжка тканин після ліпосакцій</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. TECHNOLOGIES BENTO SHOWCASE (MAIN PAGE STYLE) -->
      <section class="zionic-tech-bento-section" id="technologies">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ІННОВАЦІЙНА СИНЕРГІЯ</span>
            <h2 class="section-main-title">Технології ZIONIC</h2>
            <p class="section-main-sub">
              Поєднання двох потужних енергій в одній маніпулі під контролем вбудованого інтелекту
            </p>
          </div>

          <div class="tech-bento-grid">
            <!-- Card 1: Medical RF -->
            <div class="tech-bento-card">
              <div class="tech-card-media">
                <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/zio-1.mp4_snapshot_00.02.383-optimized.jpg">
                  <source src="/wp-content/uploads/2026/03/zio-1.mp4" type="video/mp4">
                </video>
                <div class="tech-badge-tag">МОНОПОЛЯРНИЙ RF 470 кГц</div>
              </div>
              <div class="tech-card-content">
                <h3 class="tech-card-heading">Медичний монополярний резистивний RF</h3>
                <p class="tech-card-text">
                  Глибока резистивна діатермія прогріває глибокі шари дерми та підшкірно-жирову клітковину, активуючи природний неоколагенез та посилюючи ангіогенез.
                </p>
                <ul class="tech-bullets-list">
                  <li><span class="bullet-check">✓</span><span>Зменшення об'єму жирових клітин</span></li>
                  <li><span class="bullet-check">✓</span><span>Потужний миттєвий та пролонгований ліфтинг</span></li>
                  <li><span class="bullet-check">✓</span><span>Зняття болю та поліпшення рухливості тканин</span></li>
                </ul>
              </div>
            </div>

            <!-- Card 2: MARP Rotation -->
            <div class="tech-bento-card">
              <div class="tech-card-media">
                <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/zio-2.mp4_snapshot_00.01.087-optimized.jpg">
                  <source src="/wp-content/uploads/2026/03/zio-2.mp4" type="video/mp4">
                </video>
                <div class="tech-badge-tag">MARP SYSTEM</div>
              </div>
              <div class="tech-card-content">
                <h3 class="tech-card-heading">Активний ротаційний глибокий масаж MARP</h3>
                <p class="tech-card-text">
                  Запатентований механізм активної ротації забезпечує потужний фізіологічний лімфодренаж, виведення токсинів та розбивання фіброзних тяжів без гематом.
                </p>
                <ul class="tech-bullets-list">
                  <li><span class="bullet-check">✓</span><span>Стимуляція відтоку лімфи у фізіологічному напрямку</span></li>
                  <li><span class="bullet-check">✓</span><span>Абсолютно комфортна процедура для пацієнта</span></li>
                  <li><span class="bullet-check">✓</span><span>Повна безпека завдяки датчикам тиску</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. MANIPULA & NOZZLES SPECIFICATION -->
            <!-- 3. FULLSCREEN UNCOMPROMISED MANIPULA INFOGRAPHIC SHOWCASE -->
      <section class="zionic-manipula-fullscreen-section" id="manipula">
        <div class="manipula-fullscreen-wrapper">
          <img 
            src="/zionic_manipula_official_infographic.png" 
            alt="Технологічна досконалість маніпули Zionic" 
            class="manipula-fullscreen-img"
            loading="lazy"
          >
        </div>
      </section>

      <!-- 5. CLINICAL BEFORE & AFTER SLIDER (MAIN PAGE SLIDER SYSTEM) -->
            <!-- 4. INTERACTIVE CLINICAL BEFORE & AFTER COMPARISON STAGE -->
            <!-- 4. VERTICAL SPLIT BEFORE / AFTER STAGE + 6 SELECTION TILES -->
            <!-- 4. HORIZONTAL SPLIT BEFORE / AFTER STAGE + 6 EQUAL-HEIGHT TILES -->
      <section class="zionic-ba-section" id="results">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <span class="luxury-kicker">КЛІНІЧНИЙ ПРОТОКОЛ</span>
            <h2 class="section-main-title">Клінічно підтверджені результати</h2>
            <p class="section-main-sub">
              Оберіть протокол терапії праворуч та рухайте повзунок вліво-вправо для оцінки реальних результатів «До» та «Після»
            </p>
          </div>

          <div class="zionic-split-results-layout">
            <!-- LEFT COLUMN: HORIZONTAL SLIDER COMPARISON STAGE -->
            <div class="zionic-compare-left-col">
              <div class="zionic-horizontal-compare-viewport" id="zionicHorizontalCompareViewport">
                <!-- AFTER IMAGE (BOTTOM LAYER) -->
                <div class="horizontal-img-layer layer-after">
                  <img id="compareImgAfter" src="/wp-content/uploads/zionic_official/case_1_after.jpg" alt="Після процедури Zionic" draggable="false">
                  <span class="horizontal-compare-tag tag-right">ПІСЛЯ</span>
                </div>

                <!-- BEFORE IMAGE (TOP CLIPPED LAYER) -->
                <div class="horizontal-img-layer layer-before" id="horizontalCompareLayerBefore">
                  <img id="compareImgBefore" src="/wp-content/uploads/zionic_official/case_1_before.jpg" alt="До процедури Zionic" draggable="false">
                  <span class="horizontal-compare-tag tag-left">ДО</span>
                </div>

                <!-- VERTICAL DIVIDER LINE & HORIZONTAL DRAG HANDLE -->
                <div class="horizontal-divider-handle" id="horizontalDividerHandle">
                  <div class="horizontal-divider-line"></div>
                  <div class="horizontal-handle-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </div>
                </div>

                <!-- RANGE INPUT FOR TOUCH & ARIA ACCESSIBILITY -->
                <input type="range" min="0" max="100" value="50" class="horizontal-range-input" id="horizontalRangeInput" aria-label="Горизонтальне порівняння результатів До та Після">
              </div>

              <!-- LIVE PROTOCOL BADGE UNDER SCREEN -->
              <div class="compare-current-meta-bar">
                <div class="meta-current-left">
                  <span class="meta-active-num" id="liveCaseNum">КЕЙС 01</span>
                  <span class="meta-active-title" id="liveCaseTitle">Стегна та сідниці</span>
                </div>
                <span class="meta-active-badge" id="liveCaseBadge">6 СЕАНСІВ</span>
              </div>
            </div>

            <!-- RIGHT COLUMN: 6 RICH TILES MATCHING EXACT HEIGHT -->
            <div class="zionic-compare-right-col">
              <div class="zionic-result-tiles-grid">
                <!-- TILE 1 -->
                <div class="result-tile-card is-active" data-case="1" data-before="/wp-content/uploads/zionic_official/case_1_before.jpg" data-after="/wp-content/uploads/zionic_official/case_1_after.jpg" data-title="Стегна та сідниці" data-num="КЕЙС 01" data-sessions="6 СЕАНСІВ">
                  <div class="tile-header">
                    <span class="tile-number">01</span>
                    <span class="tile-badge">6 сеансів</span>
                  </div>
                  <h4 class="tile-title">Стегна та сідниці</h4>
                  <p class="tile-desc">Усунення локальних жирових відкладень та підтяжка контуру сідниць. Зменшення окружності стегон на -4.5 см.</p>
                </div>

                <!-- TILE 2 -->
                <div class="result-tile-card" data-case="2" data-before="/wp-content/uploads/zionic_official/case_2_before.jpg" data-after="/wp-content/uploads/zionic_official/case_2_after.jpg" data-title="Зменшення целюліту" data-num="КЕЙС 02" data-sessions="5 СЕАНСІВ">
                  <div class="tile-header">
                    <span class="tile-number">02</span>
                    <span class="tile-badge">5 сеансів</span>
                  </div>
                  <h4 class="tile-title">Зменшення целюліту</h4>
                  <p class="tile-desc">Помітне розгладження мікрорельєфу шкіри при фіброзному целюліті, усунення ефекту «апельсинової кірки».</p>
                </div>

                <!-- TILE 3 -->
                <div class="result-tile-card" data-case="3" data-before="/wp-content/uploads/zionic_official/case_3_before.jpg" data-after="/wp-content/uploads/zionic_official/case_3_after.jpg" data-title="Підтяжка та ліфтинг" data-num="КЕЙС 03" data-sessions="4 СЕАНСИ">
                  <div class="tile-header">
                    <span class="tile-number">03</span>
                    <span class="tile-badge">4 сеанси</span>
                  </div>
                  <h4 class="tile-title">Підтяжка та ліфтинг</h4>
                  <p class="tile-desc">Потужне ущільнення в'ялої шкіри завдяки стимуляції синтезу неоколагену монополярним RF 470 кГц.</p>
                </div>

                <!-- TILE 4 -->
                <div class="result-tile-card" data-case="4" data-before="/wp-content/uploads/zionic_official/case_4_before.jpg" data-after="/wp-content/uploads/zionic_official/case_4_after.jpg" data-title="Корекція зони галіфе" data-num="КЕЙС 04" data-sessions="6 СЕАНСІВ">
                  <div class="tile-header">
                    <span class="tile-number">04</span>
                    <span class="tile-badge">6 сеансів</span>
                  </div>
                  <h4 class="tile-title">Корекція зони галіфе</h4>
                  <p class="tile-desc">Зменшення стійких жирових пасток на зовнішній поверхні стегон за рахунок активної MARP-ротації.</p>
                </div>

                <!-- TILE 5 -->
                <div class="result-tile-card" data-case="5" data-before="/wp-content/uploads/zionic_official/case_5_before.jpg" data-after="/wp-content/uploads/zionic_official/case_5_after.jpg" data-title="Живіт та боки" data-num="КЕЙС 05" data-sessions="5 СЕАНСІВ">
                  <div class="tile-header">
                    <span class="tile-number">05</span>
                    <span class="tile-badge">5 сеансів</span>
                  </div>
                  <h4 class="tile-title">Живіт та боки</h4>
                  <p class="tile-desc">Формування витонченої лінії талії, усунення набряків та глибокий дренаж вісцеральних і підшкірних зон.</p>
                </div>

                <!-- TILE 6 -->
                <div class="result-tile-card" data-case="6" data-before="/wp-content/uploads/zionic_official/case_6_before.jpg" data-after="/wp-content/uploads/zionic_official/case_6_after.jpg" data-title="Тонус та пружність" data-num="КЕЙС 06" data-sessions="4 СЕАНСИ">
                  <div class="tile-header">
                    <span class="tile-number">06</span>
                    <span class="tile-badge">4 сеанси</span>
                  </div>
                  <h4 class="tile-title">Тонус та пружність</h4>
                  <p class="tile-desc">Миттєвий та пролонгований ліфтинг тканин, покращення тургору та еластичності після ліполізу.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. 5 REASONS BENTO GRID (WHY ZIONIC IS BEST) -->
            <!-- 5. PROCEDURE ZIONIC SECTION (MODERNIZED IN MAIN PAGE DESIGN SYSTEM) -->
      <section class="zionic-procedure-showcase-section" id="procedure-experience">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <span class="luxury-kicker">ПРОТОКОЛ ТА ЕКСПЕРТНИЙ ДОСВІД</span>
            <h2 class="section-main-title">Процедура ZIONIC</h2>
            <p class="section-main-sub">
              ZIONIC — новий рівень апаратного моделювання тіла з поєднанням глибокої діатермії та ротаційного масажу
            </p>
          </div>

          <div class="zionic-procedure-split-grid">
            <!-- LEFT COLUMN: EXPERT DOCTOR REVIEW & CLINICAL DESCRIPTION -->
            <div class="procedure-expert-text-card">
              <div class="procedure-card-tag">ПРО ПРОЦЕДУРУ</div>
              
              <div class="procedure-text-paragraphs">
                <p class="procedure-lead-p">
                  Я працюю з апаратом Zionic, і найчастіше до мене звертаються пацієнти зі схожими запитами: набряклість, нерівний рельєф шкіри, локальні жирові відкладення та відчуття «застою» в тілі. Уже після перших процедур люди відзначають легкість, зменшення об'ємів за рахунок виведення зайвої рідини та більш гладку шкіру.
                </p>
                <p>
                  Сама процедура поєднує глибокий механічний масаж і радіочастотний прогрів тканин. Завдяки цьому ми одночасно покращуємо лімфодренаж, посилюємо кровообіг і стимулюємо обмінні процеси в жировій тканині. Це дає не лише візуальний ефект, а й покращує загальний стан тканин.
                </p>
                <p>
                  Після курсу пацієнти виглядають більш підтягнутими: шкіра стає щільнішою, рельєф рівнішим, зменшуються прояви целюліту. Водночас важливо розуміти — найкращий і стійкий результат ми отримуємо, коли процедура поєднується з правильним питним режимом та збалансованою активністю.
                </p>
              </div>

              <div class="procedure-meta-doctor-footer">
                <div class="doctor-badge-info">
                  <span class="doc-role">КЛІНІЧНИЙ ДОСВІД</span>
                  <span class="doc-highlight">Комфорт 100% • Без гематом та болю</span>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: PROCEDURE GALLERY SHOWCASE (SHARP BENTO) -->
            <div class="procedure-gallery-bento">
              <div class="gallery-main-frame">
                <img src="/wp-content/uploads/2026/03/procedure-1-optimized.png" alt="Процедура Zionic на сідниці та стегна" loading="lazy">
                <span class="gallery-frame-tag">Опрацювання стегон та сідниць</span>
              </div>

              <div class="gallery-sub-row">
                <div class="gallery-sub-frame">
                  <img src="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" alt="Процедура Zionic спина та талія" loading="lazy">
                  <span class="gallery-frame-tag">Зона спини та талії</span>
                </div>
                <div class="gallery-sub-frame">
                  <img src="/wp-content/uploads/2026/03/procedure-3-optimized.jpg" alt="Процедура Zionic живіт" loading="lazy">
                  <span class="gallery-frame-tag">Зона живота та боків</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. INDICATIONS & CONTRAINDICATIONS (SPLIT MATRIX) -->
      <section class="zionic-matrix-section" id="indications">
        <div class="container">
          <div class="matrix-split-wrapper">
            <!-- Left: Indications (Dark) -->
            <div class="matrix-side indications-side">
              <span class="matrix-kicker">КЛІНІЧНИЙ СПЕКТР</span>
              <h3 class="matrix-title">Показання до застосування</h3>
              <ul class="matrix-checklist">
                <li><span class="check-icon">✓</span><span>Локальні жирові відкладення (живіт, боки, стегна, руки)</span></li>
                <li><span class="check-icon">✓</span><span>Едематозний, фіброзний та м'який целюліт</span></li>
                <li><span class="check-icon">✓</span><span>Втрата пружності, дряблість та атонія шкіри</span></li>
                <li><span class="check-icon">✓</span><span>Моделювання силуету та підтяжка контуру сідниць</span></li>
                <li><span class="check-icon">✓</span><span>Реабілітація після хірургічної ліпосакції</span></li>
                <li><span class="check-icon">✓</span><span>М'язовий гіпертонус та болі після навантажень</span></li>
              </ul>
            </div>

            <!-- Right: Contraindications (Light Sharp) -->
            <div class="matrix-side contraindications-side">
              <span class="matrix-kicker-dark">БЕЗПЕКА ПАЦІЄНТА</span>
              <h3 class="matrix-title-dark">Протипоказання</h3>
              <ul class="matrix-crosslist">
                <li><span class="cross-icon">✕</span><span>Вагітність та період лактації</span></li>
                <li><span class="cross-icon">✕</span><span>Наявність кардіостимулятора або металевих імплантів у зоні обробки</span></li>
                <li><span class="cross-icon">✕</span><span>Онкологічні захворювання</span></li>
                <li><span class="cross-icon">✕</span><span>Гострі запальні процеси та інфекції шкіри</span></li>
                <li><span class="cross-icon">✕</span><span>Тромбофлебіт та важкі судинні порушення</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. PROCEDURE VIDEO BANNER -->
      <section class="zionic-video-banner-section" id="procedure">
        <div class="container">
          <div class="video-banner-sharp-frame">
            <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" class="procedure-video-bg">
              <source src="/wp-content/uploads/2026/03/tratamiento_de_remodelaciun_corporal_zionic_online_video_cutter.mp4" type="video/mp4">
            </video>
            <div class="video-banner-overlay"></div>
            <div class="video-banner-content">
              <h2 class="video-banner-title">Процедура ZIONIC у реальній практиці</h2>
              <p class="video-banner-sub">Подивіться, як проходить сеанс та як реагує тіло пацієнта на терапію MARP</p>
              <button type="button" class="video-play-huge-btn js-open-video-lightbox" data-video-id="CYsDii-PZ7s">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>ДИВИТИСЬ ВІДЕО ПРОЦЕДУРИ</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. TEST-DRIVE APPLICATION FORM (EXACT LUXURY MAIN PAGE FORM) -->
      <section class="zionic-booking-section" id="test-drive">
        <div class="container">
          <div class="luxury-booking-card">
            <div class="row align-items-center">
              <div class="col-lg-5">
                <div class="booking-text-wrap">
                  <span class="luxury-kicker">БЕЗКОШТОВНИЙ ТЕСТ-ДРАЙВ</span>
                  <h2 class="booking-title">Замовте презентацію ZIONIC у вашу клініку</h2>
                  <p class="booking-desc">
                    Ми привеземо апарат ZIONIC безпосередньо у ваш медичний центр або салон краси, проведемо демонстрацію на ваших пацієнтах та навчимо персонал.
                  </p>
                  <div class="booking-trust-pills">
                    <div class="trust-pill"><span class="pill-check">✓</span><span>0 ₴ за виїзд і доставку</span></div>
                    <div class="trust-pill"><span class="pill-check">✓</span><span>Тест на реальних клієнтах</span></div>
                    <div class="trust-pill"><span class="pill-check">✓</span><span>Без зобов'язань покупки</span></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-7">
                <form class="luxury-booking-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш методист зв\'яжеться з вами.');">
                  <div class="form-row-2col">
                    <div class="form-input-group">
                      <label>Ваше ім'я та посада</label>
                      <input type="text" placeholder="Наприклад: Олена, головний лікар" required>
                    </div>
                    <div class="form-input-group">
                      <label>Телефон</label>
                      <input type="tel" placeholder="+380" required>
                    </div>
                  </div>

                  <div class="form-input-group">
                    <label>Місто та назва клініки</label>
                    <input type="text" placeholder="Київ, Клініка естетичної медицини" required>
                  </div>

                  <div class="form-input-group">
                    <label>Зручний месенджер для зв'язку</label>
                    <div class="messenger-selector-row">
                      <label class="msg-choice active"><input type="radio" name="zionic_msg" value="WhatsApp" checked><span>WhatsApp</span></label>
                      <label class="msg-choice"><input type="radio" name="zionic_msg" value="Telegram"><span>Telegram</span></label>
                      <label class="msg-choice"><input type="radio" name="zionic_msg" value="Viber"><span>Viber</span></label>
                    </div>
                  </div>

                  <button type="submit" class="luxury-submit-btn">
                    <span>ЗАБРОНЮВАТИ ВИЇЗНИЙ ТЕСТ-ДРАЙВ</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. FAQ ACCORDION (MAIN PAGE LUXURY STYLE) -->
      <section class="zionic-faq-section" id="faq">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ВІДПОВІДІ НА ЗАПИТАННЯ</span>
            <h2 class="section-main-title">Часті питання про ZIONIC</h2>
          </div>

          <div class="faq-accordion-grid">
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Скільки процедур потрібно для помітного результату?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Перші зміни у тонусі шкіри та зняття набряклості помітні вже після 1–2 сеансів. Стійкий виражений ефект ремоделювання фігури досягається за курс із 6–10 процедур з інтервалом 2–3 рази на тиждень.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Чи відчуває пацієнт біль під час процедури ZIONIC?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Ні, процедура абсолютно безболісна та комфортна. Пацієнт відчуває приємне глибоке тепло та розслаблюючий механічний масаж без синців та гематом.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Які витратні матеріали потрібні для роботи?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Апарат не вимагає дорогих картриджів, одноразових костюмів або змінних лінз. Потрібен лише спеціальний контактний гліцериновий крем TermoSalud для ковзання маніпули та проведення RF.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Які умови гарантії та сервісного обслуговування?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>TermoSalud надає 2 роки повної офіційної гарантії. Наш сервісний центр в Україні забезпечує технічну підтримку та надання підмінного апарату на час регламентних робіт.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. SEO & CERTIFICATES -->
      <section class="zionic-seo-clean-section">
        <div class="container">
          <div class="seo-clean-box">
            <h3 class="seo-clean-title">Купити апарат Zionic (Rollactive RF) для корекції фігури в Україні</h3>
            <p class="seo-clean-text">
              Офіційний дистриб'ютор TermoSalud в Україні пропонує оригінальний апарат преміум-класу Zionic для медичних центрів, клінік естетичної медицини та SPA-комплексів. Поєднання резистивного монополярного радіочастотного ліфтингу з глибоким ротаційним масажем MARP гарантує неперевершені результати корекції фігури та омолодження тіла.
            </p>
          </div>
        </div>
      </section>

    `;

    // Replace the inner content of zionic page
    html = html.replace(/<div[\s\n]+class=center>[\s\S]*?(?=<footer|$)/i, `<div class="zionic-main-page-wrapper">\n${modernZionicHtml}\n</div>\n`);
  }

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
      </section>


      <!-- ADVANTAGES 5-PILL HORIZONTAL BANNER (EXACT 1-TO-1 CLONE) -->
      <div class="advantages fade-up">
        <div class="container">
          <div class="advantages-video-bg">
            <video autoplay="" loop="" muted="" playsinline="" poster="/wp-content/uploads/2026/04/video-placeholder-optimized.png">
              <source src="/wp-content/themes/zionic/assets/images/presentation-video.mp4" type="video/mp4">
            </video>
            <div class="advantages-video-content">
              <ul>
                <li data-aos="fade-up" data-aos-delay="0" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/1-1.svg" alt="Нове покоління - фото" title="Нове покоління">
                  </div>
                  <div>Нове покоління</div>
                  <div>Нове покоління комбінаторної пресотерапії</div>
                </li>
                <li data-aos="fade-up" data-aos-delay="100" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/2-1.svg" alt="Для всіх розмірів - фото" title="Для всіх розмірів">
                  </div>
                  <div>Для всіх розмірів</div>
                  <div>Три рівня блискавок для пацієнтів всіх розмірів</div>
                </li>
                <li data-aos="fade-up" data-aos-delay="200" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/3-1.svg" alt="4 етапи - фото" title="4 етапи">
                  </div>
                  <div>4 етапи</div>
                  <div>Чотири етапи пульсуючої пневматичної компресії</div>
                </li>
                <li data-aos="fade-up" data-aos-delay="300" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/4-1.svg" alt="10 програм - фото" title="10 програм">
                  </div>
                  <div>10 програм</div>
                  <div>Десять програм послідовної біоміметичної пульсації</div>
                </li>
                <li data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/5-1.svg" alt="Унікальність - фото" title="Унікальність">
                  </div>
                  <div>Унікальність</div>
                  <div>Тільки в Linfopress: пресомасаж холки і love-handles</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div class="technologies fade-up" id="technologies"><div class="container"><h2 class="big-title aos-init" data-aos="fade-up" data-aos-delay="50">Технології Linfopress Evolution PRO</h2><div class="technologies-top-text aos-init" data-aos="fade-up" data-aos-delay="200">Вперше технологія біоміметичної послідовної пульсації втілена в найкращий в світі апарат для пресотерапії. Linfopress Evolution PRO імітує природні пульсуючі рухи в чотирьох унікальних комбінаціях:</div><div class="technologies-row row"><div class="col-lg-6"><div class="technologies-item aos-init" data-toggle="modal" data-target="#techModal1" data-aos="fade-up" data-aos-delay="300"><div class="ti-video-block"><video muted="" loop="" playsinline="" preload="none" poster="/wp-content/uploads/2026/03/1-preview-optimized.png">
<source src="/wp-content/uploads/2026/03/1.mp4" type="video/mp4"></video></div><div class="ti-name">Стадія розігріву</div><div class="ti-descr"><ol>
<li>Ніжно розтягує тканини і судини, готуючи ділянки для інтенсивного пресомасажу.</li>
<li>Ідеально підходить для лікування фіброзного целюліту, коли пацієнтки є особливо чутливими.</li></ol></div><div class="ti-show-more">Дізнатись подробиці</div></div></div><div class="col-lg-6"><div class="technologies-item aos-init" data-toggle="modal" data-target="#techModal2" data-aos="fade-up" data-aos-delay="300"><div class="ti-video-block"><video muted="" loop="" playsinline="" preload="none" poster="/wp-content/uploads/2026/03/2-preview-1-optimized.png">
<source src="/wp-content/uploads/2026/03/2-1.mp4" type="video/mp4"></video></div><div class="ti-name">Хвиля</div><div class="ti-descr"><ol>
<li>Послідовне стискання і розтискання 24-ох високоякісних манжет від дистальних ділянок до проксимальних.</li>
<li>Тривалий масаж, спрямовує рідини з периферичних ділянок до центру тіла. Підходить для лікування целюліту, спортивного масажу, розслаблення м’язів.</li></ol></div><div class="ti-show-more">Дізнатись подробиці</div></div></div><div class="col-lg-6"><div class="technologies-item aos-init" data-toggle="modal" data-target="#techModal3" data-aos="fade-up" data-aos-delay="300"><div class="ti-video-block"><video muted="" loop="" playsinline="" preload="none" poster="/wp-content/uploads/2026/04/limfonew-optimized.jpg">
<source src="/wp-content/uploads/2026/04/limfonew2.mp4" type="video/mp4"></video></div><div class="ti-name">Лімфодренаж</div><div class="ti-descr"><ol>
<li>Найглибший, найінтенсивніший з можливих (тиск до 80 мм Hg).</li>
<li>Тиск в 24-ох манжетах зменшується, коли хвиля наближається до проксимальної цільової області.</li></ol></div><div class="ti-show-more">Дізнатись подробиці</div></div></div><div class="col-lg-6"><div class="technologies-item aos-init" data-toggle="modal" data-target="#techModal4" data-aos="fade-up" data-aos-delay="300"><div class="ti-video-block"><video muted="" loop="" playsinline="" preload="none" poster="/wp-content/uploads/2026/03/4-preview-1-optimized.png">
<source src="" type="video/mp4"></video></div><div class="ti-name">Релаксація</div><div class="ti-descr"><ol>
<li>Заспокоює м’язи і тканини після інтенсивної роботи.</li>
<li>Ідеально для завершального лікування целюліту, синдрому втомлених ніг, після ліпосакції та вагітності.</li></ol></div><div class="ti-show-more">Дізнатись подробиці</div></div></div></div><div class="technologies-bottom-text aos-init" data-aos="fade-up" data-aos-delay="200">Нове покоління інтелектуальної пресотерапії. <br>Діапазон процедур від косметології до реабілітації після ліпоскацій та переломів</div><div class="aos-init" data-aos="fade-up" data-aos-delay="300">
<button class="another-pages-banner-button" data-popup="popup_request">Дізнатись більше</button></div></div></div>

<div class="modal fade tech-modal" id="techModal1" tabindex="-1">
<button type="button" class="close" data-dismiss="modal">
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6862 9.85784C12.5014 9.66779 12.2807 9.51635 12.037 9.41233C11.7932 9.30831 11.5311 9.25377 11.2661 9.2519C11.0011 9.25003 10.7383 9.30085 10.493 9.40141C10.2478 9.50197 10.025 9.65028 9.8376 9.8377C9.65018 10.0251 9.50188 10.2479 9.40131 10.4931C9.30075 10.7384 9.24993 11.0011 9.2518 11.2662C9.25368 11.5312 9.30821 11.7933 9.41223 12.037C9.51625 12.2808 9.66769 12.5015 9.85774 12.6863L35.3136 38.1421C35.4983 38.3322 35.719 38.4836 35.9628 38.5876C36.2066 38.6916 36.4686 38.7462 36.7337 38.748C36.9987 38.7499 37.2615 38.6991 37.5067 38.5985C37.7519 38.498 37.9747 38.3497 38.1622 38.1622C38.3496 37.9748 38.4979 37.752 38.5984 37.5068C38.699 37.2616 38.7498 36.9988 38.7479 36.7338C38.7461 36.4687 38.6915 36.2067 38.5875 35.9629C38.4835 35.7191 38.3321 35.4984 38.142 35.3137L12.6862 9.85784Z" fill="#FFFF00"></path>
<path d="M9.85832 35.3138C9.66827 35.4986 9.51684 35.7193 9.41282 35.963C9.30879 36.2068 9.25426 36.4689 9.25239 36.7339C9.25051 36.9989 9.30134 37.2617 9.4019 37.507C9.50246 37.7522 9.65076 37.975 9.83818 38.1624C10.0256 38.3498 10.2484 38.4981 10.4936 38.5987C10.7389 38.6992 11.0016 38.7501 11.2667 38.7482C11.5317 38.7463 11.7938 38.6918 12.0375 38.5878C12.2813 38.4837 12.502 38.3323 12.6868 38.1423L38.1426 12.6864C38.3326 12.5017 38.4841 12.281 38.5881 12.0372C38.6921 11.7934 38.7467 11.5314 38.7485 11.2663C38.7504 11.0013 38.6996 10.7385 38.599 10.4933C38.4985 10.2481 38.3502 10.0253 38.1627 9.83784C37.9753 9.65042 37.7525 9.50212 37.5073 9.40156C37.2621 9.30099 36.9993 9.25018 36.7342 9.25205C36.4692 9.25392 36.2072 9.30845 35.9634 9.41247C35.7196 9.5165 35.4989 9.66793 35.3142 9.85799L9.85832 35.3138Z" fill="#FFFF00"></path>
</svg>
</button><div class="modal-dialog modal-xs modal-dialog-centered"><div class="modal-content"><div class="modal-video"><video class="modal-video" controls="" loop="" playsinline="">
<source src="/wp-content/uploads/2026/03/1.mp4" type="video/mp4"></video></div><div class="ti-name">Стадія розігріву</div><div class="ti-descr"><p>Стадія розігріву – це унікальна особливість апарату для пресотерапії Linfopress Evolution PRO.</p><p>Стадію розігріву додали в кожну програму Linfopress Evolution PRO на запит досвідчених лікарів, які вважають, що тканини потрібно підготувати до компресії.</p><p>На простих апаратах лікарі вручну встановлюють програму з помірним стисненням на перші 5 хвилин процедури, а потім вручну переключають на робочий тиск.</p><p>Linfopress Evolution PRO – це новий етап розвитку пресотерапії. Автоматично задає стадію розігріву, що ніжно розтягує тканини і судини, готуючи ділянки для інтенсивного пресомасажу. Ідеально підходить для лікування фіброзного целюліту, коли пацієнтки є особливо чутливими.</p><p>За свідченням користувачів пацієнтки приємно здивовані від того, що в процесі процедури змінюється тиск. Це зручно, ефективно і підкреслює преміальність клініки, де навіть базова лікувальна процедура краща, ніж у всіх.</p></div></div></div></div>

<div class="modal fade tech-modal" id="techModal2" tabindex="-1">
<button type="button" class="close" data-dismiss="modal">
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6862 9.85784C12.5014 9.66779 12.2807 9.51635 12.037 9.41233C11.7932 9.30831 11.5311 9.25377 11.2661 9.2519C11.0011 9.25003 10.7383 9.30085 10.493 9.40141C10.2478 9.50197 10.025 9.65028 9.8376 9.8377C9.65018 10.0251 9.50188 10.2479 9.40131 10.4931C9.30075 10.7384 9.24993 11.0011 9.2518 11.2662C9.25368 11.5312 9.30821 11.7933 9.41223 12.037C9.51625 12.2808 9.66769 12.5015 9.85774 12.6863L35.3136 38.1421C35.4983 38.3322 35.719 38.4836 35.9628 38.5876C36.2066 38.6916 36.4686 38.7462 36.7337 38.748C36.9987 38.7499 37.2615 38.6991 37.5067 38.5985C37.7519 38.498 37.9747 38.3497 38.1622 38.1622C38.3496 37.9748 38.4979 37.752 38.5984 37.5068C38.699 37.2616 38.7498 36.9988 38.7479 36.7338C38.7461 36.4687 38.6915 36.2067 38.5875 35.9629C38.4835 35.7191 38.3321 35.4984 38.142 35.3137L12.6862 9.85784Z" fill="#FFFF00"></path>
<path d="M9.85832 35.3138C9.66827 35.4986 9.51684 35.7193 9.41282 35.963C9.30879 36.2068 9.25426 36.4689 9.25239 36.7339C9.25051 36.9989 9.30134 37.2617 9.4019 37.507C9.50246 37.7522 9.65076 37.975 9.83818 38.1624C10.0256 38.3498 10.2484 38.4981 10.4936 38.5987C10.7389 38.6992 11.0016 38.7501 11.2667 38.7482C11.5317 38.7463 11.7938 38.6918 12.0375 38.5878C12.2813 38.4837 12.502 38.3323 12.6868 38.1423L38.1426 12.6864C38.3326 12.5017 38.4841 12.281 38.5881 12.0372C38.6921 11.7934 38.7467 11.5314 38.7485 11.2663C38.7504 11.0013 38.6996 10.7385 38.599 10.4933C38.4985 10.2481 38.3502 10.0253 38.1627 9.83784C37.9753 9.65042 37.7525 9.50212 37.5073 9.40156C37.2621 9.30099 36.9993 9.25018 36.7342 9.25205C36.4692 9.25392 36.2072 9.30845 35.9634 9.41247C35.7196 9.5165 35.4989 9.66793 35.3142 9.85799L9.85832 35.3138Z" fill="#FFFF00"></path>
</svg>
</button><div class="modal-dialog modal-xs modal-dialog-centered"><div class="modal-content"><div class="modal-video"><video class="modal-video" controls="" loop="" playsinline="">
<source src="/wp-content/uploads/2026/03/2-1.mp4" type="video/mp4"></video></div><div class="ti-name">Хвиля</div><div class="ti-descr"><p>Цей цикл багаторазово застосовує компресивний масаж починаючи від дистальних зон до центру тіла. Така послідовність надування/здування забезпечує постійний масаж, що переміщує рідини з дистальних зон до центру тіла, сприяючи поверненню рідин і їх реабсорбції.</p><p>Цикл в камерах змінюється поступово, коли попередня камера здувається, наступна надувається. На відміну від стадії розігріву, стадія «хвилі» завжди надуває всі камери, починаючи з дистальної камери і закінчуючи на проксимальній.</p><p>Масажний ефект, що забезпечується на цій фазі, підходить для усунення целюліту, спортивного масажу, підготовки до ліпосакції та релаксації м’язів.</p></div></div></div></div>

<div class="modal fade tech-modal" id="techModal3" tabindex="-1">
<button type="button" class="close" data-dismiss="modal">
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6862 9.85784C12.5014 9.66779 12.2807 9.51635 12.037 9.41233C11.7932 9.30831 11.5311 9.25377 11.2661 9.2519C11.0011 9.25003 10.7383 9.30085 10.493 9.40141C10.2478 9.50197 10.025 9.65028 9.8376 9.8377C9.65018 10.0251 9.50188 10.2479 9.40131 10.4931C9.30075 10.7384 9.24993 11.0011 9.2518 11.2662C9.25368 11.5312 9.30821 11.7933 9.41223 12.037C9.51625 12.2808 9.66769 12.5015 9.85774 12.6863L35.3136 38.1421C35.4983 38.3322 35.719 38.4836 35.9628 38.5876C36.2066 38.6916 36.4686 38.7462 36.7337 38.748C36.9987 38.7499 37.2615 38.6991 37.5067 38.5985C37.7519 38.498 37.9747 38.3497 38.1622 38.1622C38.3496 37.9748 38.4979 37.752 38.5984 37.5068C38.699 37.2616 38.7498 36.9988 38.7479 36.7338C38.7461 36.4687 38.6915 36.2067 38.5875 35.9629C38.4835 35.7191 38.3321 35.4984 38.142 35.3137L12.6862 9.85784Z" fill="#FFFF00"></path>
<path d="M9.85832 35.3138C9.66827 35.4986 9.51684 35.7193 9.41282 35.963C9.30879 36.2068 9.25426 36.4689 9.25239 36.7339C9.25051 36.9989 9.30134 37.2617 9.4019 37.507C9.50246 37.7522 9.65076 37.975 9.83818 38.1624C10.0256 38.3498 10.2484 38.4981 10.4936 38.5987C10.7389 38.6992 11.0016 38.7501 11.2667 38.7482C11.5317 38.7463 11.7938 38.6918 12.0375 38.5878C12.2813 38.4837 12.502 38.3323 12.6868 38.1423L38.1426 12.6864C38.3326 12.5017 38.4841 12.281 38.5881 12.0372C38.6921 11.7934 38.7467 11.5314 38.7485 11.2663C38.7504 11.0013 38.6996 10.7385 38.599 10.4933C38.4985 10.2481 38.3502 10.0253 38.1627 9.83784C37.9753 9.65042 37.7525 9.50212 37.5073 9.40156C37.2621 9.30099 36.9993 9.25018 36.7342 9.25205C36.4692 9.25392 36.2072 9.30845 35.9634 9.41247C35.7196 9.5165 35.4989 9.66793 35.3142 9.85799L9.85832 35.3138Z" fill="#FFFF00"></path>
</svg>
</button><div class="modal-dialog modal-xs modal-dialog-centered"><div class="modal-content"><div class="modal-video"><video class="modal-video" controls="" loop="" playsinline="">
<source src="/wp-content/uploads/2026/04/limfonew2.mp4" type="video/mp4"></video></div><div class="ti-name">Лімфодренаж</div><div class="ti-descr"><p>В цій стадії застосовуються фази планомірного стискання в напрямку від дистальних до проксимальних зон, тиск зменшується при наближенні до проксимальної зони.</p><p>Лімфодренаж в Linfopress Evolution PRO найглибший, найінтенсивніший з можливих до 80 мм Hg. Завдяки стадії розігріву і грамотно підібраним циклам стискань сприймається пацієнтками толерантно. Без неприємних відчуттів.</p><p>Тиск в камерах можна налаштовувати індивідуально. Ідеально підходить для відведення надлишків рідини з тканин, для лікування целлюліту, викликаного застоєм рідини.</p></div></div></div></div>

<div class="modal fade tech-modal" id="techModal4" tabindex="-1">
<button type="button" class="close" data-dismiss="modal">
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6862 9.85784C12.5014 9.66779 12.2807 9.51635 12.037 9.41233C11.7932 9.30831 11.5311 9.25377 11.2661 9.2519C11.0011 9.25003 10.7383 9.30085 10.493 9.40141C10.2478 9.50197 10.025 9.65028 9.8376 9.8377C9.65018 10.0251 9.50188 10.2479 9.40131 10.4931C9.30075 10.7384 9.24993 11.0011 9.2518 11.2662C9.25368 11.5312 9.30821 11.7933 9.41223 12.037C9.51625 12.2808 9.66769 12.5015 9.85774 12.6863L35.3136 38.1421C35.4983 38.3322 35.719 38.4836 35.9628 38.5876C36.2066 38.6916 36.4686 38.7462 36.7337 38.748C36.9987 38.7499 37.2615 38.6991 37.5067 38.5985C37.7519 38.498 37.9747 38.3497 38.1622 38.1622C38.3496 37.9748 38.4979 37.752 38.5984 37.5068C38.699 37.2616 38.7498 36.9988 38.7479 36.7338C38.7461 36.4687 38.6915 36.2067 38.5875 35.9629C38.4835 35.7191 38.3321 35.4984 38.142 35.3137L12.6862 9.85784Z" fill="#FFFF00"></path>
<path d="M9.85832 35.3138C9.66827 35.4986 9.51684 35.7193 9.41282 35.963C9.30879 36.2068 9.25426 36.4689 9.25239 36.7339C9.25051 36.9989 9.30134 37.2617 9.4019 37.507C9.50246 37.7522 9.65076 37.975 9.83818 38.1624C10.0256 38.3498 10.2484 38.4981 10.4936 38.5987C10.7389 38.6992 11.0016 38.7501 11.2667 38.7482C11.5317 38.7463 11.7938 38.6918 12.0375 38.5878C12.2813 38.4837 12.502 38.3323 12.6868 38.1423L38.1426 12.6864C38.3326 12.5017 38.4841 12.281 38.5881 12.0372C38.6921 11.7934 38.7467 11.5314 38.7485 11.2663C38.7504 11.0013 38.6996 10.7385 38.599 10.4933C38.4985 10.2481 38.3502 10.0253 38.1627 9.83784C37.9753 9.65042 37.7525 9.50212 37.5073 9.40156C37.2621 9.30099 36.9993 9.25018 36.7342 9.25205C36.4692 9.25392 36.2072 9.30845 35.9634 9.41247C35.7196 9.5165 35.4989 9.66793 35.3142 9.85799L9.85832 35.3138Z" fill="#FFFF00"></path>
</svg>
</button><div class="modal-dialog modal-xs modal-dialog-centered"><div class="modal-content"><div class="modal-video"><video class="modal-video" controls="" loop="" playsinline="">
<source src="" type="video/mp4"></video></div><div class="ti-name">Релаксація</div><div class="ti-descr"><p>Найпопулярніший етап процедри пресотерапії. Пацієнтки із вдячністю сприймають зменшення тиску і ритмічні заспокоюючі хвилі. Відчувають, що процедура проходить на вищому рівні.</p><p>Релаксація заспокоює м’язи і тканини після інтенсивної роботи. Ідеально підходить для завершального лікування целюліту, синдрому втомлених ніг, після ліпосакції та після вагітності або втоми після менопаузи.</p></div></div></div></div>

<script>document.addEventListener('DOMContentLoaded', () => {
            const items = document.querySelectorAll('.technologies-item');
            const isMobile = () => window.innerWidth <= 991;
            items.forEach(item => {
                const video = item.querySelector('video');
                const playOnHover = () => {
                item.addEventListener('mouseenter', () => {
                    if (!isMobile()) {
                    video.play();
                    }
                });
                item.addEventListener('mouseleave', () => {
                    if (!isMobile()) {
                    video.pause();
                    video.currentTime = 0;
                    }
                });
                };
                playOnHover();
                const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (isMobile()) {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                    }
                });
                }, {
                threshold: 0.5
                });
                observer.observe(item);
            });
        });
        $(document).ready(function () {
            $('.tech-modal').on('shown.bs.modal', function () {
                const video = $(this).find('video').get(0);
                if (video) {
                video.currentTime = 0;
                video.play();
                }
            });
            $('.tech-modal').on('hide.bs.modal', function () {
                const video = $(this).find('video').get(0);
                if (video) {
                video.pause();
                video.currentTime = 0;
                }
            });
        });</script>

<div class="linfo-video-block fade-up" id="procedure"><div class="container"><h2 class="big-title aos-init" data-aos="fade-up" data-aos-delay="50">Процедура Linfopress Evolution PRO</h2><div class="video-block js-video-block aos-init" data-aos="fade-up" data-aos-delay="200"><div class="video-poster js-video-poster" data-youtube="K1v77enueJ8"><video class="modal-video js-preview-video" autoplay="" muted="" loop="" playsinline="" preload="auto">
<source src="/wp-content/uploads/2026/03/termosalud_vid.mp4" type="video/mp4"></video><div class="play-button">
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.3965 4.11135C9.1042 4.20204 7 6.0722 7 8.59182V39.4082C7 42.7677 10.7428 44.9719 13.6816 43.3438L41.4902 27.9356C44.5137 26.2603 44.5137 21.7398 41.4902 20.0645L13.6816 4.65627C12.9469 4.24923 12.1606 4.08112 11.3965 4.11135Z" fill="white"></path>
</svg></div></div><div class="video-container"><div class="js-youtube-player"></div></div></div></div></div>

<div class="advantages-big fade-up" id="advantages"><div class="container"><h2 class="big-title aos-init" data-aos="fade-up" data-aos-delay="50">Переваги Linfopress Evolution PRO</h2><div class="advantages-big-row row"><div class="col-lg-8"><ul class="abr-ul">
<li data-aos="fade-up" data-aos-delay="0" class="aos-init">
<span>1</span>
<span>Перший в світі апарат для&nbsp;пресотерапії з&nbsp;масажем ділянок холки і&nbsp;бочків (love-handles)</span>
</li>
<li data-aos="fade-up" data-aos-delay="200" class="aos-init">
<span>2</span>
<span>Нове покоління інтелектуальної пресотерапії: технологія біоміметичної послідовної пульсації</span>
</li>
<li data-aos="fade-up" data-aos-delay="400" class="aos-init">
<span>3</span>
<span>Підвищена безпека завдяки контролю тиску в&nbsp;кожній манжеті</span>
</li>
<li data-aos="fade-up" data-aos-delay="0" class="aos-init">
<span>4</span>
<span>Найзручніший в&nbsp;роботі. Манжети для ніг і рук зручно одягаються, мають три рівня блискавок для пацієнтів всіх розмірів</span>
</li>
<li data-aos="fade-up" data-aos-delay="200" class="aos-init">
<span>5</span>
<span>Найкомфортніший завдяки етапам розігріву і&nbsp;релаксації</span>
</li>
<li data-aos="fade-up" data-aos-delay="400" class="aos-init">
<span>6</span>
<span>Ключовий елемент програм "Детокс", "Схуднення", "Антицелюліт"</span>
</li>
<li data-aos="fade-up" data-aos-delay="0" class="aos-init">
<span>7</span>
<span>Використовується у спортивній медицині (розігрів перед тренуваннями, регенерація тканин)</span>
</li>
<li data-aos="fade-up" data-aos-delay="200" class="aos-init">
<span>8</span>
<span>Використовується у пост-операційній реабілітації для&nbsp;дренажу</span>
</li>
<li data-aos="fade-up" data-aos-delay="400" class="aos-init">
<span>9</span>
<span>Найвища якість матеріалів (апарат класу преміум)</span>
</li></ul></div><div class="col-lg-4"><div class="abr-img-block">
<img src="/wp-content/uploads/2026/03/abr-img-optimized.png" alt="Переваги Linfopress Evolution PRO - фото" title="Переваги Linfopress Evolution PRO" data-aos="fade-up" data-aos-delay="200" class="aos-init"></div></div></div></div></div>

<div class="readings fade-up" id="indications"><div class="container"><div class="row"><div class="col-lg-6"><div class="readings-block aos-init" data-aos="fade-up" data-aos-delay="200"><div class="app-video-bg">
<video autoplay="" loop="" muted="" playsinline="" poster="/wp-content/uploads/2026/04/video-placeholder-optimized.png"><source src="/wp-content/themes/zionic/assets/images/presentation-video.mp4" type="video/mp4"></video><div class="app-video-content"><h2 class="readings-block-name">Показання</h2><ul class="readings-block-ul">
<li>Лікування едематозного целлюліту</li>
<li>Зменшення затримки рідини та набряків</li>
<li>Підготування та реабілітація після ліпосакції</li>
<li>Пост-операційна реабілітація після мастектомії</li>
<li>Детоксикація тканин та лімфодренаж</li>
<li>Спорт: Підготовка, DOMS (крепатура), регенерація зв’язок</li>
<li>Покращення кровообігу, зняття втоми ніг</li>
<li>Післяпологове відновлення, симптоми менопаузи</li></ul></div></div></div></div><div class="col-lg-6"><div class="contraindications-block aos-init" data-aos="fade-up" data-aos-delay="500"><h2 class="contraindications-block-name">Протипоказання</h2><ul class="contraindications-block-ul">
<li>Онкологія</li>
<li>Порушення цілісності шкірного покриву</li>
<li>Епілепсія, порушення психіки</li>
<li>Цукровий діабет (декомпенсована форма)</li>
<li>Аутоімунні захворювання</li>
<li>Хронічні захворювання на стадії загострення</li>
<li>ГРВІ, грип</li></ul></div></div></div></div></div>

<div class="experience-block fade-up"><div class="container"><h2 class="big-title aos-init" data-aos="fade-up" data-aos-delay="50">
Досвід лікарів</h2><div class="experience-block-text aos-init" data-aos="fade-up" data-aos-delay="200">
Фахівці «Арден-Палац» оцінили зручність в роботі манжет для ніг пацієнтів. Завдяки трьом рядам блискавок штани ідеально адаптуються для пацієнтів зростом від 1,5 до 2 метрів.</div><div class="experience-block-bg aos-init" data-aos="fade-up" data-aos-delay="300"><div class="row"><div class="col-lg-6"><div class="experience-block-img-block aos-init" data-aos="fade-up" data-aos-delay="200">
<img src="/wp-content/uploads/2026/03/experience-block-img-optimized.png" alt="Linfopress Evolution PRO — це новий стандарт у пресотерапії, який перевершив усі мої очікування як лікаря - фото" title="Linfopress Evolution PRO — це новий стандарт у пресотерапії, який перевершив усі мої очікування як лікаря"></div></div><div class="col-lg-6"><div class="eb-title aos-init" data-aos="fade-up" data-aos-delay="300">
Linfopress Evolution PRO — це новий стандарт у пресотерапії, який перевершив усі мої очікування як лікаря</div><div class="eb-descr aos-init" data-aos="fade-up" data-aos-delay="400"><p>Працюючи в сфері естетичної медицини та реабілітації вже багато років, я мала справу з різними апаратами для пресотерапії. Але коли в нашій клініці з’явився Linfopress Evolution PRO, це повністю змінило підхід до процедури. З точки зору фахівця, апарат неймовірно зручний у щоденній роботі. Одягання манжет більше не забирає багато часу, а завдяки трьом рядам блискавок штани ідеально та швидко адаптуються під пацієнтів будь-якої комплекції — від мініатюрних дівчат до високих чоловіків зростом під два метри. Але головна його перевага — це технологія біоміметичної послідовної пульсації. Мої пацієнти в повному захваті від поетапного підходу. Стадія м’якого розігріву ідеально готує судини та тканини , що дозволяє нам абсолютно безболісно працювати навіть з пацієнтками, які мають чутливий фіброзний целюліт.</p></div><div class="eb-name aos-init" data-aos="fade-up" data-aos-delay="500">
Гуцул Оксана Миколаївна</div><div class="eb-profession aos-init" data-aos="fade-up" data-aos-delay="600">
головний лікар Arden Palace Medical Resort &amp; SPA</div></div></div></div></div></div>

<div class="why-this fade-up" id="why"><div class="why-this-video-bg"><video autoplay="" muted="" loop="" playsinline="">
<source src="/wp-content/themes/zionic/assets/images/why-this-video.mp4" type="video/mp4"></video><div class="why-this-video-content"><div class="container"><h2 class="big-title aos-init" data-aos="fade-up" data-aos-delay="50">
Чому саме Linfopress Evolution PRO</h2><div class="why-this-row row"><div class="col-lg-4"><div class="why-this-div-for-img">
<img src="/wp-content/uploads/2026/03/why-this-img-optimized.png" alt="Чому саме Linfopress Evolution PRO - фото" title="Чому саме Linfopress Evolution PRO" data-aos="fade-up" data-aos-delay="200" class="aos-init"></div></div><div class="col-lg-8"><div class="why-this-right-row row"><div class="col-lg-6 aos-init" data-aos="fade-up" data-aos-delay="0"><div class="why-this-item">
<span>1</span>
<span> Унікальна комбінація різних форм пресомасажу в одній програмі</span></div></div><div class="col-lg-6 aos-init" data-aos="fade-up" data-aos-delay="100"><div class="why-this-item">
<span>2</span>
<span>Преміальна якість матеріалів виконання</span></div></div><div class="col-lg-6 aos-init" data-aos="fade-up" data-aos-delay="200"><div class="why-this-item">
<span>3</span>
<span>Абсолютно унікальна куртка для пресомасажу холки і бочків</span></div></div><div class="col-lg-6 aos-init" data-aos="fade-up" data-aos-delay="300"><div class="why-this-item">
<span>4</span>
<span>Найзручніший метод одягання манжет</span></div></div><div class="col-lg-6 aos-init" data-aos="fade-up" data-aos-delay="400"><div class="why-this-item">
<span>5</span>
<span>Найінтенсивніший лімфодренажний масаж (завдяки підготовці та&nbsp;біоміметиці)</span></div></div></div></div></div><div class="set-block"><h2 class="set-block-title aos-init" data-aos="fade-up" data-aos-delay="50">
Комплект поставки</h2><div class="set-block-row row"><div class="col-lg-2 aos-init" data-aos="fade-up" data-aos-delay="0"><div class="set-block-item"><div><img src="/wp-content/uploads/2026/03/set1-optimized.png" alt="Апарат - фото" title="Апарат"></div><div>Апарат</div></div></div><div class="col-lg-2 aos-init" data-aos="fade-up" data-aos-delay="100"><div class="set-block-item"><div><img src="/wp-content/uploads/2026/03/set2-optimized.png" alt="Функціональний візок - фото" title="Функціональний візок"></div><div>Функціональний візок</div></div></div><div class="col-lg-2 aos-init" data-aos="fade-up" data-aos-delay="200"><div class="set-block-item"><div><img src="/wp-content/uploads/2026/03/pants2-optimized.jpg" alt="Дві манжети для ніг (штани і пояс) - фото" title="Дві манжети для ніг (штани і пояс)"></div><div>Дві манжети для ніг (штани і пояс)</div></div></div><div class="col-lg-2 aos-init" data-aos="fade-up" data-aos-delay="300"><div class="set-block-item"><div><img src="/wp-content/uploads/2026/03/shirt2-optimized.jpg" alt="Куртка для масажу верхньої частини тулубу - фото" title="Куртка для масажу верхньої частини тулубу"></div><div>Куртка для масажу верхньої частини тулубу</div></div></div><div class="col-lg-2 aos-init" data-aos="fade-up" data-aos-delay="400"><div class="set-block-item"><div><img src="/wp-content/uploads/2026/03/set5-optimized.png" alt="Дві манжети для рук - фото" title="Дві манжети для рук"></div><div>Дві манжети для рук</div></div></div></div></div></div></div></div></div>

<div class="questions fade-up" id="faq"><div class="container"><div class="aos-init" data-aos="fade-up" data-aos-delay="50">
<button class="another-pages-banner-button" data-popup="popup_request">Отримати консультацію від лікаря-тренера</button></div><h2 class="big-title aos-init" data-aos="fade-up" data-aos-delay="50">Питання та відповіді</h2><div class="questions-text aos-init" data-aos="fade-up" data-aos-delay="200">
Отримайте відповіді на поширені запитання про Linfopress Evolution PRO та про те, <br> як ця система може змінити вашу практику</div><ul class="faq-accordion">
<li class="faq-item aos-init" data-aos="fade-up" data-aos-delay="0"><div class="faq-question">
Чим Linfopress Evolution PRO відрізняється від традиційних систем пресотерапії? <span class="faq-icon"></span></div><div class="faq-answer"><p>Унікальною особливістю Linfopress Evolution PRO є куртка для верхньої частини тулуба, яка здійснює лімфомасаж не тільки рук але бочків (love handle), грудної ділянки і навіть холки!</p></div>
</li>
<li class="faq-item aos-init" data-aos="fade-up" data-aos-delay="100"><div class="faq-question">
Скільки процедур потрібно для досягнення результату? <span class="faq-icon"></span></div><div class="faq-answer"><p>Кількість процедур залежить від поставленої мети. Для зняття відчуття втоми в ногах достатньо однієї процедури. Для лікування едематозного целлюліту потрібний курс з 10 процедур 2-3 процедури на тиждень.</p></div>
</li>
<li class="faq-item aos-init" data-aos="fade-up" data-aos-delay="200"><div class="faq-question">
Чи є процедура болісною? <span class="faq-icon"></span></div><div class="faq-answer"><p>Процедура Linfopress Evolution PRO є супер-комфортною завдяки етапу підготовки тканини до лімфомасажу. Пацієнтки позитивно сприймають масаж зони холки і бочків, чого ніколи не відчували на інших апаратах.</p></div>
</li></ul></div></div>

<section class="seo_text _single_page aos-init" data-aos="fade-up" data-aos-delay="200"><div class="container"><div class="seo_text_content"><h2>Купити апарат для пресотерапії Linfopress Evolution PRO: інновації в лімфодренажі</h2><p>Якісний апаратний лімфодренажний масаж — це базова та необхідна процедура в будь-якій сучасній клініці естетичної медицини. Він посилює ефект від інших методик корекції фігури та є самостійним потужним терапевтичним інструментом. Linfopress Evolution PRO — це передове обладнання преміумкласу, створене для досягнення бездоганних результатів та забезпечення комфорту пацієнта.</p><p>Рішення купити апарат для пресотерапії Linfopress — це інвестиція у статус вашої клініки та лояльність клієнтів. Ця модель перевершує аналогічні системи на ринку завдяки унікальній технологічній базі та продуманій до дрібниць ергономіці.</p><h3>Біоміметична пульсація — новий стандарт терапії</h3><p>Ключова інновація, що відрізняє цей професійний апарат для пресотерапії, полягає у використанні технології біоміметичної послідовної пульсації. Ця система максимально точно імітує природні фізіологічні процеси організму.</p><p>Процедура на Linfopress Evolution PRO включає 4 послідовні етапи:</p><ul>
<li><strong>Розігрів:</strong> Ексклюзивний режим, який м’яко готує тканини до впливу. Цей етап є критично важливим, коли застосовується апарат для лікування целюліту фіброзної стадії, що потребує делікатного підходу.</li>
<li><strong>Активація:</strong> Стимуляція роботи лімфатичних вузлів і запуск обмінних процесів.</li>
<li><strong>Дренаж:</strong> Глибоке та інтенсивне виведення надлишкової міжклітинної рідини й накопичених токсинів.</li>
<li><strong>Розслаблення:</strong> Зняття м’язового спазму та досягнення глибокого релаксаційного ефекту.</li></ul><p>Завдяки такому дбайливому та фізіологічному підходу Linfopress Evolution PRO ідеально підходить для складних клінічних випадків, зокрема періоду, коли необхідна ефективна пресотерапія після ліпосакції та інших втручань.</p><h3>Ексклюзивні переваги для клініки</h3><p>Як сучасне обладнання для лімфодренажу, цей апарат розроблявся з урахуванням високих вимог фахівців щодо зручності роботи. Він пропонує унікальні можливості:</p><ul>
<li><strong>Масаж верхньої частини тулуба:</strong> Наявність спеціальної компресійної куртки дозволяє ефективно опрацьовувати зону «холки», спину, живіт і боки, що є безперечною конкурентною перевагою.</li>
<li><strong>Універсальність манжетів:</strong> Апарат оснащений якісними бандажами з 3 рівнями застібок-блискавок. Це гарантує ідеальну посадку для пацієнтів будь-якої комплекції без використання додаткових розширювачів.</li>
<li><strong>Оптимізація робочого часу:</strong> Інноваційна система швидкого одягання манжетів суттєво економить час фахівця між сеансами, збільшуючи пропускну здатність кабінету.</li></ul><p>Додайте до свого арсеналу передові технології для покращення мікроциркуляції. Запрошуємо вас оцінити всі можливості апарата на індивідуальній презентації.</p></div>
<button class="seo_text_btn" data-more="Читати далі" data-less="Приховати">
<span>Читати далі</span>
</button></div></section>

<style>@media only screen and (max-width: 991px){.template-linfopress .another-pages-banner{min-height:500px}}</style>
    `;

    // Replace inner content of linfopress page
    html = html.replace(/<div[\s\n]+class=center>[\s\S]*?(?=<footer|$)/i, `<div class="linfopress-main-page-wrapper">\n${modernLinfopressHtml}\n</div>\n`);
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

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
            <!-- 9. BECOME A PARTNER & PRESENTATION STAGE (ORIGINAL CONTENT + MAIN PAGE DESIGN SYSTEM) -->
      <section class="application-presentation zionic-partner-stage-section" id="test-drive">
        <div class="container">
          <div class="section-header-centered text-center" style="text-align: center !important; margin: 0 auto 44px auto !important;">
            <h2 class="section-main-title" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important;">Стати партнером TermoSalud</h2>
            <p class="section-main-sub" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important;">
              При замовленні апарата ZIONIC ви отримуєте професійне навчання, маркетинговий запуск та надійну сервісну підтримку
            </p>
          </div>

          <div class="presentation-stage-grid">
            <!-- Left Column: Real Zionic Photo + 5 Partnership Guarantees -->
            <div class="presentation-visual-col">
              <div class="presentation-photo-frame">
                <img src="/zionic_partner_presentation.png" class="presentation-showcase-img" alt="Апарат ZIONIC у клініці естетичної медицини">
                <div class="presentation-photo-overlay"></div>
                <div class="presentation-floating-tag">
                  <span class="live-pulse-dot"></span>
                  <span>Офіційний дистриб'ютор TermoSalud</span>
                </div>
              </div>
              
              <div class="partner-guarantees-stack">
                <h4 class="guarantees-head-title">Ми забезпечуємо надійне партнерство:</h4>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">01</span>
                  <div class="guarantee-text">
                    <strong>Прямі поставки від виробника</strong>
                    <span>Вся продукція сертифікована (CE Medical, ISO 13485) та поставляється напряму від TermoSalud Іспанія.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">02</span>
                  <div class="guarantee-text">
                    <strong>Безкоштовне навчання для лікарів</strong>
                    <span>Повний супровід запуску процедури, постановка руки та авторські протоколи від лікарів-методистів.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">03</span>
                  <div class="guarantee-text">
                    <strong>Готові рекламні матеріали</strong>
                    <span>Презентації, фото-відео контент, друковані та цифрові макети — усе для швидкого залучення пацієнтів.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">04</span>
                  <div class="guarantee-text">
                    <strong>Гарантія, сервіс та підмінний фонд</strong>
                    <span>Офіційний сервісний центр у Києві, технічна підтримка та оперативний ремонт без затримок.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">05</span>
                  <div class="guarantee-text">
                    <strong>Гнучкі фінансові умови</strong>
                    <span>Передоплата, безвідсоткове розтермінування або індивідуальні лізингові умови під ваш бізнес.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Open High-Converting Partnership Form -->
            <div class="presentation-form-col">
              <div class="presentation-form-card">
                <div class="form-card-header">
                  <span class="partner-card-kicker">ЗАЯВКА НА СПІВПРАЦЮ</span>
                  <h3 class="form-card-title">Заявка на презентацію ZIONIC</h3>
                  <p class="form-card-subtitle">
                    Заповніть форму, і наш спеціаліст надасть повний фінансовий розрахунок окупності та узгодить демонстрацію
                  </p>
                </div>

                <!-- Open Form Inputs (Verbatim from Screenshot 2) -->
                <form class="presentation-open-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш спеціаліст зв\'яжеться з вами найближчим часом.');">
                  <div class="form-group-item">
                    <label class="form-label-text" for="partner_name">Ваше ім'я та посада</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="partner_name" placeholder="Наприклад: Олена, керівник клініки" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="partner_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="partner_phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>
                    <div class="form-group-item">
                      <label class="form-label-text" for="partner_email">Email</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><polyline points="22,6 12,13 2,6" stroke-width="1.5"></polyline></svg>
                        <input type="email" id="partner_email" placeholder="clinic@example.com" required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text" for="partner_city">Місто та назва клініки</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><circle cx="12" cy="10" r="3" stroke-width="1.5"></circle></svg>
                      <input type="text" id="partner_city" placeholder="Київ, Клініка естетичної медицини" required class="luxury-form-input">
                    </div>
                  </div>

                  <!-- Messenger Selection -->
                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для зв'язку</label>
                    <div class="messenger-pills-row">
                      <label class="messenger-pill active">
                        <input type="radio" name="partner_messenger" value="WhatsApp" checked class="messenger-radio">
                        <span class="messenger-pill-dot dot-emerald"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="partner_messenger" value="Telegram" class="messenger-radio">
                        <span class="messenger-pill-dot dot-cyan"></span>
                        <span>Telegram</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="partner_messenger" value="Viber" class="messenger-radio">
                        <span class="messenger-pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="submit-presentation-btn">
                    <span>ЗАЯВКА НА ПРЕЗЕНТАЦІЮ</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>

                  <p class="form-privacy-note">
                    🔒 Натискаючи кнопку, ви даєте згоду на обробку персональних даних відповідно до політики конфіденційності TermoSalud Україна.
                  </p>
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

      <!-- 1. HERO & TICKER CURTAIN TRACK (SCREEN 2 SLIDES OVER SCREEN 1 ONLY) -->
      <div class="zionic-hero-curtain-track">
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
              <div class="zionic-hero-sublogo-tag">технологія Rollactive RF</div>
            </div>

            <h1 class="zionic-hero-title">
              <span class="zionic-word-top">НОВА ЕРА</span>
              <span class="zionic-word-bottom">КОРЕКЦІЇ ТІЛА</span>
            </h1>

            <p class="zionic-hero-desc">
              Комбінований монополярний RF з інтелектуальним ротаційний масажем під контролем інтелекту машини для ефективного, безпечного та комфортного моделювання тіла
            </p>

            <div class="zionic-hero-actions">
              <a href="#test-drive" class="zionic-primary-btn">
                <span>Записатись на тест драйв</span>
              </a>
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
                <p class="pillar-desc">Найглибший медичний монополярний RF у поєднанні з ротаційним масажем під контролем інтелекту машини</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-working_mom-1.svg" alt="Персоналізація процедури" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Персоналізація процедури</h4>
                <p class="pillar-desc">Інтелектуальний вибір індивідуальної програми пацієнта для автоматичного формування оптимальної терапевтичної дози</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-venus_de_milo-1.svg" alt="Ефективне лікування целюліту" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Ефективне лікування целюліту</h4>
                <p class="pillar-desc">Єдиний апарат, що ефективно працює з пацієнтами з едематозним фіброзним станом</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-waist-1.svg" alt="Приємне моделювання фігури" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Приємне моделювання фігури</h4>
                <p class="pillar-desc">Найкомфортніший серед усіх існуючих апаратів для корекції силуету завдяки контролю процедури інтелектом машини</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-trust-1.svg" alt="Відновлення після пластичних операцій" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Відновлення після пластичних операцій</h4>
                <p class="pillar-desc">Спеціалізовані програми реабілітації та підтяжки шкіри після ліпосакцій</p>
              </div>
            </div>

            <!-- SET 2 (DUPLICATE FOR SEAMLESS 100% INFINITE LOOP) -->
            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-highway_arrows-1.svg" alt="Максимальний ліфтинг" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Максимальний ліфтинг</h4>
                <p class="pillar-desc">Найглибший медичний монополярний RF у поєднанні з ротаційним масажем під контролем інтелекту машини</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-working_mom-1.svg" alt="Персоналізація процедури" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Персоналізація процедури</h4>
                <p class="pillar-desc">Інтелектуальний вибір індивідуальної програми пацієнта для автоматичного формування оптимальної терапевтичної дози</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-venus_de_milo-1.svg" alt="Ефективне лікування целюліту" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Ефективне лікування целюліту</h4>
                <p class="pillar-desc">Єдиний апарат, що ефективно працює з пацієнтами з едематозним фіброзним станом</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-waist-1.svg" alt="Приємне моделювання фігури" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Приємне моделювання фігури</h4>
                <p class="pillar-desc">Найкомфортніший серед усіх існуючих апаратів для корекції силуету завдяки контролю процедури інтелектом машини</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-trust-1.svg" alt="Відновлення після пластичних операцій" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Відновлення після пластичних операцій</h4>
                <p class="pillar-desc">Спеціалізовані програми реабілітації та підтяжки шкіри після ліпосакцій</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div><!-- /zionic-hero-curtain-track -->

      <!-- 3. TECHNOLOGIES BENTO SHOWCASE (MAIN PAGE STYLE) -->
      <section class="zionic-tech-bento-section" id="technologies">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Технології ZIONIC</h2>
            <p class="section-main-sub">
              Унікальність ZIONIC в тому, що вперше в одній платформі моделювання тіла об'єднані найглибша резистивна діатермія і ротаційний масаж, що змінює напрямок руху в залежності від руху лімфи під контролем інтелекту машини.
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
                  Глибока діатермія резистивного типу призводить до інтенсивної стимуляції клітин, розширення судин та підвищення внутрішньої температури, активуючи процеси природної регенерації організму.
                </p>
                <p class="tech-card-text">
                  Вона мобілізує електросигнали, що існують у м'яких тканинах у вигляді електролітів, посилює метаболізм, сприяє васкуляризації, ревіталізує гіпотрофічні тканини, покращує оксигенацію та циркуляторну активність.
                </p>
                <p class="tech-card-text">
                  Технологія ZIONIC походить з класичної медицини, де частота 470 кГц використовується для:
                </p>
                <ul class="tech-bullets-list">
                  <li><span class="bullet-check">•</span><span>Зняття больового синдрому</span></li>
                  <li><span class="bullet-check">•</span><span>Поліпшення діапазону рухів</span></li>
                  <li><span class="bullet-check">•</span><span>Прискорення регенерація тканин</span></li>
                  <li><span class="bullet-check">•</span><span>Післяопераційної реабілітації</span></li>
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
                <h3 class="tech-card-heading">Інтелектуальний ротаційний масаж</h3>
                <p class="tech-card-text">
                  Режими ротаційного масажу спеціально розроблені для потужного медичного лімфодренажа. Зміна напрямку обертання спрямовує рух лімфи.
                </p>
                <p class="tech-card-text">
                  Ротаційна механічна дія маніпули MARP створює глибокий лімфодренажний ефект, активуючи мікроциркуляцію та прискорюючи виведення міжклітинної рідини. Зміна напрямку обертання роликів сприяє відтоку лімфи у фізіологічному напрямку, зменшує набряклість і покращує трофіку тканин.
                </p>
                <p class="tech-card-text">
                  Синхронізація механічного масажу з монополярною RF-енергією підсилює проникнення тепла в дерму та підшкірну клітковину, що сприяє ремоделюванню колагену й еластину.
                </p>
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
            <h2 class="section-main-title">Клінічно підтверджені результати апарату ZIONIC</h2>
            <p class="section-main-sub">
              Візуальні зміни вже після перших процедур: покращення тонусу, чіткіший контур, зменшення ознак целюліту. Завдяки поєднанню RF-енергії та механічного ролика апарат діє глибоко, не травмуючи шкіру.
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
            <h2 class="section-main-title">Процедура ZIONIC</h2>
            <p class="section-main-sub">
              ZIONIC — новий рівень апаратного моделювання тіла з поєднанням глибокої діатермії та ротаційного масажу
            </p>
          </div>

          <div class="zionic-procedure-split-grid">
            <!-- LEFT COLUMN: EXPERT DOCTOR REVIEW & CLINICAL DESCRIPTION -->
            <div class="procedure-expert-text-card">
              <h3 class="procedure-card-title">О процедурі</h3>
              
              <div class="procedure-text-paragraphs">
                <p class="procedure-lead-p">
                  Я працюю з апаратом Zionic, і найчастіше до мене звертаються пацієнти зі схожими запитами: набряклість, нерівний рельєф шкіри, локальні жирові відкладення та відчуття «застою» в тілі. Уже після перших процедур люди відзначають легкість, зменшення об'ємів за рахунок виведення зайвої рідини та більш гладку шкіру.
                </p>
                <p>
                  Сама процедура поєднує глибокий механічний масаж і радіочастотний прогрів тканин. Завдяки цьому ми одночасно покращуємо лімфодренаж, посилюємо кровообіг і стимулюємо обмінні процеси в жировій тканині. Це дає не лише візуальний ефект, а й покращує загальний стан тканин.
                </p>
                <p>
                  Після курсу пацієнти виглядають більш підтягнутими: шкіра стає щільнішою, рельєф рівнішим, зменшуються прояви целюліту. Водночас важливо розуміти — найкращий і стійкий результат ми отримуємо, коли процедура поєднується з правильним харчуванням і фізичною активністю.
                </p>
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
            <!-- 6. 5 REASONS WHY ZIONIC IS BEST (FULLSCREEN INFOGRAPHIC) -->
      <section class="zionic-treatments-fullscreen-section" id="reasons-treatments">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <h2 class="section-main-title">5 причин чому Zionic кращий апарат для контурного моделювання тіла</h2>
            <p class="section-main-sub">
              ZIONIC поєднує RF-нагрів і глибоку стимуляцію для точної корекції фігури. Інтелектуальний контроль температури та адаптивна дія забезпечують зменшення жиру, підтягування тканин і покращення мікроциркуляції без болю та реабілітації.
            </p>
          </div>
        </div>

        <div class="treatments-infographic-viewport">
          <img src="/zionic_treatments_ukr.png" alt="5 векторів дії ZIONIC для контурингу тіла" loading="lazy">
        </div>
      </section>

            <!-- 7. CREATIVE CLINICAL INDICATIONS & CONTRAINDICATIONS MATRIX -->
      <section class="zionic-matrix-section" id="indications">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <h2 class="section-main-title"><span class="title-line-nowrap">Показання та</span> <span class="title-line-nowrap">протипоказання</span></h2>
            <p class="section-main-sub">
              Повний спектр терапевтичного застосування та медичні критерії безпеки пацієнта
            </p>
          </div>

          <div class="zionic-creative-matrix-grid exact-original-matrix">
            <!-- LEFT CARD: INDICATIONS -->
            <div class="matrix-creative-card indications-card exact-indications">
              <div class="matrix-card-header exact-card-header">
                <h3 class="matrix-main-head">Показання</h3>
              </div>

              <div class="matrix-items-stack exact-list-stack">
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Лікування целлюліту трьох стадій</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Локальне схуднення</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Прецизійне підтягування шкіри (ліфтинг)</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Підготовка до пластичної хірургії (ліпосакції)</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Пост-операційна реабілітація</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Детоксикація тканин</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Лімфодренаж</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Підготовка до фізичних навантажень</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Лікування DOMS (крепатури) після фізичних навантажень</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Реабілітація опорно-рухового апарату</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Регенерація зв’язкових тканин</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Покращення кровообігу</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Зняття спазму</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Загальна релаксація організму (SPA-Wellness програма)</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Психоемоційна реабілітація завдяки підвищенню м'язової активності</span>
                </div>
              </div>
            </div>

            <!-- RIGHT CARD: CONTRAINDICATIONS -->
            <div class="matrix-creative-card contraindications-card exact-contraindications">
              <div class="matrix-card-header exact-card-header">
                <h3 class="matrix-main-head">Протипоказання</h3>
              </div>

              <div class="matrix-items-stack exact-list-stack">
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Онкологія</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Порушення цілісності шкірного покриву у зоні проведення процедури</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Наявність металевих імплантів та стентів</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Епілепсія, порушення психіки</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Цукровий діабет, декомпенсована форма</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Аутоімунні захворювання</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Хронічні захворювання на стадії загострення</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Орві, грип</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Вагітність</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. ПЕРЕВАГИ ZIONIC (9 NINE ADVANTAGES WITH 3D APPARATUS) -->
      <section class="zionic-nine-advantages-section" id="advantages-grid">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <h2 class="section-main-title">Переваги Zionic</h2>
          </div>

          <div class="zionic-nine-grid-layout">
            <!-- LEFT: APPARATUS PHOTO -->
            <div class="zionic-nine-apparatus-col">
              <img src="/advantages-img-optimized.png" alt="Переваги Zionic - апарат" class="nine-apparatus-img" loading="lazy">
            </div>

            <!-- RIGHT: 9 NUMBERED CARDS (3x3) -->
            <div class="zionic-nine-cards-col">
              <div class="nine-cards-grid">
                <!-- 1 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">1</span>
                  <p class="advantage-nine-text">Перший в світі апарат, який комбінує найглибший медичний монополярний RF резистивного типу з інтелектуальним ротаційним масажем для максимально можливого моделювання тіла.</p>
                </div>
                <!-- 2 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">2</span>
                  <p class="advantage-nine-text">Інтелектуальна Система взаємодії з пацієнтом враховує температуру, тиск, передану енергію для формування оптимальної терапевтичної дози.</p>
                </div>
                <!-- 3 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">3</span>
                  <p class="advantage-nine-text">Підвищена безпека завдяки технології одночасного контролю температури і тиску в реальному часі під час процедури.</p>
                </div>
                <!-- 4 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">4</span>
                  <p class="advantage-nine-text">Єдиний апарат, який ефективно і без болю лікує великих пацієнтів з едематозним фіброзним целюлітом завдяки унікальній комбінації глибокого внутрішнього прогріву, який знімає больові відчуття, та активному ротаційному масажу.</p>
                </div>
                <!-- 5 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">5</span>
                  <p class="advantage-nine-text">Найкомфортніший з усіх апаратів для моделювання фігури, тому найпопулярніший у пацієнтів та рекомендований спеціалістами.</p>
                </div>
                <!-- 6 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">6</span>
                  <p class="advantage-nine-text">Ключовий елемент програм "Детокс", "Схуднення", "Антицелюліт" для відновлення балансу та тонусу тіла.</p>
                </div>
                <!-- 7 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">7</span>
                  <p class="advantage-nine-text">Використовується у спортивній медицині для розігріву м'язів перед тренуваннями і для регенерації зв'язкових тканин.</p>
                </div>
                <!-- 8 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">8</span>
                  <p class="advantage-nine-text">Використовується у пост-операційній реабілітації для зменшення відчуття стягнутості шкіри після операції, профілактики утворення фіброзу.</p>
                </div>
                <!-- 9 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">9</span>
                  <p class="advantage-nine-text">Найвигідніший з усіх апаратів для моделювання фігури завдяки високій рентабельності процедури. Окупність 9 місяців.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. PROCEDURE VIDEO BANNER -->
            <!-- 8. PROCEDURE VIDEO FULLSCREEN BANNER (EDGE-TO-EDGE) -->
            <!-- 8. PROCEDURE VIDEO FULLSCREEN BANNER (CIRCULAR PLAY ICON ONLY) -->
      <!-- 9. PROCEDURE VIDEO BANNER WITH HEADER -->
      <section class="zionic-video-presentation-section" id="procedure">
        <div class="container">
          <div class="section-header-centered text-center">
            <h2 class="section-main-title">Результати, яким довіряють професіонали</h2>
            <p class="section-main-sub">
              Пружна та підтягнута шкіра, зменшення целюліту та жирових відкладень, відчуття легкості та зменшення набряків, рівніший контур і виразніший тонус
            </p>
          </div>
        </div>
      </section>

      <section class="zionic-video-fullscreen-banner" id="procedure-banner" data-video-id="cqskAxvFlxY">
        <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" class="video-fullscreen-bg">
          <source src="/wp-content/uploads/2026/03/tratamiento_de_remodelaciun_corporal_zionic_online_video_cutter.mp4" type="video/mp4">
        </video>
        <div class="video-fullscreen-vignette"></div>

        <div class="video-fullscreen-center-box">
          <button type="button" class="lux-play-pure-circle-btn" data-video-id="cqskAxvFlxY" aria-label="Дивитись відео ZIONIC" onclick="window.openZionicVideoLightbox('cqskAxvFlxY')">
            <span class="pure-pulse-ring"></span>
            <span class="pure-pulse-ring-outer"></span>
            <div class="pure-circle-inner">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#111111"><polygon points="8 5 19 12 8 19 8 5"></polygon></svg>
            </div>
          </button>
        </div>
      </section>

      <!-- Zionic Video Modal Lightbox (for Hero button and direct popups) -->
      <div id="zionic_video_modal" class="zionic-video-lightbox" role="dialog" aria-modal="true" style="display:none;">
        <div class="zionic-video-lightbox-backdrop" data-close-video-modal onclick="window.closeZionicVideoLightbox()"></div>
        <div class="zionic-video-lightbox-dialog">
          <button type="button" class="zionic-video-lightbox-close" data-close-video-modal onclick="window.closeZionicVideoLightbox()" aria-label="Закрити">✕</button>
          <div id="zionic_modal_video_container" class="zionic-video-lightbox-frame"></div>
        </div>
      </div>

      <!-- 9. TEST-DRIVE APPLICATION FORM (EXACT LUXURY MAIN PAGE FORM) -->
            <!-- 9. TEST-DRIVE APPLICATION STAGE (EXACT LUXURY MAIN PAGE ARCHITECTURE) -->
            <!-- 9. BECOME A PARTNER & PRESENTATION STAGE (ORIGINAL CONTENT + MAIN PAGE DESIGN SYSTEM) -->
      <section class="application-presentation zionic-partner-stage-section exact-partner-section" id="test-drive">
        <div class="container">
          <div class="presentation-header text-center section-header-centered" style="text-align: center !important; margin: 0 auto 50px auto !important;">
            <h2 class="section-main-title exact-partner-title">Стати партнером</h2>
          </div>

          <div class="exact-partner-split-grid">
            <!-- Left Column: Form Card -->
            <div class="exact-partner-form-col">
              <div class="exact-partner-form-card">
                <p class="exact-partner-form-lead">
                  При замовленні апарата ZIONIC ви отримуєте професійне навчання від сертифікованих фахівців дистриб’ютора та провідних лікарів-косметологів. Програма охоплює як теоретичні основи, так і практичну роботу з апаратом, що дозволяє клінікам одразу впровадити процедури на найвищому рівні.
                </p>

                <form class="exact-partner-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш спеціаліст зв\'яжеться з вами найближчим часом.');">
                  <div class="exact-form-group">
                    <input type="text" placeholder="Ім'я" required class="exact-form-input">
                  </div>

                  <div class="exact-messengers-row">
                    <label class="exact-msg-label">
                      <input type="checkbox" name="exact_whatsapp" checked class="exact-msg-check">
                      <span>Whatsapp</span>
                    </label>
                    <label class="exact-msg-label">
                      <input type="checkbox" name="exact_viber" class="exact-msg-check">
                      <span>Viber</span>
                    </label>
                    <label class="exact-msg-label">
                      <input type="checkbox" name="exact_telegram" class="exact-msg-check">
                      <span>Telegram</span>
                    </label>
                  </div>

                  <div class="exact-form-group">
                    <input type="tel" placeholder="Телефон" required class="exact-form-input">
                  </div>

                  <div class="exact-form-group">
                    <input type="email" placeholder="Email" required class="exact-form-input">
                  </div>

                  <div class="exact-form-group">
                    <input type="text" placeholder="Місто" required class="exact-form-input">
                  </div>

                  <button type="submit" class="exact-form-submit-btn">
                    Заявка на презентацію
                  </button>
                </form>
              </div>
            </div>

            <!-- Right Column: 5 Partnership Blocks -->
            <div class="exact-partner-blocks-col">
              <h3 class="exact-blocks-header">Ми забезпечуємо надійне партнерство:</h3>

              <div class="exact-blocks-stack">
                <div class="exact-block-item">
                  <span class="exact-block-num">1</span>
                  <p class="exact-block-text">Вся продукція сертифікована та поставляється напряму від виробника.</p>
                </div>

                <div class="exact-block-item">
                  <span class="exact-block-num">2</span>
                  <p class="exact-block-text">Безкоштовне навчання для лікарів, повний супровід запуску процедури.</p>
                </div>

                <div class="exact-block-item">
                  <span class="exact-block-num">3</span>
                  <p class="exact-block-text">Готові рекламні матеріали, презентації, макети усе для швидкого старту.</p>
                </div>

                <div class="exact-block-item">
                  <span class="exact-block-num">4</span>
                  <p class="exact-block-text">Гарантія, технічна підтримка та оперативний ремонт без зайвої тяганини.</p>
                </div>

                <div class="exact-block-item">
                  <span class="exact-block-num">5</span>
                  <p class="exact-block-text">Передоплата, розтермінування або індивідуальні умови під ваш бізнес.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            <!-- 10. FAQ ACCORDION (MAIN PAGE LUXURY STYLE) -->
      <!-- 10. DOCTORS & EXPERT REVIEWS -->
      <section class="zionic-doctors-section" id="doctors">
        <div class="container">
          <div class="section-header-centered text-center">
            <h2 class="section-main-title">Лікарі довіряють ZIONIC у щоденній практиці</h2>
            <p class="section-main-sub">Косметологи, дерматологи та керівники клінік Європі вже обрали ZIONIC як надійний інструмент для моделювання тіла. Їхні відгуки це найкраще підтвердження ефективності.</p>
          </div>

          <div class="zionic-doctors-grid exact-doctors-grid">
            <!-- Doctor 1 -->
            <div class="doctor-luxury-card exact-doctor-card">
              <div class="doctor-photo-frame exact-doctor-photo">
                <img src="/wp-content/uploads/2026/03/doctor1-optimized.png" alt="Олена Стоянова" loading="lazy">
              </div>
              <div class="doctor-card-info exact-doctor-info">
                <h4 class="doctor-name exact-doc-name">Олена Стоянова</h4>
                <p class="doctor-clinic exact-doc-desc">
                  PhD<br>
                  Клініка Естетичної Медицини St. Esthetic,<br>
                  Київ
                </p>
              </div>
            </div>

            <!-- Doctor 2 -->
            <div class="doctor-luxury-card exact-doctor-card">
              <div class="doctor-photo-frame exact-doctor-photo">
                <img src="/wp-content/uploads/2026/03/doctor2-optimized.png" alt="Ганна Кривошеєва" loading="lazy">
              </div>
              <div class="doctor-card-info exact-doctor-info">
                <h4 class="doctor-name exact-doc-name">Ганна Кривошеєва</h4>
                <p class="doctor-clinic exact-doc-desc">
                  PhD<br>
                  MD Клініка апаратної косметології L'CLINIC,<br>
                  Київ
                </p>
              </div>
            </div>

            <!-- Doctor 3 -->
            <div class="doctor-luxury-card exact-doctor-card">
              <div class="doctor-photo-frame exact-doctor-photo">
                <img src="/wp-content/uploads/2026/03/doctor3-optimized.png" alt="Carmen Navarro" loading="lazy">
              </div>
              <div class="doctor-card-info exact-doctor-info">
                <h4 class="doctor-name exact-doc-name">Carmen Navarro</h4>
                <p class="doctor-clinic exact-doc-desc">
                  Легенда Естетичної Медицини Іспанії<br>
                  Клініка Carmen Navarro Sagasta, Мадрид
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. FAQ ACCORDION -->
      <!-- 11. FAQ ACCORDION -->
      <section class="zionic-faq-section exact-zionic-faq" id="faq">
        <div class="container">
          <div class="section-header-centered text-center" style="margin-bottom: 44px;">
            <h2 class="section-main-title">Питання та відповіді</h2>
            <p class="section-main-sub" style="max-width: 800px; margin: 0 auto; line-height: 1.55;">
              Отримайте відповіді на поширені запитання про Zionic та про те,<br>як ця система може змінити вашу практику
            </p>
          </div>

          <div class="exact-faq-accordion-list">
            <!-- Q1 -->
            <div class="exact-faq-item active">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Скільки процедур потрібно для видимого результату?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content" style="display: block;">
                <p class="exact-faq-answer">Виробник рекомендує не менше чотирьох процедур. Бажаний курс включає 6 – 10 процедур в залежності від поставлених задач.</p>
              </div>
            </div>

            <!-- Q2 -->
            <div class="exact-faq-item">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Чи комфортна процедура і які відчуття підчас неї?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content">
                <p class="exact-faq-answer">Найкомфортніша процедура апаратного масажу. Відчуття приємні. Лагідне тепло народжується всередині м'яких тканин, розслабляючи м'язи.</p>
              </div>
            </div>

            <!-- Q3 -->
            <div class="exact-faq-item">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Чи потрібен час на відновлення після сеансу?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content">
                <p class="exact-faq-answer">Ні.</p>
              </div>
            </div>

            <!-- Q4 -->
            <div class="exact-faq-item">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Для яких зон тіла найчастіше застосовується ZIONIC?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content">
                <p class="exact-faq-answer">Призначений для лікування фіброзного целюліта, тобто в основному для стегон і сідниць, ZIONIC користується великим попитом для масажу спини і шийно-плечового сегменту, тому що дуже приємний.</p>
              </div>
            </div>

            <!-- Q5 -->
            <div class="exact-faq-item">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Чим ZIONIC відрізняється від інших косметологічних рішень?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content">
                <p class="exact-faq-answer">Єдина система, яка об'єднує глибокий діатермічний прогрів резистивного типу і ротаційний масаж з регулюванням обертів по ходу лімфатичної рідини.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 12. DOCUMENTS & CERTIFICATES WITH FULLSCREEN LIGHTBOX -->
      <section class="zionic-certificates-section" id="certificates">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Документи та сертифікати</h2>
            <p class="section-main-sub">Офіційне підтвердження безпеки, відповідності міжнародним стандартам якості та реєстрація в МОЗ України</p>
          </div>

          <div class="zionic-cert-scans-grid">
            <!-- Cert 1: Ukraine -->
            <div class="cert-scan-card" onclick="openCertLightbox('/zionic_cert_ukraine.png', 'Сертифікат відповідності МОЗ України / ПолітехМед (UA.TR.101)')">
              <div class="cert-scan-frame">
                <img src="/zionic_cert_ukraine.png" alt="Сертифікат відповідності МОЗ України" loading="lazy">
                <div class="cert-zoom-overlay">
                  <span class="cert-zoom-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  </span>
                  <span class="cert-zoom-text">Натисніть для збільшення</span>
                </div>
              </div>
              <div class="cert-scan-info">
                <div class="cert-scan-badge">UA.TR.101 • МОЗ України</div>
                <h4 class="cert-scan-title">Сертифікат відповідності (ПолітехМед)</h4>
                <p class="cert-scan-desc">Державна реєстрація медичного виробу ZIONIC AESTHETIC в Україні. Повна відповідність Технічному регламенту.</p>
              </div>
            </div>

            <!-- Cert 2: FDA / International -->
            <div class="cert-scan-card" onclick="openCertLightbox('/zionic_cert_fda.png', 'Declaration of Conformity FDA (USA & CE 0120)')">
              <div class="cert-scan-frame">
                <img src="/zionic_cert_fda.png" alt="Declaration of Conformity FDA" loading="lazy">
                <div class="cert-zoom-overlay">
                  <span class="cert-zoom-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  </span>
                  <span class="cert-zoom-text">Натисніть для збільшення</span>
                </div>
              </div>
              <div class="cert-scan-info">
                <div class="cert-scan-badge">FDA 510(k) • CE Medical</div>
                <h4 class="cert-scan-title">Declaration of Conformity FDA (USA)</h4>
                <p class="cert-scan-desc">Офіційне схвалення FDA США та міжнародні сертифікати безпеки IEC 60601-1, ISO 10993-1, ISO 13485:2016.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 13. MODERN SEO CLEAN ARTICLE SECTION -->
      <section class="zionic-seo-clean-section" id="seo-article">
        <div class="container">
          <div class="seo-article-card">
            <h2 class="seo-article-main-title" style="text-transform: none !important;">Купити апарат Zionic — інвестувати в передове обладнання для корекції фігури</h2>
            
            <p>У сучасній естетичній медицині найбільший попит мають неінвазивні методики, що поєднують високу результативність, безболісність та відсутність періоду реабілітації. Рішення купити апарат Zionic відкриває для вашої клініки можливість запропонувати пацієнтам саме такі процедури. Це інноваційне обладнання для корекції фігури забезпечує комплексний підхід до моделювання контурів тіла.</p>

            <p>Унікальна концепція апарата дозволяє фахівцям ефективно працювати з локальними жировими відкладеннями, атонією шкіри та всіма формами целюліту, досягаючи стійких і помітних результатів уже після перших сеансів.</p>

            <div class="seo-expandable-content" id="seoExpandableContent">
              <h3 class="seo-article-sub-title">Технологія Rollactive RF: синергія для ідеального результату</h3>
              <p>Секрет найвищої ефективності ZIONIC полягає у використанні запатентованої технології Rollactive RF. В одній ергономічній маніпулі об'єднані два найпотужніші фактори, які взаємно посилюють дію один одного:</p>
              
              <ul class="seo-article-bullets">
                <li><strong>Монополярний RF для тіла:</strong> Глибока резистивна діатермія проникає у тканини, забезпечуючи термічний вплив. Він стимулює вироблення колагену, забезпечуючи потужну підтяжку в'ялої шкіри та підвищення її тургору.</li>
                <li><strong>Інтелектуальний ротаційний масаж:</strong> Інтенсивний механічний вплив активізує кровообіг та клітинний метаболізм. За глибиною та інтенсивністю опрацювання це перевершує стандартний апаратний масаж для схуднення.</li>
              </ul>

              <p>Така синергія робить ZIONIC незамінним інструментом, коли потрібне успішне лікування фіброзного целюліту. Апарат розм'якшує щільні тканини й забезпечує глибокий медичний лімфодренаж, усуваючи застійні явища.</p>

              <h3 class="seo-article-sub-title">Рентабельність та абсолютна безпека</h3>
              <p>Обираючи цей передовий ротаційний масаж апарат, керівники клінік отримують надійний інструмент для стабільного збільшення прибутку. Ефективність процедур гарантує високе повернення пацієнтів.</p>

              <ul class="seo-article-bullets">
                <li><strong>Швидка окупність:</strong> Висока маржинальність процедур на апараті ZIONIC забезпечує відмінні показники рентабельності. Середній термін повернення інвестицій для клініки становить від 9 місяців.</li>
                <li><strong>Інтелектуальний контроль:</strong> Інтегрована система контролю температури та тиску гарантує безпеку пацієнта, виключаючи ризики дискомфорту або перегріву тканин.</li>
              </ul>

              <p>Потужний апарат для RF ліфтингу тіла ZIONIC стане візитною карткою вашої клініки. Розширте спектр преміальних послуг разом із передовими технологіями. Запишіться на тест-драйв, щоб особисто переконатися в унікальних можливостях обладнання.</p>
            </div>

            <button type="button" class="seo-toggle-btn" id="seoToggleBtn" onclick="toggleZionicSeoArticle()">
              <span class="seo-btn-label">Читати далі</span>
              <span class="seo-btn-arrow">∨</span>
            </button>
          </div>
        </div>
      </section>

    `;

    // Replace the inner content of zionic page
    html = html.replace(/<div[\s\n]+class=center>[\s\S]*?(?=<footer|$)/i, `<div class="zionic-main-page-wrapper">\n${modernZionicHtml}\n</div>\n`);
  }

  if (pageName === 'linfopress') {
    const modernLinfopressHtml = `
      <!-- ==========================================================================
           1. HERO STAGE (OFFICIAL BLACK LUXURY VIDEO HERO)
           ========================================================================== -->
      <section class="linfopress-hero-stage" id="hero">
        <div class="linfopress-hero-media-wrapper">
          <video autoplay loop muted playsinline class="linfopress-hero-video-bg" preload="auto" poster="/photo_limfo.png">
            <source src="/limfo.mp4" type="video/mp4">
          </video>
          <div class="linfopress-hero-overlay"></div>
        </div>

        <div class="container linfopress-hero-container">
          <div class="linfopress-hero-content-box">
            
            <div class="linfopress-hero-logo-wrap">
              <img src="/LINFOPRESS-PRO-1.png" alt="Linfopress Evolution Pro" class="linfopress-official-logo" width="220" height="48" loading="eager">
            </div>

            <h1 class="linfopress-official-hero-title">
              <span class="hero-word-primary">ТОЧНІСТЬ</span>
              <span class="hero-word-secondary">КОМФОРТ</span>
            </h1>

            <p class="linfopress-hero-desc">
              ПРЕСОТЕРАПІЯ З НАЙБІЛЬШИМ РОЗМІРНИМ РЯДОМ НА РИНКУ
            </p>

            <div class="linfopress-hero-actions">
              <a href="#application-form" class="linfopress-primary-btn">
                <span>ЗАМОВИТИ ТЕСТ-ДРАЙВ У КЛІНІКУ</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button type="button" class="linfopress-secondary-btn" id="open-linfopress-video-btn" onclick="window.openLinfopressVideoLightbox('K1v77enueJ8')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>ВІДЕО-ДЕМОНСТРАЦІЯ</span>
              </button>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           2. INFINITE MOVING LUXURY ADVANTAGES TICKER (1-TO-1 MATCH WITH ZIONIC)
           ========================================================================== -->
      <section class="linfopress-infinite-ticker-section zionic-infinite-ticker-section" id="advantages-icons">
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
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/1-1.svg" alt="Нове покоління" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Нове покоління</h4>
                <p class="pillar-desc">Нове покоління комбінаторної пресотерапії</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/2-1.svg" alt="Для всіх розмірів" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Для всіх розмірів</h4>
                <p class="pillar-desc">Три рівні блискавок для пацієнтів всіх розмірів</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/3-1.svg" alt="4 етапи" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">4 етапи</h4>
                <p class="pillar-desc">Чотири етапи пульсуючої пневматичної компресії</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/4-1.svg" alt="10 програм" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">10 програм</h4>
                <p class="pillar-desc">Десять програм послідовної біоміметичної пульсації</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/5-1.svg" alt="Унікальність" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Унікальність</h4>
                <p class="pillar-desc">Тільки в Linfopress: пресомасаж холки і love-handles</p>
              </div>
            </div>

            <!-- SET 2 (DUPLICATE FOR SEAMLESS 100% INFINITE LOOP) -->
            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/1-1.svg" alt="Нове покоління" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Нове покоління</h4>
                <p class="pillar-desc">Нове покоління комбінаторної пресотерапії</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/2-1.svg" alt="Для всіх розмірів" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Для всіх розмірів</h4>
                <p class="pillar-desc">Три рівні блискавок для пацієнтів всіх розмірів</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/3-1.svg" alt="4 етапи" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">4 етапи</h4>
                <p class="pillar-desc">Чотири етапи пульсуючої пневматичної компресії</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/4-1.svg" alt="10 програм" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">10 програм</h4>
                <p class="pillar-desc">Десять програм послідовної біоміметичної пульсації</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box">
                <img src="/wp-content/uploads/2026/03/5-1.svg" alt="Унікальність" width="48" height="48">
              </div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Унікальність</h4>
                <p class="pillar-desc">Тільки в Linfopress: пресомасаж холки і love-handles</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           3. TECHNOLOGIES (4 OBSIDIAN BENTO CARDS WITH GRAPHITE BORDERS)
           ========================================================================== -->
      <section class="linfopress-tech-bento-section" id="technologies">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Технології Linfopress Evolution PRO</h2>
            <p class="section-main-sub">
              Вперше технологія біоміметичної послідовної пульсації втілена в найкращий в світі апарат для пресотерапії
            </p>
          </div>

          <div class="linfopress-tech-grid">
            <!-- TECH CARD 1 -->
            <div class="linfopress-tech-card" onclick="window.openLinfopressTechModal(1)">
              <div class="tech-media-box">
                <video autoplay loop muted playsinline preload="auto" poster="/wp-content/uploads/2026/03/1-preview-optimized.png">
                  <source src="/wp-content/uploads/2026/03/1.mp4" type="video/mp4">
                </video>
                <span class="tech-stage-badge">ФАЗА 01</span>
              </div>
              <div class="tech-card-body">
                <h3 class="tech-card-heading">Стадія розігріву</h3>
                <ul class="tech-card-list">
                  <li><span class="bullet-check">✓</span> Ніжно розтягує тканини і судини, готуючи ділянки для інтенсивного пресомасажу.</li>
                  <li><span class="bullet-check">✓</span> Ідеально підходить для лікування фіброзного целюліту, коли пацієнтки є особливо чутливими.</li>
                </ul>
                <div class="tech-card-cta">
                  <span>Дізнатись подробиці</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>

            <!-- TECH CARD 2 -->
            <div class="linfopress-tech-card" onclick="window.openLinfopressTechModal(2)">
              <div class="tech-media-box">
                <video autoplay loop muted playsinline preload="auto" poster="/wp-content/uploads/2026/03/2-preview-1-optimized.png">
                  <source src="/wp-content/uploads/2026/03/2-1.mp4" type="video/mp4">
                </video>
                <span class="tech-stage-badge">ФАЗА 02</span>
              </div>
              <div class="tech-card-body">
                <h3 class="tech-card-heading">Хвиля</h3>
                <ul class="tech-card-list">
                  <li><span class="bullet-check">✓</span> Послідовне стискання і розтискання 24-ох високоякісних манжет від дистальних ділянок до проксимальних.</li>
                  <li><span class="bullet-check">✓</span> Тривалий масаж, спрямовує рідини з периферичних ділянок до центру тіла. Підходить для лікування целюліту та релаксації.</li>
                </ul>
                <div class="tech-card-cta">
                  <span>Дізнатись подробиці</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>

            <!-- TECH CARD 3 -->
            <div class="linfopress-tech-card" onclick="window.openLinfopressTechModal(3)">
              <div class="tech-media-box">
                <video autoplay loop muted playsinline preload="auto" poster="/wp-content/uploads/2026/04/limfonew-optimized.jpg">
                  <source src="/wp-content/uploads/2026/04/limfonew2.mp4" type="video/mp4">
                </video>
                <span class="tech-stage-badge">ФАЗА 03</span>
              </div>
              <div class="tech-card-body">
                <h3 class="tech-card-heading">Лімфодренаж</h3>
                <ul class="tech-card-list">
                  <li><span class="bullet-check">✓</span> Найглибший, найінтенсивніший з можливих (контрольований тиск до 80 мм Hg).</li>
                  <li><span class="bullet-check">✓</span> Тиск у 24-ох камерах зменшується, коли хвиля наближається до проксимальної цільової області.</li>
                </ul>
                <div class="tech-card-cta">
                  <span>Дізнатись подробиці</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>

            <!-- TECH CARD 4 -->
            <div class="linfopress-tech-card" onclick="window.openLinfopressTechModal(4)">
              <div class="tech-media-box">
                <img src="/wp-content/uploads/2026/03/4-preview-1-optimized.png" alt="Релаксація" style="width: 100%; height: 100%; object-fit: cover; display: block;">
                <span class="tech-stage-badge">ФАЗА 04</span>
              </div>
              <div class="tech-card-body">
                <h3 class="tech-card-heading">Релаксація</h3>
                <ul class="tech-card-list">
                  <li><span class="bullet-check">✓</span> Заспокоює м’язи і тканини після інтенсивної роботи, відновлюючи тонус.</li>
                  <li><span class="bullet-check">✓</span> Ідеально для завершального лікування целюліту, синдрому втомлених ніг, після ліпосакції та вагітності.</li>
                </ul>
                <div class="tech-card-cta">
                  <span>Дізнатись подробиці</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           MODALS FOR 4 PHASES (PREMIUM BLUR-IN LIGHTBOX)
           ========================================================================== -->
      <div id="linfopress-tech-modal-overlay" class="linfopress-modal-backdrop" onclick="window.closeLinfopressTechModal(event)">
        <div class="linfopress-modal-dialog" onclick="event.stopPropagation()">
          <button type="button" class="linfopress-modal-close-btn" onclick="window.closeLinfopressTechModal()">✕</button>
          
          <div id="lp-modal-tab-1" class="lp-modal-tab-content">
            <div class="modal-video-wrapper">
              <video controls playsinline class="modal-inner-video" poster="/wp-content/uploads/2026/03/1-preview-optimized.png">
                <source src="/wp-content/uploads/2026/03/1.mp4" type="video/mp4">
              </video>
            </div>
            <div class="modal-text-content">
              <h3 class="modal-title">Стадія розігріву</h3>
              <p class="modal-desc">Стадія розігріву – це унікальна особливість апарату для пресотерапії Linfopress Evolution PRO. Її додали в кожну програму на запит досвідчених лікарів, які вважають, що тканини потрібно делікатно підготувати до компресії.</p>
              <p class="modal-desc">Linfopress Evolution PRO автоматично задає стадію розігріву, що ніжно розтягує тканини і судини, готуючи ділянки для інтенсивного пресомасажу. Ідеально підходить для лікування фіброзного целюліту, коли пацієнтки є особливо чутливими.</p>
            </div>
          </div>

          <div id="lp-modal-tab-2" class="lp-modal-tab-content" style="display:none;">
            <div class="modal-video-wrapper">
              <video controls playsinline class="modal-inner-video" poster="/wp-content/uploads/2026/03/2-preview-1-optimized.png">
                <source src="/wp-content/uploads/2026/03/2-1.mp4" type="video/mp4">
              </video>
            </div>
            <div class="modal-text-content">
              <h3 class="modal-title">Хвиля</h3>
              <p class="modal-desc">Цей цикл багаторазово застосовує компресивний масаж починаючи від дистальних зон до центру тіла. Така послідовність надування/здування забезпечує постійний масаж, що переміщує рідини з дистальних зон до центру тіла, сприяючи поверненню рідин і їх реабсорбції.</p>
              <p class="modal-desc">Цикл в камерах змінюється поступово: коли попередня камера здувається, наступна надувається. Масажний ефект підходить для усунення целюліту, спортивного масажу, підготовки до ліпосакції та релаксації м’язів.</p>
            </div>
          </div>

          <div id="lp-modal-tab-3" class="lp-modal-tab-content" style="display:none;">
            <div class="modal-video-wrapper">
              <video controls playsinline class="modal-inner-video" poster="/wp-content/uploads/2026/04/limfonew-optimized.jpg">
                <source src="/wp-content/uploads/2026/04/limfonew2.mp4" type="video/mp4">
              </video>
            </div>
            <div class="modal-text-content">
              <h3 class="modal-title">Лімфодренаж</h3>
              <p class="modal-desc">У цій стадії застосовуються фази планомірного стискання в напрямку від дистальних до проксимальних зон. Лімфодренаж в Linfopress Evolution PRO найглибший та найінтенсивніший з можливих — тиск досягає 80 мм Hg.</p>
              <p class="modal-desc">Завдяки стадії розігріву і грамотно підібраним циклам стискань процедура сприймається пацієнтками абсолютно толерантно та безболісно.</p>
            </div>
          </div>

          <div id="lp-modal-tab-4" class="lp-modal-tab-content" style="display:none;">
            <div class="modal-video-wrapper">
              <img src="/wp-content/uploads/2026/03/4-preview-1-optimized.png" alt="Релаксація" class="modal-inner-video" style="width: 100%; height: auto; max-height: 420px; object-fit: cover; display: block; border-radius: 0px;">
            </div>
            <div class="modal-text-content">
              <h3 class="modal-title">Релаксація</h3>
              <p class="modal-desc">Найпопулярніший етап процедури пресотерапії. Пацієнтки із вдячністю сприймають зменшення тиску і ритмічні заспокійливі хвилі, відчуваючи преміальний рівень процедури.</p>
              <p class="modal-desc">Релаксація заспокоює м’язи і тканини після інтенсивної роботи, ідеально підходить для завершення лікування целюліту, синдрому втомлених ніг, реабілітації після ліпосакції та вагітності.</p>
            </div>
          </div>
        </div>
      </div>


      <!-- ==========================================================================
           4. VIDEO PROCEDURE DEMONSTRATION SECTION (#procedure) - 100% FULL WIDTH
           ========================================================================== -->
      <section class="linfopress-procedure-section" id="procedure">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Процедура Linfopress Evolution PRO</h2>
            <p class="section-main-sub">
              Повний цикл роботи апарату: від одягання ергономічних манжетів до терапевтичного лімфодренажу
            </p>
          </div>
        </div>

        <!-- 100% FULL-WIDTH CINEMA SCREEN -->
        <div class="linfopress-procedure-fullwidth-wrap">
          <div class="cinema-media-wrap js-procedure-video-trigger" id="linfopress-procedure-player-trigger" onclick="window.playLinfopressProcedureVideo(this)">
            <video autoplay loop muted playsinline preload="auto" class="cinema-bg-video" id="procedure-preview-video">
              <source src="/wp-content/uploads/2026/03/termosalud_vid.mp4" type="video/mp4">
            </video>
            <div class="cinema-play-overlay" id="procedure-play-overlay">
              <div class="cinema-play-button">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <span class="cinema-play-text">ДИВИТИСЬ ВІДЕО-ПРЕЗЕНТАЦІЮ</span>
            </div>
            <div class="cinema-iframe-holder" id="procedure-iframe-holder"></div>
          </div>
        </div>
      </section>

      <!-- Linfopress Video Modal Lightbox (for Hero button and direct popups) -->
      <div id="linfopress_video_modal" class="zionic-video-lightbox" role="dialog" aria-modal="true" style="display:none;">
        <div class="zionic-video-lightbox-backdrop" data-close-video-modal onclick="window.closeLinfopressVideoLightbox()"></div>
        <div class="zionic-video-lightbox-dialog">
          <button type="button" class="zionic-video-lightbox-close" data-close-video-modal onclick="window.closeLinfopressVideoLightbox()" aria-label="Закрити">✕</button>
          <div id="linfopress_modal_video_container" class="zionic-video-lightbox-frame"></div>
        </div>
      </div>


      <!-- ==========================================================================
           5. KEY ADVANTAGES 9-ITEM MATRIX (#advantages)
           ========================================================================== -->
      <section class="linfopress-advantages-grid-section" id="advantages">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Переваги Linfopress Evolution PRO</h2>
            <p class="section-main-sub">
              9 ключових технологічних переваг, що роблять Linfopress лідером на ринку медичної пресотерапії
            </p>
          </div>

          <div class="linfopress-advantages-row">
            <div class="linfopress-advantages-col-list">
              <div class="adv-item-card">
                <span class="adv-index">01</span>
                <p class="adv-text">Перший у світі апарат для пресотерапії з масажем ділянок холки та боків (love-handles)</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">02</span>
                <p class="adv-text">Нове покоління інтелектуальної пресотерапії: технологія біоміметичної послідовної пульсації</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">03</span>
                <p class="adv-text">Підвищена безпека завдяки автоматичному контролю тиску в кожній окремій манжеті</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">04</span>
                <p class="adv-text">Найзручніший у роботі: бандажі для ніг і рук мають 3 рівні застібок-блискавок для будь-якої комплекції</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">05</span>
                <p class="adv-text">Найкомфортніший для пацієнта завдяки обов'язковим етапам розігріву і релаксації</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">06</span>
                <p class="adv-text">Ключовий елемент клінічних програм «Детокс», «Схуднення» та «Антицелюліт»</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">07</span>
                <p class="adv-text">Широко використовується у спортивній медицині (розігрів перед тренуваннями, швидке зняття крепатури)</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">08</span>
                <p class="adv-text">Незамінний у післяопераційній реабілітації для усунення застійних набряків та фіброзу</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">09</span>
                <p class="adv-text">Найвища якість матеріалів виконання європейського виробництва (апарат класу преміум)</p>
              </div>
            </div>

            <div class="linfopress-advantages-col-media">
              <div class="adv-media-sticky-box">
                <img src="/wp-content/uploads/2026/03/abr-img-optimized.png" alt="Переваги Linfopress Evolution PRO" class="adv-product-photo" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           6. INDICATIONS & CONTRAINDICATIONS (SIGNATURE FOOTER GRAY #54595f BACKGROUND)
           ========================================================================== -->
      <section class="linfopress-matrix-section" id="indications">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title"><span class="title-line-nowrap">Показання та</span> <span class="title-line-nowrap">протипоказання</span></h2>
            <p class="section-main-sub">
              Повний спектр терапевтичного застосування та медичні критерії безпеки пацієнта
            </p>
          </div>

          <div class="linfopress-creative-matrix-grid">
            <!-- LEFT CARD: INDICATIONS -->
            <div class="matrix-creative-card indications-card">
              <div class="matrix-card-header">
                <h3 class="matrix-main-head">Клінічні показання</h3>
                <p class="matrix-sub-head">8 ключових терапевтичних напрямків апарату Linfopress</p>
              </div>

              <div class="matrix-items-stack">
                <div class="matrix-item-row">
                  <span class="item-index">01</span>
                  <div class="item-content">
                    <h4 class="item-title">Лікування едематозного целюліту</h4>
                    <p class="item-desc">Усунення застою рідини у підшкірно-жировій клітковині та розгладження рельєфу шкіри.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">02</span>
                  <div class="item-content">
                    <h4 class="item-title">Зменшення затримки рідини та набряків</h4>
                    <p class="item-desc">Потужне виведення токсинів та відновлення нормального лімфотоку по всьому тілу.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">03</span>
                  <div class="item-content">
                    <h4 class="item-title">Підготовка та реабілітація після ліпосакції</h4>
                    <p class="item-desc">Профілактика нерівностей, рубцювання та прискорення реабілітаційного періоду.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">04</span>
                  <div class="item-content">
                    <h4 class="item-title">Пост-операційна реабілітація</h4>
                    <p class="item-desc">Відновлення мікроциркуляції після оперативних втручань та мастектомії.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">05</span>
                  <div class="item-content">
                    <h4 class="item-title">Детоксикація тканин та загальний лімфодренаж</h4>
                    <p class="item-desc">Активація обмінних процесів організму та глибоке очищення лімфатичної системи.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">06</span>
                  <div class="item-content">
                    <h4 class="item-title">Спортивна медицина та зняття крепатури</h4>
                    <p class="item-desc">Зняття міофасціального гіпертонусу (DOMS), розігрів перед тренуваннями та регенерація зв'язок.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">07</span>
                  <div class="item-content">
                    <h4 class="item-title">Покращення кровообігу та зняття втоми ніг</h4>
                    <p class="item-desc">Усунення синдрому «важких ніг» та профілактика хронічної венозної недостатності.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">08</span>
                  <div class="item-content">
                    <h4 class="item-title">Післяпологове відновлення</h4>
                    <p class="item-desc">Швидка нормалізація водно-сольового балансу та зняття набряків після пологів.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT CARD: CONTRAINDICATIONS -->
            <div class="matrix-creative-card contraindications-card">
              <div class="matrix-card-header">
                <h3 class="matrix-main-head">Протипоказання</h3>
                <p class="matrix-sub-head">Медичні протоколи безпеки пацієнта CE Medical</p>
              </div>

              <div class="matrix-items-stack">
                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Онкологічні захворювання</h4>
                    <p class="item-desc">Злоякісні пухлини в анамнезі або активній фазі.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Порушення цілісності шкірного покриву</h4>
                    <p class="item-desc">Відкриті рани, опіки, виразки або інфекційні дерматити в зоні манжетів.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Тромбофлебіт та гострий тромбоз</h4>
                    <p class="item-desc">Запалення вен або ризик відриву тромбів у судинній системі.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Важка серцева недостатність</h4>
                    <p class="item-desc">Декомпенсовані патології серцево-судинної системи та наявність кардіостимулятора.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Цукровий діабет (декомпенсована форма)</h4>
                    <p class="item-desc">Важкі порушення трофіки тканин та периферичної чутливості.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Гострі інфекційні стани та лихоманка</h4>
                    <p class="item-desc">ГРВІ, грип, підвищена температура тіла та запальні процеси.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Епілепсія та розлади ЦНС</h4>
                    <p class="item-desc">Стани підвищеної судомної готовності та гострі нервові розлади.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           7. DOCTORS TRUST & CLINICAL REVIEW (FULL-WIDTH CINEMATIC SHOWCASE)
           ========================================================================== -->
      <section class="linfopress-doctor-section" id="reviews">
        <div class="container doctor-header-container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Досвід лікарів</h2>
            <p class="section-main-sub">
              Практичний клінічний досвід використання Linfopress у провідних медичних та SPA-центрах України
            </p>
          </div>
        </div>

        <!-- 100% FULLSCREEN EDGE-TO-EDGE SHOWCASE STAGE -->
        <div class="linfopress-doctor-fullscreen-stage">
          <div class="doctor-bg-media-wrap">
            <img src="/linfopress-doctor-review-bg.jpg" alt="Процедура на апараті Linfopress Evolution PRO" class="doctor-bg-img" loading="lazy">
            <div class="doctor-bg-gradient-overlay"></div>
          </div>

          <div class="doctor-fullscreen-container">
            <div class="doctor-fullscreen-content">
              <h3 class="doctor-statement-title">
                «Linfopress Evolution PRO — це новий стандарт у пресотерапії, який перевершив усі мої очікування як лікаря»
              </h3>

              <p class="doctor-statement-desc">
                Працюючи в сфері естетичної медицини та реабілітації багато років, я мала справу з різними апаратами. Але коли в нашій клініці з’явився Linfopress Evolution PRO, це повністю змінило підхід до процедури. З точки зору фахівця, апарат неймовірно зручний: одягання манжет більше не забирає багато часу, а завдяки 3 рядам блискавок штани ідеально адаптуються під пацієнтів будь-якого зросту від 1,5 до 2 метрів. Головна перевага — технологія біоміметичної послідовної пульсації та стадія розігріву, що дозволяє працювати абсолютно безболісно навіть із чутливим фіброзним целюлітом.
              </p>

              <div class="doctor-author-profile">
                <div class="doctor-author-info">
                  <h4 class="doctor-author-name">Гуцул Оксана Миколаївна</h4>
                  <p class="doctor-author-title">Головний лікар Arden Palace Medical Resort & SPA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           8. WHY LINFOPRESS & EQUIPMENT PACKAGE (#why)
           ========================================================================== -->
      <section class="linfopress-why-section" id="why">
        <div class="why-this-video-bg">
          <video autoplay muted loop playsinline class="why-bg-video">
            <source src="/wp-content/themes/zionic/assets/images/why-this-video.mp4" type="video/mp4">
          </video>
          <div class="why-video-overlay"></div>
        </div>

        <div class="container why-inner-container">
          <h2 class="why-main-title">Чому саме Linfopress Evolution PRO</h2>

          <div class="why-showcase-row">
            <!-- LEFT: GIRL MODEL ON WHITE STEPS -->
            <div class="why-model-col">
              <div class="why-model-img-wrap">
                <img src="/wp-content/uploads/2026/03/why-this-img-optimized.png" alt="Чому саме Linfopress Evolution PRO - фото" class="why-model-img" loading="lazy">
              </div>
            </div>

            <!-- RIGHT: 5 CARDS IN OUR SIGNATURE STYLE (GRAY BORDERS LIKE FOOTER #54595f) -->
            <div class="why-cards-col">
              <div class="why-cards-grid">
                <div class="why-card-item">
                  <span class="why-card-num">01</span>
                  <p class="why-card-text">Унікальна комбінація різних форм пресомасажу в одній програмі</p>
                </div>

                <div class="why-card-item">
                  <span class="why-card-num">02</span>
                  <p class="why-card-text">Преміальна якість матеріалів виконання</p>
                </div>

                <div class="why-card-item">
                  <span class="why-card-num">03</span>
                  <p class="why-card-text">Абсолютно унікальна куртка для пресомасажу холки і бочків</p>
                </div>

                <div class="why-card-item">
                  <span class="why-card-num">04</span>
                  <p class="why-card-text">Найзручніший метод одягання манжет</p>
                </div>

                <div class="why-card-item">
                  <span class="why-card-num">05</span>
                  <p class="why-card-text">Найінтенсивніший лімфодренажний масаж (завдяки підготовці та біоміметиці)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ==========================================================================
           8.5. EQUIPMENT PACKAGE (#package) - DARK LUXURY SHOWCASE
           ========================================================================== -->
      <section class="linfopress-package-section" id="package">
        <div class="container package-container">
          <div class="package-header">
            <h2 class="package-title">Комплект поставки</h2>
            <p class="package-subtitle">Повна заводська комплектація обладнання для миттєвого старту роботи в клініці</p>
          </div>

          <div class="package-items-grid">
            <div class="package-item-card">
              <div class="package-img-wrap">
                <img src="/wp-content/uploads/2026/03/set1-optimized.png" alt="Апарат Linfopress PRO" loading="lazy">
              </div>
              <h4 class="package-item-name">Апарат Linfopress PRO</h4>
            </div>

            <div class="package-item-card">
              <div class="package-img-wrap">
                <img src="/wp-content/uploads/2026/03/set2-optimized.png" alt="Функціональний візок" loading="lazy">
              </div>
              <h4 class="package-item-name">Функціональний візок</h4>
            </div>

            <div class="package-item-card">
              <div class="package-img-wrap">
                <img src="/wp-content/uploads/2026/03/pants2-optimized.jpg" alt="Манжети для ніг і пояс" loading="lazy">
              </div>
              <h4 class="package-item-name">Манжети для ніг і пояс</h4>
            </div>

            <div class="package-item-card">
              <div class="package-img-wrap">
                <img src="/wp-content/uploads/2026/03/shirt2-optimized.jpg" alt="Куртка для тулубу та холки" loading="lazy">
              </div>
              <h4 class="package-item-name">Куртка для тулубу та холки</h4>
            </div>

            <div class="package-item-card">
              <div class="package-img-wrap">
                <img src="/wp-content/uploads/2026/03/set5-optimized.png" alt="Дві манжети для рук" loading="lazy">
              </div>
              <h4 class="package-item-name">Дві манжети для рук</h4>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           9. FAQ ACCORDION SECTION (#faq)
           ========================================================================== -->
      <section class="linfopress-faq-section" id="faq">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Питання та відповіді</h2>
            <p class="section-main-sub">
              Відповіді на поширені запитання про Linfopress Evolution PRO та клінічну ефективність системи
            </p>
          </div>

          <div class="linfopress-faq-accordion">
            <div class="faq-accordion-card active" onclick="window.toggleLinfopressFaq(this)">
              <div class="faq-card-header">
                <span class="faq-q-index">01</span>
                <h3 class="faq-q-text">Чим Linfopress Evolution PRO відрізняється від традиційних систем пресотерапії?</h3>
                <span class="faq-toggle-icon">−</span>
              </div>
              <div class="faq-card-body" style="display:block;">
                <p>Унікальною особливістю Linfopress Evolution PRO є спеціальна компресійна куртка для верхньої частини тулуба, яка здійснює лімфомасаж не тільки рук, але й боків (love handles), грудної ділянки і навіть «холки» (вдовиного горбика). Крім того, апарат має 24 незалежні пневмосектори з перекриттям без сліпих зон та 4-фазну біоміметичну пульсацію з обов'язковим розігрівом тканин.</p>
              </div>
            </div>

            <div class="faq-accordion-card" onclick="window.toggleLinfopressFaq(this)">
              <div class="faq-card-header">
                <span class="faq-q-index">02</span>
                <h3 class="faq-q-text">Скільки процедур потрібно для досягнення вираженого результату?</h3>
                <span class="faq-toggle-icon">+</span>
              </div>
              <div class="faq-card-body">
                <p>Для зняття відчуття втоми, важкості в ногах та швидкого лімфодренажу достатньо однієї процедури. Для стійкого лікування едематозного целюліту, стійкого зменшення об'ємів та детоксикації рекомендується курс з 10–12 процедур з періодичністю 2–3 сеанси на тиждень.</p>
              </div>
            </div>

            <div class="faq-accordion-card" onclick="window.toggleLinfopressFaq(this)">
              <div class="faq-card-header">
                <span class="faq-q-index">03</span>
                <h3 class="faq-q-text">Чи є процедура болісною для пацієнтів із чутливими судинами?</h3>
                <span class="faq-toggle-icon">+</span>
              </div>
              <div class="faq-card-body">
                <p>Процедура на Linfopress Evolution PRO є абсолютно комфортною та приємною. Завдяки автоматичній стадії м'якого розігріву тканини та судини плавно адаптуються до тиску, що повністю виключає синці, біль та дискомфорт навіть у пацієнток із чутливим фіброзним целюлітом.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           10. OFFICIAL TEST-DRIVE APPLICATION FORM (#application / #test-drive)
           ========================================================================== -->
      <section class="application-presentation zionic-partner-stage-section linfopress-partner-stage-section" id="application">
        <div class="container">
          <div class="presentation-header text-center section-header-centered" style="text-align: center !important; margin: 0 auto 44px auto !important;">
            <h2 class="section-main-title" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important;">Стати партнером TermoSalud</h2>
            <p class="section-main-sub" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important;">
              При замовленні апарата Linfopress Evolution PRO ви отримуєте професійне навчання, маркетинговий запуск та надійну сервісну підтримку
            </p>
          </div>

          <div class="presentation-stage-grid">
            <!-- Left Column: Real Linfopress Photo + 5 Partnership Guarantees -->
            <div class="presentation-visual-col">
              <div class="presentation-photo-frame">
                <img src="/photo_form.png" class="presentation-showcase-img" alt="Апарат Linfopress Evolution PRO у клініці естетичної медицини" loading="lazy">
                <div class="presentation-photo-overlay"></div>
                <div class="presentation-floating-tag">
                  <span class="live-pulse-dot"></span>
                  <span>Офіційний дистриб'ютор TermoSalud</span>
                </div>
              </div>
              
              <div class="partner-guarantees-stack">
                <h4 class="guarantees-head-title">Ми забезпечуємо надійне партнерство:</h4>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">01</span>
                  <div class="guarantee-text">
                    <strong>Прямі поставки від виробника</strong>
                    <span>Вся продукція сертифікована (CE Medical, ISO 13485) та поставляється напряму від TermoSalud Іспанія.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">02</span>
                  <div class="guarantee-text">
                    <strong>Безкоштовне навчання для лікарів</strong>
                    <span>Повний супровід запуску процедури, постановка руки та авторські протоколи від лікарів-методистів.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">03</span>
                  <div class="guarantee-text">
                    <strong>Готові рекламні матеріали</strong>
                    <span>Презентації, фото-відео контент, друковані та цифрові макети — усе для швидкого залучення пацієнтів.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">04</span>
                  <div class="guarantee-text">
                    <strong>Гарантія, сервіс та підмінний фонд</strong>
                    <span>Офіційний сервісний центр у Києві, технічна підтримка та оперативний ремонт без затримок.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">05</span>
                  <div class="guarantee-text">
                    <strong>Гнучкі фінансові умови</strong>
                    <span>Передоплата, безвідсоткове розтермінування або індивідуальні лізингові умови під ваш бізнес.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Open High-Converting Partnership Form -->
            <div class="presentation-form-col">
              <div class="presentation-form-card" id="application-form">
                <div class="form-card-header">
                  <span class="partner-card-kicker">ЗАЯВКА НА СПІВПРАЦЮ</span>
                  <h3 class="form-card-title">Заявка на презентацію Linfopress</h3>
                  <p class="form-card-subtitle">
                    Заповніть форму, і наш спеціаліст надасть повний фінансовий розрахунок окупності та узгодить демонстрацію
                  </p>
                </div>

                <!-- Open Form Inputs -->
                <form class="presentation-open-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш спеціаліст зв\'яжеться з вами найближчим часом.');">
                  <div class="form-group-item">
                    <label class="form-label-text" for="l_partner_name">Ваше ім'я та посада</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="l_partner_name" placeholder="Наприклад: Олена, керівник клініки" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="l_partner_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="l_partner_phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>
                    <div class="form-group-item">
                      <label class="form-label-text" for="l_partner_email">Email</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><polyline points="22,6 12,13 2,6" stroke-width="1.5"></polyline></svg>
                        <input type="email" id="l_partner_email" placeholder="clinic@example.com" required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text" for="l_partner_city">Місто та назва клініки</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><circle cx="12" cy="10" r="3" stroke-width="1.5"></circle></svg>
                      <input type="text" id="l_partner_city" placeholder="Київ, Клініка естетичної медицини" required class="luxury-form-input">
                    </div>
                  </div>

                  <!-- Messenger Selection -->
                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для зв'язку</label>
                    <div class="messenger-pills-row">
                      <label class="messenger-pill active">
                        <input type="radio" name="l_partner_messenger" value="WhatsApp" checked class="messenger-radio">
                        <span class="messenger-pill-dot dot-emerald"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="l_partner_messenger" value="Telegram" class="messenger-radio">
                        <span class="messenger-pill-dot dot-cyan"></span>
                        <span>Telegram</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="l_partner_messenger" value="Viber" class="messenger-radio">
                        <span class="messenger-pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="submit-presentation-btn">
                    <span>ЗАМОВИТИ ВИЇЗНИЙ ТЕСТ-ДРАЙВ</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>

                  <p class="form-privacy-note">
                    🔒 Натискаючи кнопку, ви даєте згоду на обробку персональних даних відповідно до політики конфіденційності TermoSalud Україна.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           11. EXPANDABLE SEO ARTICLE (EXACT ZIONIC & MAIN PAGE EDITORIAL STYLE)
           ========================================================================== -->
      <section class="seo-clean-section linfopress-seo-clean-section" id="seo-article">
        <div class="container">
          <div class="seo-article-card">
            <h2 class="seo-article-main-title">Купити апарат для пресотерапії Linfopress Evolution PRO: інновації в лімфодренажі</h2>
            
            <p>Якісний апаратний лімфодренажний масаж — це базова та необхідна процедура в будь-якій сучасній клініці естетичної медицини. Він посилює ефект від інших методик корекції фігури та є самостійним потужним терапевтичним інструментом. Linfopress Evolution PRO — це передове обладнання преміумкласу, створене для досягнення бездоганних результатів та забезпечення максимального комфорту пацієнта.</p>

            <div class="seo-expandable-content" id="seoExpandableContent">
              <h3 class="seo-article-sub-title">Біоміметична пульсація — новий стандарт терапії</h3>
              <p>Ключова інновація, що відрізняє цей професійний апарат для пресотерапії, полягає у використанні технології біоміметичної послідовної пульсації. Ця система максимально точно імітує природні фізіологічні процеси організму людини.</p>
              
              <ul class="seo-article-bullets">
                <li><strong>Розігрів:</strong> Ексклюзивний режим, який м’яко готує тканини до впливу, що критично важливо при лікуванні фіброзного целюліту.</li>
                <li><strong>Активація:</strong> Стимуляція роботи лімфатичних вузлів і запуск обмінних процесів.</li>
                <li><strong>Дренаж:</strong> Глибоке та інтенсивне виведення надлишкової міжклітинної рідини й накопичених токсинів.</li>
                <li><strong>Розслаблення:</strong> Зняття м’язового спазму та досягнення глибокого релаксаційного ефекту.</li>
              </ul>

              <h3 class="seo-article-sub-title">Ексклюзивні переваги для клініки</h3>
              <p>Linfopress пропонує унікальну куртку для масажу верхньої частини тулуба, універсальні манжети з 3 рівнями блискавок та швидке одягання за 60 секунд, заощаджуючи час лікаря та збільшуючи рентабельність кожного кабінету.</p>
            </div>

            <button type="button" class="seo-toggle-btn" id="seoToggleBtn" onclick="toggleZionicSeoArticle()">
              <span class="seo-btn-label">Читати повністю</span>
              <span class="seo-btn-arrow">∨</span>
            </button>
          </div>
        </div>
      </section>
`;

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
  
  <!-- CERTIFICATE FULLSCREEN LIGHTBOX MODAL -->
  <div class="cert-lightbox-modal" id="certLightboxModal" onclick="closeCertLightbox(event)">
    <button type="button" class="cert-lightbox-close" onclick="closeCertLightbox(event)" aria-label="Закрити">✕</button>
    <div class="cert-lightbox-dialog" onclick="event.stopPropagation()">
      <div class="cert-lightbox-img-wrap">
        <img src="" id="certLightboxImg" alt="Сертифікат у повному розмірі">
      </div>
      <div class="cert-lightbox-caption" id="certLightboxCaption"></div>
    </div>
  </div>

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

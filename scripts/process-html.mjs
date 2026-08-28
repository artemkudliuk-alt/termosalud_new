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

    // Modern Screen 2: Flagship Equipment Showcase (Zionic Showcase with Cinematic Video Banner + Description + YouTube Live Demo)
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

        <!-- 2. Full-Width 100% Video Banner (No Darkening, Only Single Title) -->
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

        <!-- 3. Zionic Duo Block (Card + Video) with #54595f Background -->
        <div class="zionic-duo-wrapper zionic-grey-wrapper">
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

              <!-- Right Column: Video Player with Play Button Only (No YouTube UI Clutter) -->
              <div class="zionic-youtube-compact-wrapper" onclick="this.classList.add('is-active'); this.innerHTML = '<iframe src=\'https://www.youtube-nocookie.com/embed/cqskAxvFlxY?autoplay=1&rel=0&modestbranding=1&controls=1\' title=\'ZIONIC MARP SYSTEM Presentation\' frameborder=\'0\' allow=\'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\' allowfullscreen></iframe>';">
                <div class="video-facade-cover" style="background-image: url('https://img.youtube.com/vi/cqskAxvFlxY/maxresdefault.jpg');">
                  <div class="video-facade-overlay"></div>
                  <div class="video-facade-play">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- ================= LINFOPRESS EVOLUTION PRO BLOCK ================= -->
        <!-- 4. Full-Width 100% Video Banner for Linfopress (No Darkening, Single Title) -->
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

        <!-- 5. Linfopress Duo Block (Video + Card) with #54595f Background -->
        <div class="zionic-duo-wrapper zionic-grey-wrapper">
          <div class="container">
            <div class="zionic-duo-container duo-reverse">
              
              <!-- Left Column: Video Player with Play Button Only -->
              <div class="zionic-youtube-compact-wrapper" onclick="this.classList.add('is-active'); this.innerHTML = '<iframe src=\'https://www.youtube-nocookie.com/embed/_Fx-uUZqLEc?autoplay=1&rel=0&modestbranding=1&controls=1\' title=\'LINFOPRESS EVOLUTION PRO Presentation\' frameborder=\'0\' allow=\'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\' allowfullscreen></iframe>';">
                <div class="video-facade-cover" style="background-image: url('https://img.youtube.com/vi/_Fx-uUZqLEc/hqdefault.jpg');">
                  <div class="video-facade-overlay"></div>
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

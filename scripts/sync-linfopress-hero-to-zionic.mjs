import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs WITH EXACT 1-TO-1 HERO SECTION
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const heroSectionRegex = /<!-- =+[\s\S]*?1\.\s*HERO STAGE[\s\S]*?<\/section>/i;

const exactZionicMatchHeroHtml = `<!-- ==========================================================================
           1. HERO STAGE (OFFICIAL LUXURY VIDEO HERO - 1-TO-1 MATCH WITH ZIONIC)
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
              <a href="#application" class="linfopress-primary-btn">
                <span>ЗАМОВИТИ ТЕСТ-ДРАЙВ У КЛІНІКУ</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button type="button" class="linfopress-secondary-btn" id="open-linfopress-video-btn" onclick="window.openLinfopressVideoLightbox()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>ВІДЕО-ДЕМОНСТРАЦІЯ</span>
              </button>
            </div>
          </div>
        </div>
      </section>`;

if (heroSectionRegex.test(htmlMjs)) {
  htmlMjs = htmlMjs.replace(heroSectionRegex, exactZionicMatchHeroHtml);
  fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');
  console.log('Successfully updated Linfopress Hero HTML in scripts/process-html.mjs!');
} else {
  console.error('Could not find heroSectionRegex in scripts/process-html.mjs');
}

// ==========================================================================
// 2. UPDATE src/css/custom.css WITH EXACT 1-TO-1 COMPUTED STYLES
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const exactHeroCss = `
/* ==========================================================================
   LINFOPRESS HERO - EXACT 1-TO-1 SPECIFICATION MATCH WITH ZIONIC HERO
   ========================================================================== */
.linfopress-hero-stage {
  position: relative !important;
  width: 100% !important;
  min-height: 90vh !important;
  background: #060709 !important;
  display: flex !important;
  align-items: center !important;
  padding: 100px 0 !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

.linfopress-hero-container {
  position: relative !important;
  z-index: 3 !important;
  width: 100% !important;
  max-width: 1560px !important;
  margin: 0 auto !important;
  padding-left: 36px !important;
  padding-right: 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 991px) {
  .linfopress-hero-container {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

.linfopress-hero-content-box {
  max-width: 820px !important;
  margin-left: 0 !important;
  padding-left: 0 !important;
  transform: none !important;
}

/* 1. LOGO - Exact height 68px, matching Zionic */
.linfopress-hero-logo-wrap {
  margin-bottom: 24px !important;
  margin-left: 0 !important;
  display: flex !important;
  align-items: center !important;
}

.linfopress-official-logo {
  height: 68px !important;
  width: auto !important;
  max-width: 320px !important;
  display: block !important;
  object-fit: contain !important;
  object-position: left center !important;
}

/* 2. TITLE - clamp(56px, 6.4vw, 96px), weight 900, line-height 0.96, letter-spacing -2px, margin-bottom 20px */
.linfopress-official-hero-title {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  font-family: 'Montserrat', 'Golos Text', sans-serif !important;
  font-size: clamp(56px, 6.4vw, 96px) !important;
  font-weight: 900 !important;
  line-height: 0.96 !important;
  letter-spacing: -2px !important;
  margin: 0 0 20px 0 !important;
  text-transform: uppercase !important;
  text-shadow: none !important;
  color: #ffffff !important;
}

.linfopress-official-hero-title span,
.linfopress-official-hero-title .hero-word-primary,
.linfopress-official-hero-title .hero-word-secondary {
  display: block !important;
  white-space: nowrap !important;
  color: #ffffff !important;
  font-weight: 900 !important;
  font-size: inherit !important;
  line-height: inherit !important;
  letter-spacing: inherit !important;
}

/* 3. DESC / SUBTITLE - clamp(16px, 1.6vw, 21px), weight 800, line-height 1.35, letter-spacing 0.8px, margin-bottom 32px */
.linfopress-hero-desc {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-size: clamp(16px, 1.6vw, 21px) !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  line-height: 1.35 !important;
  letter-spacing: 0.8px !important;
  text-transform: uppercase !important;
  margin: 0 0 32px 0 !important;
  max-width: 680px !important;
}

/* 4. ACTIONS & BUTTONS - Exact 1-to-1 match with Zionic (Sharp corners 0px, gap 20px, font 14px weight 800) */
.linfopress-hero-actions {
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
  flex-wrap: wrap !important;
}

.linfopress-hero-actions .linfopress-primary-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 12px !important;
  background: #ffffff !important;
  color: #111111 !important;
  border: 1px solid #ffffff !important;
  border-radius: 0 !important;
  padding: 16px 32px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 0.8px !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
}

.linfopress-hero-actions .linfopress-primary-btn:hover {
  background: #e2e8f0 !important;
  border-color: #e2e8f0 !important;
  transform: translateY(-2px) !important;
}

.linfopress-hero-actions .linfopress-secondary-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(8px) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  border-radius: 0 !important;
  padding: 16px 28px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 0.8px !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.linfopress-hero-actions .linfopress-secondary-btn:hover {
  background: #ffffff !important;
  color: #111111 !important;
  border-color: #ffffff !important;
  transform: translateY(-2px) !important;
}
`;

css += '\n' + exactHeroCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully written exact 1-to-1 Zionic Hero styles for Linfopress!');

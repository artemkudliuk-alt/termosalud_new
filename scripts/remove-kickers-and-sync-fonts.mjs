import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs (REMOVE ALL KICKERS FROM HTML)
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Remove <span class="luxury-kicker">...</span>
htmlMjs = htmlMjs.replace(/<span class="luxury-kicker">[\s\S]*?<\/span>\s*/g, '');
htmlMjs = htmlMjs.replace(/<span class="section-kicker">[\s\S]*?<\/span>\s*/g, '');

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

// ==========================================================================
// 2. UPDATE src/css/custom.css (EXACT HOME PAGE TYPOGRAPHY & ZERO KICKERS)
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const typographySyncCss = `
/* ==========================================================================
   PERFECT 1-TO-1 HOME PAGE TYPOGRAPHY SYNC (ZERO KICKERS, MONTSERRAT 900)
   ========================================================================== */

/* 1. HIDE ALL OVERHEAD KICKERS GLOBALLY ON ZIONIC */
.zionic-main-page-wrapper .luxury-kicker,
.zionic-main-page-wrapper .section-kicker,
.zionic-main-page-wrapper .kicker {
  display: none !important;
}

/* 2. SECTION MAIN TITLES (MONTSERRAT 900 BLACK) */
.zionic-main-page-wrapper h2.section-main-title,
.zionic-main-page-wrapper .section-main-title,
.zionic-main-page-wrapper .section-title,
.zionic-main-page-wrapper .technologies-title,
.zionic-main-page-wrapper .guarantees-head-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(34px, 3.6vw, 44px) !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  letter-spacing: -0.5px !important;
  color: #111111 !important;
  margin: 0 0 16px 0 !important;
  text-transform: none !important;
}

/* 3. SECTION SUBTITLES (MONTSERRAT / INTER 500, 18.5PX) */
.zionic-main-page-wrapper .section-main-sub,
.zionic-main-page-wrapper .section-subtitle,
.zionic-main-page-wrapper .section-desc {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-size: 18.5px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  color: #52525b !important;
  margin: 0 auto 52px auto !important;
  max-width: 900px !important;
}

/* 4. CARD TITLES & HEADINGS (MONTSERRAT 900) */
.zionic-main-page-wrapper .tech-card-heading {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 900 !important;
  line-height: 1.3 !important;
  color: #ffffff !important;
  margin-bottom: 12px !important;
}

.zionic-main-page-wrapper .presentation-title-clean {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  color: #111111 !important;
  margin-bottom: 14px !important;
}

.zionic-main-page-wrapper .doctor-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  color: #111111 !important;
}

.zionic-main-page-wrapper .faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19.5px !important;
  font-weight: 900 !important;
  line-height: 1.35 !important;
  color: #ffffff !important;
}

.zionic-main-page-wrapper .cert-scan-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 900 !important;
  line-height: 1.3 !important;
  color: #111111 !important;
}

.zionic-main-page-wrapper .matrix-main-head {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  color: #ffffff !important;
}

.zionic-main-page-wrapper .seo-article-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(30px, 3.4vw, 40px) !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  color: #111111 !important;
  margin-bottom: 24px !important;
}

.zionic-main-page-wrapper .seo-article-sub-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 900 !important;
  line-height: 1.3 !important;
  color: #111111 !important;
  margin: 36px 0 16px 0 !important;
}
`;

css += '\n' + typographySyncCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully removed all small kickers and synchronized 1-to-1 Montserrat 900 typography across Zionic!');

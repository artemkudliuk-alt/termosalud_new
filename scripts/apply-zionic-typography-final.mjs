import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Strip any remaining kicker tags on Zionic
htmlMjs = htmlMjs.replace(/<span class="luxury-kicker">[\s\S]*?<\/span>\s*/g, '');
htmlMjs = htmlMjs.replace(/<span class="section-kicker">[\s\S]*?<\/span>\s*/g, '');
htmlMjs = htmlMjs.replace(/<span class="kicker">[\s\S]*?<\/span>\s*/g, '');

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

// ==========================================================================
// 2. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const finalTypographyCss = `
/* ==========================================================================
   FINAL BULLETPROOF ZIONIC TYPOGRAPHY (MONTSERRAT 900, ZERO KICKERS)
   ========================================================================== */

/* 1. HIDE ALL OVERHEAD KICKERS GLOBALLY ON ZIONIC */
body.template-zionic .luxury-kicker,
body.template-zionic .section-kicker,
body.template-zionic .kicker,
.template-zionic .luxury-kicker,
.template-zionic .section-kicker,
.template-zionic .kicker {
  display: none !important;
}

/* 2. SECTION MAIN TITLES (MONTSERRAT 900 ULTRA BOLD) */
body.template-zionic h2.section-main-title,
body.template-zionic .section-main-title,
body.template-zionic .section-title,
body.template-zionic .guarantees-head-title,
.template-zionic h2,
.template-zionic .section-main-title,
.template-zionic h2.section-main-title {
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
body.template-zionic .section-main-sub,
body.template-zionic .section-subtitle,
body.template-zionic .section-desc,
.template-zionic .section-main-sub,
.template-zionic .section-subtitle,
.template-zionic .section-desc {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-size: 18.5px !important;
  font-weight: 500 !important;
  line-height: 1.6 !important;
  color: #52525b !important;
  margin: 0 auto 52px auto !important;
  max-width: 900px !important;
}

/* 4. CARD TITLES & HEADINGS (MONTSERRAT 900) */
body.template-zionic .tech-card-heading,
.template-zionic .tech-card-heading {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 900 !important;
  line-height: 1.3 !important;
  color: #ffffff !important;
  margin-bottom: 12px !important;
}

body.template-zionic .presentation-title-clean,
.template-zionic .presentation-title-clean {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  color: #111111 !important;
  margin-bottom: 14px !important;
}

body.template-zionic .doctor-name,
.template-zionic .doctor-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  color: #111111 !important;
}

body.template-zionic .faq-q-text,
.template-zionic .faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19.5px !important;
  font-weight: 900 !important;
  line-height: 1.35 !important;
  color: #ffffff !important;
}

body.template-zionic .cert-scan-title,
.template-zionic .cert-scan-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 900 !important;
  line-height: 1.3 !important;
  color: #111111 !important;
}

body.template-zionic .matrix-main-head,
.template-zionic .matrix-main-head {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  color: #ffffff !important;
}

body.template-zionic .seo-article-main-title,
.template-zionic .seo-article-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(30px, 3.4vw, 40px) !important;
  font-weight: 900 !important;
  line-height: 1.25 !important;
  color: #111111 !important;
  margin-bottom: 24px !important;
}

body.template-zionic .seo-article-sub-title,
.template-zionic .seo-article-sub-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 900 !important;
  line-height: 1.3 !important;
  color: #111111 !important;
  margin: 36px 0 16px 0 !important;
}
`;

css += '\n' + finalTypographyCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully enforced final typography styles with body.template-zionic!');

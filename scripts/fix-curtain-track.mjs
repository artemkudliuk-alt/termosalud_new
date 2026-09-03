import fs from 'fs';

// 1. Update scripts/process-html.mjs
let processHtml = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Replace CRLF with LF for matching, or match regex
const regexHero = /(<!-- 1\. HERO SECTION \(RESTORED EXACT ORIGINAL\) -->\r?\n\s*<section class="zionic-official-hero">)/;
if (!regexHero.test(processHtml)) {
  console.error('regexHero did not match');
  process.exit(1);
}

processHtml = processHtml.replace(
  regexHero,
  '<!-- 1. HERO & TICKER CURTAIN TRACK (SCREEN 2 SLIDES OVER SCREEN 1 ONLY) -->\n      <div class="zionic-hero-curtain-track">\n      <section class="zionic-official-hero">'
);

const regexTickerEnd = /(<\/section>\r?\n\s*<!-- 3\. TECHNOLOGIES BENTO SHOWCASE)/;
if (!regexTickerEnd.test(processHtml)) {
  console.error('regexTickerEnd did not match');
  process.exit(1);
}

processHtml = processHtml.replace(
  regexTickerEnd,
  '</section>\n      </div><!-- /zionic-hero-curtain-track -->\n\n      <!-- 3. TECHNOLOGIES BENTO SHOWCASE'
);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processHtml, 'utf8');
console.log('Successfully wrapped Hero & Ticker in .zionic-hero-curtain-track in scripts/process-html.mjs');

// 2. Append CSS rules to src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const curtainFixCss = `
/* ==========================================================================
   ZIONIC STRICT CURTAIN STAGE: SCREEN 2 SLIDES OVER SCREEN 1 ONLY
   ========================================================================== */
.zionic-hero-curtain-track {
  position: relative !important;
  width: 100% !important;
}

@media (min-width: 992px) {
  .zionic-hero-curtain-track {
    position: relative !important;
    width: 100% !important;
  }
  
  /* Sticky ONLY within .zionic-hero-curtain-track */
  .zionic-hero-curtain-track .zionic-official-hero {
    position: -webkit-sticky !important;
    position: sticky !important;
    top: 0px !important;
    z-index: 1 !important;
    width: 100% !important;
    height: 100vh !important;
    min-height: 700px !important;
    overflow: hidden !important;
  }

  /* Screen 2 slides up over Screen 1 like a curtain */
  .zionic-hero-curtain-track .zionic-infinite-ticker-section {
    position: relative !important;
    z-index: 10 !important;
    box-shadow: 0 -35px 90px rgba(0, 0, 0, 0.85) !important;
  }
}

/* Ensure ALL sections outside the curtain track have solid opaque backgrounds and high z-index */
html body.template-zionic section:not(.zionic-official-hero),
.zionic-tech-bento-section,
.zionic-manipula-fullscreen-section,
.zionic-ba-section,
.zionic-procedure-showcase-section,
.zionic-treatments-fullscreen-section,
.zionic-matrix-section,
.zionic-nine-advantages-section,
.zionic-video-presentation-section,
.zionic-video-fullscreen-banner,
.zionic-partner-stage-section,
.zionic-doctors-section,
.zionic-faq-section,
.zionic-certificates-section,
.zionic-seo-clean-section,
.footer,
footer {
  position: relative !important;
  z-index: 10 !important;
  background: #ffffff !important;
}

.zionic-manipula-fullscreen-section {
  background: #1c1c1e !important;
}

.zionic-procedure-showcase-section {
  background: #f4f4f5 !important;
}

.zionic-video-presentation-section {
  background: #f4f4f5 !important;
}

.zionic-video-fullscreen-banner {
  background: #000000 !important;
}

.zionic-doctors-section {
  background: #111111 !important;
}

.zionic-certificates-section {
  background: #111111 !important;
}

footer {
  background: #111111 !important;
}
`;

css += '\n' + curtainFixCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended curtain fix CSS to src/css/custom.css');

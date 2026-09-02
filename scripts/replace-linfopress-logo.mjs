import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const oldLinfopressIconMarker = `<div class="linfopress-cloud-brand-icon">
              <svg width="96" height="58" viewBox="0 0 68 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 38H52C59.732 38 66 31.732 66 24C66 16.7118 60.4439 10.7226 53.3087 10.0678C51.3411 4.24949 45.6601 0 39 0C30.4079 0 23.3276 6.72622 22.8465 15.2017C21.3197 14.4328 19.5934 14 17.7778 14C11.2731 14 6 19.2731 6 25.7778C6 26.6896 6.10372 27.5772 6.29969 28.4307C2.62886 29.8052 0 33.3768 0 37.5556C0 37.8048 0.00947094 38.0519 0.028169 38.2965" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>`;

const newLinfopressLogo = `<div class="linfopress-hero-logo-wrap">
              <img src="/LINFOPRESS-PRO-1.png" alt="Linfopress Evolution Pro" class="linfopress-official-logo" width="300" height="105" loading="eager">
            </div>`;

if (htmlMjs.includes(oldLinfopressIconMarker)) {
  htmlMjs = htmlMjs.replace(oldLinfopressIconMarker, newLinfopressLogo);
} else {
  // Regex fallback
  htmlMjs = htmlMjs.replace(/<div class="linfopress-cloud-brand-icon">[\s\S]*?<\/div>/, newLinfopressLogo);
}

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

// ==========================================================================
// 2. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const linfopressLogoCss = `
/* ==========================================================================
   LINFOPRESS HERO OFFICIAL LOGO
   ========================================================================== */
.linfopress-hero-logo-wrap {
  margin-bottom: 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
}

@media (max-width: 767px) {
  .linfopress-hero-logo-wrap {
    justify-content: center !important;
    margin-bottom: 20px !important;
  }
}

.linfopress-official-logo {
  max-width: 320px !important;
  width: auto !important;
  height: auto !important;
  max-height: 95px !important;
  object-fit: contain !important;
  display: block !important;
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.6)) !important;
}
`;

css += '\n' + linfopressLogoCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// Ensure image is in public
fs.copyFileSync('LINFOPRESS-PRO-1.png', 'public/LINFOPRESS-PRO-1.png');

console.log('Successfully placed LINFOPRESS-PRO-1.png logo above title on the Linfopress main hero screen!');

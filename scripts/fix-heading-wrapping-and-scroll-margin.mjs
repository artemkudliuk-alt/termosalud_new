import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const scrollMarginAndWordWrapCss = `
/* ==========================================================================
   GLOBAL SCROLL-MARGIN-TOP + CLEAN TWO-LINE HEADING BALANCING
   ========================================================================== */

/* 1. Ensure fixed header NEVER covers section headers when scrolling or navigating */
section,
[id],
.section-header,
.section-header-centered,
.presentation-section,
.zionic-matrix-section,
.linfopress-matrix-section,
.linfopress-package-section,
.linfopress-doctor-section,
.linfopress-why-section,
.tech-bento-section,
.faq-section,
.another-pages-banner,
.advantages-icons {
  scroll-margin-top: 100px !important;
}

/* 2. Clean 2-line heading word wrap */
.title-line-nowrap {
  white-space: nowrap !important;
  display: inline-block !important;
}

/* 3. Anti-word-break for all headings */
h1, h2, h3, h4, h5, h6,
.section-main-title,
.big-title,
.why-main-title,
.package-title {
  word-break: normal !important;
  word-wrap: normal !important;
  overflow-wrap: normal !important;
  hyphens: none !important;
}

@media (max-width: 768px) {
  /* Scale headings with long words cleanly so they fit in exactly 2 lines on mobile */
  .zionic-matrix-section .section-main-title,
  .linfopress-matrix-section .section-main-title {
    font-size: clamp(26px, 7.2vw, 34px) !important;
    line-height: 1.2 !important;
    text-align: center !important;
  }
}
`;

css += '\n' + scrollMarginAndWordWrapCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully added scroll-margin-top: 100px and clean 2-line heading word-wrap rules');

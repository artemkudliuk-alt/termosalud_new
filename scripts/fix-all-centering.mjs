import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const centeringCss = `
/* ==========================================================================
   GLOBAL SECTION TITLES & SUBTITLES STRICT CENTERING (LINFOPRESS & ZIONIC)
   ========================================================================== */

/* 1. LINFOPRESS SECTION HEADERS & CONTAINERS */
html body.template-linfopress .section-header-centered,
html body.template-linfopress section:not(#hero) .section-header-centered,
html body.template-linfopress .linfopress-tech-bento-section .section-header-centered,
html body.template-linfopress .linfopress-procedure-section .section-header-centered,
html body.template-linfopress .linfopress-advantages-grid-section .section-header-centered,
html body.template-linfopress .linfopress-matrix-section .section-header-centered,
html body.template-linfopress .linfopress-doctor-section .section-header-centered,
html body.template-linfopress .linfopress-why-and-package-section .section-header-centered,
html body.template-linfopress .linfopress-faq-section .section-header-centered,
html body.template-linfopress .linfopress-partner-stage-section .section-header-centered,
.template-linfopress .section-header-centered {
  max-width: 1080px !important;
  margin: 0 auto 52px auto !important;
  padding: 0 20px !important;
  text-align: center !important;
}

/* 2. LINFOPRESS H2 SECTION TITLES */
html body.template-linfopress section:not(#hero) h2,
html body.template-linfopress h2,
html body.template-linfopress h2.section-main-title,
html body.template-linfopress .section-main-title,
html body.template-linfopress .section-title,
html body.template-linfopress .technologies-title,
html body.template-linfopress .linfopress-tech-bento-section .section-main-title,
html body.template-linfopress .linfopress-procedure-section .section-main-title,
html body.template-linfopress .linfopress-advantages-grid-section .section-main-title,
html body.template-linfopress .linfopress-matrix-section .section-main-title,
html body.template-linfopress .linfopress-doctor-section .section-main-title,
html body.template-linfopress .linfopress-why-and-package-section .section-main-title,
html body.template-linfopress .linfopress-faq-section .section-main-title,
html body.template-linfopress .linfopress-partner-stage-section .section-main-title,
.template-linfopress section:not(#hero) h2,
.template-linfopress .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(38px, 4.2vw, 54px) !important;
  font-weight: 500 !important;
  line-height: 1.18 !important;
  letter-spacing: -0.5px !important;
  color: #0f172a !important;
  margin: 0 auto 18px auto !important;
  text-transform: uppercase !important;
  text-align: center !important;
  display: block !important;
}

/* 3. LINFOPRESS SUBTITLES */
html body.template-linfopress .section-main-sub,
html body.template-linfopress .section-subtitle,
html body.template-linfopress .section-desc,
html body.template-linfopress section:not(#hero) p.section-main-sub,
html body.template-linfopress .linfopress-tech-bento-section .section-main-sub,
html body.template-linfopress .linfopress-procedure-section .section-main-sub,
html body.template-linfopress .linfopress-advantages-grid-section .section-main-sub,
html body.template-linfopress .linfopress-matrix-section .section-main-sub,
html body.template-linfopress .linfopress-doctor-section .section-main-sub,
html body.template-linfopress .linfopress-why-and-package-section .section-main-sub,
html body.template-linfopress .linfopress-faq-section .section-main-sub,
html body.template-linfopress .linfopress-partner-stage-section .section-main-sub,
.template-linfopress .section-main-sub {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-size: 22px !important;
  font-weight: 400 !important;
  line-height: 1.65 !important;
  color: #475569 !important;
  margin: 0 auto 52px auto !important;
  max-width: 920px !important;
  text-align: center !important;
  display: block !important;
}

/* 4. PACKAGE HEADER & FORM TITLES CENTERING */
html body.template-linfopress .package-header,
html body.template-linfopress .package-title,
html body.template-linfopress .package-subtitle,
html body.template-linfopress .presentation-title-clean,
html body.template-linfopress .presentation-desc-clean {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

/* 5. ALSO ENSURE ZIONIC HAS ZERO UNCENTERED MAIN TITLES */
html body.template-zionic section:not(#hero) h2,
html body.template-zionic h2.section-main-title,
html body.template-zionic .section-main-title {
  text-align: center !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
`;

css += '\n' + centeringCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written strict global centering rules!');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const expandedScale15Css = `
/* ==========================================================================
   +15% EXPANDED TYPOGRAPHY & EXPANSIVE FRAME SYSTEM (ZIONIC & LINFOPRESS)
   Both Desktop & Mobile: Richer scale, wider frames, breathable spacing
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. DESKTOP & TABLET WIDE VIEWPORTS (min-width: 769px)
   -------------------------------------------------------------------------- */
@media (min-width: 769px) {
  /* Widen containers to give generous breathing room */
  html body.template-zionic .container,
  html body.template-linfopress .container,
  .zionic-main-page-wrapper .container,
  .linfopress-page-container .container,
  .zionic-tech-bento-section .container,
  .zionic-doctors-section .container,
  .zionic-certificates-section .container,
  .zionic-matrix-section .container,
  .linfopress-why-section .container,
  .linfopress-package-section .container,
  .linfopress-matrix-section .container,
  .linfopress-tech-bento-section .container,
  .linfopress-advantages-grid-section .container {
    max-width: 1440px !important;
    padding-left: 32px !important;
    padding-right: 32px !important;
    box-sizing: border-box !important;
  }

  /* Widen FAQ Container */
  .zionic-faq-section .container,
  .linfopress-faq-section .container,
  .faq-accordion-grid,
  .linfopress-faq-accordion {
    max-width: 1020px !important;
    width: 100% !important;
  }

  /* Section Main Headings (+15%: 44px - 58px) */
  html body.template-zionic section:not(#zionic-official-hero) h2,
  html body.template-linfopress section:not(#hero) h2,
  html body.template-zionic .section-main-title,
  html body.template-linfopress .section-main-title,
  html body.template-zionic h2.section-main-title,
  html body.template-linfopress h2.section-main-title,
  .template-zionic .big-title,
  .template-linfopress .big-title {
    font-family: 'Montserrat', sans-serif !important;
    font-size: clamp(42px, 3.8vw, 56px) !important;
    font-weight: 700 !important;
    line-height: 1.15 !important;
    letter-spacing: -0.5px !important;
    color: #0f172a !important;
    text-transform: uppercase !important;
    margin-bottom: 18px !important;
  }

  /* Section Subtitles (+15%: 19px - 20px) */
  html body.template-zionic .section-main-sub,
  html body.template-linfopress .section-main-sub,
  html body.template-zionic .section-subtitle,
  html body.template-linfopress .section-subtitle,
  html body.template-zionic .section-desc,
  html body.template-linfopress .section-desc,
  html body.template-zionic section:not(#zionic-official-hero) p.section-main-sub,
  html body.template-linfopress section:not(#hero) p.section-main-sub {
    font-family: 'Montserrat', 'Inter', sans-serif !important;
    font-size: 19.5px !important;
    font-weight: 400 !important;
    line-height: 1.65 !important;
    color: #475569 !important;
    max-width: 960px !important;
    margin: 0 auto 40px auto !important;
  }

  /* Bento & Tech Card Headings (+15%: 24px - 27px) */
  html body.template-zionic .tech-bento-card .bento-head-title,
  html body.template-zionic .tech-bento-card h3,
  html body.template-linfopress .linfopress-tech-card .tech-card-heading,
  html body.template-linfopress .linfopress-tech-card h3,
  html body.template-zionic .matrix-creative-card h3,
  html body.template-linfopress .matrix-creative-card h3,
  html body.template-linfopress .adv-item-card h3,
  html body.template-linfopress .package-item-card h3 {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 25px !important;
    font-weight: 800 !important;
    line-height: 1.25 !important;
    letter-spacing: -0.4px !important;
    color: #0f172a !important;
  }

  /* Card Body & List Text (+15%: 16.5px - 17.5px) */
  html body.template-zionic .tech-bento-card p,
  html body.template-linfopress .linfopress-tech-card p,
  html body.template-zionic .tech-bento-card li,
  html body.template-linfopress .linfopress-tech-card li,
  html body.template-zionic .matrix-creative-card li,
  html body.template-linfopress .matrix-creative-card li,
  html body.template-linfopress .adv-item-card p,
  html body.template-linfopress .package-item-card p,
  html body.template-zionic .doctor-luxury-card p,
  html body.template-linfopress .expert-review-card p {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 16.5px !important;
    line-height: 1.6 !important;
    color: #475569 !important;
  }

  /* Doctor Testimonials */
  html body.template-zionic .doctor-quote-title,
  html body.template-linfopress .doctor-quote-title,
  html body.template-linfopress .expert-review-card h3 {
    font-size: 24px !important;
    font-weight: 700 !important;
    line-height: 1.35 !important;
    color: #0f172a !important;
  }

  /* FAQ Accordions (+15%) */
  html body.template-zionic .faq-q-text,
  html body.template-linfopress .faq-q-text {
    font-size: 20px !important;
    font-weight: 700 !important;
    line-height: 1.35 !important;
    color: #0f172a !important;
  }

  html body.template-zionic .faq-answer-inner,
  html body.template-linfopress .faq-answer-inner {
    font-size: 16.5px !important;
    line-height: 1.65 !important;
    color: #475569 !important;
  }

  /* Form Presentation Card */
  html body.template-zionic .presentation-form-card .form-title,
  html body.template-linfopress .presentation-form-card .form-title {
    font-size: 32px !important;
    font-weight: 800 !important;
  }
  html body.template-zionic .presentation-form-card .form-subtitle,
  html body.template-linfopress .presentation-form-card .form-subtitle {
    font-size: 16.5px !important;
  }
}

/* --------------------------------------------------------------------------
   2. MOBILE VIEWPORTS (max-width: 768px)
   -------------------------------------------------------------------------- */
@media (max-width: 768px) {
  /* Side margins: 16px crisp edges */
  html body.template-zionic .container,
  html body.template-linfopress .container,
  .zionic-main-page-wrapper .container,
  .linfopress-page-container .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
    box-sizing: border-box !important;
  }

  /* Section Main Headings (+15%: 33px - 38px on mobile) */
  html body.template-zionic section:not(#zionic-official-hero) h2,
  html body.template-linfopress section:not(#hero) h2,
  html body.template-zionic .section-main-title,
  html body.template-linfopress .section-main-title,
  html body.template-zionic h2.section-main-title,
  html body.template-linfopress h2.section-main-title,
  .template-zionic .big-title,
  .template-linfopress .big-title {
    font-family: 'Montserrat', sans-serif !important;
    font-size: clamp(32px, 8.2vw, 38px) !important;
    font-weight: 700 !important;
    line-height: 1.15 !important;
    letter-spacing: -0.5px !important;
    color: #0f172a !important;
    text-transform: uppercase !important;
    margin-bottom: 12px !important;
    word-break: normal !important;
    hyphens: none !important;
  }

  /* Section Subtitles (+15%: 16.5px - 17.5px on mobile) */
  html body.template-zionic .section-main-sub,
  html body.template-linfopress .section-main-sub,
  html body.template-zionic .section-subtitle,
  html body.template-linfopress .section-subtitle,
  html body.template-zionic .section-desc,
  html body.template-linfopress .section-desc,
  html body.template-zionic section:not(#zionic-official-hero) p.section-main-sub,
  html body.template-linfopress section:not(#hero) p.section-main-sub {
    font-family: 'Montserrat', 'Inter', sans-serif !important;
    font-size: 16.5px !important;
    font-weight: 400 !important;
    line-height: 1.55 !important;
    color: #475569 !important;
    padding: 0 4px !important;
    margin: 0 auto 28px auto !important;
  }

  /* Card Headings on Mobile (+15%: 20px - 23px) */
  html body.template-zionic .tech-bento-card .bento-head-title,
  html body.template-zionic .tech-bento-card h3,
  html body.template-linfopress .linfopress-tech-card .tech-card-heading,
  html body.template-linfopress .linfopress-tech-card h3,
  html body.template-zionic .matrix-creative-card h3,
  html body.template-linfopress .matrix-creative-card h3,
  html body.template-linfopress .adv-item-card h3,
  html body.template-linfopress .package-item-card h3,
  html body.template-zionic .doctor-quote-title,
  html body.template-linfopress .expert-review-card h3 {
    font-family: 'Montserrat', sans-serif !important;
    font-size: clamp(20px, 5.2vw, 23px) !important;
    font-weight: 800 !important;
    line-height: 1.25 !important;
    color: #0f172a !important;
  }

  /* Card Body & Lists on Mobile (+15%: 15.5px - 16px) */
  html body.template-zionic .tech-bento-card p,
  html body.template-linfopress .linfopress-tech-card p,
  html body.template-zionic .tech-bento-card li,
  html body.template-linfopress .linfopress-tech-card li,
  html body.template-zionic .matrix-creative-card li,
  html body.template-linfopress .matrix-creative-card li,
  html body.template-linfopress .adv-item-card p,
  html body.template-linfopress .package-item-card p,
  html body.template-zionic .doctor-luxury-card p,
  html body.template-linfopress .expert-review-card p {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 15.5px !important;
    line-height: 1.55 !important;
    color: #475569 !important;
  }

  /* FAQ Accordions on Mobile (+15%: 17.5px - 18.5px) */
  html body.template-zionic .faq-q-text,
  html body.template-linfopress .faq-q-text {
    font-family: 'Montserrat', sans-serif !important;
    font-size: clamp(17px, 4.4vw, 19px) !important;
    font-weight: 700 !important;
    line-height: 1.35 !important;
    color: #0f172a !important;
  }

  html body.template-zionic .faq-answer-inner,
  html body.template-linfopress .faq-answer-inner {
    font-family: 'Montserrat', sans-serif !important;
    font-size: 15.5px !important;
    line-height: 1.6 !important;
    color: #475569 !important;
  }

  /* Form Presentation Card on Mobile */
  html body.template-zionic .presentation-form-card .form-title,
  html body.template-linfopress .presentation-form-card .form-title {
    font-size: clamp(24px, 6.5vw, 30px) !important;
    font-weight: 800 !important;
  }
  html body.template-zionic .presentation-form-card .form-subtitle,
  html body.template-linfopress .presentation-form-card .form-subtitle {
    font-size: 15.5px !important;
    line-height: 1.5 !important;
  }
}
`;

css += '\n' + expandedScale15Css;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully applied +15% scale and expanded layout frames for Zionic & Linfopress');

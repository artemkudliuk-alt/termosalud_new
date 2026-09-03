import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const typographySystem = `
/* ==========================================================================
   GLOBAL PREMIUM TYPOGRAPHY SYSTEM (UNIFIED ACROSS MAIN, ZIONIC, LINFOPRESS)
   ========================================================================== */

/* 1. SECTION MAIN TITLES (CONFIDENT, LARGE, BOLD MONTSERRAT) */
html body section:not(#hero-clean-section):not(#zionic-official-hero):not(#hero) h2,
html body .section-main-title,
html body .zionic-main-page-wrapper .section-main-title,
html body .linfopress-page-container .section-main-title,
html body.template-zionic section:not(#zionic-official-hero) h2,
html body.template-linfopress section:not(#hero) h2,
html body.template-zionic .section-main-title,
html body.template-linfopress .section-main-title,
.why-us-header h2,
.partners-header h2,
.presentation-header h2,
.our-prods-header h2,
.editorial-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
  line-height: 1.16 !important;
  letter-spacing: -0.5px !important;
  color: #0f172a !important;
  text-transform: uppercase !important;
  margin: 0 0 14px 0 !important;
}

@media (min-width: 769px) {
  html body section:not(#hero-clean-section):not(#zionic-official-hero):not(#hero) h2,
  html body .section-main-title,
  html body .zionic-main-page-wrapper .section-main-title,
  html body .linfopress-page-container .section-main-title,
  html body.template-zionic section:not(#zionic-official-hero) h2,
  html body.template-linfopress section:not(#hero) h2,
  html body.template-zionic .section-main-title,
  html body.template-linfopress .section-main-title,
  .why-us-header h2,
  .partners-header h2,
  .presentation-header h2,
  .our-prods-header h2,
  .editorial-main-title {
    font-size: clamp(38px, 3.6vw, 50px) !important;
  }
}

@media (max-width: 768px) {
  html body section:not(#hero-clean-section):not(#zionic-official-hero):not(#hero) h2,
  html body .section-main-title,
  html body .zionic-main-page-wrapper .section-main-title,
  html body .linfopress-page-container .section-main-title,
  html body.template-zionic section:not(#zionic-official-hero) h2,
  html body.template-linfopress section:not(#hero) h2,
  html body.template-zionic .section-main-title,
  html body.template-linfopress .section-main-title,
  .why-us-header h2,
  .partners-header h2,
  .presentation-header h2,
  .our-prods-header h2,
  .editorial-main-title {
    font-size: clamp(30px, 7.8vw, 36px) !important;
    line-height: 1.15 !important;
    word-break: normal !important;
    hyphens: none !important;
  }
}

/* 2. SECTION SUBTITLES (ELEGANT SLATE, PERFECT PROPORTION) */
.section-main-sub,
.section-subtitle,
.section-desc,
.presentation-sub-head,
.treatments-subtitle,
.matrix-sub-desc,
.package-subtitle,
.why-us-header p,
.partners-header p,
.presentation-header p,
.our-prods-header p {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-weight: 400 !important;
  color: #475569 !important;
  margin: 0 auto !important;
}

@media (min-width: 769px) {
  .section-main-sub,
  .section-subtitle,
  .section-desc,
  .presentation-sub-head,
  .treatments-subtitle,
  .matrix-sub-desc,
  .package-subtitle,
  .why-us-header p,
  .partners-header p,
  .presentation-header p,
  .our-prods-header p {
    font-size: 17px !important;
    line-height: 1.6 !important;
    max-width: 860px !important;
  }
}

@media (max-width: 768px) {
  .section-main-sub,
  .section-subtitle,
  .section-desc,
  .presentation-sub-head,
  .treatments-subtitle,
  .matrix-sub-desc,
  .package-subtitle,
  .why-us-header p,
  .partners-header p,
  .presentation-header p,
  .our-prods-header p {
    font-size: 15px !important;
    line-height: 1.5 !important;
    padding: 0 4px !important;
  }
}

/* 3. CARDS UNDER HEADINGS (UNIFIED TYPOGRAPHY & SCALE) */

/* A. Bento Tech Cards (Zionic & Linfopress) */
.tech-bento-card .bento-head-title,
.tech-bento-card h3,
.linfopress-tech-card .bento-head-title,
.linfopress-tech-card h3 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(18px, 4.5vw, 22px) !important;
  font-weight: 800 !important;
  line-height: 1.25 !important;
  letter-spacing: -0.3px !important;
  color: #0f172a !important;
  margin-bottom: 8px !important;
}

.tech-bento-card p,
.linfopress-tech-card p {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.55 !important;
  color: #475569 !important;
}

/* B. Matrix Creative Cards (Indications / Treatments) */
.matrix-creative-card h3,
.matrix-card-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(18px, 4.5vw, 22px) !important;
  font-weight: 800 !important;
  line-height: 1.25 !important;
  color: #0f172a !important;
  margin-bottom: 12px !important;
}

.matrix-creative-card li,
.matrix-list li {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.5 !important;
  color: #334155 !important;
}

/* C. Why Us / Advantage Cards */
.why-card-title,
.adv-item-card h3,
.adv-card-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(17px, 4.2vw, 20px) !important;
  font-weight: 800 !important;
  line-height: 1.3 !important;
  color: #0f172a !important;
  margin-bottom: 6px !important;
}

.why-card-desc,
.adv-item-card p,
.adv-card-desc {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.55 !important;
  color: #475569 !important;
}

/* D. FAQ Accordion Cards */
.faq-q-text,
.linfopress-faq-accordion .faq-q-text,
html body.template-zionic .faq-q-text,
html body.template-linfopress .faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(15.5px, 4vw, 17.5px) !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  color: #0f172a !important;
}

.faq-answer-inner,
.faq-accordion-card p {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.6 !important;
  color: #475569 !important;
}

/* E. Doctors & Expert Review Cards */
.doctor-luxury-card h3,
.expert-review-card h3,
.doctor-quote-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(17px, 4.2vw, 20px) !important;
  font-weight: 700 !important;
  line-height: 1.35 !important;
  color: #0f172a !important;
  margin-bottom: 10px !important;
}

.doctor-luxury-card p,
.expert-review-card p,
.doctor-quote-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.6 !important;
  color: #475569 !important;
}

.doctor-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
}

.doctor-role,
.doctor-clinic {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  color: #64748b !important;
}

/* F. Package Item Cards */
.package-item-card h3,
.package-item-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(16px, 4vw, 18px) !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  margin-bottom: 6px !important;
}

.package-item-card p,
.package-item-desc {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  color: #475569 !important;
}

/* G. Form Presentation Card */
.presentation-form-card .form-title,
.presentation-form-card h3 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(22px, 5.5vw, 28px) !important;
  font-weight: 800 !important;
  line-height: 1.25 !important;
  color: #0f172a !important;
  text-transform: uppercase !important;
}

.presentation-form-card .form-subtitle,
.presentation-form-card p {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.5 !important;
  color: #475569 !important;
}
`;

css += '\n' + typographySystem;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully applied unified global typography system');

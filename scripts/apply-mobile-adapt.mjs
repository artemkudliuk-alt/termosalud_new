import fs from 'fs';

// 1. Append Mobile CSS to custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const mobileCss = `
/* ==========================================================================
   MOBILE RESPONSIVE ADAPTATION (ZIONIC & LINFOPRESS HARMONIZED WITH MAIN PAGE)
   ========================================================================== */

@media (max-width: 768px) {
  /* Prevent horizontal scrolling on mobile */
  html, body {
    overflow-x: hidden !important;
    max-width: 100vw !important;
  }

  /* Typography: Prevent awkward word-breaks (e.g. КОРЕКЦІЇ ТІЛ-А, МОДЕЛЮВАН-НЯ, ПІДТВЕРДЖЕ-НІ) */
  h1, h2, h3, h4,
  .section-main-title,
  .presentation-main-head,
  .zionic-hero-title,
  .linfopress-hero-title,
  .treatments-title,
  .matrix-main-title,
  .ba-title,
  .procedure-title,
  .package-title,
  .form-card-title {
    hyphens: none !important;
    word-break: normal !important;
    overflow-wrap: break-word !important;
  }

  /* 1. Hero Sections on Mobile */
  .zionic-official-hero,
  .linfopress-hero-stage {
    min-height: 100vh !important;
    min-height: 100dvh !important;
    padding-top: 80px !important;
    padding-bottom: 40px !important;
  }

  .zionic-hero-title {
    font-size: clamp(26px, 7.2vw, 38px) !important;
    line-height: 1.15 !important;
    letter-spacing: -0.5px !important;
    margin-bottom: 14px !important;
  }

  .linfopress-hero-title {
    font-size: clamp(28px, 7.8vw, 42px) !important;
    line-height: 1.12 !important;
    letter-spacing: -0.5px !important;
    margin-bottom: 14px !important;
  }

  .zionic-hero-sub,
  .linfopress-hero-sub {
    font-size: 13.5px !important;
    line-height: 1.45 !important;
    max-width: 320px !important;
    margin: 0 auto 24px auto !important;
    padding: 0 10px !important;
  }

  /* Hero Action Buttons: 100% width stacked */
  .zionic-hero-actions,
  .linfopress-hero-actions {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 330px !important;
    gap: 10px !important;
    margin: 0 auto !important;
  }

  .zionic-primary-btn,
  .zionic-secondary-btn,
  .linfopress-primary-btn,
  .linfopress-secondary-btn {
    width: 100% !important;
    justify-content: center !important;
    padding: 14px 18px !important;
    font-size: 13.5px !important;
    box-sizing: border-box !important;
  }

  /* 2. Section Headers on Mobile */
  .section-header-centered,
  .presentation-header,
  .procedure-stage-head {
    margin-bottom: 28px !important;
    padding: 0 16px !important;
  }

  .section-main-title,
  .presentation-main-head,
  .treatments-title,
  .matrix-main-title,
  .ba-title,
  .package-title {
    font-size: clamp(20px, 5.8vw, 28px) !important;
    line-height: 1.25 !important;
    letter-spacing: -0.2px !important;
    margin-bottom: 8px !important;
  }

  .section-main-sub,
  .presentation-sub-head,
  .treatments-subtitle,
  .matrix-sub-desc,
  .package-subtitle {
    font-size: clamp(13.5px, 3.8vw, 15px) !important;
    line-height: 1.5 !important;
    padding: 0 4px !important;
  }

  /* 3. Partner Application Section (Harmonized 1-to-1 with Main Page) */
  .application-presentation {
    padding: 44px 0 52px 0 !important;
  }

  .application-presentation .container-fluid,
  .application-presentation .container {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .presentation-stage-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 24px !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
  }

  .presentation-visual-col {
    width: 100% !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 0px !important;
    overflow: hidden !important;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04) !important;
  }

  .presentation-photo-frame {
    height: 220px !important;
    min-height: 220px !important;
  }

  .partner-guarantees-stack {
    padding: 22px 16px !important;
  }

  .guarantees-head-title {
    font-size: 16px !important;
    margin-bottom: 14px !important;
  }

  .guarantee-item-row {
    padding: 10px 12px !important;
    gap: 12px !important;
  }

  .guarantee-num {
    font-size: 13px !important;
    min-width: 22px !important;
  }

  .guarantee-text strong {
    font-size: 14px !important;
    margin-bottom: 2px !important;
  }

  .guarantee-text span {
    font-size: 13px !important;
    line-height: 1.4 !important;
  }

  /* Interactive Form Card on Mobile */
  .presentation-form-col {
    width: 100% !important;
  }

  .presentation-form-card {
    padding: 28px 18px 24px 18px !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 0px !important;
    box-shadow: 0 16px 45px rgba(0, 0, 0, 0.05) !important;
    background: #ffffff !important;
  }

  .partner-card-kicker {
    font-size: 11px !important;
    letter-spacing: 0.8px !important;
  }

  .form-card-title {
    font-size: clamp(20px, 5.4vw, 24px) !important;
    line-height: 1.25 !important;
    margin-bottom: 8px !important;
  }

  .form-card-subtitle {
    font-size: 13.5px !important;
    line-height: 1.45 !important;
    margin-bottom: 18px !important;
  }

  .form-row-2col {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
  }

  .presentation-open-form {
    gap: 12px !important;
  }

  .form-label-text {
    font-size: 11px !important;
    margin-bottom: 4px !important;
  }

  .luxury-form-input {
    height: 46px !important;
    font-size: 13.5px !important;
  }

  .messenger-pills-row {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 6px !important;
  }

  .messenger-pill {
    padding: 9px 4px !important;
    font-size: 12px !important;
    gap: 6px !important;
  }

  .presentation-submit-btn {
    height: 50px !important;
    font-size: 13px !important;
    letter-spacing: 0.3px !important;
    padding: 0 14px !important;
  }

  /* 4. Matrices on Mobile */
  .zionic-creative-matrix-grid,
  .linfopress-split-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
  }

  .matrix-creative-card {
    padding: 24px 16px !important;
  }

  .matrix-card-title {
    font-size: 19px !important;
  }

  .matrix-item-row {
    padding: 12px 10px !important;
    gap: 10px !important;
  }

  .item-title {
    font-size: 14px !important;
  }

  .item-desc {
    font-size: 13px !important;
    line-height: 1.4 !important;
  }

  /* 5. Bento Grids on Mobile */
  .tech-bento-grid,
  .linfopress-tech-bento-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
  }

  /* 6. Results Tiles on Mobile */
  .results-tiles-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
  }

  /* 7. Package Grid on Linfopress */
  .package-items-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 14px !important;
  }

  /* 8. Doctors Reviews on Mobile */
  .zionic-doctors-grid,
  .linfopress-doctor-row {
    display: flex !important;
    flex-direction: column !important;
    gap: 16px !important;
  }

  .doctor-luxury-card,
  .expert-review-card {
    padding: 22px 16px !important;
  }

  /* 9. FAQ Accordions on Mobile */
  .faq-accordion-card,
  .linfopress-faq-item {
    padding: 16px 14px !important;
  }

  .faq-accordion-question,
  .linfopress-faq-question {
    font-size: 15px !important;
    gap: 10px !important;
  }

  /* 10. Swipe-Scroll Motion Tuning */
  .t-reveal-item {
    transition-duration: 380ms !important;
    transition-delay: calc(var(--item-idx, 0) * 35ms) !important;
  }

  .t-reveal-header {
    transition-duration: 400ms !important;
  }
}
`;

css += '\n' + mobileCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully appended Mobile CSS adaptation to custom.css');

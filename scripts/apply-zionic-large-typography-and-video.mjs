import fs from 'fs';

// 1. Update CSS in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const largeTypographyAndVideoCss = `
/* ==========================================================================
   ZIONIC PAGE: LARGE TYPOGRAPHY & CINEMATIC VIDEO CARDS (NO SMALL FONTS)
   ========================================================================== */

/* 1. Global Section Typography Scale */
.zionic-main-page-wrapper .section-header-centered {
  text-align: center;
  max-width: 880px;
  margin: 0 auto 60px auto;
}

.zionic-main-page-wrapper .luxury-kicker {
  display: inline-block;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 2.5px !important;
  text-transform: uppercase !important;
  color: #71717a !important;
  margin-bottom: 14px !important;
}

.zionic-main-page-wrapper .section-main-title {
  font-family: 'Montserrat', 'Golos Text', sans-serif !important;
  font-size: clamp(38px, 4.4vw, 56px) !important;
  font-weight: 900 !important;
  line-height: 1.1 !important;
  letter-spacing: -1.2px !important;
  color: #111111 !important;
  margin-bottom: 18px !important;
  text-transform: uppercase !important;
}

.zionic-main-page-wrapper .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: clamp(17px, 1.7vw, 21px) !important;
  font-weight: 450 !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  max-width: 760px !important;
  margin: 0 auto !important;
}

/* 2. Technologies Bento Cards: Larger Cinematic Video & Micro-Animations */
.zionic-tech-bento-section {
  background: #ffffff;
  padding: 110px 0;
}

.tech-bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px;
}

@media (max-width: 991px) {
  .tech-bento-grid {
    grid-template-columns: 1fr;
  }
}

.tech-bento-card {
  background: #111111 !important;
  border: 1px solid #27272a !important;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease !important;
}

.tech-bento-card:hover {
  transform: translateY(-8px) !important;
  border-color: rgba(251, 191, 36, 0.5) !important;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35) !important;
}

.tech-card-media {
  position: relative;
  width: 100%;
  height: 380px !important; /* Larger cinematic video */
  overflow: hidden;
  background: #000000;
}

@media (max-width: 767px) {
  .tech-card-media {
    height: 260px !important;
  }
}

.tech-card-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.tech-bento-card:hover .tech-card-media video {
  transform: scale(1.05) !important;
}

.tech-badge-tag {
  position: absolute;
  top: 18px;
  left: 18px;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 1.2px !important;
  padding: 8px 18px !important;
  transition: border-color 0.3s ease, background 0.3s ease;
}

.tech-bento-card:hover .tech-badge-tag {
  border-color: #fbbf24;
  background: #000000;
}

.tech-card-content {
  padding: 40px !important;
}

.tech-card-heading {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 26px !important; /* Larger title */
  font-weight: 900 !important;
  color: #ffffff !important;
  line-height: 1.2 !important;
  margin-bottom: 18px !important;
  letter-spacing: -0.5px;
}

.tech-card-text {
  font-family: 'Inter', sans-serif !important;
  font-size: 17.5px !important; /* Large readable body */
  color: #d4d4d8 !important;
  line-height: 1.7 !important;
  margin-bottom: 28px !important;
}

.tech-bullets-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-bullets-list li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Inter', sans-serif !important;
  font-size: 16.5px !important; /* Large bullets */
  font-weight: 600 !important;
  color: #e4e4e7 !important;
  margin-bottom: 14px !important;
  padding: 6px 0;
  transition: transform 0.25s ease, color 0.25s ease !important;
}

.tech-bullets-list li:hover {
  transform: translateX(8px) !important;
  color: #ffffff !important;
}

.tech-bullets-list li .bullet-check {
  color: #fbbf24 !important;
  font-size: 18px !important;
  font-weight: 900 !important;
  transition: transform 0.25s ease, text-shadow 0.25s ease;
}

.tech-bullets-list li:hover .bullet-check {
  transform: scale(1.2);
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.9);
}

/* 3. Manipula Section: Larger Fonts & Layout */
.zionic-manipula-section {
  background: #f4f4f5;
  padding: 110px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
}

.manipula-showcase-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  gap: 28px;
  align-items: center;
}

@media (max-width: 991px) {
  .manipula-showcase-grid {
    grid-template-columns: 1fr;
  }
}

.manipula-feature-card {
  background: #ffffff;
  border: 1px solid #e4e4e7;
  padding: 40px !important;
}

.feature-num {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 40px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin-bottom: 16px !important;
}

.feature-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  margin-bottom: 14px !important;
  line-height: 1.25 !important;
}

.feature-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 16.5px !important;
  color: #52525b !important;
  line-height: 1.65 !important;
  margin: 0 !important;
}

/* 4. Results Slider */
.zionic-ba-section {
  background: #ffffff;
  padding: 110px 0;
}

.slide-caption {
  padding: 20px 24px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #111111 !important;
}

/* 5. 5 Reasons Bento Grid */
.zionic-reasons-section {
  background: #111111;
  padding: 110px 0;
  border-top: 1px solid #27272a;
}

.reason-bento-box {
  padding: 40px !important;
}

.reason-box-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  margin-bottom: 14px !important;
}

.reason-box-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 16.5px !important;
  color: #d4d4d8 !important;
  line-height: 1.65 !important;
  margin: 0 !important;
}

/* 6. Indications & Contraindications Split Matrix */
.zionic-matrix-section {
  background: #ffffff;
  padding: 110px 0;
}

.matrix-side {
  padding: 60px !important;
}

.indications-side .matrix-title,
.contraindications-side .matrix-title-dark {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 30px !important;
  font-weight: 900 !important;
  margin-bottom: 28px !important;
  letter-spacing: -0.5px;
}

.matrix-checklist li,
.matrix-crosslist li {
  font-size: 17.5px !important;
  font-weight: 600 !important;
  margin-bottom: 20px !important;
  line-height: 1.55 !important;
}

/* 7. Procedure Video Banner */
.zionic-video-banner-section {
  background: #000000;
  padding: 90px 0;
}

.video-banner-title {
  font-size: clamp(34px, 4vw, 48px) !important;
  font-weight: 900 !important;
  line-height: 1.15 !important;
}

.video-banner-sub {
  font-size: 19px !important;
  color: #e4e4e7 !important;
  margin-bottom: 32px !important;
}

.video-play-huge-btn {
  padding: 18px 40px !important;
  font-size: 15px !important;
  font-weight: 900 !important;
}

/* 8. Luxury Booking Section */
.zionic-booking-section {
  background: #ffffff;
  padding: 110px 0;
}

.luxury-booking-card {
  padding: 70px 60px !important;
}

.booking-title {
  font-size: clamp(32px, 3.4vw, 42px) !important;
  font-weight: 900 !important;
  line-height: 1.15 !important;
  margin-bottom: 20px !important;
}

.booking-desc {
  font-size: 17.5px !important;
  color: #d4d4d8 !important;
  line-height: 1.7 !important;
  margin-bottom: 32px !important;
}

.trust-pill {
  font-size: 16px !important;
  font-weight: 600 !important;
}

.form-input-group label {
  font-size: 14px !important;
  font-weight: 700 !important;
}

.form-input-group input {
  padding: 16px 20px !important;
  font-size: 16px !important;
}

.msg-choice {
  font-size: 15px !important;
  font-weight: 700 !important;
  padding: 14px !important;
}

.luxury-submit-btn {
  padding: 20px 28px !important;
  font-size: 15.5px !important;
  font-weight: 900 !important;
}

/* 9. FAQ Accordion */
.zionic-faq-section {
  background: #f4f4f5;
  padding: 110px 0;
}

.faq-toggle-header {
  padding: 26px 32px !important;
}

.faq-q-text {
  font-size: 19px !important;
  font-weight: 800 !important;
}

.faq-answer-body {
  padding: 0 32px 26px 32px !important;
}

.faq-answer-body p {
  font-size: 17px !important;
  color: #3f3f46 !important;
  line-height: 1.7 !important;
}
`;

// Append or update in custom.css
const marker = '/* ==========================================================================\n   ZIONIC PAGE: LARGE TYPOGRAPHY';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + largeTypographyAndVideoCss;
} else {
  css += '\n' + largeTypographyAndVideoCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully applied large typography and cinematic video sizing to Zionic page!');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fullZionicCss = `
/* ==========================================================================
   ZIONIC PAGE: LUXURY MAIN-PAGE REDESIGN (ZERO BLUE, SHARP CORNERS, MONT/INTER)
   ========================================================================== */

/* 1. Reset and Sharp Corners */
.zionic-main-page-wrapper,
.zionic-main-page-wrapper * {
  border-radius: 0 !important;
  box-sizing: border-box;
}

.zionic-main-page-wrapper {
  background: #ffffff;
  color: #111111;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

/* 2. Common Typography */
.zionic-main-page-wrapper .section-header-centered {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 50px auto;
}

.zionic-main-page-wrapper .luxury-kicker {
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #a1a1aa;
  margin-bottom: 12px;
}

.zionic-main-page-wrapper .section-main-title {
  font-family: 'Montserrat', 'Golos Text', sans-serif !important;
  font-size: clamp(32px, 3.8vw, 46px) !important;
  font-weight: 900 !important;
  line-height: 1.15 !important;
  letter-spacing: -1px !important;
  color: #111111 !important;
  margin-bottom: 16px !important;
  text-transform: uppercase !important;
}

.zionic-main-page-wrapper .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: clamp(15px, 1.4vw, 17px) !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  max-width: 680px;
  margin: 0 auto;
}

/* 3. Pillars 5-Item Bar */
.zionic-pillars-bar {
  background: #0a0a0a;
  padding: 40px 0;
  border-bottom: 1px solid #27272a;
}

.zionic-pillars-inner {
  position: relative;
  background: #111111;
  border: 1px solid #27272a;
  overflow: hidden;
  padding: 30px;
}

.zionic-pillars-bg-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.zionic-pillars-bg-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.25;
}

.zionic-pillars-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 10, 10, 0.7);
}

.zionic-pillars-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}

@media (max-width: 1199px) {
  .zionic-pillars-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .zionic-pillars-grid {
    grid-template-columns: 1fr;
  }
}

.pillar-pill-item {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 20px;
}

.pillar-pill-item:last-child {
  border-right: none;
}

.pillar-icon-box {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #27272a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
}

.pillar-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 6px;
}

.pillar-desc {
  font-size: 13px;
  color: #a1a1aa;
  line-height: 1.5;
  margin: 0;
}

/* 4. Technologies Bento Grid */
.zionic-tech-bento-section {
  background: #ffffff;
  padding: 100px 0;
}

.tech-bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

@media (max-width: 991px) {
  .tech-bento-grid {
    grid-template-columns: 1fr;
  }
}

.tech-bento-card {
  background: #111111;
  border: 1px solid #27272a;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.tech-bento-card:hover {
  transform: translateY(-4px);
  border-color: #52525b;
}

.tech-card-media {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.tech-card-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tech-badge-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #000000;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: 11.5px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 6px 14px;
}

.tech-card-content {
  padding: 36px;
}

.tech-card-heading {
  font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 14px;
}

.tech-card-text {
  font-size: 14.5px;
  color: #a1a1aa;
  line-height: 1.65;
  margin-bottom: 24px;
}

.tech-bullets-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tech-bullets-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #e4e4e7;
  margin-bottom: 10px;
}

.bullet-check {
  color: #fbbf24;
  font-weight: bold;
}

/* 5. Manipula Section */
.zionic-manipula-section {
  background: #f4f4f5;
  padding: 100px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
}

.manipula-showcase-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr 1fr;
  gap: 24px;
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
  padding: 36px;
}

.manipula-feature-card.center-media-card {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.manipula-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
}

.feature-num {
  font-family: 'Montserrat', sans-serif;
  font-size: 32px;
  font-weight: 900;
  color: #111111;
  margin-bottom: 14px;
}

.feature-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #111111;
  margin-bottom: 10px;
}

.feature-desc {
  font-size: 14px;
  color: #52525b;
  line-height: 1.6;
  margin: 0;
}

/* 6. Clinical Results Slider */
.zionic-ba-section {
  background: #ffffff;
  padding: 100px 0;
}

.zionic-modern-gallery-slider {
  position: relative;
  width: 100%;
}

.zionic-gallery-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 10px 0 30px 0;
}

.zionic-gallery-track::-webkit-scrollbar {
  display: none;
}

.zionic-slide-item {
  flex: 0 0 calc(33.333% - 16px);
  min-width: 320px;
  scroll-snap-align: start;
  background: #ffffff;
  border: 1px solid #e4e4e7;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 991px) {
  .zionic-slide-item {
    flex: 0 0 calc(50% - 12px);
    min-width: 280px;
  }
}

@media (max-width: 640px) {
  .zionic-slide-item {
    flex: 0 0 90%;
    min-width: 260px;
  }
}

.zionic-slide-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
}

.slide-img-frame img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
}

.slide-caption {
  padding: 16px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 13.5px;
  font-weight: 600;
  color: #111111;
  border-top: 1px solid #e4e4e7;
  background: #fafafa;
}

.zionic-carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.sharp-carousel-btn {
  width: 48px;
  height: 48px;
  background: #111111;
  color: #ffffff;
  border: 1px solid #111111;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sharp-carousel-btn:hover {
  background: #ffffff;
  color: #111111;
}

.carousel-counter {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #111111;
  letter-spacing: 1px;
}

/* 7. 5 Reasons Bento Grid */
.zionic-reasons-section {
  background: #111111;
  padding: 100px 0;
  border-top: 1px solid #27272a;
}

.zionic-reasons-section .section-main-title {
  color: #ffffff !important;
}

.zionic-reasons-section .section-main-sub {
  color: #a1a1aa !important;
}

.reasons-bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 991px) {
  .reasons-bento-grid {
    grid-template-columns: 1fr;
  }
}

.reason-bento-box {
  background: #18181b;
  border: 1px solid #27272a;
  padding: 36px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.reason-bento-box:hover {
  transform: translateY(-4px);
  border-color: #52525b;
}

.reason-bento-box.highlight-gold-box {
  grid-column: span 2;
  border-color: #fbbf24;
}

@media (max-width: 991px) {
  .reason-bento-box.highlight-gold-box {
    grid-column: span 1;
  }
}

.reason-icon-wrap {
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #27272a;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.reason-box-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
}

.reason-box-desc {
  font-size: 14px;
  color: #a1a1aa;
  line-height: 1.6;
  margin: 0;
}

/* 8. Indications & Contraindications Split Matrix */
.zionic-matrix-section {
  background: #ffffff;
  padding: 100px 0;
}

.matrix-split-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border: 1px solid #27272a;
  overflow: hidden;
}

@media (max-width: 991px) {
  .matrix-split-wrapper {
    grid-template-columns: 1fr;
  }
}

.matrix-side {
  padding: 50px;
}

.indications-side {
  background: #111111;
  color: #ffffff;
}

.indications-side .matrix-kicker {
  color: #fbbf24;
}

.indications-side .matrix-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
}

.matrix-checklist {
  list-style: none;
  padding: 0;
  margin: 0;
}

.matrix-checklist li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 15px;
  color: #e4e4e7;
  margin-bottom: 16px;
  line-height: 1.5;
}

.check-icon {
  color: #fbbf24;
  font-weight: bold;
}

.contraindications-side {
  background: #f4f4f5;
  color: #111111;
}

.matrix-kicker-dark {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #71717a;
  display: block;
  margin-bottom: 10px;
}

.matrix-title-dark {
  font-family: 'Montserrat', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #111111;
  margin-bottom: 24px;
}

.matrix-crosslist {
  list-style: none;
  padding: 0;
  margin: 0;
}

.matrix-crosslist li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 15px;
  color: #3f3f46;
  margin-bottom: 16px;
  line-height: 1.5;
}

.cross-icon {
  color: #ef4444;
  font-weight: bold;
}

/* 9. Procedure Video Banner */
.zionic-video-banner-section {
  background: #0a0a0a;
  padding: 80px 0;
}

.video-banner-sharp-frame {
  position: relative;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #27272a;
  overflow: hidden;
  padding: 60px 20px;
}

.procedure-video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
}

.video-banner-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 640px;
}

.video-banner-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(28px, 3.5vw, 40px);
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 12px;
}

.video-banner-sub {
  font-size: 16px;
  color: #d4d4d8;
  margin-bottom: 28px;
}

.video-play-huge-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  color: #111111;
  border: 1px solid #ffffff;
  padding: 16px 36px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.video-play-huge-btn:hover {
  background: #111111;
  color: #ffffff;
  border-color: #ffffff;
}

/* 10. Luxury Booking Section */
.zionic-booking-section {
  background: #ffffff;
  padding: 100px 0;
}

.luxury-booking-card {
  background: #111111;
  border: 1px solid #27272a;
  padding: 60px;
}

@media (max-width: 767px) {
  .luxury-booking-card {
    padding: 30px 20px;
  }
}

.booking-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(28px, 3vw, 36px);
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 16px;
  line-height: 1.2;
}

.booking-desc {
  font-size: 14.5px;
  color: #a1a1aa;
  line-height: 1.6;
  margin-bottom: 28px;
}

.booking-trust-pills {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trust-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13.5px;
  color: #e4e4e7;
}

.pill-check {
  color: #fbbf24;
  font-weight: bold;
}

.luxury-booking-form .form-row-2col {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 575px) {
  .luxury-booking-form .form-row-2col {
    grid-template-columns: 1fr;
  }
}

.form-input-group {
  margin-bottom: 18px;
}

.form-input-group label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 12.5px;
  font-weight: 600;
  color: #d4d4d8;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input-group input {
  width: 100%;
  background: #18181b;
  border: 1px solid #27272a;
  color: #ffffff;
  padding: 14px 18px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.form-input-group input:focus {
  outline: none;
  border-color: #fbbf24;
}

.messenger-selector-row {
  display: flex;
  gap: 12px;
}

.msg-choice {
  flex: 1;
  background: #18181b;
  border: 1px solid #27272a;
  padding: 10px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #d4d4d8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.msg-choice input {
  accent-color: #fbbf24;
}

.luxury-submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #ffffff;
  color: #111111;
  border: 1px solid #ffffff;
  padding: 18px 24px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 1px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;
}

.luxury-submit-btn:hover {
  background: #fbbf24;
  color: #111111;
  border-color: #fbbf24;
}

/* 11. FAQ Accordion */
.zionic-faq-section {
  background: #f4f4f5;
  padding: 100px 0;
  border-top: 1px solid #e4e4e7;
}

.faq-accordion-grid {
  max-width: 860px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-accordion-card {
  background: #ffffff;
  border: 1px solid #e4e4e7;
  overflow: hidden;
}

.faq-toggle-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  background: #ffffff;
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 16.5px;
  font-weight: 700;
  color: #111111;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease;
}

.faq-toggle-header:hover {
  background: #fafafa;
}

.faq-icon {
  font-size: 22px;
  font-weight: 400;
  color: #71717a;
}

.faq-answer-body {
  padding: 0 28px 22px 28px;
}

.faq-answer-body p {
  font-size: 14.5px;
  color: #52525b;
  line-height: 1.65;
  margin: 0;
}

/* 12. SEO Clean Box */
.zionic-seo-clean-section {
  background: #ffffff;
  padding: 60px 0 80px 0;
}

.seo-clean-box {
  background: #fafafa;
  border: 1px solid #e4e4e7;
  padding: 36px 40px;
}

.seo-clean-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #111111;
  margin-bottom: 12px;
}

.seo-clean-text {
  font-size: 13.5px;
  color: #71717a;
  line-height: 1.7;
  margin: 0;
}
`;

// Replace or append
const marker = '/* ==========================================================================';
const zionicMarker = 'ZIONIC PAGE: LUXURY MAIN-PAGE REDESIGN';
if (css.includes(zionicMarker)) {
  const start = css.indexOf('/* ==========================================================================\n   ZIONIC PAGE: LUXURY MAIN-PAGE REDESIGN');
  css = css.substring(0, start) + fullZionicCss;
} else {
  css += '\n' + fullZionicCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written full luxury CSS for Zionic!');

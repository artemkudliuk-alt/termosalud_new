import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const zionicAdaptedCss = `
/* ==========================================================================
   ZIONIC PAGE: MAIN PAGE ADAPTATION (ZERO BLUE, SHARP CORNERS, MONTSE/INTER)
   ========================================================================== */

/* 1. Global Strict Sharp Geometry & Colors for Zionic Page */
.zionic-main-page-wrapper,
.zionic-main-page-wrapper * {
  border-radius: 0 !important;
  box-sizing: border-box;
}

.zionic-main-page-wrapper h1,
.zionic-main-page-wrapper h2,
.zionic-main-page-wrapper h3,
.zionic-main-page-wrapper h4,
.zionic-main-page-wrapper .big-title,
.zionic-main-page-wrapper .eb-title,
.zionic-main-page-wrapper .ti-name,
.zionic-main-page-wrapper .beast-top-text,
.zionic-main-page-wrapper .another-pages-banner-title {
  font-family: 'Montserrat', 'Golos Text', sans-serif !important;
  color: #111111 !important;
  letter-spacing: -0.5px;
}

.zionic-main-page-wrapper p,
.zionic-main-page-wrapper li,
.zionic-main-page-wrapper span:not(.btn-text):not(.dot),
.zionic-main-page-wrapper div:not(.big-title):not(.ti-name):not(.eb-title) {
  font-family: 'Inter', sans-serif !important;
}

/* 2. Remove All Blue/Navy Backgrounds & Borders */
.zionic-main-page-wrapper .advantages-video-bg,
.zionic-main-page-wrapper .technologies-item,
.zionic-main-page-wrapper .tech_zionic_item,
.zionic-main-page-wrapper .experience-block-bg,
.zionic-main-page-wrapper .beast-item,
.zionic-main-page-wrapper .why-this-item,
.zionic-main-page-wrapper .readings,
.zionic-main-page-wrapper .advantages-big {
  background-color: #111111 !important;
  border-color: #27272a !important;
}

/* 3. Technologies 4-Grid Cards */
.zionic-main-page-wrapper .technologies-item {
  background: #111111 !important;
  border: 1px solid #27272a !important;
  padding: 24px !important;
  transition: transform 0.3s ease, border-color 0.3s ease !important;
}

.zionic-main-page-wrapper .technologies-item:hover {
  transform: translateY(-4px) !important;
  border-color: #52525b !important;
}

.zionic-main-page-wrapper .technologies-item .ti-name {
  color: #ffffff !important;
  font-size: 22px !important;
  font-weight: 800 !important;
  margin-bottom: 12px !important;
}

.zionic-main-page-wrapper .technologies-item .ti-descr,
.zionic-main-page-wrapper .technologies-item .ti-descr li {
  color: #a1a1aa !important;
  font-size: 14.5px !important;
  line-height: 1.65 !important;
}

.zionic-main-page-wrapper .ti-video-block {
  border: 1px solid #27272a !important;
  overflow: hidden !important;
  margin-bottom: 20px !important;
}

/* 4. Manipula Section (.tech_zionic) */
.zionic-main-page-wrapper .tech_zionic {
  background: #fafafa !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.zionic-main-page-wrapper .tech_zionic_item {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 24px !important;
}

.zionic-main-page-wrapper .tech_zionic_item h3,
.zionic-main-page-wrapper .tech_zionic_item .title {
  color: #111111 !important;
  font-weight: 800 !important;
}

.zionic-main-page-wrapper .tech_zionic_item p {
  color: #52525b !important;
}

/* 5. Before & After Interactive Slider (.ba_slider) */
.zionic-main-page-wrapper .ba {
  background: #ffffff !important;
  padding: 80px 0 !important;
}

.zionic-main-page-wrapper .zionic-ba-swiper,
.zionic-main-page-wrapper .zionic-exp-swiper {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 20px 0 40px 0;
}

.zionic-main-page-wrapper .zionic-ba-swiper .swiper-wrapper,
.zionic-main-page-wrapper .zionic-exp-swiper .swiper-wrapper {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 12px;
}

.zionic-main-page-wrapper .zionic-ba-swiper .swiper-wrapper::-webkit-scrollbar,
.zionic-main-page-wrapper .zionic-exp-swiper .swiper-wrapper::-webkit-scrollbar {
  display: none;
}

.zionic-main-page-wrapper .zionic-ba-swiper .swiper-slide,
.zionic-main-page-wrapper .zionic-exp-swiper .swiper-slide {
  flex: 0 0 calc(33.333% - 16px);
  min-width: 320px;
  scroll-snap-align: start;
  background: #ffffff;
  border: 1px solid #e4e4e7 !important;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@media (max-width: 991px) {
  .zionic-main-page-wrapper .zionic-ba-swiper .swiper-slide,
  .zionic-main-page-wrapper .zionic-exp-swiper .swiper-slide {
    flex: 0 0 calc(50% - 12px);
    min-width: 280px;
  }
}

@media (max-width: 640px) {
  .zionic-main-page-wrapper .zionic-ba-swiper .swiper-slide,
  .zionic-main-page-wrapper .zionic-exp-swiper .swiper-slide {
    flex: 0 0 90%;
    min-width: 260px;
  }
}

.zionic-main-page-wrapper .zionic-ba-swiper .swiper-slide:hover,
.zionic-main-page-wrapper .zionic-exp-swiper .swiper-slide:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.zionic-main-page-wrapper .zionic-ba-swiper .swiper-slide img,
.zionic-main-page-wrapper .zionic-exp-swiper .swiper-slide img {
  width: 100%;
  height: auto;
  display: block;
}

.zionic-main-page-wrapper .zionic-slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.zionic-main-page-wrapper .zionic-slider-btn {
  width: 46px;
  height: 46px;
  background: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #27272a !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.zionic-main-page-wrapper .zionic-slider-btn:hover {
  background: #ffffff !important;
  color: #111111 !important;
  border-color: #111111 !important;
}

/* 6. Readings (Indications & Contraindications) */
.zionic-main-page-wrapper .readings {
  background: #111111 !important;
  border-top: 1px solid #27272a !important;
  border-bottom: 1px solid #27272a !important;
  color: #ffffff !important;
}

.zionic-main-page-wrapper .readings .big-title {
  color: #ffffff !important;
}

.zionic-main-page-wrapper .readings-row .col-lg-6:first-child {
  background: #18181b !important;
  border: 1px solid #27272a !important;
}

.zionic-main-page-wrapper .readings-row .col-lg-6:last-child {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  color: #111111 !important;
}

.zionic-main-page-wrapper .readings-row .col-lg-6:last-child .contraindications-block-name,
.zionic-main-page-wrapper .readings-row .col-lg-6:last-child li {
  color: #111111 !important;
}

/* 7. Buttons across Zionic Page (Strict Sharp Luxury Design) */
.zionic-main-page-wrapper button:not(.zionic-slider-btn),
.zionic-main-page-wrapper .another-pages-banner-button,
.zionic-main-page-wrapper .zionic-primary-btn,
.zionic-main-page-wrapper .zionic-secondary-btn,
.zionic-main-page-wrapper .shimmer-submit-btn {
  border-radius: 0 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
  padding: 14px 28px !important;
  transition: all 0.2s ease !important;
}

.zionic-main-page-wrapper .zionic-primary-btn,
.zionic-main-page-wrapper .another-pages-banner-button {
  background: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #111111 !important;
}

.zionic-main-page-wrapper .zionic-primary-btn:hover,
.zionic-main-page-wrapper .another-pages-banner-button:hover {
  background: #27272a !important;
  transform: translateY(-2px);
}

.zionic-main-page-wrapper .zionic-secondary-btn {
  background: #ffffff !important;
  color: #111111 !important;
  border: 1px solid #111111 !important;
}

.zionic-main-page-wrapper .zionic-secondary-btn:hover {
  background: #111111 !important;
  color: #ffffff !important;
}

/* 8. Modals Sharp Luxury Style */
.zionic-main-page-wrapper .modal-dialog,
.zionic-main-page-wrapper .modal-content {
  border-radius: 0 !important;
  background: #111111 !important;
  border: 1px solid #27272a !important;
}
`;

// Check if already appended or replace
const marker = '/* ZIONIC PAGE: MAIN PAGE ADAPTATION';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + zionicAdaptedCss;
} else {
  css += '\n' + zionicAdaptedCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written main-page adapted CSS for Zionic!');

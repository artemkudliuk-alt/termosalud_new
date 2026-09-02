import fs from 'fs';

// ==========================================================================
// 1. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const linfopressStyles = `
/* ==========================================================================
   LINFOPRESS EVOLUTION PRO COMPLETE MODERN DESIGN SYSTEM
   ========================================================================== */

/* 1. GLOBAL TYPOGRAPHY & ZERO KICKERS (1-TO-1 WITH HOME PAGE & ZIONIC) */
html body.template-linfopress .luxury-kicker,
html body.template-linfopress .section-kicker,
html body.template-linfopress .kicker,
.template-linfopress .luxury-kicker,
.template-linfopress .section-kicker,
.template-linfopress .kicker {
  display: none !important;
}

html body.template-linfopress section:not(#hero) h2,
html body.template-linfopress h2,
html body.template-linfopress h2.section-main-title,
html body.template-linfopress .section-main-title,
html body.template-linfopress .section-title,
.template-linfopress section:not(#hero) h2,
.template-linfopress .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(38px, 4.2vw, 54px) !important;
  font-weight: 500 !important; /* Exact same as Home Page "ІННОВАЦІЙНІ ТЕХНОЛОГІЇ TERMOSALUD" */
  line-height: 1.18 !important;
  letter-spacing: -0.5px !important;
  color: #0f172a !important;
  margin: 0 0 18px 0 !important;
  text-transform: uppercase !important;
}

html body.template-linfopress .section-main-sub,
html body.template-linfopress .section-subtitle,
html body.template-linfopress .section-desc,
html body.template-linfopress section:not(#hero) p.section-main-sub,
.template-linfopress .section-main-sub {
  font-family: 'Montserrat', 'Inter', sans-serif !important;
  font-size: 22px !important;
  font-weight: 400 !important;
  line-height: 1.65 !important;
  color: #475569 !important;
  margin: 0 auto 52px auto !important;
  max-width: 920px !important;
  text-align: center !important;
}

.linfopress-main-page-wrapper .container {
  max-width: 1440px !important;
  padding-left: 24px !important;
  padding-right: 24px !important;
  margin: 0 auto !important;
  box-sizing: border-box !important;
}

/* 2. HERO STAGE */
.linfopress-hero-stage {
  position: relative !important;
  width: 100% !important;
  min-height: 90vh !important;
  background: #060709 !important;
  display: flex !important;
  align-items: center !important;
  padding: 100px 0 !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}

.linfopress-hero-media-wrapper {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
}

.linfopress-hero-video-bg {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
}

.linfopress-hero-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(90deg, rgba(6,7,9,0.92) 0%, rgba(6,7,9,0.65) 50%, rgba(6,7,9,0.3) 100%) !important;
}

.linfopress-hero-container {
  position: relative !important;
  z-index: 3 !important;
  width: 100% !important;
}

.linfopress-hero-content-box {
  max-width: 840px !important;
  padding-left: 12px !important;
}

.linfopress-official-hero-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(56px, 6.4vw, 96px) !important;
  font-weight: 900 !important;
  line-height: 0.96 !important;
  letter-spacing: -2px !important;
  margin: 0 0 20px 0 !important;
  text-transform: uppercase !important;
  color: #ffffff !important;
  display: flex !important;
  flex-direction: column !important;
}

.linfopress-official-hero-kicker {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(14px, 1.4vw, 18px) !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #ffffff !important;
  margin: 0 0 12px 0 !important;
  text-transform: uppercase !important;
}

.linfopress-official-hero-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 19px !important;
  color: #d4d4d8 !important;
  line-height: 1.6 !important;
  margin: 0 0 36px 0 !important;
  max-width: 680px !important;
}

.linfopress-hero-actions {
  display: flex !important;
  align-items: center !important;
  gap: 16px !important;
  flex-wrap: wrap !important;
}

.linfopress-btn-pill-white {
  background: #ffffff !important;
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  padding: 16px 28px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  text-decoration: none !important;
  border: 1px solid #ffffff !important;
  transition: all 0.3s ease !important;
}

.linfopress-btn-pill-white:hover {
  background: #f1f5f9 !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 10px 25px rgba(255,255,255,0.2) !important;
}

.linfopress-btn-ghost-dark {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(8px) !important;
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  padding: 16px 28px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.linfopress-btn-ghost-dark:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  border-color: #ffffff !important;
  transform: translateY(-2px) !important;
}

/* 3. QUICK ADVANTAGES 5-PILL STRIP */
.linfopress-advantages-strip {
  background: #ffffff !important;
  padding: 50px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.linfopress-pills-grid {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 20px !important;
}

@media (max-width: 991px) {
  .linfopress-pills-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 575px) {
  .linfopress-pills-grid {
    grid-template-columns: 1fr !important;
  }
}

.linfopress-pill-card {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  padding: 24px 20px !important;
  text-align: center !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}

.linfopress-pill-card:hover {
  transform: translateY(-4px) !important;
  border-color: #0f172a !important;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06) !important;
}

.pill-icon-wrap {
  width: 56px !important;
  height: 56px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-bottom: 12px !important;
}

.pill-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  margin: 0 0 6px 0 !important;
}

.pill-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 13.5px !important;
  color: #64748b !important;
  line-height: 1.45 !important;
  margin: 0 !important;
}

/* 4. TECHNOLOGIES BENTO SECTION */
.linfopress-tech-bento-section {
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.linfopress-tech-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 32px !important;
}

@media (max-width: 991px) {
  .linfopress-tech-grid {
    grid-template-columns: 1fr !important;
  }
}

.linfopress-tech-card {
  background: #18181b !important;
  border: 1px solid #3f3f46 !important;
  cursor: pointer !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.12) !important;
  transition: all 0.35s ease !important;
}

.linfopress-tech-card:hover {
  transform: translateY(-5px) !important;
  border-color: #71717a !important;
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.2) !important;
}

.tech-media-box {
  position: relative !important;
  width: 100% !important;
  height: 320px !important;
  background: #000000 !important;
  overflow: hidden !important;
}

.tech-media-box video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  transition: transform 0.5s ease !important;
}

.linfopress-tech-card:hover .tech-media-box video {
  transform: scale(1.03) !important;
}

.tech-stage-badge {
  position: absolute !important;
  top: 16px !important;
  left: 16px !important;
  background: #27272a !important;
  color: #ffffff !important;
  border: 1px solid #52525b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  padding: 5px 12px !important;
  letter-spacing: 1px !important;
  z-index: 2 !important;
}

.tech-card-body {
  padding: 32px 28px !important;
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
  background: #18181b !important;
}

.linfopress-tech-card .tech-card-heading {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  margin: 0 0 14px 0 !important;
}

.tech-card-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 24px 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
}

.tech-card-list li {
  display: flex !important;
  align-items: flex-start !important;
  gap: 10px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #d4d4d8 !important;
  line-height: 1.55 !important;
}

.tech-card-list li .bullet-check {
  color: #ffffff !important;
  font-weight: 900 !important;
}

.tech-card-cta {
  margin-top: auto !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  text-transform: uppercase !important;
  letter-spacing: 0.5px !important;
}

/* 5. TECH MODAL BACKDROP (BLUR-IN LIGHTBOX) */
.linfopress-modal-backdrop {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(0, 0, 0, 0.85) !important;
  backdrop-filter: blur(16px) !important;
  z-index: 99999 !important;
  display: none;
  align-items: center !important;
  justify-content: center !important;
  padding: 24px !important;
  box-sizing: border-box !important;
}

.linfopress-modal-backdrop.active {
  display: flex !important;
}

.linfopress-modal-dialog {
  background: #18181b !important;
  border: 1px solid #3f3f46 !important;
  max-width: 860px !important;
  width: 100% !important;
  max-height: 90vh !important;
  overflow-y: auto !important;
  position: relative !important;
  padding: 36px !important;
  box-sizing: border-box !important;
  color: #ffffff !important;
  box-shadow: 0 25px 60px rgba(0,0,0,0.5) !important;
}

.linfopress-modal-close-btn {
  position: absolute !important;
  top: 20px !important;
  right: 20px !important;
  background: rgba(255,255,255,0.1) !important;
  border: 1px solid rgba(255,255,255,0.2) !important;
  color: #ffffff !important;
  width: 40px !important;
  height: 40px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  font-size: 20px !important;
  transition: all 0.2s ease !important;
}

.linfopress-modal-close-btn:hover {
  background: #ffffff !important;
  color: #0f172a !important;
}

.modal-inner-video {
  width: 100% !important;
  max-height: 380px !important;
  object-fit: cover !important;
  margin-bottom: 20px !important;
  background: #000000 !important;
}

.modal-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 26px !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  margin-bottom: 14px !important;
}

.modal-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  line-height: 1.65 !important;
  color: #d4d4d8 !important;
  margin-bottom: 12px !important;
}

/* 6. PROCEDURE CINEMA */
.linfopress-procedure-section {
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.linfopress-procedure-cinema-box {
  max-width: 1240px !important;
  margin: 0 auto !important;
  position: relative !important;
  cursor: pointer !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12) !important;
  border: 1px solid #e4e4e7 !important;
  overflow: hidden !important;
}

.cinema-media-wrap {
  position: relative !important;
  width: 100% !important;
  height: 560px !important;
  background: #000000 !important;
}

.cinema-bg-video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

.cinema-play-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(0,0,0,0.35) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 16px !important;
  transition: all 0.3s ease !important;
}

.cinema-play-overlay:hover {
  background: rgba(0,0,0,0.2) !important;
}

.cinema-play-button {
  width: 80px !important;
  height: 80px !important;
  background: #ffffff !important;
  color: #0f172a !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
  transition: transform 0.3s ease !important;
}

.cinema-play-overlay:hover .cinema-play-button {
  transform: scale(1.1) !important;
}

.cinema-play-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #ffffff !important;
}

/* 7. ADVANTAGES MATRIX */
.linfopress-advantages-grid-section {
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.linfopress-advantages-row {
  display: grid !important;
  grid-template-columns: 1.2fr 0.8fr !important;
  gap: 48px !important;
  align-items: center !important;
}

@media (max-width: 991px) {
  .linfopress-advantages-row {
    grid-template-columns: 1fr !important;
  }
}

.linfopress-advantages-col-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
}

.adv-item-card {
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
  padding: 18px 24px !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  transition: all 0.25s ease !important;
}

.adv-item-card:hover {
  transform: translateX(6px) !important;
  border-color: #0f172a !important;
  background: #ffffff !important;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06) !important;
}

.adv-index {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 900 !important;
  color: #0f172a !important;
  min-width: 32px !important;
}

.adv-text {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #1e293b !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

.adv-product-photo {
  width: 100% !important;
  height: auto !important;
  object-fit: contain !important;
  display: block !important;
}

/* 8. INDICATIONS MATRIX (SIGNATURE FOOTER GRAY #54595f) */
.linfopress-matrix-section {
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.linfopress-creative-matrix-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 36px !important;
  max-width: 1440px !important;
  margin: 0 auto !important;
}

@media (max-width: 991px) {
  .linfopress-creative-matrix-grid {
    grid-template-columns: 1fr !important;
  }
}

.linfopress-matrix-section .matrix-creative-card {
  background: #54595f !important;
  border: 1px solid #474b50 !important;
  padding: 44px 38px !important;
  box-shadow: 0 16px 40px rgba(0,0,0,0.12) !important;
  display: flex !important;
  flex-direction: column !important;
}

.linfopress-matrix-section .matrix-main-head {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  margin-bottom: 8px !important;
}

.linfopress-matrix-section .matrix-sub-head {
  color: #e2e8f0 !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  margin-bottom: 24px !important;
}

.linfopress-matrix-section .matrix-item-row {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 18px 22px !important;
  margin-bottom: 12px !important;
  display: flex !important;
  align-items: flex-start !important;
  gap: 16px !important;
  transition: all 0.25s ease !important;
}

.linfopress-matrix-section .matrix-item-row:hover {
  border-color: #0f172a !important;
  transform: translateX(4px) !important;
  box-shadow: 0 8px 22px rgba(0,0,0,0.12) !important;
}

.linfopress-matrix-section .item-index {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 900 !important;
  min-width: 24px !important;
}

.linfopress-matrix-section .item-alert-icon {
  color: #64748b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 900 !important;
  min-width: 24px !important;
}

.linfopress-matrix-section .item-title {
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17.5px !important;
  font-weight: 900 !important;
  margin-bottom: 4px !important;
}

.linfopress-matrix-section .item-desc {
  color: #52525b !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  line-height: 1.55 !important;
  margin: 0 !important;
}

/* 9. DOCTOR TRUST */
.linfopress-doctor-section {
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.linfopress-doctor-card {
  display: grid !important;
  grid-template-columns: 380px 1fr !important;
  gap: 48px !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  padding: 48px !important;
  align-items: center !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
}

@media (max-width: 991px) {
  .linfopress-doctor-card {
    grid-template-columns: 1fr !important;
    padding: 32px 24px !important;
  }
}

.doc-portrait-img {
  width: 100% !important;
  height: auto !important;
  object-fit: cover !important;
  border: 1px solid #cbd5e1 !important;
}

.doc-quote-mark {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 56px !important;
  font-weight: 900 !important;
  line-height: 1 !important;
  color: #94a3b8 !important;
  margin-bottom: 8px !important;
}

.doc-quote-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 800 !important;
  line-height: 1.35 !important;
  color: #0f172a !important;
  margin-bottom: 16px !important;
}

.doc-quote-text {
  font-family: 'Inter', sans-serif !important;
  font-size: 16.5px !important;
  line-height: 1.7 !important;
  color: #475569 !important;
  margin-bottom: 24px !important;
}

.doc-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 900 !important;
  color: #0f172a !important;
  margin-bottom: 4px !important;
}

.doc-role {
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #64748b !important;
  margin: 0 !important;
}

/* 10. WHY LINFOPRESS & EQUIPMENT PACKAGE */
.linfopress-why-and-package-section {
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.why-benefits-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 24px !important;
  margin-bottom: 64px !important;
}

@media (max-width: 991px) {
  .why-benefits-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 575px) {
  .why-benefits-grid {
    grid-template-columns: 1fr !important;
  }
}

.why-bento-card {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  padding: 32px 28px !important;
  transition: all 0.3s ease !important;
}

.why-bento-card:hover {
  transform: translateY(-4px) !important;
  border-color: #0f172a !important;
  box-shadow: 0 12px 30px rgba(0,0,0,0.06) !important;
}

.why-num {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 900 !important;
  color: #0f172a !important;
  display: block !important;
  margin-bottom: 12px !important;
}

.why-card-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19px !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  margin-bottom: 10px !important;
}

.why-card-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #64748b !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

.linfopress-package-box {
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  padding: 48px 40px !important;
  text-align: center !important;
}

.package-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 32px !important;
  font-weight: 900 !important;
  color: #0f172a !important;
  margin-bottom: 8px !important;
}

.package-subtitle {
  font-family: 'Inter', sans-serif !important;
  font-size: 17px !important;
  color: #64748b !important;
  margin-bottom: 40px !important;
}

.package-items-grid {
  display: grid !important;
  grid-template-columns: repeat(5, 1fr) !important;
  gap: 20px !important;
}

@media (max-width: 991px) {
  .package-items-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 575px) {
  .package-items-grid {
    grid-template-columns: 1fr !important;
  }
}

.package-item-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  padding: 24px 16px !important;
  text-align: center !important;
  transition: all 0.3s ease !important;
}

.package-item-card:hover {
  transform: translateY(-4px) !important;
  border-color: #0f172a !important;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06) !important;
}

.package-img-wrap {
  width: 100% !important;
  height: 160px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-bottom: 16px !important;
}

.package-img-wrap img {
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
}

.package-item-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  margin: 0 !important;
}

/* 11. FAQ ACCORDION */
.linfopress-faq-section {
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.linfopress-faq-accordion {
  max-width: 1000px !important;
  margin: 0 auto !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}

.linfopress-faq-accordion .faq-accordion-card {
  background: #18181b !important;
  border: 1px solid #3f3f46 !important;
  padding: 28px 32px !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.linfopress-faq-accordion .faq-accordion-card:hover {
  border-color: #71717a !important;
}

.linfopress-faq-accordion .faq-card-header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 20px !important;
}

.linfopress-faq-accordion .faq-q-index {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 900 !important;
  color: #71717a !important;
}

.linfopress-faq-accordion .faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  margin: 0 !important;
  flex: 1 !important;
}

.linfopress-faq-accordion .faq-toggle-icon {
  font-size: 24px !important;
  font-weight: 900 !important;
  color: #ffffff !important;
}

.linfopress-faq-accordion .faq-card-body {
  display: none;
  padding-top: 16px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  line-height: 1.65 !important;
  color: #a1a1aa !important;
}

/* 12. TEST-DRIVE FORM */
.linfopress-partner-stage-section {
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

/* 13. SEO ARTICLE */
.linfopress-seo-clean-section {
  background: #ffffff !important;
  padding: 100px 0 !important;
}
`;

css += '\n' + linfopressStyles;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// ==========================================================================
// 2. UPDATE src/js/main.js WITH LINFOPRESS INTERACTIVE HANDLERS
// ==========================================================================
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const linfopressJsHandlers = `
// ==========================================================================
// LINFOPRESS INTERACTIVE CONTROLS
// ==========================================================================
window.openLinfopressTechModal = function(phaseNum) {
  const overlay = document.getElementById('linfopress-tech-modal-overlay');
  if (!overlay) return;
  
  for (let i = 1; i <= 4; i++) {
    const tab = document.getElementById('lp-modal-tab-' + i);
    if (tab) {
      tab.style.display = (i === phaseNum) ? 'block' : 'none';
      const video = tab.querySelector('video');
      if (video) {
        if (i === phaseNum) {
          video.currentTime = 0;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    }
  }
  
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLinfopressTechModal = function(e) {
  const overlay = document.getElementById('linfopress-tech-modal-overlay');
  if (!overlay) return;
  
  const allVideos = overlay.querySelectorAll('video');
  allVideos.forEach(v => v.pause());
  
  overlay.classList.remove('active');
  document.body.style.overflow = '';
};

window.toggleLinfopressFaq = function(cardEl) {
  const allCards = document.querySelectorAll('.linfopress-faq-accordion .faq-accordion-card');
  const body = cardEl.querySelector('.faq-card-body');
  const icon = cardEl.querySelector('.faq-toggle-icon');
  const isCurrentlyActive = cardEl.classList.contains('active');

  allCards.forEach(c => {
    c.classList.remove('active');
    const b = c.querySelector('.faq-card-body');
    const i = c.querySelector('.faq-toggle-icon');
    if (b) b.style.display = 'none';
    if (i) i.textContent = '+';
  });

  if (!isCurrentlyActive) {
    cardEl.classList.add('active');
    if (body) body.style.display = 'block';
    if (icon) icon.textContent = '−';
  }
};

window.toggleLinfopressSeoArticle = function() {
  const box = document.getElementById('linfopress-seo-expand-box');
  const label = document.getElementById('linfopress-seo-btn-label');
  if (!box || !label) return;

  if (box.style.display === 'block') {
    box.style.display = 'none';
    label.textContent = 'Читати повністю ∨';
  } else {
    box.style.display = 'block';
    label.textContent = 'Приховати ∧';
  }
};
`;

js += '\n' + linfopressJsHandlers;

fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully written Linfopress styles and interactive JS handlers!');

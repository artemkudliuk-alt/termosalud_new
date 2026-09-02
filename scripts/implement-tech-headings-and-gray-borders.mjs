import fs from 'fs';

// ==========================================================================
// 1. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const techAndGrayBordersCss = `
/* ==========================================================================
   TECHNOLOGIES SECTION (CRISP WHITE HEADINGS + GRAPHITE GRAY BORDERS)
   ========================================================================== */
.zionic-tech-bento-section {
  position: relative !important;
  z-index: 10 !important;
  background: #09090b !important;
  padding: 110px 0 !important;
  border-top: none !important;
  border-bottom: 1px solid #27272a !important;
  width: 100% !important;
}

.zionic-tech-bento-section .section-header-centered {
  text-align: center !important;
  max-width: 960px !important;
  margin: 0 auto 56px auto !important;
  padding: 0 20px !important;
}

.zionic-tech-bento-section .luxury-kicker {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #a1a1aa !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.zionic-tech-bento-section .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 3.8vw, 48px) !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 16px 0 !important;
  text-transform: uppercase !important;
}

.zionic-tech-bento-section .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 18.5px !important;
  color: #a1a1aa !important;
  line-height: 1.6 !important;
  margin: 0 auto !important;
  max-width: 860px !important;
}

.tech-bento-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 32px !important;
  max-width: 1300px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 991px) {
  .tech-bento-grid {
    grid-template-columns: 1fr !important;
    gap: 28px !important;
  }
}

.tech-bento-card {
  background: #18181b !important;
  border: 1px solid #3f3f46 !important; /* Elegant Graphite Border matching footer */
  border-radius: 0 !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.25) !important;
  transition: all 0.35s ease !important;
}

.tech-bento-card:hover {
  transform: translateY(-5px) !important;
  border-color: #71717a !important; /* Soft gray highlight on hover */
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.35) !important;
}

.tech-card-media {
  position: relative !important;
  width: 100% !important;
  height: 340px !important;
  background: #000000 !important;
  overflow: hidden !important;
  border-bottom: 1px solid #27272a !important;
}

.tech-card-media video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  display: block !important;
  transition: transform 0.5s ease !important;
}

.tech-bento-card:hover .tech-card-media video {
  transform: scale(1.03) !important;
}

.tech-badge-tag {
  position: absolute !important;
  top: 16px !important;
  left: 16px !important;
  background: #27272a !important;
  color: #f4f4f5 !important;
  border: 1px solid #52525b !important; /* Muted gray border */
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  padding: 6px 14px !important;
  text-transform: uppercase !important;
  border-radius: 0 !important;
  z-index: 2 !important;
}

.tech-card-content {
  padding: 36px 32px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  background: #18181b !important;
}

/* WHITE BOLD HEADINGS */
.tech-card-heading,
.zionic-main-page-wrapper .tech-card-heading,
.zionic-tech-bento-section .tech-card-heading,
.zionic-tech-bento-section h3 {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 23px !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  line-height: 1.3 !important;
  margin: 0 0 10px 0 !important;
  text-transform: none !important;
}

.tech-card-text {
  font-family: 'Inter', sans-serif !important;
  font-size: 15.5px !important;
  color: #a1a1aa !important;
  line-height: 1.65 !important;
  margin: 0 0 14px 0 !important;
}

.tech-bullets-list {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 10px !important;
}

.tech-bullets-list li {
  display: flex !important;
  align-items: flex-start !important;
  gap: 10px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #e4e4e7 !important;
  line-height: 1.5 !important;
}

.tech-bullets-list li .bullet-check {
  font-family: 'Montserrat', sans-serif !important;
  color: #ffffff !important;
  font-weight: 900 !important;
  font-size: 16px !important;
}


/* ==========================================================================
   CERTIFICATES SECTION (HARMONIOUS GRAPHITE GRAY BORDERS MATCHING FOOTER)
   ========================================================================= */
.zionic-certificates-section {
  position: relative !important;
  z-index: 21 !important;
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.cert-scan-card {
  background: #ffffff !important;
  border: 1px solid #d4d4d8 !important; /* Elegant Soft Gray Border */
  padding: 24px !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.cert-scan-card:hover {
  border-color: #52525b !important; /* Deep Graphite Accent on hover */
  transform: translateY(-4px) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.09) !important;
}

.cert-scan-frame {
  position: relative !important;
  width: 100% !important;
  height: 480px !important;
  background: #f8fafc !important;
  border: 1px solid #e4e4e7 !important; /* Soft Slate Border */
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 12px !important;
  box-sizing: border-box !important;
  cursor: zoom-in !important;
}

.cert-scan-badge {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  color: #ffffff !important;
  background: #27272a !important; /* Footer tone background */
  border: 1px solid #52525b !important; /* Graphite Border */
  padding: 5px 12px !important;
  margin-bottom: 8px !important;
  width: fit-content !important;
}

.cert-zoom-overlay {
  position: absolute !important;
  bottom: 14px !important;
  right: 14px !important;
  background: rgba(39, 39, 42, 0.92) !important; /* Graphite background in footer tone */
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  color: #ffffff !important;
  border: 1px solid #52525b !important; /* Graphite border */
  padding: 8px 14px !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  transition: all 0.25s ease !important;
  pointer-events: none !important;
}

.cert-scan-card:hover .cert-zoom-overlay {
  background: #27272a !important;
  border-color: #71717a !important;
  transform: scale(1.04) !important;
}
`;

css += '\n' + techAndGrayBordersCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully updated CSS with white headings and distributed graphite gray borders matching the footer tone!');

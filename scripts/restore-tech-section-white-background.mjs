import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const whiteTechSectionCss = `
/* ==========================================================================
   TECHNOLOGIES SECTION (RESTORED CLEAN WHITE BACKGROUND + DARK HEADINGS)
   ========================================================================== */
.zionic-tech-bento-section {
  position: relative !important;
  z-index: 10 !important;
  background: #ffffff !important; /* Pure clean white background as original */
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
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
  color: #71717a !important;
  text-transform: uppercase !important;
  margin-bottom: 12px !important;
}

.zionic-tech-bento-section .section-main-title,
.zionic-main-page-wrapper .zionic-tech-bento-section .section-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 3.8vw, 48px) !important;
  font-weight: 900 !important;
  color: #111111 !important; /* Obsidian Dark Main Title */
  line-height: 1.2 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 16px 0 !important;
  text-transform: uppercase !important;
}

.zionic-tech-bento-section .section-main-sub {
  font-family: 'Inter', sans-serif !important;
  font-size: 18.5px !important;
  color: #52525b !important;
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
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.12) !important;
  transition: all 0.35s ease !important;
}

.tech-bento-card:hover {
  transform: translateY(-5px) !important;
  border-color: #71717a !important;
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.2) !important;
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
  border: 1px solid #52525b !important;
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

/* WHITE BOLD HEADINGS INSIDE DARK CARDS */
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
`;

const markerTech = '/* ==========================================================================\n   TECHNOLOGIES SECTION';
if (css.includes(markerTech)) {
  const p1 = css.substring(0, css.indexOf(markerTech));
  const p2 = css.substring(css.indexOf('/* ==========================================================================\n   CERTIFICATES SECTION'));
  css = p1 + whiteTechSectionCss + '\n\n' + p2;
} else {
  css += '\n' + whiteTechSectionCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully restored pure white background for the Technologies section!');

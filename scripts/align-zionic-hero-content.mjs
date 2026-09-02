import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const updatedHeroCss = `
/* ==========================================================================
   ZIONIC HERO: ENTIRE CONTENT BLOCK SHIFTED RIGHT BY 100PX (PERFECT LEFT ALIGN)
   ========================================================================== */
.zionic-official-hero {
  position: relative;
  width: 100%;
  min-height: calc(100vh - 72px);
  min-height: calc(100dvh - 72px);
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 60px 0;
  box-sizing: border-box;
}

.zionic-hero-bg-media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

.zionic-hero-bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.zionic-hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 2;
  pointer-events: none;
}

.zionic-hero-container {
  position: relative;
  z-index: 3;
  width: 100%;
}

.zionic-hero-content {
  max-width: 820px;
  margin-left: clamp(100px, 8vw, 140px) !important; /* Entire block shifted right by 100px */
}

@media (max-width: 767px) {
  .zionic-hero-content {
    margin-left: 16px !important;
  }
}

.zionic-hero-logo-wrap {
  margin-bottom: 24px;
  margin-left: 0 !important; /* Aligned with text */
}

.zionic-official-logo {
  height: clamp(68px, 6.8vw, 98px) !important;
  width: auto !important;
  max-width: 420px !important;
  display: block !important;
  object-fit: contain;
}

.zionic-hero-title {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  font-family: 'Montserrat', 'Golos Text', sans-serif !important;
  font-size: clamp(56px, 6.4vw, 96px) !important;
  font-weight: 900 !important;
  line-height: 0.96 !important;
  letter-spacing: -2px !important;
  margin: 0 0 20px 0 !important;
  text-transform: uppercase !important;
  text-shadow: none !important;
  color: #111111 !important;
}

.zionic-hero-title .zionic-word-top,
.zionic-hero-title .zionic-word-bottom,
.zionic-hero-title span {
  display: block !important;
  white-space: nowrap !important;
  color: #111111 !important;
  font-weight: 900 !important;
  font-size: inherit !important;
  line-height: inherit !important;
  letter-spacing: inherit !important;
}

.zionic-hero-desc {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(16px, 1.6vw, 21px) !important;
  font-weight: 800 !important;
  color: #111111 !important;
  line-height: 1.35 !important;
  letter-spacing: 0.8px !important;
  text-transform: uppercase !important;
  margin: 0 0 32px 0 !important;
  max-width: 680px !important;
}

.zionic-hero-actions {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.zionic-hero-actions .zionic-primary-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 12px !important;
  background: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #111111 !important;
  border-radius: 0 !important;
  padding: 16px 32px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 0.8px !important;
  text-transform: uppercase !important;
  text-decoration: none !important;
  transition: all 0.2s ease !important;
}

.zionic-hero-actions .zionic-primary-btn:hover {
  background: #27272a !important;
  transform: translateY(-2px);
}

.zionic-hero-actions .zionic-secondary-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  background: #ffffff !important;
  color: #111111 !important;
  border: 1px solid #111111 !important;
  border-radius: 0 !important;
  padding: 16px 28px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  letter-spacing: 0.8px !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
}

.zionic-hero-actions .zionic-secondary-btn:hover {
  background: #111111 !important;
  color: #ffffff !important;
}
`;

const marker = '/* ==========================================================================\n   ZIONIC HERO: ENLARGED TITLE';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + updatedHeroCss;
} else {
  css += '\n' + updatedHeroCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Aligned text with logo and shifted entire block right by 100px.');

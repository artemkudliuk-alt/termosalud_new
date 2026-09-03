import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const heroStyles = `
/* ==========================================================================
   ZIONIC HERO ORIGINAL EXACT TYPOGRAPHY & LAYOUT
   ========================================================================== */
.zionic-hero-logo-wrap {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 6px !important;
  margin-bottom: 24px !important;
}

.zionic-hero-sublogo-tag {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #18181b !important;
  letter-spacing: 0.2px !important;
  text-transform: none !important;
}

.zionic-official-hero .zionic-hero-title,
html body.template-zionic .zionic-hero-title {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(36px, 4.2vw, 64px) !important;
  font-weight: 800 !important;
  line-height: 1.15 !important;
  color: #18181b !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 20px 0 !important;
  display: block !important;
}

.zionic-official-hero .zionic-hero-desc,
html body.template-zionic .zionic-hero-desc {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(16px, 1.35vw, 19px) !important;
  font-weight: 500 !important;
  color: #18181b !important;
  line-height: 1.45 !important;
  max-width: 620px !important;
  margin: 0 0 32px 0 !important;
}

.zionic-official-hero .zionic-primary-btn {
  background: #18181b !important;
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  padding: 16px 32px !important;
  border-radius: 4px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.25s ease !important;
}

.zionic-official-hero .zionic-primary-btn:hover {
  background: #000000 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
}
`;

css += '\n' + heroStyles;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended original Zionic hero styles');

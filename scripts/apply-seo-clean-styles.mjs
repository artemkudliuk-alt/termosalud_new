import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const seoCleanStyles = `
/* ==========================================================================
   SEAMLESS PURE WHITE PARTNER FORM + EDITORIAL SEO SECTION (NO DIVIDER LINE)
   ========================================================================== */
html body.template-linfopress .linfopress-partner-stage-section,
.linfopress-partner-stage-section {
  background: #ffffff !important; /* PURE WHITE CONTINUOUS CANVAS */
  border-top: none !important;
  border-bottom: none !important;
  border: none !important;
  padding-bottom: 40px !important;
}

html body.template-linfopress .linfopress-seo-clean-section,
.linfopress-seo-clean-section {
  background: #ffffff !important; /* SAME WHITE BACKGROUND */
  border-top: none !important; /* REMOVE DIVIDER LINE COMPLETELY */
  border-bottom: none !important;
  border: none !important;
  padding: 40px 0 100px 0 !important;
}

/* TYPOGRAPHY ADAPTATION MATCHING MAIN PAGE & ZIONIC */
html body.template-linfopress .seo-article-card {
  max-width: 1100px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

html body.template-linfopress .seo-article-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(26px, 3.2vw, 38px) !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  line-height: 1.3 !important;
  letter-spacing: -0.5px !important;
  text-transform: none !important; /* NO SCREAMING ALL-CAPS */
  margin: 0 0 24px 0 !important;
}

html body.template-linfopress .seo-article-card p {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #475569 !important;
  line-height: 1.75 !important;
  margin: 0 0 20px 0 !important;
}

html body.template-linfopress .seo-article-sub-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  line-height: 1.35 !important;
  margin: 36px 0 16px 0 !important;
}

html body.template-linfopress .seo-article-bullets {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 24px 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
}

html body.template-linfopress .seo-article-bullets li {
  position: relative !important;
  padding-left: 24px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 15.5px !important;
  color: #475569 !important;
  line-height: 1.7 !important;
}

html body.template-linfopress .seo-article-bullets li::before {
  content: "•" !important;
  position: absolute !important;
  left: 6px !important;
  top: 0 !important;
  color: #0f172a !important;
  font-weight: 900 !important;
  font-size: 20px !important;
}

html body.template-linfopress .seo-article-bullets li strong {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
}

/* SIGNATURE LUXURY BLACK BUTTON */
html body.template-linfopress .seo-toggle-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 10px !important;
  background: #0f172a !important;
  color: #ffffff !important;
  border: 1.5px solid #0f172a !important;
  padding: 14px 28px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  font-weight: 700 !important;
  letter-spacing: 1px !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  border-radius: 0px !important; /* STRICT 0PX SHARP CORNERS */
  margin-top: 14px !important;
  transition: all 0.25s ease !important;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15) !important;
}

html body.template-linfopress .seo-toggle-btn:hover {
  background: #ffffff !important;
  color: #0f172a !important;
  border-color: #0f172a !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2) !important;
}

html body.template-linfopress .seo-toggle-btn .seo-btn-arrow {
  font-size: 14px !important;
  font-weight: 800 !important;
  transition: transform 0.25s ease !important;
}
`;

css += '\n' + seoCleanStyles;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written SEO clean styles in custom.css!');

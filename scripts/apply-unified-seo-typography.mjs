import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const unifiedTypographyCss = `
/* ==========================================================================
   UNIFIED EDITORIAL SEO SECTION TYPOGRAPHY & SPACING (MATCHING SCREENSHOT 1 & MAIN PAGE)
   ========================================================================== */

/* 1. LUXURIOUS BREATHING SPACE FROM PARTNER CARDS TO SEO TITLE (SCREENSHOT 3) */
html body.template-linfopress .linfopress-partner-stage-section,
html body.template-zionic .zionic-partner-stage-section,
.zionic-partner-stage-section {
  padding-bottom: 80px !important;
  background: #ffffff !important;
  border-bottom: none !important;
}

html body.template-linfopress .seo-clean-section,
html body.template-zionic .seo-clean-section,
.seo-clean-section,
#seo-article {
  background: #ffffff !important;
  border-top: none !important;
  border-bottom: none !important;
  border: none !important;
  padding: 90px 0 120px 0 !important; /* GENEROUS SPACE BEFORE TITLE AS REQUESTED IN SCREENSHOT 3 */
}

/* 2. CARD CONTAINER: EDITORIAL LEFT-ALIGNED (MATCHING SCREENSHOT 1) */
html body.template-linfopress .seo-article-card,
html body.template-zionic .seo-article-card,
.seo-article-card {
  max-width: 1100px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
  text-align: left !important;
}

/* 3. HEADINGS: EXACTLY LIKE SCREENSHOT 1 & MAIN PAGE (SENTENCE CASE, NOT ALL-CAPS, LEFT-ALIGNED) */
html body.template-linfopress section#seo-article h2.seo-article-main-title,
html body.template-linfopress section#seo-article h2,
html body.template-linfopress .seo-clean-section h2,
html body.template-linfopress .seo-article-main-title,
html body.template-zionic section#seo-article h2.seo-article-main-title,
html body.template-zionic section#seo-article h2,
html body.template-zionic .seo-clean-section h2,
html body.template-zionic .seo-article-main-title,
.seo-clean-section .seo-article-main-title,
#seo-article .seo-article-main-title {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: clamp(28px, 3.2vw, 38px) !important;
  font-weight: 800 !important;
  color: #0f172a !important;
  line-height: 1.25 !important;
  letter-spacing: -0.5px !important;
  text-transform: none !important; /* STRICT SENTENCE CASE AS IN SCREENSHOT 1 */
  text-align: left !important;
  margin: 0 0 24px 0 !important;
}

/* 4. SUBHEADINGS INSIDE ARTICLE */
html body.template-linfopress .seo-article-sub-title,
html body.template-zionic .seo-article-sub-title,
.seo-article-sub-title {
  font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
  line-height: 1.35 !important;
  text-transform: none !important;
  text-align: left !important;
  margin: 36px 0 16px 0 !important;
}

/* 5. BODY PARAGRAPHS & BULLETS: HIGH READABILITY */
html body.template-linfopress .seo-article-card p,
html body.template-zionic .seo-article-card p,
.seo-article-card p {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: 16px !important;
  color: #475569 !important;
  line-height: 1.75 !important;
  margin: 0 0 20px 0 !important;
  text-align: left !important;
}

html body.template-linfopress .seo-article-bullets,
html body.template-zionic .seo-article-bullets,
.seo-article-bullets {
  list-style: none !important;
  padding: 0 !important;
  margin: 0 0 24px 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
}

html body.template-linfopress .seo-article-bullets li,
html body.template-zionic .seo-article-bullets li,
.seo-article-bullets li {
  position: relative !important;
  padding-left: 24px !important;
  font-family: 'Inter', sans-serif !important;
  font-size: 15.5px !important;
  color: #475569 !important;
  line-height: 1.7 !important;
  text-align: left !important;
}

html body.template-linfopress .seo-article-bullets li::before,
html body.template-zionic .seo-article-bullets li::before,
.seo-article-bullets li::before {
  content: "•" !important;
  position: absolute !important;
  left: 6px !important;
  top: 0 !important;
  color: #0f172a !important;
  font-weight: 900 !important;
  font-size: 20px !important;
}

html body.template-linfopress .seo-article-bullets li strong,
html body.template-zionic .seo-article-bullets li strong,
.seo-article-bullets li strong {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #0f172a !important;
}

/* 6. SIGNATURE BUTTON: MATCHING ON BOTH PAGES */
html body.template-linfopress .seo-toggle-btn,
html body.template-zionic .seo-toggle-btn,
.seo-toggle-btn {
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
  border-radius: 0px !important;
  margin-top: 14px !important;
  transition: all 0.25s ease !important;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15) !important;
}

html body.template-linfopress .seo-toggle-btn:hover,
html body.template-zionic .seo-toggle-btn:hover,
.seo-toggle-btn:hover {
  background: #ffffff !important;
  color: #0f172a !important;
  border-color: #0f172a !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.2) !important;
}
`;

css += '\n' + unifiedTypographyCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written unified typography & spacing styles in custom.css!');

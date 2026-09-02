import fs from 'fs';

// ==========================================================================
// 1. UPDATE src/js/main.js (FIX LIGHTBOX SCROLL JUMP)
// ==========================================================================
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const updatedCertLightboxJs = `
// ==========================================================================
// CERTIFICATE FULLSCREEN LIGHTBOX HANDLERS (ZERO SCROLL JUMP)
// ==========================================================================
window._savedCertScrollTop = 0;

window.openCertLightbox = function(imgSrc, captionText) {
  const modal = document.getElementById('certLightboxModal');
  const img = document.getElementById('certLightboxImg');
  const caption = document.getElementById('certLightboxCaption');
  if (!modal || !img) return;

  // Save current scroll position
  window._savedCertScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  img.src = imgSrc;
  if (caption) caption.textContent = captionText || '';
  
  modal.classList.add('is-open');
};

window.closeCertLightbox = function(e) {
  if (e && e.target && e.target.closest('.cert-lightbox-dialog') && !e.target.classList.contains('cert-lightbox-close')) return;
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }
  
  const modal = document.getElementById('certLightboxModal');
  if (!modal) return;
  
  modal.classList.remove('is-open');

  // Seamlessly restore scroll position without page jumping to top
  if (typeof window._savedCertScrollTop === 'number') {
    window.scrollTo({
      top: window._savedCertScrollTop,
      behavior: 'instant'
    });
  }
};

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('certLightboxModal');
    if (modal && modal.classList.contains('is-open')) {
      window.closeCertLightbox();
    }
  }
});
`;

const markerJsStart = '// ==========================================================================\n// CERTIFICATE FULLSCREEN LIGHTBOX HANDLERS';
if (js.includes(markerJsStart)) {
  const p1 = js.substring(0, js.indexOf(markerJsStart));
  const p2 = js.substring(js.indexOf('// SEO Article Toggle') > -1 ? js.indexOf('// SEO Article Toggle') : js.indexOf('window.toggleZionicSeoArticle'));
  js = p1 + updatedCertLightboxJs.trim() + '\n\n' + p2;
} else {
  js = updatedCertLightboxJs + '\n' + js;
}

fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

// ==========================================================================
// 2. UPDATE src/css/custom.css (RESTORE SLIDE-OVER AND REMOVE GRADIENT)
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const heroAndManipulaSlideCss = `
/* ==========================================================================
   HERO STICKY CURTAIN SLIDE-OVER + NO GRADIENT ON 2ND SCREEN
   ========================================================================== */
.zionic-official-hero {
  position: sticky !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100vh !important;
  min-height: 700px !important;
  z-index: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
}

.zionic-manipula-fullscreen-section {
  position: relative !important;
  z-index: 10 !important;
  width: 100% !important;
  max-width: 100vw !important;
  background: #1c1c1e !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
  box-shadow: none !important;
  border: none !important;
}

.manipula-fullscreen-wrapper {
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  display: block !important;
  background: #1c1c1e !important;
  box-shadow: none !important;
  border: none !important;
}

.manipula-fullscreen-img {
  width: 100% !important;
  min-width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
  border-radius: 0 !important;
  border: none !important;
  box-shadow: none !important;
  filter: none !important;
}

/* Ensure all subsequent sections have solid opaque backgrounds & higher z-index so Hero never bleeds */
.zionic-treatments-fullscreen-section,
.zionic-ba-section,
.zionic-partner-stage-section,
.zionic-doctors-section,
.zionic-faq-section,
.zionic-certificates-section,
.zionic-seo-clean-section,
.footer,
footer {
  position: relative !important;
  z-index: 10 !important;
}
`;

const bulletproofResetMarker = '/* ==========================================================================\n   BULLETPROOF ZERO-BLEED FLOW RESET';
if (css.includes(bulletproofResetMarker)) {
  const p1 = css.substring(0, css.indexOf(bulletproofResetMarker));
  css = p1 + heroAndManipulaSlideCss;
} else {
  css += '\n' + heroAndManipulaSlideCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully updated JS (no scroll jump on lightbox close) and CSS (hero slide-over curtain restored, gradient removed)!');

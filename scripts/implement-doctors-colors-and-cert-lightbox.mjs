import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Update Certificates HTML with zoom click and indicator badge
const updatedCertsHtml = `
      <!-- 12. DOCUMENTS & CERTIFICATES WITH FULLSCREEN LIGHTBOX -->
      <section class="zionic-certificates-section" id="certificates">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ОФІЦІЙНА ДОКУМЕНТАЦІЯ</span>
            <h2 class="section-main-title">Документи та сертифікати</h2>
            <p class="section-main-sub">Офіційне підтвердження безпеки, відповідності міжнародним стандартам якості та реєстрація в МОЗ України</p>
          </div>

          <div class="zionic-cert-scans-grid">
            <!-- Cert 1: Ukraine -->
            <div class="cert-scan-card" onclick="openCertLightbox('/zionic_cert_ukraine.png', 'Сертифікат відповідності МОЗ України / ПолітехМед (UA.TR.101)')">
              <div class="cert-scan-frame">
                <img src="/zionic_cert_ukraine.png" alt="Сертифікат відповідності МОЗ України" loading="lazy">
                <div class="cert-zoom-overlay">
                  <span class="cert-zoom-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  </span>
                  <span class="cert-zoom-text">Натисніть для збільшення</span>
                </div>
              </div>
              <div class="cert-scan-info">
                <div class="cert-scan-badge">UA.TR.101 • МОЗ України</div>
                <h4 class="cert-scan-title">Сертифікат відповідності (ПолітехМед)</h4>
                <p class="cert-scan-desc">Державна реєстрація медичного виробу ZIONIC AESTHETIC в Україні. Повна відповідність Технічному регламенту.</p>
              </div>
            </div>

            <!-- Cert 2: FDA / International -->
            <div class="cert-scan-card" onclick="openCertLightbox('/zionic_cert_fda.png', 'Declaration of Conformity FDA (USA & CE 0120)')">
              <div class="cert-scan-frame">
                <img src="/zionic_cert_fda.png" alt="Declaration of Conformity FDA" loading="lazy">
                <div class="cert-zoom-overlay">
                  <span class="cert-zoom-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                  </span>
                  <span class="cert-zoom-text">Натисніть для збільшення</span>
                </div>
              </div>
              <div class="cert-scan-info">
                <div class="cert-scan-badge">FDA 510(k) • CE Medical</div>
                <h4 class="cert-scan-title">Declaration of Conformity FDA (USA)</h4>
                <p class="cert-scan-desc">Офіційне схвалення FDA США та міжнародні сертифікати безпеки IEC 60601-1, ISO 10993-1, ISO 13485:2016.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
`;

const regexCertSection = /<!--\s*12\.\s*DOCUMENTS[\s\S]*?<\/section>/;
if (regexCertSection.test(htmlMjs)) {
  htmlMjs = htmlMjs.replace(regexCertSection, updatedCertsHtml.trim());
}

// Add Lightbox Modal container right before </body> if not present
const certLightboxModalHtml = `
    <!-- CERTIFICATE FULLSCREEN LIGHTBOX MODAL -->
    <div class="cert-lightbox-modal" id="certLightboxModal" onclick="closeCertLightbox(event)">
      <button type="button" class="cert-lightbox-close" onclick="closeCertLightbox(event)" aria-label="Закрити">✕</button>
      <div class="cert-lightbox-dialog" onclick="event.stopPropagation()">
        <div class="cert-lightbox-img-wrap">
          <img src="" id="certLightboxImg" alt="Сертифікат у повному розмірі">
        </div>
        <div class="cert-lightbox-caption" id="certLightboxCaption"></div>
      </div>
    </div>
`;

if (!htmlMjs.includes('id="certLightboxModal"')) {
  htmlMjs = htmlMjs.replace('</body>', `${certLightboxModalHtml}\n</body>`);
}

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

// ==========================================================================
// 2. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const updatedDoctorsAndCertCss = `
/* ==========================================================================
   DOCTORS CARDS (PURE WHITE LUXURY CARDS WITH HIGH CONTRAST TEXT)
   ========================================================================== */
.zionic-doctors-section {
  position: relative !important;
  z-index: 19 !important;
  background: #f4f4f5 !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-doctors-section .section-header-centered {
  text-align: center !important;
  max-width: 960px !important;
  margin: 0 auto 56px auto !important;
  padding: 0 20px !important;
}

.zionic-doctors-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 30px !important;
  max-width: 1400px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 991px) {
  .zionic-doctors-grid {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
    max-width: 560px !important;
  }
}

.doctor-luxury-card {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04) !important;
  transition: all 0.35s ease !important;
}

.doctor-luxury-card:hover {
  transform: translateY(-6px) !important;
  border-color: #111111 !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.1) !important;
}

.doctor-photo-frame {
  position: relative !important;
  width: 100% !important;
  height: 380px !important;
  overflow: hidden !important;
  background: #f8fafc !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.doctor-photo-frame img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center top !important;
  display: block !important;
  transition: transform 0.5s ease !important;
}

.doctor-luxury-card:hover .doctor-photo-frame img {
  transform: scale(1.04) !important;
}

.doctor-card-info {
  padding: 26px 24px 30px 24px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 6px !important;
  background: #ffffff !important;
}

.doctor-header-row {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 12px !important;
  margin-bottom: 4px !important;
}

.doctor-name,
.zionic-main-page-wrapper .doctor-name {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 21px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 !important;
  line-height: 1.25 !important;
}

.doctor-phd-badge {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  border: 1px solid #d4d4d8 !important;
  padding: 4px 10px !important;
  border-radius: 0 !important;
  text-transform: uppercase !important;
}

.doctor-specialty {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  margin: 0 !important;
  line-height: 1.4 !important;
}

.doctor-clinic {
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #52525b !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}


/* ==========================================================================
   CERTIFICATES ZOOM & FULLSCREEN LIGHTBOX
   ========================================================================== */
.zionic-certificates-section {
  position: relative !important;
  z-index: 21 !important;
  background: #ffffff !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-cert-scans-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 40px !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 0 24px !important;
  box-sizing: border-box !important;
}

@media (max-width: 767px) {
  .zionic-cert-scans-grid {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
}

.cert-scan-card {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 24px !important;
  border-radius: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
}

.cert-scan-card:hover {
  border-color: #111111 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.1) !important;
}

.cert-scan-frame {
  position: relative !important;
  width: 100% !important;
  height: 480px !important;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  overflow: hidden !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 12px !important;
  box-sizing: border-box !important;
  cursor: zoom-in !important;
}

.cert-scan-frame img {
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
  display: block !important;
  transition: transform 0.3s ease !important;
}

/* Elegant Zoom Overlay on hover */
.cert-zoom-overlay {
  position: absolute !important;
  bottom: 14px !important;
  right: 14px !important;
  background: rgba(17, 17, 17, 0.88) !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
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
  background: #111111 !important;
  border-color: #ffffff !important;
  transform: scale(1.05) !important;
}

.cert-zoom-icon {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  color: #ffffff !important;
}

.cert-scan-badge {
  display: inline-block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  border: 1px solid #d4d4d8 !important;
  padding: 5px 12px !important;
  margin-bottom: 8px !important;
  width: fit-content !important;
}

.cert-scan-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 8px 0 !important;
  line-height: 1.3 !important;
}

.cert-scan-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 14.5px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* ==========================================================================
   FULLSCREEN CERTIFICATE LIGHTBOX MODAL
   ========================================================================== */
.cert-lightbox-modal {
  position: fixed !important;
  inset: 0 !important;
  z-index: 999999 !important;
  background: rgba(10, 10, 12, 0.92) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 24px !important;
  opacity: 0 !important;
  pointer-events: none !important;
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  box-sizing: border-box !important;
}

.cert-lightbox-modal.is-open {
  opacity: 1 !important;
  pointer-events: auto !important;
}

.cert-lightbox-dialog {
  position: relative !important;
  max-width: 92vw !important;
  max-height: 92vh !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  animation: modalScaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

@keyframes modalScaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.cert-lightbox-close {
  position: fixed !important;
  top: 24px !important;
  right: 28px !important;
  width: 48px !important;
  height: 48px !important;
  background: rgba(255, 255, 255, 0.12) !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
  color: #ffffff !important;
  font-size: 22px !important;
  font-weight: 300 !important;
  border-radius: 0 !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.25s ease !important;
  z-index: 1000000 !important;
}

.cert-lightbox-close:hover {
  background: #ffffff !important;
  color: #111111 !important;
  transform: scale(1.06) !important;
}

.cert-lightbox-img-wrap {
  position: relative !important;
  max-width: 88vw !important;
  max-height: 82vh !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background: #ffffff !important;
  padding: 12px !important;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
}

.cert-lightbox-img-wrap img {
  max-width: 100% !important;
  max-height: 80vh !important;
  object-fit: contain !important;
  display: block !important;
}

.cert-lightbox-caption {
  margin-top: 14px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  text-align: center !important;
  letter-spacing: 0.5px !important;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8) !important;
}
`;

// Replace in custom.css
const markerDoc = '/* ==========================================================================\n   DOCTORS CARDS';
if (css.includes(markerDoc)) {
  const nextMarker = '/* 4. MODERN SEO EXPANDABLE ARTICLE */';
  const before = css.substring(0, css.indexOf(markerDoc));
  const after = css.substring(css.indexOf(nextMarker));
  css = before + updatedDoctorsAndCertCss + '\n\n' + after;
} else {
  // Replace old zionic-doctors-section if present
  const startMarker = '/* 1. DOCTORS & EXPERT REVIEWS */';
  const nextMarker = '/* 4. MODERN SEO EXPANDABLE ARTICLE */';
  if (css.includes(startMarker) && css.includes(nextMarker)) {
    const before = css.substring(0, css.indexOf(startMarker));
    const after = css.substring(css.indexOf(nextMarker));
    css = before + updatedDoctorsAndCertCss + '\n\n' + after;
  } else {
    css += '\n' + updatedDoctorsAndCertCss;
  }
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// ==========================================================================
// 3. UPDATE src/js/main.js
// ==========================================================================
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const certLightboxJs = `
// ==========================================================================
// CERTIFICATE FULLSCREEN LIGHTBOX HANDLERS
// ==========================================================================
window.openCertLightbox = function(imgSrc, captionText) {
  const modal = document.getElementById('certLightboxModal');
  const img = document.getElementById('certLightboxImg');
  const caption = document.getElementById('certLightboxCaption');
  if (!modal || !img) return;
  img.src = imgSrc;
  if (caption) caption.textContent = captionText || '';
  modal.classList.add('is-open');
  document.documentElement.classList.add('modal-open-lock');
  document.body.classList.add('modal-open-lock');
};

window.closeCertLightbox = function(e) {
  if (e && e.target && e.target.closest('.cert-lightbox-dialog') && !e.target.classList.contains('cert-lightbox-close')) return;
  const modal = document.getElementById('certLightboxModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  document.documentElement.classList.remove('modal-open-lock');
  document.body.classList.remove('modal-open-lock');
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

if (!js.includes('window.openCertLightbox')) {
  js = certLightboxJs + '\n' + js;
}

fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully implemented high contrast Doctor cards and Certificate Fullscreen Lightbox with magnifying glass icon!');

import fs from 'fs';

// 1. Update scripts/process-html.mjs with Certificates & FAQ & SEO sections
let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const updatedTailSections = `      <!-- 10. FAQ ACCORDION (MAIN PAGE LUXURY STYLE) -->
      <section class="zionic-faq-section" id="faq">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ВІДПОВІДІ НА ЗАПИТАННЯ</span>
            <h2 class="section-main-title">Часті питання про ZIONIC</h2>
            <p class="section-main-sub">Ключові аспекти технології, протоколів та економіки обладнання</p>
          </div>

          <div class="faq-accordion-grid">
            <div class="faq-accordion-card active">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Скільки процедур потрібно для помітного результату?</span>
                <span class="faq-icon">−</span>
              </button>
              <div class="faq-answer-body" style="display: block;">
                <p>Перші зміни у тонусі шкіри та зняття набряклості помітні вже після 1–2 сеансів. Стійкий виражений ефект зменшення об'ємів та лікування целюліту досягається за курс із 6–10 процедур з інтервалом 2–3 рази на тиждень.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Чи відчуває пацієнт біль під час процедури ZIONIC?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Ні, процедура абсолютно безболісна та фізіологічна. Пацієнт відчуває приємне глибоке тепло та розслаблюючий ротаційний масаж. Відсутні будь-які синці, печіння чи гематоми.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Які витратні матеріали потрібні для роботи?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Апарат не вимагає дорогих змінних картриджів або одноразових лінз. Використовується лише спеціальний контактний гліцериновий крем TermoSalud для ковзання маніпули та забезпечення провідності RF.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Які умови гарантії та сервісного обслуговування?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>TermoSalud надає 2 роки повної офіційної гарантії. Наш офіційний сервісний центр у Києві забезпечує постійну технічну підтримку та надання підмінного апарату на час регламентних робіт.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. CERTIFICATES & QUALITY STANDARDS -->
      <section class="zionic-certificates-section" id="certificates">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">МІЖНАРОДНА СЕРТИФІКАЦІЯ</span>
            <h2 class="section-main-title">Безпека та медичні стандарти</h2>
            <p class="section-main-sub">Обладнання TermoSalud відповідає найвищим світовим стандартам медичної галузі</p>
          </div>

          <div class="zionic-cert-cards-grid">
            <div class="zionic-cert-card">
              <div class="cert-card-badge">FDA</div>
              <h4 class="cert-card-title">FDA Approved (США)</h4>
              <p class="cert-card-desc">Офіційне схвалення Управлінням з контролю за продуктами та ліками США для неінвазивної корекції фігури.</p>
            </div>

            <div class="zionic-cert-card">
              <div class="cert-card-badge">CE 0120</div>
              <h4 class="cert-card-title">CE Medical Directive</h4>
              <p class="cert-card-desc">Європейський сертифікат відповідності медичного обладнання найвищого класу безпеки та ефективності.</p>
            </div>

            <div class="zionic-cert-card">
              <div class="cert-card-badge">ISO 13485</div>
              <h4 class="cert-card-title">ISO 13485:2016</h4>
              <p class="cert-card-desc">Міжнародний стандарт системи управління якістю для виробників медичних виробів та обладнання.</p>
            </div>

            <div class="zionic-cert-card">
              <div class="cert-card-badge">UA MED</div>
              <h4 class="cert-card-title">Сертифіковано в Україні</h4>
              <p class="cert-card-desc">Повна відповідність Технічному регламенту щодо медичних виробів та реєстрація в МОЗ України.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 12. SEO INFORMATION SECTION -->
      <section class="zionic-seo-clean-section">
        <div class="container">
          <div class="seo-clean-box">
            <h3 class="seo-clean-title">Купити апарат Zionic (Rollactive RF) для корекції фігури в Україні</h3>
            <p class="seo-clean-text">
              Офіційний дистриб'ютор TermoSalud в Україні пропонує оригінальний апарат преміум-класу Zionic для медичних центрів, клінік естетичної медицини та SPA-комплексів. Поєднання резистивного монополярного радіочастотного ліфтингу з глибоким ротаційним масажем MARP гарантує неперевершені результати корекції фігури та омолодження тіла.
            </p>
          </div>
        </div>
      </section>`;

// Replace FAQ and SEO section with updatedTailSections in scripts/process-html.mjs
processCode = processCode.replace(/<!-- 10\. FAQ ACCORDION[\s\S]*?<\/section>\s*<!-- 11\. SEO & CERTIFICATES[\s\S]*?<\/section>/i, updatedTailSections);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS adjustments in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Remove sticky hero styles that caused hero to stick underneath subsequent screens
const nonStickyHeroCss = `
/* ==========================================================================
   ZIONIC PAGE CLEAN STACKING & FLOW (NO STICKY BLEED-THROUGH)
   ========================================================================== */
.zionic-official-hero {
  position: relative !important;
  z-index: 2 !important;
  width: 100% !important;
  min-height: calc(100vh - 72px) !important;
  background: #000000 !important;
  overflow: hidden !important;
}

.zionic-infinite-ticker-section,
.zionic-tech-bento-section,
.zionic-manipula-fullscreen-section,
.zionic-ba-section,
.zionic-procedure-showcase-section,
.zionic-treatments-fullscreen-section,
.zionic-matrix-section,
.zionic-video-fullscreen-banner,
.zionic-partner-stage-section,
.zionic-faq-section,
.zionic-certificates-section,
.zionic-seo-clean-section {
  position: relative !important;
  z-index: 5 !important;
  width: 100% !important;
  background-color: #ffffff;
}

.zionic-infinite-ticker-section,
.zionic-manipula-fullscreen-section,
.zionic-video-fullscreen-banner {
  background-color: #000000 !important;
}

.zionic-treatments-fullscreen-section,
.zionic-matrix-section,
.zionic-partner-stage-section,
.zionic-certificates-section {
  background-color: #f4f4f5 !important;
}

/* ==========================================================================
   ZIONIC FAQ LUXURY STYLES
   ========================================================================== */
.zionic-faq-section {
  padding: 100px 0 !important;
  background: #ffffff !important;
  border-top: 1px solid #e4e4e7 !important;
}

.faq-accordion-grid {
  max-width: 900px !important;
  margin: 0 auto !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}

.faq-accordion-card {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  transition: all 0.25s ease !important;
}

.faq-accordion-card.active,
.faq-accordion-card:hover {
  border-color: #111111 !important;
}

.faq-toggle-header {
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 24px 28px !important;
  background: transparent !important;
  border: none !important;
  text-align: left !important;
  cursor: pointer !important;
}

.faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  line-height: 1.4 !important;
}

.faq-icon {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  color: #111111 !important;
  width: 32px !important;
  height: 32px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.faq-answer-body {
  display: none;
  padding: 0 28px 24px 28px !important;
}

.faq-accordion-card.active .faq-answer-body {
  display: block !important;
}

.faq-answer-body p {
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  color: #52525b !important;
  line-height: 1.7 !important;
  margin: 0 !important;
}

/* ==========================================================================
   ZIONIC CERTIFICATES & QUALITY STANDARDS
   ========================================================================== */
.zionic-certificates-section {
  padding: 100px 0 !important;
  background: #f4f4f5 !important;
  border-top: 1px solid #e4e4e7 !important;
  border-bottom: 1px solid #e4e4e7 !important;
}

.zionic-cert-cards-grid {
  display: grid !important;
  grid-template-columns: repeat(4, 1fr) !important;
  gap: 24px !important;
  max-width: 1300px !important;
  margin: 0 auto !important;
}

@media (max-width: 991px) {
  .zionic-cert-cards-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 576px) {
  .zionic-cert-cards-grid {
    grid-template-columns: 1fr !important;
  }
}

.zionic-cert-card {
  background: #ffffff !important;
  border: 1px solid #e4e4e7 !important;
  padding: 32px 24px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  transition: all 0.3s ease !important;
}

.zionic-cert-card:hover {
  border-color: #111111 !important;
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06) !important;
}

.cert-card-badge {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  background: #f4f4f5 !important;
  border: 1px solid #d4d4d8 !important;
  padding: 6px 14px !important;
  margin-bottom: 20px !important;
  letter-spacing: 1px !important;
}

.cert-card-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin-bottom: 10px !important;
}

.cert-card-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  color: #52525b !important;
  line-height: 1.6 !important;
  margin: 0 !important;
}

/* ==========================================================================
   ZIONIC SEO SECTION
   ========================================================================== */
.zionic-seo-clean-section {
  padding: 80px 0 !important;
  background: #ffffff !important;
}

.seo-clean-box {
  max-width: 1000px !important;
  margin: 0 auto !important;
  border-left: 3px solid #111111 !important;
  padding-left: 28px !important;
}

.seo-clean-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  margin-bottom: 12px !important;
}

.seo-clean-text {
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  color: #71717a !important;
  line-height: 1.7 !important;
}
`;

const markerClean = '/* ==========================================================================\n   ZIONIC PAGE CLEAN STACKING & FLOW';
if (css.includes(markerClean)) {
  css = css.substring(0, css.indexOf(markerClean)) + nonStickyHeroCss;
} else {
  css += '\n' + nonStickyHeroCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully fixed sticky bleed-through and added Certificates & FAQ sections!');

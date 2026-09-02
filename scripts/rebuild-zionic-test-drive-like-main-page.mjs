import fs from 'fs';

// 1. New HTML for Test Drive Section matching the Main Page architecture
const newTestDriveHtml = `      <!-- 9. TEST-DRIVE APPLICATION STAGE (EXACT LUXURY MAIN PAGE ARCHITECTURE) -->
      <section class="application-presentation zionic-test-drive-custom-stage" id="test-drive">
        <div class="container">
          <div class="presentation-header">
            <span class="luxury-kicker">ТЕСТ-ДРАЙВ ТА ПРЕЗЕНТАЦІЯ</span>
            <h2 class="section-main-title">Замовте виїзний тест-драйв ZIONIC</h2>
            <p class="section-main-sub">Оцініть можливості та результативність апарату ZIONIC безпосередньо у вашій клініці або в нашому шоурумі</p>
          </div>

          <div class="presentation-stage-grid">
            <!-- Left Column: Visual Media Card with Photo & Trust Highlights -->
            <div class="presentation-visual-col">
              <div class="presentation-photo-frame">
                <img src="/photo_form.png?v=1787685047" class="presentation-showcase-img" alt="Zionic Test Drive Presentation">
                <div class="presentation-photo-overlay"></div>
                <div class="presentation-floating-tag">
                  <span class="live-pulse-dot"></span>
                  <span>Безкоштовний тест-драйв для клінік</span>
                </div>
              </div>
              
              <div class="presentation-trust-features">
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Безкоштовний виїзд та доставка (0 ₴)</strong>
                    <span>Привеземо апарат ZIONIC та проведемо тест на ваших пацієнтах</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Розрахунок фінансової окупності</strong>
                    <span>Персональний бізнес-план повернення інвестицій за 3–5 місяців</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Навчання лікарів та сертифікація</strong>
                    <span>Постановка руки та протоколи від сертифікованого лікаря TermoSalud</span>
                  </div>
                </div>
                <div class="trust-feature-item">
                  <span class="trust-icon">✓</span>
                  <div>
                    <strong>Без жодних зобов'язань покупки</strong>
                    <span>Ви приймаєте рішення лише після оцінки реальних результатів</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Open High-Converting Booking Form -->
            <div class="presentation-form-col">
              <div class="presentation-form-card">
                <div class="form-card-header">
                  <h3 class="form-card-title">Заявка на виїзний тест-драйв</h3>
                  <p class="form-card-subtitle">Заповніть форму, і наш менеджер узгодить з вами зручний день та формат тестування</p>
                </div>

                <!-- Format Switcher: Clinic vs Showroom -->
                <div class="format-switcher-wrap">
                  <span class="format-label">Формат тестування:</span>
                  <div class="format-switcher">
                    <button type="button" class="format-tab-btn active" data-format="clinic">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1"/></svg>
                      <span>У вашій клініці (Виїзд)</span>
                    </button>
                    <button type="button" class="format-tab-btn" data-format="showroom">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
                      <span>Шоурум (Київ)</span>
                    </button>
                  </div>
                </div>

                <!-- Open Form Inputs -->
                <form class="presentation-open-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш менеджер зв\\'яжеться з вами найближчим часом.');">
                  <div class="form-group-item">
                    <label class="form-label-text" for="zionic_pres_name">Ваше ім'я та посада</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="zionic_pres_name" placeholder="Наприклад: Олена, головний лікар" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="zionic_pres_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="zionic_pres_phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>
                    <div class="form-group-item">
                      <label class="form-label-text" for="zionic_pres_city">Місто та клініка</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><circle cx="12" cy="10" r="3" stroke-width="1.5"></circle></svg>
                        <input type="text" id="zionic_pres_city" placeholder="Київ, Клініка естетики" required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <!-- Messenger Selection -->
                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для зв'язку</label>
                    <div class="messenger-pills-row">
                      <label class="messenger-pill active">
                        <input type="radio" name="zionic_messenger" value="WhatsApp" checked class="messenger-radio">
                        <span class="messenger-pill-dot dot-emerald"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="zionic_messenger" value="Telegram" class="messenger-radio">
                        <span class="messenger-pill-dot dot-cyan"></span>
                        <span>Telegram</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="zionic_messenger" value="Viber" class="messenger-radio">
                        <span class="messenger-pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="submit-presentation-btn">
                    <span>ЗАБРОНЮВАТИ ВИЇЗНИЙ ТЕСТ-ДРАЙВ</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>

                  <p class="form-privacy-note">
                    🔒 Натискаючи кнопку, ви даєте згоду на обробку персональних даних відповідно до політики конфіденційності.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Replace the old zionic-booking-section with newTestDriveHtml
processCode = processCode.replace(/<section class="zionic-booking-section"[\s\S]*?<\/section>/i, newTestDriveHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS adjustments for zionic-test-drive-custom-stage
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const testDriveCustomCss = `
/* ==========================================================================
   ZIONIC TEST-DRIVE CUSTOM STAGE (EXACT MAIN PAGE ARCHITECTURE)
   ========================================================================== */
.zionic-test-drive-custom-stage {
  position: relative;
  z-index: 18;
  background: #f4f4f5;
  padding: 110px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
}

.zionic-test-drive-custom-stage .presentation-stage-grid {
  display: grid;
  grid-template-columns: 46% 54%;
  gap: 36px;
  align-items: stretch;
}

@media (max-width: 991px) {
  .zionic-test-drive-custom-stage .presentation-stage-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.zionic-test-drive-custom-stage .presentation-form-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
`;

const markerTD = '/* ==========================================================================\n   ZIONIC TEST-DRIVE CUSTOM STAGE';
if (css.includes(markerTD)) {
  css = css.substring(0, css.indexOf(markerTD)) + testDriveCustomCss;
} else {
  css += '\n' + testDriveCustomCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully applied Main Page presentation & test-drive stage to Zionic page!');

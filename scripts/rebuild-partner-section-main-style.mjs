import fs from 'fs';

// 1. Updated HTML for Partner & Test-Drive Stage using real Zionic Photo & Screenshot 2 Content
const newPartnerHtml = `      <!-- 9. BECOME A PARTNER & PRESENTATION STAGE (ORIGINAL CONTENT + MAIN PAGE DESIGN SYSTEM) -->
      <section class="application-presentation zionic-partner-stage-section" id="test-drive">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <span class="luxury-kicker">ОФІЦІЙНЕ ПАРТНЕРСТВО ТА ПРЕЗЕНТАЦІЯ</span>
            <h2 class="section-main-title">Стати партнером TermoSalud</h2>
            <p class="section-main-sub">
              При замовленні апарата ZIONIC ви отримуєте професійне навчання, маркетинговий запуск та надійну сервісну підтримку
            </p>
          </div>

          <div class="presentation-stage-grid">
            <!-- Left Column: Real Zionic Photo + 5 Partnership Guarantees -->
            <div class="presentation-visual-col">
              <div class="presentation-photo-frame">
                <img src="/zionic_partner_presentation.png" class="presentation-showcase-img" alt="Апарат ZIONIC у клініці естетичної медицини">
                <div class="presentation-photo-overlay"></div>
                <div class="presentation-floating-tag">
                  <span class="live-pulse-dot"></span>
                  <span>Офіційний дистриб'ютор TermoSalud</span>
                </div>
              </div>
              
              <div class="partner-guarantees-stack">
                <h4 class="guarantees-head-title">Ми забезпечуємо надійне партнерство:</h4>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">01</span>
                  <div class="guarantee-text">
                    <strong>Прямі поставки від виробника</strong>
                    <span>Вся продукція сертифікована (CE Medical, ISO 13485) та поставляється напряму від TermoSalud Іспанія.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">02</span>
                  <div class="guarantee-text">
                    <strong>Безкоштовне навчання для лікарів</strong>
                    <span>Повний супровід запуску процедури, постановка руки та авторські протоколи від лікарів-методистів.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">03</span>
                  <div class="guarantee-text">
                    <strong>Готові рекламні матеріали</strong>
                    <span>Презентації, фото-відео контент, друковані та цифрові макети — усе для швидкого залучення пацієнтів.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">04</span>
                  <div class="guarantee-text">
                    <strong>Гарантія, сервіс та підмінний фонд</strong>
                    <span>Офіційний сервісний центр у Києві, технічна підтримка та оперативний ремонт без затримок.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">05</span>
                  <div class="guarantee-text">
                    <strong>Гнучкі фінансові умови</strong>
                    <span>Передоплата, безвідсоткове розтермінування або індивідуальні лізингові умови під ваш бізнес.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Open High-Converting Partnership Form -->
            <div class="presentation-form-col">
              <div class="presentation-form-card">
                <div class="form-card-header">
                  <span class="partner-card-kicker">ЗАЯВКА НА СПІВПРАЦЮ</span>
                  <h3 class="form-card-title">Заявка на презентацію ZIONIC</h3>
                  <p class="form-card-subtitle">
                    Заповніть форму, і наш спеціаліст надасть повний фінансовий розрахунок окупності та узгодить демонстрацію
                  </p>
                </div>

                <!-- Open Form Inputs (Verbatim from Screenshot 2) -->
                <form class="presentation-open-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш спеціаліст зв\\'яжеться з вами найближчим часом.');">
                  <div class="form-group-item">
                    <label class="form-label-text" for="partner_name">Ваше ім'я та посада</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="partner_name" placeholder="Наприклад: Олена, керівник клініки" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="partner_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="partner_phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>
                    <div class="form-group-item">
                      <label class="form-label-text" for="partner_email">Email</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><polyline points="22,6 12,13 2,6" stroke-width="1.5"></polyline></svg>
                        <input type="email" id="partner_email" placeholder="clinic@example.com" required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text" for="partner_city">Місто та назва клініки</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><circle cx="12" cy="10" r="3" stroke-width="1.5"></circle></svg>
                      <input type="text" id="partner_city" placeholder="Київ, Клініка естетичної медицини" required class="luxury-form-input">
                    </div>
                  </div>

                  <!-- Messenger Selection -->
                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для зв'язку</label>
                    <div class="messenger-pills-row">
                      <label class="messenger-pill active">
                        <input type="radio" name="partner_messenger" value="WhatsApp" checked class="messenger-radio">
                        <span class="messenger-pill-dot dot-emerald"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="partner_messenger" value="Telegram" class="messenger-radio">
                        <span class="messenger-pill-dot dot-cyan"></span>
                        <span>Telegram</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="partner_messenger" value="Viber" class="messenger-radio">
                        <span class="messenger-pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" class="submit-presentation-btn">
                    <span>ЗАЯВКА НА ПРЕЗЕНТАЦІЮ</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>

                  <p class="form-privacy-note">
                    🔒 Натискаючи кнопку, ви даєте згоду на обробку персональних даних відповідно до політики конфіденційності TermoSalud Україна.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Replace the old test-drive section with newPartnerHtml
processCode = processCode.replace(/<section class="application-presentation[\s\S]*?<\/section>/i, newPartnerHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS adjustments in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const partnerStageCss = `
/* ==========================================================================
   ZIONIC PARTNER & PRESENTATION STAGE (ORIGINAL CONTENT + LUXURY DESIGN)
   ========================================================================== */
.zionic-partner-stage-section {
  position: relative;
  z-index: 18;
  background: #f4f4f5;
  padding: 110px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
}

.zionic-partner-stage-section .presentation-stage-grid {
  display: grid;
  grid-template-columns: 48% 52%;
  gap: 40px;
  align-items: stretch;
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 991px) {
  .zionic-partner-stage-section .presentation-stage-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.presentation-photo-frame {
  position: relative;
  width: 100%;
  height: 380px;
  overflow: hidden;
  border: 1px solid #e4e4e7;
  background: #ffffff;
  margin-bottom: 24px;
}

.presentation-photo-frame .presentation-showcase-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%;
  display: block;
}

.partner-guarantees-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.guarantees-head-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 6px 0 !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
}

.guarantee-item-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #e4e4e7;
  padding: 14px 18px;
  border-radius: 0 !important;
  transition: all 0.25s ease;
}

.guarantee-item-row:hover {
  border-color: #27272a;
  transform: translateX(4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.05);
}

.guarantee-num {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 900;
  color: #111111;
  background: #f4f4f5;
  border: 1px solid #d4d4d8;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.guarantee-text strong {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: #111111;
  margin-bottom: 3px;
}

.guarantee-text span {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #52525b;
  line-height: 1.5;
}

.partner-card-kicker {
  display: inline-block;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #71717a;
  margin-bottom: 8px;
}
`;

const markerP = '/* ==========================================================================\n   ZIONIC PARTNER & PRESENTATION STAGE';
const markerOldTD = '/* ==========================================================================\n   ZIONIC TEST-DRIVE CUSTOM STAGE';

if (css.includes(markerP)) {
  css = css.substring(0, css.indexOf(markerP)) + partnerStageCss;
} else if (css.includes(markerOldTD)) {
  css = css.substring(0, css.indexOf(markerOldTD)) + partnerStageCss;
} else {
  css += '\n' + partnerStageCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully updated Partner / Presentation section with real Zionic image and Screenshot 2 content!');

import fs from 'fs';

let processHtml = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const oldPartnerSectionStart = `<section class="application-presentation zionic-partner-stage-section" id="test-drive">`;
const oldPartnerSectionEnd = `</section>\n\n      <!-- 10. DOCTOR CLINICAL ENDORSEMENT SECTION (ORIGINAL SITE) -->`;

const startIndex = processHtml.indexOf(oldPartnerSectionStart);
const endIndex = processHtml.indexOf(oldPartnerSectionEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find partner section indices in scripts/process-html.mjs');
  console.log('startIndex:', startIndex, 'endIndex:', endIndex);
  process.exit(1);
}

const newPartnerSection = `<section class="application-presentation zionic-partner-stage-section exact-partner-section" id="test-drive">
        <div class="container">
          <div class="presentation-header text-center section-header-centered" style="text-align: center !important; margin: 0 auto 50px auto !important;">
            <h2 class="section-main-title exact-partner-title">Стати партнером</h2>
          </div>

          <div class="exact-partner-split-grid">
            <!-- Left Column: Form Card -->
            <div class="exact-partner-form-col">
              <div class="exact-partner-form-card">
                <p class="exact-partner-form-lead">
                  При замовленні апарата ZIONIC ви отримуєте професійне навчання від сертифікованих фахівців дистриб’ютора та провідних лікарів-косметологів. Програма охоплює як теоретичні основи, так і практичну роботу з апаратом, що дозволяє клінікам одразу впровадити процедури на найвищому рівні.
                </p>

                <form class="exact-partner-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш спеціаліст зв\\'яжеться з вами найближчим часом.');">
                  <div class="exact-form-group">
                    <input type="text" placeholder="Ім'я" required class="exact-form-input">
                  </div>

                  <div class="exact-messengers-row">
                    <label class="exact-msg-label">
                      <input type="checkbox" name="exact_whatsapp" checked class="exact-msg-check">
                      <span>Whatsapp</span>
                    </label>
                    <label class="exact-msg-label">
                      <input type="checkbox" name="exact_viber" class="exact-msg-check">
                      <span>Viber</span>
                    </label>
                    <label class="exact-msg-label">
                      <input type="checkbox" name="exact_telegram" class="exact-msg-check">
                      <span>Telegram</span>
                    </label>
                  </div>

                  <div class="exact-form-group">
                    <input type="tel" placeholder="Телефон" required class="exact-form-input">
                  </div>

                  <div class="exact-form-group">
                    <input type="email" placeholder="Email" required class="exact-form-input">
                  </div>

                  <div class="exact-form-group">
                    <input type="text" placeholder="Місто" required class="exact-form-input">
                  </div>

                  <button type="submit" class="exact-form-submit-btn">
                    Заявка на презентацію
                  </button>
                </form>
              </div>
            </div>

            <!-- Right Column: 5 Partnership Blocks -->
            <div class="exact-partner-blocks-col">
              <h3 class="exact-blocks-header">Ми забезпечуємо надійне партнерство:</h3>

              <div class="exact-blocks-stack">
                <div class="exact-block-item">
                  <span class="exact-block-num">1</span>
                  <p class="exact-block-text">Вся продукція сертифікована та поставляється напряму від виробника.</p>
                </div>

                <div class="exact-block-item">
                  <span class="exact-block-num">2</span>
                  <p class="exact-block-text">Безкоштовне навчання для лікарів, повний супровід запуску процедури.</p>
                </div>

                <div class="exact-block-item">
                  <span class="exact-block-num">3</span>
                  <p class="exact-block-text">Готові рекламні матеріали, презентації, макети усе для швидкого старту.</p>
                </div>

                <div class="exact-block-item">
                  <span class="exact-block-num">4</span>
                  <p class="exact-block-text">Гарантія, технічна підтримка та оперативний ремонт без зайвої тяганини.</p>
                </div>

                <div class="exact-block-item">
                  <span class="exact-block-num">5</span>
                  <p class="exact-block-text">Передоплата, розтермінування або індивідуальні умови під ваш бізнес.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;

processHtml = processHtml.slice(0, startIndex) + newPartnerSection + '\n\n      <!-- 10. DOCTOR CLINICAL ENDORSEMENT SECTION (ORIGINAL SITE) -->' + processHtml.slice(endIndex + oldPartnerSectionEnd.length);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processHtml, 'utf8');
console.log('Successfully replaced partner section in scripts/process-html.mjs');

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const partnerCss = `
/* ==========================================================================
   EXACT PARTNER SECTION STYLES (MATCHING SCREENSHOT)
   ========================================================================== */
.exact-partner-section {
  padding: 85px 0 95px 0 !important;
  background: #ffffff !important;
}

html body.template-zionic .exact-partner-title,
.exact-partner-title {
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(32px, 3.5vw, 46px) !important;
  font-weight: 800 !important;
  text-transform: none !important;
  margin: 0 auto !important;
  text-align: center !important;
}

.exact-partner-split-grid {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 48px !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  align-items: start !important;
}

/* Left Form Card */
.exact-partner-form-card {
  background: #181a1f !important;
  border-radius: 12px !important;
  padding: 40px 36px !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.2) !important;
}

.exact-partner-form-lead {
  color: #f1f5f9 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.55 !important;
  font-weight: 500 !important;
  margin-bottom: 28px !important;
}

.exact-form-group {
  margin-bottom: 16px !important;
}

.exact-form-input {
  width: 100% !important;
  background: #3f444e !important;
  border: 1px solid #4f5563 !important;
  border-radius: 6px !important;
  padding: 14px 18px !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  color: #ffffff !important;
  outline: none !important;
  transition: border-color 0.2s ease, background 0.2s ease !important;
}

.exact-form-input::placeholder {
  color: #cbd5e1 !important;
}

.exact-form-input:focus {
  border-color: #38bdf8 !important;
  background: #474d58 !important;
}

.exact-messengers-row {
  display: flex !important;
  align-items: center !important;
  gap: 24px !important;
  margin: 18px 0 !important;
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
}

.exact-msg-label {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  cursor: pointer !important;
  user-select: none !important;
}

.exact-msg-check {
  accent-color: #38bdf8 !important;
  width: 16px !important;
  height: 16px !important;
  cursor: pointer !important;
}

.exact-form-submit-btn {
  width: 100% !important;
  max-width: 240px !important;
  background: #5eead4 !important;
  color: #0f172a !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 700 !important;
  padding: 14px 24px !important;
  border: none !important;
  border-radius: 6px !important;
  cursor: pointer !important;
  margin-top: 24px !important;
  transition: background 0.2s ease, transform 0.2s ease !important;
}

.exact-form-submit-btn:hover {
  background: #2dd4bf !important;
  transform: translateY(-2px) !important;
}

/* Right Column: 5 Partnership Blocks */
.exact-blocks-header {
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 800 !important;
  margin: 0 0 24px 0 !important;
  line-height: 1.3 !important;
}

.exact-blocks-stack {
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
}

.exact-block-item {
  background: #1e2430 !important;
  border-radius: 10px !important;
  padding: 22px 24px !important;
  display: flex !important;
  align-items: center !important;
  gap: 20px !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}

.exact-block-item:hover {
  transform: translateX(4px) !important;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12) !important;
}

.exact-block-num {
  color: #38bdf8 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
  flex-shrink: 0 !important;
}

.exact-block-text {
  color: #f1f5f9 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.5 !important;
  font-weight: 500 !important;
  margin: 0 !important;
}

@media (max-width: 991px) {
  .exact-partner-split-grid {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }
}
`;

css += '\n' + partnerCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully appended partner styles');

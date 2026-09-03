import fs from 'fs';

let processHtml = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const oldSectionRegex = /<!-- 9\. TEST-DRIVE APPLICATION FORM[\s\S]*?<\/section>/;

if (!oldSectionRegex.test(processHtml)) {
  console.error('Could not find old partner section in scripts/process-html.mjs');
  process.exit(1);
}

const restoredPartnerSection = `<!-- 9. TEST-DRIVE APPLICATION STAGE (RESTORED FORM WITH UPDATED TEXT) -->
      <section class="application-presentation zionic-partner-stage-section" id="test-drive">
        <div class="container">
          <div class="section-header-centered text-center" style="text-align: center !important; margin: 0 auto 44px auto !important;">
            <h2 class="section-main-title" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important;">Стати партнером</h2>
            <p class="section-main-sub" style="text-align: center !important; margin-left: auto !important; margin-right: auto !important; max-width: 900px !important;">
              При замовленні апарата ZIONIC ви отримуєте професійне навчання від сертифікованих фахівців дистриб’ютора та провідних лікарів-косметологів. Програма охоплює як теоретичні основи, так і практичну роботу з апаратом, що дозволяє клінікам одразу впровадити процедури на найвищому рівні.
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
                    <strong>Вся продукція сертифікована</strong>
                    <span>Вся продукція сертифікована та поставляється напряму від виробника.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">02</span>
                  <div class="guarantee-text">
                    <strong>Безкоштовне навчання для лікарів</strong>
                    <span>Безкоштовне навчання для лікарів, повний супровід запуску процедури.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">03</span>
                  <div class="guarantee-text">
                    <strong>Готові рекламні матеріали</strong>
                    <span>Готові рекламні матеріали, презентації, макети усе для швидкого старту.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">04</span>
                  <div class="guarantee-text">
                    <strong>Гарантія та технічна підтримка</strong>
                    <span>Гарантія, технічна підтримка та оперативний ремонт без зайвої тяганини.</span>
                  </div>
                </div>

                <div class="guarantee-item-row">
                  <span class="guarantee-num">05</span>
                  <div class="guarantee-text">
                    <strong>Гнучкі фінансові умови</strong>
                    <span>Передоплата, розтермінування або індивідуальні умови під ваш бізнес.</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Open High-Converting Partnership Form -->
            <div class="presentation-form-col">
              <div class="presentation-form-card" id="test-drive-form">
                <div class="form-card-header">
                  <span class="partner-card-kicker">ЗАЯВКА НА СПІВПРАЦЮ</span>
                  <h3 class="form-card-title">Заявка на презентацію ZIONIC</h3>
                  <p class="form-card-subtitle">
                    Заповніть форму, і наш спеціаліст надасть повний фінансовий розрахунок окупності та узгодить демонстрацію
                  </p>
                </div>

                <!-- Form Inputs -->
                <form class="presentation-open-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш спеціаліст зв\\'яжеться з вами найближчим часом.');">
                  <div class="form-group-item">
                    <label class="form-label-text" for="z_partner_name">Ім'я</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="7.5" r="4.5" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></circle><path d="M4.5 20C4.5 16 8 14 12 14C16 14 19.5 16 19.5 20" stroke-width="1.8" stroke-linecap="round"></path></svg>
                      <input type="text" id="z_partner_name" placeholder="Ім'я" required class="luxury-form-input">
                    </div>
                  </div>

                  <div class="form-row-2col">
                    <div class="form-group-item">
                      <label class="form-label-text" for="z_partner_phone">Телефон</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="6" y="2" width="12" height="20" rx="3" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"></rect><circle cx="12" cy="18" r="1" fill="currentColor"></circle><path d="M10 5H14" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        <input type="tel" id="z_partner_phone" placeholder="+380" required class="luxury-form-input">
                      </div>
                    </div>
                    <div class="form-group-item">
                      <label class="form-label-text" for="z_partner_email">Email</label>
                      <div class="input-with-icon">
                        <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><polyline points="22,6 12,13 2,6" stroke-width="1.5"></polyline></svg>
                        <input type="email" id="z_partner_email" placeholder="Email" required class="luxury-form-input">
                      </div>
                    </div>
                  </div>

                  <div class="form-group-item">
                    <label class="form-label-text" for="z_partner_city">Місто</label>
                    <div class="input-with-icon">
                      <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke-width="1.8" fill="currentColor" fill-opacity="0.15"></path><circle cx="12" cy="10" r="3" stroke-width="1.5"></circle></svg>
                      <input type="text" id="z_partner_city" placeholder="Місто" required class="luxury-form-input">
                    </div>
                  </div>

                  <!-- Messenger Selection -->
                  <div class="form-group-item">
                    <label class="form-label-text">Зручний месенджер для зв'язку</label>
                    <div class="messenger-pills-row">
                      <label class="messenger-pill active">
                        <input type="radio" name="z_partner_messenger" value="WhatsApp" checked class="messenger-radio">
                        <span class="messenger-pill-dot dot-emerald"></span>
                        <span>WhatsApp</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="z_partner_messenger" value="Viber" class="messenger-radio">
                        <span class="messenger-pill-dot dot-purple"></span>
                        <span>Viber</span>
                      </label>
                      <label class="messenger-pill">
                        <input type="radio" name="z_partner_messenger" value="Telegram" class="messenger-radio">
                        <span class="messenger-pill-dot dot-cyan"></span>
                        <span>Telegram</span>
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

processHtml = processHtml.replace(oldSectionRegex, restoredPartnerSection);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processHtml, 'utf8');
console.log('Successfully restored original partner form structure with updated text in process-html.mjs');

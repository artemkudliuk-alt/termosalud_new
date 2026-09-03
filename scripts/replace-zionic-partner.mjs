import fs from 'fs';

const filePath = 'C:/nextweb/termosalud/scripts/process-html.mjs';
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

// Find start and end line index within zionicContent (i > 1500)
let startIdx = -1;
let endIdx = -1;

for (let i = 1800; i < lines.length; i++) {
  if (lines[i].includes('class="application-presentation zionic-partner-stage-section" id="test-drive"')) {
    startIdx = i;
    break;
  }
}

if (startIdx !== -1) {
  for (let i = startIdx + 1; i < lines.length; i++) {
    if (lines[i].includes('class="zionic-doctors-section" id="doctors"')) {
      // Find the </section> right before it
      for (let j = i - 1; j > startIdx; j--) {
        if (lines[j].includes('</section>')) {
          endIdx = j;
          break;
        }
      }
      break;
    }
  }
}

console.log('startIdx:', startIdx + 1, 'endIdx:', endIdx + 1);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find start or end index');
  process.exit(1);
}

const replacement = `      <section class="application-presentation zionic-partner-stage-section exact-partner-section" id="test-drive">
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

lines.splice(startIdx, endIdx - startIdx + 1, replacement);
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Successfully replaced zionic partner section!');

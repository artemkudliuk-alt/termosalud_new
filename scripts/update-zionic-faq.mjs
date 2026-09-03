import fs from 'fs';

const filePath = 'C:/nextweb/termosalud/scripts/process-html.mjs';
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const startIdx = lines.findIndex(l => l.includes('<section class="zionic-faq-section" id="faq">'));
let endIdx = -1;

for (let i = startIdx + 1; i < lines.length; i++) {
  if (lines[i].includes('id="certificates"')) {
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

console.log('startIdx:', startIdx + 1, 'endIdx:', endIdx + 1);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find FAQ start or end index');
  process.exit(1);
}

const newFaqMarkup = `      <section class="zionic-faq-section exact-zionic-faq" id="faq">
        <div class="container">
          <div class="section-header-centered text-center" style="margin-bottom: 44px;">
            <h2 class="section-main-title">Питання та відповіді</h2>
            <p class="section-main-sub" style="max-width: 800px; margin: 0 auto; line-height: 1.55;">
              Отримайте відповіді на поширені запитання про Zionic та про те,<br>як ця система може змінити вашу практику
            </p>
          </div>

          <div class="exact-faq-accordion-list">
            <!-- Q1 -->
            <div class="exact-faq-item active">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Скільки процедур потрібно для видимого результату?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content" style="display: block;">
                <p class="exact-faq-answer">Виробник рекомендує не менше чотирьох процедур. Бажаний курс включає 6 – 10 процедур в залежності від поставлених задач.</p>
              </div>
            </div>

            <!-- Q2 -->
            <div class="exact-faq-item">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Чи комфортна процедура і які відчуття підчас неї?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content">
                <p class="exact-faq-answer">Найкомфортніша процедура апаратного масажу. Відчуття приємні. Лагідне тепло народжується всередині м'яких тканин, розслабляючи м'язи.</p>
              </div>
            </div>

            <!-- Q3 -->
            <div class="exact-faq-item">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Чи потрібен час на відновлення після сеансу?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content">
                <p class="exact-faq-answer">Ні.</p>
              </div>
            </div>

            <!-- Q4 -->
            <div class="exact-faq-item">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Для яких зон тіла найчастіше застосовується ZIONIC?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content">
                <p class="exact-faq-answer">Призначений для лікування фіброзного целюліта, тобто в основному для стегон і сідниць, ZIONIC користується великим попитом для масажу спини і шийно-плечового сегменту, тому що дуже приємний.</p>
              </div>
            </div>

            <!-- Q5 -->
            <div class="exact-faq-item">
              <button type="button" class="exact-faq-btn" onclick="toggleExactFaq(this)">
                <span class="exact-faq-question">Чим ZIONIC відрізняється від інших косметологічних рішень?</span>
                <span class="exact-faq-chevron">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </span>
              </button>
              <div class="exact-faq-content">
                <p class="exact-faq-answer">Єдина система, яка об'єднує глибокий діатермічний прогрів резистивного типу і ротаційний масаж з регулюванням обертів по ходу лімфатичної рідини.</p>
              </div>
            </div>
          </div>
        </div>
      </section>`;

lines.splice(startIdx, endIdx - startIdx + 1, newFaqMarkup);
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Successfully updated FAQ section in process-html.mjs');

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const faqCss = `
/* ==========================================================================
   EXACT FAQ SECTION STYLES (MATCHING SCREENSHOT)
   ========================================================================== */
.exact-zionic-faq {
  padding: 85px 0 95px 0 !important;
  background: #ffffff !important;
}

.exact-faq-accordion-list {
  display: flex !important;
  flex-direction: column !important;
  gap: 12px !important;
  max-width: 1100px !important;
  margin: 0 auto !important;
}

.exact-faq-item {
  background: #1e2430 !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  transition: background-color 0.2s ease, box-shadow 0.2s ease !important;
}

.exact-faq-btn {
  width: 100% !important;
  background: transparent !important;
  border: none !important;
  padding: 22px 28px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 16px !important;
  cursor: pointer !important;
  text-align: left !important;
  outline: none !important;
}

.exact-faq-question {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15.5px !important;
  font-weight: 700 !important;
  line-height: 1.4 !important;
}

.exact-faq-chevron {
  color: #38bdf8 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
  transition: transform 0.25s ease !important;
}

.exact-faq-content {
  display: none;
  padding: 0 28px 24px 28px !important;
}

.exact-faq-item.active .exact-faq-content {
  display: block !important;
}

.exact-faq-answer {
  color: #cbd5e1 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14.5px !important;
  line-height: 1.6 !important;
  font-weight: 500 !important;
  margin: 0 !important;
}
`;

css += '\n' + faqCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully updated custom.css with exact FAQ styles');

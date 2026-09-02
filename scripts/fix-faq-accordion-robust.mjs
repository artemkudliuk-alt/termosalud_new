import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const updatedFaqHtml = `
      <!-- 11. FAQ ACCORDION -->
      <section class="zionic-faq-section" id="faq">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ВІДПОВІДІ НА ЗАПИТАННЯ</span>
            <h2 class="section-main-title">Питання та відповіді</h2>
            <p class="section-main-sub">Отримайте відповіді на поширені запитання про Zionic та про те, як ця система може змінити вашу практику</p>
          </div>

          <div class="faq-accordion-grid">
            <!-- Q1 -->
            <div class="faq-accordion-card active">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Скільки процедур потрібно для видимого результату?</span>
                <span class="faq-icon">−</span>
              </button>
              <div class="faq-answer-body">
                <p>Перші зміни у тонусі шкіри та зняття набряклості помітні вже після 1–2 сеансів. Стійкий виражений ефект зменшення об'ємів та лікування целюліту досягається за курс із 6–10 процедур з інтервалом 2–3 рази на тиждень.</p>
              </div>
            </div>

            <!-- Q2 -->
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Чи комфортна процедура і які відчуття підчас неї?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Ні, процедура абсолютно безболісна та фізіологічна. Пацієнт відчуває приємне глибоке тепло та розслаблюючий ротаційний масаж. Відсутні будь-які синці, печіння чи гематоми.</p>
              </div>
            </div>

            <!-- Q3 -->
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Чи потрібен час на відновлення після сеансу?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Реабілітаційний період повністю відсутній. Пацієнт може одразу повертатися до звичного ритму життя, спорту чи роботи без будь-яких обмежень.</p>
              </div>
            </div>

            <!-- Q4 -->
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Для яких зон тіла найчастіше застосовується ZIONIC?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>ZIONIC ефективно працює з усіма проблемними ділянками: стегна, сідниці, живіт, боки, спина, руки (трицепс), а також для загального ліфтингу шкіри тіла.</p>
              </div>
            </div>

            <!-- Q5 -->
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Чим ZIONIC відрізняється від інших косметологічних рішень?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Унікальність ZIONIC — це запатентована технологія MARP (ротаційний глибокий масаж) у поєднанні з резистивним монополярним RF 470 кГц. Вона одночасно впливає на жирову тканину, м'язи та дерму без болю і витратних матеріалів.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
`;

const regexFaq = /<section class="zionic-faq-section"[\s\S]*?<\/section>/;
if (regexFaq.test(htmlMjs)) {
  htmlMjs = htmlMjs.replace(regexFaq, updatedFaqHtml.trim());
}

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

// ==========================================================================
// 2. UPDATE src/css/custom.css (CLEAN ALL OLD FAQ RULES & ADD ROBUST NEW ONES)
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const cleanFaqCss = `
/* ==========================================================================
   ZIONIC OBSIDIAN LUXURY FAQ ACCORDION (100% COLLAPSIBLE)
   ========================================================================== */
.zionic-faq-section {
  position: relative !important;
  z-index: 20 !important;
  background: #f4f4f5 !important;
  padding: 110px 0 !important;
  border-top: 1px solid #e4e4e7 !important;
  width: 100% !important;
}

.zionic-faq-section .section-header-centered {
  text-align: center !important;
  max-width: 960px !important;
  margin: 0 auto 56px auto !important;
  padding: 0 20px !important;
}

.faq-accordion-grid {
  max-width: 1000px !important;
  margin: 0 auto !important;
  padding: 0 20px !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 14px !important;
  box-sizing: border-box !important;
}

.faq-accordion-card {
  position: relative !important;
  width: 100% !important;
  background: #18181b !important;
  border: 1px solid #27272a !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  transition: all 0.25s ease !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
}

.faq-accordion-card.active {
  background: #111111 !important;
  border-color: #3f3f46 !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
}

.faq-toggle-header {
  position: relative !important;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 24px 30px !important;
  background: transparent !important;
  border: none !important;
  text-align: left !important;
  cursor: pointer !important;
  gap: 20px !important;
  box-sizing: border-box !important;
  border-radius: 0 !important;
}

.faq-toggle-header:hover {
  background: rgba(255, 255, 255, 0.02) !important;
}

.faq-q-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  line-height: 1.35 !important;
  flex: 1 1 auto !important;
  margin: 0 !important;
  transition: color 0.2s ease !important;
}

.faq-accordion-card.active .faq-q-text {
  color: #ffffff !important;
}

.faq-icon {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 22px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  background: #27272a !important;
  border: 1px solid #3f3f46 !important;
  width: 36px !important;
  height: 36px !important;
  min-width: 36px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 0 !important;
  flex-shrink: 0 !important;
  transition: all 0.25s ease !important;
}

.faq-accordion-card.active .faq-icon {
  background: #ffffff !important;
  color: #111111 !important;
  border-color: #ffffff !important;
}

/* CRITICAL: ONLY SHOW ANSWER WHEN CARD HAS .active CLASS */
.faq-accordion-card .faq-answer-body {
  display: none !important;
  padding: 0 30px 26px 30px !important;
  box-sizing: border-box !important;
}

.faq-accordion-card.active .faq-answer-body {
  display: block !important;
  animation: faqFadeIn 0.25s ease forwards !important;
}

@keyframes faqFadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

.faq-answer-body p {
  font-family: 'Inter', sans-serif !important;
  font-size: 16px !important;
  color: #a1a1aa !important;
  line-height: 1.65 !important;
  margin: 0 !important;
}
`;

// Remove previous leftover faq-accordion rules
css = css.replace(/\.faq-accordion-grid[\s\S]*?\.faq-answer-body p\s*\{[\s\S]*?\}/g, '');

// Append clean FAQ CSS
css += '\n' + cleanFaqCss;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// ==========================================================================
// 3. UPDATE src/js/main.js (ROBUST FAQ TOGGLE)
// ==========================================================================
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const updatedFaqJs = `
// ==========================================================================
// ROBUST ZIONIC FAQ ACCORDION TOGGLE
// ==========================================================================
window.toggleZionicFaq = function(btn) {
  const card = btn.closest('.faq-accordion-card');
  if (!card) return;
  const isCurrentlyActive = card.classList.contains('active');
  const icon = card.querySelector('.faq-icon');

  if (isCurrentlyActive) {
    card.classList.remove('active');
    if (icon) icon.textContent = '+';
  } else {
    // Optionally close other cards in the same grid for accordion elegance
    const allCards = card.parentElement ? card.parentElement.querySelectorAll('.faq-accordion-card') : [];
    allCards.forEach(c => {
      if (c !== card) {
        c.classList.remove('active');
        const otherIcon = c.querySelector('.faq-icon');
        if (otherIcon) otherIcon.textContent = '+';
      }
    });

    card.classList.add('active');
    if (icon) icon.textContent = '−';
  }
};
`;

const markerFaqJs = '// ==========================================================================\n// ROBUST ZIONIC FAQ ACCORDION TOGGLE';
if (js.includes(markerFaqJs)) {
  const p1 = js.substring(0, js.indexOf(markerFaqJs));
  const p2 = js.substring(js.indexOf('/**\n * Termosalud Interactive'));
  js = p1 + updatedFaqJs.trim() + '\n\n' + p2;
} else if (js.includes('window.toggleZionicFaq = function(btn) {')) {
  const p1 = js.substring(0, js.indexOf('// Global Bulletproof FAQ Accordion Handler'));
  const p2 = js.substring(js.indexOf('/**\n * Termosalud Interactive'));
  js = p1 + updatedFaqJs.trim() + '\n\n' + p2;
} else {
  js = updatedFaqJs + '\n' + js;
}

fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully applied robust Obsidian FAQ Accordion with strict active-only display!');

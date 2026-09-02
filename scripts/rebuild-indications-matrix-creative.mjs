import fs from 'fs';

// 1. Creative Luxury HTML for Indications & Contraindications Matrix
const newMatrixHtml = `      <!-- 7. CREATIVE CLINICAL INDICATIONS & CONTRAINDICATIONS MATRIX -->
      <section class="zionic-matrix-section" id="indications">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <span class="luxury-kicker">КЛІНІЧНІ РЕКОМЕНДАЦІЇ ТА БЕЗПЕКА</span>
            <h2 class="section-main-title">Показання та протипоказання</h2>
            <p class="section-main-sub">
              Повний спектр терапевтичного застосування та медичні критерії безпеки пацієнта
            </p>
          </div>

          <div class="zionic-creative-matrix-grid">
            <!-- LEFT CARD: CLINICAL INDICATIONS (DEEP OBSIDIAN) -->
            <div class="matrix-creative-card indications-card">
              <div class="matrix-card-header">
                <span class="matrix-status-pill pill-positive">
                  <span class="pill-dot"></span> РЕКОМЕНДОВАНО ДЛЯ ТЕРАПІЇ
                </span>
                <h3 class="matrix-main-head">Клінічні показання</h3>
                <p class="matrix-sub-head">6 ключових терапевтичних напрямків апарату ZIONIC</p>
              </div>

              <div class="matrix-items-stack">
                <div class="matrix-item-row">
                  <span class="item-index">01</span>
                  <div class="item-content">
                    <h4 class="item-title">Локальні жирові відкладення</h4>
                    <p class="item-desc">Стійкі жирові пастки на животі, боках, зовнішній та внутрішній поверхні стегон, спині та руках.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">02</span>
                  <div class="item-content">
                    <h4 class="item-title">Усі стадії та форми целюліту</h4>
                    <p class="item-desc">Ефективне лікування едематозного, твердого фіброзного та м'якого целюліту з усуненням «апельсинової кірки».</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">03</span>
                  <div class="item-content">
                    <h4 class="item-title">Атонія та втрата пружності шкіри</h4>
                    <p class="item-desc">Дряблість тканин, зниження тургору після різкого схуднення, вагітності чи вікових змін дерми.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">04</span>
                  <div class="item-content">
                    <h4 class="item-title">Моделювання силуету та підтяжка сідниць</h4>
                    <p class="item-desc">Бразильський ліфтинг сідниць, звуження талії та формування чітких гармонійних контурів тіла.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">05</span>
                  <div class="item-content">
                    <h4 class="item-title">Постхірургічна реабілітація</h4>
                    <p class="item-desc">Швидке зняття набряків, профілактика спайкових процесів і фіброзу після ліпосакції.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">06</span>
                  <div class="item-content">
                    <h4 class="item-title">М'язовий гіпертонус та болі</h4>
                    <p class="item-desc">Зняття міофасціального спазму, лікування крепатури (DOMS) та розігрів тканин у спортивній медицині.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT CARD: CONTRAINDICATIONS (CLEAN ARCHITECTURAL ZINC) -->
            <div class="matrix-creative-card contraindications-card">
              <div class="matrix-card-header">
                <span class="matrix-status-pill pill-warning">
                  <span class="pill-cross">✕</span> МЕДИЧНІ ОБМЕЖЕННЯ
                </span>
                <h3 class="matrix-main-head">Протипоказання</h3>
                <p class="matrix-sub-head">Стандарти безпеки відповідно до європейських протоколів CE Medical</p>
              </div>

              <div class="matrix-items-stack">
                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Вагітність та лактація</h4>
                    <p class="item-desc">Період вагітності на будь-якому терміні та активне грудне вигодовування.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Кардіостимулятори та металеві імпланти</h4>
                    <p class="item-desc">Наявність водіїв ритму, стентів, штифтів або металевих конструкцій у зоні дії маніпули.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Онкологічні патології</h4>
                    <p class="item-desc">Злоякісні новоутворення в анамнезі або активній фазі незалежно від локалізації.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Гострі запальні процеси та інфекції</h4>
                    <p class="item-desc">Порушення цілісності шкірного покриву, дерматити, лихоманка та гострі респіраторні стани.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Тромбофлебіт та важкі судинні порушення</h4>
                    <p class="item-desc">Гострий тромбоз глибоких вен, васкуліти та порушення згортання крові.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Replace the old zionic-matrix-section with newMatrixHtml
processCode = processCode.replace(/<section class="zionic-matrix-section"[\s\S]*?<\/section>/i, newMatrixHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const matrixCss = `
/* ==========================================================================
   ZIONIC CREATIVE INDICATIONS & CONTRAINDICATIONS MATRIX
   ========================================================================== */
.zionic-matrix-section {
  position: relative;
  z-index: 16;
  background: #ffffff;
  padding: 110px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
}

.zionic-creative-matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  max-width: 1440px;
  margin: 0 auto;
  align-items: stretch;
}

@media (max-width: 991px) {
  .zionic-creative-matrix-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

.matrix-creative-card {
  padding: 44px 38px;
  border-radius: 0 !important;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.matrix-creative-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
}

/* Left Card: Indications (Obsidian Dark) */
.matrix-creative-card.indications-card {
  background: #111111;
  border: 1px solid #27272a;
  color: #ffffff;
}

/* Right Card: Contraindications (Architectural Light Zinc) */
.matrix-creative-card.contraindications-card {
  background: #f4f4f5;
  border: 1px solid #e4e4e7;
  color: #111111;
}

.matrix-card-header {
  margin-bottom: 32px;
  border-bottom: 1px solid;
  padding-bottom: 24px;
}

.indications-card .matrix-card-header {
  border-color: #27272a;
}

.contraindications-card .matrix-card-header {
  border-color: #e4e4e7;
}

.matrix-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 800 !important;
  letter-spacing: 1.5px !important;
  text-transform: uppercase !important;
  padding: 5px 14px !important;
  margin-bottom: 16px;
  border-radius: 0 !important;
}

.pill-positive {
  background: #18181b;
  border: 1px solid #3f3f46;
  color: #ffffff;
}

.pill-dot {
  width: 7px;
  height: 7px;
  background: #ffffff;
  border-radius: 50%;
  display: inline-block;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}

.pill-warning {
  background: #ffffff;
  border: 1px solid #d4d4d8;
  color: #111111;
}

.pill-cross {
  font-weight: 900;
  font-size: 12px;
}

.matrix-main-head {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 900 !important;
  letter-spacing: -0.5px !important;
  margin: 0 0 8px 0 !important;
  line-height: 1.2 !important;
}

.indications-card .matrix-main-head {
  color: #ffffff !important;
}

.contraindications-card .matrix-main-head {
  color: #111111 !important;
}

.matrix-sub-head {
  font-family: 'Inter', sans-serif !important;
  font-size: 15px !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

.indications-card .matrix-sub-head {
  color: #a1a1aa !important;
}

.contraindications-card .matrix-sub-head {
  color: #71717a !important;
}

/* Items Stack */
.matrix-items-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.matrix-item-row {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 18px 20px;
  border-radius: 0 !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid transparent;
}

.indications-card .matrix-item-row {
  background: #18181b;
  border-color: #27272a;
}

.indications-card .matrix-item-row:hover {
  background: #222226;
  border-color: #3f3f46;
  transform: translateX(4px);
}

.contraindications-card .matrix-item-row {
  background: #ffffff;
  border-color: #e4e4e7;
}

.contraindications-card .matrix-item-row:hover {
  border-color: #27272a;
  transform: translateX(4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
}

.item-index {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #71717a;
  padding-top: 2px;
  flex-shrink: 0;
}

.indications-card .matrix-item-row:hover .item-index {
  color: #ffffff;
}

.item-alert-icon {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 900;
  color: #71717a;
  padding-top: 2px;
  flex-shrink: 0;
}

.contraindications-card .matrix-item-row:hover .item-alert-icon {
  color: #111111;
}

.item-content {
  flex: 1;
}

.item-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 800 !important;
  margin: 0 0 5px 0 !important;
  line-height: 1.3 !important;
}

.indications-card .item-title {
  color: #ffffff !important;
}

.contraindications-card .item-title {
  color: #111111 !important;
}

.item-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 14px !important;
  line-height: 1.55 !important;
  margin: 0 !important;
}

.indications-card .item-desc {
  color: #a1a1aa !important;
}

.contraindications-card .item-desc {
  color: #52525b !important;
}
`;

const markerM = '/* ==========================================================================\n   ZIONIC CREATIVE INDICATIONS';
const markerOldM = '/* ==========================================================================\n   ZIONIC MATRIX';

if (css.includes(markerM)) {
  css = css.substring(0, css.indexOf(markerM)) + matrixCss;
} else if (css.includes(markerOldM)) {
  css = css.substring(0, css.indexOf(markerOldM)) + matrixCss;
} else {
  css += '\n' + matrixCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully modernized Indications & Contraindications matrix into creative luxury dual-card architecture!');

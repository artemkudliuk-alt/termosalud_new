import fs from 'fs';

let processHtml = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const oldMatrixSection = `<div class="zionic-creative-matrix-grid">
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
          </div>`;

const newMatrixSection = `<div class="zionic-creative-matrix-grid exact-original-matrix">
            <!-- LEFT CARD: INDICATIONS -->
            <div class="matrix-creative-card indications-card exact-indications">
              <div class="matrix-card-header exact-card-header">
                <h3 class="matrix-main-head">Показання</h3>
              </div>

              <div class="matrix-items-stack exact-list-stack">
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Лікування целлюліту трьох стадій</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Локальне схуднення</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Прецизійне підтягування шкіри (ліфтинг)</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Підготовка до пластичної хірургії (ліпосакції)</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Пост-операційна реабілітація</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Детоксикація тканин</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Лімфодренаж</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Підготовка до фізичних навантажень</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Лікування DOMS (крепатури) після фізичних навантажень</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Реабілітація опорно-рухового апарату</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Регенерація зв’язкових тканин</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Покращення кровообігу</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Зняття спазму</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Загальна релаксація організму (SPA-Wellness програма)</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon check-icon">✓</span>
                  <span class="item-text">Психоемоційна реабілітація завдяки підвищенню м'язової активності</span>
                </div>
              </div>
            </div>

            <!-- RIGHT CARD: CONTRAINDICATIONS -->
            <div class="matrix-creative-card contraindications-card exact-contraindications">
              <div class="matrix-card-header exact-card-header">
                <h3 class="matrix-main-head">Протипоказання</h3>
              </div>

              <div class="matrix-items-stack exact-list-stack">
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Онкологія</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Порушення цілісності шкірного покриву у зоні проведення процедури</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Наявність металевих імплантів та стентів</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Епілепсія, порушення психіки</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Цукровий діабет, декомпенсована форма</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Аутоімунні захворювання</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Хронічні захворювання на стадії загострення</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Орві, грип</span>
                </div>
                <div class="exact-list-item">
                  <span class="item-icon cross-icon">✕</span>
                  <span class="item-text">Вагітність</span>
                </div>
              </div>
            </div>
          </div>`;

if (!processHtml.includes(oldMatrixSection)) {
  console.error('Could not find oldMatrixSection in scripts/process-html.mjs');
  process.exit(1);
}

processHtml = processHtml.replace(oldMatrixSection, newMatrixSection);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processHtml, 'utf8');
console.log('Successfully updated indications and contraindications in scripts/process-html.mjs');

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const matrixCss = `
/* Exact Original Indications & Contraindications */
.exact-original-matrix {
  display: grid !important;
  grid-template-columns: 1fr 1fr !important;
  gap: 48px !important;
  max-width: 1240px !important;
  margin: 0 auto !important;
  align-items: start !important;
}

@media (max-width: 991px) {
  .exact-original-matrix {
    grid-template-columns: 1fr !important;
    gap: 36px !important;
  }
}

.matrix-creative-card.exact-indications {
  background: #121417 url('/wp-content/uploads/2026/03/bg-black-silk.jpg') center/cover no-repeat !important;
  border: 1px solid #23272f !important;
  border-radius: 16px !important;
  padding: 44px 40px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25) !important;
}

.matrix-creative-card.exact-contraindications {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 44px 20px !important;
}

.exact-card-header {
  border-bottom: none !important;
  margin-bottom: 28px !important;
  padding-bottom: 0 !important;
}

html body.template-zionic .exact-indications .matrix-main-head,
.exact-indications .matrix-main-head {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 800 !important;
  letter-spacing: -0.3px !important;
  text-transform: none !important;
  margin: 0 !important;
}

html body.template-zionic .exact-contraindications .matrix-main-head,
.exact-contraindications .matrix-main-head {
  color: #1e293b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 800 !important;
  letter-spacing: -0.3px !important;
  text-transform: none !important;
  margin: 0 !important;
}

.exact-list-stack {
  display: flex !important;
  flex-direction: column !important;
  gap: 13px !important;
}

.exact-list-item {
  display: flex !important;
  align-items: flex-start !important;
  gap: 12px !important;
  line-height: 1.45 !important;
}

.exact-list-item .item-icon {
  font-size: 14px !important;
  font-weight: 700 !important;
  margin-top: 2px !important;
  flex-shrink: 0 !important;
  line-height: 1 !important;
}

.exact-list-item .item-icon.check-icon {
  color: #2dd4bf !important;
}

.exact-list-item .item-icon.cross-icon {
  color: #f43f5e !important;
}

.exact-indications .exact-list-item .item-text {
  color: #f1f5f9 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 500 !important;
}

.exact-contraindications .exact-list-item .item-text {
  color: #334155 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 15px !important;
  font-weight: 500 !important;
}
`;

css += '\n' + matrixCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully added CSS styles for indications and contraindications');

import fs from 'fs';

// 1. HTML for Results section with Interactive Comparison Slider & 6 Cases Nav
const newResultsHtml = `      <!-- 4. INTERACTIVE CLINICAL BEFORE & AFTER COMPARISON STAGE -->
      <section class="zionic-ba-section" id="results">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">КЛІНІЧНИЙ ПРОТОКОЛ</span>
            <h2 class="section-main-title">Клінічно підтверджені результати</h2>
            <p class="section-main-sub">
              Перетягуйте повзунок для оцінки результатів терапії «До» та «Після» у різних анатомічних зонах
            </p>
          </div>

          <!-- MAIN INTERACTIVE COMPARE STAGE -->
          <div class="zionic-compare-card-container">
            <div class="zionic-compare-viewport" id="zionicCompareViewport">
              <!-- AFTER IMAGE (BOTTOM BASE) -->
              <div class="compare-img-layer layer-after">
                <img id="compareImgAfter" src="/wp-content/uploads/zionic_official/case_1_after.jpg" alt="Після процедури Zionic" draggable="false">
                <span class="compare-tag tag-after">ПІСЛЯ</span>
              </div>

              <!-- BEFORE IMAGE (TOP CLIPPED) -->
              <div class="compare-img-layer layer-before" id="compareLayerBefore">
                <img id="compareImgBefore" src="/wp-content/uploads/zionic_official/case_1_before.jpg" alt="До процедури Zionic" draggable="false">
                <span class="compare-tag tag-before">ДО</span>
              </div>

              <!-- DRAGGABLE DIVIDER LINE & HANDLE -->
              <div class="compare-divider-handle" id="compareDividerHandle">
                <div class="divider-line"></div>
                <div class="divider-pill-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
              </div>

              <!-- RANGE INPUT OVERLAY (ACCESSIBILITY & TOUCH DRAG) -->
              <input type="range" min="0" max="100" value="50" class="compare-range-input" id="compareRangeInput" aria-label="Порівняння результатів До та Після">
            </div>

            <!-- CLINICAL DETAILS PANEL -->
            <div class="zionic-compare-meta-box">
              <div class="meta-header-row">
                <div class="meta-zone-info">
                  <span class="meta-case-number" id="caseMetaNum">КЕЙС 01</span>
                  <h3 class="meta-zone-title" id="caseMetaTitle">Стегна та сідниці</h3>
                </div>
                <div class="meta-protocol-badge" id="caseMetaSessions">6 СЕАНСІВ</div>
              </div>
              <p class="meta-zone-desc" id="caseMetaDesc">
                Усунення локальних жирових відкладень та виражена підтяжка контуру сідниць. Зменшення окружності стегон на -4.5 см та розгладження шкіри.
              </p>
            </div>

            <!-- 6 CASES SWITCHER NAV -->
            <div class="zionic-cases-switcher-grid">
              <button type="button" class="case-switcher-btn is-active" data-case="1" data-before="/wp-content/uploads/zionic_official/case_1_before.jpg" data-after="/wp-content/uploads/zionic_official/case_1_after.jpg" data-title="Стегна та сідниці" data-num="КЕЙС 01" data-sessions="6 СЕАНСІВ" data-desc="Усунення локальних жирових відкладень та виражена підтяжка контуру сідниць. Зменшення окружності стегон на -4.5 см та розгладження шкіри.">
                <span class="btn-num">01</span>
                <span class="btn-text">Стегна та сідниці</span>
                <span class="btn-tag">6 сеансів</span>
              </button>

              <button type="button" class="case-switcher-btn" data-case="2" data-before="/wp-content/uploads/zionic_official/case_2_before.jpg" data-after="/wp-content/uploads/zionic_official/case_2_after.jpg" data-title="Зменшення целюліту" data-num="КЕЙС 02" data-sessions="5 СЕАНСІВ" data-desc="Помітне розгладження мікрорельєфу шкіри при фіброзному целюліті, усунення ефекту «апельсинової кірки» та відновлення мікроциркуляції.">
                <span class="btn-num">02</span>
                <span class="btn-text">Зменшення целюліту</span>
                <span class="btn-tag">5 сеансів</span>
              </button>

              <button type="button" class="case-switcher-btn" data-case="3" data-before="/wp-content/uploads/zionic_official/case_3_before.jpg" data-after="/wp-content/uploads/zionic_official/case_3_after.jpg" data-title="Підтяжка та ліфтинг" data-num="КЕЙС 03" data-sessions="4 СЕАНСИ" data-desc="Потужне ущільнення в\'ялої шкіри завдяки стимуляції синтезу колагену та еластину монополярним резистивним RF 470 кГц.">
                <span class="btn-num">03</span>
                <span class="btn-text">Підтяжка та ліфтинг</span>
                <span class="btn-tag">4 сеанси</span>
              </button>

              <button type="button" class="case-switcher-btn" data-case="4" data-before="/wp-content/uploads/zionic_official/case_4_before.jpg" data-after="/wp-content/uploads/zionic_official/case_4_after.jpg" data-title="Корекція зони галіфе" data-num="КЕЙС 04" data-sessions="6 СЕАНСІВ" data-desc="Зменшення стійких жирових пасток на зовнішній поверхні стегон за рахунок MARP-ротації та глибокої діатермії.">
                <span class="btn-num">04</span>
                <span class="btn-text">Зона галіфе</span>
                <span class="btn-tag">6 сеансів</span>
              </button>

              <button type="button" class="case-switcher-btn" data-case="5" data-before="/wp-content/uploads/zionic_official/case_5_before.jpg" data-after="/wp-content/uploads/zionic_official/case_5_after.jpg" data-title="Живіт та боки" data-num="КЕЙС 05" data-sessions="5 СЕАНСІВ" data-desc="Формування витонченої лінії талії, усунення набряків та глибокий дренаж вісцеральних і підшкірних зон.">
                <span class="btn-num">05</span>
                <span class="btn-text">Живіт та боки</span>
                <span class="btn-tag">5 сеансів</span>
              </button>

              <button type="button" class="case-switcher-btn" data-case="6" data-before="/wp-content/uploads/zionic_official/case_6_before.jpg" data-after="/wp-content/uploads/zionic_official/case_6_after.jpg" data-title="Тонус та пружність" data-num="КЕЙС 06" data-sessions="4 СЕАНСИ" data-desc="Миттєвий та пролонгований ліфтинг тканин, покращення тургору та еластичності після ліполізу.">
                <span class="btn-num">06</span>
                <span class="btn-text">Тонус та пружність</span>
                <span class="btn-tag">4 сеанси</span>
              </button>
            </div>
          </div>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
processCode = processCode.replace(/<section class="zionic-ba-section"[\s\S]*?<\/section>/i, newResultsHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS for Interactive Comparison Stage
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const compareCss = `
/* ==========================================================================
   ZIONIC INTERACTIVE BEFORE / AFTER COMPARISON STAGE (SHARP LUXURY)
   ========================================================================== */
.zionic-ba-section {
  background: #ffffff;
  padding: 100px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
}

.zionic-compare-card-container {
  max-width: 1060px;
  margin: 0 auto;
}

.zionic-compare-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  max-height: 580px;
  background: #111111;
  overflow: hidden;
  border: 1px solid #18181b;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
  user-select: none;
  cursor: ew-resize;
}

@media (max-width: 767px) {
  .zionic-compare-viewport {
    aspect-ratio: 4 / 3;
  }
}

.compare-img-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.compare-img-layer img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  background: #111111;
  pointer-events: none;
}

.compare-img-layer.layer-before {
  clip-path: inset(0 50% 0 0);
  z-index: 2;
  will-change: clip-path;
}

.compare-tag {
  position: absolute;
  top: 20px;
  background: #000000;
  border: 1px solid #27272a;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1.5px !important;
  padding: 6px 16px !important;
  border-radius: 0 !important;
  z-index: 4;
}

.tag-before {
  left: 20px;
}

.tag-after {
  right: 20px;
}

/* Draggable Divider */
.compare-divider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: #ffffff;
  z-index: 5;
  transform: translateX(-50%);
  pointer-events: none;
  will-change: left;
}

.divider-line {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.divider-pill-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 44px;
  height: 44px;
  background: #111111;
  border: 2px solid #ffffff;
  border-radius: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
}

.compare-range-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ew-resize;
  z-index: 10;
  margin: 0;
  padding: 0;
}

/* Clinical Details Panel */
.zionic-compare-meta-box {
  background: #111111;
  border: 1px solid #27272a;
  border-top: none;
  padding: 36px 44px;
  color: #ffffff;
}

.meta-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.meta-case-number {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  color: #a1a1aa !important;
  text-transform: uppercase !important;
  display: block;
  margin-bottom: 4px;
}

.meta-zone-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 26px !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  margin: 0 !important;
  line-height: 1.2 !important;
}

.meta-protocol-badge {
  background: #18181b;
  border: 1px solid #3f3f46;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  padding: 8px 18px !important;
  border-radius: 0 !important;
}

.meta-zone-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 17px !important;
  color: #d4d4d8 !important;
  line-height: 1.65 !important;
  margin: 0 !important;
}

/* 6 Cases Switcher Grid */
.zionic-cases-switcher-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-top: 24px;
}

@media (max-width: 991px) {
  .zionic-cases-switcher-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 575px) {
  .zionic-cases-switcher-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.case-switcher-btn {
  background: #f4f4f5;
  border: 1px solid #e4e4e7;
  padding: 16px 14px;
  text-align: left;
  cursor: pointer;
  border-radius: 0 !important;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.case-switcher-btn:hover {
  background: #e4e4e7;
  border-color: #d4d4d8;
  transform: translateY(-2px);
}

.case-switcher-btn.is-active {
  background: #111111 !important;
  border-color: #111111 !important;
  color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.case-switcher-btn .btn-num {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #71717a;
}

.case-switcher-btn.is-active .btn-num {
  color: #a1a1aa;
}

.case-switcher-btn .btn-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 13.5px;
  font-weight: 800;
  color: #111111;
  line-height: 1.25;
}

.case-switcher-btn.is-active .btn-text {
  color: #ffffff;
}

.case-switcher-btn .btn-tag {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #71717a;
}

.case-switcher-btn.is-active .btn-tag {
  color: #d4d4d8;
}
`;

// Append or update in custom.css
const marker = '/* ==========================================================================\n   ZIONIC INTERACTIVE BEFORE / AFTER';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + compareCss;
} else {
  css += '\n' + compareCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// 3. Update main.js for interactive slider and case switching
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const compareJs = `
  // ==========================================================================
  // ZIONIC INTERACTIVE BEFORE/AFTER SLIDER & CASE SWITCHER
  // ==========================================================================
  const compareRange = document.getElementById('compareRangeInput');
  const layerBefore = document.getElementById('compareLayerBefore');
  const dividerHandle = document.getElementById('compareDividerHandle');
  const compareViewport = document.getElementById('zionicCompareViewport');

  if (compareRange && layerBefore && dividerHandle) {
    function updateCompare(val) {
      const clamped = Math.max(0, Math.min(100, val));
      layerBefore.style.clipPath = \`inset(0 \${100 - clamped}% 0 0)\`;
      dividerHandle.style.left = \`\${clamped}%\`;
    }

    compareRange.addEventListener('input', (e) => {
      updateCompare(e.target.value);
    });

    // Touch & Mouse direct move
    if (compareViewport) {
      let isDown = false;
      function handleMove(clientX) {
        const rect = compareViewport.getBoundingClientRect();
        const pos = ((clientX - rect.left) / rect.width) * 100;
        compareRange.value = pos;
        updateCompare(pos);
      }

      compareViewport.addEventListener('mousedown', (e) => {
        isDown = true;
        handleMove(e.clientX);
      });
      window.addEventListener('mousemove', (e) => {
        if (isDown) handleMove(e.clientX);
      });
      window.addEventListener('mouseup', () => { isDown = false; });

      compareViewport.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) handleMove(e.touches[0].clientX);
      }, { passive: true });
      compareViewport.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) handleMove(e.touches[0].clientX);
      }, { passive: true });
    }
  }

  // Case Switcher Buttons
  const caseButtons = document.querySelectorAll('.case-switcher-btn');
  const imgBefore = document.getElementById('compareImgBefore');
  const imgAfter = document.getElementById('compareImgAfter');
  const metaNum = document.getElementById('caseMetaNum');
  const metaTitle = document.getElementById('caseMetaTitle');
  const metaSessions = document.getElementById('caseMetaSessions');
  const metaDesc = document.getElementById('caseMetaDesc');

  caseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      caseButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const bSrc = btn.getAttribute('data-before');
      const aSrc = btn.getAttribute('data-after');
      const title = btn.getAttribute('data-title');
      const num = btn.getAttribute('data-num');
      const sessions = btn.getAttribute('data-sessions');
      const desc = btn.getAttribute('data-desc');

      if (imgBefore) imgBefore.src = bSrc;
      if (imgAfter) imgAfter.src = aSrc;
      if (metaNum) metaNum.textContent = num;
      if (metaTitle) metaTitle.textContent = title;
      if (metaSessions) metaSessions.textContent = sessions;
      if (metaDesc) metaDesc.textContent = desc;

      // Reset slider to center 50%
      if (compareRange) {
        compareRange.value = 50;
        if (layerBefore) layerBefore.style.clipPath = 'inset(0 50% 0 0)';
        if (dividerHandle) dividerHandle.style.left = '50%';
      }
    });
  });
`;

js += '\n' + compareJs;
fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully created Interactive Before & After Comparison Stage with 6 cases switcher!');

import fs from 'fs';

// 1. HTML structure for Section 4: Split Left Compare Screen (Vertical Slider) + Right 6 Tiles
const newResultsHtml = `      <!-- 4. VERTICAL SPLIT BEFORE / AFTER STAGE + 6 SELECTION TILES -->
      <section class="zionic-ba-section" id="results">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <span class="luxury-kicker">КЛІНІЧНИЙ ПРОТОКОЛ</span>
            <h2 class="section-main-title">Клінічно підтверджені результати</h2>
            <p class="section-main-sub">
              Оберіть протокол терапії праворуч та рухайте повзунок вгору-вниз для оцінки реальних результатів «До» та «Після»
            </p>
          </div>

          <div class="zionic-split-results-layout">
            <!-- LEFT COLUMN: VERTICAL SLIDER COMPARISON STAGE -->
            <div class="zionic-compare-left-col">
              <div class="zionic-vertical-compare-viewport" id="zionicVerticalCompareViewport">
                <!-- AFTER IMAGE (BOTTOM LAYER) -->
                <div class="vertical-img-layer layer-after">
                  <img id="compareImgAfter" src="/wp-content/uploads/zionic_official/case_1_after.jpg" alt="Після процедури Zionic" draggable="false">
                  <span class="vertical-compare-tag tag-bottom">ПІСЛЯ</span>
                </div>

                <!-- BEFORE IMAGE (TOP CLIPPED LAYER) -->
                <div class="vertical-img-layer layer-before" id="verticalCompareLayerBefore">
                  <img id="compareImgBefore" src="/wp-content/uploads/zionic_official/case_1_before.jpg" alt="До процедури Zionic" draggable="false">
                  <span class="vertical-compare-tag tag-top">ДО</span>
                </div>

                <!-- HORIZONTAL DIVIDER LINE & VERTICAL DRAG HANDLE -->
                <div class="vertical-divider-handle" id="verticalDividerHandle">
                  <div class="vertical-divider-line"></div>
                  <div class="vertical-handle-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>

                <!-- RANGE INPUT FOR TOUCH & ARIA ACCESSIBILITY -->
                <input type="range" min="0" max="100" value="50" class="vertical-range-input" id="verticalRangeInput" aria-label="Вертикальне порівняння результатів До та Після">
              </div>

              <!-- LIVE PROTOCOL BADGE UNDER SCREEN -->
              <div class="compare-current-meta-bar">
                <div class="meta-current-left">
                  <span class="meta-active-num" id="liveCaseNum">КЕЙС 01</span>
                  <span class="meta-active-title" id="liveCaseTitle">Стегна та сідниці</span>
                </div>
                <span class="meta-active-badge" id="liveCaseBadge">6 СЕАНСІВ</span>
              </div>
            </div>

            <!-- RIGHT COLUMN: 6 RICH INTERACTIVE TILES -->
            <div class="zionic-compare-right-col">
              <div class="zionic-result-tiles-grid">
                <!-- TILE 1 -->
                <div class="result-tile-card is-active" data-case="1" data-before="/wp-content/uploads/zionic_official/case_1_before.jpg" data-after="/wp-content/uploads/zionic_official/case_1_after.jpg" data-title="Стегна та сідниці" data-num="КЕЙС 01" data-sessions="6 СЕАНСІВ">
                  <div class="tile-header">
                    <span class="tile-number">01</span>
                    <span class="tile-badge">6 сеансів</span>
                  </div>
                  <h4 class="tile-title">Стегна та сідниці</h4>
                  <p class="tile-desc">Усунення локальних жирових відкладень та підтяжка контуру сідниць. Зменшення окружності стегон на -4.5 см.</p>
                </div>

                <!-- TILE 2 -->
                <div class="result-tile-card" data-case="2" data-before="/wp-content/uploads/zionic_official/case_2_before.jpg" data-after="/wp-content/uploads/zionic_official/case_2_after.jpg" data-title="Зменшення целюліту" data-num="КЕЙС 02" data-sessions="5 СЕАНСІВ">
                  <div class="tile-header">
                    <span class="tile-number">02</span>
                    <span class="tile-badge">5 сеансів</span>
                  </div>
                  <h4 class="tile-title">Зменшення целюліту</h4>
                  <p class="tile-desc">Помітне розгладження мікрорельєфу шкіри при фіброзному целюліті, усунення ефекту «апельсинової кірки».</p>
                </div>

                <!-- TILE 3 -->
                <div class="result-tile-card" data-case="3" data-before="/wp-content/uploads/zionic_official/case_3_before.jpg" data-after="/wp-content/uploads/zionic_official/case_3_after.jpg" data-title="Підтяжка та ліфтинг" data-num="КЕЙС 03" data-sessions="4 СЕАНСИ">
                  <div class="tile-header">
                    <span class="tile-number">03</span>
                    <span class="tile-badge">4 сеанси</span>
                  </div>
                  <h4 class="tile-title">Підтяжка та ліфтинг</h4>
                  <p class="tile-desc">Потужне ущільнення в'ялої шкіри завдяки стимуляції синтезу неоколагену монополярним RF 470 кГц.</p>
                </div>

                <!-- TILE 4 -->
                <div class="result-tile-card" data-case="4" data-before="/wp-content/uploads/zionic_official/case_4_before.jpg" data-after="/wp-content/uploads/zionic_official/case_4_after.jpg" data-title="Корекція зони галіфе" data-num="КЕЙС 04" data-sessions="6 СЕАНСІВ">
                  <div class="tile-header">
                    <span class="tile-number">04</span>
                    <span class="tile-badge">6 сеансів</span>
                  </div>
                  <h4 class="tile-title">Корекція зони галіфе</h4>
                  <p class="tile-desc">Зменшення стійких жирових пасток на зовнішній поверхні стегон за рахунок активної MARP-ротації.</p>
                </div>

                <!-- TILE 5 -->
                <div class="result-tile-card" data-case="5" data-before="/wp-content/uploads/zionic_official/case_5_before.jpg" data-after="/wp-content/uploads/zionic_official/case_5_after.jpg" data-title="Живіт та боки" data-num="КЕЙС 05" data-sessions="5 СЕАНСІВ">
                  <div class="tile-header">
                    <span class="tile-number">05</span>
                    <span class="tile-badge">5 сеансів</span>
                  </div>
                  <h4 class="tile-title">Живіт та боки</h4>
                  <p class="tile-desc">Формування витонченої лінії талії, усунення набряків та глибокий дренаж вісцеральних і підшкірних зон.</p>
                </div>

                <!-- TILE 6 -->
                <div class="result-tile-card" data-case="6" data-before="/wp-content/uploads/zionic_official/case_6_before.jpg" data-after="/wp-content/uploads/zionic_official/case_6_after.jpg" data-title="Тонус та пружність" data-num="КЕЙС 06" data-sessions="4 СЕАНСИ">
                  <div class="tile-header">
                    <span class="tile-number">06</span>
                    <span class="tile-badge">4 сеанси</span>
                  </div>
                  <h4 class="tile-title">Тонус та пружність</h4>
                  <p class="tile-desc">Миттєвий та пролонгований ліфтинг тканин, покращення тургору та еластичності після ліполізу.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
processCode = processCode.replace(/<section class="zionic-ba-section"[\s\S]*?<\/section>/i, newResultsHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS for Vertical Compare + 6 Side Tiles
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const verticalCompareCss = `
/* ==========================================================================
   ZIONIC VERTICAL COMPARE (TOP-TO-BOTTOM) + 6 SIDE SELECTION TILES
   ========================================================================== */
.zionic-ba-section {
  background: #ffffff;
  padding: 100px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
}

.zionic-split-results-layout {
  display: grid;
  grid-template-columns: 46% 54%;
  gap: 40px;
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 991px) {
  .zionic-split-results-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Left Column: Vertical Compare Viewport */
.zionic-compare-left-col {
  position: sticky;
  top: 90px;
}

@media (max-width: 991px) {
  .zionic-compare-left-col {
    position: relative;
    top: 0;
  }
}

.zionic-vertical-compare-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 300 / 414; /* Exact vertical portrait ratio with ZERO empty space */
  max-height: 640px;
  background: #111111;
  overflow: hidden;
  border: 1px solid #27272a;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
  user-select: none;
  cursor: ns-resize; /* Vertical cursor */
}

.vertical-img-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.vertical-img-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

.vertical-img-layer.layer-before {
  clip-path: inset(0 0 50% 0); /* Top half shown initially */
  z-index: 2;
  will-change: clip-path;
}

.vertical-compare-tag {
  position: absolute;
  background: #111111;
  border: 1px solid #3f3f46;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 800 !important;
  letter-spacing: 1.5px !important;
  padding: 5px 14px !important;
  border-radius: 0 !important;
  z-index: 4;
}

.tag-top {
  top: 16px;
  left: 16px;
}

.tag-bottom {
  bottom: 16px;
  right: 16px;
}

/* Horizontal Divider Line & Handle (Drags Up & Down) */
.vertical-divider-handle {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 2px;
  background: #ffffff;
  z-index: 5;
  transform: translateY(-50%);
  pointer-events: none;
  will-change: top;
}

.vertical-divider-line {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.vertical-handle-pill {
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
  gap: 1px;
}

.vertical-range-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ns-resize;
  z-index: 10;
  margin: 0;
  padding: 0;
}

/* Meta Bar Under Compare Screen */
.compare-current-meta-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #111111;
  border: 1px solid #27272a;
  border-top: none;
  padding: 16px 20px;
  color: #ffffff;
}

.meta-current-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.meta-active-num {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: 800;
  color: #a1a1aa;
  letter-spacing: 1px;
}

.meta-active-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 900;
  color: #ffffff;
}

.meta-active-badge {
  background: #18181b;
  border: 1px solid #3f3f46;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.8px;
  padding: 4px 12px;
}

/* Right Column: 6 Rich Selection Tiles Grid (2 columns x 3 rows) */
.zionic-result-tiles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

@media (max-width: 575px) {
  .zionic-result-tiles-grid {
    grid-template-columns: 1fr;
  }
}

.result-tile-card {
  background: #f4f4f5;
  border: 1px solid #e4e4e7;
  padding: 24px 20px;
  cursor: pointer;
  border-radius: 0 !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.result-tile-card:hover {
  background: #ffffff;
  border-color: #27272a;
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.result-tile-card.is-active {
  background: #111111 !important;
  border-color: #111111 !important;
  color: #ffffff !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  transform: translateY(-2px);
}

.tile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.tile-number {
  font-family: 'Montserrat', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #71717a;
}

.result-tile-card.is-active .tile-number {
  color: #a1a1aa;
}

.tile-badge {
  background: #ffffff;
  border: 1px solid #d4d4d8;
  color: #111111;
  font-family: 'Montserrat', sans-serif;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 0 !important;
}

.result-tile-card.is-active .tile-badge {
  background: #18181b;
  border-color: #3f3f46;
  color: #ffffff;
}

.tile-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 18px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 8px 0 !important;
  line-height: 1.25 !important;
}

.result-tile-card.is-active .tile-title {
  color: #ffffff !important;
}

.tile-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 13.5px !important;
  color: #52525b !important;
  line-height: 1.55 !important;
  margin: 0 !important;
}

.result-tile-card.is-active .tile-desc {
  color: #d4d4d8 !important;
}
`;

const marker = '/* ==========================================================================\n   ZIONIC VERTICAL COMPARE';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + verticalCompareCss;
} else {
  css += '\n' + verticalCompareCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// 3. Update main.js for vertical comparison drag & tile click
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const verticalJs = `
  // ==========================================================================
  // ZIONIC VERTICAL BEFORE/AFTER COMPARISON (TOP-TO-BOTTOM)
  // ==========================================================================
  const vRange = document.getElementById('verticalRangeInput');
  const vLayerBefore = document.getElementById('verticalCompareLayerBefore');
  const vDividerHandle = document.getElementById('verticalDividerHandle');
  const vViewport = document.getElementById('zionicVerticalCompareViewport');

  if (vRange && vLayerBefore && vDividerHandle) {
    function updateVCompare(val) {
      const clamped = Math.max(0, Math.min(100, val));
      vLayerBefore.style.clipPath = \`inset(0 0 \${100 - clamped}% 0)\`;
      vDividerHandle.style.top = \`\${clamped}%\`;
    }

    vRange.addEventListener('input', (e) => {
      updateVCompare(e.target.value);
    });

    // Touch & Mouse direct vertical move
    if (vViewport) {
      let isVDown = false;
      function handleVMove(clientY) {
        const rect = vViewport.getBoundingClientRect();
        const pos = ((clientY - rect.top) / rect.height) * 100;
        vRange.value = pos;
        updateVCompare(pos);
      }

      vViewport.addEventListener('mousedown', (e) => {
        isVDown = true;
        handleVMove(e.clientY);
      });
      window.addEventListener('mousemove', (e) => {
        if (isVDown) handleVMove(e.clientY);
      });
      window.addEventListener('mouseup', () => { isVDown = false; });

      vViewport.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) handleVMove(e.touches[0].clientY);
      }, { passive: true });
      vViewport.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) handleVMove(e.touches[0].clientY);
      }, { passive: true });
    }
  }

  // Result Tile Click Handlers
  const resultTiles = document.querySelectorAll('.result-tile-card');
  const vImgBefore = document.getElementById('compareImgBefore');
  const vImgAfter = document.getElementById('compareImgAfter');
  const vLiveNum = document.getElementById('liveCaseNum');
  const vLiveTitle = document.getElementById('liveCaseTitle');
  const vLiveBadge = document.getElementById('liveCaseBadge');

  resultTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
      resultTiles.forEach((t) => t.classList.remove('is-active'));
      tile.classList.add('is-active');

      const bSrc = tile.getAttribute('data-before');
      const aSrc = tile.getAttribute('data-after');
      const title = tile.getAttribute('data-title');
      const num = tile.getAttribute('data-num');
      const sessions = tile.getAttribute('data-sessions');

      if (vImgBefore) vImgBefore.src = bSrc;
      if (vImgAfter) vImgAfter.src = aSrc;
      if (vLiveNum) vLiveNum.textContent = num;
      if (vLiveTitle) vLiveTitle.textContent = title;
      if (vLiveBadge) vLiveBadge.textContent = sessions;

      // Reset slider to center 50%
      if (vRange) {
        vRange.value = 50;
        if (vLayerBefore) vLayerBefore.style.clipPath = 'inset(0 0 50% 0)';
        if (vDividerHandle) vDividerHandle.style.top = '50%';
      }
    });
  });
`;

js += '\n' + verticalJs;
fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully implemented Vertical Top-to-Bottom Compare on Left and 6 Selection Tiles on Right!');

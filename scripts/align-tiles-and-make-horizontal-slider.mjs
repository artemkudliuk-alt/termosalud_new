import fs from 'fs';

// 1. Update HTML in scripts/process-html.mjs
const newResultsHtml = `      <!-- 4. HORIZONTAL SPLIT BEFORE / AFTER STAGE + 6 EQUAL-HEIGHT TILES -->
      <section class="zionic-ba-section" id="results">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <span class="luxury-kicker">КЛІНІЧНИЙ ПРОТОКОЛ</span>
            <h2 class="section-main-title">Клінічно підтверджені результати</h2>
            <p class="section-main-sub">
              Оберіть протокол терапії праворуч та рухайте повзунок вліво-вправо для оцінки реальних результатів «До» та «Після»
            </p>
          </div>

          <div class="zionic-split-results-layout">
            <!-- LEFT COLUMN: HORIZONTAL SLIDER COMPARISON STAGE -->
            <div class="zionic-compare-left-col">
              <div class="zionic-horizontal-compare-viewport" id="zionicHorizontalCompareViewport">
                <!-- AFTER IMAGE (BOTTOM LAYER) -->
                <div class="horizontal-img-layer layer-after">
                  <img id="compareImgAfter" src="/wp-content/uploads/zionic_official/case_1_after.jpg" alt="Після процедури Zionic" draggable="false">
                  <span class="horizontal-compare-tag tag-right">ПІСЛЯ</span>
                </div>

                <!-- BEFORE IMAGE (TOP CLIPPED LAYER) -->
                <div class="horizontal-img-layer layer-before" id="horizontalCompareLayerBefore">
                  <img id="compareImgBefore" src="/wp-content/uploads/zionic_official/case_1_before.jpg" alt="До процедури Zionic" draggable="false">
                  <span class="horizontal-compare-tag tag-left">ДО</span>
                </div>

                <!-- VERTICAL DIVIDER LINE & HORIZONTAL DRAG HANDLE -->
                <div class="horizontal-divider-handle" id="horizontalDividerHandle">
                  <div class="horizontal-divider-line"></div>
                  <div class="horizontal-handle-pill">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </div>
                </div>

                <!-- RANGE INPUT FOR TOUCH & ARIA ACCESSIBILITY -->
                <input type="range" min="0" max="100" value="50" class="horizontal-range-input" id="horizontalRangeInput" aria-label="Горизонтальне порівняння результатів До та Після">
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

            <!-- RIGHT COLUMN: 6 RICH TILES MATCHING EXACT HEIGHT -->
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

// 2. CSS in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const horizontalCompareCss = `
/* ==========================================================================
   ZIONIC HORIZONTAL COMPARE (LEFT-TO-RIGHT) + EQUAL HEIGHT SIDE TILES
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
  gap: 36px;
  align-items: stretch; /* Both columns match EXACT height */
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 991px) {
  .zionic-split-results-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Left Column: Horizontal Compare Viewport */
.zionic-compare-left-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.zionic-horizontal-compare-viewport {
  position: relative;
  width: 100%;
  flex: 1; /* Takes full available height */
  min-height: 520px;
  background: #111111;
  overflow: hidden;
  border: 1px solid #27272a;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.18);
  user-select: none;
  cursor: ew-resize; /* Horizontal cursor */
}

.horizontal-img-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.horizontal-img-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

.horizontal-img-layer.layer-before {
  clip-path: inset(0 50% 0 0); /* Left half shown initially */
  z-index: 2;
  will-change: clip-path;
}

.horizontal-compare-tag {
  position: absolute;
  top: 16px;
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

.tag-left {
  left: 16px;
}

.tag-right {
  right: 16px;
}

/* Vertical Divider Line & Horizontal Drag Handle (Left to Right) */
.horizontal-divider-handle {
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

.horizontal-divider-line {
  width: 100%;
  height: 100%;
  background: #ffffff;
}

.horizontal-handle-pill {
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
  gap: 2px;
}

.horizontal-range-input {
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
  flex-shrink: 0;
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

/* Right Column: 6 Tiles Matching Exact Total Height */
.zionic-compare-right-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.zionic-result-tiles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr); /* 3 equal rows matching left height */
  gap: 14px;
  height: 100%;
}

@media (max-width: 575px) {
  .zionic-result-tiles-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
}

.result-tile-card {
  background: #f4f4f5;
  border: 1px solid #e4e4e7;
  padding: 20px 20px;
  cursor: pointer;
  border-radius: 0 !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Equal vertical spacing */
  position: relative;
}

.result-tile-card:hover {
  background: #ffffff;
  border-color: #27272a;
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.result-tile-card.is-active {
  background: #111111 !important;
  border-color: #111111 !important;
  color: #ffffff !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}

.tile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
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
  font-size: 17px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 0 0 6px 0 !important;
  line-height: 1.25 !important;
}

.result-tile-card.is-active .tile-title {
  color: #ffffff !important;
}

.tile-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 13.5px !important;
  color: #52525b !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}

.result-tile-card.is-active .tile-desc {
  color: #d4d4d8 !important;
}
`;

const marker = '/* ==========================================================================\n   ZIONIC VERTICAL COMPARE';
const markerH = '/* ==========================================================================\n   ZIONIC HORIZONTAL COMPARE';

if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + horizontalCompareCss;
} else if (css.includes(markerH)) {
  css = css.substring(0, css.indexOf(markerH)) + horizontalCompareCss;
} else {
  css += '\n' + horizontalCompareCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// 3. Update main.js for Horizontal Slider (Left to Right)
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const horizontalJs = `
  // ==========================================================================
  // ZIONIC HORIZONTAL BEFORE/AFTER COMPARISON (LEFT-TO-RIGHT)
  // ==========================================================================
  const hRange = document.getElementById('horizontalRangeInput');
  const hLayerBefore = document.getElementById('horizontalCompareLayerBefore');
  const hDividerHandle = document.getElementById('horizontalDividerHandle');
  const hViewport = document.getElementById('zionicHorizontalCompareViewport');

  if (hRange && hLayerBefore && hDividerHandle) {
    function updateHCompare(val) {
      const clamped = Math.max(0, Math.min(100, val));
      hLayerBefore.style.clipPath = \`inset(0 \${100 - clamped}% 0 0)\`;
      hDividerHandle.style.left = \`\${clamped}%\`;
    }

    hRange.addEventListener('input', (e) => {
      updateHCompare(e.target.value);
    });

    // Touch & Mouse direct horizontal move
    if (hViewport) {
      let isHDown = false;
      function handleHMove(clientX) {
        const rect = hViewport.getBoundingClientRect();
        const pos = ((clientX - rect.left) / rect.width) * 100;
        hRange.value = pos;
        updateHCompare(pos);
      }

      hViewport.addEventListener('mousedown', (e) => {
        isHDown = true;
        handleHMove(e.clientX);
      });
      window.addEventListener('mousemove', (e) => {
        if (isHDown) handleHMove(e.clientX);
      });
      window.addEventListener('mouseup', () => { isHDown = false; });

      hViewport.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) handleHMove(e.touches[0].clientX);
      }, { passive: true });
      hViewport.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) handleHMove(e.touches[0].clientX);
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
      if (hRange) {
        hRange.value = 50;
        if (hLayerBefore) hLayerBefore.style.clipPath = 'inset(0 50% 0 0)';
        if (hDividerHandle) hDividerHandle.style.left = '50%';
      }
    });
  });
`;

const jsMarker = '  // ==========================================================================\n  // ZIONIC VERTICAL BEFORE/AFTER';
const jsMarkerH = '  // ==========================================================================\n  // ZIONIC HORIZONTAL BEFORE/AFTER';

if (js.includes(jsMarker)) {
  js = js.substring(0, js.indexOf(jsMarker)) + horizontalJs;
} else if (js.includes(jsMarkerH)) {
  js = js.substring(0, js.indexOf(jsMarkerH)) + horizontalJs;
} else {
  js += '\n' + horizontalJs;
}

fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully aligned tile heights with image and configured horizontal left-to-right slider!');

import fs from 'fs';

// 1. New HTML for section 2: Infinite moving ticker without frames, larger text
const newTickerHtml = `      <!-- 2. INFINITE MOVING LUXURY ADVANTAGES TICKER (PAUSES ON HOVER) -->
      <section class="zionic-infinite-ticker-section" id="advantages-icons">
        <div class="zionic-ticker-bg-media">
          <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/04/video-placeholder-optimized.png">
            <source src="/wp-content/themes/zionic/assets/images/presentation-video.mp4" type="video/mp4">
          </video>
          <div class="zionic-ticker-overlay"></div>
        </div>

        <div class="zionic-ticker-viewport">
          <div class="zionic-ticker-track">
            <!-- SET 1 -->
            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-highway_arrows-1.svg" alt="Максимальний ліфтинг" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Максимальний ліфтинг</h4>
                <p class="pillar-desc">Найглибший монополярний RF у поєднанні з ротаційним масажем MARP</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-working_mom-1.svg" alt="Персоналізація" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Персоналізація</h4>
                <p class="pillar-desc">Автоматичний підбір індивідуальної програми під кожного пацієнта</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-venus_de_milo-1.svg" alt="Лікування целюліту" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Лікування целюліту</h4>
                <p class="pillar-desc">Ефективна дія при едематозних та фіброзних стадіях целюліту</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-waist-1.svg" alt="Моделювання фігури" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Моделювання фігури</h4>
                <p class="pillar-desc">Найкомфортніший апарат для корекції силуету без болю та синців</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-trust-1.svg" alt="Реабілітація" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Реабілітація</h4>
                <p class="pillar-desc">Швидке відновлення та підтяжка тканин після ліпосакцій</p>
              </div>
            </div>

            <!-- SET 2 (DUPLICATE FOR SEAMLESS 100% INFINITE LOOP) -->
            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-highway_arrows-1.svg" alt="Максимальний ліфтинг" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Максимальний ліфтинг</h4>
                <p class="pillar-desc">Найглибший монополярний RF у поєднанні з ротаційним масажем MARP</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-working_mom-1.svg" alt="Персоналізація" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Персоналізація</h4>
                <p class="pillar-desc">Автоматичний підбір індивідуальної програми під кожного пацієнта</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-venus_de_milo-1.svg" alt="Лікування целюліту" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Лікування целюліту</h4>
                <p class="pillar-desc">Ефективна дія при едематозних та фіброзних стадіях целюліту</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-waist-1.svg" alt="Моделювання фігури" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Моделювання фігури</h4>
                <p class="pillar-desc">Найкомфортніший апарат для корекції силуету без болю та синців</p>
              </div>
            </div>

            <div class="zionic-ticker-item">
              <div class="pillar-icon-box"><img src="/wp-content/uploads/2026/03/icons8-trust-1.svg" alt="Реабілітація" width="48" height="48"></div>
              <div class="pillar-text-content">
                <h4 class="pillar-title">Реабілітація</h4>
                <p class="pillar-desc">Швидке відновлення та підтяжка тканин після ліпосакцій</p>
              </div>
            </div>
          </div>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Replace old zionic-pillars-bar in processCode
processCode = processCode.replace(/<section class="zionic-pillars-bar"[\s\S]*?<\/section>/i, newTickerHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS for Infinite Ticker
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const tickerCss = `
/* ==========================================================================
   ZIONIC INFINITE MARQUEE TICKER (FRAMELESS, LARGER TEXT, PAUSES ON HOVER)
   ========================================================================== */
.zionic-infinite-ticker-section {
  position: relative;
  width: 100%;
  background: #000000;
  overflow: hidden;
  padding: 50px 0;
  border-top: none !important;
  border-bottom: none !important;
}

.zionic-ticker-bg-media {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.zionic-ticker-bg-media video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.28;
}

.zionic-ticker-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.65);
}

.zionic-ticker-viewport {
  position: relative;
  z-index: 2;
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

.zionic-ticker-track {
  display: flex;
  gap: 60px;
  width: max-content;
  animation: zionicMarqueeLoop 30s linear infinite;
  will-change: transform;
}

.zionic-infinite-ticker-section:hover .zionic-ticker-track {
  animation-play-state: paused;
}

@keyframes zionicMarqueeLoop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.zionic-ticker-item {
  display: flex;
  align-items: center;
  gap: 20px;
  min-width: 360px;
  max-width: 440px;
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  padding: 10px 0;
}

.zionic-ticker-item .pillar-icon-box {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  background: transparent !important;
  border: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0 !important;
}

.zionic-ticker-item .pillar-icon-box img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
}

.zionic-ticker-item .pillar-text-content {
  flex: 1;
}

.zionic-ticker-item .pillar-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 19px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  line-height: 1.25 !important;
  margin: 0 0 6px 0 !important;
  white-space: nowrap;
}

.zionic-ticker-item .pillar-desc {
  font-family: 'Inter', sans-serif !important;
  font-size: 14.5px !important;
  font-weight: 400 !important;
  color: #e4e4e7 !important;
  line-height: 1.5 !important;
  margin: 0 !important;
}
`;

css += '\n' + tickerCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully created frameless infinite moving ticker for Zionic!');

import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const targetWhyRegex = /<!-- =+[\s\S]*?8\.\s*WHY LINFOPRESS[\s\S]*?<!-- EQUIPMENT PACKAGE -->/i;

const replacementWhyHtml = `<!-- ==========================================================================
           8. WHY LINFOPRESS EVOLUTION PRO (EXACT MATCH WITH USER SCREENSHOT)
           ========================================================================== -->
      <section class="linfopress-why-section" id="why">
        <div class="why-this-video-bg">
          <video autoplay muted loop playsinline class="why-bg-video">
            <source src="/wp-content/themes/zionic/assets/images/why-this-video.mp4" type="video/mp4">
          </video>
          <div class="why-video-overlay"></div>
        </div>

        <div class="container why-inner-container">
          <h2 class="why-main-title">Чому саме Linfopress Evolution PRO</h2>

          <div class="why-showcase-row">
            <!-- LEFT: MODEL WITH JACKET ON STEPS -->
            <div class="why-model-col">
              <div class="why-model-img-wrap">
                <img src="/wp-content/uploads/2026/03/why-this-img-optimized.png" alt="Чому саме Linfopress Evolution PRO - фото" class="why-model-img" loading="lazy">
              </div>
            </div>

            <!-- RIGHT: 5 DARK CARDS WITH YELLOW NUMBERS (2 COLUMNS) -->
            <div class="why-cards-col">
              <div class="why-cards-grid">
                <div class="why-card-item">
                  <span class="why-card-num">1</span>
                  <span class="why-card-text">Унікальна комбінація різних форм пресомасажу в одній програмі</span>
                </div>

                <div class="why-card-item">
                  <span class="why-card-num">2</span>
                  <span class="why-card-text">Преміальна якість матеріалів виконання</span>
                </div>

                <div class="why-card-item">
                  <span class="why-card-num">3</span>
                  <span class="why-card-text">Абсолютно унікальна куртка для пресомасажу холки і бочків</span>
                </div>

                <div class="why-card-item">
                  <span class="why-card-num">4</span>
                  <span class="why-card-text">Найзручніший метод одягання манжет</span>
                </div>

                <div class="why-card-item">
                  <span class="why-card-num">5</span>
                  <span class="why-card-text">Найінтенсивніший лімфодренажний масаж (завдяки підготовці та біоміметиці)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- EQUIPMENT PACKAGE -->`;

if (targetWhyRegex.test(htmlMjs)) {
  htmlMjs = htmlMjs.replace(targetWhyRegex, replacementWhyHtml);
  fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');
  console.log('Successfully updated why section in scripts/process-html.mjs!');
} else {
  console.error('Could not match targetWhyRegex in scripts/process-html.mjs');
}

// ==========================================================================
// 2. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const whySectionStyles = `
/* ==========================================================================
   LINFOPRESS WHY SECTION - EXACT 1-TO-1 SPECIFICATION MATCH WITH SCREENSHOT
   ========================================================================== */
.linfopress-why-section {
  position: relative !important;
  width: 100% !important;
  background: #eaedf1 !important;
  padding: 80px 0 70px 0 !important;
  overflow: hidden !important;
}

.linfopress-why-section .why-this-video-bg {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
}

.linfopress-why-section .why-bg-video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  opacity: 0.18 !important;
}

.linfopress-why-section .why-video-overlay {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: linear-gradient(180deg, rgba(234, 237, 241, 0.88) 0%, rgba(234, 237, 241, 0.95) 100%) !important;
}

.linfopress-why-section .why-inner-container {
  position: relative !important;
  z-index: 2 !important;
  max-width: 1440px !important;
  padding: 0 32px !important;
  margin: 0 auto !important;
}

.linfopress-why-section .why-main-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(34px, 3.8vw, 48px) !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
  color: #111827 !important;
  text-align: center !important;
  margin: 0 auto 50px auto !important;
  text-transform: none !important;
}

.linfopress-why-section .why-showcase-row {
  display: flex !important;
  align-items: center !important;
  gap: 48px !important;
}

.linfopress-why-section .why-model-col {
  flex: 0 0 36% !important;
  max-width: 36% !important;
  display: flex !important;
  justify-content: center !important;
}

.linfopress-why-section .why-model-img-wrap {
  width: 100% !important;
  max-width: 440px !important;
}

.linfopress-why-section .why-model-img {
  width: 100% !important;
  height: auto !important;
  display: block !important;
  object-fit: contain !important;
  filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.08)) !important;
}

.linfopress-why-section .why-cards-col {
  flex: 1 1 64% !important;
  max-width: 64% !important;
}

.linfopress-why-section .why-cards-grid {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 20px !important;
}

.linfopress-why-section .why-card-item {
  background: #181d26 !important;
  border-radius: 14px !important;
  padding: 26px 28px !important;
  min-height: 130px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18) !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease !important;
}

.linfopress-why-section .why-card-item:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.25) !important;
}

.linfopress-why-section .why-card-num {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 36px !important;
  font-weight: 800 !important;
  line-height: 1 !important;
  color: #ffeb3b !important;
  margin-bottom: 12px !important;
}

.linfopress-why-section .why-card-text {
  display: block !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 600 !important;
  line-height: 1.45 !important;
  color: #ffffff !important;
}

@media (max-width: 991px) {
  .linfopress-why-section .why-showcase-row {
    flex-direction: column !important;
    gap: 30px !important;
  }
  .linfopress-why-section .why-model-col,
  .linfopress-why-section .why-cards-col {
    flex: 0 0 100% !important;
    max-width: 100% !important;
  }
  .linfopress-why-section .why-cards-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

css += '\n' + whySectionStyles;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written Linfopress why section styles to custom.css!');

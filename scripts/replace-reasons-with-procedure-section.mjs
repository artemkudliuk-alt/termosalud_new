import fs from 'fs';

// 1. HTML for the cloned and modernized Procedure ZIONIC Section
const procedureSectionHtml = `      <!-- 5. PROCEDURE ZIONIC SECTION (MODERNIZED IN MAIN PAGE DESIGN SYSTEM) -->
      <section class="zionic-procedure-showcase-section" id="procedure-experience">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <span class="luxury-kicker">ПРОТОКОЛ ТА ЕКСПЕРТНИЙ ДОСВІД</span>
            <h2 class="section-main-title">Процедура ZIONIC</h2>
            <p class="section-main-sub">
              ZIONIC — новий рівень апаратного моделювання тіла з поєднанням глибокої діатермії та ротаційного масажу
            </p>
          </div>

          <div class="zionic-procedure-split-grid">
            <!-- LEFT COLUMN: EXPERT DOCTOR REVIEW & CLINICAL DESCRIPTION -->
            <div class="procedure-expert-text-card">
              <div class="procedure-card-tag">ПРО ПРОЦЕДУРУ</div>
              
              <div class="procedure-text-paragraphs">
                <p class="procedure-lead-p">
                  Я працюю з апаратом Zionic, і найчастіше до мене звертаються пацієнти зі схожими запитами: набряклість, нерівний рельєф шкіри, локальні жирові відкладення та відчуття «застою» в тілі. Уже після перших процедур люди відзначають легкість, зменшення об'ємів за рахунок виведення зайвої рідини та більш гладку шкіру.
                </p>
                <p>
                  Сама процедура поєднує глибокий механічний масаж і радіочастотний прогрів тканин. Завдяки цьому ми одночасно покращуємо лімфодренаж, посилюємо кровообіг і стимулюємо обмінні процеси в жировій тканині. Це дає не лише візуальний ефект, а й покращує загальний стан тканин.
                </p>
                <p>
                  Після курсу пацієнти виглядають більш підтягнутими: шкіра стає щільнішою, рельєф рівнішим, зменшуються прояви целюліту. Водночас важливо розуміти — найкращий і стійкий результат ми отримуємо, коли процедура поєднується з правильним питним режимом та збалансованою активністю.
                </p>
              </div>

              <div class="procedure-meta-doctor-footer">
                <div class="doctor-badge-info">
                  <span class="doc-role">КЛІНІЧНИЙ ДОСВІД</span>
                  <span class="doc-highlight">Комфорт 100% • Без гематом та болю</span>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN: PROCEDURE GALLERY SHOWCASE (SHARP BENTO) -->
            <div class="procedure-gallery-bento">
              <div class="gallery-main-frame">
                <img src="/wp-content/uploads/2026/03/procedure-1-optimized.png" alt="Процедура Zionic на сідниці та стегна" loading="lazy">
                <span class="gallery-frame-tag">Опрацювання стегон та сідниць</span>
              </div>

              <div class="gallery-sub-row">
                <div class="gallery-sub-frame">
                  <img src="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" alt="Процедура Zionic спина та талія" loading="lazy">
                  <span class="gallery-frame-tag">Зона спини та талії</span>
                </div>
                <div class="gallery-sub-frame">
                  <img src="/wp-content/uploads/2026/03/procedure-3-optimized.jpg" alt="Процедура Zionic живіт" loading="lazy">
                  <span class="gallery-frame-tag">Зона живота та боків</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Replace the old zionic-reasons-section (#beast) with the new procedureSectionHtml
processCode = processCode.replace(/<section class="zionic-reasons-section"[\s\S]*?<\/section>/i, procedureSectionHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS for the Procedure ZIONIC Section in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const procedureSectionCss = `
/* ==========================================================================
   ZIONIC PROCEDURE SHOWCASE SECTION (MAIN PAGE DESIGN SYSTEM)
   ========================================================================== */
.zionic-procedure-showcase-section {
  background: #f4f4f5;
  padding: 110px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
}

.zionic-procedure-split-grid {
  display: grid;
  grid-template-columns: 48% 52%;
  gap: 36px;
  align-items: stretch;
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 991px) {
  .zionic-procedure-split-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Left Column: Dark Obsidian Expert Card */
.procedure-expert-text-card {
  background: #111111;
  border: 1px solid #27272a;
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffffff;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
}

.procedure-card-tag {
  display: inline-block;
  background: #18181b;
  border: 1px solid #3f3f46;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 12px !important;
  font-weight: 800 !important;
  letter-spacing: 1.5px !important;
  text-transform: uppercase !important;
  padding: 6px 16px !important;
  margin-bottom: 24px;
  width: fit-content;
}

.procedure-text-paragraphs p {
  font-family: 'Inter', sans-serif !important;
  font-size: 16.5px !important;
  color: #d4d4d8 !important;
  line-height: 1.7 !important;
  margin-bottom: 18px !important;
}

.procedure-text-paragraphs p.procedure-lead-p {
  font-size: 17.5px !important;
  font-weight: 500 !important;
  color: #ffffff !important;
  line-height: 1.75 !important;
}

.procedure-meta-doctor-footer {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #27272a;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.doctor-badge-info .doc-role {
  display: block;
  font-family: 'Montserrat', sans-serif;
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #a1a1aa;
  margin-bottom: 4px;
}

.doctor-badge-info .doc-highlight {
  font-family: 'Montserrat', sans-serif;
  font-size: 14.5px;
  font-weight: 800;
  color: #ffffff;
}

/* Right Column: Gallery Bento */
.procedure-gallery-bento {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.gallery-main-frame {
  position: relative;
  width: 100%;
  height: 320px;
  overflow: hidden;
  background: #111111;
  border: 1px solid #27272a;
}

.gallery-main-frame img,
.gallery-sub-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-main-frame:hover img,
.gallery-sub-frame:hover img {
  transform: scale(1.04);
}

.gallery-sub-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  flex: 1;
}

.gallery-sub-frame {
  position: relative;
  width: 100%;
  min-height: 220px;
  overflow: hidden;
  background: #111111;
  border: 1px solid #27272a;
}

.gallery-frame-tag {
  position: absolute;
  bottom: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11px !important;
  font-weight: 800 !important;
  letter-spacing: 0.5px !important;
  padding: 5px 12px !important;
  border-radius: 0 !important;
}
`;

css += '\n' + procedureSectionCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully cloned and transformed Procedure ZIONIC section in Main Page design system!');

import fs from 'fs';

let processHtml = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const targetBeforeSection = `      <!-- 8. PROCEDURE VIDEO BANNER -->`;

const nineAdvantagesSection = `      <!-- 8. ПЕРЕВАГИ ZIONIC (9 NINE ADVANTAGES WITH 3D APPARATUS) -->
      <section class="zionic-nine-advantages-section" id="advantages-grid">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <h2 class="section-main-title">Переваги Zionic</h2>
          </div>

          <div class="zionic-nine-grid-layout">
            <!-- LEFT: APPARATUS PHOTO -->
            <div class="zionic-nine-apparatus-col">
              <img src="/advantages-img-optimized.png" alt="Переваги Zionic - апарат" class="nine-apparatus-img" loading="lazy">
            </div>

            <!-- RIGHT: 9 NUMBERED CARDS (3x3) -->
            <div class="zionic-nine-cards-col">
              <div class="nine-cards-grid">
                <!-- 1 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">1</span>
                  <p class="advantage-nine-text">Перший в світі апарат, який комбінує найглибший медичний монополярний RF резистивного типу з інтелектуальним ротаційним масажем для максимально можливого моделювання тіла.</p>
                </div>
                <!-- 2 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">2</span>
                  <p class="advantage-nine-text">Інтелектуальна Система взаємодії з пацієнтом враховує температуру, тиск, передану енергію для формування оптимальної терапевтичної дози.</p>
                </div>
                <!-- 3 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">3</span>
                  <p class="advantage-nine-text">Підвищена безпека завдяки технології одночасного контролю температури і тиску в реальному часі під час процедури.</p>
                </div>
                <!-- 4 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">4</span>
                  <p class="advantage-nine-text">Єдиний апарат, який ефективно і без болю лікує великих пацієнтів з едематозним фіброзним целюлітом завдяки унікальній комбінації глибокого внутрішнього прогріву, який знімає больові відчуття, та активному ротаційному масажу.</p>
                </div>
                <!-- 5 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">5</span>
                  <p class="advantage-nine-text">Найкомфортніший з усіх апаратів для моделювання фігури, тому найпопулярніший у пацієнтів та рекомендований спеціалістами.</p>
                </div>
                <!-- 6 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">6</span>
                  <p class="advantage-nine-text">Ключовий елемент програм "Детокс", "Схуднення", "Антицелюліт" для відновлення балансу та тонусу тіла.</p>
                </div>
                <!-- 7 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">7</span>
                  <p class="advantage-nine-text">Використовується у спортивній медицині для розігріву м'язів перед тренуваннями і для регенерації зв'язкових тканин.</p>
                </div>
                <!-- 8 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">8</span>
                  <p class="advantage-nine-text">Використовується у пост-операційній реабілітації для зменшення відчуття стягнутості шкіри після операції, профілактики утворення фіброзу.</p>
                </div>
                <!-- 9 -->
                <div class="advantage-nine-card">
                  <span class="advantage-nine-num">9</span>
                  <p class="advantage-nine-text">Найвигідніший з усіх апаратів для моделювання фігури завдяки високій рентабельності процедури. Окупність 9 місяців.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

`;

if (!processHtml.includes(targetBeforeSection)) {
  console.error('Target before section not found!');
  process.exit(1);
}

processHtml = processHtml.replace(targetBeforeSection, nineAdvantagesSection + targetBeforeSection);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processHtml, 'utf8');
console.log('Inserted zionic-nine-advantages-section into scripts/process-html.mjs');

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const nineAdvCss = `
/* Zionic Nine Advantages Section */
.zionic-nine-advantages-section {
  padding: 85px 0 95px 0 !important;
  background: #ffffff !important;
  position: relative !important;
}

.zionic-nine-advantages-section .section-header-centered {
  margin-bottom: 50px !important;
  text-align: center !important;
}

html body.template-zionic .zionic-nine-advantages-section .section-main-title,
.zionic-nine-advantages-section .section-main-title {
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(30px, 3.2vw, 44px) !important;
  font-weight: 800 !important;
  text-transform: none !important;
  margin: 0 auto !important;
  text-align: center !important;
}

.zionic-nine-grid-layout {
  display: grid !important;
  grid-template-columns: 340px 1fr !important;
  gap: 36px !important;
  align-items: center !important;
  max-width: 1360px !important;
  margin: 0 auto !important;
}

.zionic-nine-apparatus-col {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

.nine-apparatus-img {
  max-width: 100% !important;
  height: auto !important;
  max-height: 600px !important;
  object-fit: contain !important;
  filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.12)) !important;
}

.nine-cards-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 16px !important;
}

.advantage-nine-card {
  background: #18202c !important;
  border: 1px solid #283344 !important;
  border-radius: 10px !important;
  padding: 24px 20px !important;
  display: flex !important;
  flex-direction: column !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
}

.advantage-nine-card:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.16) !important;
  border-color: #3b82f6 !important;
}

.advantage-nine-num {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 28px !important;
  font-weight: 800 !important;
  color: #ffffff !important;
  line-height: 1 !important;
  margin-bottom: 14px !important;
  display: block !important;
}

.advantage-nine-text {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  line-height: 1.5 !important;
  color: #e2e8f0 !important;
  margin: 0 !important;
  font-weight: 500 !important;
}

@media (max-width: 1200px) {
  .zionic-nine-grid-layout {
    grid-template-columns: 280px 1fr !important;
    gap: 24px !important;
  }
  .nine-cards-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 991px) {
  .zionic-nine-grid-layout {
    grid-template-columns: 1fr !important;
    gap: 40px !important;
  }
  .zionic-nine-apparatus-col {
    order: -1 !important;
  }
  .nine-apparatus-img {
    max-height: 420px !important;
  }
  .nine-cards-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

@media (max-width: 640px) {
  .nine-cards-grid {
    grid-template-columns: 1fr !important;
  }
  .advantage-nine-card {
    padding: 20px 16px !important;
  }
}
`;

css += '\n' + nineAdvCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended CSS styles for zionic-nine-advantages-section');

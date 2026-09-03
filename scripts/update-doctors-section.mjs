import fs from 'fs';

const filePath = 'C:/nextweb/termosalud/scripts/process-html.mjs';
const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const startIdx = lines.findIndex(l => l.includes('<section class="zionic-doctors-section" id="doctors">'));
let endIdx = -1;

for (let i = startIdx + 1; i < lines.length; i++) {
  if (lines[i].includes('<!-- 11. FAQ ACCORDION -->')) {
    // Find the </section> right before it
    for (let j = i - 1; j > startIdx; j--) {
      if (lines[j].includes('</section>')) {
        endIdx = j;
        break;
      }
    }
    break;
  }
}

console.log('startIdx:', startIdx + 1, 'endIdx:', endIdx + 1);

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find doctors start or end index');
  process.exit(1);
}

const newDoctorsMarkup = `      <section class="zionic-doctors-section" id="doctors">
        <div class="container">
          <div class="section-header-centered text-center">
            <h2 class="section-main-title">Лікарі довіряють ZIONIC у щоденній практиці</h2>
            <p class="section-main-sub">Косметологи, дерматологи та керівники клінік Європі вже обрали ZIONIC як надійний інструмент для моделювання тіла. Їхні відгуки це найкраще підтвердження ефективності.</p>
          </div>

          <div class="zionic-doctors-grid exact-doctors-grid">
            <!-- Doctor 1 -->
            <div class="doctor-luxury-card exact-doctor-card">
              <div class="doctor-photo-frame exact-doctor-photo">
                <img src="/wp-content/uploads/2026/03/doctor1-optimized.png" alt="Олена Стоянова" loading="lazy">
              </div>
              <div class="doctor-card-info exact-doctor-info">
                <h4 class="doctor-name exact-doc-name">Олена Стоянова</h4>
                <p class="doctor-clinic exact-doc-desc">
                  PhD<br>
                  Клініка Естетичної Медицини St. Esthetic,<br>
                  Київ
                </p>
              </div>
            </div>

            <!-- Doctor 2 -->
            <div class="doctor-luxury-card exact-doctor-card">
              <div class="doctor-photo-frame exact-doctor-photo">
                <img src="/wp-content/uploads/2026/03/doctor2-optimized.png" alt="Ганна Кривошеєва" loading="lazy">
              </div>
              <div class="doctor-card-info exact-doctor-info">
                <h4 class="doctor-name exact-doc-name">Ганна Кривошеєва</h4>
                <p class="doctor-clinic exact-doc-desc">
                  PhD<br>
                  MD Клініка апаратної косметології L'CLINIC,<br>
                  Київ
                </p>
              </div>
            </div>

            <!-- Doctor 3 -->
            <div class="doctor-luxury-card exact-doctor-card">
              <div class="doctor-photo-frame exact-doctor-photo">
                <img src="/wp-content/uploads/2026/03/doctor3-optimized.png" alt="Carmen Navarro" loading="lazy">
              </div>
              <div class="doctor-card-info exact-doctor-info">
                <h4 class="doctor-name exact-doc-name">Carmen Navarro</h4>
                <p class="doctor-clinic exact-doc-desc">
                  Легенда Естетичної Медицини Іспанії<br>
                  Клініка Carmen Navarro Sagasta, Мадрид
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>`;

lines.splice(startIdx, endIdx - startIdx + 1, newDoctorsMarkup);
fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log('Successfully updated doctors section in process-html.mjs');

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const docCss = `
/* ==========================================================================
   EXACT DOCTORS SECTION STYLES (MATCHING SCREENSHOT)
   ========================================================================== */
.exact-doctors-grid {
  display: grid !important;
  grid-template-columns: repeat(3, 1fr) !important;
  gap: 28px !important;
  max-width: 1200px !important;
  margin: 48px auto 0 auto !important;
}

.exact-doctor-card {
  background: #1e2430 !important;
  border-radius: 12px !important;
  padding: 20px !important;
  border: 1px solid #2d3748 !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12) !important;
  display: flex !important;
  flex-direction: column !important;
  transition: transform 0.25s ease, box-shadow 0.25s ease !important;
}

.exact-doctor-card:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2) !important;
}

.exact-doctor-photo {
  width: 100% !important;
  border-radius: 8px !important;
  overflow: hidden !important;
  margin-bottom: 18px !important;
  background: #111827 !important;
}

.exact-doctor-photo img {
  width: 100% !important;
  aspect-ratio: 1 / 1 !important;
  object-fit: cover !important;
  display: block !important;
}

.exact-doctor-info {
  text-align: left !important;
  padding: 0 4px !important;
}

.exact-doc-name {
  color: #ffffff !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 700 !important;
  margin: 0 0 8px 0 !important;
  text-transform: none !important;
}

.exact-doc-desc {
  color: #94a3b8 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13.5px !important;
  line-height: 1.45 !important;
  font-weight: 500 !important;
  margin: 0 !important;
}

@media (max-width: 991px) {
  .exact-doctors-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
    gap: 24px !important;
  }
}
`;

css += '\n' + docCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully updated custom.css with exact doctors styles');

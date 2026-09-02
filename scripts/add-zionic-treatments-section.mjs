import fs from 'fs';

// 1. New HTML for Section 6: 5 Reasons / Treatments Infographic
const treatmentsSectionHtml = `      <!-- 6. 5 REASONS WHY ZIONIC IS BEST (FULLSCREEN INFOGRAPHIC) -->
      <section class="zionic-treatments-fullscreen-section" id="reasons-treatments">
        <div class="container-fluid px-lg-5">
          <div class="section-header-centered">
            <span class="luxury-kicker">ЕФЕКТИВНІСТЬ ТА ТЕХНОЛОГІЯ</span>
            <h2 class="section-main-title">5 причин чому Zionic кращий апарат для контурного моделювання тіла</h2>
            <p class="section-main-sub">
              ZIONIC поєднує RF-нагрів і глибоку стимуляцію для точної корекції фігури. Інтелектуальний контроль температури та адаптивна дія забезпечують зменшення жиру, підтягування тканин і покращення мікроциркуляції без болю та реабілітації.
            </p>
          </div>
        </div>

        <div class="treatments-infographic-viewport">
          <img src="/zionic_treatments_ukr.png" alt="5 векторів дії ZIONIC для контурингу тіла" loading="lazy">
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Insert after procedureSectionHtml and before indications matrix section
if (processCode.includes('id="reasons-treatments"')) {
  processCode = processCode.replace(/<section class="zionic-treatments-fullscreen-section"[\s\S]*?<\/section>/i, treatmentsSectionHtml);
} else {
  const insertMarker = '<section class="zionic-matrix-section" id="indications">';
  processCode = processCode.replace(insertMarker, treatmentsSectionHtml + '\n\n      ' + insertMarker);
}

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS for zionic-treatments-fullscreen-section in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const treatmentsSectionCss = `
/* ==========================================================================
   ZIONIC 5 REASONS / TREATMENTS FULLSCREEN INFOGRAPHIC SECTION
   ========================================================================== */
.zionic-treatments-fullscreen-section {
  position: relative;
  z-index: 15;
  background: #ffffff;
  padding: 100px 0 60px 0;
  border-top: 1px solid #e4e4e7;
  border-bottom: 1px solid #e4e4e7;
  width: 100%;
}

.treatments-infographic-viewport {
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 40px auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}

.treatments-infographic-viewport img {
  width: 100%;
  max-width: 960px;
  height: auto;
  max-height: 85vh;
  object-fit: contain;
  display: block;
  margin: 0 auto;
  filter: contrast(1.03);
}

@media (max-width: 767px) {
  .zionic-treatments-fullscreen-section {
    padding: 70px 0 40px 0;
  }
  .treatments-infographic-viewport img {
    max-width: 100%;
  }
}
`;

const markerT = '/* ==========================================================================\n   ZIONIC 5 REASONS / TREATMENTS';
if (css.includes(markerT)) {
  css = css.substring(0, css.indexOf(markerT)) + treatmentsSectionCss;
} else {
  css += '\n' + treatmentsSectionCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully added 5 Reasons / Treatments Infographic section in Main Page style!');

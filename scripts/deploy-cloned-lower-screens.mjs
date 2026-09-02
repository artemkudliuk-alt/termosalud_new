import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const lowerPageZionicHtml = `
      <!-- 10. DOCTORS & EXPERT REVIEWS -->
      <section class="zionic-doctors-section" id="doctors">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ЕКСПЕРТИ ТА КЛІНІЧНИЙ ДОСВІД</span>
            <h2 class="section-main-title">Лікарі довіряють ZIONIC у щоденній практиці</h2>
            <p class="section-main-sub">Косметологи, дерматологи та керівники клінік Європи вже обрали ZIONIC як надійний інструмент для моделювання тіла. Їхні відгуки це найкраще підтвердження ефективності.</p>
          </div>

          <div class="zionic-doctors-grid">
            <!-- Doctor 1 -->
            <div class="doctor-luxury-card">
              <div class="doctor-photo-frame">
                <img src="/wp-content/uploads/2026/03/doctor1-optimized.png" alt="Олена Стоянова - PhD" loading="lazy">
              </div>
              <div class="doctor-card-info">
                <div class="doctor-header-row">
                  <h4 class="doctor-name">Олена Стоянова</h4>
                  <span class="doctor-phd-badge">PhD</span>
                </div>
                <p class="doctor-clinic">Клініка Естетичної Медицини St. Esthetic, Київ</p>
              </div>
            </div>

            <!-- Doctor 2 -->
            <div class="doctor-luxury-card">
              <div class="doctor-photo-frame">
                <img src="/wp-content/uploads/2026/03/doctor2-optimized.png" alt="Ганна Кривошеєва - PhD" loading="lazy">
              </div>
              <div class="doctor-card-info">
                <div class="doctor-header-row">
                  <h4 class="doctor-name">Ганна Кривошеєва</h4>
                  <span class="doctor-phd-badge">PhD</span>
                </div>
                <p class="doctor-clinic">MD Клініка апаратної косметології L'CLINIC, Київ</p>
              </div>
            </div>

            <!-- Doctor 3 -->
            <div class="doctor-luxury-card">
              <div class="doctor-photo-frame">
                <img src="/wp-content/uploads/2026/03/doctor3-optimized.png" alt="Carmen Navarro" loading="lazy">
              </div>
              <div class="doctor-card-info">
                <div class="doctor-header-row">
                  <h4 class="doctor-name">Carmen Navarro</h4>
                  <span class="doctor-phd-badge">Експерт</span>
                </div>
                <p class="doctor-specialty">Легенда Естетичної Медицини Іспанії</p>
                <p class="doctor-clinic">Клініка Carmen Navarro Sagasta, Мадрид</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. FAQ ACCORDION -->
      <section class="zionic-faq-section" id="faq">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ВІДПОВІДІ НА ЗАПИТАННЯ</span>
            <h2 class="section-main-title">Питання та відповіді</h2>
            <p class="section-main-sub">Отримайте відповіді на поширені запитання про Zionic та про те, як ця система може змінити вашу практику</p>
          </div>

          <div class="faq-accordion-grid">
            <!-- Q1 -->
            <div class="faq-accordion-card active">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Скільки процедур потрібно для видимого результату?</span>
                <span class="faq-icon">−</span>
              </button>
              <div class="faq-answer-body">
                <p>Перші зміни у тонусі шкіри та зняття набряклості помітні вже після 1–2 сеансів. Стійкий виражений ефект зменшення об'ємів та лікування целюліту досягається за курс із 6–10 процедур з інтервалом 2–3 рази на тиждень.</p>
              </div>
            </div>

            <!-- Q2 -->
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Чи комфортна процедура і які відчуття підчас неї?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Ні, процедура абсолютно безболісна та фізіологічна. Пацієнт відчуває приємне глибоке тепло та розслаблюючий ротаційний масаж. Відсутні будь-які синці, печіння чи гематоми.</p>
              </div>
            </div>

            <!-- Q3 -->
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Чи потрібен час на відновлення після сеансу?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Реабілітаційний період повністю відсутній. Пацієнт може одразу повертатися до звичного ритму життя, спорту чи роботи без будь-яких обмежень.</p>
              </div>
            </div>

            <!-- Q4 -->
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Для яких зон тіла найчастіше застосовується ZIONIC?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>ZIONIC ефективно працює з усіма проблемними ділянками: стегна, сідниці, живіт, боки, спина, руки (трицепс), а також для загального ліфтингу шкіри тіла.</p>
              </div>
            </div>

            <!-- Q5 -->
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">
                <span class="faq-q-text">Чим ZIONIC відрізняється від інших косметологічних рішень?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Унікальність ZIONIC — це запатентована технологія MARP (ротаційний глибокий масаж) у поєднанні з резистивним монополярним RF 470 кГц. Вона одночасно впливає на жирову тканину, м'язи та дерму без болю і витратних матеріалів.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 12. DOCUMENTS & CERTIFICATES -->
      <section class="zionic-certificates-section" id="certificates">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ОФІЦІЙНА ДОКУМЕНТАЦІЯ</span>
            <h2 class="section-main-title">Документи та сертифікати</h2>
            <p class="section-main-sub">Офіційне підтвердження безпеки, відповідності міжнародним стандартам якості та реєстрація в МОЗ України</p>
          </div>

          <div class="zionic-cert-scans-grid">
            <!-- Cert 1 -->
            <div class="cert-scan-card">
              <div class="cert-scan-frame">
                <img src="/zionic_cert_ukraine.png" alt="Сертифікат відповідності МОЗ України" loading="lazy">
              </div>
              <div class="cert-scan-info">
                <div class="cert-scan-badge">UA.TR.101 • МОЗ України</div>
                <h4 class="cert-scan-title">Сертифікат відповідності (ПолітехМед)</h4>
                <p class="cert-scan-desc">Державна реєстрація медичного виробу ZIONIC AESTHETIC в Україні. Повна відповідність Технічному регламенту.</p>
              </div>
            </div>

            <!-- Cert 2 -->
            <div class="cert-scan-card">
              <div class="cert-scan-frame">
                <img src="/zionic_cert_fda.png" alt="Declaration of Conformity FDA" loading="lazy">
              </div>
              <div class="cert-scan-info">
                <div class="cert-scan-badge">FDA 510(k) • CE Medical</div>
                <h4 class="cert-scan-title">Declaration of Conformity FDA (USA)</h4>
                <p class="cert-scan-desc">Офіційне схвалення FDA США та міжнародні сертифікати безпеки IEC 60601-1, ISO 10993-1, ISO 13485:2016.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 13. MODERN SEO CLEAN ARTICLE SECTION -->
      <section class="zionic-seo-clean-section" id="seo-article">
        <div class="container">
          <div class="seo-article-card">
            <h2 class="seo-article-main-title">Купити апарат Zionic — інвестувати в передове обладнання для корекції фігури</h2>
            
            <p>У сучасній естетичній медицині найбільший попит мають неінвазивні методики, що поєднують високу результативність, безболісність та відсутність періоду реабілітації. Рішення купити апарат Zionic відкриває для вашої клініки можливість запропонувати пацієнтам саме такі процедури. Це інноваційне обладнання для корекції фігури забезпечує комплексний підхід до моделювання контурів тіла.</p>

            <p>Унікальна концепція апарата дозволяє фахівцям ефективно працювати з локальними жировими відкладеннями, атонією шкіри та всіма формами целюліту, досягаючи стійких і помітних результатів уже після перших сеансів.</p>

            <div class="seo-expandable-content" id="seoExpandableContent">
              <h3 class="seo-article-sub-title">Технологія Rollactive RF: синергія для ідеального результату</h3>
              <p>Секрет найвищої ефективності ZIONIC полягає у використанні запатентованої технології Rollactive RF. В одній ергономічній маніпулі об'єднані два найпотужніші фактори, які взаємно посилюють дію один одного:</p>
              
              <ul class="seo-article-bullets">
                <li><strong>Монополярний RF для тіла:</strong> Глибока резистивна діатермія проникає у тканини, забезпечуючи термічний вплив. Він стимулює вироблення колагену, забезпечуючи потужну підтяжку в'ялої шкіри та підвищення її тургору.</li>
                <li><strong>Інтелектуальний ротаційний масаж:</strong> Інтенсивний механічний вплив активізує кровообіг та клітинний метаболізм. За глибиною та інтенсивністю опрацювання це перевершує стандартний апаратний масаж для схуднення.</li>
              </ul>

              <p>Така синергія робить ZIONIC незамінним інструментом, коли потрібне успішне лікування фіброзного целюліту. Апарат розм'якшує щільні тканини й забезпечує глибокий медичний лімфодренаж, усуваючи застійні явища.</p>

              <h3 class="seo-article-sub-title">Рентабельність та абсолютна безпека</h3>
              <p>Обираючи цей передовий ротаційний масаж апарат, керівники клінік отримують надійний інструмент для стабільного збільшення прибутку. Ефективність процедур гарантує високе повернення пацієнтів.</p>

              <ul class="seo-article-bullets">
                <li><strong>Швидка окупність:</strong> Висока маржинальність процедур на апараті ZIONIC забезпечує відмінні показники рентабельності. Середній термін повернення інвестицій для клініки становить від 9 місяців.</li>
                <li><strong>Інтелектуальний контроль:</strong> Інтегрована система контролю температури та тиску гарантує безпеку пацієнта, виключаючи ризики дискомфорту або перегріву тканин.</li>
              </ul>

              <p>Потужний апарат для RF ліфтингу тіла ZIONIC стане візитною карткою вашої клініки. Розширте спектр преміальних послуг разом із передовими технологіями. Запишіться на тест-драйв, щоб особисто переконатися в унікальних можливостях обладнання.</p>
            </div>

            <button type="button" class="seo-toggle-btn" id="seoToggleBtn" onclick="toggleZionicSeoArticle()">
              <span class="seo-btn-label">Читати повністю</span>
              <span class="seo-btn-arrow">∨</span>
            </button>
          </div>
        </div>
      </section>
`;

// Replace from <section class="zionic-faq-section" to footer
const regexLower = /<section class="zionic-faq-section"[\s\S]*?<\/section>\s*<!--\s*11\. CERTIFICATES[\s\S]*?<\/section>\s*<!--\s*12\. SEO[\s\S]*?<\/section>/;

if (regexLower.test(htmlMjs)) {
  htmlMjs = htmlMjs.replace(regexLower, lowerPageZionicHtml.trim());
} else {
  // Replace around zionic-certificates
  const startMarker = '<section class="zionic-faq-section" id="faq">';
  const endMarker = '<!-- END OF ZIONIC PAGE -->';
  if (htmlMjs.includes(startMarker)) {
    const p1 = htmlMjs.substring(0, htmlMjs.indexOf(startMarker));
    const p2 = htmlMjs.substring(htmlMjs.indexOf('</main>'));
    htmlMjs = p1 + lowerPageZionicHtml + '\n' + p2;
  }
}

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

console.log('Successfully updated scripts/process-html.mjs with all 4 cloned sections!');

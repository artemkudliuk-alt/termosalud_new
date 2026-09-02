import fs from 'fs';

const modernZionicHtml = `
      <!-- 1. HERO SECTION (RESTORED EXACT ORIGINAL) -->
      <section class="zionic-official-hero">
        <div class="zionic-hero-bg-media">
          <video autoplay loop muted playsinline class="zionic-hero-bg-video" preload="auto">
            <source src="/zionic.mp4" type="video/mp4">
          </video>
          <div class="zionic-hero-overlay"></div>
        </div>

        <div class="container zionic-hero-container">
          <div class="zionic-hero-content">
            <div class="zionic-hero-logo-wrap">
              <img src="/wp-content/uploads/zionic_official/Zionic-Aesthetic-logotipo.png" alt="Zionic Aesthetic" class="zionic-official-logo" width="220" height="48">
            </div>

            <h1 class="zionic-hero-title">
              <span class="zionic-word-top">НОВА ЕРА</span>
              <span class="zionic-word-bottom">КОРЕКЦІЇ ТІЛА</span>
            </h1>

            <p class="zionic-hero-desc">
              КОМБІНОВАНИЙ МОНОПОЛЯРНИЙ RF ТА РОТАЦІЙНИЙ МАСАЖ MARP
            </p>

            <div class="zionic-hero-actions">
              <a href="#test-drive" class="zionic-primary-btn">
                <span>Замовити тест-драйв у клініку</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button type="button" class="zionic-secondary-btn" id="open_zionic_video_btn" data-video-id="CYsDii-PZ7s">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Відео-демонстрація</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. 5-PILL HORIZONTAL LUXURY ADVANTAGES (MAIN PAGE & LINFOPRESS STYLE) -->
      <section class="zionic-pillars-bar" id="advantages-icons">
        <div class="container-fluid px-lg-5">
          <div class="zionic-pillars-inner">
            <div class="zionic-pillars-bg-video">
              <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/04/video-placeholder-optimized.png">
                <source src="/wp-content/themes/zionic/assets/images/presentation-video.mp4" type="video/mp4">
              </video>
              <div class="zionic-pillars-overlay"></div>
            </div>

            <div class="zionic-pillars-grid">
              <div class="pillar-pill-item">
                <div class="pillar-icon-box">
                  <img src="/wp-content/uploads/2026/03/icons8-highway_arrows-1.svg" alt="Максимальний ліфтинг" width="36" height="36">
                </div>
                <h4 class="pillar-title">Максимальний ліфтинг</h4>
                <p class="pillar-desc">Найглибший монополярний RF у поєднанні з ротаційним масажем MARP</p>
              </div>

              <div class="pillar-pill-item">
                <div class="pillar-icon-box">
                  <img src="/wp-content/uploads/2026/03/icons8-working_mom-1.svg" alt="Персоналізація" width="36" height="36">
                </div>
                <h4 class="pillar-title">Персоналізація</h4>
                <p class="pillar-desc">Автоматичний підбір індивідуальної програми під кожного пацієнта</p>
              </div>

              <div class="pillar-pill-item">
                <div class="pillar-icon-box">
                  <img src="/wp-content/uploads/2026/03/icons8-venus_de_milo-1.svg" alt="Лікування целюліту" width="36" height="36">
                </div>
                <h4 class="pillar-title">Лікування целюліту</h4>
                <p class="pillar-desc">Ефективна дія при едематозних та фіброзних стадіях целюліту</p>
              </div>

              <div class="pillar-pill-item">
                <div class="pillar-icon-box">
                  <img src="/wp-content/uploads/2026/03/icons8-waist-1.svg" alt="Моделювання фігури" width="36" height="36">
                </div>
                <h4 class="pillar-title">Моделювання фігури</h4>
                <p class="pillar-desc">Найкомфортніший апарат для корекції силуету без болю та синців</p>
              </div>

              <div class="pillar-pill-item">
                <div class="pillar-icon-box">
                  <img src="/wp-content/uploads/2026/03/icons8-trust-1.svg" alt="Реабілітація" width="36" height="36">
                </div>
                <h4 class="pillar-title">Реабілітація</h4>
                <p class="pillar-desc">Швидке відновлення та підтяжка тканин після ліпосакцій</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. TECHNOLOGIES BENTO SHOWCASE (MAIN PAGE STYLE) -->
      <section class="zionic-tech-bento-section" id="technologies">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ІННОВАЦІЙНА СИНЕРГІЯ</span>
            <h2 class="section-main-title">Технології ZIONIC</h2>
            <p class="section-main-sub">
              Поєднання двох потужних енергій в одній маніпулі під контролем вбудованого інтелекту
            </p>
          </div>

          <div class="tech-bento-grid">
            <!-- Card 1: Medical RF -->
            <div class="tech-bento-card">
              <div class="tech-card-media">
                <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/zio-1.mp4_snapshot_00.02.383-optimized.jpg">
                  <source src="/wp-content/uploads/2026/03/zio-1.mp4" type="video/mp4">
                </video>
                <div class="tech-badge-tag">МОНОПОЛЯРНИЙ RF 470 кГц</div>
              </div>
              <div class="tech-card-content">
                <h3 class="tech-card-heading">Медичний монополярний резистивний RF</h3>
                <p class="tech-card-text">
                  Глибока резистивна діатермія прогріває глибокі шари дерми та підшкірно-жирову клітковину, активуючи природний неоколагенез та посилюючи ангіогенез.
                </p>
                <ul class="tech-bullets-list">
                  <li><span class="bullet-check">✓</span><span>Зменшення об'єму жирових клітин</span></li>
                  <li><span class="bullet-check">✓</span><span>Потужний миттєвий та пролонгований ліфтинг</span></li>
                  <li><span class="bullet-check">✓</span><span>Зняття болю та поліпшення рухливості тканин</span></li>
                </ul>
              </div>
            </div>

            <!-- Card 2: MARP Rotation -->
            <div class="tech-bento-card">
              <div class="tech-card-media">
                <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/zio-2.mp4_snapshot_00.01.087-optimized.jpg">
                  <source src="/wp-content/uploads/2026/03/zio-2.mp4" type="video/mp4">
                </video>
                <div class="tech-badge-tag">MARP SYSTEM</div>
              </div>
              <div class="tech-card-content">
                <h3 class="tech-card-heading">Активний ротаційний глибокий масаж MARP</h3>
                <p class="tech-card-text">
                  Запатентований механізм активної ротації забезпечує потужний фізіологічний лімфодренаж, виведення токсинів та розбивання фіброзних тяжів без гематом.
                </p>
                <ul class="tech-bullets-list">
                  <li><span class="bullet-check">✓</span><span>Стимуляція відтоку лімфи у фізіологічному напрямку</span></li>
                  <li><span class="bullet-check">✓</span><span>Абсолютно комфортна процедура для пацієнта</span></li>
                  <li><span class="bullet-check">✓</span><span>Повна безпека завдяки датчикам тиску</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. MANIPULA & NOZZLES SPECIFICATION -->
      <section class="zionic-manipula-section" id="manipula">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ЕРГОНОМІКА ТА ТОЧНІСТЬ</span>
            <h2 class="section-main-title">Оснащення інтелектуальної маніпули</h2>
            <p class="section-main-sub">
              Кольоровий дисплей керування на рукоятці та змінні анатомічні насадки для роботи з будь-якою зоною тіла
            </p>
          </div>

          <div class="manipula-showcase-grid">
            <div class="manipula-feature-card">
              <div class="feature-num">01</div>
              <h4 class="feature-title">Сенсорне керування на рукоятці</h4>
              <p class="feature-desc">Лікар регулює швидкість ротації та потужність RF прямо під час сеансу без відриву від пацієнта.</p>
            </div>

            <div class="manipula-feature-card center-media-card">
              <img src="/wp-content/uploads/2026/03/tech-optimized.png" alt="Маніпула ZIONIC" class="manipula-img" width="480" height="340">
            </div>

            <div class="manipula-feature-card">
              <div class="feature-num">02</div>
              <h4 class="feature-title">Змінні насадки (Nozzles)</h4>
              <p class="feature-desc">Два розміри насадок (для малих зон: руки, спина, живіт; для великих зон: стегна, сідниці).</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. CLINICAL BEFORE & AFTER SLIDER (MAIN PAGE SLIDER SYSTEM) -->
      <section class="zionic-ba-section" id="results">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">РЕЗУЛЬТАТИ ТЕРАПІЇ</span>
            <h2 class="section-main-title">Клінічно підтверджені результати</h2>
            <p class="section-main-sub">
              Візуальні зміни вже після перших 2–3 процедур: чіткий контур, зменшення об'ємів та виражений ліфтинг шкіри
            </p>
          </div>

          <div class="zionic-modern-gallery-slider">
            <div class="zionic-gallery-track">
              <div class="zionic-slide-item">
                <div class="slide-img-frame">
                  <img src="/wp-content/uploads/2026/03/ba-1-optimized.png" alt="Результати Zionic 1" loading="lazy">
                </div>
                <div class="slide-caption">Стегна та сідниці • 6 сеансів</div>
              </div>

              <div class="zionic-slide-item">
                <div class="slide-img-frame">
                  <img src="/wp-content/uploads/2026/03/ba-2-optimized.png" alt="Результати Zionic 2" loading="lazy">
                </div>
                <div class="slide-caption">Зменшення целюліту • 5 сеансів</div>
              </div>

              <div class="zionic-slide-item">
                <div class="slide-img-frame">
                  <img src="/wp-content/uploads/2026/03/ba-3-optimized.png" alt="Результати Zionic 3" loading="lazy">
                </div>
                <div class="slide-caption">Підтяжка шкіри • 4 сеанси</div>
              </div>

              <div class="zionic-slide-item">
                <div class="slide-img-frame">
                  <img src="/wp-content/uploads/2026/03/imgi_12_result-8-optimized.png" alt="Результати Zionic 4" loading="lazy">
                </div>
                <div class="slide-caption">Корекція зони галіфе • 6 сеансів</div>
              </div>

              <div class="zionic-slide-item">
                <div class="slide-img-frame">
                  <img src="/wp-content/uploads/2026/03/imgi_16_result-3-optimized.png" alt="Результати Zionic 5" loading="lazy">
                </div>
                <div class="slide-caption">Живіт та боки • 5 сеансів</div>
              </div>

              <div class="zionic-slide-item">
                <div class="slide-img-frame">
                  <img src="/wp-content/uploads/2026/03/imgi_14_result-1-optimized.png" alt="Результати Zionic 6" loading="lazy">
                </div>
                <div class="slide-caption">Тонус та пружність • 4 сеанси</div>
              </div>
            </div>

            <div class="zionic-carousel-controls">
              <button type="button" class="sharp-carousel-btn prev-btn" aria-label="Попереднє фото">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <div class="carousel-counter"><span class="current-slide">01</span> / <span class="total-slides">06</span></div>
              <button type="button" class="sharp-carousel-btn next-btn" aria-label="Наступне фото">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. 5 REASONS BENTO GRID (WHY ZIONIC IS BEST) -->
      <section class="zionic-reasons-section" id="beast">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ПЕРЕВАГИ ДЛЯ БІЗНЕСУ ТА КЛІНІКИ</span>
            <h2 class="section-main-title">5 причин обрати ZIONIC</h2>
            <p class="section-main-sub">
              Чому провідні клініки та естетичні центри обирають апарат ZIONIC як флагман контурного моделювання тіла
            </p>
          </div>

          <div class="reasons-bento-grid">
            <div class="reason-bento-box">
              <div class="reason-icon-wrap"><img src="/wp-content/uploads/2026/03/1-2.svg" alt="1" width="36" height="36"></div>
              <h4 class="reason-box-title">Швидка окупність (ROI)</h4>
              <p class="reason-box-desc">Середній чек на курс процедур від 20 000 ₴. Повна окупність апарату від 3 до 5 місяців активної роботи клініки.</p>
            </div>

            <div class="reason-bento-box">
              <div class="reason-icon-wrap"><img src="/wp-content/uploads/2026/03/2-2.svg" alt="2" width="36" height="36"></div>
              <h4 class="reason-box-title">Широкий спектр показань</h4>
              <p class="reason-box-desc">Робота з усіма стадіями целюліту, атонією шкіри, локальними жировими відкладеннями та м'язовою напругою.</p>
            </div>

            <div class="reason-bento-box">
              <div class="reason-icon-wrap"><img src="/wp-content/uploads/2026/03/3-2.svg" alt="3" width="36" height="36"></div>
              <h4 class="reason-box-title">Без витратних матеріалів</h4>
              <p class="reason-box-desc">Мінімальна собівартість сеансу (лише базовий контактний крем), що гарантує рекордну маржинальність.</p>
            </div>

            <div class="reason-bento-box">
              <div class="reason-icon-wrap"><img src="/wp-content/uploads/2026/03/4-2.svg" alt="4" width="36" height="36"></div>
              <h4 class="reason-box-title">Сертифікація CE Medical</h4>
              <p class="reason-box-desc">Виробництво TermoSalud в Іспанії відповідно до медичних нормативів ISO 13485 та європейської директиви MDD.</p>
            </div>

            <div class="reason-bento-box highlight-gold-box">
              <div class="reason-icon-wrap"><img src="/wp-content/uploads/2026/03/5-2.svg" alt="5" width="36" height="36"></div>
              <h4 class="reason-box-title">Навчання та підтримка</h4>
              <p class="reason-box-desc">Безкоштовна постановка руки для ваших спеціалістів сертифікованим лікарем-методистом TermoSalud Україна.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. INDICATIONS & CONTRAINDICATIONS (SPLIT MATRIX) -->
      <section class="zionic-matrix-section" id="indications">
        <div class="container">
          <div class="matrix-split-wrapper">
            <!-- Left: Indications (Dark) -->
            <div class="matrix-side indications-side">
              <span class="matrix-kicker">КЛІНІЧНИЙ СПЕКТР</span>
              <h3 class="matrix-title">Показання до застосування</h3>
              <ul class="matrix-checklist">
                <li><span class="check-icon">✓</span><span>Локальні жирові відкладення (живіт, боки, стегна, руки)</span></li>
                <li><span class="check-icon">✓</span><span>Едематозний, фіброзний та м'який целюліт</span></li>
                <li><span class="check-icon">✓</span><span>Втрата пружності, дряблість та атонія шкіри</span></li>
                <li><span class="check-icon">✓</span><span>Моделювання силуету та підтяжка контуру сідниць</span></li>
                <li><span class="check-icon">✓</span><span>Реабілітація після хірургічної ліпосакції</span></li>
                <li><span class="check-icon">✓</span><span>М'язовий гіпертонус та болі після навантажень</span></li>
              </ul>
            </div>

            <!-- Right: Contraindications (Light Sharp) -->
            <div class="matrix-side contraindications-side">
              <span class="matrix-kicker-dark">БЕЗПЕКА ПАЦІЄНТА</span>
              <h3 class="matrix-title-dark">Протипоказання</h3>
              <ul class="matrix-crosslist">
                <li><span class="cross-icon">✕</span><span>Вагітність та період лактації</span></li>
                <li><span class="cross-icon">✕</span><span>Наявність кардіостимулятора або металевих імплантів у зоні обробки</span></li>
                <li><span class="cross-icon">✕</span><span>Онкологічні захворювання</span></li>
                <li><span class="cross-icon">✕</span><span>Гострі запальні процеси та інфекції шкіри</span></li>
                <li><span class="cross-icon">✕</span><span>Тромбофлебіт та важкі судинні порушення</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. PROCEDURE VIDEO BANNER -->
      <section class="zionic-video-banner-section" id="procedure">
        <div class="container">
          <div class="video-banner-sharp-frame">
            <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" class="procedure-video-bg">
              <source src="/wp-content/uploads/2026/03/tratamiento_de_remodelaciun_corporal_zionic_online_video_cutter.mp4" type="video/mp4">
            </video>
            <div class="video-banner-overlay"></div>
            <div class="video-banner-content">
              <h2 class="video-banner-title">Процедура ZIONIC у реальній практиці</h2>
              <p class="video-banner-sub">Подивіться, як проходить сеанс та як реагує тіло пацієнта на терапію MARP</p>
              <button type="button" class="video-play-huge-btn js-open-video-lightbox" data-video-id="CYsDii-PZ7s">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>ДИВИТИСЬ ВІДЕО ПРОЦЕДУРИ</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. TEST-DRIVE APPLICATION FORM (EXACT LUXURY MAIN PAGE FORM) -->
      <section class="zionic-booking-section" id="test-drive">
        <div class="container">
          <div class="luxury-booking-card">
            <div class="row align-items-center">
              <div class="col-lg-5">
                <div class="booking-text-wrap">
                  <span class="luxury-kicker">БЕЗКОШТОВНИЙ ТЕСТ-ДРАЙВ</span>
                  <h2 class="booking-title">Замовте презентацію ZIONIC у вашу клініку</h2>
                  <p class="booking-desc">
                    Ми привеземо апарат ZIONIC безпосередньо у ваш медичний центр або салон краси, проведемо демонстрацію на ваших пацієнтах та навчимо персонал.
                  </p>
                  <div class="booking-trust-pills">
                    <div class="trust-pill"><span class="pill-check">✓</span><span>0 ₴ за виїзд і доставку</span></div>
                    <div class="trust-pill"><span class="pill-check">✓</span><span>Тест на реальних клієнтах</span></div>
                    <div class="trust-pill"><span class="pill-check">✓</span><span>Без зобов'язань покупки</span></div>
                  </div>
                </div>
              </div>

              <div class="col-lg-7">
                <form class="luxury-booking-form" onsubmit="event.preventDefault(); alert('Дякуємо! Ваша заявка прийнята. Наш методист зв\\'яжеться з вами.');">
                  <div class="form-row-2col">
                    <div class="form-input-group">
                      <label>Ваше ім'я та посада</label>
                      <input type="text" placeholder="Наприклад: Олена, головний лікар" required>
                    </div>
                    <div class="form-input-group">
                      <label>Телефон</label>
                      <input type="tel" placeholder="+380" required>
                    </div>
                  </div>

                  <div class="form-input-group">
                    <label>Місто та назва клініки</label>
                    <input type="text" placeholder="Київ, Клініка естетичної медицини" required>
                  </div>

                  <div class="form-input-group">
                    <label>Зручний месенджер для зв'язку</label>
                    <div class="messenger-selector-row">
                      <label class="msg-choice active"><input type="radio" name="zionic_msg" value="WhatsApp" checked><span>WhatsApp</span></label>
                      <label class="msg-choice"><input type="radio" name="zionic_msg" value="Telegram"><span>Telegram</span></label>
                      <label class="msg-choice"><input type="radio" name="zionic_msg" value="Viber"><span>Viber</span></label>
                    </div>
                  </div>

                  <button type="submit" class="luxury-submit-btn">
                    <span>ЗАБРОНЮВАТИ ВИЇЗНИЙ ТЕСТ-ДРАЙВ</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 10. FAQ ACCORDION (MAIN PAGE LUXURY STYLE) -->
      <section class="zionic-faq-section" id="faq">
        <div class="container">
          <div class="section-header-centered">
            <span class="luxury-kicker">ВІДПОВІДІ НА ЗАПИТАННЯ</span>
            <h2 class="section-main-title">Часті питання про ZIONIC</h2>
          </div>

          <div class="faq-accordion-grid">
            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Скільки процедур потрібно для помітного результату?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Перші зміни у тонусі шкіри та зняття набряклості помітні вже після 1–2 сеансів. Стійкий виражений ефект ремоделювання фігури досягається за курс із 6–10 процедур з інтервалом 2–3 рази на тиждень.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Чи відчуває пацієнт біль під час процедури ZIONIC?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Ні, процедура абсолютно безболісна та комфортна. Пацієнт відчуває приємне глибоке тепло та розслаблюючий механічний масаж без синців та гематом.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Які витратні матеріали потрібні для роботи?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>Апарат не вимагає дорогих картриджів, одноразових костюмів або змінних лінз. Потрібен лише спеціальний контактний гліцериновий крем TermoSalud для ковзання маніпули та проведення RF.</p>
              </div>
            </div>

            <div class="faq-accordion-card">
              <button type="button" class="faq-toggle-header">
                <span class="faq-q-text">Які умови гарантії та сервісного обслуговування?</span>
                <span class="faq-icon">+</span>
              </button>
              <div class="faq-answer-body">
                <p>TermoSalud надає 2 роки повної офіційної гарантії. Наш сервісний центр в Україні забезпечує технічну підтримку та надання підмінного апарату на час регламентних робіт.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 11. SEO & CERTIFICATES -->
      <section class="zionic-seo-clean-section">
        <div class="container">
          <div class="seo-clean-box">
            <h3 class="seo-clean-title">Купити апарат Zionic (Rollactive RF) для корекції фігури в Україні</h3>
            <p class="seo-clean-text">
              Офіційний дистриб'ютор TermoSalud в Україні пропонує оригінальний апарат преміум-класу Zionic для медичних центрів, клінік естетичної медицини та SPA-комплексів. Поєднання резистивного монополярного радіочастотного ліфтингу з глибоким ротаційним масажем MARP гарантує неперевершені результати корекції фігури та омолодження тіла.
            </p>
          </div>
        </div>
      </section>
`;

// Update scripts/process-html.mjs
let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const zionicStart = processCode.indexOf("if (pageName === 'zionic') {");
const zionicEnd = processCode.indexOf("if (pageName === 'linfopress')", zionicStart);

const newZionicBlock = `if (pageName === 'zionic') {
    const modernZionicHtml = \`
${modernZionicHtml}
    \`;

    // Replace the inner content of zionic page
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="zionic-main-page-wrapper">\\n\${modernZionicHtml}\\n</div>\\n\`);
  }

  `;

processCode = processCode.substring(0, zionicStart) + newZionicBlock + processCode.substring(zionicEnd);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

console.log('Successfully written complete modern luxury Zionic page into scripts/process-html.mjs');

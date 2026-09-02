import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs WITH MODERN LINFOPRESS SECTIONS
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const modernLinfopressTemplate = `
      <!-- ==========================================================================
           1. HERO STAGE (OFFICIAL BLACK LUXURY VIDEO HERO)
           ========================================================================== -->
      <section class="linfopress-hero-stage" id="hero">
        <div class="linfopress-hero-media-wrapper">
          <video autoplay loop muted playsinline class="linfopress-hero-video-bg" preload="auto" poster="/photo_limfo.png">
            <source src="/limfo.mp4" type="video/mp4">
          </video>
          <div class="linfopress-hero-overlay"></div>
        </div>

        <div class="container linfopress-hero-container">
          <div class="linfopress-hero-content-box">
            
            <div class="linfopress-hero-logo-wrap">
              <img src="/LINFOPRESS-PRO-1.png" alt="Linfopress Evolution Pro" class="linfopress-official-logo" width="300" height="105" loading="eager">
            </div>

            <h1 class="linfopress-official-hero-title">
              <span class="hero-word-primary">ТОЧНІСТЬ</span>
              <span class="hero-word-secondary">КОМФОРТ</span>
            </h1>

            <p class="linfopress-official-hero-kicker">ПРЕСОТЕРАПІЯ З НАЙБІЛЬШИМ РОЗМІРНИМ РЯДОМ НА РИНКУ</p>
            <p class="linfopress-official-hero-desc">Ідеальне доповнення для комплексних процедур моделювання тіла та лімфодренажу</p>

            <div class="linfopress-hero-actions">
              <a href="#application" class="linfopress-btn-pill-white">
                <span>ЗАМОВИТИ ТЕСТ-ДРАЙВ</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <button class="linfopress-btn-ghost-dark" id="open-linfopress-video-btn" data-video-id="K1v77enueJ8">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>ВІДЕО-ДЕМОНСТРАЦІЯ</span>
              </button>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           2. QUICK ADVANTAGES 5-PILL STRIP (CLEAN ARCHITECTURAL BENTO)
           ========================================================================== -->
      <section class="linfopress-advantages-strip">
        <div class="container">
          <div class="linfopress-pills-grid">
            <div class="linfopress-pill-card">
              <div class="pill-icon-wrap">
                <img src="/wp-content/uploads/2026/03/1-1.svg" alt="Нове покоління" width="36" height="36">
              </div>
              <h4 class="pill-title">Нове покоління</h4>
              <p class="pill-desc">Нове покоління комбінаторної пресотерапії</p>
            </div>

            <div class="linfopress-pill-card">
              <div class="pill-icon-wrap">
                <img src="/wp-content/uploads/2026/03/2-1.svg" alt="Для всіх розмірів" width="36" height="36">
              </div>
              <h4 class="pill-title">Для всіх розмірів</h4>
              <p class="pill-desc">Три рівня блискавок для пацієнтів всіх розмірів</p>
            </div>

            <div class="linfopress-pill-card">
              <div class="pill-icon-wrap">
                <img src="/wp-content/uploads/2026/03/3-1.svg" alt="4 етапи" width="36" height="36">
              </div>
              <h4 class="pill-title">4 етапи</h4>
              <p class="pill-desc">Чотири етапи пульсуючої пневматичної компресії</p>
            </div>

            <div class="linfopress-pill-card">
              <div class="pill-icon-wrap">
                <img src="/wp-content/uploads/2026/03/4-1.svg" alt="10 програм" width="36" height="36">
              </div>
              <h4 class="pill-title">10 програм</h4>
              <p class="pill-desc">Десять програм послідовної біоміметичної пульсації</p>
            </div>

            <div class="linfopress-pill-card">
              <div class="pill-icon-wrap">
                <img src="/wp-content/uploads/2026/03/5-1.svg" alt="Унікальність" width="36" height="36">
              </div>
              <h4 class="pill-title">Унікальність</h4>
              <p class="pill-desc">Тільки в Linfopress: пресомасаж холки і love-handles</p>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           3. TECHNOLOGIES (4 OBSIDIAN BENTO CARDS WITH GRAPHITE BORDERS)
           ========================================================================== -->
      <section class="linfopress-tech-bento-section" id="technologies">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Технології Linfopress Evolution PRO</h2>
            <p class="section-main-sub">
              Вперше технологія біоміметичної послідовної пульсації втілена в найкращий в світі апарат для пресотерапії
            </p>
          </div>

          <div class="linfopress-tech-grid">
            <!-- TECH CARD 1 -->
            <div class="linfopress-tech-card" onclick="window.openLinfopressTechModal(1)">
              <div class="tech-media-box">
                <video autoplay loop muted playsinline preload="none" poster="/wp-content/uploads/2026/03/1-preview-optimized.png">
                  <source src="/wp-content/uploads/2026/03/1.mp4" type="video/mp4">
                </video>
                <span class="tech-stage-badge">ФАЗА 01</span>
              </div>
              <div class="tech-card-body">
                <h3 class="tech-card-heading">Стадія розігріву</h3>
                <ul class="tech-card-list">
                  <li><span class="bullet-check">✓</span> Ніжно розтягує тканини і судини, готуючи ділянки для інтенсивного пресомасажу.</li>
                  <li><span class="bullet-check">✓</span> Ідеально підходить для лікування фіброзного целюліту, коли пацієнтки є особливо чутливими.</li>
                </ul>
                <div class="tech-card-cta">
                  <span>Дізнатись подробиці</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>

            <!-- TECH CARD 2 -->
            <div class="linfopress-tech-card" onclick="window.openLinfopressTechModal(2)">
              <div class="tech-media-box">
                <video autoplay loop muted playsinline preload="none" poster="/wp-content/uploads/2026/03/2-preview-1-optimized.png">
                  <source src="/wp-content/uploads/2026/03/2-1.mp4" type="video/mp4">
                </video>
                <span class="tech-stage-badge">ФАЗА 02</span>
              </div>
              <div class="tech-card-body">
                <h3 class="tech-card-heading">Хвиля</h3>
                <ul class="tech-card-list">
                  <li><span class="bullet-check">✓</span> Послідовне стискання і розтискання 24-ох високоякісних манжет від дистальних ділянок до проксимальних.</li>
                  <li><span class="bullet-check">✓</span> Тривалий масаж, спрямовує рідини з периферичних ділянок до центру тіла. Підходить для лікування целюліту та релаксації.</li>
                </ul>
                <div class="tech-card-cta">
                  <span>Дізнатись подробиці</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>

            <!-- TECH CARD 3 -->
            <div class="linfopress-tech-card" onclick="window.openLinfopressTechModal(3)">
              <div class="tech-media-box">
                <video autoplay loop muted playsinline preload="none" poster="/wp-content/uploads/2026/04/limfonew-optimized.jpg">
                  <source src="/wp-content/uploads/2026/04/limfonew2.mp4" type="video/mp4">
                </video>
                <span class="tech-stage-badge">ФАЗА 03</span>
              </div>
              <div class="tech-card-body">
                <h3 class="tech-card-heading">Лімфодренаж</h3>
                <ul class="tech-card-list">
                  <li><span class="bullet-check">✓</span> Найглибший, найінтенсивніший з можливих (контрольований тиск до 80 мм Hg).</li>
                  <li><span class="bullet-check">✓</span> Тиск у 24-ох камерах зменшується, коли хвиля наближається до проксимальної цільової області.</li>
                </ul>
                <div class="tech-card-cta">
                  <span>Дізнатись подробиці</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>

            <!-- TECH CARD 4 -->
            <div class="linfopress-tech-card" onclick="window.openLinfopressTechModal(4)">
              <div class="tech-media-box">
                <video autoplay loop muted playsinline preload="none" poster="/wp-content/uploads/2026/03/4-preview-1-optimized.png">
                  <source src="/wp-content/uploads/2026/03/1.mp4" type="video/mp4">
                </video>
                <span class="tech-stage-badge">ФАЗА 04</span>
              </div>
              <div class="tech-card-body">
                <h3 class="tech-card-heading">Релаксація</h3>
                <ul class="tech-card-list">
                  <li><span class="bullet-check">✓</span> Заспокоює м’язи і тканини після інтенсивної роботи, відновлюючи тонус.</li>
                  <li><span class="bullet-check">✓</span> Ідеально для завершального лікування целюліту, синдрому втомлених ніг, після ліпосакції та вагітності.</li>
                </ul>
                <div class="tech-card-cta">
                  <span>Дізнатись подробиці</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           MODALS FOR 4 PHASES (PREMIUM BLUR-IN LIGHTBOX)
           ========================================================================== -->
      <div id="linfopress-tech-modal-overlay" class="linfopress-modal-backdrop" onclick="window.closeLinfopressTechModal(event)">
        <div class="linfopress-modal-dialog" onclick="event.stopPropagation()">
          <button type="button" class="linfopress-modal-close-btn" onclick="window.closeLinfopressTechModal()">✕</button>
          
          <div id="modal-content-1" class="modal-tab-content">
            <div class="modal-video-wrapper">
              <video controls playsinline class="modal-inner-video">
                <source src="/wp-content/uploads/2026/03/1.mp4" type="video/mp4">
              </video>
            </div>
            <div class="modal-text-content">
              <h3 class="modal-title">Стадія розігріву</h3>
              <p class="modal-desc">Стадія розігріву – це унікальна особливість апарату для пресотерапії Linfopress Evolution PRO. Її додали в кожну програму на запит досвідчених лікарів, які вважають, що тканини потрібно делікатно підготувати до компресії.</p>
              <p class="modal-desc">Linfopress Evolution PRO автоматично задає стадію розігріву, що ніжно розтягує тканини і судини, готуючи ділянки для інтенсивного пресомасажу. Ідеально підходить для лікування фіброзного целюліту, коли пацієнтки є особливо чутливими.</p>
            </div>
          </div>

          <div id="modal-content-2" class="modal-tab-content" style="display:none;">
            <div class="modal-video-wrapper">
              <video controls playsinline class="modal-inner-video">
                <source src="/wp-content/uploads/2026/03/2-1.mp4" type="video/mp4">
              </video>
            </div>
            <div class="modal-text-content">
              <h3 class="modal-title">Хвиля</h3>
              <p class="modal-desc">Цей цикл багаторазово застосовує компресивний масаж починаючи від дистальних зон до центру тіла. Така послідовність надування/здування забезпечує постійний масаж, що переміщує рідини з дистальних зон до центру тіла, сприяючи поверненню рідин і їх реабсорбції.</p>
              <p class="modal-desc">Цикл в камерах змінюється поступово: коли попередня камера здувається, наступна надувається. Масажний ефект підходить для усунення целюліту, спортивного масажу, підготовки до ліпосакції та релаксації м’язів.</p>
            </div>
          </div>

          <div id="modal-content-3" class="modal-tab-content" style="display:none;">
            <div class="modal-video-wrapper">
              <video controls playsinline class="modal-inner-video">
                <source src="/wp-content/uploads/2026/04/limfonew2.mp4" type="video/mp4">
              </video>
            </div>
            <div class="modal-text-content">
              <h3 class="modal-title">Лімфодренаж</h3>
              <p class="modal-desc">У цій стадії застосовуються фази планомірного стискання в напрямку від дистальних до проксимальних зон. Лімфодренаж в Linfopress Evolution PRO найглибший та найінтенсивніший з можливих — тиск досягає 80 мм Hg.</p>
              <p class="modal-desc">Завдяки стадії розігріву і грамотно підібраним циклам стискань процедура сприймається пацієнтками абсолютно толерантно та безболісно.</p>
            </div>
          </div>

          <div id="modal-content-4" class="modal-tab-content" style="display:none;">
            <div class="modal-video-wrapper">
              <video controls playsinline class="modal-inner-video">
                <source src="/wp-content/uploads/2026/03/1.mp4" type="video/mp4">
              </video>
            </div>
            <div class="modal-text-content">
              <h3 class="modal-title">Релаксація</h3>
              <p class="modal-desc">Найпопулярніший етап процедури пресотерапії. Пацієнтки із вдячністю сприймають зменшення тиску і ритмічні заспокійливі хвилі, відчуваючи преміальний рівень процедури.</p>
              <p class="modal-desc">Релаксація заспокоює м’язи і тканини після інтенсивної роботи, ідеально підходить для завершення лікування целюліту, синдрому втомлених ніг, реабілітації після ліпосакції та вагітності.</p>
            </div>
          </div>
        </div>
      </div>


      <!-- ==========================================================================
           4. VIDEO PROCEDURE DEMONSTRATION SECTION (#procedure)
           ========================================================================== -->
      <section class="linfopress-procedure-section" id="procedure">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Процедура Linfopress Evolution PRO</h2>
            <p class="section-main-sub">
              Повний цикл роботи апарату: від одягання ергономічних манжетів до терапевтичного лімфодренажу
            </p>
          </div>

          <div class="linfopress-procedure-cinema-box">
            <div class="cinema-media-wrap" id="linfopress-procedure-player-trigger" data-youtube="K1v77enueJ8">
              <video autoplay loop muted playsinline preload="auto" class="cinema-bg-video">
                <source src="/wp-content/uploads/2026/03/termosalud_vid.mp4" type="video/mp4">
              </video>
              <div class="cinema-play-overlay">
                <div class="cinema-play-button">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <span class="cinema-play-text">ДИВИТИСЬ ВІДЕО-ПРЕЗЕНТАЦІЮ</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           5. KEY ADVANTAGES 9-ITEM MATRIX (#advantages)
           ========================================================================== -->
      <section class="linfopress-advantages-grid-section" id="advantages">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Переваги Linfopress Evolution PRO</h2>
            <p class="section-main-sub">
              9 ключових технологічних переваг, що роблять Linfopress лідером на ринку медичної пресотерапії
            </p>
          </div>

          <div class="linfopress-advantages-row">
            <div class="linfopress-advantages-col-list">
              <div class="adv-item-card">
                <span class="adv-index">01</span>
                <p class="adv-text">Перший у світі апарат для пресотерапії з масажем ділянок холки та боків (love-handles)</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">02</span>
                <p class="adv-text">Нове покоління інтелектуальної пресотерапії: технологія біоміметичної послідовної пульсації</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">03</span>
                <p class="adv-text">Підвищена безпека завдяки автоматичному контролю тиску в кожній окремій манжеті</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">04</span>
                <p class="adv-text">Найзручніший у роботі: бандажі для ніг і рук мають 3 рівні застібок-блискавок для будь-якої комплекції</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">05</span>
                <p class="adv-text">Найкомфортніший для пацієнта завдяки обов'язковим етапам розігріву і релаксації</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">06</span>
                <p class="adv-text">Ключовий елемент клінічних програм «Детокс», «Схуднення» та «Антицелюліт»</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">07</span>
                <p class="adv-text">Широко використовується у спортивній медицині (розігрів перед тренуваннями, швидке зняття крепатури)</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">08</span>
                <p class="adv-text">Незамінний у післяопераційній реабілітації для усунення застійних набряків та фіброзу</p>
              </div>

              <div class="adv-item-card">
                <span class="adv-index">09</span>
                <p class="adv-text">Найвища якість матеріалів виконання європейського виробництва (апарат класу преміум)</p>
              </div>
            </div>

            <div class="linfopress-advantages-col-media">
              <div class="adv-media-sticky-box">
                <img src="/wp-content/uploads/2026/03/abr-img-optimized.png" alt="Переваги Linfopress Evolution PRO" class="adv-product-photo" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           6. INDICATIONS & CONTRAINDICATIONS (SIGNATURE FOOTER GRAY #54595f BACKGROUND)
           ========================================================================== -->
      <section class="linfopress-matrix-section" id="indications">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Показання та протипоказання</h2>
            <p class="section-main-sub">
              Повний спектр терапевтичного застосування та медичні критерії безпеки пацієнта
            </p>
          </div>

          <div class="linfopress-creative-matrix-grid">
            <!-- LEFT CARD: INDICATIONS -->
            <div class="matrix-creative-card indications-card">
              <div class="matrix-card-header">
                <h3 class="matrix-main-head">Клінічні показання</h3>
                <p class="matrix-sub-head">8 ключових терапевтичних напрямків апарату Linfopress</p>
              </div>

              <div class="matrix-items-stack">
                <div class="matrix-item-row">
                  <span class="item-index">01</span>
                  <div class="item-content">
                    <h4 class="item-title">Лікування едематозного целюліту</h4>
                    <p class="item-desc">Усунення застою рідини у підшкірно-жировій клітковині та розгладження рельєфу шкіри.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">02</span>
                  <div class="item-content">
                    <h4 class="item-title">Зменшення затримки рідини та набряків</h4>
                    <p class="item-desc">Потужне виведення токсинів та відновлення нормального лімфотоку по всьому тілу.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">03</span>
                  <div class="item-content">
                    <h4 class="item-title">Підготовка та реабілітація після ліпосакції</h4>
                    <p class="item-desc">Профілактика нерівностей, рубцювання та прискорення реабілітаційного періоду.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">04</span>
                  <div class="item-content">
                    <h4 class="item-title">Пост-операційна реабілітація</h4>
                    <p class="item-desc">Відновлення мікроциркуляції після оперативних втручань та мастектомії.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">05</span>
                  <div class="item-content">
                    <h4 class="item-title">Детоксикація тканин та загальний лімфодренаж</h4>
                    <p class="item-desc">Активація обмінних процесів організму та глибоке очищення лімфатичної системи.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">06</span>
                  <div class="item-content">
                    <h4 class="item-title">Спортивна медицина та зняття крепатури</h4>
                    <p class="item-desc">Зняття міофасціального гіпертонусу (DOMS), розігрів перед тренуваннями та регенерація зв'язок.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">07</span>
                  <div class="item-content">
                    <h4 class="item-title">Покращення кровообігу та зняття втоми ніг</h4>
                    <p class="item-desc">Усунення синдрому «важких ніг» та профілактика хронічної венозної недостатності.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-index">08</span>
                  <div class="item-content">
                    <h4 class="item-title">Післяпологове відновлення</h4>
                    <p class="item-desc">Швидка нормалізація водно-сольового балансу та зняття набряків після пологів.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT CARD: CONTRAINDICATIONS -->
            <div class="matrix-creative-card contraindications-card">
              <div class="matrix-card-header">
                <h3 class="matrix-main-head">Протипоказання</h3>
                <p class="matrix-sub-head">Медичні протоколи безпеки пацієнта CE Medical</p>
              </div>

              <div class="matrix-items-stack">
                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Онкологічні захворювання</h4>
                    <p class="item-desc">Злоякісні пухлини в анамнезі або активній фазі.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Порушення цілісності шкірного покриву</h4>
                    <p class="item-desc">Відкриті рани, опіки, виразки або інфекційні дерматити в зоні манжетів.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Тромбофлебіт та гострий тромбоз</h4>
                    <p class="item-desc">Запалення вен або ризик відриву тромбів у судинній системі.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Важка серцева недостатність</h4>
                    <p class="item-desc">Декомпенсовані патології серцево-судинної системи та наявність кардіостимулятора.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Цукровий діабет (декомпенсована форма)</h4>
                    <p class="item-desc">Важкі порушення трофіки тканин та периферичної чутливості.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Гострі інфекційні стани та лихоманка</h4>
                    <p class="item-desc">ГРВІ, грип, підвищена температура тіла та запальні процеси.</p>
                  </div>
                </div>

                <div class="matrix-item-row">
                  <span class="item-alert-icon">✕</span>
                  <div class="item-content">
                    <h4 class="item-title">Епілепсія та розлади ЦНС</h4>
                    <p class="item-desc">Стани підвищеної судомної готовності та гострі нервові розлади.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           7. DOCTORS TRUST & CLINICAL REVIEW
           ========================================================================== -->
      <section class="linfopress-doctor-section" id="expert-review">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Досвід лікарів</h2>
            <p class="section-main-sub">
              Практичний клінічний досвід використання Linfopress у провідних медичних та SPA-центрах України
            </p>
          </div>

          <div class="linfopress-doctor-card">
            <div class="doc-photo-col">
              <img src="/wp-content/uploads/2026/03/experience-block-img-optimized.png" alt="Гуцул Оксана Миколаївна" class="doc-portrait-img" loading="lazy">
            </div>
            <div class="doc-text-col">
              <div class="doc-quote-mark">“</div>
              <h3 class="doc-quote-title">Linfopress Evolution PRO — це новий стандарт у пресотерапії, який перевершив усі мої очікування як лікаря</h3>
              <p class="doc-quote-text">
                Працюючи в сфері естетичної медицини та реабілітації багато років, я мала справу з різними апаратами. Але коли в нашій клініці з’явився Linfopress Evolution PRO, це повністю змінило підхід до процедури. З точки зору фахівця, апарат неймовірно зручний: одягання манжет більше не забирає багато часу, а завдяки 3 рядам блискавок штани ідеально адаптуються під пацієнтів будь-якого зросту від 1,5 до 2 метрів. Головна перевага — технологія біоміметичної послідовної пульсації та стадія розігріву, що дозволяє працювати абсолютно безболісно навіть із чутливим фіброзним целюлітом.
              </p>
              <div class="doc-meta-box">
                <h4 class="doc-name">Гуцул Оксана Миколаївна</h4>
                <p class="doc-role">Головний лікар Arden Palace Medical Resort & SPA</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           8. WHY LINFOPRESS & EQUIPMENT PACKAGE (#why)
           ========================================================================== -->
      <section class="linfopress-why-and-package-section" id="why">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Чому саме Linfopress Evolution PRO</h2>
            <p class="section-main-sub">
              5 ключових технологічних причин інвестувати у флагман пресотерапії
            </p>
          </div>

          <div class="why-benefits-grid">
            <div class="why-bento-card">
              <span class="why-num">01</span>
              <h4 class="why-card-title">Унікальна комбінація форм пресомасажу</h4>
              <p class="why-card-desc">Поєднання 4 послідовних фаз стискання в єдиній інтелектуальній програмі.</p>
            </div>

            <div class="why-bento-card">
              <span class="why-num">02</span>
              <h4 class="why-card-title">Преміальна якість матеріалів</h4>
              <p class="why-card-desc">Високоміцна медична тканина з легким очищенням та зносостійкістю понад 10 років.</p>
            </div>

            <div class="why-bento-card">
              <span class="why-num">03</span>
              <h4 class="why-card-title">Унікальна куртка для холки та боків</h4>
              <p class="why-card-desc">Єдиний у світі бандаж для опрацювання проблемних зон спини, грудей і love-handles.</p>
            </div>

            <div class="why-bento-card">
              <span class="why-num">04</span>
              <h4 class="why-card-title">Найзручніший метод одягання манжет</h4>
              <p class="why-card-desc">Швидка підготовка пацієнта за 60 секунд завдяки ергономічним потрійним блискавкам.</p>
            </div>

            <div class="why-bento-card">
              <span class="why-num">05</span>
              <h4 class="why-card-title">Найінтенсивніший лімфодренажний масаж</h4>
              <p class="why-card-desc">Глибокий та безпечний вплив завдяки автоматичному біоміметичному контролю тиску.</p>
            </div>
          </div>

          <!-- EQUIPMENT PACKAGE -->
          <div class="linfopress-package-box">
            <div class="package-header">
              <h3 class="package-title">Комплект поставки</h3>
              <p class="package-subtitle">Повна заводська комплектація обладнання для миттєвого старту роботи в клініці</p>
            </div>

            <div class="package-items-grid">
              <div class="package-item-card">
                <div class="package-img-wrap">
                  <img src="/wp-content/uploads/2026/03/set1-optimized.png" alt="Апарат Linfopress" loading="lazy">
                </div>
                <h4 class="package-item-name">Апарат Linfopress PRO</h4>
              </div>

              <div class="package-item-card">
                <div class="package-img-wrap">
                  <img src="/wp-content/uploads/2026/03/set2-optimized.png" alt="Функціональний візок" loading="lazy">
                </div>
                <h4 class="package-item-name">Функціональний візок</h4>
              </div>

              <div class="package-item-card">
                <div class="package-img-wrap">
                  <img src="/wp-content/uploads/2026/03/pants2-optimized.jpg" alt="Манжети для ніг" loading="lazy">
                </div>
                <h4 class="package-item-name">Манжети для ніг і пояс</h4>
              </div>

              <div class="package-item-card">
                <div class="package-img-wrap">
                  <img src="/wp-content/uploads/2026/03/shirt2-optimized.jpg" alt="Куртка для тулубу" loading="lazy">
                </div>
                <h4 class="package-item-name">Куртка для тулубу та холки</h4>
              </div>

              <div class="package-item-card">
                <div class="package-img-wrap">
                  <img src="/wp-content/uploads/2026/03/set5-optimized.png" alt="Манжети для рук" loading="lazy">
                </div>
                <h4 class="package-item-name">Дві манжети для рук</h4>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           9. FAQ ACCORDION SECTION (#faq)
           ========================================================================== -->
      <section class="linfopress-faq-section" id="faq">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Питання та відповіді</h2>
            <p class="section-main-sub">
              Відповіді на поширені запитання про Linfopress Evolution PRO та клінічну ефективність системи
            </p>
          </div>

          <div class="linfopress-faq-accordion">
            <div class="faq-accordion-card active" onclick="window.toggleLinfopressFaq(this)">
              <div class="faq-card-header">
                <span class="faq-q-index">01</span>
                <h3 class="faq-q-text">Чим Linfopress Evolution PRO відрізняється від традиційних систем пресотерапії?</h3>
                <span class="faq-toggle-icon">−</span>
              </div>
              <div class="faq-card-body" style="display:block;">
                <p>Унікальною особливістю Linfopress Evolution PRO є спеціальна компресійна куртка для верхньої частини тулуба, яка здійснює лімфомасаж не тільки рук, але й боків (love handles), грудної ділянки і навіть «холки» (вдовиного горбика). Крім того, апарат має 24 незалежні пневмосектори з перекриттям без сліпих зон та 4-фазну біоміметичну пульсацію з обов'язковим розігрівом тканин.</p>
              </div>
            </div>

            <div class="faq-accordion-card" onclick="window.toggleLinfopressFaq(this)">
              <div class="faq-card-header">
                <span class="faq-q-index">02</span>
                <h3 class="faq-q-text">Скільки процедур потрібно для досягнення вираженого результату?</h3>
                <span class="faq-toggle-icon">+</span>
              </div>
              <div class="faq-card-body">
                <p>Для зняття відчуття втоми, важкості в ногах та швидкого лімфодренажу достатньо однієї процедури. Для стійкого лікування едематозного целюліту, стійкого зменшення об'ємів та детоксикації рекомендується курс з 10–12 процедур з періодичністю 2–3 сеанси на тиждень.</p>
              </div>
            </div>

            <div class="faq-accordion-card" onclick="window.toggleLinfopressFaq(this)">
              <div class="faq-card-header">
                <span class="faq-q-index">03</span>
                <h3 class="faq-q-text">Чи є процедура болісною для пацієнтів із чутливими судинами?</h3>
                <span class="faq-toggle-icon">+</span>
              </div>
              <div class="faq-card-body">
                <p>Процедура на Linfopress Evolution PRO є абсолютно комфортною та приємною. Завдяки автоматичній стадії м'якого розігріву тканини та судини плавно адаптуються до тиску, що повністю виключає синці, біль та дискомфорт навіть у пацієнток із чутливим фіброзним целюлітом.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           10. OFFICIAL TEST-DRIVE APPLICATION FORM (#application)
           ========================================================================== -->
      <section class="linfopress-partner-stage-section" id="application">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Стати партнером TermoSalud</h2>
            <p class="section-main-sub">
              Замовте персональну презентацію та виїзний тест-драйв Linfopress Evolution PRO у вашій клініці
            </p>
          </div>

          <div class="partner-form-stage-wrapper">
            <div class="partner-form-card-clean">
              <h3 class="presentation-title-clean">Заявка на презентацію Linfopress</h3>
              <p class="presentation-desc-clean">
                Заповніть форму, і наш медичний експерт зв'яжеться з вами для організації демонстрації
              </p>

              <form action="/send-mail" method="POST" class="clean-lead-form">
                <div class="clean-form-row">
                  <div class="clean-input-group">
                    <label>Ваше ім'я</label>
                    <input type="text" name="name" placeholder="Олена Шевченко" required>
                  </div>
                  <div class="clean-input-group">
                    <label>Контактний телефон</label>
                    <input type="tel" name="phone" placeholder="+380 (XX) XXX-XX-XX" required>
                  </div>
                </div>

                <div class="clean-form-row">
                  <div class="clean-input-group">
                    <label>Назва клініки / міста</label>
                    <input type="text" name="clinic" placeholder="Центр естетичної медицини, Київ">
                  </div>
                  <div class="clean-input-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="clinic@example.com">
                  </div>
                </div>

                <button type="submit" class="clean-submit-btn">
                  <span>ЗАМОВИТИ ВИЇЗНИЙ ТЕСТ-ДРАЙВ</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>


      <!-- ==========================================================================
           11. EXPANDABLE SEO CLEAN ARTICLE (.seo_text)
           ========================================================================== -->
      <section class="linfopress-seo-clean-section" id="seo-article">
        <div class="container">
          <div class="seo-clean-wrapper">
            <h2 class="seo-article-main-title">Купити апарат для пресотерапії Linfopress Evolution PRO: інновації в лімфодренажі</h2>
            
            <p class="seo-lead-text">
              Якісний апаратний лімфодренажний масаж — це базова та необхідна процедура в будь-якій сучасній клініці естетичної медицини. Він посилює ефект від інших методик корекції фігури та є самостійним потужним терапевтичним інструментом. Linfopress Evolution PRO — це передове обладнання преміумкласу, створене для досягнення бездоганних результатів та забезпечення максимального комфорту пацієнта.
            </p>

            <div class="seo-expandable-content" id="linfopress-seo-expand-box">
              <h3 class="seo-article-sub-title">Біоміметична пульсація — новий стандарт терапії</h3>
              <p>Ключова інновація, що відрізняє цей професійний апарат для пресотерапії, полягає у використанні технології біоміметичної послідовної пульсації. Ця система максимально точно імітує природні фізіологічні процеси організму людини.</p>
              
              <ul class="seo-bullet-list">
                <li><strong>Розігрів:</strong> Ексклюзивний режим, який м’яко готує тканини до впливу, що критично важливо при лікуванні фіброзного целюліту.</li>
                <li><strong>Активація:</strong> Стимуляція роботи лімфатичних вузлів і запуск обмінних процесів.</li>
                <li><strong>Дренаж:</strong> Глибоке та інтенсивне виведення надлишкової міжклітинної рідини й накопичених токсинів.</li>
                <li><strong>Розслаблення:</strong> Зняття м’язового спазму та досягнення глибокого релаксаційного ефекту.</li>
              </ul>

              <h3 class="seo-article-sub-title">Ексклюзивні переваги для клініки</h3>
              <p>Linfopress пропонує унікальну куртку для масажу верхньої частини тулуба, універсальні манжети з 3 рівнями блискавок та швидке одягання за 60 секунд, заощаджуючи час лікаря та збільшуючи рентабельність кожного кабінету.</p>
            </div>

            <button type="button" class="seo-toggle-action-btn" id="linfopress-seo-toggle-btn" onclick="window.toggleLinfopressSeoArticle()">
              <span id="linfopress-seo-btn-label">Читати повністю ∨</span>
            </button>
          </div>
        </div>
      </section>
`;

// Replace Linfopress HTML generation in scripts/process-html.mjs
const lpTarget = 'if (pageName === \'linfopress\') {';
const lpStartIdx = htmlMjs.indexOf(lpTarget);
const lpEndIdx = htmlMjs.indexOf('if (pageName === \'about-us\')', lpStartIdx);

if (lpStartIdx > -1 && lpEndIdx > -1) {
  const replacement = `if (pageName === 'linfopress') {
    const modernLinfopressHtml = \`${modernLinfopressTemplate}\`;
    bodyContent = modernLinfopressHtml;
  }

  `;
  htmlMjs = htmlMjs.substring(0, lpStartIdx) + replacement + htmlMjs.substring(lpEndIdx);
  fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');
  console.log('Successfully updated scripts/process-html.mjs with all modern Linfopress sections!');
} else {
  console.error('Could not find Linfopress section block in scripts/process-html.mjs');
}

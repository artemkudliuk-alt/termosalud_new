import fs from 'fs';

let code = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const sec3OldRegex = /<!-- 3\. TECHNICAL SUIT ARCHITECTURE[\s\S]*?<\/section>/;
const sec3New = `      <!-- 3. TECHNICAL SUIT ARCHITECTURE (24 SECTORS & COMFORT) -->
      <section class="linfopress-tech-section" id="suit-technology">
        <div class="container">
          <div class="zionic-section-header">
            <span class="section-kicker">АНАТОМІЧНА ДОСКОНАЛІСТЬ</span>
            <h2>24 ПЕРЕКРИВНІ СЕКЦІЇ ТА СИСТЕМА ДАТЧИКІВ</h2>
            <p class="section-subtitle">
              Унікальна конструкція костюма з косим перекриттям виключає зони зворотного тиску та гарантує фізіологічно точний відтік лімфи.
            </p>
          </div>

          <div class="linfopress-tech-grid">
            <!-- Card 1 -->
            <div class="linfopress-card">
              <div class="linfopress-card-media">
                <img src="/wp-content/uploads/linfopress_official/tech_24_chambers.png" alt="24 косі камери перекриття" loading="lazy">
              </div>
              <div class="linfopress-card-body">
                <span class="linfopress-num">01</span>
                <h3>24 косі камери перекриття</h3>
                <p>Особливе розташування секцій ялинкою запобігає розривам тиску та спрямовує рух рідини від периферії до центральних вузлів.</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="linfopress-card">
              <div class="linfopress-card-media">
                <img src="/wp-content/uploads/linfopress_official/tech_pillow.png" alt="Ергономічний валик під шию" loading="lazy">
              </div>
              <div class="linfopress-card-body">
                <span class="linfopress-num">02</span>
                <h3>Ергономічний валик під шию</h3>
                <p>Анатомічна подушка підтримує шийний відділ хребта, знімає напругу трапецієподібних м'язів та забезпечує повний релакс.</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="linfopress-card">
              <div class="linfopress-card-media">
                <img src="/wp-content/uploads/linfopress_official/tech_ankle.png" alt="Вільна зона щиколотки" loading="lazy">
              </div>
              <div class="linfopress-card-body">
                <span class="linfopress-num">03</span>
                <h3>Вільна зона щиколотки</h3>
                <p>Продумане звільнення гомілковостопного суглоба гарантує коректний венозний відтік без травмування судинної сітки.</p>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="linfopress-card">
              <div class="linfopress-card-media">
                <img src="/wp-content/uploads/linfopress_official/tech_sensors.png" alt="Сенсорний контроль та калібрування" loading="lazy">
              </div>
              <div class="linfopress-card-body">
                <span class="linfopress-num">04</span>
                <h3>Сенсорне калібрування камер</h3>
                <p>Мікропроцесорний контроль тиску в кожній окремій камері з індивідуальним налаштуванням під клінічні задачі пацієнта.</p>
              </div>
            </div>
          </div>
        </div>
      </section>`;

code = code.replace(sec3OldRegex, sec3New);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', code, 'utf8');
console.log('Restored original section 3 images.');

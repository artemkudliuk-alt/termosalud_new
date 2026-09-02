import fs from 'fs';

let code = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const sec2OldRegex = /<!-- 2\. ADVANCED COMPRESSION & PROCEDURE SHOWCASE[\s\S]*?<\/section>/;
const sec2New = `      <!-- 2. ADVANCED COMPRESSION & PROCEDURE SHOWCASE (TOP HEADER + FULL WIDTH IMAGE) -->
      <section class="linfopress-advanced-section" id="linfopress-advantages">
        <div class="container">
          
          <!-- 1. Top Centered Headline (Clean, no extra clutter) -->
          <div class="linfopress-advanced-header">
            <h2 class="linfopress-advanced-title">
              ПРЕСОТЕРАПІЯ <span class="title-bold">ПЕРЕДОВОЇ КОМПРЕСІЇ</span>
            </h2>
            <p class="linfopress-advanced-desc">
              <strong>Linfopress Evolution PRO</strong> — це система імпульсної пневматичної пресотерапії, що точно імітує фізіологічний рух кровообігу та лімфотоку. З клінічною ефективністю, видимою з першого сеансу, і без періоду відновлення.
            </p>
          </div>
        </div>

        <!-- 2. Stretched Wide Procedure Bed Image Underneath (Full Viewport Width 100vw, Edge to Edge) -->
        <div class="linfopress-procedure-stretch-wrap">
          <img src="/wp-content/uploads/linfopress_official/new_photo_3.png" alt="Linfopress Evolution PRO Процедура на кушетці" class="linfopress-procedure-stretch-img" loading="lazy">
        </div>
      </section>`;

code = code.replace(sec2OldRegex, sec2New);

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
                <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Circular Arrow Arcs -->
                  <path d="M40 10C56.5685 10 70 23.4315 70 40C70 43.2 69.49 46.28 68.54 49.16" stroke="#000000" stroke-width="2.8" stroke-linecap="round"/>
                  <path d="M40 70C23.4315 70 10 56.5685 10 40C10 36.8 10.51 33.72 11.46 30.84" stroke="#000000" stroke-width="2.8" stroke-linecap="round"/>
                  <!-- Arrowheads -->
                  <polygon points="5 32 12 25 19 32" stroke="#000000" stroke-width="2.5" stroke-linejoin="round" fill="#000000"/>
                  <polygon points="75 48 68 55 61 48" stroke="#000000" stroke-width="2.5" stroke-linejoin="round" fill="#000000"/>
                  <!-- Central Lightning Bolt -->
                  <path d="M43 19L29 42H41L37 61L53 37H41L43 19Z" stroke="#000000" stroke-width="2.8" stroke-linejoin="round" fill="none"/>
                </svg>
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
                <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Outer Arc Brackets -->
                  <path d="M22 13C33 6 47 6 58 13" stroke="#000000" stroke-width="2.8" stroke-linecap="round"/>
                  <path d="M58 67C47 74 33 74 22 67" stroke="#000000" stroke-width="2.8" stroke-linecap="round"/>
                  <!-- 2 Jigsaw puzzle pieces interlocking diagonally -->
                  <g transform="rotate(45 40 40)">
                    <path d="M26 23H35C35 25.5 37 27.5 40 27.5C43 27.5 45 25.5 45 23H54V38C51.5 38 49.5 40 49.5 43C49.5 46 51.5 48 54 48V57H45C45 54.5 43 52.5 40 52.5C37 52.5 35 54.5 35 57H26V48C28.5 48 30.5 46 30.5 43C30.5 40 28.5 38 26 38V23Z" stroke="#000000" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M26 40H36C36 37 38 35 41 35C44 35 46 37 46 40H54" stroke="#000000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </g>
                </svg>
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
                <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Hand Palm & 5 Fingers -->
                  <path d="M31 70V38C31 36.3 32.3 35 34 35C35.7 35 37 36.3 37 38V28C37 26.3 38.3 25 40 25C41.7 25 43 26.3 43 28V26C43 24.3 44.3 23 46 23C47.7 23 49 24.3 49 26V30C49 28.3 50.3 27 52 27C53.7 27 55 28.3 55 30V48C55 58 48 70 38 70H31Z" stroke="#000000" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <!-- Thumb -->
                  <path d="M31 54L22 44C20.8 42.5 22 40 24 40.5L31 43" stroke="#000000" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <!-- Wrist line -->
                  <path d="M31 70H40" stroke="#000000" stroke-width="3" stroke-linecap="round"/>
                  <!-- Palm creases -->
                  <path d="M35 49C38 53 43 55 50 53" stroke="#000000" stroke-width="2.2" stroke-linecap="round"/>
                  <!-- Sparkles -->
                  <path d="M14 26L16.5 20L23 17.5L16.5 15L14 8.5L11.5 15L5 17.5L11.5 20L14 26Z" fill="#000000"/>
                  <path d="M62 18L64 14L68 12L64 10L62 6L60 10L56 12L60 14L62 18Z" fill="#000000"/>
                  <path d="M64 62L65.5 58L69.5 56.5L65.5 55L64 51L62.5 55L58.5 56.5L62.5 58L64 62Z" fill="#000000"/>
                </svg>
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
                <svg width="76" height="76" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Shield with Checkmark -->
                  <path d="M50 10L65 17V32C65 42 57 48 50 51C43 48 35 42 35 32V17L50 10Z" stroke="#000000" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M43 31L48 36L58 24" stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <!-- Sleeve / Cuff -->
                  <rect x="9" y="42" width="10" height="24" rx="2" stroke="#000000" stroke-width="2.8"/>
                  <circle cx="14" cy="54" r="1.8" fill="#000000"/>
                  <!-- Hand & Fingers supporting the shield -->
                  <path d="M19 47H30L38 50H58C63 50 67 53 65 58L59 66H30L19 60" stroke="#000000" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
console.log('Successfully updated scripts/process-html.mjs');

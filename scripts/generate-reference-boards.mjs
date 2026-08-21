import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const htmlFiles = [
  {
    name: 'start_frame_flagships_split',
    title: '1. START-FRAME: ДВА ФЛАГМАНСЬКІ АПАРАТИ',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Montserrat', -apple-system, sans-serif; }
    body {
      width: 1920px; height: 1080px; overflow: hidden;
      background: #0f141c;
      color: #ffffff;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .header-bar {
      height: 96px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
      background: rgba(18, 24, 34, 0.95);
      border-bottom: 2px solid rgba(93, 135, 150, 0.4);
      z-index: 10;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 1px;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .badge-pill {
      background: #5d8796;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      padding: 6px 16px;
      border-radius: 30px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 15px;
      color: #b6cbd2;
      font-weight: 600;
    }
    .split-stage {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
    }
    .split-divider {
      position: absolute;
      top: 0; bottom: 0; left: 50%;
      width: 2px;
      background: linear-gradient(to bottom, rgba(93, 135, 150, 0.8), rgba(255, 255, 255, 0.2), rgba(93, 135, 150, 0.8));
      transform: translateX(-50%);
      z-index: 5;
    }
    .split-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px;
      overflow: hidden;
    }
    .split-card.left {
      background: radial-gradient(circle at 40% 50%, rgba(93, 135, 150, 0.22) 0%, rgba(15, 20, 28, 0.95) 75%);
    }
    .split-card.right {
      background: radial-gradient(circle at 60% 50%, rgba(45, 55, 72, 0.35) 0%, rgba(15, 20, 28, 0.95) 75%);
    }
    .card-top-tag {
      position: absolute;
      top: 36px;
      left: 50px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      z-index: 8;
    }
    .device-number {
      font-size: 13px;
      font-weight: 800;
      color: #5d8796;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .device-name {
      font-size: 32px;
      font-weight: 900;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .device-spec {
      font-size: 14px;
      color: #94a3b8;
      font-weight: 500;
    }
    .device-visual {
      height: 560px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 6;
    }
    .device-img {
      max-height: 500px;
      filter: drop-shadow(0 25px 45px rgba(0, 0, 0, 0.6));
    }
    .floor-reflection {
      position: absolute;
      bottom: 20px;
      width: 400px;
      height: 30px;
      border-radius: 50%;
      background: radial-gradient(ellipse, rgba(93, 135, 150, 0.35) 0%, transparent 70%);
      filter: blur(10px);
    }
    .bottom-info-bar {
      position: absolute;
      bottom: 30px;
      display: flex;
      gap: 16px;
      z-index: 8;
    }
    .spec-badge {
      background: rgba(30, 35, 46, 0.85);
      border: 1px solid rgba(182, 203, 210, 0.25);
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="header-bar">
    <div class="brand-title">
      <span>TERMOSALUD</span>
      <span class="badge-pill">СТАРТ-ФРЕЙМ ВІДЕО-ПРОЛЬОТУ</span>
    </div>
    <div class="subtitle">Кінематографічний роздільний план (16:9 • 8K Master)</div>
  </div>

  <div class="split-stage">
    <div class="split-divider"></div>

    <!-- Left Device: Linfopress -->
    <div class="split-card left">
      <div class="card-top-tag">
        <span class="device-number">01. АПАРАТ ПРЕСОТЕРАПІЇ</span>
        <h2 class="device-name">Linfopress Evolution PRO</h2>
        <span class="device-spec">24 незалежні сектори • Сенсорний дисплей • Преміум клінічний корпус</span>
      </div>
      <div class="device-visual">
        <div class="floor-reflection"></div>
        <img class="device-img" src="/wp-content/uploads/2026/03/linfopress-optimized.png" alt="Linfopress Evolution PRO">
      </div>
      <div class="bottom-info-bar">
        <div class="spec-badge">❄️ М'яке блакитно-сталеве світло</div>
        <div class="spec-badge">⏱ 8-секундний повільний політ</div>
      </div>
    </div>

    <!-- Right Device: Zionic -->
    <div class="split-card right">
      <div class="card-top-tag">
        <span class="device-number">02. АПАРАТ РОТАЦІЙНОГО МАСАЖУ + RF</span>
        <h2 class="device-name">ZIONIC MARP SYSTEM</h2>
        <span class="device-spec">Глибока ремоделяція • LED-кільце керування • Активна маніпула</span>
      </div>
      <div class="device-visual">
        <div class="floor-reflection"></div>
        <img class="device-img" src="/wp-content/uploads/2026/03/zionic-optimized.png" alt="ZIONIC">
      </div>
      <div class="bottom-info-bar">
        <div class="spec-badge">🌑 Темно-графітове медичне світло</div>
        <div class="spec-badge">🔬 Макро-ракурс ротаційної маніпули</div>
      </div>
    </div>
  </div>
</body>
</html>`
  },
  {
    name: 'linfopress_3_angles_sheet',
    title: '2. LINFOPRESS: 3 РАКУРСИ ПРОЛЬОТУ КАМЕРИ',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Montserrat', -apple-system, sans-serif; }
    body {
      width: 1920px; height: 1080px; overflow: hidden;
      background: #0d121a;
      color: #ffffff;
      display: flex;
      flex-direction: column;
    }
    .header-bar {
      height: 96px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
      background: rgba(18, 24, 34, 0.95);
      border-bottom: 2px solid #5d8796;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 900;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .badge-pill {
      background: #5d8796;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      padding: 6px 16px;
      border-radius: 30px;
      letter-spacing: 1.5px;
    }
    .angles-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
      padding: 30px 50px;
    }
    .angle-card {
      background: radial-gradient(circle at 50% 45%, rgba(93, 135, 150, 0.18) 0%, rgba(15, 20, 28, 0.95) 80%);
      border: 1px solid rgba(182, 203, 210, 0.2);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 30px 20px;
      position: relative;
      overflow: hidden;
    }
    .angle-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 4px;
      background: #5d8796;
    }
    .angle-tag-badge {
      background: rgba(93, 135, 150, 0.25);
      border: 1px solid #5d8796;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      padding: 6px 18px;
      border-radius: 20px;
      letter-spacing: 1px;
    }
    .angle-title {
      font-size: 20px;
      font-weight: 900;
      color: #ffffff;
      margin-top: 10px;
      text-align: center;
    }
    .angle-visual {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
    }
    .angle-img {
      max-height: 420px;
      filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.6));
    }
    .angle-desc {
      font-size: 13.5px;
      color: #94a3b8;
      text-align: center;
      line-height: 1.5;
      max-width: 90%;
      background: rgba(0,0,0,0.3);
      padding: 10px 16px;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="header-bar">
    <div class="brand-title">
      <span>LINFOPRESS EVOLUTION PRO</span>
      <span class="badge-pill">3 КЛЮЧОВІ РАКУРСИ ПРОЛЬОТУ</span>
    </div>
    <div style="color: #b6cbd2; font-weight: 600; font-size: 15px;">Ракурсний лист для 8-секундної генерації відео</div>
  </div>

  <div class="angles-grid">
    <!-- Angle 1 -->
    <div class="angle-card">
      <div style="text-align: center;">
        <span class="angle-tag-badge">РАКУРС 1 • СТАРТ</span>
        <h3 class="angle-title">Фронтальний загальний план</h3>
      </div>
      <div class="angle-visual">
        <img class="angle-img" src="/wp-content/uploads/2026/03/linfopress-optimized.png" alt="Frontal View">
      </div>
      <p class="angle-desc">Повний огляд апарата на колесах, сенсорного планшета та фірмових пневмо-роз'ємів підключення костюма.</p>
    </div>

    <!-- Angle 2 -->
    <div class="angle-card">
      <div style="text-align: center;">
        <span class="angle-tag-badge">РАКУРС 2 • ОБЛІТ</span>
        <h3 class="angle-title">3/4 Перспектива та глибина</h3>
      </div>
      <div class="angle-visual">
        <img class="angle-img" src="/wp-content/uploads/2026/03/linfopress-optimized.png" alt="Isometric View" style="transform: scale(1.05);">
      </div>
      <p class="angle-desc">Плавний обліт камери навколо бічного рельєфу, вентиляційної решітки та двоколірної медичної обшивки корпусу.</p>
    </div>

    <!-- Angle 3 -->
    <div class="angle-card">
      <div style="text-align: center;">
        <span class="angle-tag-badge">РАКУРС 3 • МАКРО</span>
        <h3 class="angle-title">Макро-фокус дисплея та портів</h3>
      </div>
      <div class="angle-visual">
        <img class="angle-img" src="/wp-content/uploads/2026/03/linfopress-optimized.png" alt="Macro View" style="transform: scale(1.2) translateY(-20px);">
      </div>
      <p class="angle-desc">Кінематографічне наближення до цифрового сенсорного інтерфейсу та хромованих фітингів 24-секторного тиску.</p>
    </div>
  </div>
</body>
</html>`
  },
  {
    name: 'zionic_3_angles_sheet',
    title: '3. ZIONIC: 3 РАКУРСИ ПРОЛЬОТУ КАМЕРИ',
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Montserrat', -apple-system, sans-serif; }
    body {
      width: 1920px; height: 1080px; overflow: hidden;
      background: #0d121a;
      color: #ffffff;
      display: flex;
      flex-direction: column;
    }
    .header-bar {
      height: 96px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px;
      background: rgba(18, 24, 34, 0.95);
      border-bottom: 2px solid #5d8796;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 900;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .badge-pill {
      background: #5d8796;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      padding: 6px 16px;
      border-radius: 30px;
      letter-spacing: 1.5px;
    }
    .angles-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 24px;
      padding: 30px 50px;
    }
    .angle-card {
      background: radial-gradient(circle at 50% 45%, rgba(45, 55, 72, 0.3) 0%, rgba(15, 20, 28, 0.95) 80%);
      border: 1px solid rgba(182, 203, 210, 0.2);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 30px 20px;
      position: relative;
      overflow: hidden;
    }
    .angle-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 4px;
      background: #5d8796;
    }
    .angle-tag-badge {
      background: rgba(93, 135, 150, 0.25);
      border: 1px solid #5d8796;
      color: #ffffff;
      font-size: 13px;
      font-weight: 800;
      padding: 6px 18px;
      border-radius: 20px;
      letter-spacing: 1px;
    }
    .angle-title {
      font-size: 20px;
      font-weight: 900;
      color: #ffffff;
      margin-top: 10px;
      text-align: center;
    }
    .angle-visual {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
    }
    .angle-img {
      max-height: 420px;
      filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.6));
    }
    .angle-desc {
      font-size: 13.5px;
      color: #94a3b8;
      text-align: center;
      line-height: 1.5;
      max-width: 90%;
      background: rgba(0,0,0,0.3);
      padding: 10px 16px;
      border-radius: 10px;
    }
  </style>
</head>
<body>
  <div class="header-bar">
    <div class="brand-title">
      <span>ZIONIC MARP TECHNOLOGY</span>
      <span class="badge-pill">3 КЛЮЧОВІ РАКУРСИ ПРОЛЬОТУ</span>
    </div>
    <div style="color: #b6cbd2; font-weight: 600; font-size: 15px;">Ракурсний лист для 8-секундної генерації відео</div>
  </div>

  <div class="angles-grid">
    <!-- Angle 1 -->
    <div class="angle-card">
      <div style="text-align: center;">
        <span class="angle-tag-badge">РАКУРС 1 • СТАРТ</span>
        <h3 class="angle-title">Повний модульний фасад</h3>
      </div>
      <div class="angle-visual">
        <img class="angle-img" src="/wp-content/uploads/2026/03/zionic-optimized.png" alt="Zionic Frontal View">
      </div>
      <p class="angle-desc">Загальний вигляд багатоярусної консолі на колесах, верхнього LED-дисплея та закріпленої маніпули MARP.</p>
    </div>

    <!-- Angle 2 -->
    <div class="angle-card">
      <div style="text-align: center;">
        <span class="angle-tag-badge">РАКУРС 2 • ОБЛІТ</span>
        <h3 class="angle-title">3/4 Перспектива ярусів</h3>
      </div>
      <div class="angle-visual">
        <img class="angle-img" src="/wp-content/uploads/2026/03/zionic-optimized.png" alt="Zionic 3/4 View" style="transform: scale(1.05);">
      </div>
      <p class="angle-desc">Плавний напівкруговий політ навколо ергономічної форми стійки, висувних модулів та підвісного шланга живлення.</p>
    </div>

    <!-- Angle 3 -->
    <div class="angle-card">
      <div style="text-align: center;">
        <span class="angle-tag-badge">РАКУРС 3 • МАКРО</span>
        <h3 class="angle-title">Макро ротаційної маніпули</h3>
      </div>
      <div class="angle-visual">
        <img class="angle-img" src="/wp-content/uploads/2026/03/nozzle-1-optimized.png" alt="Zionic Handpiece Macro" style="max-height: 280px;">
      </div>
      <p class="angle-desc">Детальний крупний план активної ротаційної головки MARP та радіочастотних активних електродів.</p>
    </div>
  </div>
</body>
</html>`
  }
];

// Write HTML templates
for (const file of htmlFiles) {
  const filePath = path.join(rootDir, `temp_${file.name}.html`);
  fs.writeFileSync(filePath, file.html, 'utf-8');
  console.log(`Created ${filePath}`);
}

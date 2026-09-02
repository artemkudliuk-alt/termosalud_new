import fs from 'fs';

const advantagesBannerHtml = `
      <!-- ADVANTAGES 5-PILL HORIZONTAL BANNER (EXACT 1-TO-1 CLONE) -->
      <div class="advantages fade-up">
        <div class="container">
          <div class="advantages-video-bg">
            <video autoplay="" loop="" muted="" playsinline="" poster="/wp-content/uploads/2026/04/video-placeholder-optimized.png">
              <source src="/wp-content/themes/zionic/assets/images/presentation-video.mp4" type="video/mp4">
            </video>
            <div class="advantages-video-content">
              <ul>
                <li data-aos="fade-up" data-aos-delay="0" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/1-1.svg" alt="Нове покоління - фото" title="Нове покоління">
                  </div>
                  <div>Нове покоління</div>
                  <div>Нове покоління комбінаторної пресотерапії</div>
                </li>
                <li data-aos="fade-up" data-aos-delay="100" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/2-1.svg" alt="Для всіх розмірів - фото" title="Для всіх розмірів">
                  </div>
                  <div>Для всіх розмірів</div>
                  <div>Три рівня блискавок для пацієнтів всіх розмірів</div>
                </li>
                <li data-aos="fade-up" data-aos-delay="200" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/3-1.svg" alt="4 етапи - фото" title="4 етапи">
                  </div>
                  <div>4 етапи</div>
                  <div>Чотири етапи пульсуючої пневматичної компресії</div>
                </li>
                <li data-aos="fade-up" data-aos-delay="300" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/4-1.svg" alt="10 програм - фото" title="10 програм">
                  </div>
                  <div>10 програм</div>
                  <div>Десять програм послідовної біоміметичної пульсації</div>
                </li>
                <li data-aos="fade-up" data-aos-delay="400" class="aos-init aos-animate">
                  <div>
                    <img src="/wp-content/uploads/2026/03/5-1.svg" alt="Унікальність - фото" title="Унікальність">
                  </div>
                  <div>Унікальність</div>
                  <div>Тільки в Linfopress: пресомасаж холки і love-handles</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Find where technologies section starts in process-html.mjs
const techTarget = '<div class="technologies fade-up"';
if (processCode.includes(techTarget)) {
  processCode = processCode.replace(techTarget, `${advantagesBannerHtml}\n\n      <div class="technologies fade-up"`);
  fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');
  console.log('Successfully inserted advantages 5-pill banner into process-html.mjs!');
} else {
  console.error('Could not find techTarget in process-html.mjs');
}

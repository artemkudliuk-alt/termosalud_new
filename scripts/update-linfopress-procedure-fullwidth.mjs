import fs from 'fs';

// ==========================================================================
// 1. UPDATE scripts/process-html.mjs
// ==========================================================================
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Replace procedure section with fullwidth version and add modal
const targetProc = `      <!-- ==========================================================================
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
      </section>`;

const newProc = `      <!-- ==========================================================================
           4. VIDEO PROCEDURE DEMONSTRATION SECTION (#procedure) - 100% FULL WIDTH
           ========================================================================== -->
      <section class="linfopress-procedure-section" id="procedure">
        <div class="container">
          <div class="section-header-centered">
            <h2 class="section-main-title">Процедура Linfopress Evolution PRO</h2>
            <p class="section-main-sub">
              Повний цикл роботи апарату: від одягання ергономічних манжетів до терапевтичного лімфодренажу
            </p>
          </div>
        </div>

        <!-- 100% FULL-WIDTH CINEMA SCREEN -->
        <div class="linfopress-procedure-fullwidth-wrap">
          <div class="cinema-media-wrap js-procedure-video-trigger" id="linfopress-procedure-player-trigger" onclick="window.playLinfopressProcedureVideo(this)">
            <video autoplay loop muted playsinline preload="auto" class="cinema-bg-video" id="procedure-preview-video">
              <source src="/wp-content/uploads/2026/03/termosalud_vid.mp4" type="video/mp4">
            </video>
            <div class="cinema-play-overlay" id="procedure-play-overlay">
              <div class="cinema-play-button">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
              <span class="cinema-play-text">ДИВИТИСЬ ВІДЕО-ПРЕЗЕНТАЦІЮ</span>
            </div>
            <div class="cinema-iframe-holder" id="procedure-iframe-holder"></div>
          </div>
        </div>
      </section>

      <!-- Linfopress Video Modal Lightbox (for Hero button and direct popups) -->
      <div id="linfopress_video_modal" class="zionic-video-lightbox" role="dialog" aria-modal="true" style="display:none;">
        <div class="zionic-video-lightbox-backdrop" data-close-video-modal onclick="window.closeLinfopressVideoLightbox()"></div>
        <div class="zionic-video-lightbox-dialog">
          <button type="button" class="zionic-video-lightbox-close" data-close-video-modal onclick="window.closeLinfopressVideoLightbox()" aria-label="Закрити">✕</button>
          <div id="linfopress_modal_video_container" class="zionic-video-lightbox-frame"></div>
        </div>
      </div>`;

if (htmlMjs.includes(targetProc)) {
  htmlMjs = htmlMjs.replace(targetProc, newProc);
  console.log('Replaced procedure section in scripts/process-html.mjs with 100% full-width cinema!');
} else {
  console.log('Target procedure section string not found directly, performing flexible replace...');
  const startTarget = '<!-- ==========================================================================\n           4. VIDEO PROCEDURE';
  const endTarget = '</section>\n\n\n      <!-- ==========================================================================\n           5. KEY ADVANTAGES';
  const sIdx = htmlMjs.indexOf(startTarget);
  const eIdx = htmlMjs.indexOf(endTarget, sIdx);
  if (sIdx > -1 && eIdx > -1) {
    htmlMjs = htmlMjs.substring(0, sIdx) + newProc + '\n\n\n      ' + htmlMjs.substring(eIdx + '</section>\n\n\n      '.length);
    console.log('Flexibly replaced procedure section in scripts/process-html.mjs!');
  } else {
    console.error('Failed to locate procedure section in scripts/process-html.mjs');
  }
}

// Also update hero button onclick in scripts/process-html.mjs
htmlMjs = htmlMjs.replace(
  '<button class="linfopress-btn-ghost-dark" id="open-linfopress-video-btn" data-video-id="K1v77enueJ8">',
  '<button class="linfopress-btn-ghost-dark" id="open-linfopress-video-btn" data-video-id="K1v77enueJ8" onclick="window.openLinfopressVideoLightbox()">'
);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

// ==========================================================================
// 2. UPDATE src/css/custom.css
// ==========================================================================
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fullwidthCinemaCss = `
/* 6. FULL-WIDTH CINEMA PROCEDURE SECTION (100% SCREEN WIDTH) */
.linfopress-procedure-section {
  background: #ffffff !important;
  padding: 100px 0 0 0 !important;
  border-bottom: 1px solid #e4e4e7 !important;
  width: 100% !important;
  position: relative !important;
}

.linfopress-procedure-fullwidth-wrap {
  width: 100% !important;
  position: relative !important;
  background: #000000 !important;
  overflow: hidden !important;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.18) !important;
}

.linfopress-procedure-fullwidth-wrap .cinema-media-wrap {
  position: relative !important;
  width: 100% !important;
  height: clamp(480px, 56.25vw, 920px) !important; /* Cinematic 16:9 ratio spanning 100% viewport width */
  background: #000000 !important;
  cursor: pointer !important;
}

.linfopress-procedure-fullwidth-wrap .cinema-bg-video {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  display: block !important;
}

.linfopress-procedure-fullwidth-wrap .cinema-iframe-holder {
  display: none;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: #000000 !important;
  z-index: 10 !important;
}

.linfopress-procedure-fullwidth-wrap .cinema-iframe-holder iframe {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
}
`;

css += '\n' + fullwidthCinemaCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// ==========================================================================
// 3. UPDATE src/js/main.js
// ==========================================================================
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const procedureVideoJs = `
// ==========================================================================
// FULLWIDTH PROCEDURE VIDEO PLAYER & LIGHTBOX (YOUTUBE: K1v77enueJ8)
// ==========================================================================
window.playLinfopressProcedureVideo = function(triggerEl) {
  const holder = document.getElementById('procedure-iframe-holder');
  const overlay = document.getElementById('procedure-play-overlay');
  const previewVideo = document.getElementById('procedure-preview-video');
  if (!holder) return;

  if (previewVideo) previewVideo.pause();
  if (overlay) overlay.style.display = 'none';

  holder.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/K1v77enueJ8?autoplay=1&start=1&rel=0&modestbranding=1&controls=1" title="Процедура Linfopress Evolution PRO" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position: absolute; inset: 0; width: 100%; height: 100%; border: none;"></iframe>';
  holder.style.display = 'block';
};

window.openLinfopressVideoLightbox = function() {
  const modal = document.getElementById('linfopress_video_modal');
  const container = document.getElementById('linfopress_modal_video_container');
  if (!modal || !container) return;
  container.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/K1v77enueJ8?autoplay=1&start=1&rel=0&modestbranding=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>';
  modal.style.display = 'flex';
  modal.classList.add('is-active', 'show');
  document.body.style.overflow = 'hidden';
};

window.closeLinfopressVideoLightbox = function() {
  const modal = document.getElementById('linfopress_video_modal');
  const container = document.getElementById('linfopress_modal_video_container');
  if (container) container.innerHTML = '';
  if (modal) {
    modal.style.display = 'none';
    modal.classList.remove('is-active', 'show');
  }
  document.body.style.overflow = '';
};
`;

js += '\n' + procedureVideoJs;
fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully updated procedure video player with full-width layout and YouTube link K1v77enueJ8!');

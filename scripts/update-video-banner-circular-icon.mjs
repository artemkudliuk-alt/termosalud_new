import fs from 'fs';

// 1. Update HTML in scripts/process-html.mjs
const circularVideoBannerHtml = `      <!-- 8. PROCEDURE VIDEO FULLSCREEN BANNER (CIRCULAR PLAY ICON ONLY) -->
      <section class="zionic-video-fullscreen-banner js-open-video-lightbox" id="procedure" data-video-id="cqskAxvFlxY">
        <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" class="video-fullscreen-bg">
          <source src="/wp-content/uploads/2026/03/tratamiento_de_remodelaciun_corporal_zionic_online_video_cutter.mp4" type="video/mp4">
        </video>
        <div class="video-fullscreen-vignette"></div>

        <div class="video-fullscreen-center-box">
          <button type="button" class="lux-play-pure-circle-btn js-open-video-lightbox" data-video-id="cqskAxvFlxY" aria-label="Дивитись відео ZIONIC">
            <span class="pure-pulse-ring"></span>
            <span class="pure-pulse-ring-outer"></span>
            <div class="pure-circle-inner">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="#111111"><polygon points="8 5 19 12 8 19 8 5"></polygon></svg>
            </div>
          </button>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

processCode = processCode.replace(/<section class="zionic-video-fullscreen-banner"[\s\S]*?<\/section>/i, circularVideoBannerHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS update in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const circularCss = `
/* ==========================================================================
   ZIONIC FULLSCREEN VIDEO BANNER - PURE CIRCULAR PLAY BUTTON ONLY
   ========================================================================== */
.zionic-video-fullscreen-banner {
  position: relative;
  z-index: 17;
  width: 100%;
  height: 85vh;
  min-height: 600px;
  max-height: 920px;
  background: #000000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #27272a;
  border-bottom: 1px solid #27272a;
  cursor: pointer;
}

.video-fullscreen-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
  filter: brightness(0.85);
  transition: filter 0.5s ease;
}

.zionic-video-fullscreen-banner:hover .video-fullscreen-bg {
  filter: brightness(0.95);
}

.video-fullscreen-vignette {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.65) 100%);
  pointer-events: none;
  z-index: 2;
}

.video-fullscreen-center-box {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

/* Pure Circular Play Button */
.lux-play-pure-circle-btn {
  position: relative;
  width: 100px;
  height: 100px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.lux-play-pure-circle-btn:hover {
  transform: scale(1.14);
}

.pure-circle-inner {
  position: relative;
  z-index: 4;
  width: 90px;
  height: 90px;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 255, 255, 0.5);
  transition: all 0.3s ease;
  padding-left: 4px; /* Optical center for play triangle */
}

.lux-play-pure-circle-btn:hover .pure-circle-inner {
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7), 0 0 45px rgba(255, 255, 255, 0.9);
}

.pure-pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50% !important;
  animation: zionicPurePulse 2.4s infinite ease-out;
  pointer-events: none;
}

.pure-pulse-ring-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  border: 1.5px solid rgba(255, 255, 255, 0.45);
  border-radius: 50% !important;
  animation: zionicPurePulse 2.4s infinite 0.9s ease-out;
  pointer-events: none;
}

@keyframes zionicPurePulse {
  0% {
    width: 90px;
    height: 90px;
    opacity: 0.95;
  }
  100% {
    width: 170px;
    height: 170px;
    opacity: 0;
  }
}
`;

const markerV = '/* ==========================================================================\n   ZIONIC FULLSCREEN EDGE-TO-EDGE VIDEO BANNER';
const markerPure = '/* ==========================================================================\n   ZIONIC FULLSCREEN VIDEO BANNER - PURE CIRCULAR';

if (css.includes(markerPure)) {
  css = css.substring(0, css.indexOf(markerPure)) + circularCss;
} else if (css.includes(markerV)) {
  css = css.substring(0, css.indexOf(markerV)) + circularCss;
} else {
  css += '\n' + circularCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully updated video banner with pure circular play icon and cqskAxvFlxY YouTube link!');

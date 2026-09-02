import fs from 'fs';

// 1. HTML for Fullscreen Edge-to-Edge Video Banner with Luxury Play Icon
const newVideoBannerHtml = `      <!-- 8. PROCEDURE VIDEO FULLSCREEN BANNER (EDGE-TO-EDGE) -->
      <section class="zionic-video-fullscreen-banner" id="procedure" data-video-id="CYsDii-PZ7s">
        <video autoplay loop muted playsinline poster="/wp-content/uploads/2026/03/procedure-2-optimized.jpg" class="video-fullscreen-bg">
          <source src="/wp-content/uploads/2026/03/tratamiento_de_remodelaciun_corporal_zionic_online_video_cutter.mp4" type="video/mp4">
        </video>
        <div class="video-fullscreen-vignette"></div>

        <div class="video-fullscreen-center-box">
          <button type="button" class="lux-play-central-btn js-open-video-lightbox" data-video-id="CYsDii-PZ7s" aria-label="Дивитись презентацію ZIONIC">
            <span class="play-pulse-ring"></span>
            <span class="play-pulse-ring-outer"></span>
            <div class="play-icon-inner">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="#111111"><polygon points="7 4 19 12 7 20 7 4"></polygon></svg>
            </div>
          </button>
          <span class="video-play-lux-label js-open-video-lightbox" data-video-id="CYsDii-PZ7s">ДИВИТИСЯ ВІДЕО ПРОЦЕДУРИ</span>
        </div>
      </section>`;

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Replace the old zionic-video-banner-section with newVideoBannerHtml
processCode = processCode.replace(/<section class="zionic-video-banner-section"[\s\S]*?<\/section>/i, newVideoBannerHtml);
fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');

// 2. CSS for Fullscreen Video Banner in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const videoBannerCss = `
/* ==========================================================================
   ZIONIC FULLSCREEN EDGE-TO-EDGE VIDEO BANNER + LUXURY PLAY BUTTON
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
  background: radial-gradient(circle at center, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.65) 100%);
  pointer-events: none;
  z-index: 2;
}

.video-fullscreen-center-box {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  pointer-events: auto;
}

/* Luxury Glowing Play Button */
.lux-play-central-btn {
  position: relative;
  width: 110px;
  height: 110px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.lux-play-central-btn:hover {
  transform: scale(1.12);
}

.play-icon-inner {
  position: relative;
  z-index: 4;
  width: 90px;
  height: 90px;
  background: #ffffff;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
  padding-left: 4px; /* Optical center for triangle */
}

.lux-play-central-btn:hover .play-icon-inner {
  background: #ffffff;
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 255, 255, 0.8);
}

.play-pulse-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110px;
  height: 110px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: zionicPlayPulse 2.2s infinite ease-out;
  pointer-events: none;
}

.play-pulse-ring-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 110px;
  height: 110px;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation: zionicPlayPulse 2.2s infinite 0.8s ease-out;
  pointer-events: none;
}

@keyframes zionicPlayPulse {
  0% {
    width: 90px;
    height: 90px;
    opacity: 0.9;
  }
  100% {
    width: 170px;
    height: 170px;
    opacity: 0;
  }
}

.video-play-lux-label {
  display: inline-block;
  background: rgba(17, 17, 17, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 13px !important;
  font-weight: 800 !important;
  letter-spacing: 2px !important;
  text-transform: uppercase !important;
  padding: 10px 24px !important;
  border-radius: 0 !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
}

.lux-play-central-btn:hover + .video-play-lux-label,
.video-play-lux-label:hover {
  background: #ffffff;
  color: #111111;
  border-color: #ffffff;
  transform: translateY(-2px);
}
`;

const markerV = '/* ==========================================================================\n   ZIONIC FULLSCREEN EDGE-TO-EDGE VIDEO BANNER';
const markerOldV = '/* ==========================================================================\n   ZIONIC VIDEO BANNER';

if (css.includes(markerV)) {
  css = css.substring(0, css.indexOf(markerV)) + videoBannerCss;
} else if (css.includes(markerOldV)) {
  css = css.substring(0, css.indexOf(markerOldV)) + videoBannerCss;
} else {
  css += '\n' + videoBannerCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully rebuilt video banner as fullscreen edge-to-edge with luxury play button!');

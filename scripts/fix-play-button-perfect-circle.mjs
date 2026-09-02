import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const perfectCircleCss = `
/* ==========================================================================
   ZIONIC FULLSCREEN VIDEO BANNER - PERFECT CIRCLE PLAY BUTTON
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

/* Perfect Geometric Circle Play Button */
.lux-play-pure-circle-btn {
  position: relative;
  width: 100px !important;
  height: 100px !important;
  min-width: 100px !important;
  min-height: 100px !important;
  max-width: 100px !important;
  max-height: 100px !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  background: transparent !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
  border-radius: 50% !important;
  flex-shrink: 0 !important;
  aspect-ratio: 1 / 1 !important;
}

.lux-play-pure-circle-btn:hover {
  transform: scale(1.14) !important;
}

.pure-circle-inner {
  position: relative !important;
  z-index: 4 !important;
  width: 90px !important;
  height: 90px !important;
  min-width: 90px !important;
  min-height: 90px !important;
  max-width: 90px !important;
  max-height: 90px !important;
  background: #ffffff !important;
  border: 1px solid #ffffff !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 255, 255, 0.5) !important;
  transition: all 0.3s ease !important;
  padding: 0 0 0 5px !important; /* Perfect optical center for triangle */
  margin: 0 !important;
  flex-shrink: 0 !important;
  aspect-ratio: 1 / 1 !important;
}

.lux-play-pure-circle-btn:hover .pure-circle-inner {
  box-shadow: 0 15px 45px rgba(0, 0, 0, 0.7), 0 0 45px rgba(255, 255, 255, 0.9) !important;
}

.pure-pulse-ring {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 90px !important;
  height: 90px !important;
  border: 2px solid rgba(255, 255, 255, 0.7) !important;
  border-radius: 50% !important;
  animation: zionicPurePulse 2.4s infinite ease-out !important;
  pointer-events: none !important;
  aspect-ratio: 1 / 1 !important;
}

.pure-pulse-ring-outer {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 90px !important;
  height: 90px !important;
  border: 1.5px solid rgba(255, 255, 255, 0.45) !important;
  border-radius: 50% !important;
  animation: zionicPurePulse 2.4s infinite 0.9s ease-out !important;
  pointer-events: none !important;
  aspect-ratio: 1 / 1 !important;
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

const markerPure = '/* ==========================================================================\n   ZIONIC FULLSCREEN VIDEO BANNER - PURE CIRCULAR';
const markerV = '/* ==========================================================================\n   ZIONIC FULLSCREEN EDGE-TO-EDGE VIDEO BANNER';

if (css.includes(markerPure)) {
  css = css.substring(0, css.indexOf(markerPure)) + perfectCircleCss;
} else if (css.includes(markerV)) {
  css = css.substring(0, css.indexOf(markerV)) + perfectCircleCss;
} else {
  css += '\n' + perfectCircleCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully fixed play button to be a 100% perfect geometric circle!');

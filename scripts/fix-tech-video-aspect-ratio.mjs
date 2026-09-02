import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const updatedTechVideoCss = `
/* ==========================================================================
   ZIONIC TECHNOLOGIES VIDEO: PERFECT 16:9 ASPECT RATIO & ZERO CROPPING
   ========================================================================== */
.zionic-tech-bento-section {
  background: #ffffff;
  padding: 100px 0;
}

.tech-bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px;
}

@media (max-width: 991px) {
  .tech-bento-grid {
    grid-template-columns: 1fr;
  }
}

.tech-bento-card {
  background: #111111 !important;
  border: 1px solid #27272a !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease !important;
}

.tech-bento-card:hover {
  transform: translateY(-8px) !important;
  border-color: rgba(251, 191, 36, 0.6) !important;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.4) !important;
}

/* 16:9 Video Frame: 100% Uncropped */
.tech-card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9 !important;
  height: auto !important;
  background: #ffffff !important;
  overflow: hidden;
  border-bottom: 1px solid #27272a;
}

.tech-card-media video {
  width: 100% !important;
  height: 100% !important;
  object-fit: contain !important; /* Guarantees 100% full view of video text */
  display: block;
  background: #ffffff;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.tech-bento-card:hover .tech-card-media video {
  transform: scale(1.03) !important;
}

.tech-badge-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  background: #111111;
  border: 1px solid #27272a;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 800 !important;
  letter-spacing: 1px !important;
  padding: 6px 14px !important;
  z-index: 5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.tech-bento-card:hover .tech-badge-tag {
  border-color: #fbbf24;
  color: #fbbf24;
}

.tech-card-content {
  padding: 40px !important;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tech-card-heading {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 26px !important;
  font-weight: 900 !important;
  color: #ffffff !important;
  line-height: 1.25 !important;
  margin-bottom: 18px !important;
  letter-spacing: -0.5px;
}

.tech-card-text {
  font-family: 'Inter', sans-serif !important;
  font-size: 17.5px !important;
  color: #d4d4d8 !important;
  line-height: 1.7 !important;
  margin-bottom: 28px !important;
}

.tech-bullets-list {
  list-style: none;
  padding: 0;
  margin: auto 0 0 0;
}

.tech-bullets-list li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Inter', sans-serif !important;
  font-size: 16.5px !important;
  font-weight: 600 !important;
  color: #e4e4e7 !important;
  margin-bottom: 14px !important;
  padding: 4px 0;
  transition: transform 0.25s ease, color 0.25s ease !important;
}

.tech-bullets-list li:hover {
  transform: translateX(8px) !important;
  color: #ffffff !important;
}

.tech-bullets-list li .bullet-check {
  color: #fbbf24 !important;
  font-size: 18px !important;
  font-weight: 900 !important;
}
`;

// Replace or append
const marker = '/* ==========================================================================\n   ZIONIC TECHNOLOGIES VIDEO: PERFECT 16:9';
if (css.includes(marker)) {
  css = css.substring(0, css.indexOf(marker)) + updatedTechVideoCss;
} else {
  css += '\n' + updatedTechVideoCss;
}

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully updated Technologies video to 16:9 contain uncropped frame!');

import fs from 'fs';

// 1. Add CSS to custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const transitionsDevCss = `
/* ==========================================================================
   TRANSITIONS-DEV: SCROLL-DRIVEN ENTRANCE & TACTILE HOVER SYSTEM
   ========================================================================== */

/* 1. Motion Tokens from transitions-dev */
:root {
  --t-dur-fast: 260ms;
  --t-dur-medium: 380ms;
  --t-dur-slow: 480ms;
  --t-dur-cinema: 560ms;
  --t-ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  --t-ease-in-out: ease-in-out;
}

/* 2. Scroll Reveal Primitives */
/* Section Headers: Title subtle rise with blur dissolve */
.t-reveal-header {
  opacity: 0;
  transform: translateY(18px);
  filter: blur(2.5px);
  transition: opacity var(--t-dur-slow) var(--t-ease-smooth),
              transform var(--t-dur-slow) var(--t-ease-smooth),
              filter var(--t-dur-slow) var(--t-ease-smooth);
  will-change: opacity, transform, filter;
}

.t-reveal-header.is-revealed {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

/* Subtitle slight delay */
.t-reveal-header-sub {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity var(--t-dur-slow) var(--t-ease-smooth) 80ms,
              transform var(--t-dur-slow) var(--t-ease-smooth) 80ms;
  will-change: opacity, transform;
}

.t-reveal-header-sub.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered Grids & Cards (Bento, Advantages, Results, Packages) */
.t-reveal-item {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity var(--t-dur-slow) var(--t-ease-smooth) calc(var(--item-idx, 0) * 60ms),
              transform var(--t-dur-slow) var(--t-ease-smooth) calc(var(--item-idx, 0) * 60ms),
              border-color 0.25s ease,
              box-shadow 0.28s var(--t-ease-smooth);
  will-change: opacity, transform;
}

.t-reveal-item.is-revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Split Columns (Indications vs Contraindications, Doctor vs Review) */
.t-reveal-from-left {
  opacity: 0;
  transform: translateX(-24px) translateY(10px);
  transition: opacity var(--t-dur-slow) var(--t-ease-smooth),
              transform var(--t-dur-slow) var(--t-ease-smooth);
  will-change: opacity, transform;
}

.t-reveal-from-right {
  opacity: 0;
  transform: translateX(24px) translateY(10px);
  transition: opacity var(--t-dur-slow) var(--t-ease-smooth) 70ms,
              transform var(--t-dur-slow) var(--t-ease-smooth) 70ms;
  will-change: opacity, transform;
}

.t-reveal-from-left.is-revealed,
.t-reveal-from-right.is-revealed {
  opacity: 1;
  transform: translate(0, 0);
}

/* Cinematic Media Stages (Infographics, Big Photos, Video Frames) */
.t-reveal-scale {
  opacity: 0;
  transform: scale(0.97) translateY(14px);
  filter: blur(2px);
  transition: opacity var(--t-dur-cinema) var(--t-ease-smooth),
              transform var(--t-dur-cinema) var(--t-ease-smooth),
              filter var(--t-dur-cinema) var(--t-ease-smooth);
  will-change: opacity, transform, filter;
}

.t-reveal-scale.is-revealed {
  opacity: 1;
  transform: scale(1) translateY(0);
  filter: blur(0);
}

/* Tactile Micro-Interactions on Hover */
.result-tile-card,
.package-card-item,
.adv-item-card,
.bento-card,
.doctor-luxury-card,
.matrix-creative-card {
  transition: transform 0.28s var(--t-ease-smooth),
              border-color 0.25s ease,
              box-shadow 0.28s var(--t-ease-smooth) !important;
}

.result-tile-card:hover,
.package-card-item:hover,
.adv-item-card:hover,
.doctor-luxury-card:hover {
  transform: translateY(-4px) !important;
}

/* Guarantee row subtle slide on hover */
.guarantee-item-row {
  transition: transform 0.22s var(--t-ease-smooth), background-color 0.2s ease !important;
}

.guarantee-item-row:hover {
  transform: translateX(4px) !important;
}

/* Accessibility: Respect Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .t-reveal-header,
  .t-reveal-header-sub,
  .t-reveal-item,
  .t-reveal-from-left,
  .t-reveal-from-right,
  .t-reveal-scale {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    transition: none !important;
  }
}
`;

css += '\n' + transitionsDevCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully appended transitions-dev CSS to custom.css');

import fs from 'fs';

const js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, i) => {
  if (l.includes('Swiper') || l.includes('ba_slider') || l.includes('experience-slider') || l.includes('slider')) {
    console.log(`Line ${i + 1}: ${l.trim()}`);
  }
});

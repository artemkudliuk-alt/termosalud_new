import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', 'utf8');

// Extract ba_slider chunk
const baStart = html.indexOf('<div class="ba_slider');
const baEnd = html.indexOf('</div></div></div>', baStart);
console.log('=== BA SLIDER CHUNK ===');
console.log(html.substring(baStart, baEnd + 20));

// Extract experience-slider chunk
const expStart = html.indexOf('<div class="experience-slider');
const expEnd = html.indexOf('</div></div></div>', expStart);
console.log('=== EXP SLIDER CHUNK ===');
console.log(html.substring(expStart, expEnd + 20));

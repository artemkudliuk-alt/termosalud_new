import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/zionic/index.html', 'utf8');
const baIdx = html.indexOf('class="ba');
console.log(html.substring(baIdx, baIdx + 1200));

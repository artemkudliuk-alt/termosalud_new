import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/linfopress/index.html', 'utf8');

console.log('HTML length:', html.length);
const idx = html.indexOf('Технології Linfopress Evolution PRO');
console.log('Index of heading:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 1000));
}

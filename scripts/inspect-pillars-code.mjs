import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/zionic/index.html', 'utf8');
const pStart = html.indexOf('zionic-pillars-bar');
console.log(html.substring(pStart - 20, pStart + 1800));

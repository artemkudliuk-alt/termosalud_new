import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
const pStart = html.indexOf('id="results"');
console.log(html.substring(pStart - 40, pStart + 3000));

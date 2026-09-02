import fs from 'fs';

const code = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
const lines = code.split('\n');
console.log(lines.slice(1540, 1590).map((l, i) => `${1541 + i}: ${l}`).join('\n'));

import fs from 'fs';

const css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const matches = css.match(/\.ba\b[^{]*\{[^}]+\}/g) || [];
console.log('Matches for .ba in custom.css:');
matches.forEach(m => console.log(m));

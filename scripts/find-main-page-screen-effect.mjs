import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/index.html', 'utf8');

// List all section tags and their classes on index.html
const sections = [...html.matchAll(/<section[^>]*class=["']([^"']+)["'][^>]*>/gi)].map(m => m[0]);
console.log('Sections in index.html:');
sections.forEach(s => console.log(s));

// Search for scroll/stacking scripts or CSS in custom.css
const css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');
const stickyRules = [...css.matchAll(/[^{}]*sticky[^{}]*\{[^}]+\}/gi)].map(m => m[0]);
console.log('\nSticky CSS rules:');
stickyRules.slice(0, 10).forEach(r => console.log(r));

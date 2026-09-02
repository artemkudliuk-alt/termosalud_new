import fs from 'fs';

const content = fs.readFileSync('C:/nextweb/termosalud/scripts/c3e3065_zionic_block.js', 'utf8');

const sections = [...content.matchAll(/<section[^>]*class=["']([^"']+)["'][^>]*>/gi)].map(m => m[0]);
console.log('Sections in c3e3065 Zionic:');
sections.forEach(s => console.log(s));

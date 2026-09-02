import fs from 'fs';

const zionic = fs.readFileSync('C:/nextweb/termosalud/zionic/index.html', 'utf8');
const main = fs.readFileSync('C:/nextweb/termosalud/index.html', 'utf8');

console.log('Zionic length:', zionic.length);
console.log('Main length:', main.length);

// Check CSS links in Zionic
const cssLinks = [...zionic.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)].map(m => m[0]);
console.log('\nZionic CSS links:');
cssLinks.forEach(l => console.log(l));

// Check if old WordPress CSS is loaded and overriding our styles
const wpStyles = [...zionic.matchAll(/<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/gi)].map(m => m[1]);
console.log('\nAll CSS URLs in Zionic:');
wpStyles.forEach(u => console.log(u));

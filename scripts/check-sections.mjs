import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/zionic/index.html', 'utf8');
const lines = html.split('\n');
const sections = [];
lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('id="hero"') || l.includes('id="indications"')) {
    console.log((i+1) + ': ' + l.trim().slice(0, 100));
  }
});

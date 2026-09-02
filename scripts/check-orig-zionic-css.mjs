import { execSync } from 'child_process';
import fs from 'fs';

const origCss = execSync('git show c3e3065:src/css/custom.css', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');

const heroIdx = origCss.indexOf('.zionic-official-hero');
console.log('heroIdx in orig CSS:', heroIdx);
if (heroIdx !== -1) {
  const cssChunk = origCss.substring(heroIdx, heroIdx + 3000);
  console.log(cssChunk.substring(0, 1500));
  fs.writeFileSync('C:/nextweb/termosalud/scripts/orig_zionic_hero.css', cssChunk, 'utf8');
}

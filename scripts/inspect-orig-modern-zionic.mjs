import { execSync } from 'child_process';
import fs from 'fs';

const orig = execSync('git show c3e3065:scripts/process-html.mjs', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');

const zionicStart = orig.indexOf("if (pageName === 'zionic') {");
const zionicEnd = orig.indexOf("if (pageName === 'linfopress')", zionicStart);

const zionicBlock = orig.substring(zionicStart, zionicEnd);
fs.writeFileSync('C:/nextweb/termosalud/scripts/c3e3065_zionic_block.js', zionicBlock, 'utf8');
console.log('Saved c3e3065_zionic_block.js, size:', zionicBlock.length);

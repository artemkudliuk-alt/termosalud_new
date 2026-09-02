import { execSync } from 'child_process';
import fs from 'fs';

const origHtml = execSync('git show c3e3065:linfopress/index.html', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');

const techClassIdx = origHtml.indexOf('class="technologies fade-up"');
const divStartIdx = origHtml.lastIndexOf('<div', techClassIdx);
const footerStartIdx = origHtml.indexOf('<footer class="modern-luxury-footer">');

console.log('divStartIdx:', divStartIdx, 'footerStartIdx:', footerStartIdx);

const origBodyContent = origHtml.substring(divStartIdx, footerStartIdx).trim();
console.log('Extracted original body content length:', origBodyContent.length);

// Read current process-html.mjs
let processHtml = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const heroStageIdx = processHtml.indexOf('<!-- 1. HERO STAGE (OFFICIAL HIGH-PRECISION REBUILD) -->');
const heroEndIdx = processHtml.indexOf('</section>', heroStageIdx) + '</section>'.length;
const linfopressFooterIdx = processHtml.indexOf('<footer class="modern-luxury-footer">', heroEndIdx);

console.log('heroStageIdx:', heroStageIdx, 'heroEndIdx:', heroEndIdx, 'linfopressFooterIdx:', linfopressFooterIdx);

const newProcessHtml = processHtml.substring(0, heroEndIdx) + '\n\n' + origBodyContent + '\n\n' + processHtml.substring(linfopressFooterIdx);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', newProcessHtml, 'utf8');
console.log('Successfully updated scripts/process-html.mjs with new Hero and restored original sections!');

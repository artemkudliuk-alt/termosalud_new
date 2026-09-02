import fs from 'fs';

const origBody = fs.readFileSync('C:/nextweb/termosalud/scripts/orig_linfopress_body.html', 'utf8');
let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Find the start of linfopress page block
const linfopressBlockStart = processCode.indexOf("if (pageName === 'linfopress') {");
const linfopressBlockEnd = processCode.indexOf("fs.writeFileSync(file, html, 'utf8');", linfopressBlockStart);

if (linfopressBlockStart === -1 || linfopressBlockEnd === -1) {
  console.error('Could not locate linfopress block in process-html.mjs');
  process.exit(1);
}

// Find hero section in current processCode
const heroSectionStart = processCode.indexOf('<!-- 1. HERO STAGE (OFFICIAL BLACK LUXURY VIDEO HERO) -->', linfopressBlockStart);
const heroSectionEnd = processCode.indexOf('</section>', heroSectionStart) + '</section>'.length;
const heroSectionCode = processCode.substring(heroSectionStart, heroSectionEnd);

console.log('Hero section code length:', heroSectionCode.length);

const newLinfopressBlock = `if (pageName === 'linfopress') {
    const modernLinfopressHtml = \`
      ${heroSectionCode}

      ${origBody}
    \`;

    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="linfopress-main-page-wrapper">\\n\${modernLinfopressHtml}\\n</div>\\n\`);
  }

  `;

const before = processCode.substring(0, linfopressBlockStart);
const after = processCode.substring(linfopressBlockEnd);

processCode = before + newLinfopressBlock + after;

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');
console.log('Successfully updated scripts/process-html.mjs with new Hero and restored body!');

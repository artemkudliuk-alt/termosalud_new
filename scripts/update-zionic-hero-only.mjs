import fs from 'fs';

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

const zionicStart = processCode.indexOf("if (pageName === 'zionic') {");
const zionicEnd = processCode.indexOf("if (pageName === 'linfopress')", zionicStart);

if (zionicStart === -1 || zionicEnd === -1) {
  console.error('Could not locate zionic block boundaries');
  process.exit(1);
}

// Extract hero section from current zionic block
const heroStart = processCode.indexOf('<section class="zionic-official-hero">', zionicStart);
const heroEnd = processCode.indexOf('</section>', heroStart) + '</section>'.length;
const heroCode = processCode.substring(heroStart, heroEnd);

console.log('Zionic Hero code length:', heroCode.length);

const newZionicBlock = `if (pageName === 'zionic') {
    const modernZionicHtml = \`
      ${heroCode}
    \`;

    // Replace the inner content of zionic page (keeping only Hero and Footer)
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="zionic-main-page-wrapper">\\n\${modernZionicHtml}\\n</div>\\n\`);
  }

  // Modern Linfopress Evolution PRO Page Structure`;

const before = processCode.substring(0, zionicStart);
const after = processCode.substring(zionicEnd);

const updatedCode = before + newZionicBlock + after.replace("// Modern Linfopress Evolution PRO Page Structure", "");

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', updatedCode, 'utf8');
console.log('Successfully updated zionic page to keep ONLY Hero stage and Footer!');

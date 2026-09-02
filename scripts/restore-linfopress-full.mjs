import fs from 'fs';

const origBody = fs.readFileSync('C:/nextweb/termosalud/scripts/orig_linfopress_body.html', 'utf8');
const processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
const lines = processCode.split('\n');

// Hero section is from line 2087 to line 2125
const heroLines = lines.slice(2085, 2125).join('\n');

const newLinfopressBlock = `  // Modern Linfopress Evolution PRO Page Structure (New Hero + Restored Original Body)
  if (pageName === 'linfopress') {
    const modernLinfopressHtml = \`
${heroLines}

${origBody}
    \`;

    // Replace the inner content of linfopress page
    html = html.replace(/<div[\\s\\n]+class=center>[\\s\\S]*?(?=<footer|$)/i, \`<div class="linfopress-main-page-wrapper">\\n\${modernLinfopressHtml}\\n</div>\\n\`);
  }`;

const before = lines.slice(0, 2083).join('\n');
const after = lines.slice(2822).join('\n');

const newFullCode = before + '\n' + newLinfopressBlock + '\n' + after;

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', newFullCode, 'utf8');
console.log('Restoration successfully applied to scripts/process-html.mjs');

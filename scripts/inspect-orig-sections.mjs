import fs from 'fs';

const code = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');
const lines = code.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('linfopress-main-page-wrapper') || (line.includes('pageName === \'linfopress\''))) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});

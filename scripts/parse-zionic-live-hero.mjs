import fs from 'fs';

let content = fs.readFileSync('C:/Users/Jaku/.gemini/antigravity/brain/d4cebe46-e502-4198-a0cb-7a9dfbbc9398/.system_generated/steps/2739/output.txt', 'utf8');

const prefix = 'Execution result:\n';
const consoleIdx = content.indexOf('\n\nConsole output:');
if (consoleIdx !== -1) {
  content = content.substring(prefix.length, consoleIdx).trim();
} else {
  content = content.substring(prefix.length).trim();
}

try {
  const json = JSON.parse(content);
  console.log('First two elements:');
  json.firstTwo.forEach((html, i) => {
    console.log(`=== ELEMENT ${i} ===\n`, html);
  });
  fs.writeFileSync('C:/nextweb/termosalud/scripts/zionic_orig_hero.html', json.firstTwo.join('\n\n'), 'utf8');
} catch (e) {
  console.log('Parse error:', e.message);
}

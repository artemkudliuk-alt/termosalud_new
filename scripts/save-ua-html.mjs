import fs from 'fs';

let content = fs.readFileSync('C:/Users/Jaku/.gemini/antigravity/brain/d4cebe46-e502-4198-a0cb-7a9dfbbc9398/.system_generated/steps/2501/output.txt', 'utf8');

const prefix = 'Execution result:\n';
const consoleIdx = content.indexOf('\n\nConsole output:');
if (consoleIdx !== -1) {
  content = content.substring(prefix.length, consoleIdx).trim();
} else {
  content = content.substring(prefix.length).trim();
}

try {
  content = JSON.parse(content);
} catch (e) {
  // if not json, keep as is
}

fs.writeFileSync('C:/nextweb/termosalud/termosalud_ua_linfopress.html', content, 'utf8');
console.log('Saved termosalud_ua_linfopress.html, size:', fs.statSync('C:/nextweb/termosalud/termosalud_ua_linfopress.html').size);

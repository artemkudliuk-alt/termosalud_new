import fs from 'fs';

let content = fs.readFileSync('C:/Users/Jaku/.gemini/antigravity/brain/d4cebe46-e502-4198-a0cb-7a9dfbbc9398/.system_generated/steps/2606/output.txt', 'utf8');

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
  // ok
}

// Convert all external https://termosalud.com.ua to local paths
content = content.replace(/https:\/\/termosalud\.com\.ua/g, '');

fs.writeFileSync('C:/nextweb/termosalud/scripts/exact_live_linfopress_body.html', content, 'utf8');
console.log('Saved exact_live_linfopress_body.html, size:', fs.statSync('C:/nextweb/termosalud/scripts/exact_live_linfopress_body.html').size);

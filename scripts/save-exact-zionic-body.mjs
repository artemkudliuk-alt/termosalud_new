import fs from 'fs';
import path from 'path';
import https from 'https';

let content = fs.readFileSync('C:/Users/Jaku/.gemini/antigravity/brain/d4cebe46-e502-4198-a0cb-7a9dfbbc9398/.system_generated/steps/2767/output.txt', 'utf8');

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

// Find all asset URLs before converting
const rawUrls = [...content.matchAll(/https:\/\/termosalud\.com\.ua\/[^\s"']+/gi)].map(m => m[0]);
const uniqueUrls = [...new Set(rawUrls)];
console.log('Unique assets on zionic page:', uniqueUrls.length);

// Convert to local paths
content = content.replace(/https:\/\/termosalud\.com\.ua/g, '');

fs.writeFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', content, 'utf8');
console.log('Saved exact_live_zionic_body.html, size:', fs.statSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html').size);

// Check & download missing assets
const download = (url) => new Promise((resolve) => {
  const parsed = new URL(url);
  const localPath = path.join('C:/nextweb/termosalud/public', parsed.pathname);
  const dir = path.dirname(localPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  
  if (fs.existsSync(localPath) && fs.statSync(localPath).size > 100) {
    console.log('Already exists:', parsed.pathname);
    return resolve();
  }

  const file = fs.createWriteStream(localPath);
  https.get(url, (res) => {
    if (res.statusCode === 200) {
      res.pipe(file);
      file.on('finish', () => { file.close(); console.log('Downloaded:', parsed.pathname); resolve(); });
    } else {
      console.log('Failed status:', res.statusCode, url);
      resolve();
    }
  }).on('error', (err) => {
    console.log('Error downloading:', url, err.message);
    resolve();
  });
});

async function run() {
  for (const url of uniqueUrls) {
    if (url.includes('/wp-content/')) {
      await download(url);
    }
  }
  console.log('All Zionic asset downloads finished.');
}

run();

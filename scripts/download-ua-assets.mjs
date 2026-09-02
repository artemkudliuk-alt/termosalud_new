import fs from 'fs';
import path from 'path';
import https from 'https';

const html = fs.readFileSync('C:/nextweb/termosalud/termosalud_ua_linfopress.html', 'utf8');

const urls = [...html.matchAll(/https:\/\/termosalud\.com\.ua\/wp-content\/uploads\/[^\s"']+/gi)].map(m => m[0]);
const uniqueUrls = [...new Set(urls)];

console.log('Total URLs to download:', uniqueUrls.length);

const download = (url) => new Promise((resolve, reject) => {
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
    await download(url);
  }
  console.log('All downloads finished.');
}

run();

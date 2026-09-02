import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/ICONO-1.png', name: 'icon_1.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/ICONO-2.png', name: 'icon_2.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/ICONO-3.png', name: 'icon_3.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/ICONO-4.png', name: 'icon_4.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/1.png', name: 'icon_alt_1.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/2.png', name: 'icon_alt_2.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/3.png', name: 'icon_alt_3.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/4.png', name: 'icon_alt_4.png' }
];

const targetDir = 'C:/nextweb/termosalud/public/wp-content/uploads/linfopress_official';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(item) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(targetDir, item.name);
    const file = fs.createWriteStream(filePath);
    https.get(item.url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(item.name); });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(item.name); });
      }
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading Linfopress assets...');
  for (const asset of assets) {
    try {
      const name = await download(asset);
      console.log('Downloaded:', name);
    } catch (e) {
      console.error('Failed to download:', asset.url, e.message);
    }
  }
  console.log('All Linfopress assets downloaded successfully.');
}

run();

import https from 'https';
import fs from 'fs';
import path from 'path';

const mediaList = [
  {
    url: 'https://termosalud.com.ua/wp-content/uploads/2026/03/1.mp4',
    dest: 'wp-content/uploads/2026/03/1.mp4'
  },
  {
    url: 'https://termosalud.com.ua/wp-content/uploads/2026/03/1-preview-optimized.png',
    dest: 'wp-content/uploads/2026/03/1-preview-optimized.png'
  },
  {
    url: 'https://termosalud.com.ua/wp-content/uploads/2026/03/2-1.mp4',
    dest: 'wp-content/uploads/2026/03/2-1.mp4'
  },
  {
    url: 'https://termosalud.com.ua/wp-content/uploads/2026/03/2-preview-1-optimized.png',
    dest: 'wp-content/uploads/2026/03/2-preview-1-optimized.png'
  },
  {
    url: 'https://termosalud.com.ua/wp-content/uploads/2026/04/limfonew2.mp4',
    dest: 'wp-content/uploads/2026/04/limfonew2.mp4'
  },
  {
    url: 'https://termosalud.com.ua/wp-content/uploads/2026/04/limfonew-optimized.jpg',
    dest: 'wp-content/uploads/2026/04/limfonew-optimized.jpg'
  },
  {
    url: 'https://termosalud.com.ua/wp-content/uploads/2026/03/4-preview-1-optimized.png',
    dest: 'wp-content/uploads/2026/03/4-preview-1-optimized.png'
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const fullDest = path.resolve(dest);
    fs.mkdirSync(path.dirname(fullDest), { recursive: true });

    const file = fs.createWriteStream(fullDest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status code ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${dest} (${fs.statSync(fullDest).size} bytes)`);
          resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlink(fullDest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('Starting Linfopress media download...');
  for (const item of mediaList) {
    try {
      await downloadFile(item.url, item.dest);
    } catch (e) {
      console.error(`Error downloading ${item.url}:`, e.message);
    }
  }
  console.log('All downloads completed!');
}

run();

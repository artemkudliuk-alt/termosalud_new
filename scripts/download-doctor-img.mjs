import https from 'https';
import fs from 'fs';
import path from 'path';

const url = 'https://termosalud.com.ua/wp-content/uploads/2026/03/experience-block-img-optimized.png';
const dest = 'wp-content/uploads/2026/03/experience-block-img-optimized.png';

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
        return reject(new Error(`Status ${response.statusCode}`));
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

downloadFile(url, dest);

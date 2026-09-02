import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetDir = path.resolve(__dirname, '../public/wp-content/uploads/zionic_official');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const urls = [
  "https://www.termosalud.com/wp-content/uploads/2021/12/cropped-termosalud-_logo2-scaled-400x55.png",
  "https://www.termosalud.com/wp-content/uploads/2025/11/Zionic-Aesthetic-logotipo.png",
  "https://www.termosalud.com/wp-content/uploads/2024/04/ZIONIC-_manipulo2-copia-e1713857050153.png",
  "https://www.termosalud.com/wp-content/uploads/2022/02/rentable.png",
  "https://www.termosalud.com/wp-content/uploads/2022/02/chip.png",
  "https://www.termosalud.com/wp-content/uploads/2022/02/rapido-y-eficaz.png",
  "https://www.termosalud.com/wp-content/uploads/2022/03/ANA-MANCEBO.jpg",
  "https://www.termosalud.com/wp-content/uploads/2022/01/CARMEN-NAVARRO.jpg",
  "https://www.termosalud.com/wp-content/uploads/2022/06/ZIONIC-INFOGRAFIA-ENG.png",
  "https://www.termosalud.com/wp-content/uploads/2022/02/manipulo-deep-action-1024x683.jpg",
  "https://www.termosalud.com/wp-content/uploads/2022/06/zionic-treatments.png",
  "https://www.termosalud.com/wp-content/uploads/2024/11/Zionic_C.jpg",
  "https://www.termosalud.com/wp-content/uploads/2024/11/Zionic_B-scaled.jpg",
  "https://www.termosalud.com/wp-content/uploads/2022/06/ZN_H_012_a.jpg",
  "https://www.termosalud.com/wp-content/uploads/2025/11/zionic-aesthetic-portada--scaled.jpg",
  "https://www.termosalud.com/wp-content/uploads/2022/02/ondas-de-choque.jpg",
  "https://www.termosalud.com/wp-content/uploads/2022/11/cuerpo-relajado.jpg",
  "https://www.termosalud.com/wp-content/uploads/2022/02/protocolos-carpetas.jpg",
  "https://www.termosalud.com/wp-content/uploads/2024/06/TERMOSALUD_D_REDUCE-1.png"
];

async function downloadFile(url) {
  const filename = path.basename(new URL(url).pathname);
  const dest = path.join(targetDir, filename);

  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${url}: status code ${res.statusCode}`);
        return resolve(false);
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Saved: ${filename}`);
        resolve(true);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Downloading ${urls.length} assets to ${targetDir}...`);
  for (const url of urls) {
    await downloadFile(url);
  }
  console.log('Finished downloading assets!');
}

run();

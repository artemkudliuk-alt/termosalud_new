import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const imagesToDownload = [
  { url: 'https://www.termosalud.com/wp-content/uploads/2026/07/slider-inuo-home.png', dest: 'public/wp-content/uploads/2026/07/slider-inuo-home.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2026/07/ZIONIC-PRO-MAX-home-slider.png', dest: 'public/wp-content/uploads/2026/07/ZIONIC-PRO-MAX-home-slider.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2023/01/symmed-AE.png', dest: 'public/wp-content/uploads/2023/01/symmed-AE.png' }
];

async function downloadImages() {
  for (const item of imagesToDownload) {
    const dest = path.join(rootDir, item.dest);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    try {
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(dest, buffer);
        console.log(`Downloaded ${item.url} -> ${dest} (${buffer.length} bytes)`);
      } else {
        console.log(`HTTP ${res.status} for ${item.url}`);
      }
    } catch (e) {
      console.error(`Error downloading ${item.url}:`, e.message);
    }
  }
}

downloadImages();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const videoUrl = 'https://www.termosalud.com/wp-content/uploads/2024/02/EMPOWER-BEAUTY-TOGETHER-4K.mp4';
const destPath = path.join(rootDir, 'public/wp-content/uploads/2024/02/EMPOWER-BEAUTY-TOGETHER-4K.mp4');

async function downloadVideo() {
  console.log(`Starting download of hero video from ${videoUrl}...`);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  const res = await fetch(videoUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const totalBytes = Number(res.headers.get('content-length')) || 0;
  console.log(`Video size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(destPath, buffer);

  console.log(`Saved video to ${destPath} (${buffer.length} bytes)`);
}

downloadVideo().catch(console.error);

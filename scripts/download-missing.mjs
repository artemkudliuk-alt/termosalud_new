import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pages = ['index.html', 'about-us/index.html', 'zionic/index.html', 'linfopress/index.html'];

async function downloadFile(url, destPath) {
  try {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) {
      console.log(`Failed ${url}: HTTP ${res.status}`);
      return false;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    console.log(`Downloaded ${url} -> ${destPath} (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.error(`Error downloading ${url}:`, err.message);
    return false;
  }
}

async function main() {
  const assetPaths = new Set();

  for (const p of pages) {
    const filePath = path.join(rootDir, p);
    if (!fs.existsSync(filePath)) continue;
    const text = fs.readFileSync(filePath, 'utf-8');

    const matches = text.matchAll(/(?:src|href|poster)=["'](\/wp-content\/[^"']+)["']/gi);
    for (const m of matches) {
      assetPaths.add(m[1]);
    }
  }

  console.log(`Checking ${assetPaths.size} local assets...`);
  let downloaded = 0;

  for (const rel of assetPaths) {
    const localPath = path.join(rootDir, 'public', rel);
    if (!fs.existsSync(localPath) || fs.statSync(localPath).size === 0) {
      const remoteUrl = 'https://termosalud.com.ua' + rel;
      const ok = await downloadFile(remoteUrl, localPath);
      if (ok) downloaded++;
    }
  }

  console.log(`Downloaded ${downloaded} missing files.`);
}

main().catch(console.error);

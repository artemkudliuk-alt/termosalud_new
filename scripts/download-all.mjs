import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const pages = ['index', 'about-us', 'zionic', 'linfopress'];

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': '*/*'
        }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

async function downloadFile(url, destPath) {
  try {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      return true;
    }
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    const res = await fetchWithRetry(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buffer);
    console.log(`[Downloaded] ${url} -> ${destPath} (${buffer.length} bytes)`);
    return true;
  } catch (err) {
    console.error(`[Failed] ${url}: ${err.message}`);
    return false;
  }
}

async function main() {
  const allUrls = new Set();

  for (const page of pages) {
    const filePath = path.join(rootDir, 'docs/research/raw_html', `${page}.html`);
    if (!fs.existsSync(filePath)) continue;
    const text = fs.readFileSync(filePath, 'utf-8');

    // Find any URL containing wp-content or assets
    const matches = text.matchAll(/https?:\/\/termosalud\.com\.ua\/wp-content\/[^\s"'>\)]+/gi);
    for (const m of matches) {
      let u = m[0];
      // Clean trailing punctuation
      u = u.replace(/[,\;]+$/, '');
      allUrls.add(u);
    }

    // Relative links to /wp-content/
    const relMatches = text.matchAll(/(\/wp-content\/[^\s"'>\)]+)/gi);
    for (const m of relMatches) {
      let u = 'https://termosalud.com.ua' + m[1].replace(/[,\;]+$/, '');
      allUrls.add(u);
    }
  }

  // Also check public css files for url references
  const cssDir = path.join(rootDir, 'public/wp-content/cache/minify');
  if (fs.existsSync(cssDir)) {
    const cssFiles = fs.readdirSync(cssDir);
    for (const file of cssFiles) {
      if (!file.endsWith('.css')) continue;
      const cssText = fs.readFileSync(path.join(cssDir, file), 'utf-8');
      const cssMatches = cssText.matchAll(/url\(['"]?([^'"\)\?#]+)(\?[^'"\)]*)?['"]?\)/gi);
      for (const m of cssMatches) {
        let u = m[1].trim();
        if (u.startsWith('/')) {
          allUrls.add('https://termosalud.com.ua' + u);
        } else if (u.startsWith('http')) {
          allUrls.add(u);
        }
      }
    }
  }

  console.log(`Discovered ${allUrls.size} asset URLs`);

  // Download all files concurrently in chunks of 5
  const urlList = Array.from(allUrls);
  const chunkSize = 5;
  for (let i = 0; i < urlList.length; i += chunkSize) {
    const chunk = urlList.slice(i, i + chunkSize);
    await Promise.all(chunk.map(async (u) => {
      try {
        const parsed = new URL(u);
        let rel = parsed.pathname;
        if (rel.startsWith('/')) rel = rel.slice(1);
        rel = decodeURIComponent(rel);
        const dest = path.join(rootDir, 'public', rel);
        await downloadFile(u, dest);
      } catch (e) {
        console.error(`Error downloading ${u}:`, e.message);
      }
    }));
  }

  console.log('Complete asset download finished!');
}

main().catch(console.error);

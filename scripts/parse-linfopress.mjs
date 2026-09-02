import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/linfopress_official.html', 'utf8');

const images = [];
const imgRegex = /<img[^>]+(?:data-src|src)=["']([^"']+)["'][^>]*>/gi;
let m;
while ((m = imgRegex.exec(html)) !== null) {
  if (!m[1].startsWith('data:image')) {
    images.push(m[1]);
  }
}

const clean = (str) => str.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => clean(m[1]));
const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => clean(m[1]));
const h3s = [...html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)].map(m => clean(m[1]));
const h4s = [...html.matchAll(/<h4[^>]*>([\s\S]*?)<\/h4>/gi)].map(m => clean(m[1]));
const iframes = [...html.matchAll(/<iframe[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
const videos = [...html.matchAll(/<video[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);

const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map(m => clean(m[1])).filter(p => p.length > 20);

console.log('=== H1 ===\n', h1s);
console.log('=== H2 ===\n', h2s);
console.log('=== H3 ===\n', h3s);
console.log('=== H4 ===\n', h4s);
console.log('=== Videos & Iframes ===\n', iframes, videos);
console.log('=== Paragraphs Count ===\n', paragraphs.length);

fs.writeFileSync('C:/nextweb/termosalud/linfopress_extracted.json', JSON.stringify({
  h1s,
  h2s,
  h3s,
  h4s,
  iframes,
  videos,
  images: [...new Set(images)],
  paragraphs
}, null, 2));

console.log('Saved to linfopress_extracted.json');

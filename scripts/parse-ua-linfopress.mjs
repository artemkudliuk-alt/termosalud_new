import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/termosalud_ua_linfopress.html', 'utf8');

// Find all headings
const headings = html.match(/<h[1-4][^>]*>[\s\S]*?<\/h[1-4]>/gi) || [];
console.log('=== HEADINGS ON termosalud.com.ua/linfopress ===');
headings.forEach(h => console.log('-', h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));

// Find all images
const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
console.log('\n=== IMAGES COUNT ===', imgMatches.length);
console.log('Unique images:\n', [...new Set(imgMatches)]);

// Find all background images
const bgMatches = [...html.matchAll(/background(?:-image)?:\s*url\((['"]?)(.*?)\1\)/gi)].map(m => m[2]);
console.log('\n=== BG IMAGES ===', [...new Set(bgMatches)]);

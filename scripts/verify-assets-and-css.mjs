import fs from 'fs';
import path from 'path';

const html = fs.readFileSync('C:/nextweb/termosalud/scripts/exact_live_linfopress_body.html', 'utf8');

const svgImgs = [...html.matchAll(/src=["']([^"']+\.svg)["']/gi)].map(m => m[1]);
console.log('SVG images:', svgImgs);
svgImgs.forEach(svg => {
  const localPath = path.join('C:/nextweb/termosalud/public', svg);
  const exists = fs.existsSync(localPath);
  console.log(`${exists ? 'OK' : 'MISSING'}: ${svg}`);
});

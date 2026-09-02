import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/linfopress_official.html', 'utf8');

const modes = ['Pre-Therapy', 'Wave', 'Relaxing', 'Lympha'];
for (const mode of modes) {
  const idx = html.indexOf(mode);
  if (idx !== -1) {
    const chunk = html.substring(idx - 100, idx + 2000);
    const img = chunk.match(/<img[^>]+>/i);
    console.log(`=== ${mode} ===`);
    console.log('Image tag:', img ? img[0] : 'None');
  }
}

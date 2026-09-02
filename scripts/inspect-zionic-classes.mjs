import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/scripts/exact_live_zionic_body.html', 'utf8');

const matches = [...html.matchAll(/class=["']([^"']+)["']/gi)].map(m => m[1]);
const splitClasses = matches.flatMap(c => c.split(/\s+/)).filter(Boolean);
console.log('Top unique classes in zionic body:', [...new Set(splitClasses)].slice(0, 50));

// Check before & after structure (.ba)
const baIdx = html.indexOf('class="ba');
if (baIdx !== -1) {
  console.log('\n=== BA SECTION ===\n', html.substring(baIdx - 100, baIdx + 1500));
}

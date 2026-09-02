import fs from 'fs';

const css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Search for overflow rules on wrapper/body
const overflowMatches = [...css.matchAll(/overflow[^;]+;/gi)].map(m => m[0]);
console.log('Unique overflow rules:');
console.log([...new Set(overflowMatches)]);

// Check how apparatus-monolith-block is styled
const monoIdx = css.indexOf('.apparatus-monolith-block.zionic-monolith');
if (monoIdx !== -1) {
  console.log('\nMonolith sticky rules:');
  console.log(css.substring(monoIdx, monoIdx + 800));
}

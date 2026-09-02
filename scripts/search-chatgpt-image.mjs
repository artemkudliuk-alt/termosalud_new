import fs from 'fs';
import path from 'path';

function findFiles(baseDir, maxDepth = 4) {
  const results = [];
  function recurse(dir, depth) {
    if (depth > maxDepth) return;
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const full = path.join(dir, item);
        try {
          const st = fs.statSync(full);
          if (st.isDirectory()) {
            if (!item.startsWith('.') && item !== 'node_modules' && item !== 'AppData' && item !== 'Windows' && item !== 'Program Files') {
              recurse(full, depth + 1);
            }
          } else {
            const lower = item.toLowerCase();
            if (lower.includes('chatgpt') || lower.includes('21_27') || lower.includes('2 сент') || lower.includes('infografia') || lower.includes('manipulo')) {
              results.push({ path: full, size: st.size, mtime: st.mtime });
            }
          }
        } catch (e) {}
      }
    } catch (e) {}
  }
  recurse(baseDir, 0);
  return results;
}

console.log('Searching C:/Users/Jaku ...');
const jakuFiles = findFiles('C:/Users/Jaku', 4);
jakuFiles.forEach(f => console.log(f.mtime.toISOString(), f.size, f.path));

console.log('\nSearching d:/ ...');
const dFiles = findFiles('d:/', 4);
dFiles.forEach(f => console.log(f.mtime.toISOString(), f.size, f.path));

console.log('\nSearching C:/nextweb ...');
const nwFiles = findFiles('C:/nextweb', 4);
nwFiles.forEach(f => console.log(f.mtime.toISOString(), f.size, f.path));

import https from 'https';
import fs from 'fs';

https.get('https://termosalud.com.ua/zionic/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/zionic-orig.html', data, 'utf8');
    console.log('Saved original zionic html. Length:', data.length);

    // Look for form or presentation sections
    const kw = ['презентац', 'another-pages-banner', 'consultation', 'feedback'];
    for (const k of kw) {
      let idx = 0;
      while ((idx = data.indexOf(k, idx)) !== -1) {
        console.log(`\n=== Found "${k}" at ${idx} ===`);
        console.log(data.slice(Math.max(0, idx - 200), idx + 400));
        idx += k.length;
      }
    }
  });
}).on('error', err => console.error(err));

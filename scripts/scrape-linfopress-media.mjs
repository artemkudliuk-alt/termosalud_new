import https from 'https';
import fs from 'fs';

https.get('https://termosalud.com.ua/linfopress/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('scripts/linfopress-orig.html', data, 'utf8');
    console.log('Saved original html. Length:', data.length);

    // Look for keywords: розігріву, Хвиля, Лімфодренаж, Релаксація
    const keywords = ['розігрів', 'Хвиля', 'Лімфодренаж', 'Релаксація', 'чотирьох унікальних комбінаціях', 'біоміметичної'];
    for (const kw of keywords) {
      const idx = data.indexOf(kw);
      if (idx !== -1) {
        console.log(`\n=== Context for "${kw}" (at ${idx}) ===`);
        console.log(data.slice(Math.max(0, idx - 400), idx + 800));
      }
    }
  });
}).on('error', err => console.error(err));

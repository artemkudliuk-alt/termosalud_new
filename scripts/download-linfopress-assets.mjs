import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/LINFO_W_REDUCE.png', name: 'linfopress_hero_machine.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/S9A2008_RTQ-e1728478496193.png', name: 'linfopress_treatment_wide.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/PRETHERAPHY.gif', name: 'protocol_pretherapy.gif' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/WAVE-REALING.gif', name: 'protocol_wave.gif' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/LYMPHA-3.gif', name: 'protocol_lympha.gif' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/S9A2072-768x526.png', name: 'linfopress_suit_full.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/2024/10/S9A2072_2-768x526.png', name: 'linfopress_suit_arms.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/elementor/thumbs/4-qvahdb6trutuj0btybllmhx2uib059aggxb913n4i4.png', name: 'tech_24_chambers.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/elementor/thumbs/1-1-qvahd2qa2ci9mio4bpxyi21xi1gp7zcvfrfvplzo5g.png', name: 'tech_pillow.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/elementor/thumbs/3-qv99qgaqaafxv435nt5z5ec7tuv5f63c5wdxaurp7i.png', name: 'tech_ankle.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/elementor/thumbs/2-qv99qfcw3genji4itarckwkr8gzs7gzltrqftkt39k.png', name: 'tech_sensors.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/elementor/thumbs/A-qvcnbuosn9w4bt9wzhgn9t3518hehhxhn0x37xboxs.png', name: 'benefit_size_a.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/elementor/thumbs/B-qvcnbyg5em19m94gdj35js4zeryvcacezjj151648w.png', name: 'benefit_size_b.png' },
  { url: 'https://www.termosalud.com/wp-content/uploads/elementor/thumbs/C-qvcnbzdzlg2jxv3381hs49wg05u8jzg5bo6imb4q2o.png', name: 'benefit_size_c.png' }
];

const targetDir = 'C:/nextweb/termosalud/public/wp-content/uploads/linfopress_official';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function download(item) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(targetDir, item.name);
    const file = fs.createWriteStream(filePath);
    https.get(item.url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          redirectRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(item.name); });
        }).on('error', reject);
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(item.name); });
      }
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading Linfopress assets...');
  for (const asset of assets) {
    try {
      const name = await download(asset);
      console.log('Downloaded:', name);
    } catch (e) {
      console.error('Failed to download:', asset.url, e.message);
    }
  }
  console.log('All Linfopress assets downloaded successfully.');
}

run();

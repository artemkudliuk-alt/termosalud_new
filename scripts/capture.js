import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'D:\\termosalud\\public\\assets\\generated';
const artifactDir = 'C:\\Users\\Jaku\\.gemini\\antigravity\\brain\\0e847db7-5252-477f-874a-31db13f9e164';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const files = [
  { url: 'http://localhost:5173/temp_start_frame_flagships_split.html', out: path.join(outDir, 'start_frame_flagships_split.png'), art: path.join(artifactDir, 'start_frame_flagships_split.png') },
  { url: 'http://localhost:5173/temp_linfopress_3_angles_sheet.html', out: path.join(outDir, 'linfopress_3_angles_sheet.png'), art: path.join(artifactDir, 'linfopress_3_angles_sheet.png') },
  { url: 'http://localhost:5173/temp_zionic_3_angles_sheet.html', out: path.join(outDir, 'zionic_3_angles_sheet.png'), art: path.join(artifactDir, 'zionic_3_angles_sheet.png') }
];

for (const f of files) {
  const cmd = `"${chromePath}" --headless=new --screenshot="${f.out}" --window-size=1920,1080 --hide-scrollbars "${f.url}"`;
  console.log('Rendering:', f.out);
  execSync(cmd, { stdio: 'inherit' });
  if (fs.existsSync(f.out)) {
    fs.copyFileSync(f.out, f.art);
    console.log('Saved and copied to artifact:', f.art, 'Size:', fs.statSync(f.out).size);
  }
}
console.log('All 3 boards successfully generated!');

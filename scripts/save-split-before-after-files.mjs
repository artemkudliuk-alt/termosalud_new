import fs from 'fs';

let raw = fs.readFileSync('C:/Users/Jaku/.gemini/antigravity/brain/d4cebe46-e502-4198-a0cb-7a9dfbbc9398/.system_generated/steps/3244/output.txt', 'utf8');
const jsonStart = raw.indexOf('[');
const jsonEnd = raw.lastIndexOf(']');
const json = JSON.parse(raw.substring(jsonStart, jsonEnd + 1));
const outDir = 'public/wp-content/uploads/zionic_official';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

json.forEach(item => {
  const bData = item.before.replace(/^data:image\/jpeg;base64,/, '');
  const aData = item.after.replace(/^data:image\/jpeg;base64,/, '');
  fs.writeFileSync(`${outDir}/case_${item.id}_before.jpg`, Buffer.from(bData, 'base64'));
  fs.writeFileSync(`${outDir}/case_${item.id}_after.jpg`, Buffer.from(aData, 'base64'));
  console.log(`Saved case ${item.id}: before & after`);
});

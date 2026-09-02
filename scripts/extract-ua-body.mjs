import fs from 'fs';

const html = fs.readFileSync('C:/nextweb/termosalud/termosalud_ua_linfopress.html', 'utf8');

console.log('HTML length:', html.length);
const techIdx = html.indexOf('technologies fade-up');
console.log('techIdx:', techIdx);
if (techIdx !== -1) {
  const footerIdx = html.indexOf('<footer');
  console.log('footerIdx:', footerIdx);
  const divStart = html.lastIndexOf('<div', techIdx);
  console.log('divStart:', divStart);
  const bodyContent = html.substring(divStart, footerIdx).trim();
  console.log('Body content length:', bodyContent.length);
  fs.writeFileSync('C:/nextweb/termosalud/scripts/termosalud_ua_body.html', bodyContent, 'utf8');
  console.log('Saved termosalud_ua_body.html successfully.');
}

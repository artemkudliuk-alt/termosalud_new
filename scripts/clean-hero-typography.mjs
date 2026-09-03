import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');
const targetText = 'ZIONIC HERO ORIGINAL EXACT TYPOGRAPHY & LAYOUT';
const idx = css.indexOf(targetText);
if (idx !== -1) {
  // find start of comment before it
  const commentStart = css.lastIndexOf('/*', idx);
  if (commentStart !== -1) {
    css = css.slice(0, commentStart).trimEnd() + '\n';
  }
}

// Add only the sublogo tag styling:
css += `
/* Sublogo tag */
.zionic-hero-sublogo-tag {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  color: #18181b !important;
  letter-spacing: 0.2px !important;
  text-transform: none !important;
}
`;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully reverted title styling to original CAPSLOCK and sizes');

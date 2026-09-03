import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Replace padding-left: 0 with padding-left: 69px on lines 20432-20442
css = css.replace(
  /html body\.template-zionic \.guarantees-head-title,\s*\.guarantees-head-title\s*\{[\s\S]*?padding-left:\s*0\s*!important;[\s\S]*?\}/g,
  `html body.template-zionic .guarantees-head-title,
.guarantees-head-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 20px !important;
  font-weight: 800 !important;
  color: #111111 !important;
  line-height: 1.35 !important;
  margin: 18px 0 14px 0 !important;
  padding-left: 69px !important;
  text-transform: none !important;
}`
);

const mobileRule = `
@media (max-width: 576px) {
  html body.template-zionic .guarantees-head-title,
  .guarantees-head-title {
    padding-left: 0 !important;
  }
}
`;

css += '\n' + mobileRule;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Updated guarantees-head-title padding-left to 69px in custom.css');

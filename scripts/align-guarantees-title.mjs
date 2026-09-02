import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const updatedGuaranteesTitleCss = `
.guarantees-head-title {
  font-family: 'Montserrat', sans-serif !important;
  font-size: 17px !important;
  font-weight: 900 !important;
  color: #111111 !important;
  margin: 10px 0 12px 0 !important;
  padding-left: 68px !important; /* Exactly aligned with the headings in the text */
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
}

@media (max-width: 576px) {
  .guarantees-head-title {
    padding-left: 0 !important;
  }
}
`;

css = css.replace(/\.guarantees-head-title\s*\{[\s\S]*?\}/g, updatedGuaranteesTitleCss);

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

console.log('Successfully aligned guarantees head title to the exact level of text headings!');

import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const removeShadowCss = `
/* ==========================================================================
   REMOVE GRADIENT / SHADOW OVERLAY ON MANIPULA SECTION
   ========================================================================== */
.zionic-manipula-fullscreen-section,
.zionic-manipula-section,
.manipula-fullscreen-wrapper,
.manipula-fullscreen-img {
  box-shadow: none !important;
  border: none !important;
  outline: none !important;
  filter: none !important;
}

.zionic-tech-bento-section {
  box-shadow: none !important;
  border-bottom: none !important;
}
`;

css += '\n' + removeShadowCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully removed shadow and gradient from Manipula section!');

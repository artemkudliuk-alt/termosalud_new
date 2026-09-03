import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fixStyles = `
/* 5 причин чому Zionic title & subtitle */
#reasons-treatments .section-main-title,
.zionic-treatments-fullscreen-section .section-main-title {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 800 !important;
  font-size: clamp(28px, 3.2vw, 44px) !important;
  max-width: 920px !important;
  margin: 0 auto 20px auto !important;
  line-height: 1.25 !important;
  text-align: center !important;
}

#reasons-treatments .section-main-sub,
.zionic-treatments-fullscreen-section .section-main-sub {
  max-width: 960px !important;
  margin: 0 auto !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(15px, 1.25vw, 17px) !important;
  font-weight: 500 !important;
  color: #54595f !important;
  line-height: 1.55 !important;
  text-align: center !important;
}
`;

css += '\n' + fixStyles;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully added fix for 5 причин title and subtitle');

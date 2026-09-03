import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const fixTitleTransform = `
/* Video Section Title Sentence Case */
html body.template-zionic .zionic-video-presentation-section .section-main-title,
html body .zionic-video-presentation-section .section-main-title,
.zionic-video-presentation-section h2 {
  text-transform: none !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 800 !important;
  font-size: clamp(28px, 3.2vw, 42px) !important;
  color: #18181b !important;
  text-align: center !important;
}
`;

css += '\n' + fixTitleTransform;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Fixed text-transform for video header');

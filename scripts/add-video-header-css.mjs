import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const videoHeaderCss = `
/* Zionic Video Presentation Section Header */
.zionic-video-presentation-section {
  padding: 85px 0 45px 0 !important;
  background: #ffffff !important;
  text-align: center !important;
}

html body.template-zionic .zionic-video-presentation-section .section-main-title,
.zionic-video-presentation-section .section-main-title {
  color: #18181b !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(30px, 3.2vw, 44px) !important;
  font-weight: 800 !important;
  text-transform: none !important;
  margin: 0 auto 18px auto !important;
  line-height: 1.25 !important;
  text-align: center !important;
}

html body.template-zionic .zionic-video-presentation-section .section-main-sub,
.zionic-video-presentation-section .section-main-sub {
  color: #54595f !important;
  font-family: 'Montserrat', sans-serif !important;
  font-size: clamp(15px, 1.2vw, 17px) !important;
  font-weight: 500 !important;
  max-width: 880px !important;
  margin: 0 auto !important;
  line-height: 1.55 !important;
  text-align: center !important;
}
`;

css += '\n' + videoHeaderCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Appended styles for zionic-video-presentation-section');

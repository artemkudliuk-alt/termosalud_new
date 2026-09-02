import fs from 'fs';

let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const sliderJs = `
// 21. Zionic Custom Sharp Sliders (Before & After, Experience)
document.addEventListener('DOMContentLoaded', () => {
  const initZionicSlider = (containerSelector) => {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const wrapper = container.querySelector('.swiper-wrapper');
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');

    if (wrapper && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        const slideWidth = wrapper.querySelector('.swiper-slide')?.offsetWidth || 340;
        wrapper.scrollBy({ left: -(slideWidth + 24), behavior: 'smooth' });
      });
      nextBtn.addEventListener('click', () => {
        const slideWidth = wrapper.querySelector('.swiper-slide')?.offsetWidth || 340;
        wrapper.scrollBy({ left: slideWidth + 24, behavior: 'smooth' });
      });
    }
  };

  initZionicSlider('.zionic-ba-swiper');
  initZionicSlider('.zionic-exp-swiper');
});
`;

if (!js.includes('21. Zionic Custom Sharp Sliders')) {
  js += '\n' + sliderJs;
  fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');
  console.log('Added Zionic slider JS to src/js/main.js');
}

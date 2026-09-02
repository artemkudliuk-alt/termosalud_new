import fs from 'fs';

let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const carouselCode = `
// 23. Zionic Modern Gallery Carousel Controller
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.zionic-modern-gallery-slider');
  if (!slider) return;
  const track = slider.querySelector('.zionic-gallery-track');
  const prev = slider.querySelector('.prev-btn');
  const next = slider.querySelector('.next-btn');
  const currentEl = slider.querySelector('.current-slide');
  const totalEl = slider.querySelector('.total-slides');
  const items = slider.querySelectorAll('.zionic-slide-item');

  if (totalEl) totalEl.textContent = String(items.length).padStart(2, '0');

  if (track && prev && next) {
    const updateCounter = () => {
      const itemWidth = items[0]?.offsetWidth || 340;
      const index = Math.round(track.scrollLeft / (itemWidth + 24)) + 1;
      if (currentEl) currentEl.textContent = String(Math.min(Math.max(1, index), items.length)).padStart(2, '0');
    };

    track.addEventListener('scroll', updateCounter);

    prev.addEventListener('click', () => {
      const itemWidth = items[0]?.offsetWidth || 340;
      track.scrollBy({ left: -(itemWidth + 24), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      const itemWidth = items[0]?.offsetWidth || 340;
      track.scrollBy({ left: itemWidth + 24, behavior: 'smooth' });
    });
  }

  // FAQ Accordion click
  document.querySelectorAll('.faq-toggle-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.faq-accordion-card');
      const body = card.querySelector('.faq-answer-body');
      const icon = btn.querySelector('.faq-icon');
      if (body.style.display === 'none' || !body.style.display) {
        body.style.display = 'block';
        if (icon) icon.textContent = '−';
      } else {
        body.style.display = 'none';
        if (icon) icon.textContent = '+';
      }
    });
  });
});
`;

if (!js.includes('23. Zionic Modern Gallery Carousel Controller')) {
  js += '\n' + carouselCode;
  fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');
}

import fs from 'fs';

let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const toggleExactFaqFn = `
window.toggleExactFaq = function(btn) {
  const item = btn.closest('.exact-faq-item');
  if (!item) return;
  const wasActive = item.classList.contains('active');
  const parent = item.parentElement;
  
  parent.querySelectorAll('.exact-faq-item').forEach(el => {
    el.classList.remove('active');
    const content = el.querySelector('.exact-faq-content');
    if (content) content.style.display = 'none';
    const chevron = el.querySelector('.exact-faq-chevron svg');
    if (chevron) chevron.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
  });

  if (!wasActive) {
    item.classList.add('active');
    const content = item.querySelector('.exact-faq-content');
    if (content) content.style.display = 'block';
    const chevron = item.querySelector('.exact-faq-chevron svg');
    if (chevron) chevron.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
  }
};
`;

js += '\n' + toggleExactFaqFn;
fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');
console.log('Appended toggleExactFaq to main.js');

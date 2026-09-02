import fs from 'fs';

// 1. Update scripts/process-html.mjs
let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

htmlMjs = htmlMjs.replace(
  /<button type="button" class="faq-toggle-header">/g,
  '<button type="button" class="faq-toggle-header" onclick="toggleZionicFaq(this)">'
);

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

// 2. Update src/js/main.js
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const globalFaqHandler = `
// Global Bulletproof FAQ Accordion Handler for Zionic & Linfopress
window.toggleZionicFaq = function(btn) {
  const card = btn.closest('.faq-accordion-card');
  if (!card) return;
  const isCurrentlyActive = card.classList.contains('active');
  const icon = card.querySelector('.faq-icon');

  if (isCurrentlyActive) {
    card.classList.remove('active');
    if (icon) icon.textContent = '+';
  } else {
    card.classList.add('active');
    if (icon) icon.textContent = '−';
  }
};

document.addEventListener('click', function(e) {
  const btn = e.target.closest('.faq-toggle-header');
  if (btn && !btn.hasAttribute('onclick')) {
    window.toggleZionicFaq(btn);
  }
});
`;

if (!js.includes('window.toggleZionicFaq')) {
  js = globalFaqHandler + '\n' + js;
}

fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Successfully made FAQ accordion 100% bulletproof with global handler and onclick binding!');

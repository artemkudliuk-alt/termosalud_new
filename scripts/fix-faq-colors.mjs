import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Replace all white colors on faq-q-text with #0f172a
css = css.replace(/\.faq-accordion-card\.active \.faq-q-text\s*\{\s*color:\s*#ffffff\s*!important;\s*\}/g, '.faq-accordion-card.active .faq-q-text { color: #0f172a !important; }');
css = css.replace(/\.faq-q-text\s*\{([^}]*?)color:\s*#ffffff\s*!important;/g, '.faq-q-text {$1color: #0f172a !important;');
css = css.replace(/\.linfopress-faq-accordion \.faq-q-text\s*\{([^}]*?)color:\s*#ffffff\s*!important;/g, '.linfopress-faq-accordion .faq-q-text {$1color: #0f172a !important;');
css = css.replace(/body\.template-zionic \.faq-q-text,\s*\.template-zionic \.faq-q-text\s*\{([^}]*?)color:\s*#ffffff\s*!important;/g, 'body.template-zionic .faq-q-text, .template-zionic .faq-q-text {$1color: #0f172a !important;');
css = css.replace(/html body\.template-zionic \.faq-q-text\s*\{([^}]*?)color:\s*#ffffff\s*!important;/g, 'html body.template-zionic .faq-q-text {$1color: #0f172a !important;');
css = css.replace(/html body\.template-linfopress \.faq-q-text\s*\{([^}]*?)color:\s*#ffffff\s*!important;/g, 'html body.template-linfopress .faq-q-text {$1color: #0f172a !important;');
css = css.replace(/\.zionic-main-page-wrapper \.faq-q-text\s*\{([^}]*?)color:\s*#ffffff\s*!important;/g, '.zionic-main-page-wrapper .faq-q-text {$1color: #0f172a !important;');

// In active state, make sure question text stays dark and clear
css += `
/* Force active faq question text to be deep charcoal */
.faq-accordion-card.active .faq-q-text,
.linfopress-faq-accordion .faq-accordion-card.active .faq-q-text,
html body.template-zionic .faq-accordion-card.active .faq-q-text,
html body.template-linfopress .faq-accordion-card.active .faq-q-text,
html body.template-zionic .faq-q-text,
html body.template-linfopress .faq-q-text,
.faq-q-text {
  color: #0f172a !important;
}
`;

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully fixed all FAQ question colors');

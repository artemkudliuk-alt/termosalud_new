import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

// Global replacement of slate/blueish hex codes with strict neutral monochrome + footer gray (#54595f)
// 1. Blueish dark backgrounds
css = css.replace(/#090d16/gi, '#121212');
css = css.replace(/#0b0f19/gi, '#121212');
css = css.replace(/#111827/gi, '#18181b');
css = css.replace(/rgba\(9,\s*13,\s*22/gi, 'rgba(18, 18, 18');
css = css.replace(/rgba\(11,\s*15,\s*25/gi, 'rgba(18, 18, 18');
css = css.replace(/rgba\(17,\s*24,\s*39/gi, 'rgba(24, 24, 27');

// 2. Blueish dark border colors -> #54595f (Signature brand footer gray)
css = css.replace(/#334155/gi, '#54595f');
css = css.replace(/#1e293b/gi, '#54595f');
css = css.replace(/#0f172a/gi, '#18181b'); // For text -> #18181b (neutral obsidian)
css = css.replace(/rgba\(15,\s*23,\s*42/gi, 'rgba(24, 24, 27');
css = css.replace(/rgba\(30,\s*41,\s*59/gi, 'rgba(84, 89, 95');
css = css.replace(/rgba\(51,\s*65,\s*85/gi, 'rgba(84, 89, 95');

// 3. Blueish light text colors -> neutral light zinc / footer gray
css = css.replace(/#cbd5e1/gi, '#d4d4d8');
css = css.replace(/#94a3b8/gi, '#a1a1aa');
css = css.replace(/#64748b/gi, '#54595f');
css = css.replace(/#f8fafc/gi, '#f4f4f5');
css = css.replace(/#e2e8f0/gi, '#e4e4e7');

const strictMonochromeBordersCss = `
/* ==========================================================================
   STRICT MONOCHROME & FOOTER-GRAY (#54595f) DESIGN SYSTEM (ZERO BLUE TINTS)
   ========================================================================== */

/* 1. All Section Frames and Cards on Linfopress & Zionic */
.linfopress-tech-card,
.zionic-tech-card,
.tech-bento-card,
.linfopress-bento-card,
.t-reveal-item,
.phase-card,
.phase-video-card,
.why-card-item,
.package-item-card,
.advantage-card-v2,
.linfopress-advantage-card,
.matrix-creative-card,
.matrix-custom-item,
.presentation-card,
.guarantee-card,
.doctor-author-avatar {
  border-color: #54595f !important; /* EXACT SIGNATURE FOOTER DARK GRAY */
}

/* Second screen (Technologies 4 phases) strict dark gray borders */
.linfopress-tech-bento-section .linfopress-tech-card,
.linfopress-tech-card {
  background: #18181b !important;
  border: 1.5px solid #54595f !important;
}

.linfopress-tech-card:hover {
  border-color: #71717a !important;
}

.tech-stage-badge {
  background: #27272a !important;
  border: 1px solid #54595f !important;
  color: #ffffff !important;
}

/* Why section cards */
.why-card-item,
.linfopress-why-section .why-card-item {
  background: #ffffff !important;
  border: 1.5px solid #54595f !important;
}

/* Package section cards */
.package-item-card,
.linfopress-package-section .package-item-card {
  background: #18181b !important;
  border: 1.5px solid #54595f !important;
}

/* Indications matrix cards */
.matrix-creative-card,
.indications-card,
.contraindications-card {
  border: 1.5px solid #54595f !important;
}

/* Main title styling */
h1, h2, h3, h4, h5, h6,
.section-main-title,
.why-main-title {
  color: #18181b !important;
}

/* Dark section headings & package */
#package h2,
#package .package-title,
.linfopress-package-section h2,
.linfopress-package-section .package-title,
.package-section h2 {
  color: #ffffff !important;
}

#package p,
#package .package-subtitle,
.linfopress-package-section p,
.linfopress-package-section .package-subtitle,
.package-section p {
  color: #d4d4d8 !important;
}

/* Footer Gray Brand Elements */
.site-footer,
footer,
.footer-gray-bg {
  background-color: #54595f !important;
  color: #ffffff !important;
}
`;

css += '\n' + strictMonochromeBordersCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully replaced all blue shades with neutral monochrome and footer gray #54595f');

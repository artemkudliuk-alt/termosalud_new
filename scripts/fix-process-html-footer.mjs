import fs from 'fs';

let htmlMjs = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

// Fix lines 2776-2804
const certLightboxModalHtml = `
  <!-- CERTIFICATE FULLSCREEN LIGHTBOX MODAL -->
  <div class="cert-lightbox-modal" id="certLightboxModal" onclick="closeCertLightbox(event)">
    <button type="button" class="cert-lightbox-close" onclick="closeCertLightbox(event)" aria-label="Закрити">✕</button>
    <div class="cert-lightbox-dialog" onclick="event.stopPropagation()">
      <div class="cert-lightbox-img-wrap">
        <img src="" id="certLightboxImg" alt="Сертифікат у повному розмірі">
      </div>
      <div class="cert-lightbox-caption" id="certLightboxCaption"></div>
    </div>
  </div>
`;

const correctFooterLogic = `  const footerInject = \`
  \${modernGlassPopupModal}
  ${certLightboxModalHtml}
  <script type="module" src="/src/js/main.js"></script>
\`;

  if (html.includes('</head>')) {
    html = html.replace('</head>', \`\${headInject}\\n</head>\`);
  }
  if (html.includes('</body>')) {
    html = html.replace('</body>', \`\${footerInject}\\n</body>\`);
  } else {
    html += footerInject;
  }

  return html;
}`;

const markerFix = '  const footerInject = `';
if (htmlMjs.includes(markerFix)) {
  const p1 = htmlMjs.substring(0, htmlMjs.indexOf(markerFix));
  const p2 = htmlMjs.substring(htmlMjs.indexOf('for (const p of pages) {'));
  htmlMjs = p1 + correctFooterLogic + '\n\n' + p2;
}

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', htmlMjs, 'utf8');

console.log('Fixed scripts/process-html.mjs footerInject logic!');

import fs from 'fs';

// 1. Update CSS in src/css/custom.css
let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

css = css.replace(
  /\.horizontal-img-layer\.layer-after\s*\{[\s\S]*?\}/,
  `.horizontal-img-layer.layer-after {
  z-index: 1;
}`
);

if (!css.includes('.horizontal-img-layer.layer-after {')) {
  css = css.replace(
    /\.horizontal-img-layer\.layer-before\s*\{/,
    `.horizontal-img-layer.layer-after {\n  z-index: 1;\n}\n\n.horizontal-img-layer.layer-before {`
  );
}

// Update tag CSS
css = css.replace(
  /\.horizontal-compare-tag\s*\{[\s\S]*?\}/,
  `.horizontal-compare-tag {
  position: absolute;
  top: 16px;
  background: #111111;
  border: 1px solid #3f3f46;
  color: #ffffff;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 11.5px !important;
  font-weight: 800 !important;
  letter-spacing: 1.5px !important;
  padding: 5px 14px !important;
  border-radius: 0 !important;
  transition: opacity 0.2s ease;
  pointer-events: none;
}`
);

fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');

// 2. Update main.js for dynamic tag fading & smooth clipping
let js = fs.readFileSync('C:/nextweb/termosalud/src/js/main.js', 'utf8');

const updatedHLogic = `  // ==========================================================================
  // ZIONIC HORIZONTAL BEFORE/AFTER COMPARISON (LEFT-TO-RIGHT)
  // ==========================================================================
  const hRange = document.getElementById('horizontalRangeInput');
  const hLayerBefore = document.getElementById('horizontalCompareLayerBefore');
  const hDividerHandle = document.getElementById('horizontalDividerHandle');
  const hViewport = document.getElementById('zionicHorizontalCompareViewport');
  const tagLeft = document.querySelector('.horizontal-compare-tag.tag-left');
  const tagRight = document.querySelector('.horizontal-compare-tag.tag-right');

  if (hRange && hLayerBefore && hDividerHandle) {
    function updateHCompare(val) {
      const clamped = Math.max(0, Math.min(100, val));
      hLayerBefore.style.clipPath = \`inset(0 \${100 - clamped}% 0 0)\`;
      hDividerHandle.style.left = \`\${clamped}%\`;

      // Hide tag ДО when handle is pushed all the way to the left
      if (tagLeft) {
        tagLeft.style.opacity = clamped < 12 ? '0' : '1';
      }
      // Hide tag ПІСЛЯ when handle is pushed all the way to the right
      if (tagRight) {
        tagRight.style.opacity = clamped > 88 ? '0' : '1';
      }
    }

    hRange.addEventListener('input', (e) => {
      updateHCompare(e.target.value);
    });

    // Touch & Mouse direct horizontal move
    if (hViewport) {
      let isHDown = false;
      function handleHMove(clientX) {
        const rect = hViewport.getBoundingClientRect();
        const pos = ((clientX - rect.left) / rect.width) * 100;
        hRange.value = pos;
        updateHCompare(pos);
      }

      hViewport.addEventListener('mousedown', (e) => {
        isHDown = true;
        handleHMove(e.clientX);
      });
      window.addEventListener('mousemove', (e) => {
        if (isHDown) handleHMove(e.clientX);
      });
      window.addEventListener('mouseup', () => { isHDown = false; });

      hViewport.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) handleHMove(e.touches[0].clientX);
      }, { passive: true });
      hViewport.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) handleHMove(e.touches[0].clientX);
      }, { passive: true });
    }
  }`;

js = js.replace(/\/\/ ==========================================================================\s*\/\/ ZIONIC HORIZONTAL BEFORE\/AFTER[\s\S]*?\}\s*\}\s*\}/, updatedHLogic);
fs.writeFileSync('C:/nextweb/termosalud/src/js/main.js', js, 'utf8');

console.log('Fixed tags visibility and stacking context on slider edges!');

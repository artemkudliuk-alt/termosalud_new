import fs from 'fs';

let css = fs.readFileSync('C:/nextweb/termosalud/src/css/custom.css', 'utf8');

const seamlessDoctorCss = `
/* ==========================================================================
   SEAMLESS PURE WHITE TRANSITION TO DOCTOR REVIEW (NO GRAY, NO DIVIDER LINE)
   ========================================================================== */
.linfopress-matrix-section {
  border-bottom: none !important;
  padding-bottom: 60px !important;
}

.linfopress-doctor-section {
  background: #ffffff !important; /* PURE WHITE CONTINUOUS BACKGROUND */
  border: none !important;
  padding: 0 0 0 0 !important;
}

.linfopress-doctor-section .doctor-header-container {
  background: #ffffff !important;
  margin-bottom: 40px !important;
  padding-top: 40px !important;
}

.linfopress-doctor-fullscreen-stage {
  border-top: none !important; /* REMOVE DIVIDER LINE COMPLETELY */
  border-bottom: none !important;
  border: none !important;
}
`;

css += '\n' + seamlessDoctorCss;
fs.writeFileSync('C:/nextweb/termosalud/src/css/custom.css', css, 'utf8');
console.log('Successfully written seamless doctor styles in custom.css!');

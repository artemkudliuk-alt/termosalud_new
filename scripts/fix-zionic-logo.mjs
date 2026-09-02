import fs from 'fs';

let processCode = fs.readFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', 'utf8');

processCode = processCode.replace('/wp-content/themes/zionic/assets/images/logo-zionic.svg', '/wp-content/themes/zionic/assets/images/zionic.svg');

fs.writeFileSync('C:/nextweb/termosalud/scripts/process-html.mjs', processCode, 'utf8');
console.log('Fixed zionic logo path to /wp-content/themes/zionic/assets/images/zionic.svg');

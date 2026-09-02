import { execSync } from 'child_process';

const orig = execSync('git show c3e3065:zionic/index.html', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');

const headerEndIdx = orig.indexOf('</header>');
console.log('headerEndIdx:', headerEndIdx);
if (headerEndIdx !== -1) {
  console.log(orig.substring(headerEndIdx + '</header>'.length, headerEndIdx + 2000));
}

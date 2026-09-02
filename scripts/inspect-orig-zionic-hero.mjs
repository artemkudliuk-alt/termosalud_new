import { execSync } from 'child_process';

const orig = execSync('git show c3e3065:scripts/process-html.mjs', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');

const zionicStart = orig.indexOf("if (pageName === 'zionic') {");
console.log('zionicStart:', zionicStart);
if (zionicStart !== -1) {
  const heroEnd = orig.indexOf('</section>', zionicStart);
  console.log(orig.substring(zionicStart, heroEnd + 10));
}

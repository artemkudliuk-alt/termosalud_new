import { execSync } from 'child_process';

try {
  const content = execSync('git show c3e3065:linfopress/index.html', { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');
  console.log('Size of original linfopress/index.html:', content.length);
  const titles = content.match(/<h[1-3][^>]*>[\s\S]*?<\/h[1-3]>/gi) || [];
  console.log('Original headings:\n', titles.map(t => t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()));
} catch (e) {
  console.log('Error:', e.message);
}

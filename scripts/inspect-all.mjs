import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'index', url: 'https://termosalud.com.ua/' },
  { name: 'about-us', url: 'https://termosalud.com.ua/about-us/' },
  { name: 'zionic', url: 'https://termosalud.com.ua/zionic/' },
  { name: 'linfopress', url: 'https://termosalud.com.ua/linfopress/' }
];

async function inspect() {
  const allAssets = new Set();
  const allFonts = new Set();
  const allCss = new Set();
  const allJs = new Set();
  const allImages = new Set();
  
  for (const page of pages) {
    console.log(`Fetching ${page.name}...`);
    const res = await fetch(page.url);
    const html = await res.text();
    
    // Find CSS
    const cssMatches = html.matchAll(/href=["']([^"']+\.css(?:\?[^"']*)?)["']/gi);
    for (const m of cssMatches) allCss.add(new URL(m[1], page.url).href);
    
    // Find JS
    const jsMatches = html.matchAll(/src=["']([^"']+\.js(?:\?[^"']*)?)["']/gi);
    for (const m of jsMatches) allJs.add(new URL(m[1], page.url).href);
    
    // Find Images
    const imgMatches = html.matchAll(/(?:src|href)=["']([^"']+\.(?:png|jpg|jpeg|svg|webp|gif|ico)(?:\?[^"']*)?)["']/gi);
    for (const m of imgMatches) allImages.add(new URL(m[1], page.url).href);

    // Find style background images or other assets
    const bgMatches = html.matchAll(/url\(['"]?([^'"\)]+\.(?:png|jpg|jpeg|svg|webp|gif|ico|woff|woff2|ttf|eot))['"]?\)/gi);
    for (const m of bgMatches) allImages.add(new URL(m[1], page.url).href);
  }

  console.log(`Found ${allCss.size} CSS files`);
  console.log(`Found ${allJs.size} JS files`);
  console.log(`Found ${allImages.size} images/media`);

  // Let's also inspect CSS files to find referenced fonts and background images
  for (const cssUrl of allCss) {
    try {
      const res = await fetch(cssUrl);
      const cssText = await res.text();
      const fontMatches = cssText.matchAll(/url\(['"]?([^'"\)]+\.(?:woff2?|ttf|eot|otf)(?:\?[^"']*)?)['"]?\)/gi);
      for (const m of fontMatches) {
        allFonts.add(new URL(m[1], cssUrl).href);
      }
      const cssImgMatches = cssText.matchAll(/url\(['"]?([^'"\)]+\.(?:png|jpg|jpeg|svg|webp|gif|ico)(?:\?[^"']*)?)['"]?\)/gi);
      for (const m of cssImgMatches) {
        allImages.add(new URL(m[1], cssUrl).href);
      }
    } catch (e) {
      console.error(`Error fetching CSS ${cssUrl}:`, e.message);
    }
  }

  console.log(`Found ${allFonts.size} font files`);

  fs.mkdirSync('docs/research', { recursive: true });
  fs.writeFileSync('docs/research/assets.json', JSON.stringify({
    css: Array.from(allCss),
    js: Array.from(allJs),
    images: Array.from(allImages),
    fonts: Array.from(allFonts)
  }, null, 2));

  console.log('Saved assets to docs/research/assets.json');
}

inspect().catch(console.error);

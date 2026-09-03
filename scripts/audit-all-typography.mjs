import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const urls = [
    { name: 'Main', url: 'http://localhost:5173/' },
    { name: 'Zionic', url: 'http://localhost:5173/zionic/' },
    { name: 'Linfopress', url: 'http://localhost:5173/linfopress/' }
  ];

  for (const pageInfo of urls) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(pageInfo.url, { waitUntil: 'networkidle0' });

    const data = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      return sections.map(sec => {
        const h2 = sec.querySelector('h2, .section-main-title, .title, .head-title');
        const sub = sec.querySelector('.section-main-sub, .section-subtitle, .section-desc, .subtitle, p');
        const cardTitle = sec.querySelector('.card-title, .bento-title, .tech-card-title, .why-card-title, .doctor-card-title, .item-title, h3');
        const cardDesc = sec.querySelector('.card-desc, .bento-desc, .tech-card-desc, .why-card-desc, .doctor-desc, .item-desc, .card p');
        
        return {
          sectionId: sec.id || sec.className.split(' ')[0],
          h2: h2 ? { text: h2.textContent.trim().slice(0, 30), size: window.getComputedStyle(h2).fontSize, weight: window.getComputedStyle(h2).fontWeight } : null,
          sub: sub ? { text: sub.textContent.trim().slice(0, 30), size: window.getComputedStyle(sub).fontSize, weight: window.getComputedStyle(sub).fontWeight } : null,
          cardTitle: cardTitle ? { text: cardTitle.textContent.trim().slice(0, 30), size: window.getComputedStyle(cardTitle).fontSize, weight: window.getComputedStyle(cardTitle).fontWeight } : null,
          cardDesc: cardDesc ? { text: cardDesc.textContent.trim().slice(0, 30), size: window.getComputedStyle(cardDesc).fontSize, weight: window.getComputedStyle(cardDesc).fontWeight } : null
        };
      });
    });

    console.log('=== ' + pageInfo.name + ' ===');
    console.log(JSON.stringify(data, null, 2));
    await page.close();
  }

  await browser.close();
})();

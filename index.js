const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: [ '--start-fullscreen' ]
  });
  const hiddenPage = await browser.newPage();
  const page = await browser.newPage();
  page.setViewport({
    width: 1920,
    height: 1080,
  });
  while (true) {
    await hiddenPage.goto('https://c.xkcd.com/comic/random');
    const image = await hiddenPage.evaluate(() => document.querySelector('#comic > img').src);
    await page.goto(image);
    await page.waitFor(30000);
  }
  await browser.close();
})();

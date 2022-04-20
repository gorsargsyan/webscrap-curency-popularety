const puppeteer = require("puppeteer");
const fs = require("fs/promises");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.xe.com/popularity.php");

  const data = await page.evaluate(() => {
    const row = Array.from(
      document.querySelectorAll("#ranking_r2 > table > tbody > tr.pLine")
    );
    const val = row.map((trs) => {
      const tds = Array.from(trs.children);
      const curr = {};
      tds.map((td) => {
        curr[td.className] = td.textContent;
      });
      return curr;
    });

    return [...val];
  });
  await fs.writeFile("rate.json", JSON.stringify(data));
  await browser.close();
})();

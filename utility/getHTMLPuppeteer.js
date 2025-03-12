const playwright = require("playwright-aws-lambda");

async function scrapePage(url) {
  const browser = await playwright.launchChromium({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  const data = await page.evaluate(() => {
    return document.querySelector("body").innerText;
  });

  await browser.close();
  return data;
}

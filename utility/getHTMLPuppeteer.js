const playwright = require("playwright-aws-lambda");

async function getHTMLusingPlaywright(url) {
  const browser = await playwright.launchChromium({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url, { waitUntil: "networkidle" });

  // Get full HTML content, not just text
  const data = await page.content();

  await browser.close();
  return data;
}

module.exports = getHTMLusingPlaywright;

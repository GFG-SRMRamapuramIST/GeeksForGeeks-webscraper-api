const { chromium } = require("playwright");

const getHTMLusingPlaywright = async function (url) {
  const browser = await chromium.launch({
    headless: true, // Headless mode (no UI)
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });

  const html = await page.content();
  await browser.close();

  return html;
};

module.exports = getHTMLusingPlaywright;

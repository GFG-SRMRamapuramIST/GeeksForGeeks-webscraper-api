const puppeteer = require("puppeteer-core");

const getHTMLusingPuppeteer = async function (url) {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
  );

  await page.goto(url, { waitUntil: "domcontentloaded" });

  const html = await page.content();
  await browser.close();
  return html;
};

module.exports = getHTMLusingPuppeteer;

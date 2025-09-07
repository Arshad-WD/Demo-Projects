const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

(async () => {
    // tAke URL from command-line argument 
    const inputUrl = process.argv[2];
    if(!inputUrl){
        console.log("Please Provide a url. Example: node index.js https://github.com/");
        process.exit(1);
    }


  // Output folder
  const OUTPUT_DIR = path.join(__dirname, "ScrapedData");

  // Clear old folder if exists
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }

  // Recreate clean folder
  fs.mkdirSync(OUTPUT_DIR);
  fs.mkdirSync(path.join(OUTPUT_DIR, "Screenshots"));

  // Launch Browser
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to a page
  await page.goto(inputUrl, { waitUntil: "networkidle2"});

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Extract page title
  const title = await page.title();
  console.log("Page title:", title);

  // Take screenshot with timestamp
  const timestamp = Date.now();
  const screenshotPath = path.join(
    OUTPUT_DIR,
    "Screenshots",
    `${title}-${timestamp}.png`
  );
  await page.screenshot({ path: screenshotPath });
  console.log("Screenshot saved:", screenshotPath);

  // Scraping full HTML
  const html = await page.content();
  console.log("HTML length:", html.length);

  // Try to get headline (h1 / fallback h2)
  let headline = null;
  try {
    await page.waitForSelector("h1, h2", { timeout: 5000 });
    headline = await page.$eval("h1, h2", el => el.textContent.trim());
    console.log("Headline:", headline);
  } catch (err) {
    console.log("No headline (h1/h2) found.");
  }

  // Extract multiple <p> elements
  const items = await page.$$eval("p", els => els.map(e => e.textContent.trim()));
  console.log("Paragraphs found:", items.length);

  // Extract computed style of first h1 or h2
  try {
    const color = await page.$eval("h1, h2", el => getComputedStyle(el).color);
    console.log("Headline color:", color);
  } catch {
    console.log("No headline style found.");
  }

  // Extract external CSS files
  const stylesheets = await page.$$eval("link[rel='stylesheet']", els =>
    els.map(el => el.href)
  );
  console.log("CSS files:", stylesheets.length);

  // Extract external JS files
  const scripts = await page.$$eval("script[src]", els =>
    els.map(el => el.src)
  );
  console.log("JS files:", scripts.length);

  // Extract inline JS
  const inlineScripts = await page.$$eval("script:not([src])", els =>
    els.map(el => el.textContent.trim())
  );
  console.log("Inline scripts found:", inlineScripts.length);

  // Save results to files inside folder
  fs.writeFileSync(path.join(OUTPUT_DIR, "page.html"), html);
  fs.writeFileSync(path.join(OUTPUT_DIR, "css-links.txt"), stylesheets.join("\n"));
  fs.writeFileSync(path.join(OUTPUT_DIR, "js-links.txt"), scripts.join("\n"));

  await browser.close();
})();

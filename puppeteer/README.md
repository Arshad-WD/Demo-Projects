# ***🕸️ Puppeteer Web Scraper***

    This project is a dynamic Puppeteer-based web scraper that:
    Visits any URL you provide
    Takes a screenshot of the page

**Extracts and saves:**

    HTML content
    External CSS links
    External JavaScript links
    Inline JavaScript snippets

Stores all results in a clean folder (ScrapedData/) that resets on each run

# 🚀 Features

    Headless browser automation with Puppeteer

    Works with any URL (passed as input)

    Captures a screenshot with a timestamp

    Extracts main headline (h1 or h2) and paragraph texts

    Saves results in structured files for reuse

    Automatically clears old results before each run

# 📦 Installation

Clone the repo and install dependencies:

    $ git clone https://github.com/Arshad-WD/Demo-Projects/puppeteer.git
    $ cd puppeteer-web-scraper
    $ npm install

# ▶️ Usage
1. Run with Command-Line URL
node index.js https://github.com/

2. Interactive Input (Optional)

If you prefer the script to ask for the URL at runtime, use the interactive version instead:

node index-interactive.js

# 📂 Output Structure

After running, you’ll get a folder:

    ScrapedData/
    │── page.html          # full page HTML
    │── css-links.txt      # external CSS file URLs
    │── js-links.txt       # external JS file URLs
    │── Screenshots/
    │   └── <page-title>-<timestamp>.png


Each run wipes the old ScrapedData/ folder and generates a fresh one.

# ⚙️ Configurations

Viewport size: 1080x1024 (can be changed in code)

Wait strategy: networkidle2 ensures page fully loads before scraping

Screenshot mode: headless: false → shows browser (set to true for silent runs)

***🛠️ Example Output***

$ node index.js https://github.com/

    Page title: GitHub: Let’s build from here
    Screenshot saved: ScrapedData/Screenshots/GitHub-<timestamp>.png 
    HTML length: 203482
    Headline: Let’s build from here
    Paragraphs found: 14
    CSS files: 5
    JS files: 12
    Inline scripts found: 3

# 📌 Notes

Requires Node.js v18+

Works best on sites with static or semi-dynamic content.

For more advanced crawling (downloading actual CSS/JS files), the script can be extended.

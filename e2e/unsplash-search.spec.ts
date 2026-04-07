import { test } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const SEARCH_QUERIES = [
  "abstract pastel purple gradient",
  "abstract light lavender indigo",
  "soft violet blue gradient background",
];

const OUTPUT_DIR = path.resolve("pexels-results");

test("search pexels for light abstract wallpapers", async ({ page }) => {
  test.setTimeout(180_000);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (let qi = 0; qi < SEARCH_QUERIES.length; qi++) {
    const query = SEARCH_QUERIES[qi];
    const searchUrl = `https://www.pexels.com/search/${encodeURIComponent(query)}/?orientation=landscape`;

    console.log(`Searching Pexels: ${query}`);
    await page.goto(searchUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });

    // Wait for images to render
    await page.waitForTimeout(5000);

    // Screenshot the search results page
    const screenshotName = `search-${qi + 1}`;
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${screenshotName}.png`),
      fullPage: false,
    });

    // Extract photo info
    const photos = await page.evaluate(() => {
      const results: { src: string; alt: string; href: string }[] = [];
      const imgs = Array.from(document.querySelectorAll("img"));
      for (const img of imgs) {
        const src = img.src || img.getAttribute("data-src") || "";
        const alt = img.alt || "";
        const link = img.closest("a");
        const href = link?.href || "";
        if (src.includes("pexels.com") || src.includes("images.pexels")) {
          results.push({ src: src.substring(0, 200), alt: alt.substring(0, 100), href: href.substring(0, 200) });
        }
      }
      return results.slice(0, 12);
    });

    console.log(`Query "${query}": found ${photos.length} photos`);
    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${screenshotName}-photos.json`),
      JSON.stringify(photos, null, 2)
    );
  }
});

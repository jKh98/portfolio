import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public/assets/images/projects");

const VIEWPORT = { width: 1440, height: 900 };

const pages = [
  { name: "denworld-home", url: "https://denworldtravel.com" },
  {
    name: "denworld-flights",
    url: "https://denworldtravel.com/flights?tripType=round_trip&from=BEY&to=IST&depart=2026-05-15&return=2026-05-22&adults=1&children=0&infants=0&cabin=economy",
    waitExtra: 8000, // flights API may be slow
  },
  {
    name: "denworld-hotels",
    url: "https://denworldtravel.com/hotels?where=Istanbul&checkin=2026-05-15&checkout=2026-05-22&adults=2&rooms=1&radius_km=5",
    waitExtra: 8000,
  },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // retina-quality
  });

  for (const { name, url, waitExtra } of pages) {
    console.log(`Capturing ${name} → ${url}`);
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      // Give extra time for API calls / images / animations
      await page.waitForTimeout(waitExtra || 3000);
      const filePath = path.join(outDir, `${name}.png`);
      await page.screenshot({ path: filePath, type: "png" });
      console.log(`  ✓ Saved ${filePath}`);
    } catch (err) {
      console.error(`  ✗ Failed ${name}: ${err.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log("Done!");
}

main();

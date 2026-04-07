import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public/assets/images/projects");

const VIEWPORT = { width: 1440, height: 900 };

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });

  // --- Flight details: search, then click first result's "View" button ---
  {
    const name = "denworld-flight-details";
    console.log(`Capturing ${name}...`);
    const page = await context.newPage();
    try {
      await page.goto(
        "https://denworldtravel.com/flights?tripType=round_trip&from=BEY&to=IST&depart=2026-05-15&return=2026-05-22&adults=1&children=0&infants=0&cabin=economy",
        { waitUntil: "networkidle", timeout: 60000 }
      );
      await page.waitForTimeout(6000);
      // Click the first "View" button
      const viewBtn = page.locator('text="View"').first();
      await viewBtn.click();
      await page.waitForTimeout(6000);
      const filePath = path.join(outDir, `${name}.png`);
      await page.screenshot({ path: filePath, type: "png" });
      console.log(`  ✓ Saved ${filePath}`);
    } catch (err) {
      console.error(`  ✗ Failed ${name}: ${err.message}`);
    }
    await page.close();
  }

  // --- Hotel details: search, then click first "View rooms" button ---
  {
    const name = "denworld-hotel-details";
    console.log(`Capturing ${name}...`);
    const page = await context.newPage();
    try {
      await page.goto(
        "https://denworldtravel.com/hotels?where=Istanbul&checkin=2026-05-15&checkout=2026-05-22&adults=2&rooms=1&radius_km=5",
        { waitUntil: "networkidle", timeout: 60000 }
      );
      await page.waitForTimeout(6000);
      // Click the first "View rooms" button
      const viewRoomsBtn = page.locator('text="View rooms"').first();
      await viewRoomsBtn.click();
      await page.waitForTimeout(6000);
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

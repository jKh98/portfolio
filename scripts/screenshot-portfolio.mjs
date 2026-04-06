import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../public/assets/images/projects");

const BASE_URL = "http://localhost:5173";
const VIEWPORT = { width: 1440, height: 900 };

/**
 * Each combo sets theme, accent, wallpaper, and which apps to open.
 */
const combos = [
  {
    name: "portfolio-dark-terminal",
    theme: "dark",
    accentColor: "cyan",
    wallpaper: "abstract-dark-2",
    openApps: ["terminal"],
  },
  {
    name: "portfolio-light-profile",
    theme: "light",
    accentColor: "purple",
    wallpaper: "nature-light-2",
    openApps: ["profile"],
  },
  {
    name: "portfolio-dark-skills",
    theme: "dark",
    accentColor: "amber",
    wallpaper: "city-dark-1",
    openApps: ["skills"],
  },
  {
    name: "portfolio-light-settings",
    theme: "light",
    accentColor: "rose",
    wallpaper: "minimal-gradient-light",
    openApps: ["settings"],
  },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });

  for (const combo of combos) {
    console.log(
      `Capturing ${combo.name} (${combo.theme}, ${combo.accentColor}, ${combo.wallpaper}, apps: [${combo.openApps.join(", ")}])`,
    );
    const page = await context.newPage();

    try {
      // Load the page once to get access to storage on this origin
      await page.goto(BASE_URL, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // Set theme, preferences, and skip boot animation
      await page.evaluate((c) => {
        localStorage.setItem("theme", c.theme);

        const existingRaw = localStorage.getItem("portfolio-preferences");
        const existing = existingRaw ? JSON.parse(existingRaw) : {};
        existing.accentColor = c.accentColor;
        existing.wallpaper = c.wallpaper;
        existing.animationSpeed = "off";
        localStorage.setItem(
          "portfolio-preferences",
          JSON.stringify(existing),
        );

        sessionStorage.setItem("booted", "true");
      }, combo);

      // Reload to pick up the new localStorage values
      await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });

      // Wait for the desktop main content area to appear
      await page.waitForSelector("#main-content", {
        state: "visible",
        timeout: 15000,
      });

      // Give time for wallpaper images to load
      await page.waitForTimeout(3000);

      // Open each requested app by clicking its dock icon
      for (const appId of combo.openApps) {
        const dockBtn = page.locator(
          `button[data-dock-icon="${appId}"]`,
        );
        await dockBtn.click();
        // Wait for the window dialog to appear
        await page.waitForSelector(
          `div[role="dialog"][aria-labelledby="window-title-${appId}"]`,
          { state: "visible", timeout: 10000 },
        );
        // Let the window content render
        await page.waitForTimeout(1500);
      }

      // Final settle time
      await page.waitForTimeout(1000);

      const filePath = path.join(outDir, `${combo.name}.png`);
      await page.screenshot({ path: filePath, type: "png" });
      console.log(`  -> Saved ${filePath}`);
    } catch (err) {
      console.error(`  X Failed ${combo.name}: ${err.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log("Done!");
}

main();

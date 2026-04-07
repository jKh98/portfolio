import { test, expect } from "@playwright/test";

/**
 * Company branding visual-consistency validation.
 *
 * Checks two sections:
 * 1. Experience cards – company name text with consistent layout
 * 2. Education – generic school icon for institutions
 *
 * All logos have been removed to avoid trademark and copyright concerns.
 */

test.describe("Company Branding", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      sessionStorage.setItem("booted", "true");
    });
    await page.goto("/");
    // Wait for boot overlay to be gone
    await expect(
      page.locator(".fixed.inset-0.z-\\[9999\\]"),
    ).toHaveCount(0, { timeout: 5_000 });
  });

  /* ------------------------------------------------------------------ */
  /*  Experience cards                                                   */
  /* ------------------------------------------------------------------ */
  test.describe("Experience cards", () => {
    test("all company names render correctly", async ({ page }) => {
      await page.locator('button[data-dock-icon="experience"]').click();
      const win = page.locator(
        'div[role="dialog"][aria-labelledby="window-title-experience"]',
      );
      await expect(win).toBeVisible({ timeout: 10_000 });

      // Verify all six cards render
      const cards = win.locator("button[aria-expanded]");
      await expect(cards).toHaveCount(6, { timeout: 5_000 });

      // Verify company names
      for (const name of [
        "CME Offshore",
        "areeba sal",
        "TecFrac",
        "NAR Technologies",
      ]) {
        await expect(win.locator(`h3:has-text("${name}")`).first()).toBeVisible();
      }
    });
  });

  /* ------------------------------------------------------------------ */
  /*  Education section                                                  */
  /* ------------------------------------------------------------------ */
  test.describe("Education", () => {
    test("ASU and AUB entries render with school icons", async ({ page }) => {
      await page.locator('button[data-dock-icon="profile"]').click();
      const win = page.locator(
        'div[role="dialog"][aria-labelledby="window-title-profile"]',
      );
      await expect(win).toBeVisible({ timeout: 10_000 });

      // Scroll to Education
      const eduHeading = win.locator('h3:has-text("Education")');
      await eduHeading.scrollIntoViewIfNeeded();
      await expect(eduHeading).toBeVisible();

      // Both institution cards should be visible
      await expect(
        win.locator('a:has-text("Arizona State University")'),
      ).toBeVisible();
      await expect(
        win.locator('a:has-text("American University of Beirut")'),
      ).toBeVisible();

      // Icon containers should be 40x40 (w-10 h-10)
      const iconContainers = win.locator(
        'div[aria-hidden="true"].shrink-0.flex.items-center.justify-center',
      );
      const iconCount = await iconContainers.count();
      expect(iconCount).toBe(2);

      for (let i = 0; i < iconCount; i++) {
        const box = await iconContainers.nth(i).boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeCloseTo(40, 0);
        expect(box!.height).toBeCloseTo(40, 0);
      }
    });
  });
});

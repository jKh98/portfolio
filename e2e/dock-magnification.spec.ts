import { test, expect } from "@playwright/test";

/**
 * Dock magnification test.
 *
 * Strategy:
 * 1. Skip the boot sequence overlay by setting sessionStorage.
 * 2. Record each icon's resting size.
 * 3. Dispatch a mousemove at the center icon's position.
 * 4. Wait for the spring animation to settle.
 * 5. Assert that the hovered icon grew and neighbors grew proportionally.
 * 6. Reset mouseX and assert sizes return to resting.
 */

test.describe("Dock Magnification", () => {
  test.beforeEach(async ({ page }) => {
    // Skip the boot sequence by pre-setting sessionStorage
    await page.addInitScript(() => {
      sessionStorage.setItem("booted", "true");
    });
    await page.goto("/");
  });

  test("icons magnify on hover and shrink when mouse leaves", async ({
    page,
  }) => {
    const dock = page.locator('nav[aria-label="Application dock"]');
    await expect(dock).toBeVisible({ timeout: 10_000 });

    // Ensure the boot overlay is gone
    await expect(
      page.locator(".fixed.inset-0.z-\\[9999\\]")
    ).toHaveCount(0, { timeout: 5_000 });

    const icons = dock.locator("button[data-dock-icon]");
    const count = await icons.count();
    expect(count).toBeGreaterThanOrEqual(3);

    // Helper: get computed width of an icon
    async function getIconWidth(index: number): Promise<number> {
      const box = await icons.nth(index).boundingBox();
      expect(box).not.toBeNull();
      return box!.width;
    }

    // 1. Record resting sizes
    await page.waitForTimeout(300);
    const restingSizes: number[] = [];
    for (let i = 0; i < count; i++) {
      restingSizes.push(await getIconWidth(i));
    }
    const baseSize = restingSizes[0];
    for (const s of restingSizes) {
      expect(s).toBeCloseTo(baseSize, 0);
    }

    // 2. Pick a middle icon and dispatch mousemove on the nav
    const targetIndex = Math.floor(count / 2);
    const targetBox = await icons.nth(targetIndex).boundingBox();
    expect(targetBox).not.toBeNull();
    const targetCenterX = targetBox!.x + targetBox!.width / 2;
    const dockBox = await dock.boundingBox();
    const dockCenterY = dockBox!.y + dockBox!.height / 2;

    // Dispatch a real mousemove event on the nav element
    await page.evaluate(
      ({ x, y }) => {
        const nav = document.querySelector(
          'nav[aria-label="Application dock"]'
        );
        if (!nav) throw new Error("Dock nav not found");
        const event = new MouseEvent("mousemove", {
          clientX: x,
          clientY: y,
          bubbles: true,
        });
        nav.dispatchEvent(event);
      },
      { x: targetCenterX, y: dockCenterY }
    );

    // Wait for spring animation to settle
    await page.waitForTimeout(800);

    // 3. Assert the hovered icon is larger than resting
    const hoveredSize = await getIconWidth(targetIndex);
    expect(hoveredSize).toBeGreaterThan(baseSize + 5);

    // 4. Assert neighbor icons grew proportionally (less than hovered)
    if (targetIndex > 0) {
      const leftSize = await getIconWidth(targetIndex - 1);
      expect(leftSize).toBeGreaterThanOrEqual(baseSize);
      expect(leftSize).toBeLessThanOrEqual(hoveredSize);
    }
    if (targetIndex < count - 1) {
      const rightSize = await getIconWidth(targetIndex + 1);
      expect(rightSize).toBeGreaterThanOrEqual(baseSize);
      expect(rightSize).toBeLessThanOrEqual(hoveredSize);
    }

    // 5. Simulate the mouse leaving by dispatching a mousemove far away
    //    and then a mouseleave. Since we used dispatchEvent for the initial
    //    mousemove, we must also use dispatchEvent for consistency — React's
    //    onMouseLeave won't fire from page.mouse.move because the browser
    //    never tracked the pointer as "over" the nav element.
    await page.evaluate(() => {
      const nav = document.querySelector(
        'nav[aria-label="Application dock"]'
      );
      if (!nav) return;
      // First dispatch a mousemove far away to update mouseX
      nav.dispatchEvent(
        new MouseEvent("mousemove", { clientX: -9999, clientY: -9999, bubbles: true })
      );
      // Then dispatch mouseleave to trigger handleMouseLeave (sets mouseX to -1)
      nav.dispatchEvent(
        new MouseEvent("mouseleave", { bubbles: false })
      );
    });
    await page.waitForTimeout(1000);

    // 6. Assert all icons returned to resting size (within 3px tolerance
    //    for spring animation settle time)
    for (let i = 0; i < count; i++) {
      const size = await getIconWidth(i);
      expect(Math.abs(size - baseSize)).toBeLessThanOrEqual(3);
    }
  });
});

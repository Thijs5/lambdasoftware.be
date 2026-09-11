import { test, expect, type Page } from '@playwright/test';

// Whole-page visual regression: catches any rendering change caused by
// dependency upgrades, config changes, etc. that unit tests wouldn't see.
//
// prefers-reduced-motion is emulated because the page's own terminal
// type-in effect and blinking cursor are skipped entirely in that mode
// (see src/pages/index.astro) — without it, the screenshot would be racy
// against a JS-driven typing animation and an infinite CSS blink.
//
// First run for a given snapshot name/viewport: no baseline exists yet, so
// it creates e2e/homepage.spec.ts-snapshots/<name>-*.png and passes. Commit
// that file — it's the reference every future run compares against.
// Later runs: fail if more than 1% of pixels differ from the baseline.

/** Navigates to the homepage and returns any console/page errors seen. */
async function gotoHomepage(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  return errors;
}

test('homepage renders without visual regressions', async ({ page }) => {
  const consoleErrors = await gotoHomepage(page);

  await expect(page).toHaveScreenshot('homepage.png', {
    fullPage: true,
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });

  expect(consoleErrors, 'page logged console/JS errors').toEqual([]);
});

test.describe('mobile viewport', () => {
  // Narrower than both CSS breakpoints (34rem / 55rem) in index.astro so a
  // dependency bump that breaks the responsive layout shows up here even
  // when the desktop screenshot looks fine.
  test.use({ viewport: { width: 390, height: 844 } });

  test('homepage renders without visual regressions', async ({ page }) => {
    const consoleErrors = await gotoHomepage(page);

    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
      maxDiffPixelRatio: 0.01,
    });

    expect(consoleErrors, 'page logged console/JS errors').toEqual([]);
  });
});

const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000/';

test('navigation test', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto(baseUrl);
  // Click text=Fruits
  await Promise.all([
    page.locator('text=Fruits').click(),
    page.waitForNavigation({ url: `${baseUrl}fruits` }),
  ]);
  const fruitsList = await page.$$('[data-test-id^="fruits-page-fruit-"]');
  expect(fruitsList.length).toBe(5);
  const fruitLocator = page.locator('[data-test-id^="fruits-page-fruit-"]');
  await expect(fruitLocator).toHaveText(['papaya', 'apple', 'lemon', 'banana']);
  await expect(page.locator('[data-test-id="fruits-page-fruit-4"]')).toHaveText(
    'banana',
  );
  // Click text=banana
  await Promise.all([
    page.locator('text=banana').click(),
    page.waitForNavigation({ url: 'http://localhost:3000/fruits/4' }),
  ]);
  // Click text=add to diet
  await await page.locator('text=add to diet').click();
  // Click text "eat one"
  await page.locator('text=eat one').click();
  // Click button with text "eat one"
  await page.locator('button', { hasText: 'eat one' }).click();
});

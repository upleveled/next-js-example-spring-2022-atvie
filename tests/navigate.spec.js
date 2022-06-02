const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:3000/';

// test('test', async ({ page }) => {
//   await page.goto(baseUrl);
//   expect(page.url()).toBe(baseUrl);
//   const title = page.locator('h1');
//   await expect(title).toHaveText('Tierpark');
//   await page.locator('[data-test-id="header-about-link"]').click();
//   await page.click('text="Fruits"');
//   await expect(title).toHaveText('Fruits');
// });

test('navigation test', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto(baseUrl);
  // Click text=Fruits
  await Promise.all([
    page.locator('text=Fruits').click(),
    page.waitForNavigation({ url: `${baseUrl}fruits` }),
  ]);
  const fruitsList = await page.$$('[data-test-id^="fruits-page-fruit-"]');
  expect(fruitsList.length).toBe(4);
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
// PWDEBUG=1 yarn playwright test
// yarn playwright test --headed
// yarn playwright test --debug
// yarn playwright test
//

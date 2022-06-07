import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('navigation test', async ({ page }) => {
  await page.goto(baseUrl);
  const titleLocator = await page.locator('h1');
  await expect(titleLocator).toHaveText('Tierpark');

  await page.locator('text=Fruits').click();
  await expect(page).toHaveURL(`${baseUrl}fruits`);

  await expect(titleLocator).toHaveText('Fruits');

  // page.$$ finds all elements matching the specified selector within the page.
  const fruitsList = await page.$$('[data-test-id^="fruits-page-fruit-"]');
  await expect(fruitsList.length).toBe(5);
  const fruitsLocator = await page.locator(
    '[data-test-id^="fruits-page-fruit-"]',
  );
  await expect(fruitsLocator).toHaveText([
    'papaya',
    'apple',
    'lemon',
    'banana',
  ]);

  await page.locator('text=banana').click();
  await expect(page).toHaveURL(`${baseUrl}fruits/4`);

  await page.locator('text=add to diet').click();
  await page.locator('text=eat one').click();
  await page.locator('button', { hasText: 'eat one' }).click();
  await page.locator('button', { hasText: 'remove from diet' }).click();
});

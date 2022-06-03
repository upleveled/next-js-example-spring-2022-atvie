import { expect, test } from '@playwright/test';

const baseUrl = 'http://localhost:3000/';

test('navigation test', async ({ page }) => {
  await page.goto(baseUrl);
  const titleLocator = await page.locator('h1');
  await expect(titleLocator).toHaveText('Tierpark');

  await Promise.all([
    page.locator('text=Fruits').click(),
    page.waitForNavigation({ url: `${baseUrl}fruits` }),
  ]);

  await expect(titleLocator).toHaveText('Fruits');
  const fruitsList = await page.$$('[data-test-id^="fruits-page-fruit-"]');
  await expect(fruitsList.length).toBe(4);
  const fruitsLocator = await page.locator(
    '[data-test-id^="fruits-page-fruit-"]',
  );
  await expect(fruitsLocator).toHaveText([
    'papaya',
    'apple',
    'lemon',
    'banana',
  ]);

  await Promise.all([
    page.locator('text=banana').click(),
    page.waitForNavigation({ url: 'http://localhost:3000/fruits/4' }),
  ]);

  await Promise.all([
    page.locator('text=banana').click(),
    page.waitForNavigation({ url: `${baseUrl}fruits/4` }),
  ]);

  await page.locator('text=add to diet').click();
  await page.locator('text=eat one').click();
  await page.locator('button', { hasText: 'eat one' }).click();
  await page.locator('button', { hasText: 'remove from diet' }).click();
});

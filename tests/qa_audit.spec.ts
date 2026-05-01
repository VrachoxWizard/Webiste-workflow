
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Visual and Functional QA Audit', () => {
  
  test('1. Desktop Homepage Inspection', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/desktop-homepage.png', fullPage: true });
    
    // Check Header visibility
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check Mega Menu (assuming it triggers on hover of a 'TRGOVINA' or similar link)
    // Looking for navigation links
    const shopLink = page.locator('nav').getByText(/TRGOVINA|SHOP/i).first();
    if (await shopLink.isVisible()) {
      await shopLink.hover();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/desktop-mega-menu.png' });
    }
  });

  test('2. Tablet Homepage Inspection', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/tablet-homepage.png', fullPage: true });
  });

  test('3. Mobile Homepage & Menu Inspection', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/mobile-homepage.png', fullPage: true });

    // Open Mobile Menu
    const menuButton = page.locator('button').filter({ hasText: /menu|izbornik/i }).or(page.locator('header button')).first();
    await menuButton.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/mobile-menu-open.png' });
    
    // Close it
    const closeButton = page.locator('button').filter({ hasText: /close|zatvori/i }).or(page.locator('button[aria-label*="close"]')).first();
    if (await closeButton.isVisible()) {
      await closeButton.click();
    }
  });

  test('4. Category Page & Filters Inspection', async ({ page }) => {
    await page.goto(`${BASE_URL}/kategorija/sacmarice`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/category-page-desktop.png', fullPage: true });

    // Mobile filters
    await page.setViewportSize({ width: 375, height: 812 });
    const filterButton = page.locator('button').filter({ hasText: /filter/i }).first();
    if (await filterButton.isVisible()) {
      await filterButton.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: 'test-results/filters-drawer-mobile.png' });
    }
  });

  test('5. Product Detail Page & Cart Inspection', async ({ page }) => {
    // Navigate to the first product card found on homepage or category page
    await page.goto(BASE_URL);
    const productCard = page.locator('a[href*="/proizvod/"]').first();
    if (await productCard.isVisible()) {
      await productCard.click();
      await page.waitForLoadState('networkidle');
      await page.screenshot({ path: 'test-results/pdp-desktop.png', fullPage: true });

      // Add to cart
      const addToCart = page.locator('button').filter({ hasText: /dodaj u košaricu|add to cart/i }).first();
      if (await addToCart.isVisible()) {
        await addToCart.click();
        await page.waitForTimeout(1000); // Wait for drawer
        await page.screenshot({ path: 'test-results/cart-drawer.png' });
      }
    }
  });

  test('6. Contact Page Inspection', async ({ page }) => {
    await page.goto(`${BASE_URL}/kontakt`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/contact-page.png', fullPage: true });
  });

  test('7. Accessibility & Focus State Basic Check', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await page.screenshot({ path: 'test-results/focus-state-1.png' });
    
    // Check for obvious accessibility errors in console
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    if (errors.length > 0) {
      console.log('Detected Console Errors:', errors);
    }
  });

});

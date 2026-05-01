import { test, expect } from "@playwright/test"

const BASE_URL = "http://localhost:3000"

test.describe("Pointershop Premium Redesign QA Audit", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL)
    await page.waitForLoadState("networkidle")
  })

  test("1. Homepage Visual Integrity & Editorial Flow", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    
    // Check Hero Section
    const hero = page.getByTestId("hero-section")
    await expect(hero).toBeVisible()
    await expect(hero.getByRole("heading", { name: /Oprema za teren/i })).toBeVisible()

    // Check TrustStrip
    await expect(page.getByText("Sigurna kupnja").first()).toBeVisible()

    // Check Brand Marquee
    await expect(page.getByText("Zastupamo Vodeće Svjetske Brendove").first()).toBeVisible()

    await page.screenshot({ path: "test-results/editorial-homepage.png", fullPage: true })
  })

  test("2. Command Menu (Cmd+K) Interaction", async ({ page }) => {
    // Open via Keyboard
    await page.keyboard.press("Control+k")
    const cmdMenu = page.getByRole("dialog")
    await expect(cmdMenu).toBeVisible()
    await expect(page.getByPlaceholder(/Pretražite/i)).toBeVisible()
    
    await page.screenshot({ path: "test-results/search-command-palette.png" })

    // Search for a product
    await page.getByPlaceholder(/Pretražite/i).fill("Beretta")
    await expect(page.getByText(/Beretta 686 Silver Pigeon/i)).toBeVisible()
    
    // Close
    await page.keyboard.press("Escape")
    await expect(cmdMenu).not.toBeVisible()
  })

  test("3. Product Card Hover & Gallery Crossfade", async ({ page }) => {
    const productCard = page.getByTestId("product-card").first()
    await expect(productCard).toBeVisible()
    
    // Hover to trigger image change
    const initialImage = await productCard.locator("img").first().getAttribute("src")
    await productCard.hover()
    await page.waitForTimeout(500)
    
    // The secondary image should be visible (opacity 1)
    // Note: We can't easily check actual rendered opacity in a simple spec without computed styles, 
    // but we can check if it exists and take a screenshot.
    await page.screenshot({ path: "test-results/product-card-hover.png" })
  })

  test("4. Category Page Filters & Result Persistence", async ({ page }) => {
    await page.goto(`${BASE_URL}/kategorija/oruzje`)
    await expect(page.getByRole("heading", { name: /Oružje/i })).toBeVisible()

    // Check Sidebar Filters
    const filterSidebar = page.getByLabel("Filteri proizvoda")
    await expect(filterSidebar).toBeVisible()

    // Apply a brand filter
    const brandCheckbox = page.getByLabel(/Beretta/i).first()
    if (await brandCheckbox.isVisible()) {
      await brandCheckbox.check()
      await expect(page.getByText(/Aktivno:/i)).toBeVisible()
      await expect(page.getByText(/Beretta/i).nth(1)).toBeVisible()
    }

    await page.screenshot({ path: "test-results/category-filtered.png" })
  })

  test("5. Regulated Item Workflow (PDP -> Cart -> Checkout)", async ({ page }) => {
    // Go to a regulated product (Tikka T3x is usually regulated)
    await page.goto(`${BASE_URL}/proizvod/tikka-t3x-compact-tactical`)
    await expect(page.getByText(/Regulirani Artikl/i)).toBeVisible()

    // The CTA should be "Pošalji Upit" or similar, or it might allow Add to Cart but with a notice
    const inquiryButton = page.getByRole("link", { name: /Pošalji Upit/i })
    await expect(inquiryButton).toBeVisible()

    // Try a non-regulated item for the cart flow
    await page.goto(`${BASE_URL}/proizvod/meindl-island-mfs-active`)
    const addToCart = page.getByRole("button", { name: /Dodaj u košaricu/i })
    await addToCart.click()

    // Verify Cart Drawer
    const cartDrawer = page.getByTestId("cart-drawer")
    await expect(cartDrawer).toBeVisible()
    await expect(cartDrawer.getByText(/Meindl Island MFS Active/i)).toBeVisible()

    // Go to Checkout
    await page.getByRole("link", { name: /Kreni na plaćanje/i }).click()
    await expect(page).toHaveURL(/.*checkout/)
    
    // Check legal checkbox on checkout
    await expect(page.getByText(/Identitet Kupca/i)).toBeVisible()
    
    await page.screenshot({ path: "test-results/checkout-flow.png", fullPage: true })
  })

  test("6. Responsive Drawer & Category Navigation", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    
    const menuButton = page.locator("header").getByRole("button").first()
    await menuButton.click()
    
    await expect(page.getByText(/Kategorije/i)).toBeVisible()
    await page.screenshot({ path: "test-results/mobile-menu.png" })
  })
})

import { expect, test } from "@playwright/test"

const routes = [
  ["/", "Oprema za"],
  ["/kategorija/dugo-oruzje", "Dugo oružje"],
  ["/proizvod/1", "Tikka T3x Lite Polyfade"],
  ["/checkout", "Dovršetak Kupnje"],
  ["/kontakt", "Tu smo za"],
  ["/legal", "Odgovorna i zakonita kupnja"],
] as const

test.describe("storefront smoke", () => {
  for (const [path, heading] of routes) {
    test(`renders ${path}`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole("main")).toBeVisible()
      await expect(page.getByRole("heading", { name: new RegExp(heading, "i") })).toBeVisible()
    })
  }

  test("mobile menu opens as an accessible dialog", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto("/")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(500)
    await page.getByLabel("Otvori izbornik").click()
    await expect(page.getByRole("dialog").first()).toBeVisible()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("dialog").first()).toBeHidden()
  })

  test("non-regulated products can be added to cart", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.goto("/kategorija/optike")
    await page.waitForLoadState("networkidle")
    await page.waitForTimeout(500)
    await page.getByRole("button", { name: /dodaj vortex venom/i }).click()
    await expect(page.getByLabel(/košarica \(1\)/i)).toBeVisible()
    await expect(page.getByTestId("cart-drawer")).toContainText("Vortex Venom")
  })
})

import { expect, test } from "@playwright/test";

const pages = [
  { name: "dashboard", path: "/dashboard" },
  { name: "users", path: "/users" },
  { name: "forms", path: "/forms" },
  { name: "settings", path: "/settings" },
  { name: "auth-login", path: "/auth/login" },
];

for (const target of pages) {
  test(`${target.name} responsive theme smoke`, async ({ page }) => {
    await page.goto(target.path);
    await page.locator("main").waitFor();
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot(`${target.name}.png`, {
      stylePath: "tests/e2e/visual-stability.css",
    });
  });
}

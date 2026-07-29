import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/dashboard", "/users", "/forms", "/settings", "/auth/login"];

for (const route of routes) {
  test(`${route} has no detectable WCAG A/AA violations`, async ({ page }) => {
    await page.goto(route);
    await page.locator("main").waitFor();
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}

test("dashboard headings follow a sequential hierarchy", async ({ page }) => {
  await page.goto("/dashboard");
  await page.locator("main").waitFor();
  await page.waitForLoadState("networkidle");

  const results = await new AxeBuilder({ page })
    .withRules(["heading-order"])
    .analyze();

  expect(results.violations).toEqual([]);
});

import { expect, test } from "@playwright/test";

test("dashboard loads from the route handler API", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.locator("main")).toContainText("Revenue");
});

test("users CRUD flow persists within the demo server session", async ({
  page,
}, testInfo) => {
  const suffix = testInfo.project.name.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const originalName = `Release Smoke ${suffix}`;
  const updatedName = `${originalName} Updated`;
  const email = `release-smoke-${suffix}@example.com`;

  await page.goto("/users");
  await page.getByRole("button", { name: "Add user" }).click();
  await page.getByLabel("Name", { exact: true }).fill(originalName);
  await page.getByLabel("Email", { exact: true }).fill(email);
  await page.getByRole("button", { name: "Create user" }).click();

  const createdRow = page.getByRole("row").filter({ hasText: originalName });
  await expect(createdRow).toBeVisible();
  await createdRow.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Name", { exact: true }).fill(updatedName);
  await page.getByRole("button", { name: "Save changes" }).click();

  const updatedRow = page.getByRole("row").filter({ hasText: updatedName });
  await expect(updatedRow).toBeVisible();
  await updatedRow.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await expect(page.getByText(updatedName)).toHaveCount(0);
});

test("form validation prevents an incomplete submission", async ({ page }) => {
  await page.goto("/forms");
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByRole("alert").first()).toBeVisible();
  await expect(
    page.getByText("Name must be at least 2 characters", { exact: true }),
  ).toBeVisible();
});

test("locale and theme controls update the page shell", async ({ page }) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await page.getByRole("menuitemradio", { name: "Русский" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(
    page.getByRole("heading", { name: "Обзор панели" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Переключить тему" }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
});

test("demo auth validates and redirects without browser MSW", async ({ page }) => {
  await page.goto("/auth/login");
  await page.getByLabel("Email", { exact: true }).fill("demo@example.com");
  await page.getByLabel("Password", { exact: true }).fill("password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

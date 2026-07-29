import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test("dashboard loads from the route handler API", async ({ page }) => {
  await page.goto("/dashboard");

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.locator("main")).toContainText("Revenue");
});

test("users CRUD flow persists within the demo server session", async ({
  page,
  request,
}, testInfo) => {
  const suffix = testInfo.project.name.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const originalName = `Release Smoke ${suffix}`;
  const updatedName = `${originalName} Updated`;
  const email = `release-smoke-${suffix}@example.com`;

  const resetResponse = await request.post("/api/demo/reset");
  expect(resetResponse.ok()).toBe(true);

  await page.goto("/users");
  await page.getByRole("button", { name: "Add user" }).click();
  await page.getByLabel("Name", { exact: true }).fill(originalName);
  await page.getByLabel("Email", { exact: true }).fill(email);
  const createResponsePromise = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/users") &&
      response.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Create user" }).click();
  expect((await createResponsePromise).status()).toBe(201);

  const createdRow = page.getByRole("row").filter({ hasText: originalName });
  await expect(createdRow).toBeVisible();
  await createdRow.getByRole("button", { name: "Edit" }).click();
  await page.getByLabel("Name", { exact: true }).fill(updatedName);
  const updateResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/users/") &&
      response.request().method() === "PUT",
  );
  await page.getByRole("button", { name: "Save changes" }).click();
  expect((await updateResponsePromise).status()).toBe(200);

  const updatedRow = page.getByRole("row").filter({ hasText: updatedName });
  await expect(updatedRow).toBeVisible();
  await updatedRow.getByRole("button", { name: "Delete" }).click();
  const deleteResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/users/") &&
      response.request().method() === "DELETE",
  );
  await page.getByRole("button", { name: "Confirm" }).click();
  expect((await deleteResponsePromise).status()).toBe(200);
  await expect(page.getByText(updatedName)).toHaveCount(0);
});

test("form validation prevents an incomplete submission", async ({ page }) => {
  await page.goto("/forms");
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute(
    "autocomplete",
    "new-password",
  );
  await expect(
    page.getByLabel("Confirm Password", { exact: true }),
  ).toHaveAttribute("autocomplete", "new-password");
  await page.getByRole("button", { name: "Create Account" }).click();

  await expect(page.getByRole("alert").first()).toBeVisible();
  await expect(
    page.getByText("Name must be at least 2 characters", { exact: true }),
  ).toBeVisible();
});

test("locale and theme controls update the page shell", async ({
  page,
}, testInfo) => {
  await page.goto("/dashboard");
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await page.getByRole("menuitemradio", { name: "Русский" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(
    page.getByRole("heading", { name: "Обзор панели" }),
  ).toBeVisible();

  const initialColorScheme = testInfo.project.use.colorScheme ?? "light";
  const expectedColorScheme = initialColorScheme === "dark" ? "light" : "dark";

  await page.getByRole("button", { name: "Переключить тему" }).click();
  await expect(page.locator("html")).toHaveClass(
    new RegExp(expectedColorScheme),
  );
});

test("demo auth validates and redirects without browser MSW", async ({
  page,
}) => {
  await page.goto("/auth/login");
  await page.getByLabel("Email", { exact: true }).fill("demo@example.com");
  await page.getByLabel("Password", { exact: true }).fill("password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

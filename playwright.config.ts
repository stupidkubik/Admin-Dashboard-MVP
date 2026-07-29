import { defineConfig, type Project } from "@playwright/test";

const browsers = ["chromium", "webkit"] as const;
const viewports = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 390, height: 844 },
} as const;
const themes = ["light", "dark"] as const;

const projects: Project[] = browsers.flatMap((browserName) =>
  Object.entries(viewports).flatMap(([viewportName, viewport]) =>
    themes.map((colorScheme) => ({
      name: `${browserName}-${viewportName}-${colorScheme}`,
      use: {
        browserName,
        colorScheme,
        viewport,
      },
    })),
  ),
);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  timeout: 60_000,
  workers: 2,
  reporter: process.env.CI
    ? [["line"], ["html", { open: "never" }]]
    : [["list"], ["html", { open: "never" }]],
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    baseURL: "http://127.0.0.1:3100",
    locale: "en-US",
    contextOptions: {
      reducedMotion: "reduce",
    },
    trace: "retain-on-failure",
  },
  projects,
  webServer: {
    command:
      "NEXT_PUBLIC_API_MOCKING=disabled APP_MODE=demo npm run dev -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100/dashboard",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

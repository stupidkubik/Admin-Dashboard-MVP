import { DEFAULT_LOCALE, resolveLocale } from "../i18n";

describe("resolveLocale", () => {
  it("preserves a supported cookie locale", () => {
    expect(resolveLocale("ru")).toBe("ru");
  });

  it("falls back for missing or invalid cookie values", () => {
    expect(resolveLocale(undefined)).toBe(DEFAULT_LOCALE);
    expect(resolveLocale("de")).toBe(DEFAULT_LOCALE);
  });
});

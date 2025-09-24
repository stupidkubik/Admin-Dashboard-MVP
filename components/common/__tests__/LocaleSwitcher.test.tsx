import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocaleSwitcher from "../LocaleSwitcher";
import { LocaleProvider } from "@/contexts/LocaleProvider";

const STORAGE_KEY = "admin-dashboard-locale";

function clearStorage() {
  window.localStorage.clear();
  document.cookie.split(";").forEach((cookie) => {
    const [rawName] = cookie.split("=");
    const name = rawName?.trim();
    if (name) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
  document.documentElement.removeAttribute("lang");
}

describe("LocaleSwitcher", () => {
  beforeEach(() => {
    clearStorage();
  });

  it("displays the active locale code and updates when selecting a new locale", async () => {
    render(
      <LocaleProvider initialLocale="en">
        <LocaleSwitcher />
      </LocaleProvider>,
    );

    const toggle = screen.getByRole("button", { name: /en/i });
    expect(toggle).toBeInTheDocument();

    await userEvent.click(toggle);

    const spanishOption = screen.getByRole("menuitemradio", {
      name: "Español",
    });
    await userEvent.click(spanishOption);

    await waitFor(() =>
      expect(screen.getByRole("button", { name: /es/i })).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(window.localStorage.getItem(STORAGE_KEY)).toBe("es"),
    );
    expect(document.cookie).toContain("locale=es");
    expect(document.documentElement.getAttribute("lang")).toBe("es");
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument(),
    );
  });
});

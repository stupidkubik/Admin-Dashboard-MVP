import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LocaleProvider } from "@/contexts/LocaleProvider";
import AvatarMenu from "../AvatarMenu";

jest.mock("next/link", () => {
  const React = require("react") as typeof import("react");

  const MockLink = React.forwardRef<HTMLAnchorElement, any>(
    ({ children, onClick, ...props }, ref) => (
      <a
        {...props}
        ref={ref}
        onClick={(event) => {
          event.preventDefault();
          onClick?.(event);
        }}
      >
        {children}
      </a>
    ),
  );

  MockLink.displayName = "MockLink";

  return MockLink;
});

const renderWithProviders = () =>
  render(
    <LocaleProvider>
      <AvatarMenu />
    </LocaleProvider>,
  );

describe("AvatarMenu Component", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders avatar button initially", () => {
    renderWithProviders();

    const button = screen.getByRole("button", { name: "Toggle account menu" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("h-8", "w-8", "rounded-full");
  });

  it("shows dropdown menu when avatar is clicked", async () => {
    renderWithProviders();

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: "Toggle account menu" });
    await userEvent.click(button);

    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("hides dropdown menu when avatar is clicked again", async () => {
    renderWithProviders();

    const button = screen.getByRole("button", { name: "Toggle account menu" });
    await userEvent.click(button);
    await userEvent.click(button);

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("navigates to settings page and closes menu when Settings is clicked", async () => {
    renderWithProviders();

    await userEvent.click(
      screen.getByRole("button", { name: "Toggle account menu" }),
    );

    const settingsLink = screen.getByText("Settings");
    expect(settingsLink).toHaveAttribute("href", "/settings");

    await userEvent.click(settingsLink);

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("shows alert and closes menu when Logout is clicked", async () => {
    const alertSpy = jest.spyOn(window, "alert");
    renderWithProviders();

    await userEvent.click(
      screen.getByRole("button", { name: "Toggle account menu" }),
    );
    await userEvent.click(screen.getByText("Logout"));

    expect(alertSpy).toHaveBeenCalledWith("Logout");
    expect(screen.queryByText("Logout")).not.toBeInTheDocument();
  });

  it("applies correct hover styles to menu items", async () => {
    renderWithProviders();

    await userEvent.click(
      screen.getByRole("button", { name: "Toggle account menu" }),
    );

    const settingsLink = screen.getByText("Settings");
    const logoutButton = screen.getByText("Logout");

    expect(settingsLink).toHaveClass(
      "hover:bg-gray-100",
      "dark:hover:bg-gray-700",
    );
    expect(logoutButton).toHaveClass(
      "hover:bg-gray-100",
      "dark:hover:bg-gray-700",
    );
  });
});

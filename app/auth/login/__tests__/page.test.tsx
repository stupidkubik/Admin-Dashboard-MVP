import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../page";
import { fetcher, FetchError } from "../../../../lib/fetcher";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

jest.mock("../../../../lib/fetcher", () => {
  const actual = jest.requireActual("../../../../lib/fetcher");
  return {
    ...actual,
    fetcher: jest.fn(),
  };
});

const mockedFetcher = fetcher as jest.MockedFunction<typeof fetcher>;

describe("LoginPage", () => {
  beforeEach(() => {
    push.mockReset();
    mockedFetcher.mockReset();
  });

  it("uses the auth contract before navigating to the dashboard", async () => {
    mockedFetcher.mockResolvedValue({
      data: {
        user: { id: "demo-user", email: "demo@example.com" },
        demo: true,
      },
    });
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("Email"), "demo@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(mockedFetcher).toHaveBeenCalledWith("auth", {
      method: "POST",
      body: JSON.stringify({
        email: "demo@example.com",
        password: "secret",
      }),
    });
    expect(push).toHaveBeenCalledWith("/dashboard");
  });

  it("keeps the user on the form when real mode is unavailable", async () => {
    mockedFetcher.mockRejectedValue(
      new FetchError(503, "Unavailable", {
        error: {
          code: "REAL_MODE_NOT_CONFIGURED",
          message: "Real mode is not configured",
        },
      }),
    );
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("Email"), "demo@example.com");
    await user.type(screen.getByPlaceholderText("Password"), "secret");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Real mode is not configured",
    );
    expect(push).not.toHaveBeenCalled();
  });
});

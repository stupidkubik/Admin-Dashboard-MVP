import { render, screen } from "@testing-library/react";
import ConnectedAccounts, { type ConnectedAccount } from "../ConnectedAccounts";

describe("ConnectedAccounts", () => {
  const accounts: ConnectedAccount[] = [
    { id: "google", name: "Google", connected: true },
    { id: "github", name: "GitHub", connected: false },
  ];

  it("renders account cards and appropriate action labels", () => {
    render(<ConnectedAccounts accounts={accounts} />);

    expect(screen.getByText("Google")).toBeInTheDocument();
    expect(screen.getByText("Connected")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Disconnect" }),
    ).toBeInTheDocument();

    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("Not connected")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Connect" })).toBeInTheDocument();
  });
});

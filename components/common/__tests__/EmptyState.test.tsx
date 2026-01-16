import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import EmptyState from "../EmptyState";
import { LocaleProvider } from "@/contexts/LocaleProvider";

const renderWithProvider = (ui: ReactElement) =>
  render(<LocaleProvider>{ui}</LocaleProvider>);

describe("EmptyState", () => {
  it("renders default title and message", () => {
    renderWithProvider(<EmptyState />);

    expect(screen.getByText("No results")).toBeInTheDocument();
    expect(screen.getByText("No records found")).toBeInTheDocument();
  });

  it("renders custom title and message", () => {
    renderWithProvider(
      <EmptyState title="Nothing here yet" message="Add your first record." />,
    );

    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
    expect(screen.getByText("Add your first record.")).toBeInTheDocument();
  });
});

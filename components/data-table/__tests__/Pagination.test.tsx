import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ColumnDef } from "@tanstack/react-table";
import { ReactElement } from "react";
import Pagination from "../Pagination";
import { useConfiguredTable } from "../useConfiguredTable";
import { LocaleProvider } from "@/contexts/LocaleProvider";

type Person = { id: number; name: string };

const columns: ColumnDef<Person>[] = [{ header: "Name", accessorKey: "name" }];

const data: Person[] = Array.from({ length: 12 }, (_, index) => ({
  id: index + 1,
  name: `Person ${index + 1}`,
}));

const renderWithProvider = (ui: ReactElement) =>
  render(<LocaleProvider>{ui}</LocaleProvider>);

function PaginationHarness() {
  const { table } = useConfiguredTable<Person>({
    columns,
    data,
    initialPageSize: 5,
  });

  return <Pagination table={table} pageSizeOptions={[5, 10]} />;
}

describe("Pagination", () => {
  it("renders page label and navigates pages", async () => {
    renderWithProvider(<PaginationHarness />);

    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();

    const prevButton = screen.getByRole("button", { name: "Prev" });
    const nextButton = screen.getByRole("button", { name: "Next" });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    await userEvent.click(nextButton);

    expect(screen.getByText("Page 2 of 3")).toBeInTheDocument();
    expect(prevButton).not.toBeDisabled();

    await userEvent.click(prevButton);

    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
  });

  it("updates page count when page size changes", async () => {
    renderWithProvider(<PaginationHarness />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "10");

    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });
});

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "../DataTable";
import { LocaleProvider } from "@/contexts/LocaleProvider";

type Person = { id: number; name: string; email: string };

const columns: ColumnDef<Person>[] = [
  { header: "Name", accessorKey: "name" },
  { header: "Email", accessorKey: "email" },
];

const people: Person[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" },
];

describe("DataTable", () => {
  it("filters results by the search input", async () => {
    render(
      <LocaleProvider>
        <DataTable<Person>
          columns={columns}
          data={people}
          searchKey="name"
          initialPageSize={5}
        />
      </LocaleProvider>,
    );

    const table = screen.getByRole("table");
    expect(within(table).getByText("Alice")).toBeInTheDocument();
    expect(within(table).getByText("Bob")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search name...");
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, "Bob");

    expect(within(table).queryByText("Alice")).not.toBeInTheDocument();
    expect(within(table).getByText("Bob")).toBeInTheDocument();
  });

  it("allows toggling column visibility from the menu", async () => {
    render(
      <LocaleProvider>
        <DataTable<Person> columns={columns} data={people} searchKey="name" />
      </LocaleProvider>,
    );

    const table = screen.getByRole("table");
    expect(within(table).getByText("Email")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /columns/i }));

    const checkboxes = screen.getAllByRole("checkbox");
    const emailCheckbox = checkboxes[1];
    expect(emailCheckbox).toBeChecked();
    await userEvent.click(emailCheckbox);

    expect(within(table).queryByText("Email")).not.toBeInTheDocument();
  });
});

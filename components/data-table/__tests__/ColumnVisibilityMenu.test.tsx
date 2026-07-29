import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import type { Column, Table } from "@tanstack/react-table";
import ColumnVisibilityMenu from "../ColumnVisibilityMenu";
import { LocaleProvider } from "@/contexts/LocaleProvider";

const renderWithProvider = (ui: ReactElement) =>
  render(<LocaleProvider>{ui}</LocaleProvider>);

type ColumnStub = Pick<
  Column<unknown, unknown>,
  "id" | "columnDef" | "getIsVisible" | "toggleVisibility" | "getCanHide"
>;

const createColumn = (overrides: Partial<ColumnStub> = {}): ColumnStub => ({
  id: "name",
  columnDef: { header: "Name" },
  getIsVisible: jest.fn(() => true),
  toggleVisibility: jest.fn(),
  getCanHide: jest.fn(() => true),
  ...overrides,
});

const createTable = (columns: ColumnStub[]) =>
  ({
    getAllLeafColumns: () => columns,
  }) as unknown as Table<unknown>;

describe("ColumnVisibilityMenu", () => {
  it("returns null when there are no columns", () => {
    const table = createTable([]);
    const { container } = renderWithProvider(
      <ColumnVisibilityMenu table={table} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders default label and toggles column visibility", async () => {
    const column = createColumn();
    const table = createTable([column]);

    renderWithProvider(<ColumnVisibilityMenu table={table} />);

    await userEvent.click(screen.getByRole("button", { name: "Columns" }));

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);

    expect(column.toggleVisibility).toHaveBeenCalledWith(false);
  });

  it("skips columns that cannot be hidden", async () => {
    const visibleColumn = createColumn({ id: "name" });
    const lockedColumn = createColumn({
      id: "email",
      columnDef: { header: "Email" },
      getCanHide: jest.fn(() => false),
    });
    const table = createTable([visibleColumn, lockedColumn]);

    renderWithProvider(<ColumnVisibilityMenu table={table} />);

    await userEvent.click(screen.getByRole("button", { name: "Columns" }));

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.queryByText("Email")).not.toBeInTheDocument();
  });
});

"use client";

import { Table } from "@tanstack/react-table";
import { DropdownMenu } from "@/components/ui/DropdownMenu";
import { Checkbox } from "@/components/ui/Checkbox";
import { useLocale } from "@/contexts/LocaleProvider";

type ColumnVisibilityMenuProps<TData> = {
  table: Table<TData>;
  label?: string;
};

export default function ColumnVisibilityMenu<TData>({
  table,
  label,
}: ColumnVisibilityMenuProps<TData>) {
  const { t } = useLocale();
  const columns = table.getAllLeafColumns();
  const buttonLabel = label ?? t("common.table.columns", "Columns");

  if (!columns.length) {
    return null;
  }

  return (
    <DropdownMenu
      trigger={
        <button type="button" className="btn btn-outline text-sm">
          {buttonLabel}
        </button>
      }
    >
      <div className="max-h-64 overflow-y-auto p-2 text-sm">
        {columns.map((column) => {
          if (column.getCanHide?.() === false) {
            return null;
          }

          return (
            <label
              key={column.id}
              className="flex items-center gap-2 rounded px-2 py-1 hover:bg-accent/40"
            >
              <Checkbox
                checked={column.getIsVisible()}
                onChange={(event) =>
                  column.toggleVisibility(event.target.checked)
                }
              />
              <span>{String(column.columnDef.header ?? column.id)}</span>
            </label>
          );
        })}
      </div>
    </DropdownMenu>
  );
}

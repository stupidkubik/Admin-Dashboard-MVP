"use client";

import { Table, flexRender } from "@tanstack/react-table";
import EmptyState from "@/components/common/EmptyState";
import { useLocale } from "@/contexts/LocaleProvider";

type DataTableBodyProps<TData> = {
  table: Table<TData>;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
};

export default function DataTableBody<TData>({
  table,
  emptyStateTitle,
  emptyStateMessage,
}: DataTableBodyProps<TData>) {
  const rowModel = table.getRowModel();
  const hasRows = rowModel.rows.length > 0;
  const colSpan = table.getVisibleLeafColumns().length || 1;
  const { t } = useLocale();
  const resolvedEmptyStateTitle =
    emptyStateTitle ?? t("common.empty.title", "No results");
  const resolvedEmptyStateMessage =
    emptyStateMessage ??
    t("common.table.emptyMessage", "Adjust filters or add new records.");

  return (
    <div
      className="w-full overflow-x-auto rounded-lg border border-border/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      tabIndex={0}
      role="region"
      aria-label={t("common.table.scrollRegion", "Scrollable data table")}
    >
      <table className="w-full min-w-[48rem] table-fixed text-sm">
        <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorting = header.column.getIsSorted();
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="select-none px-3 py-2 text-left font-medium transition-colors whitespace-normal break-words hover:bg-muted/80"
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {sorting === "asc" && <span aria-hidden>▲</span>}
                      {sorting === "desc" && <span aria-hidden>▼</span>}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {hasRows ? (
            rowModel.rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border/40 last:border-b-0 hover:bg-muted/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-2 align-middle whitespace-normal break-words"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colSpan} className="px-6 py-10 text-center">
                <EmptyState
                  title={resolvedEmptyStateTitle}
                  message={resolvedEmptyStateMessage}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

'use client'

import { Table, flexRender } from '@tanstack/react-table'
import EmptyState from '@/components/common/EmptyState'

type DataTableBodyProps<TData> = {
  table: Table<TData>
  emptyStateTitle?: string
  emptyStateMessage?: string
}

export default function DataTableBody<TData>({
  table,
  emptyStateTitle = 'No results',
  emptyStateMessage = 'Adjust filters or add new records.',
}: DataTableBodyProps<TData>) {
  const rowModel = table.getRowModel()
  const hasRows = rowModel.rows.length > 0
  const colSpan = table.getVisibleLeafColumns().length || 1

  return (
    <div className="overflow-x-auto rounded-lg border border-border/50">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const sorting = header.column.getIsSorted()
                return (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="select-none px-3 py-2 text-left font-medium transition-colors hover:bg-muted/80"
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {sorting === 'asc' && <span aria-hidden>▲</span>}
                      {sorting === 'desc' && <span aria-hidden>▼</span>}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {hasRows ? (
            rowModel.rows.map((row) => (
              <tr key={row.id} className="border-b border-border/40 last:border-b-0 hover:bg-muted/40">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={colSpan} className="px-6 py-10 text-center">
                <EmptyState title={emptyStateTitle} message={emptyStateMessage} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

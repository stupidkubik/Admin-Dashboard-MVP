'use client'
import { Table } from '@tanstack/react-table'

export default function Pagination<T>({ table }: { table: Table<T> }) {
  return (
    <div className="mt-4 flex items-center gap-2">
      <button
        className="rounded border px-2 py-1"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Prev
      </button>
      <span>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <button
        className="rounded border px-2 py-1"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </button>
    </div>
  )
}

'use client'
import { useMemo, useState } from 'react'
import {
  ColumnDef,
  FilterFn,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Input } from '../ui/Input'
import Pagination from './Pagination'
import { DropdownMenu } from '../ui/DropdownMenu'
import { Checkbox } from '../ui/Checkbox'
import EmptyState from '@/components/common/EmptyState'

type DataTableProps<TData> = {
  columns: ColumnDef<TData, any>[]
  data: TData[]
  searchKey?: string
  searchKeys?: string[]
  initialPageSize?: number
  pageSizeOptions?: number[]
}

export default function DataTable<TData>({
  columns,
  data,
  searchKey,
  searchKeys,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<TData>) {
  const [filter, setFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const effectiveSearchKeys = useMemo(() => {
    if (searchKeys && searchKeys.length > 0) {
      return searchKeys
    }
    if (searchKey) {
      return [searchKey]
    }
    return undefined
  }, [searchKeys, searchKey])

  const searchPlaceholder = useMemo(() => {
    if (!effectiveSearchKeys || effectiveSearchKeys.length === 0) {
      return 'Search...'
    }
    if (effectiveSearchKeys.length === 1) {
      return `Search ${effectiveSearchKeys[0]}...`
    }
    return `Search ${effectiveSearchKeys.join(' / ')}...`
  }, [effectiveSearchKeys])

  const globalFilterFn: FilterFn<TData> = useMemo(() => {
    return (row, _columnId, value) => {
      if (!value) return true
      if (!effectiveSearchKeys || effectiveSearchKeys.length === 0) {
        return String(row.original ?? '')
          .toLowerCase()
          .includes(String(value).toLowerCase())
      }
      const searchValue = String(value).toLowerCase()
      return effectiveSearchKeys.some((key) => {
        const cellValue = (row.original as Record<string, unknown>)[key]
        if (cellValue == null) return false
        return String(cellValue).toLowerCase().includes(searchValue)
      })
    }
  }, [effectiveSearchKeys])

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter: filter,
      columnVisibility,
    },
    initialState: {
      pagination: { pageSize: initialPageSize },
    },
    onGlobalFilterChange: setFilter,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const hasToolbar = Boolean(effectiveSearchKeys) || table.getAllLeafColumns().length > 1
  const filteredRowCount = table.getFilteredRowModel().rows.length
  const totalRowCount = table.getPreFilteredRowModel().rows.length

  return (
    <div className="space-y-3">
      {hasToolbar && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {effectiveSearchKeys ? (
            <div className="w-full sm:w-64">
              <Input
                placeholder={searchPlaceholder}
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          ) : (
            <span />
          )}
          <DropdownMenu
            trigger={
              <button className="btn btn-outline text-sm">
                Columns
              </button>
            }
          >
            <div className="max-h-64 overflow-y-auto p-2 text-sm">
              {table.getAllLeafColumns().map((column) => {
                if (column.getCanHide?.() === false) {
                  return null
                }
                return (
                  <label key={column.id} className="flex items-center gap-2 rounded px-2 py-1 hover:bg-accent/40">
                    <Checkbox
                      checked={column.getIsVisible()}
                      onChange={(event) => column.toggleVisibility(event.target.checked)}
                    />
                    <span>{String(column.columnDef.header ?? column.id)}</span>
                  </label>
                )
              })}
            </div>
          </DropdownMenu>
        </div>
      )}
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
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
                <td colSpan={table.getVisibleLeafColumns().length || 1} className="px-6 py-10 text-center">
                  <EmptyState title="No results" message="Adjust filters or add new records." />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          Showing
          {' '}
          {filteredRowCount ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1 : 0}
          {' '}
          -
          {' '}
          {filteredRowCount
            ? Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                filteredRowCount,
              )
            : 0}
          {' '}
          of {totalRowCount} entries
        </p>
        <Pagination table={table} pageSizeOptions={pageSizeOptions} />
      </div>
    </div>
  )
}

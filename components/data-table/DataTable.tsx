'use client'

import { ColumnDef } from '@tanstack/react-table'
import Pagination from './Pagination'
import DataTableToolbar from './DataTableToolbar'
import DataTableBody from './DataTableBody'
import { useConfiguredTable } from './useConfiguredTable'
import { useLocale } from '@/contexts/LocaleProvider'

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
  const {
    table,
    filter,
    onFilterChange,
    effectiveSearchKeys,
    searchPlaceholder,
    hasToolbar,
    filteredRowCount,
    totalRowCount,
  } = useConfiguredTable({
    columns,
    data,
    searchKey,
    searchKeys,
    initialPageSize,
  })
  const { locale, t } = useLocale()

  const showSearch = Boolean(effectiveSearchKeys && effectiveSearchKeys.length > 0)

  return (
    <div className="space-y-3">
      {hasToolbar && (
        <DataTableToolbar
          table={table}
          filter={filter}
          onFilterChange={onFilterChange}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
        />
      )}
      <DataTableBody table={table} />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {t('common.table.summary', 'Showing {{from}} – {{to}} of {{total}} entries')
            .replace(
              '{{from}}',
              (filteredRowCount
                ? table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1
                : 0
              ).toLocaleString(locale)
            )
            .replace(
              '{{to}}',
              (filteredRowCount
                ? Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    filteredRowCount,
                  )
                : 0
              ).toLocaleString(locale)
            )
            .replace('{{total}}', totalRowCount.toLocaleString(locale))}
        </p>
        <Pagination table={table} pageSizeOptions={pageSizeOptions} />
      </div>
    </div>
  )
}

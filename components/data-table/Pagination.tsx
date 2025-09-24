'use client'
import { Table } from '@tanstack/react-table'
import { useLocale } from '@/contexts/LocaleProvider'

type PaginationProps<T> = {
  table: Table<T>
  pageSizeOptions?: number[]
}

export default function Pagination<T>({ table, pageSizeOptions = [5, 10, 20, 50] }: PaginationProps<T>) {
  const { locale, t } = useLocale()
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = Math.max(table.getPageCount(), 1)
  const pageLabel = t('common.table.page', 'Page {{current}} of {{total}}')
    .replace('{{current}}', currentPage.toLocaleString(locale))
    .replace('{{total}}', totalPages.toLocaleString(locale))
  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{t('common.table.rowsPerPage', 'Rows per page')}</span>
        <select
          className="rounded border border-border/60 bg-transparent px-2 py-1"
          value={table.getState().pagination.pageSize}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size.toLocaleString(locale)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-2 sm:ml-auto">
        <button
          className="rounded border border-border/60 px-2 py-1 text-xs disabled:opacity-40"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {t('common.table.prev', 'Prev')}
        </button>
        <span className="text-xs text-muted-foreground">
          {pageLabel}
        </span>
        <button
          className="rounded border border-border/60 px-2 py-1 text-xs disabled:opacity-40"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {t('common.table.next', 'Next')}
        </button>
      </div>
    </div>
  )
}

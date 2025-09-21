import { renderHook, act } from '@testing-library/react'
import type { ColumnDef } from '@tanstack/react-table'
import { useConfiguredTable } from '../useConfiguredTable'

type Person = { id: number; name: string; email: string }

const columns: ColumnDef<Person>[] = [
  { header: 'Name', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
]

const data: Person[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
]

describe('useConfiguredTable', () => {
  it('derives search helpers and filters rows', () => {
    const { result } = renderHook(() =>
      useConfiguredTable<Person>({
        columns,
        data,
        searchKeys: ['name', 'email'],
        initialPageSize: 5,
      })
    )

    expect(result.current.hasToolbar).toBe(true)
    expect(result.current.searchPlaceholder).toBe('Search name / email...')
    expect(result.current.filteredRowCount).toBe(3)
    expect(result.current.totalRowCount).toBe(3)

    act(() => {
      result.current.onFilterChange('bob')
    })

    expect(result.current.filter).toBe('bob')
    expect(result.current.filteredRowCount).toBe(1)
    expect(result.current.table.getRowModel().rows[0].original?.name).toBe('Bob')
  })

  it('disables toolbar when no searchable columns are provided', () => {
    const singleColumn: ColumnDef<Person>[] = [{ header: 'Name', accessorKey: 'name' }]

    const { result } = renderHook(() =>
      useConfiguredTable<Person>({
        columns: singleColumn,
        data,
      })
    )

    expect(result.current.hasToolbar).toBe(false)
    expect(result.current.searchPlaceholder).toBe('Search...')
  })
})

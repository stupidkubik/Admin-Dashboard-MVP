'use client'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import DataTable from '@/components/data-table/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import { User } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import ConfirmModal from '@/components/common/ConfirmModal'
import EmptyState from '@/components/common/EmptyState'

export default function UsersPage() {
  const { data, mutate } = useSWR<User[]>('/api/users', fetcher)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const columns: ColumnDef<User>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
    { header: 'Active', accessorKey: 'active', cell: ({ row }) => (row.original.active ? 'Yes' : 'No') },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button type="button" onClick={() => alert('Edit ' + row.original.id)} className="px-2 py-1">
            Edit
          </Button>
          <Button
            type="button"
            onClick={() => setDeleteId(row.original.id)}
            className="bg-red-600 px-2 py-1"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const handleDelete = () => {
    if (data && deleteId) {
      mutate(data.filter((u) => u.id !== deleteId), false)
    }
    setDeleteId(null)
  }

  if (!data) return <EmptyState />

  return (
    <div>
      <DataTable columns={columns} data={data} searchKey="name" />
      <ConfirmModal
        open={!!deleteId}
        title="Delete user?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

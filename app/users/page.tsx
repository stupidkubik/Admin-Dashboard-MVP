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
import PageLayout from '@/components/layout/PageLayout'
import { TableSkeleton } from '@/components/loading/Skeletons'

export default function UsersPage() {
  const { data, mutate, isLoading, error } = useSWR<User[]>('/api/users', fetcher)
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

  if (isLoading) {
    return (
      <PageLayout
        title="Users"
        description="Manage your team members and their access levels."
      >
        <div className="section-container">
          <TableSkeleton columns={columns.length} rows={6} />
        </div>
      </PageLayout>
    )
  }

  if (error) {
    return (
      <PageLayout
        title="Users"
        description="Manage your team members and their access levels."
      >
        <div className="section-container">
          <EmptyState title="Failed to load users" message="Please try again later." />
        </div>
      </PageLayout>
    )
  }

  const hasUsers = (data?.length ?? 0) > 0
  const tableData = data ?? []

  return (
    <>
      <PageLayout
        title="Users"
        description="Manage your team members and their access levels."
      >
        <div className="section-container">
          {hasUsers ? (
            <DataTable
              columns={columns}
              data={tableData}
              searchKeys={['name', 'email']}
              initialPageSize={10}
            />
          ) : (
            <EmptyState title="No users yet" message="Invite your colleagues to get started." />
          )}
        </div>
      </PageLayout>
      <ConfirmModal
        open={!!deleteId}
        title="Delete user?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  )
}

"use client"
import DataTable from '@/components/data-table/DataTable'
import EmptyState from '@/components/common/EmptyState'
import { RECENT_USERS_COLUMNS } from '@/components/dashboard/columns'
import { User } from '@/lib/types'

type RecentUsersTableProps = {
  users?: User[]
  onViewAll?: () => void
}

export default function RecentUsersTable({ users, onViewAll }: RecentUsersTableProps) {
  const hasUsers = (users?.length ?? 0) > 0
  const tableData = hasUsers ? (users ?? []).slice(0, 5) : []

  return (
    <div className="section-container">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="heading-4">Recent Users</h3>
        <button type="button" className="btn-outline" onClick={onViewAll}>
          View All
        </button>
      </div>
      <div className="table-container">
        {hasUsers ? (
          <DataTable
            columns={RECENT_USERS_COLUMNS}
            data={tableData}
            searchKeys={['name', 'email']}
            initialPageSize={5}
          />
        ) : (
          <EmptyState message="No users found" />
        )}
      </div>
    </div>
  )
}

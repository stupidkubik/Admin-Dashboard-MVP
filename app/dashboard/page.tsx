'use client'
import useSWR from 'swr'
import LineChart from '@/components/charts/LineChart'
import { fetcher } from '@/lib/fetcher'
import { DashboardStats, User } from '@/lib/types'
import DataTable from '@/components/data-table/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import EmptyState from '@/components/common/EmptyState'

export default function DashboardPage() {
  const { data: stats } = useSWR<DashboardStats>('/api/stats', fetcher)
  const { data: users } = useSWR<User[]>('/api/users', fetcher)

  const columns: ColumnDef<User>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
  ]

  return (
    <div className="space-y-6">
      {stats ? (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded bg-white p-4 shadow dark:bg-gray-800">
            <p className="text-sm text-gray-500">Users</p>
            <p className="text-2xl font-semibold">{stats.users}</p>
          </div>
          <div className="rounded bg-white p-4 shadow dark:bg-gray-800">
            <p className="text-sm text-gray-500">Revenue</p>
            <p className="text-2xl font-semibold">${stats.revenue}</p>
          </div>
          <div className="rounded bg-white p-4 shadow dark:bg-gray-800">
            <p className="text-sm text-gray-500">Growth</p>
            <p className="text-2xl font-semibold">{stats.growthPct}%</p>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}

      {stats && <LineChart data={stats.series} />}

      <div>
        <h2 className="mb-2 text-lg font-semibold">Recent Users</h2>
        {users ? <DataTable columns={columns} data={users.slice(0, 5)} /> : <EmptyState />}
      </div>
    </div>
  )
}

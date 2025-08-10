'use client'
import { DashboardStats, User } from '@/lib/types'
import { useData } from '@/lib/hooks/useData'
import type { ColumnDef } from '@tanstack/react-table'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import DoughnutChart from '@/components/charts/DoughnutChart'
import DataTable from '@/components/data-table/DataTable'
import EmptyState from '@/components/common/EmptyState'
import LoadingState from '@/components/common/LoadingState'
import ErrorState from '@/components/common/ErrorState'
import StatCard from '@/components/dashboard/StatCard'
import PerformanceMetrics from '@/components/dashboard/PerformanceMetrics'
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton'

export default function DashboardPage() {
  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: isStatsError,
    error: statsError,
    mutate: mutateStats
  } = useData<DashboardStats>('/api/stats')

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isUsersError,
    error: usersError,
    mutate: mutateUsers
  } = useData<User[]>('/api/users')

  const columns: ColumnDef<User>[] = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Role', accessorKey: 'role' },
  ]

  if (isLoadingStats || isLoadingUsers) {
    return <DashboardSkeleton />
  }

  if (isStatsError) {
    return (
      <ErrorState
        message="Failed to load dashboard data"
        retry={() => mutateStats()}
      />
    )
  }

  if (isUsersError) {
    return (
      <ErrorState
        message="Failed to load user data"
        retry={() => mutateUsers()}
      />
    )
  }

  if (!stats) {
    return <EmptyState message="No dashboard data available" />
  }

  const activeUsersPercent = Math.round((stats.activeUsers / stats.users) * 100)
  const prevRevenue = stats.series[stats.series.length - 2]?.value || 0
  const currentRevenue = stats.series[stats.series.length - 1]?.value || 0
  const revenueTrend = prevRevenue
    ? Math.round(((currentRevenue - prevRevenue) / prevRevenue) * 100)
    : 0

  return (
    <div className="page-container">
      <div className="mb-8 space-y-4">
        <h1 className="heading-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a summary of your business metrics.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid-container sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Users"
          value={stats.users.toLocaleString()}
          trend={stats.growthPct}
          trendLabel="vs last month"
        />
        <StatCard
          label="Active Users"
          value={stats.activeUsers.toLocaleString()}
          trend={activeUsersPercent}
          trendLabel="of total users"
        />
        <StatCard
          label="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          trend={revenueTrend}
          trendLabel="vs last month"
        />
        <StatCard
          label="Conversion Rate"
          value={`${stats.conversionRate}%`}
        />
      </div>

      {/* Charts Grid */}
      <div className="mt-8 grid-container lg:grid-cols-2">
        {/* Revenue Trend */}
        <div className="section-container">
          <h3 className="heading-4 mb-6">Revenue Trend</h3>
          {stats.series.length > 0 ? (
            <LineChart data={stats.series} />
          ) : (
            <EmptyState message="No revenue trend data available" />
          )}
        </div>

        {/* Revenue by Region */}
        <div className="section-container">
          <h3 className="heading-4 mb-6">Revenue by Region</h3>
          {stats.revenueByRegion.length > 0 ? (
            <BarChart data={stats.revenueByRegion} label="Revenue" />
          ) : (
            <EmptyState message="No regional revenue data available" />
          )}
        </div>

        {/* User Distribution */}
        <div className="section-container">
          <h3 className="heading-4 mb-6">User Distribution</h3>
          {stats.usersByType.length > 0 ? (
            <DoughnutChart data={stats.usersByType} label="Users" />
          ) : (
            <EmptyState message="No user distribution data available" />
          )}
        </div>

        {/* Performance Metrics */}
        {stats.performanceMetrics ? (
          <div className="section-container">
            <PerformanceMetrics metrics={stats.performanceMetrics} />
          </div>
        ) : (
          <div className="section-container">
            <h3 className="heading-4 mb-6">Performance Metrics</h3>
            <EmptyState message="No performance metrics available" />
          </div>
        )}
      </div>

      {/* Recent Users Table */}
      <div className="section-container mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="heading-4">Recent Users</h3>
          <button className="btn-outline">View All</button>
        </div>
        <div className="table-container">
          {users && users.length > 0 ? (
            <DataTable columns={columns} data={users.slice(0, 5)} />
          ) : (
            <EmptyState message="No users found" />
          )}
        </div>
      </div>
    </div>
  )
}

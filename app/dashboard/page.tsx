'use client'
import { DashboardStats, User } from '@/lib/types'
import { useData } from '@/lib/hooks/useData'
import type { ColumnDef } from '@tanstack/react-table'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import DataTable from '@/components/data-table/DataTable'
import EmptyState from '@/components/common/EmptyState'
import ErrorState from '@/components/common/ErrorState'
import StatCard from '@/components/dashboard/StatCard'
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton'
import PageLayout from '@/components/layout/PageLayout'
import RecentActivityFeed from '@/components/dashboard/RecentActivityFeed'

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
  const churnRate = 100 - activeUsersPercent
  const prevRevenue = stats.series[stats.series.length - 2]?.value || 0
  const currentRevenue = stats.series[stats.series.length - 1]?.value || 0
  const revenueTrend = prevRevenue
    ? Math.round(((currentRevenue - prevRevenue) / prevRevenue) * 100)
    : 0

  return (
    <PageLayout
      title="Dashboard Overview"
      description="Welcome back! Here's a summary of your business metrics."
    >
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
          label="Avg. Session"
          value={`${stats.avgSessionDuration} min`}
        />
        <StatCard
          label="Satisfaction"
          value={`${stats.customerSatisfaction}%`}
          trend={stats.customerSatisfaction - 88}
          trendLabel="vs last survey"
        />
      </div>

      <div className="grid-container lg:grid-cols-2">
        <div className="section-container">
          <h3 className="heading-4 mb-6">Revenue Trend</h3>
          {stats.series.length > 0 ? (
            <LineChart data={stats.series} />
          ) : (
            <EmptyState message="No revenue trend data available" />
          )}
        </div>

        <div className="section-container">
          <h3 className="heading-4 mb-6">Revenue by Region</h3>
          {stats.revenueByRegion.length > 0 ? (
            <BarChart data={stats.revenueByRegion} label="Revenue" />
          ) : (
            <EmptyState message="No regional revenue data available" />
          )}
        </div>

        <div className="section-container">
          <h3 className="heading-4 mb-6">Customer Segments</h3>
          {stats.usersByType.length > 0 ? (
            <div className="space-y-3">
              {stats.usersByType.map((segment) => (
                <div key={segment.label} className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{segment.label}</p>
                    <p className="text-xs text-muted-foreground/80">Share of active users</p>
                  </div>
                  <p className="text-lg font-semibold text-foreground">{segment.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No user distribution data available" />
          )}
        </div>

        <div className="section-container">
          <h3 className="heading-4 mb-6">Performance Snapshot</h3>
          {stats.performanceMetrics ? (
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                label="Page Load"
                value={`${stats.performanceMetrics.pageLoadTime}s`}
                trend={-8}
                trendLabel="vs last month"
              />
              <StatCard
                label="Error Rate"
                value={`${stats.performanceMetrics.errorRate}%`}
                trend={-stats.performanceMetrics.errorRate}
                trendLabel="Improvement"
              />
              <StatCard
                label="Uptime"
                value={`${stats.performanceMetrics.uptime}%`}
                trend={0.05}
                trendLabel="Last 30 days"
              />
            </div>
          ) : (
            <EmptyState message="No performance metrics available" />
          )}
        </div>
      </div>

      <div className="section-container">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="heading-4">Recent Users</h3>
          <button className="btn-outline">View All</button>
        </div>
        <div className="table-container">
          {users && users.length > 0 ? (
            <DataTable columns={columns} data={users.slice(0, 5)} searchKeys={['name', 'email']} initialPageSize={5} />
          ) : (
            <EmptyState message="No users found" />
          )}
        </div>
      </div>

      <div className="section-container">
        <h3 className="heading-4 mb-6">Recent Activity</h3>
        {stats.recentActivity && stats.recentActivity.length > 0 ? (
          <RecentActivityFeed items={stats.recentActivity} />
        ) : (
          <EmptyState message="No recent activity recorded" />
        )}
      </div>
    </PageLayout>
  )
}

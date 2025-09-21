"use client"
import StatCard from '@/components/dashboard/StatCard'
import { DashboardStats } from '@/lib/types'

type StatsGridProps = {
  stats: DashboardStats
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const activeUsersPercent = Math.round((stats.activeUsers / stats.users) * 100)
  const prevRevenue = stats.series[stats.series.length - 2]?.value || 0
  const currentRevenue = stats.series[stats.series.length - 1]?.value || 0
  const revenueTrend = prevRevenue
    ? Math.round(((currentRevenue - prevRevenue) / prevRevenue) * 100)
    : 0

  return (
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
  )
}

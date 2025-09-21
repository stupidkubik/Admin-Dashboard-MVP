"use client"
import EmptyState from '@/components/common/EmptyState'
import StatCard from '@/components/dashboard/StatCard'
import { DashboardStats } from '@/lib/types'

type PerformanceSnapshotProps = {
  metrics: DashboardStats['performanceMetrics']
}

export default function PerformanceSnapshot({ metrics }: PerformanceSnapshotProps) {
  if (!metrics) {
    return (
      <div className="section-container">
        <h3 className="heading-4 mb-6">Performance Snapshot</h3>
        <EmptyState message="No performance metrics available" />
      </div>
    )
  }

  return (
    <div className="section-container">
      <h3 className="heading-4 mb-6">Performance Snapshot</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Page Load"
          value={`${metrics.pageLoadTime}s`}
          trend={-8}
          trendLabel="vs last month"
        />
        <StatCard
          label="Error Rate"
          value={`${metrics.errorRate}%`}
          trend={-metrics.errorRate}
          trendLabel="Improvement"
        />
        <StatCard
          label="Uptime"
          value={`${metrics.uptime}%`}
          trend={0.05}
          trendLabel="Last 30 days"
        />
      </div>
    </div>
  )
}

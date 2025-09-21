'use client'
import { DashboardStats, User } from '@/lib/types'
import { useData } from '@/lib/hooks/useData'
import EmptyState from '@/components/common/EmptyState'
import ErrorState from '@/components/common/ErrorState'
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton'
import PageLayout from '@/components/layout/PageLayout'
import StatsGrid from '@/components/dashboard/StatsGrid'
import RevenueSection from '@/components/dashboard/RevenueSection'
import SegmentsList from '@/components/dashboard/SegmentsList'
import PerformanceSnapshot from '@/components/dashboard/PerformanceSnapshot'
import RecentUsersTable from '@/components/dashboard/RecentUsersTable'
import RecentActivitySection from '@/components/dashboard/RecentActivitySection'

export default function DashboardPage() {
  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: isStatsError,
    mutate: mutateStats
  } = useData<DashboardStats>('/api/stats')

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isUsersError,
    mutate: mutateUsers
  } = useData<User[]>('/api/users')

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

  return (
    <PageLayout
      title="Dashboard Overview"
      description="Welcome back! Here's a summary of your business metrics."
    >
      <StatsGrid stats={stats} />

      <div className="grid-container lg:grid-cols-2">
        <RevenueSection trend={stats.series} revenueByRegion={stats.revenueByRegion} />
        <SegmentsList segments={stats.usersByType} />
        <PerformanceSnapshot metrics={stats.performanceMetrics} />
      </div>

      <RecentUsersTable users={users} />

      <RecentActivitySection activity={stats.recentActivity} />
    </PageLayout>
  )
}

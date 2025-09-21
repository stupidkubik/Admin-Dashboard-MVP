"use client"
import EmptyState from '@/components/common/EmptyState'
import RecentActivityFeed from '@/components/dashboard/RecentActivityFeed'
import { DashboardStats } from '@/lib/types'

type RecentActivitySectionProps = {
  activity?: DashboardStats['recentActivity']
}

export default function RecentActivitySection({ activity }: RecentActivitySectionProps) {
  const hasActivity = Boolean(activity && activity.length > 0)

  return (
    <div className="section-container">
      <h3 className="heading-4 mb-6">Recent Activity</h3>
      {hasActivity ? (
        <RecentActivityFeed items={activity!} />
      ) : (
        <EmptyState message="No recent activity recorded" />
      )}
    </div>
  )
}

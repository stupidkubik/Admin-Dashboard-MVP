import EmptyState from '@/components/common/EmptyState'
import { DashboardStats } from '@/lib/types'

type SegmentsListProps = {
  segments: DashboardStats['usersByType']
}

export default function SegmentsList({ segments }: SegmentsListProps) {
  const hasSegments = segments.length > 0

  return (
    <div className="section-container">
      <h3 className="heading-4 mb-6">Customer Segments</h3>
      {hasSegments ? (
        <div className="space-y-3">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-muted-foreground">{segment.label}</p>
                <p className="text-xs text-muted-foreground/80">Share of active users</p>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {segment.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No user distribution data available" />
      )}
    </div>
  )
}

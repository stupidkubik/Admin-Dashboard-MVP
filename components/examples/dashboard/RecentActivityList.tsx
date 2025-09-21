'use client'

type ActivityItem = {
  id: string | number
  statusClass?: string
  title: string
  description: string
  timestamp: string
}

type RecentActivityListProps = {
  items: ActivityItem[]
  viewAllLabel?: string
  onViewAll?: () => void
}

export default function RecentActivityList({
  items,
  viewAllLabel = 'View All Activity',
  onViewAll,
}: RecentActivityListProps) {
  return (
    <div className="glass p-6">
      <h3 className="heading-4 mb-4">Recent Activity</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.id ?? index} className="flex items-start gap-4 border-b pb-6 last:border-0">
            <div className={`status-dot ${item.statusClass ?? 'status-online'} mt-1`} />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-link mt-4 w-full" onClick={onViewAll}>
        {viewAllLabel}
      </button>
    </div>
  )
}

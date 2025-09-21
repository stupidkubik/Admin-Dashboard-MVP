import { CardSkeletonGrid, TableSkeleton } from '@/components/loading/Skeletons'
import { Skeleton } from '@/components/ui/Skeleton'

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <CardSkeletonGrid />

      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 rounded-lg border border-border/50 bg-card/70 p-6"
          >
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-64 w-full" />
          </div>
        ))}
      </div>

      <TableSkeleton columns={3} rows={5} />
    </div>
  )
}

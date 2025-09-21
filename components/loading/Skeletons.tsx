import type { CSSProperties, ReactNode } from 'react'
import { Skeleton } from '@/components/ui/Skeleton'

export function CardSkeletonGrid({
  items = 4,
  className = 'grid gap-4 sm:grid-cols-2 lg:grid-cols-4',
  cardClassName = 'h-32'
}: {
  items?: number
  className?: string
  cardClassName?: string
}) {
  return (
    <div className={className}>
      {Array.from({ length: items }).map((_, index) => (
        <Skeleton key={index} className={`${cardClassName} rounded-lg`} />
      ))}
    </div>
  )
}

export function TableSkeleton({
  columns = 3,
  rows = 5,
  withToolbar = true,
  footer
}: {
  columns?: number
  rows?: number
  withToolbar?: boolean
  footer?: ReactNode
}) {
  const gridTemplate: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
  }

  return (
    <div className="space-y-3">
      {withToolbar && <Skeleton className="h-9 w-48" />}
      <div className="overflow-hidden rounded-lg border border-border/50">
        <div
          className="hidden gap-3 border-b bg-muted/60 px-4 py-3 text-sm font-medium sm:grid"
          style={gridTemplate}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>
        <div className="divide-y divide-border/60">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-3 px-4 py-3 sm:grid"
              style={gridTemplate}
            >
              {Array.from({ length: columns }).map((_, cellIndex) => (
                <Skeleton key={cellIndex} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </div>
      {footer}
    </div>
  )
}

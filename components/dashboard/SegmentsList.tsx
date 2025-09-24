"use client"

import EmptyState from '@/components/common/EmptyState'
import { DashboardStats } from '@/lib/types'
import { useLocale } from '@/contexts/LocaleProvider'

type SegmentsListProps = {
  segments: DashboardStats['usersByType']
}

export default function SegmentsList({ segments }: SegmentsListProps) {
  const { locale, t } = useLocale()
  const hasSegments = segments.length > 0

  const shareLabel = t('dashboard.segments.share', 'Share of active users')

  return (
    <div className="section-container">
      <h3 className="heading-4 mb-6">{t('dashboard.segments.title', 'Customer Segments')}</h3>
      {hasSegments ? (
        <div className="space-y-3">
          {segments.map((segment) => (
            <div
              key={segment.label}
              className="flex items-center justify-between rounded-md bg-muted/40 px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {segment.labels?.[locale] ?? segment.label}
                </p>
                <p className="text-xs text-muted-foreground/80">{shareLabel}</p>
              </div>
              <p className="text-lg font-semibold text-foreground">
                {segment.value.toLocaleString(locale)}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message={t('common.empty.segments', 'No user distribution data available')} />
      )}
    </div>
  )
}

'use client'
import { PerformanceMetrics as PerformanceMetricsType } from '@/lib/types'

type Props = {
  metrics: PerformanceMetricsType
  className?: string
}

export default function PerformanceMetrics({ metrics, className = '' }: Props) {
  return (
    <div className={`rounded bg-white p-4 shadow dark:bg-gray-800 ${className}`}>
      <h3 className="mb-4 text-lg font-semibold">System Performance</h3>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-gray-500">Page Load Time</span>
            <span className="text-sm font-medium">{metrics.pageLoadTime}s</span>
          </div>
          <div className="h-2 rounded bg-gray-200">
            <div
              className="h-2 rounded bg-blue-600"
              style={{ width: `${Math.min((metrics.pageLoadTime / 2) * 100, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-gray-500">Error Rate</span>
            <span className="text-sm font-medium">{metrics.errorRate}%</span>
          </div>
          <div className="h-2 rounded bg-gray-200">
            <div
              className="h-2 rounded bg-red-600"
              style={{ width: `${Math.min(metrics.errorRate * 10, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-gray-500">Uptime</span>
            <span className="text-sm font-medium">{metrics.uptime}%</span>
          </div>
          <div className="h-2 rounded bg-gray-200">
            <div
              className="h-2 rounded bg-green-600"
              style={{ width: `${metrics.uptime}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

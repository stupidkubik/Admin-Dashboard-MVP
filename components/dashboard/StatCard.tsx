'use client'
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'

type Props = {
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
  className?: string
}

export default function StatCard({ label, value, trend, trendLabel, className = '' }: Props) {
  const showTrend = trend !== undefined
  const isPositive = trend ? trend > 0 : false

  return (
    <div className={`rounded bg-white p-4 shadow dark:bg-gray-800 ${className}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
      {showTrend && (
        <div className="mt-2 flex items-center text-sm">
          <span
            className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'
              }`}
          >
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            {Math.abs(trend)}%
          </span>
          {trendLabel && <span className="ml-2 text-gray-500">{trendLabel}</span>}
        </div>
      )}
    </div>
  )
}

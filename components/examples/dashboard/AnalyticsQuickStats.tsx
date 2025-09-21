'use client'

import { ArrowDownIcon, ArrowUpIcon, MoreVerticalIcon } from 'lucide-react'

export type AnalyticsQuickStat = {
  label: string
  value: string
  change: string
  trend: 'up' | 'down'
}

type AnalyticsQuickStatsProps = {
  stats: AnalyticsQuickStat[]
}

export default function AnalyticsQuickStats({ stats }: AnalyticsQuickStatsProps) {
  return (
    <div className="grid-container md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const TrendIcon = stat.trend === 'up' ? ArrowUpIcon : ArrowDownIcon
        const trendColor = stat.trend === 'up' ? 'text-green-500' : 'text-red-500'

        return (
          <div key={stat.label} className="glass p-6 hover:glass-hover">
            <div className="flex-between mb-4">
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <MoreVerticalIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className={`flex items-center text-sm ${trendColor}`}>
                <TrendIcon className="mr-1 h-4 w-4" />
                {stat.change}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

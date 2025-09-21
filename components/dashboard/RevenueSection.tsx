"use client"
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import EmptyState from '@/components/common/EmptyState'
import { DashboardStats } from '@/lib/types'

type RevenueSectionProps = {
  trend: DashboardStats['series']
  revenueByRegion: DashboardStats['revenueByRegion']
}

export default function RevenueSection({ trend, revenueByRegion }: RevenueSectionProps) {
  const hasTrendData = trend.length > 0
  const hasRegionData = revenueByRegion.length > 0

  return (
    <>
      <div className="section-container">
        <h3 className="heading-4 mb-6">Revenue Trend</h3>
        {hasTrendData ? (
          <LineChart data={trend} />
        ) : (
          <EmptyState message="No revenue trend data available" />
        )}
      </div>

      <div className="section-container">
        <h3 className="heading-4 mb-6">Revenue by Region</h3>
        {hasRegionData ? (
          <BarChart data={revenueByRegion} label="Revenue" />
        ) : (
          <EmptyState message="No regional revenue data available" />
        )}
      </div>
    </>
  )
}

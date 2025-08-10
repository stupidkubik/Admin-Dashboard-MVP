export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  active: boolean
  createdAt: string
}

export type ChartDataPoint = {
  label: string
  value: number
}

export type PerformanceMetrics = {
  pageLoadTime: number
  errorRate: number
  uptime: number
}

export type DashboardStats = {
  users: number
  revenue: number
  growthPct: number
  activeUsers: number
  totalOrders: number
  conversionRate: number
  series: Array<{ date: string; value: number }>
  usersByType: ChartDataPoint[]
  revenueByRegion: ChartDataPoint[]
  performanceMetrics: PerformanceMetrics
}

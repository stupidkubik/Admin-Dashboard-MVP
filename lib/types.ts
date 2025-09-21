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

export type ActivityItem = {
  id: string
  type: string
  title: string
  timestamp: string
  details?: string
}

export type DashboardStats = {
  users: number
  revenue: number
  growthPct: number
  activeUsers: number
  totalOrders: number
  conversionRate: number
  avgSessionDuration: number
  customerSatisfaction: number
  series: Array<{ date: string; value: number }>
  usersByType: ChartDataPoint[]
  revenueByRegion: ChartDataPoint[]
  performanceMetrics: PerformanceMetrics
  recentActivity: ActivityItem[]
}

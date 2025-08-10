export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  active: boolean
  createdAt: string
}

export type DashboardStats = {
  users: number
  revenue: number
  growthPct: number
  series: Array<{ date: string; value: number }>
}

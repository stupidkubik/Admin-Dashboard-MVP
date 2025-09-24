import type { Locale } from "./i18n";

export type LocalizedStringMap = Partial<Record<Locale, string>>;

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  active: boolean;
  createdAt: string;
};

export type ChartDataPoint = {
  label: string;
  labels?: LocalizedStringMap;
  value: number;
};

export type PerformanceMetrics = {
  pageLoadTime: number;
  errorRate: number;
  uptime: number;
};

export type ActivityItem = {
  id: string;
  type: string;
  typeLabel?: string;
  typeLabels?: LocalizedStringMap;
  title: string;
  timestamp: string;
  details?: string;
  translations?: Partial<Record<Locale, { title: string; details?: string }>>;
};

export type SeriesPoint = {
  date: string;
  value: number;
  label?: string;
  labels?: LocalizedStringMap;
};

export type DashboardStats = {
  users: number;
  revenue: number;
  growthPct: number;
  activeUsers: number;
  totalOrders: number;
  conversionRate: number;
  avgSessionDuration: number;
  customerSatisfaction: number;
  series: SeriesPoint[];
  usersByType: ChartDataPoint[];
  revenueByRegion: ChartDataPoint[];
  performanceMetrics: PerformanceMetrics;
  recentActivity: ActivityItem[];
};

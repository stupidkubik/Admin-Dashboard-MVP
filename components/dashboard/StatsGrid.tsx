"use client";
import { useLocale } from "@/contexts/LocaleProvider";
import StatCard from "@/components/dashboard/StatCard";
import { DashboardStats } from "@/lib/types";

type StatsGridProps = {
  stats: DashboardStats;
};

export default function StatsGrid({ stats }: StatsGridProps) {
  const { locale, t } = useLocale();
  const activeUsersPercent = Math.round(
    (stats.activeUsers / stats.users) * 100,
  );
  const prevRevenue = stats.series[stats.series.length - 2]?.value || 0;
  const currentRevenue = stats.series[stats.series.length - 1]?.value || 0;
  const revenueTrend = prevRevenue
    ? Math.round(((currentRevenue - prevRevenue) / prevRevenue) * 100)
    : 0;

  return (
    <div className="grid-container sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label={t("dashboard.stats.totalUsers", "Total Users")}
        value={stats.users.toLocaleString(locale)}
        trend={stats.growthPct}
        trendLabel={t("dashboard.stats.vsLastMonth", "vs last month")}
      />
      <StatCard
        label={t("dashboard.stats.activeUsers", "Active Users")}
        value={stats.activeUsers.toLocaleString(locale)}
        trend={activeUsersPercent}
        trendLabel={t("dashboard.stats.ofTotalUsers", "of total users")}
      />
      <StatCard
        label={t("dashboard.stats.revenue", "Revenue")}
        value={new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "USD",
        }).format(stats.revenue)}
        trend={revenueTrend}
        trendLabel={t("dashboard.stats.vsLastMonth", "vs last month")}
      />
      <StatCard
        label={t("dashboard.stats.avgSession", "Avg. Session")}
        value={`${stats.avgSessionDuration} ${t("common.units.minutesShort", "min")}`}
      />
      <StatCard
        label={t("dashboard.stats.satisfaction", "Satisfaction")}
        value={`${stats.customerSatisfaction}%`}
        trend={stats.customerSatisfaction - 88}
        trendLabel={t("dashboard.stats.vsLastSurvey", "vs last survey")}
      />
    </div>
  );
}

"use client";
import EmptyState from "@/components/common/EmptyState";
import StatCard from "@/components/dashboard/StatCard";
import { DashboardStats } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleProvider";

type PerformanceSnapshotProps = {
  metrics: DashboardStats["performanceMetrics"];
};

export default function PerformanceSnapshot({
  metrics,
}: PerformanceSnapshotProps) {
  const { t } = useLocale();
  if (!metrics) {
    return (
      <div className="section-container">
        <h3 className="heading-4 mb-6">
          {t("dashboard.performance.title", "Performance Snapshot")}
        </h3>
        <EmptyState
          message={t(
            "common.empty.performance",
            "No performance metrics available",
          )}
        />
      </div>
    );
  }

  return (
    <div className="section-container">
      <h3 className="heading-4 mb-6">
        {t("dashboard.performance.title", "Performance Snapshot")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={t("dashboard.performance.pageLoad", "Page Load")}
          value={`${metrics.pageLoadTime}s`}
          trend={-8}
          trendLabel={t("dashboard.stats.vsLastMonth", "vs last month")}
        />
        <StatCard
          label={t("dashboard.performance.errorRate", "Error Rate")}
          value={`${metrics.errorRate}%`}
          trend={-metrics.errorRate}
          trendLabel={t("dashboard.performance.improvement", "Improvement")}
        />
        <StatCard
          label={t("dashboard.performance.uptime", "Uptime")}
          value={`${metrics.uptime}%`}
          trend={0.05}
          trendLabel={t("dashboard.performance.lastThirtyDays", "Last 30 days")}
        />
      </div>
    </div>
  );
}

"use client";
import { BarChart, LineChart } from "@/components/charts/dynamic";
import EmptyState from "@/components/common/EmptyState";
import { DashboardStats } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleProvider";
import { useMemo } from "react";

type RevenueSectionProps = {
  trend: DashboardStats["series"];
  revenueByRegion: DashboardStats["revenueByRegion"];
};

export default function RevenueSection({
  trend,
  revenueByRegion,
}: RevenueSectionProps) {
  const { locale, t } = useLocale();
  const hasTrendData = trend.length > 0;
  const hasRegionData = revenueByRegion.length > 0;
  const localizedRevenueByRegion = useMemo(
    () =>
      revenueByRegion.map((region) => ({
        ...region,
        label: region.labels?.[locale] ?? region.label,
      })),
    [revenueByRegion, locale],
  );

  return (
    <>
      <div className="section-container">
        <h3 className="heading-4 mb-6">
          {t("dashboard.revenue.trendTitle", "Revenue Trend")}
        </h3>
        {hasTrendData ? (
          <LineChart
            data={trend}
            label={t("dashboard.revenue.datasetLabel", "Revenue")}
          />
        ) : (
          <EmptyState
            message={t(
              "common.empty.revenueTrend",
              "No revenue trend data available",
            )}
          />
        )}
      </div>

      <div className="section-container">
        <h3 className="heading-4 mb-6">
          {t("dashboard.revenue.regionTitle", "Revenue by Region")}
        </h3>
        {hasRegionData ? (
          <BarChart
            data={localizedRevenueByRegion}
            label={t("dashboard.revenue.datasetLabel", "Revenue")}
          />
        ) : (
          <EmptyState
            message={t(
              "common.empty.revenueByRegion",
              "No regional revenue data available",
            )}
          />
        )}
      </div>
    </>
  );
}

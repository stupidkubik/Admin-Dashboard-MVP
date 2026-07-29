"use client";
import { PerformanceMetrics as PerformanceMetricsType } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleProvider";

type Props = {
  metrics: PerformanceMetricsType;
  className?: string;
};

export default function PerformanceMetrics({ metrics, className = "" }: Props) {
  const { t } = useLocale();
  return (
    <div className={`rounded-lg bg-card p-4 shadow ${className}`}>
      <h3 className="mb-4 text-lg font-semibold">
        {t("dashboard.performance.title", "Performance Snapshot")}
      </h3>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("dashboard.performance.pageLoad", "Page Load")}
            </span>
            <span className="text-sm font-medium">{metrics.pageLoadTime}s</span>
          </div>
          <div
            className="h-2 rounded bg-muted"
            role="progressbar"
            aria-label={t("dashboard.performance.pageLoad", "Page Load")}
            aria-valuenow={metrics.pageLoadTime}
            aria-valuemin={0}
            aria-valuemax={2}
          >
            <div
              className="h-2 rounded bg-primary"
              style={{
                width: `${Math.min((metrics.pageLoadTime / 2) * 100, 100)}%`,
              }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("dashboard.performance.errorRate", "Error Rate")}
            </span>
            <span className="text-sm font-medium">{metrics.errorRate}%</span>
          </div>
          <div
            className="h-2 rounded bg-muted"
            role="progressbar"
            aria-label={t("dashboard.performance.errorRate", "Error Rate")}
            aria-valuenow={metrics.errorRate}
            aria-valuemin={0}
            aria-valuemax={10}
          >
            <div
              className="h-2 rounded bg-destructive"
              style={{ width: `${Math.min(metrics.errorRate * 10, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {t("dashboard.performance.uptime", "Uptime")}
            </span>
            <span className="text-sm font-medium">{metrics.uptime}%</span>
          </div>
          <div
            className="h-2 rounded bg-muted"
            role="progressbar"
            aria-label={t("dashboard.performance.uptime", "Uptime")}
            aria-valuenow={metrics.uptime}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-2 rounded bg-success"
              style={{ width: `${metrics.uptime}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

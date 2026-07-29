"use client";
import EmptyState from "@/components/common/EmptyState";
import RecentActivityFeed from "@/components/dashboard/RecentActivityFeed";
import { DashboardStats } from "@/lib/types";
import { useLocale } from "@/contexts/LocaleProvider";

type RecentActivitySectionProps = {
  activity?: DashboardStats["recentActivity"];
};

export default function RecentActivitySection({
  activity,
}: RecentActivitySectionProps) {
  const hasActivity = Boolean(activity && activity.length > 0);
  const { t } = useLocale();

  return (
    <div className="section-container">
      <h2 className="heading-4 mb-6">
        {t("dashboard.recentActivity.title", "Recent Activity")}
      </h2>
      {hasActivity ? (
        <RecentActivityFeed items={activity!} />
      ) : (
        <EmptyState
          message={t("common.empty.activity", "No recent activity recorded")}
        />
      )}
    </div>
  );
}

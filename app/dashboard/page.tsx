"use client";
import { DashboardStats, User } from "@/lib/types";
import EmptyState from "@/components/common/EmptyState";
import ErrorState from "@/components/common/ErrorState";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import PageLayout from "@/components/layout/PageLayout";
import StatsGrid from "@/components/dashboard/StatsGrid";
import RevenueSection from "@/components/dashboard/RevenueSection";
import SegmentsList from "@/components/dashboard/SegmentsList";
import PerformanceSnapshot from "@/components/dashboard/PerformanceSnapshot";
import RecentUsersTable from "@/components/dashboard/RecentUsersTable";
import RecentActivitySection from "@/components/dashboard/RecentActivitySection";
import { useLocale } from "@/contexts/LocaleProvider";
import { useDashboardStats } from "@/lib/hooks/useDashboardStats";
import { useUsers } from "@/lib/hooks/useUsers";

export default function DashboardPage() {
  const { t } = useLocale();
  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: isStatsError,
    error: statsError,
    mutate: mutateStats,
  } = useDashboardStats();

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isUsersError,
    error: usersError,
    mutate: mutateUsers,
  } = useUsers();

  if (isLoadingStats || isLoadingUsers) {
    return <DashboardSkeleton />;
  }

  if (isStatsError) {
    return (
      <ErrorState
        message={t("dashboard.errors.stats", "Failed to load dashboard data")}
        error={statsError}
        retry={() => {
          void mutateStats();
        }}
      />
    );
  }

  if (isUsersError) {
    return (
      <ErrorState
        message={t("dashboard.errors.users", "Failed to load user data")}
        error={usersError}
        retry={() => {
          void mutateUsers();
        }}
      />
    );
  }

  if (!stats) {
    return (
      <EmptyState
        message={t("common.empty.dashboard", "No dashboard data available")}
      />
    );
  }

  return (
    <PageLayout
      title={t("dashboard.page.title", "Dashboard Overview")}
      description={t(
        "dashboard.page.description",
        "Welcome back! Here's a summary of your business metrics.",
      )}
    >
      <StatsGrid stats={stats} />

      <div className="grid-container lg:grid-cols-2">
        <RevenueSection
          trend={stats.series}
          revenueByRegion={stats.revenueByRegion}
        />
        <SegmentsList segments={stats.usersByType} />
        <PerformanceSnapshot metrics={stats.performanceMetrics} />
      </div>

      <RecentUsersTable users={users} />

      <RecentActivitySection activity={stats.recentActivity} />
    </PageLayout>
  );
}

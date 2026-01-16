"use client";

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
import { useGetStatsQuery, useGetUsersQuery } from "@/lib/apiSlice";

export default function DashboardPageClient() {
  const { t } = useLocale();

  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isStatsError,
    refetch: refetchStats,
  } = useGetStatsQuery(undefined);

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useGetUsersQuery(undefined);

  const stats = statsData;
  const users = usersData;
  const isLoading = isLoadingStats || isLoadingUsers;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isStatsError) {
    return (
      <ErrorState
        message={t("dashboard.errors.stats", "Failed to load dashboard data")}
        retry={() => {
          void refetchStats();
        }}
      />
    );
  }

  if (isUsersError) {
    return (
      <ErrorState
        message={t("dashboard.errors.users", "Failed to load user data")}
        retry={() => {
          void refetchUsers();
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

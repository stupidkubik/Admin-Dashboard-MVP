import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";
import PageLayout from "@/components/layout/PageLayout";

export default function Loading() {
  return (
    <PageLayout
      title="Dashboard Overview"
      description="Welcome back! Here's a summary of your business metrics."
    >
      <DashboardSkeleton />
    </PageLayout>
  );
}

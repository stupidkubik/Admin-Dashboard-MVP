import DashboardPageClient from "@/components/dashboard/DashboardPageClient";
import { getDashboardSeed } from "@/lib/server/dashboard-data";

export default async function DashboardPage() {
  const { initialStats, initialUsers } = await getDashboardSeed();

  return (
    <DashboardPageClient
      initialStats={initialStats}
      initialUsers={initialUsers}
    />
  );
}
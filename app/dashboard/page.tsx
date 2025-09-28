import DashboardPageClient from "@/components/dashboard/DashboardPageClient";
import { fetcher } from "@/lib/fetcher";
import type { DashboardStats, User } from "@/lib/types";

async function getDashboardData() {
  const [initialStats, initialUsers] = await Promise.all([
    fetcher<DashboardStats>("stats"),
    fetcher<User[]>("users"),
  ]);

  return { initialStats, initialUsers };
}

export default async function DashboardPage() {
  const { initialStats, initialUsers } = await getDashboardData();

  return (
    <DashboardPageClient
      initialStats={initialStats}
      initialUsers={initialUsers}
    />
  );
}

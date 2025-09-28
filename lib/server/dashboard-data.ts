import type { DashboardStats, User } from "@/lib/types";
import stats from "@/mocks/data/stats.json";
import users from "@/mocks/data/users.json";

const dashboardStats = stats as DashboardStats;
const dashboardUsers = users as User[];

export async function getDashboardStats(): Promise<DashboardStats> {
  return dashboardStats;
}

export async function getDashboardUsers(): Promise<User[]> {
  return dashboardUsers;
}

export async function getDashboardSeed() {
  const [initialStats, initialUsers] = await Promise.all([
    getDashboardStats(),
    getDashboardUsers(),
  ]);

  return { initialStats, initialUsers };
}

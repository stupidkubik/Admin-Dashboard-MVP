import type { DashboardStats, User } from "@/lib/types";
import type {
  CreateUserRequest,
  UpdateUserRequest,
} from "@/lib/api/contracts";
import stats from "@/mocks/data/stats.json";
import users from "@/mocks/data/users.json";

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data));

const dashboardStats = stats as DashboardStats;
const usersSeed = users as User[];
let usersDb = clone(usersSeed);

export async function getDashboardStats(): Promise<DashboardStats> {
  return dashboardStats;
}

export async function getDashboardUsers(): Promise<User[]> {
  return usersDb;
}

export async function createDashboardUser(
  payload: CreateUserRequest,
): Promise<User | null> {
  if (usersDb.some((user) => user.email.toLowerCase() === payload.email.toLowerCase())) {
    return null;
  }

  const newUser = {
    id: crypto.randomUUID(),
    ...payload,
  };

  usersDb = [...usersDb, newUser];
  return newUser;
}

export async function updateDashboardUser(
  id: string,
  changes: UpdateUserRequest,
): Promise<User | null> {
  const index = usersDb.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }

  const updatedUser: User = {
    ...usersDb[index],
    ...changes,
    id,
  } as User;

  usersDb = usersDb.map((user, currentIndex) =>
    currentIndex === index ? updatedUser : user,
  );

  return updatedUser;
}

export async function deleteDashboardUser(id: string): Promise<boolean> {
  const exists = usersDb.some((user) => user.id === id);
  if (!exists) {
    return false;
  }

  usersDb = usersDb.filter((user) => user.id !== id);
  return true;
}

export async function getDashboardSeed() {
  const [initialStats, initialUsers] = await Promise.all([
    getDashboardStats(),
    getDashboardUsers(),
  ]);

  return { initialStats, initialUsers };
}

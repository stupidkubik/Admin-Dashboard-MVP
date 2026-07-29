import type { CreateUserRequest, UpdateUserRequest } from "@/lib/api/contracts";
import type { DashboardStats, User } from "@/lib/types";
import statsFixture from "@/mocks/data/stats.json";
import usersFixture from "@/mocks/data/users.json";

export type AppMode = "demo" | "real";

export type AuthenticatedUser = Pick<User, "id" | "email">;

export interface UserRepository {
  list(): Promise<User[]>;
  create(input: CreateUserRequest): Promise<User | null>;
  update(id: string, changes: UpdateUserRequest): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  reset(): Promise<void>;
}

export interface DashboardRepository extends UserRepository {
  getStats(): Promise<DashboardStats>;
}

export interface AuthService {
  authenticate(input: { email: string; password: string }): Promise<{
    user: AuthenticatedUser;
    demo: boolean;
  }>;
}

export class RealModeNotConfiguredError extends Error {
  constructor() {
    super("Real mode is not configured");
    this.name = "RealModeNotConfiguredError";
  }
}

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value));
const usersSeed = usersFixture as User[];
const statsSeed = statsFixture as DashboardStats;

export class InMemoryDashboardRepository implements DashboardRepository {
  private users = clone(usersSeed);

  async getStats(): Promise<DashboardStats> {
    return clone(statsSeed);
  }

  async list(): Promise<User[]> {
    return clone(this.users);
  }

  async create(input: CreateUserRequest): Promise<User | null> {
    if (this.users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) {
      return null;
    }

    const user: User = { id: crypto.randomUUID(), ...input };
    this.users = [...this.users, user];
    return clone(user);
  }

  async update(id: string, changes: UpdateUserRequest): Promise<User | null> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }

    const user: User = { ...this.users[index], ...changes, id };
    this.users = this.users.map((entry, currentIndex) =>
      currentIndex === index ? user : entry,
    );
    return clone(user);
  }

  async delete(id: string): Promise<boolean> {
    const exists = this.users.some((user) => user.id === id);
    if (!exists) {
      return false;
    }

    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }

  async reset(): Promise<void> {
    this.users = clone(usersSeed);
  }
}

class DemoAuthService implements AuthService {
  async authenticate(input: { email: string; password: string }) {
    return { user: { id: "demo-user", email: input.email }, demo: true };
  }
}

class UnconfiguredAuthService implements AuthService {
  async authenticate(): Promise<never> {
    throw new RealModeNotConfiguredError();
  }
}

class UnconfiguredDashboardRepository implements DashboardRepository {
  private unavailable(): never {
    throw new RealModeNotConfiguredError();
  }

  async getStats(): Promise<DashboardStats> { return this.unavailable(); }
  async list(): Promise<User[]> { return this.unavailable(); }
  async create(): Promise<User | null> { return this.unavailable(); }
  async update(): Promise<User | null> { return this.unavailable(); }
  async delete(): Promise<boolean> { return this.unavailable(); }
  async reset(): Promise<void> { return this.unavailable(); }
}

const demoDashboardRepository = new InMemoryDashboardRepository();
const demoAuthService = new DemoAuthService();
const unconfiguredDashboardRepository = new UnconfiguredDashboardRepository();
const unconfiguredAuthService = new UnconfiguredAuthService();

export function getAppMode(): AppMode {
  return process.env.APP_MODE === "real" ? "real" : "demo";
}

export function getAppServices() {
  if (getAppMode() === "real") {
    return {
      mode: "real" as const,
      dashboard: unconfiguredDashboardRepository,
      auth: unconfiguredAuthService,
    };
  }

  return {
    mode: "demo" as const,
    dashboard: demoDashboardRepository,
    auth: demoAuthService,
  };
}

export function isRealModeNotConfigured(error: unknown): boolean {
  return error instanceof RealModeNotConfiguredError;
}

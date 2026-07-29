import {
  dashboardStatsResponseSchema,
  userResponseSchema,
  usersResponseSchema,
  type CreateUserRequest,
  type UpdateUserRequest,
} from "@/lib/api/contracts";
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

export type RealAppServices = {
  dashboard: DashboardRepository;
  auth: AuthService;
};

const usersSeed: User[] = usersResponseSchema.parse(usersFixture);
const statsSeed: DashboardStats =
  dashboardStatsResponseSchema.parse(statsFixture);

export class InMemoryDashboardRepository implements DashboardRepository {
  private users = usersResponseSchema.parse(usersSeed);

  async getStats(): Promise<DashboardStats> {
    return dashboardStatsResponseSchema.parse(statsSeed);
  }

  async list(): Promise<User[]> {
    return usersResponseSchema.parse(this.users);
  }

  async create(input: CreateUserRequest): Promise<User | null> {
    if (
      this.users.some(
        (user) => user.email.toLowerCase() === input.email.toLowerCase(),
      )
    ) {
      return null;
    }

    const user: User = {
      id: crypto.randomUUID(),
      ...input,
      createdAt: new Date().toISOString(),
    };
    this.users = [...this.users, user];
    return userResponseSchema.parse(user);
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
    return userResponseSchema.parse(user);
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
    this.users = usersResponseSchema.parse(usersSeed);
  }
}

class DemoAuthService implements AuthService {
  async authenticate(input: { email: string; password: string }) {
    return { user: { id: "demo-user", email: input.email }, demo: true };
  }
}

const demoDashboardRepository = new InMemoryDashboardRepository();
const demoAuthService = new DemoAuthService();
let configuredRealServices: RealAppServices | undefined;

export function getAppMode(): AppMode {
  return process.env.APP_MODE === "real" ? "real" : "demo";
}

export function configureRealServices(
  services: RealAppServices | undefined,
): void {
  configuredRealServices = services;
}

export function getAppServices() {
  if (getAppMode() === "real") {
    if (!configuredRealServices) {
      throw new RealModeNotConfiguredError();
    }

    return {
      mode: "real" as const,
      ...configuredRealServices,
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

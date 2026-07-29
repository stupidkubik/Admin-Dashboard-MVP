import {
  createDashboardUser,
  deleteDashboardUser,
  getDashboardSeed,
  getDashboardStats,
  getDashboardUsers,
  updateDashboardUser,
} from "../dashboard-data";

describe("dashboard data repository", () => {
  const newUser = {
    name: "Test User",
    email: "test.user@example.com",
    role: "editor" as const,
    active: true,
    createdAt: "2026-07-29T00:00:00.000Z",
  };

  it("returns the dashboard seed data", async () => {
    const [stats, users, seed] = await Promise.all([
      getDashboardStats(),
      getDashboardUsers(),
      getDashboardSeed(),
    ]);

    expect(stats.users).toBeGreaterThan(0);
    expect(users.length).toBeGreaterThan(0);
    expect(seed).toEqual({ initialStats: stats, initialUsers: users });
  });

  it("creates, updates, and deletes users while reporting missing ids", async () => {
    const created = await createDashboardUser(newUser);
    expect(created).toMatchObject(newUser);
    expect(created.id).toEqual(expect.any(String));

    await expect(updateDashboardUser("missing", { name: "Nobody" })).resolves.toBeNull();

    await expect(
      updateDashboardUser(created.id, { name: "Updated User" }),
    ).resolves.toMatchObject({ ...newUser, id: created.id, name: "Updated User" });

    await expect(deleteDashboardUser("missing")).resolves.toBe(false);
    await expect(deleteDashboardUser(created.id)).resolves.toBe(true);
  });
});

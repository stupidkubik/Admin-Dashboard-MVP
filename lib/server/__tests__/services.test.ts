import {
  getAppServices,
  InMemoryDashboardRepository,
  isRealModeNotConfigured,
  RealModeNotConfiguredError,
} from "../services";

const newUser = {
  name: "Repository User",
  email: "repository@example.com",
  role: "viewer" as const,
  active: true,
  createdAt: "2026-07-29T00:00:00.000Z",
};

describe("server service boundary", () => {
  afterEach(() => {
    delete process.env.APP_MODE;
  });

  it("keeps mutable data in the resettable demo repository", async () => {
    const repository = new InMemoryDashboardRepository();
    const initialUsers = await repository.list();
    const created = await repository.create(newUser);

    expect(created).toMatchObject(newUser);
    expect(await repository.list()).toHaveLength(initialUsers.length + 1);

    await repository.reset();
    expect(await repository.list()).toEqual(initialUsers);
  });

  it("does not fall back to fixtures in real mode", async () => {
    process.env.APP_MODE = "real";
    const services = getAppServices();

    expect(services.mode).toBe("real");
    await expect(services.dashboard.list()).rejects.toBeInstanceOf(
      RealModeNotConfiguredError,
    );
    expect(isRealModeNotConfigured(new RealModeNotConfiguredError())).toBe(true);
  });
});

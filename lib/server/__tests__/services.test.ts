import {
  configureRealServices,
  getAppServices,
  InMemoryDashboardRepository,
  RealModeNotConfiguredError,
} from "../services";

const newUser = {
  name: "Repository User",
  email: "repository@example.com",
  role: "viewer" as const,
  active: true,
};

describe("server service boundary", () => {
  afterEach(() => {
    delete process.env.APP_MODE;
    configureRealServices(undefined);
  });

  it("keeps mutable data in the resettable demo repository", async () => {
    const repository = new InMemoryDashboardRepository();
    const initialUsers = await repository.list();
    const created = await repository.create(newUser);

    expect(created).toMatchObject(newUser);
    expect(created?.createdAt).toEqual(expect.any(String));
    expect(await repository.list()).toHaveLength(initialUsers.length + 1);

    await repository.reset();
    expect(await repository.list()).toEqual(initialUsers);
  });

  it("does not fall back to fixtures in real mode", async () => {
    process.env.APP_MODE = "real";

    expect(() => getAppServices()).toThrow(RealModeNotConfiguredError);
  });

  it("allows real adapters to be composed without changing route handlers", () => {
    const dashboard = new InMemoryDashboardRepository();
    const auth = {
      authenticate: jest.fn(async ({ email }: { email: string }) => ({
        user: { id: "real-user", email },
        demo: false,
      })),
    };
    configureRealServices({ dashboard, auth });
    process.env.APP_MODE = "real";

    expect(getAppServices()).toEqual({
      mode: "real",
      dashboard,
      auth,
    });
  });
});

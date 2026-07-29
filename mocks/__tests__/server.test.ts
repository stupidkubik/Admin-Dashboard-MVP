jest.mock("msw", () => {
  const createHandler = (method: string) =>
    jest.fn((path: string, resolver: (...args: unknown[]) => unknown) => ({
      method,
      path,
      resolver,
    }));

  return {
    http: {
      get: createHandler("GET"),
      post: createHandler("POST"),
      put: createHandler("PUT"),
      delete: createHandler("DELETE"),
    },
    HttpResponse: {
      json: jest.fn((body: unknown, init?: unknown) => ({ body, init })),
    },
  };
});

jest.mock("msw/node", () => {
  const setupServer = (...handlers: unknown[]) => ({
    listen: jest.fn(),
    close: jest.fn(),
    resetHandlers: jest.fn(),
    listHandlers: () => handlers,
  });

  return { setupServer };
});

describe("MSW contract", () => {
  const users = require("../data/users.json");
  const stats = require("../data/stats.json");

  const findHandler = (method: string, path: string) => {
    const { handlers } = require("../handlers");
    return handlers.find(
      (handler: { method: string; path: string }) =>
        handler.method === method && handler.path === path,
    ) as { resolver: (...args: any[]) => any };
  };

  afterEach(() => require("../handlers").resetMockData());

  it("uses the same { data } envelope for read endpoints", () => {
    expect(findHandler("GET", "/api/users").resolver().body).toEqual({
      data: users,
    });
    expect(findHandler("GET", "/api/stats").resolver().body).toEqual({
      data: stats,
    });
  });

  it("validates create payloads and protects server-controlled fields", async () => {
    const handler = findHandler("POST", "/api/users");
    const response = await handler.resolver({
      request: { json: () => Promise.resolve({ id: "client-id" }) },
    });

    expect(response.init).toMatchObject({ status: 422 });
    expect(response.body).toMatchObject({ error: { code: "VALIDATION_ERROR" } });
  });

  it("returns structured conflict and demo auth responses", async () => {
    const create = findHandler("POST", "/api/users");
    const { id: _id, createdAt: _createdAt, ...existingUser } = users[0];
    const conflict = await create.resolver({
      request: {
        json: () => Promise.resolve(existingUser),
      },
    });
    const auth = await findHandler("POST", "/api/auth").resolver({
      request: {
        json: () => Promise.resolve({ email: "demo@example.com", password: "secret" }),
      },
    });

    expect(conflict.init).toMatchObject({ status: 409 });
    expect(conflict.body).toMatchObject({ error: { code: "EMAIL_CONFLICT" } });
    expect(auth.body).toEqual({
      data: { user: { id: "demo-user", email: "demo@example.com" }, demo: true },
    });
  });
});

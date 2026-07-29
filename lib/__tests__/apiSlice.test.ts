/** @jest-environment node */

import { resetMockData } from "@/mocks/handlers";
import { server } from "@/mocks/server";

const API_ORIGIN = "http://localhost";
let apiSlice: typeof import("@/lib/apiSlice").apiSlice;
let makeStore: typeof import("@/lib/store").makeStore;

const newUser = {
  name: "API Slice User",
  email: "api-slice@example.com",
  role: "viewer" as const,
  active: true,
};

describe("apiSlice lifecycle", () => {
  beforeAll(async () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = `${API_ORIGIN}/api`;
    ({ apiSlice } = await import("@/lib/apiSlice"));
    ({ makeStore } = await import("@/lib/store"));
    server.listen({ onUnhandledRequest: "error" });
  });

  afterEach(() => {
    server.resetHandlers();
    resetMockData();
  });

  afterAll(() => {
    server.close();
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  });

  it("loads dashboard data through the validated response contract", async () => {
    const store = makeStore();

    const stats = await store
      .dispatch(apiSlice.endpoints.getStats.initiate())
      .unwrap();

    expect(stats).toMatchObject({
      users: expect.any(Number),
      recentActivity: expect.any(Array),
    });

    store.dispatch(apiSlice.util.resetApiState());
  });

  it("keeps a created user first after invalidation and refetch", async () => {
    const store = makeStore();

    await store.dispatch(apiSlice.endpoints.getUsers.initiate()).unwrap();
    const created = await store
      .dispatch(apiSlice.endpoints.createUser.initiate(newUser))
      .unwrap();
    const refreshed = await store
      .dispatch(
        apiSlice.endpoints.getUsers.initiate(undefined, {
          forceRefetch: true,
        }),
      )
      .unwrap();

    expect(refreshed[0]).toEqual(created.data.user);

    store.dispatch(apiSlice.util.resetApiState());
  });

  it("updates and deletes users without leaving stale cache entries", async () => {
    const store = makeStore();

    await store.dispatch(apiSlice.endpoints.getUsers.initiate()).unwrap();
    const created = await store
      .dispatch(apiSlice.endpoints.createUser.initiate(newUser))
      .unwrap();
    const id = created.data.user.id;

    await store
      .dispatch(
        apiSlice.endpoints.updateUser.initiate({
          id,
          changes: { name: "Updated API Slice User" },
        }),
      )
      .unwrap();

    const updatedUsers = await store
      .dispatch(
        apiSlice.endpoints.getUsers.initiate(undefined, {
          forceRefetch: true,
        }),
      )
      .unwrap();
    expect(updatedUsers[0]).toMatchObject({
      id,
      name: "Updated API Slice User",
    });

    await store.dispatch(apiSlice.endpoints.deleteUser.initiate(id)).unwrap();

    const usersAfterDelete = await store
      .dispatch(
        apiSlice.endpoints.getUsers.initiate(undefined, {
          forceRefetch: true,
        }),
      )
      .unwrap();
    expect(usersAfterDelete).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id })]),
    );

    store.dispatch(apiSlice.util.resetApiState());
  });

  it("rolls back an optimistic create when the server rejects it", async () => {
    const store = makeStore();
    const initialUsers = await store
      .dispatch(apiSlice.endpoints.getUsers.initiate())
      .unwrap();
    const existing = initialUsers[0];

    await expect(
      store
        .dispatch(
          apiSlice.endpoints.createUser.initiate({
            name: "Duplicate User",
            email: existing.email,
            role: "viewer",
            active: true,
          }),
        )
        .unwrap(),
    ).rejects.toMatchObject({ status: 409 });

    const usersAfterFailure = await store
      .dispatch(
        apiSlice.endpoints.getUsers.initiate(undefined, {
          forceRefetch: true,
        }),
      )
      .unwrap();

    expect(usersAfterFailure).toHaveLength(initialUsers.length);
    expect(
      usersAfterFailure.filter((user) => user.email === existing.email),
    ).toHaveLength(1);

    store.dispatch(apiSlice.util.resetApiState());
  });
});

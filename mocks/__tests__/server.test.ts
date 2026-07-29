/** @jest-environment node */

import users from "../data/users.json";
import { server } from "../server";
import { resetMockData } from "../handlers";

const API_ORIGIN = "http://localhost";

const request = (path: string, init?: RequestInit) =>
  fetch(`${API_ORIGIN}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

const newUser = {
  name: "MSW User",
  email: "msw@example.com",
  role: "viewer",
  active: true,
};

describe("MSW contract", () => {
  beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

  afterEach(() => {
    server.resetHandlers();
    resetMockData();
  });

  afterAll(() => server.close());

  it("serves validated fixtures through real request interception", async () => {
    const [usersResponse, statsResponse] = await Promise.all([
      request("/api/users"),
      request("/api/stats"),
    ]);

    expect(usersResponse.status).toBe(200);
    await expect(usersResponse.json()).resolves.toEqual({ data: users });
    expect(statsResponse.status).toBe(200);
    await expect(statsResponse.json()).resolves.toMatchObject({
      data: { users: expect.any(Number), recentActivity: expect.any(Array) },
    });
  });

  it("creates, updates, deletes, and resets users over HTTP", async () => {
    const createResponse = await request("/api/users", {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    const created = (await createResponse.json()).data.user;

    expect(createResponse.status).toBe(201);
    expect(created).toMatchObject(newUser);
    expect(created.createdAt).toEqual(expect.any(String));
    const usersAfterCreate = await (await request("/api/users")).json();
    expect(usersAfterCreate.data[0].id).toBe(created.id);

    const updateResponse = await request(`/api/users/${created.id}`, {
      method: "PUT",
      body: JSON.stringify({ name: "Updated MSW User" }),
    });
    await expect(updateResponse.json()).resolves.toMatchObject({
      data: { user: { id: created.id, name: "Updated MSW User" } },
    });

    expect(
      (
        await request(`/api/users/${created.id}`, {
          method: "DELETE",
        })
      ).status,
    ).toBe(200);

    expect(
      (
        await request("/api/demo/reset", {
          method: "POST",
        })
      ).status,
    ).toBe(200);
    await expect((await request("/api/users")).json()).resolves.toEqual({
      data: users,
    });
  });

  it("matches route validation and conflict errors", async () => {
    const { id: _id, createdAt: _createdAt, ...existingUser } = users[0];
    const [malformed, controlledTimestamp, conflict, missing] =
      await Promise.all([
        request("/api/users", { method: "POST", body: "{" }),
        request("/api/users", {
          method: "POST",
          body: JSON.stringify({
            ...newUser,
            email: "timestamp@example.com",
            createdAt: "2026-07-29T00:00:00.000Z",
          }),
        }),
        request("/api/users", {
          method: "POST",
          body: JSON.stringify(existingUser),
        }),
        request("/api/users/missing", { method: "DELETE" }),
      ]);

    expect(malformed.status).toBe(400);
    expect(controlledTimestamp.status).toBe(422);
    expect(conflict.status).toBe(409);
    expect(missing.status).toBe(404);
  });

  it("returns the documented demo auth response without reflecting a password", async () => {
    const response = await request("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        email: "demo@example.com",
        password: "secret",
      }),
    });

    await expect(response.json()).resolves.toEqual({
      data: {
        user: { id: "demo-user", email: "demo@example.com" },
        demo: true,
      },
    });
  });
});

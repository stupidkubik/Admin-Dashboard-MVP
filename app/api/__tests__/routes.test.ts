/** @jest-environment node */

import { NextRequest } from "next/server";
import { POST as authPost } from "../auth/route";
import { GET as statsGet } from "../stats/route";
import { GET as usersGet, POST as usersPost } from "../users/route";
import { DELETE as deleteUser, PUT as updateUser } from "../users/[id]/route";

const routeContext = (id?: string) => ({
  params: Promise.resolve(id ? { id } : {}),
});

describe("demo API routes", () => {
  it("returns dashboard stats and users", async () => {
    const [statsResponse, usersResponse] = await Promise.all([statsGet(), usersGet()]);

    expect(statsResponse.status).toBe(200);
    expect((await statsResponse.json()).users).toBeGreaterThan(0);
    expect(usersResponse.status).toBe(200);
    expect(Array.isArray(await usersResponse.json())).toBe(true);
  });

  it("returns the submitted demo auth user", async () => {
    const response = await authPost(
      new NextRequest("http://localhost/api/auth", {
        method: "POST",
        body: JSON.stringify({ email: "demo@example.com" }),
      }),
    );

    expect(await response.json()).toEqual({
      ok: true,
      user: { id: "1", email: "demo@example.com" },
    });
  });

  it("creates, updates, and deletes a user", async () => {
    const createResponse = await usersPost(
      new NextRequest("http://localhost/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Route User",
          email: "route@example.com",
          role: "viewer",
          active: true,
          createdAt: "2026-07-29T00:00:00.000Z",
        }),
      }),
    );
    const created = (await createResponse.json()).user;

    expect(createResponse.status).toBe(201);

    const updateResponse = await updateUser(
      new NextRequest(`http://localhost/api/users/${created.id}`, {
        method: "PUT",
        body: JSON.stringify({ name: "Updated Route User" }),
      }),
      routeContext(created.id),
    );
    expect((await updateResponse.json()).user.name).toBe("Updated Route User");

    const deleteResponse = await deleteUser(
      new NextRequest(`http://localhost/api/users/${created.id}`, { method: "DELETE" }),
      routeContext(created.id),
    );
    expect(await deleteResponse.json()).toEqual({ ok: true });
  });

  it("returns 400 for a missing id and 404 for an unknown user", async () => {
    const missing = await updateUser(
      new NextRequest("http://localhost/api/users", { method: "PUT", body: "{}" }),
      routeContext(),
    );
    const unknown = await deleteUser(
      new NextRequest("http://localhost/api/users/unknown", { method: "DELETE" }),
      routeContext("unknown"),
    );

    expect(missing.status).toBe(400);
    expect(unknown.status).toBe(404);
  });
});

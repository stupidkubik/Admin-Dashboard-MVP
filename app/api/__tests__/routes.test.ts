/** @jest-environment node */

import { NextRequest } from "next/server";
import { POST as authPost } from "../auth/route";
import { POST as resetDemo } from "../demo/reset/route";
import { GET as statsGet } from "../stats/route";
import { GET as usersGet, POST as usersPost } from "../users/route";
import { DELETE as deleteUser, PUT as updateUser } from "../users/[id]/route";

const routeContext = (id?: string) => ({
  params: Promise.resolve(id ? { id } : {}),
});

const newUser = {
  name: "Route User",
  email: "route@example.com",
  role: "viewer",
  active: true,
  createdAt: "2026-07-29T00:00:00.000Z",
};

describe("demo API routes", () => {
  it("uses the { data } envelope for read endpoints", async () => {
    const [statsResponse, usersResponse] = await Promise.all([statsGet(), usersGet()]);

    expect(statsResponse.status).toBe(200);
    expect((await statsResponse.json()).data.users).toBeGreaterThan(0);
    expect(usersResponse.status).toBe(200);
    expect(Array.isArray((await usersResponse.json()).data)).toBe(true);
  });

  it("marks auth as demo and does not reflect the password", async () => {
    const response = await authPost(
      new NextRequest("http://localhost/api/auth", {
        method: "POST",
        body: JSON.stringify({ email: "demo@example.com", password: "secret" }),
      }),
    );

    expect(await response.json()).toEqual({
      data: { user: { id: "demo-user", email: "demo@example.com" }, demo: true },
    });
  });

  it("creates, updates, and deletes a user using the common envelope", async () => {
    const createResponse = await usersPost(
      new NextRequest("http://localhost/api/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      }),
    );
    const created = (await createResponse.json()).data.user;

    expect(createResponse.status).toBe(201);

    const updateResponse = await updateUser(
      new NextRequest(`http://localhost/api/users/${created.id}`, {
        method: "PUT",
        body: JSON.stringify({ name: "Updated Route User" }),
      }),
      routeContext(created.id),
    );
    expect((await updateResponse.json()).data.user.name).toBe("Updated Route User");

    const deleteResponse = await deleteUser(
      new NextRequest(`http://localhost/api/users/${created.id}`, { method: "DELETE" }),
      routeContext(created.id),
    );
    expect(await deleteResponse.json()).toEqual({ data: {} });
  });

  it("returns 400, 404, 409, and 422 with structured errors", async () => {
    const malformed = await usersPost(
      new NextRequest("http://localhost/api/users", { method: "POST", body: "{" }),
    );
    const invalid = await usersPost(
      new NextRequest("http://localhost/api/users", {
        method: "POST",
        body: JSON.stringify({ ...newUser, id: "client-controlled" }),
      }),
    );
    const existing = (await usersGet()).json().then((response) => response.data[0]);
    const conflict = await usersPost(
      new NextRequest("http://localhost/api/users", {
        method: "POST",
        body: JSON.stringify({ ...newUser, email: (await existing).email }),
      }),
    );
    const missing = await updateUser(
      new NextRequest("http://localhost/api/users", { method: "PUT", body: "{}" }),
      routeContext(),
    );
    const unknown = await deleteUser(
      new NextRequest("http://localhost/api/users/unknown", { method: "DELETE" }),
      routeContext("unknown"),
    );

    await expect(malformed.json()).resolves.toMatchObject({
      error: { code: "MALFORMED_JSON" },
    });
    await expect(invalid.json()).resolves.toMatchObject({
      error: { code: "VALIDATION_ERROR", fields: { root: expect.any(Array) } },
    });
    expect(conflict.status).toBe(409);
    expect(missing.status).toBe(400);
    expect(unknown.status).toBe(404);
  });

  it("resets demo data and exposes an unconfigured real mode", async () => {
    expect(await (await resetDemo()).json()).toEqual({ data: { reset: true } });

    process.env.APP_MODE = "real";
    const response = await usersGet();
    delete process.env.APP_MODE;

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: {
        code: "REAL_MODE_NOT_CONFIGURED",
        message: "Real mode is not configured",
      },
    });
  });
});

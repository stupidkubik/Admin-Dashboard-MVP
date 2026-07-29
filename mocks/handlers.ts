import { http, HttpResponse } from "msw";
import type { User } from "@/lib/types";
import {
  authRequestSchema,
  createUserRequestSchema,
  dashboardStatsResponseSchema,
  updateUserRequestSchema,
  usersResponseSchema,
} from "@/lib/api/contracts";
import { error, parseJsonRequest, success } from "@/lib/api/response";
import usersFixture from "./data/users.json";
import statsFixture from "./data/stats.json";

const usersSeed: User[] = usersResponseSchema.parse(usersFixture);
const stats = dashboardStatsResponseSchema.parse(statsFixture);
let usersDb: User[] = usersResponseSchema.parse(usersSeed);

const generateId = () => Math.random().toString(36).slice(2, 10);

export const handlers = [
  http.get("*/api/users", () =>
    HttpResponse.json(success(usersResponseSchema.parse(usersDb))),
  ),
  http.post("*/api/users", async ({ request }) => {
    const parsed = await parseJsonRequest(request, createUserRequestSchema);
    if (parsed.success === false) {
      return HttpResponse.json(parsed.body, { status: parsed.status });
    }

    if (
      usersDb.some(
        (user) => user.email.toLowerCase() === parsed.data.email.toLowerCase(),
      )
    ) {
      return HttpResponse.json(
        error("EMAIL_CONFLICT", "A user with this email already exists", {
          email: ["A user with this email already exists"],
        }),
        { status: 409 },
      );
    }

    const user: User = {
      id: generateId(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    };
    usersDb = [...usersDb, user];
    return HttpResponse.json(success({ user }), { status: 201 });
  }),
  http.put("*/api/users/:id", async ({ params, request }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!id) {
      return HttpResponse.json(
        error("MISSING_USER_ID", "User id is required"),
        {
          status: 400,
        },
      );
    }

    const parsed = await parseJsonRequest(request, updateUserRequestSchema);
    if (parsed.success === false) {
      return HttpResponse.json(parsed.body, { status: parsed.status });
    }

    const index = usersDb.findIndex((user) => user.id === id);
    if (index === -1) {
      return HttpResponse.json(error("USER_NOT_FOUND", "User not found"), {
        status: 404,
      });
    }

    if (
      parsed.data.email &&
      usersDb.some(
        (user) =>
          user.id !== id &&
          user.email.toLowerCase() === parsed.data.email?.toLowerCase(),
      )
    ) {
      return HttpResponse.json(
        error("EMAIL_CONFLICT", "A user with this email already exists", {
          email: ["A user with this email already exists"],
        }),
        { status: 409 },
      );
    }

    const user: User = { ...usersDb[index], ...parsed.data, id };
    usersDb = usersDb.map((entry, currentIndex) =>
      currentIndex === index ? user : entry,
    );

    return HttpResponse.json(success({ user }));
  }),
  http.delete("*/api/users/:id", ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    if (!id) {
      return HttpResponse.json(
        error("MISSING_USER_ID", "User id is required"),
        {
          status: 400,
        },
      );
    }

    const exists = usersDb.some((user) => user.id === id);
    if (!exists) {
      return HttpResponse.json(error("USER_NOT_FOUND", "User not found"), {
        status: 404,
      });
    }

    usersDb = usersDb.filter((user) => user.id !== id);
    return HttpResponse.json(success({}));
  }),
  http.get("*/api/stats", () =>
    HttpResponse.json(success(dashboardStatsResponseSchema.parse(stats))),
  ),
  http.post("*/api/demo/reset", () => {
    resetMockData();
    return HttpResponse.json(success({ reset: true }));
  }),
  http.post("*/api/auth", async ({ request }) => {
    const parsed = await parseJsonRequest(request, authRequestSchema);
    if (parsed.success === false) {
      return HttpResponse.json(parsed.body, { status: parsed.status });
    }

    return HttpResponse.json(
      success({
        user: { id: "demo-user", email: parsed.data.email },
        demo: true,
      }),
    );
  }),
];

export function resetMockData() {
  usersDb = usersResponseSchema.parse(usersSeed);
}

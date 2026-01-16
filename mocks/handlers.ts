import { http, HttpResponse } from "msw";
import users from "./data/users.json";
import stats from "./data/stats.json";

type User = (typeof users)[number];

type LoginPayload = {
  email?: string;
  password?: string;
  [key: string]: unknown;
};

const clone = <T>(data: T): T => JSON.parse(JSON.stringify(data));

let usersDb: User[] = clone(users);

const generateId = () => Math.random().toString(36).slice(2, 10);

export const handlers = [
  http.get("/api/users", () => {
    return HttpResponse.json(usersDb);
  }),
  http.post("/api/users", async ({ request }) => {
    const body = (await request.json()) as Partial<User>;
    const newUser = {
      id: generateId(),
      ...body,
    } as User;

    usersDb = [...usersDb, newUser];

    return HttpResponse.json({ ok: true, user: newUser }, { status: 201 });
  }),
  http.put("/api/users/:id", async ({ params, request }) => {
    const { id } = params as { id?: string };
    if (!id) {
      return HttpResponse.json(
        { ok: false, message: "User id is required" },
        { status: 400 },
      );
    }

    const body = (await request.json()) as Partial<User>;
    const index = usersDb.findIndex((user) => user.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 },
      );
    }

    const updatedUser = {
      ...usersDb[index],
      ...body,
      id,
    } as User;

    usersDb = usersDb.map((user, currentIndex) =>
      currentIndex === index ? updatedUser : user,
    );

    return HttpResponse.json({ ok: true, user: updatedUser });
  }),
  http.delete("/api/users/:id", ({ params }) => {
    const { id } = params as { id?: string };
    if (!id) {
      return HttpResponse.json(
        { ok: false, message: "User id is required" },
        { status: 400 },
      );
    }

    const exists = usersDb.some((user) => user.id === id);
    if (!exists) {
      return HttpResponse.json(
        { ok: false, message: "User not found" },
        { status: 404 },
      );
    }

    usersDb = usersDb.filter((user) => user.id !== id);

    return HttpResponse.json({ ok: true });
  }),
  http.get("/api/stats", () => {
    return HttpResponse.json(clone(stats));
  }),
  http.post("/api/auth", async ({ request }) => {
    const body = (await request.json()) as LoginPayload;
    return HttpResponse.json({ ok: true, user: { id: "1", ...body } });
  }),
];

export function resetMockData() {
  usersDb = clone(users);
}

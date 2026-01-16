import { NextResponse } from "next/server";
import {
  deleteDashboardUser,
  updateDashboardUser,
} from "@/lib/server/dashboard-data";

type RouteContext = {
  params?: Promise<Record<string, string | string[] | undefined>>;
};

async function resolveUserId(context: RouteContext) {
  const params = (await context.params) ?? {};
  const rawId = params.id;
  return Array.isArray(rawId) ? rawId[0] : rawId;
}

export const dynamic = "force-dynamic";

export async function PUT(req: Request, context: RouteContext) {
  const id = await resolveUserId(context);
  if (!id) {
    return NextResponse.json(
      { ok: false, message: "User id is required" },
      { status: 400 },
    );
  }

  const body = await req.json();
  const updatedUser = await updateDashboardUser(id, body);

  if (!updatedUser) {
    return NextResponse.json(
      { ok: false, message: "User not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, user: updatedUser });
}

export async function DELETE(_req: Request, context: RouteContext) {
  const id = await resolveUserId(context);
  if (!id) {
    return NextResponse.json(
      { ok: false, message: "User id is required" },
      { status: 400 },
    );
  }

  const deleted = await deleteDashboardUser(id);
  if (!deleted) {
    return NextResponse.json(
      { ok: false, message: "User not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true });
}

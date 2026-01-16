import { NextResponse } from "next/server";
import {
  deleteDashboardUser,
  updateDashboardUser,
} from "@/lib/server/dashboard-data";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: {
    id?: string;
  };
};

export async function PUT(req: Request, { params }: RouteContext) {
  const id = params.id;
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

export async function DELETE(_req: Request, { params }: RouteContext) {
  const id = params.id;
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

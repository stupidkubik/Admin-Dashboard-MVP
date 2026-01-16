import { NextResponse } from "next/server";
import {
  createDashboardUser,
  getDashboardUsers,
} from "@/lib/server/dashboard-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const users = await getDashboardUsers();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const user = await createDashboardUser(body);
  return NextResponse.json({ ok: true, user }, { status: 201 });
}

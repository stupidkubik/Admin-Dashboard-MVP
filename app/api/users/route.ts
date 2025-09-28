import { NextResponse } from "next/server";
import { getDashboardUsers } from "@/lib/server/dashboard-data";

export const dynamic = "force-static";

export async function GET() {
  const users = await getDashboardUsers();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json(
    { ok: true, user: { id: crypto.randomUUID(), ...body } },
    { status: 201 },
  );
}

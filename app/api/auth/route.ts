import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ ok: true, user: { id: "1", ...body } });
}

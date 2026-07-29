import { NextResponse } from "next/server";
import { authRequestSchema } from "@/lib/api/contracts";
import { parseJsonRequest, success } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const parsed = await parseJsonRequest(req, authRequestSchema);
  if (parsed.success === false) {
    return NextResponse.json(parsed.body, { status: parsed.status });
  }

  return NextResponse.json(
    success({
      user: { id: "demo-user", email: parsed.data.email },
      demo: true,
    }),
  );
}

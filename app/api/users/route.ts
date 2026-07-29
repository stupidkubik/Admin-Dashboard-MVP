import { NextResponse } from "next/server";
import {
  createDashboardUser,
  getDashboardUsers,
} from "@/lib/server/dashboard-data";
import { createUserRequestSchema } from "@/lib/api/contracts";
import { parseJsonRequest, success } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function GET() {
  const users = await getDashboardUsers();
  return NextResponse.json(success(users));
}

export async function POST(req: Request) {
  const parsed = await parseJsonRequest(req, createUserRequestSchema);
  if (parsed.success === false) {
    return NextResponse.json(parsed.body, { status: parsed.status });
  }

  const user = await createDashboardUser(parsed.data);
  if (!user) {
    return NextResponse.json(
      {
        error: {
          code: "EMAIL_CONFLICT",
          message: "A user with this email already exists",
          fields: { email: ["A user with this email already exists"] },
        },
      },
      { status: 409 },
    );
  }

  return NextResponse.json(success({ user }), { status: 201 });
}

import { NextResponse } from "next/server";
import { createUserRequestSchema } from "@/lib/api/contracts";
import { error, parseJsonRequest, success } from "@/lib/api/response";
import { withAppServices } from "@/lib/server/withAppServices";

export const dynamic = "force-dynamic";

export async function GET() {
  return withAppServices(async (services) => {
    const users = await services.dashboard.list();
    return NextResponse.json(success(users));
  });
}

export async function POST(req: Request) {
  return withAppServices(async (services) => {
    const parsed = await parseJsonRequest(req, createUserRequestSchema);
    if (parsed.success === false) {
      return NextResponse.json(parsed.body, { status: parsed.status });
    }

    const user = await services.dashboard.create(parsed.data);
    if (!user) {
      return NextResponse.json(
        error("EMAIL_CONFLICT", "A user with this email already exists", {
          email: ["A user with this email already exists"],
        }),
        { status: 409 },
      );
    }

    return NextResponse.json(success({ user }), { status: 201 });
  });
}

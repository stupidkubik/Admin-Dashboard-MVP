import { NextResponse } from "next/server";
import { getAppServices, isRealModeNotConfigured } from "@/lib/server/services";
import { createUserRequestSchema } from "@/lib/api/contracts";
import { error, parseJsonRequest, success } from "@/lib/api/response";

export const dynamic = "force-dynamic";

export async function GET() {
  const services = getAppServices();
  if (services.mode === "real") {
    return NextResponse.json(
      error("REAL_MODE_NOT_CONFIGURED", "Real mode is not configured"),
      { status: 503 },
    );
  }

  try {
    const users = await services.dashboard.list();
    return NextResponse.json(success(users));
  } catch (error) {
    if (isRealModeNotConfigured(error)) {
      return NextResponse.json(
        { error: { code: "REAL_MODE_NOT_CONFIGURED", message: "Real mode is not configured" } },
        { status: 503 },
      );
    }
    throw error;
  }
}

export async function POST(req: Request) {
  const services = getAppServices();
  if (services.mode === "real") {
    return NextResponse.json(
      error("REAL_MODE_NOT_CONFIGURED", "Real mode is not configured"),
      { status: 503 },
    );
  }

  const parsed = await parseJsonRequest(req, createUserRequestSchema);
  if (parsed.success === false) {
    return NextResponse.json(parsed.body, { status: parsed.status });
  }

  const user = await services.dashboard.create(parsed.data);
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

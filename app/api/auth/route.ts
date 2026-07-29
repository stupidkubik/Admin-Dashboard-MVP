import { NextResponse } from "next/server";
import { authRequestSchema } from "@/lib/api/contracts";
import { error, parseJsonRequest, success } from "@/lib/api/response";
import { getAppServices, isRealModeNotConfigured } from "@/lib/server/services";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const services = getAppServices();
  if (services.mode === "real") {
    return NextResponse.json(
      error("REAL_MODE_NOT_CONFIGURED", "Real mode is not configured"),
      { status: 503 },
    );
  }

  const parsed = await parseJsonRequest(req, authRequestSchema);
  if (parsed.success === false) {
    return NextResponse.json(parsed.body, { status: parsed.status });
  }

  try {
    return NextResponse.json(success(await services.auth.authenticate(parsed.data)));
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

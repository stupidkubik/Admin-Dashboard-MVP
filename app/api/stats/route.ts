import { NextResponse } from "next/server";
import { getAppServices, isRealModeNotConfigured } from "@/lib/server/services";
import { error, success } from "@/lib/api/response";

export const dynamic = "force-static";

export async function GET() {
  const services = getAppServices();
  if (services.mode === "real") {
    return NextResponse.json(
      error("REAL_MODE_NOT_CONFIGURED", "Real mode is not configured"),
      { status: 503 },
    );
  }

  try {
    const stats = await services.dashboard.getStats();
    return NextResponse.json(success(stats));
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

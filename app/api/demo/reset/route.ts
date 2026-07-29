import { NextResponse } from "next/server";
import { error, success } from "@/lib/api/response";
import { getAppServices } from "@/lib/server/services";

export const dynamic = "force-dynamic";

export async function POST() {
  const services = getAppServices();
  if (services.mode === "real") {
    return NextResponse.json(
      error("REAL_MODE_NOT_CONFIGURED", "Real mode is not configured"),
      { status: 503 },
    );
  }

  await services.dashboard.reset();
  return NextResponse.json(success({ reset: true }));
}

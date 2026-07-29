import { NextResponse } from "next/server";
import { error, success } from "@/lib/api/response";
import { withAppServices } from "@/lib/server/withAppServices";

export const dynamic = "force-dynamic";

export async function POST() {
  return withAppServices(async (services) => {
    if (services.mode !== "demo") {
      return NextResponse.json(
        error("DEMO_ENDPOINT_DISABLED", "Demo reset is disabled"),
        { status: 404 },
      );
    }

    await services.dashboard.reset();
    return NextResponse.json(success({ reset: true }));
  });
}

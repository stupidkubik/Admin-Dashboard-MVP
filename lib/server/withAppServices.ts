import { NextResponse } from "next/server";
import { error } from "@/lib/api/response";
import { getAppServices, isRealModeNotConfigured } from "@/lib/server/services";

type AppServices = ReturnType<typeof getAppServices>;

export async function withAppServices(
  handler: (services: AppServices) => Promise<Response>,
): Promise<Response> {
  try {
    return await handler(getAppServices());
  } catch (caught) {
    if (isRealModeNotConfigured(caught)) {
      return NextResponse.json(
        error("REAL_MODE_NOT_CONFIGURED", "Real mode is not configured"),
        { status: 503 },
      );
    }

    throw caught;
  }
}

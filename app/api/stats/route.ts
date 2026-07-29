import { NextResponse } from "next/server";
import { success } from "@/lib/api/response";
import { withAppServices } from "@/lib/server/withAppServices";

export const dynamic = "force-dynamic";

export async function GET() {
  return withAppServices(async (services) => {
    const stats = await services.dashboard.getStats();
    return NextResponse.json(success(stats));
  });
}

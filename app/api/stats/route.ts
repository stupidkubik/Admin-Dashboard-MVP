import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/server/dashboard-data";
import { success } from "@/lib/api/response";

export const dynamic = "force-static";

export async function GET() {
  const stats = await getDashboardStats();
  return NextResponse.json(success(stats));
}

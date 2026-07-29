import { NextResponse } from "next/server";
import { authRequestSchema } from "@/lib/api/contracts";
import { parseJsonRequest, success } from "@/lib/api/response";
import { withAppServices } from "@/lib/server/withAppServices";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return withAppServices(async (services) => {
    const parsed = await parseJsonRequest(req, authRequestSchema);
    if (parsed.success === false) {
      return NextResponse.json(parsed.body, { status: parsed.status });
    }

    return NextResponse.json(
      success(await services.auth.authenticate(parsed.data)),
    );
  });
}

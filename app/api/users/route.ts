import { NextResponse } from "next/server";
import data from "@/mocks/data/users.json";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(data);
}

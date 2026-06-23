import { NextResponse } from "next/server";
import { fetchWorldCupMatches } from "@/lib/worldcup-api";

// 10 requests per day max = 86400 / 10 = 8640 seconds
export const revalidate = 8640;

export async function GET() {
  const matches = await fetchWorldCupMatches();
  return NextResponse.json({ matches, fetchedAt: new Date().toISOString() });
}

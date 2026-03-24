import { NextResponse } from "next/server";
import { getMergedPortfolioData } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMergedPortfolioData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load portfolio data" },
      { status: 500 }
    );
  }
}

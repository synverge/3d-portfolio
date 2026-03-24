import { NextResponse } from "next/server";
import { getKvClient, PortfolioOverride } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const kv = getKvClient();
  if (!kv) {
    return NextResponse.json({ kv: "NO CLIENT — falling back to filesystem" });
  }

  try {
    // Read actual stored data
    const stored = await kv.get<PortfolioOverride>("portfolio-override");
    return NextResponse.json({
      kv: "OK",
      stored: {
        hasData: stored !== null,
        experienceCount: stored?.experience?.length ?? "null (uses default)",
        certificatesCount: stored?.certificates?.length ?? "null (uses default)",
        projectsCount: stored?.projects?.length ?? "null (uses default)",
        raw: stored,
      },
    });
  } catch (e) {
    return NextResponse.json({ kv: "ERROR", error: String(e) });
  }
}

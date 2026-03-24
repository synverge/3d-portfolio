import { NextResponse } from "next/server";
import { readOverride } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stored = await readOverride();
    return NextResponse.json({
      kv: "OK",
      stored: {
        hasData: Object.keys(stored).length > 0,
        experienceCount: stored.experience?.length ?? "null (uses default)",
        certificatesCount: stored.certificates?.length ?? "null (uses default)",
        projectsCount: stored.projects?.length ?? "null (uses default)",
        raw: stored,
      },
    });
  } catch (e) {
    return NextResponse.json({ kv: "ERROR", error: String(e) });
  }
}

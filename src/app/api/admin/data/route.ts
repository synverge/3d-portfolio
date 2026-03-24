import { NextRequest, NextResponse } from "next/server";
import {
  readOverride,
  writeOverride,
  getMergedPortfolioData,
  PortfolioOverride,
} from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const override = await readOverride();
    const merged = await getMergedPortfolioData(override);
    return NextResponse.json({ merged, override });
  } catch {
    return NextResponse.json(
      { error: "Failed to read data" },
      { status: 500 }
    );
  }
}

const MAX_BODY_BYTES = 1_000_000; // 1 MB

export async function PUT(req: NextRequest) {
  try {
    const contentLength = Number(req.headers.get("content-length") ?? 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    const body: unknown = await req.json();
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await writeOverride(body as PortfolioOverride);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to write data" },
      { status: 500 }
    );
  }
}

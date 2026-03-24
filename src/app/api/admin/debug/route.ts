import { NextResponse } from "next/server";
import { getKvClient } from "@/lib/admin-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const url =
    process.env.KV_REST_API_URL ??
    process.env.KV_REST_API_TOKEN_KV_REST_API_URL;
  const token =
    process.env.KV_REST_API_TOKEN ??
    process.env.KV_REST_API_TOKEN_KV_REST_API_TOKEN;

  const envInfo = {
    KV_REST_API_URL: process.env.KV_REST_API_URL ? "SET" : "MISSING",
    KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? "SET" : "MISSING",
    KV_REST_API_TOKEN_KV_REST_API_URL: process.env.KV_REST_API_TOKEN_KV_REST_API_URL ? "SET" : "MISSING",
    KV_REST_API_TOKEN_KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN_KV_REST_API_TOKEN ? "SET" : "MISSING",
    resolvedUrl: url ? url.slice(0, 30) + "..." : "NONE",
    resolvedToken: token ? token.slice(0, 10) + "..." : "NONE",
  };

  const kv = getKvClient();
  if (!kv) {
    return NextResponse.json({ env: envInfo, kv: "NO CLIENT — falling back to filesystem" });
  }

  try {
    await kv.set("__debug_test__", { ok: true, ts: Date.now() });
    const read = await kv.get("__debug_test__");
    await kv.del("__debug_test__");
    return NextResponse.json({ env: envInfo, kv: "OK", testWrite: read });
  } catch (e) {
    return NextResponse.json({ env: envInfo, kv: "ERROR", error: String(e) });
  }
}

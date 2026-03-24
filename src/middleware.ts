import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_session";

// Cache the HMAC token since it's derived from static env vars
let _cachedToken: string | null = null;

async function getExpectedToken(): Promise<string> {
  if (_cachedToken) return _cachedToken;
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!password || !secret) {
    throw new Error("ADMIN_PASSWORD and ADMIN_JWT_SECRET must be configured");
  }
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(password)
  );
  _cachedToken = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return _cachedToken;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login/logout through without auth check
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api/admin/auth/")) {
    return NextResponse.next();
  }

  const isAdminUI = pathname.startsWith("/admin");
  const isAdminAPI = pathname.startsWith("/api/admin");

  if (isAdminUI || isAdminAPI) {
    const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

    if (!sessionCookie) {
      if (isAdminAPI) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const expected = await getExpectedToken().catch(() => null);
    if (!expected) {
      if (isAdminAPI) {
        return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
      }
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Constant-time comparison to prevent timing attacks
    const cookieBytes = Buffer.from(sessionCookie, "hex");
    const expectedBytes = Buffer.from(expected, "hex");
    const tokensMatch =
      cookieBytes.length === expectedBytes.length &&
      cookieBytes.every((b, i) => b === expectedBytes[i]);

    if (!tokensMatch) {
      if (isAdminAPI) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  computeSessionToken,
  ADMIN_COOKIE_NAME,
  ADMIN_COOKIE_MAX_AGE,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.ADMIN_JWT_SECRET;
    if (!adminPassword || !secret) {
      return NextResponse.json(
        { error: "Admin not configured" },
        { status: 500 }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const a = Buffer.from(typeof password === "string" ? password : "");
    const b = Buffer.from(adminPassword);
    const match = a.length === b.length && timingSafeEqual(a, b);
    if (!match) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await computeSessionToken(adminPassword, secret);

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: ADMIN_COOKIE_MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

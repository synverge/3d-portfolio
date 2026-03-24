import { EmailTemplate } from "@/components/email-template";
import { getMergedPortfolioData } from "@/lib/admin-data";
import { Resend } from "resend";
import { z } from "zod";
import { emailRatelimit } from "@/lib/ratelimit";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!").max(100, "Full name is too long!"),
  email: z.string().email({ message: "Email is invalid!" }).max(254),
  message: z.string().min(10, "Message is too short!").max(5000, "Message is too long!"),
});
export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP: 5 emails per 10 minutes
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "anonymous";
    const { success: rateLimitOk, reset } = await emailRatelimit.limit(ip);
    if (!rateLimitOk) {
      const retryAfterSecs = Math.ceil((reset - Date.now()) / 1000);
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(retryAfterSecs) } }
      );
    }

    const body = await req.json();
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = Email.safeParse(body);
    if (!zodSuccess)
      return Response.json({ error: zodError?.message }, { status: 400 });

    const { config: mergedConfig } = await getMergedPortfolioData();

    const { error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [mergedConfig.email],
      subject: "Contact me from portfolio",
      react: EmailTemplate({
        fullName: zodData.fullName,
        email: zodData.email,
        message: zodData.message,
      }),
    });

    if (resendError) {
      return Response.json({ error: "Failed to send email. Please try again later." }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}

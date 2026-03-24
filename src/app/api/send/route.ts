import { EmailTemplate } from "@/components/email-template";
import { getMergedPortfolioData } from "@/lib/admin-data";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const Email = z.object({
  fullName: z.string().min(2, "Full name is invalid!").max(100, "Full name is too long!"),
  email: z.string().email({ message: "Email is invalid!" }).max(254),
  message: z.string().min(10, "Message is too short!").max(5000, "Message is too long!"),
});
export async function POST(req: Request) {
  try {
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
      from: "Porfolio <onboarding@resend.dev>",
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

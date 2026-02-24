import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM = process.env.EMAIL_FROM ?? "noreply@handymanservices.com";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const resend = getResend();
    const result = await resend.emails.send({
      from: `Handyman Services <${FROM}>`,
      to,
      subject,
      html,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Nepavyko išsiųsti el. laiško" };
  }
}

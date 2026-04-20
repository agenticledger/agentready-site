import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company, name, email, apiDocsUrl, message } = body;

    if (!company || !name || !email) {
      return NextResponse.json(
        { error: "Company, name, and email are required." },
        { status: 400 }
      );
    }

    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      console.error("RESEND_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f8fafc; }
    .container { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #059669; padding: 32px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; }
    .body { padding: 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px; font-weight: 600; }
    .value { font-size: 16px; color: #1e293b; line-height: 1.5; }
    .divider { border: none; border-top: 1px solid #e2e8f0; margin: 24px 0; }
    .footer { padding: 16px 32px; background: #f8fafc; text-align: center; font-size: 13px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Agent Ready Inquiry</h1>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Company</div>
        <div class="value">${escapeHtml(company)}</div>
      </div>
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${escapeHtml(name)}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      ${
        apiDocsUrl
          ? `<div class="field"><div class="label">API Docs URL</div><div class="value"><a href="${escapeHtml(apiDocsUrl)}">${escapeHtml(apiDocsUrl)}</a></div></div>`
          : ""
      }
      ${
        message
          ? `<hr class="divider" /><div class="field"><div class="label">Message</div><div class="value">${escapeHtml(message)}</div></div>`
          : ""
      }
    </div>
    <div class="footer">
      Sent from agentready.agenticledger.ai
    </div>
  </div>
</body>
</html>`;

    await resend.emails.send({
      from: "Agent Ready <noreply@agenticledger.ai>",
      to: "ore@agenticledger.ai",
      subject: `Agent Ready Inquiry: ${company}`,
      html: htmlBody,
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

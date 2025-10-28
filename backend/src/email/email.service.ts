import { Inject, Injectable } from "@nestjs/common";
import type { SentMessageInfo, Transporter } from "nodemailer";

@Injectable()
export class EmailService {
  constructor(
    @Inject("MAIL_TRANSPORTER")
    private readonly transporter: Transporter,
  ) {}

  async sendMail(
    to: string,
    subject: string,
    text: string,
  ): Promise<SentMessageInfo> {
    return this.transporter.sendMail({
      from: "no-reply@example.com",
      to,
      subject,
      text,
    });
  }

  async sendOTPEmail(
    to: string,
    subject: string,
    otp: string,
  ): Promise<SentMessageInfo> {
    const html = `
      <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #eef2f7">
        <div style="text-align:center;margin-bottom:16px">
          <span style="display:inline-block;background:#0f93c3;color:#fff;padding:8px 14px;border-radius:999px;font-weight:700">Trekker</span>
        </div>
        <h2 style="color:#1b1e28;margin:0 0 8px">Mã xác thực OTP</h2>
        <p style="color:#4b5563;margin:0 0 16px">Mã OTP của bạn là:</p>
        <div style="background:#f3f4f6;border-radius:10px;padding:16px;text-align:center;margin:16px 0">
          <span style="font-size:32px;font-weight:700;letter-spacing:8px;color:#1b1e28">${otp}</span>
        </div>
        <p style="color:#6b7280;font-size:14px;margin-top:16px">
          Mã này có hiệu lực trong <strong>5 phút</strong>.
        </p>
        <p style="color:#6b7280;margin-top:8px;font-size:12px">
          Nếu bạn không yêu cầu mã này, hãy bỏ qua email.
        </p>
      </div>
    `;

    console.log(`Sending OTP ${otp} to email ${to}`);

    return this.transporter.sendMail({
      from: "Trekker <no-reply@trekker.app>",
      to,
      subject,
      html,
    });
  }
}

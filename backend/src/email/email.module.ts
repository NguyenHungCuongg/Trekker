import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { EmailService } from "./email.service";

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "MAIL_TRANSPORTER",
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        nodemailer.createTransport({
          host: config.getOrThrow<string>("SMTP_HOST"),
          port: Number(config.getOrThrow<string>("SMTP_PORT")),
          service: "gmail",
          secure: false,
          auth: {
            user: config.getOrThrow<string>("SMTP_USER"),
            pass: config.getOrThrow<string>("SMTP_PASS"),
          },
        }),
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}

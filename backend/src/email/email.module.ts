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
          host: config.getOrThrow<string>("smtp_host"),
          port: Number(config.getOrThrow<string>("smtp_port")),
          service: "gmail",
          secure: false,
          auth: {
            user: config.getOrThrow<string>("smtp_user"),
            pass: config.getOrThrow<string>("smtp_pass"),
          },
        }),
    },
    EmailService,
  ],
  exports: [EmailService],
})
export class EmailModule {}

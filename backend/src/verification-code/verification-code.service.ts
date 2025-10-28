import { Injectable } from "@nestjs/common";
import { VerificationCode } from "./verification-code.entity";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { EmailService } from "../email/email.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private readonly verificationCodeRepository: Repository<VerificationCode>,
    private readonly emailService: EmailService,
  ) {}

  generateOTP(length: number = 6): string {
    const digits = "0123456789";
    let otp = "";
    const randomBytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
      otp += digits[randomBytes[i] % 10];
    }
    return otp;
  }

  async generateAndSendOTP(email: string): Promise<void> {
    const otp = this.generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    const existedCode = await this.verificationCodeRepository.findOneBy({
      email,
    });

    const verificationCode = new VerificationCode();

    if (existedCode) {
      verificationCode.verificationId = existedCode.verificationId;
      verificationCode.email = email;
      verificationCode.code = otp;
      verificationCode.expiresAt = expiresAt;
      verificationCode.verified = false;
    }

    // Save new code if not existed
    verificationCode.email = email;
    verificationCode.code = otp;
    verificationCode.expiresAt = expiresAt;
    verificationCode.verified = false;
    await this.verificationCodeRepository.save(verificationCode);

    const subject = "Trekker - Mã Xác Thực OTP";
    await this.emailService.sendOTPEmail(email, subject, otp);
  }

  async verifyOTP(email: string, code: string): Promise<boolean> {
    const verificationCode = await this.verificationCodeRepository.findOneBy({
      email,
      code,
    });

    if (!verificationCode) throw new Error("Mã OTP không hợp lệ");

    if (verificationCode.verified) throw new Error("Mã OTP đã được sử dụng");

    if (verificationCode.expiresAt < new Date())
      throw new Error("Mã OTP đã hết hạn");

    verificationCode.verified = true;
    await this.verificationCodeRepository.save(verificationCode);
    return true;
  }
}

import { Body, Controller, Post } from "@nestjs/common";
import { VerificationCodeService } from "./verification-code.service";

@Controller("verification-code")
export class VerificationCodeController {
  constructor(
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  @Post("generate")
  async generateAndSendOTP(
    @Body("email") email: string,
  ): Promise<{ message: string }> {
    await this.verificationCodeService.generateAndSendOTP(email);
    return { message: "OTP đã được gửi" };
  }

  @Post("verify")
  async verifyOTP(
    @Body("email") email: string,
    @Body("code") code: string,
  ): Promise<{ message: string }> {
    await this.verificationCodeService.verifyOTP(email, code);
    return { message: "Xác thực OTP thành công" };
  }
}

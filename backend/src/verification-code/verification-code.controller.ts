import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { VerificationCodeService } from "./verification-code.service";
import type { Response } from "express";
import { ResponseEntity } from "src/common/dto/response-entity.dto";

@Controller("verification-code")
export class VerificationCodeController {
  constructor(
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  @Post("generate")
  async generateAndSendOTP(
    @Body("email") email: string,
  ): Promise<ResponseEntity> {
    await this.verificationCodeService.generateAndSendOTP(email);
    return ResponseEntity.success(
      "Mã OTP đã được gửi",
      { email: email },
      HttpStatus.OK,
    );
  }

  @Post("verify")
  async verifyOTP(
    @Body("email") email: string,
    @Body("code") code: string,
  ): Promise<{ message: string }> {
    await this.verificationCodeService.verifyOTP(email, code);
    return ResponseEntity.success("Xác thực thành công", {}, HttpStatus.OK);
  }
}

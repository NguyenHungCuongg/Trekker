import { Module } from "@nestjs/common";
import { VerificationCodeService } from "./verification-code.service";
import { VerificationCodeController } from "./verification-code.controller";
import { VerificationCode } from "./verification-code.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EmailModule } from "src/email/email.module";

@Module({
  imports: [TypeOrmModule.forFeature([VerificationCode]), EmailModule],
  controllers: [VerificationCodeController],
  providers: [VerificationCodeService],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}

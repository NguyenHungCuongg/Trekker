import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    UserModule,
    JwtModule.register({
      global: true, //Module này có thể được sử dụng ở bất cứ đâu trong project
      secret: "test-jwt-secret",
      signOptions: { expiresIn: "1d" }, //Token có thời hạn 1 ngày
    }),
  ],
})
export class AuthModule {}

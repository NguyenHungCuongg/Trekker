import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "src/auth/dto/register.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ResponseEntity } from "src/common/dto/response-entity.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  signup(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authService.signup(userDto);
  }

  @Post("login")
  login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Post("reset-password")
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseEntity> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}

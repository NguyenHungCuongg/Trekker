import { Controller, Post, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportLocalGuard } from "./guard/passport-local.guard";
import { PassportJwtGuard } from "./guard/passport-jwt.guard";

@Controller("auth-v2")
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @Get("me")
  @UseGuards(PassportJwtGuard)
  getUser(@Request() request) {
    return request.user;
  }
}

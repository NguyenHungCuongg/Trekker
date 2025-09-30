import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guard/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  login(@Body() inputUser: { username: string; password: string }) {
    return this.authService.authenticate(inputUser);
  }

  @UseGuards(AuthGuard)
  @Get("me")
  getUser(@Request() request) {
    return request.user;
  }
}

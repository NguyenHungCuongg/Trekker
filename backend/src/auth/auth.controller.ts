import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() inputUser: { username: string; password: string }) {
    return this.authService.authenticate(inputUser);
  }
}

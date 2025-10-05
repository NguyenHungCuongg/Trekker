import { Controller, Get, Put, Body, UseGuards, Request } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { JwtAuthGuard } from "../auth/jwt.authguard";

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get("profile")
  async getProfile(@Request() req): Promise<User> {
    return this.userService.findOne(req.user.userId);
  }

  @Put("profile")
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateProfile(req.user.userId, updateUserDto);
  }

  @Put("change-password")
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.userService.changePassword(req.user.userId, changePasswordDto);
    return { message: "Đổi mật khẩu thành công!" };
  }
}

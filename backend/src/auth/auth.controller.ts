import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "src/auth/dto/register.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { User } from "src/user/user.entity";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { ResponseEntity } from "src/common/dto/response-entity.dto";
import * as bcrypt from "bcryptjs";
import { UserRole } from "src/common/enums";
import { JwtAuthGuard } from "./jwt.authguard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Đăng ký người dùng mới" })
  @ApiResponse({
    status: 201,
    description: "Trả về người dùng đã được tạo thành công.",
    type: User,
  })
  signup(@Body() userDto: CreateUserDto): Promise<User> {
    return this.authService.signup(userDto);
  }

  @Post("login")
  @ApiOperation({ summary: "Đăng nhập người dùng" })
  @ApiResponse({
    status: 200,
    description: "Trả về access token khi đăng nhập thành công.",
  })
  login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(loginDto);
  }

  @Post("reset-password")
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseEntity> {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Get("profile")
  @ApiBearerAuth("JWT-auth")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user.userId);
  }

  // API để tạo admin user đầu tiên, code xong xóa nha ae
  @Post("create-admin")
  @ApiOperation({ summary: "Tạo tài khoản admin đầu tiên" })
  @ApiResponse({
    status: 201,
    description: "Tài khoản admin đã được tạo thành công.",
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  async createAdmin() {
    const adminExists = await this.authService.findByUsername("admin");
    if (adminExists) {
      return { message: "Admin đã tồn tại", admin: adminExists };
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash("admin123", salt);

    const adminDto: CreateUserDto = {
      username: "admin",
      password: hashedPassword,
      fullName: "Administrator",
      email: "admin@trekker.com",
      phone: "0123456789",
      role: UserRole.ADMIN,
    };

    //Dùng method mới (không hash lại password)
    const admin = await this.authService.createUserWithHashedPassword(adminDto);
    return {
      message: "Admin đã được tạo thành công",
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    };
  }
}

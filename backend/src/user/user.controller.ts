import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { JwtAuthGuard } from "../auth/jwt.authguard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/common/enums";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express/multer/interceptors/file.interceptor";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("users")
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  //user endpoints
  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy thông tin hồ sơ người dùng hiện tại" })
  @ApiResponse({
    status: 200,
    description: "Trả về thông tin hồ sơ người dùng.",
    type: User,
  })
  async getProfile(@Request() req): Promise<User> {
    return this.userService.findOne(req.user.userId);
  }

  @Put("profile")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Cập nhật thông tin hồ sơ người dùng hiện tại" })
  @ApiResponse({
    status: 200,
    description: "Trả về thông tin hồ sơ người dùng đã được cập nhật.",
    type: User,
  })
  async updateProfile(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateProfile(req.user.userId, updateUserDto);
  }

  @Put("profile/upload-image")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Tải lên ảnh đại diện cho người dùng hiện tại" })
  @ApiResponse({
    status: 200,
    description: "Trả về thông báo và URL ảnh đại diện đã được tải lên.",
  })
  @UseInterceptors(FileInterceptor("file"))
  async uploadProfileImage(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string; imageUrl: string }> {
    if (!file) {
      throw new BadRequestException("File không được để trống");
    }
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        "Chỉ chấp nhận các file ảnh định dạng JPEG, JPG, PNG",
      );
    }

    //Giới hạn dung lượng
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException("Kích thước file không được vượt quá 5MB");
    }
    const user = await this.userService.findOne(req.user.userId);

    //Nếu đã có ảnh cũ thì xóa ảnh cũ
    if (user.profileImage) {
      try {
        const publicId = this.cloudinaryService.extractPublicId(
          user.profileImage,
        );
        await this.cloudinaryService.deleteImage(publicId);
      } catch (error) {
        console.error("Lỗi khi xóa ảnh cũ: ", error);
      }
    }

    const result = await this.cloudinaryService.uploadImage(
      file,
      "trekker/profiles",
    );

    await this.userService.updateProfile(req.user.userId, {
      profileImage: result.secure_url,
    });

    return {
      message: "Upload ảnh đại diện thành công",
      imageUrl: result.secure_url,
    };
  }

  @Put("change-password")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Đổi mật khẩu cho người dùng hiện tại" })
  @ApiResponse({
    status: 200,
    description: "Trả về thông báo đổi mật khẩu thành công.",
  })
  async changePassword(
    @Request() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.userService.changePassword(req.user.userId, changePasswordDto);
    return { message: "Đổi mật khẩu thành công!" };
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Lấy danh sách tất cả các người dùng (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách tất cả các người dùng.",
    type: [User],
  })
  @Roles(UserRole.ADMIN)
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Lấy chi tiết người dùng theo ID (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết người dùng.",
    type: User,
  })
  @Roles(UserRole.ADMIN)
  async findUserById(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put("admin/:id")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Cập nhật thông tin người dùng (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về người dùng đã được cập nhật.",
    type: User,
  })
  @Roles(UserRole.ADMIN)
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateProfile(id, updateUserDto);
  }

  @Put("admin/:id/role")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Cập nhật vai trò người dùng (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về người dùng đã được cập nhật vai trò.",
    type: User,
  })
  @Roles(UserRole.ADMIN)
  async updateUserRole(
    @Param("id", ParseIntPipe) id: number,
    @Body("role") role: UserRole,
  ): Promise<User> {
    return this.userService.updateRole(id, role);
  }

  @Delete("admin/:id")
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: "Xóa người dùng (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về thông báo người dùng đã được xóa.",
  })
  @Roles(UserRole.ADMIN)
  async deleteUser(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.userService.remove(id);
    return { message: "Người dùng đã được xóa thành công" };
  }

  @Post("check-email")
  @ApiOperation({ summary: "Kiểm tra sự tồn tại của email" })
  @ApiResponse({
    status: 200,
    description: "Trả về kết quả kiểm tra sự tồn tại của email.",
  })
  async checkEmail(@Body("email") email: string): Promise<{ exists: boolean }> {
    const exists = await this.userService.isEmailExists(email);
    return { exists };
  }
}

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

@Controller("users")
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

  //user endpoints
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

  @Put("profile/upload-image")
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
  @Roles(UserRole.ADMIN)
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async findUserById(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put("admin/:id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateProfile(id, updateUserDto);
  }

  @Put("admin/:id/role")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUserRole(
    @Param("id", ParseIntPipe) id: number,
    @Body("role") role: UserRole,
  ): Promise<User> {
    return this.userService.updateRole(id, role);
  }

  @Delete("admin/:id")
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteUser(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.userService.remove(id);
    return { message: "Người dùng đã được xóa thành công" };
  }
}

// ...existing code...
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/auth/dto/register.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { ResponseEntity } from "src/common/dto/response-entity.dto";
import axios from "axios";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(userDTO: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepository.save(userDTO);
    return user;
  }

  async login(loginDTO: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByLoginDTO(loginDTO);
    const isMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (isMatch) {
      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException("Thông tin đăng nhập không hợp lệ");
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<ResponseEntity> {
    const { email, newPassword } = resetPasswordDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("Email không tồn tại trong hệ thống");
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);

    await this.userRepository.save(user);

    return ResponseEntity.success("Đặt lại mật khẩu thành công");
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  //Method tạm thời để tạo admin: Tạo user với password đã hash (dùng trong create-admin). Lúc sau xóa nha
  async createUserWithHashedPassword(userDTO: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(userDTO);
    return user;
  }

  /**
   * Xác thực Google access token từ mobile app
   * Verify token với Google API và trả về user info
   */
  async validateGoogleToken(accessToken: string): Promise<any> {
    try {
      // Verify token với Google API
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const googleUser = response.data;

      if (!googleUser.email) {
        throw new BadRequestException("Invalid Google token");
      }

      return this.handleGoogleUser(googleUser);
    } catch (error) {
      console.error("Google token validation error:", error);
      throw new UnauthorizedException("Invalid Google token");
    }
  }

  /**
   * Xử lý Google user: tạo mới hoặc login
   * Supports account linking nếu email đã tồn tại
   */
  private async handleGoogleUser(googleUser: any): Promise<any> {
    const { sub: googleId, email, name, picture } = googleUser;

    // Tìm user theo Google ID
    let user = await this.userRepository.findOne({ where: { googleId } });

    if (!user) {
      // Kiểm tra xem email đã tồn tại chưa (có thể user đã đăng ký bằng local)
      const existingUser = await this.userRepository.findOne({
        where: { email },
      });

      if (existingUser) {
        // Email đã tồn tại nhưng chưa liên kết Google
        // Tự động link Google account
        existingUser.googleId = googleId;
        existingUser.profileImage = picture || existingUser.profileImage;
        existingUser.authProvider = "google";
        existingUser.fullName = name || existingUser.fullName;
        user = await this.userRepository.save(existingUser);
      } else {
        // Tạo user mới từ Google
        const username = this.generateUsernameFromEmail(email);
        const phone = this.generatePhoneNumber(); // Generate temporary phone
        user = this.userRepository.create({
          googleId,
          email,
          fullName: name,
          username,
          phone,
          profileImage: picture,
          authProvider: "google",
          // password: undefined (không set, để nullable)
        });
        user = await this.userRepository.save(user);
      }
    } else {
      // User đã tồn tại, cập nhật profile image nếu có thay đổi
      if (user.profileImage !== picture && picture) {
        user.profileImage = picture;
        user = await this.userRepository.save(user);
      }
    }

    // Tạo JWT token
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        profileImage: user.profileImage,
        role: user.role,
        authProvider: user.authProvider,
      },
    };
  }

  //Generate unique username từ email
  private generateUsernameFromEmail(email: string): string {
    const baseUsername = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "");
    const timestamp = Date.now();
    return `${baseUsername}_${timestamp}`;
  }

  //Generate temporary phone number cho Google OAuth users
  private generatePhoneNumber(): string {
    const timestamp = Date.now().toString();
    return `099${timestamp.slice(-8)}`; // Format: 099xxxxxxxx
  }
}

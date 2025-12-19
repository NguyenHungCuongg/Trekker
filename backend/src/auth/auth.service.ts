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
import { ConfigService } from "@nestjs/config";
import { google } from "googleapis";
@Injectable()
export class AuthService {
  private readonly oauth2Client;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      this.configService.getOrThrow<string>("googleOAuth.clientId"),
      this.configService.getOrThrow<string>("googleOAuth.clientSecret"),
      this.configService.getOrThrow<string>("googleOAuth.redirectUri"),
    );
  }

  async googleLogin(code: string) {
    try {
      // 1. Trao đổi Code lấy Access Token
      const { tokens } = await this.oauth2Client.getToken(code);
      this.oauth2Client.setCredentials(tokens);

      // 2. Lấy thông tin người dùng
      const oauth2 = google.oauth2({
        auth: this.oauth2Client,
        version: "v2",
      });

      const { data } = await oauth2.userinfo.get();

      const userProfile = {
        id: data.id,
        email: data.email,
        name: data.name,
        picture: data.picture,
        // ... (các thông tin khác)
      };

      // 3. Xử lý Logic Đăng nhập/Đăng ký (DB, tạo JWT)
      // Nếu Google không trả email thì không thể đăng nhập
      if (!userProfile.email) {
        throw new UnauthorizedException("Google account has no email");
      }

      // Tìm hoặc tạo user dựa trên email
      let user = await this.userRepository.findOne({
        where: { email: userProfile.email },
      });

      if (!user) {
        // tạo user mới tối giản nếu chưa tồn tại
        user = await this.userRepository.save({
          email: userProfile.email,
          username: userProfile.name ?? userProfile.email,
          password: "", // OAuth users can have empty password or random token; adjust as needed
        } as User);
      }

      // Tạo JWT
      const jwtToken = this.jwtService.sign({
        email: user.email,
        sub: user.id,
        name: user.username,
      });

      return {
        message: "Đăng nhập thành công",
        user: userProfile,
        accessToken: jwtToken,
      };
    } catch (error) {
      console.error("Lỗi trong quá trình đăng nhập Google:", error);
      throw new UnauthorizedException("Xác thực Google thất bại.");
    }
  }

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

  async getProfile(userId: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException("Người dùng không tồn tại");
    }
    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  //Method tạm thời để tạo admin: Tạo user với password đã hash (dùng trong create-admin). Lúc sau xóa nha
  async createUserWithHashedPassword(userDTO: CreateUserDto): Promise<User> {
    const user = await this.userRepository.save(userDTO);
    return user;
  }
}

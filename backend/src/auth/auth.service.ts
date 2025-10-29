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
      const payload = { username: user.username, sub: user.id };
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
}

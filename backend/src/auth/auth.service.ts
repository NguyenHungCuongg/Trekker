import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/auth/dto/register.dto";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import bcrypt from "bcryptjs";
import { LoginDto } from "./dto/login.dto";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(userDTO: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepository.save(userDTO);
    //delete user.password;
    return user;
  }

  async login(loginDTO: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(loginDTO);
    const isMatch = await bcrypt.compare(loginDTO.password, user.password);
    if (isMatch) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}

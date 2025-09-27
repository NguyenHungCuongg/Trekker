import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/user/user.service";

type requestUser = {
  username: string;
  password: string;
};

type responseUser = {
  userId: number;
  username: string;
};

type authResult = {
  accessToken: string;
  userId: number;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async authenticate(user: requestUser): Promise<authResult | null> {
    const validatedUser = await this.validateUser(user);
    if (!validatedUser) {
      throw new UnauthorizedException("Thông tin đăng nhập không hợp lệ");
    }

    return {
      accessToken: "test-jwt-token",
      userId: validatedUser.userId,
      username: validatedUser.username,
    };
  }

  async validateUser(user: requestUser): Promise<responseUser | null> {
    const validatedUser = await this.userService.findUserByUsername(
      user.username,
    );

    if (validatedUser?.password !== user.password) {
      throw new UnauthorizedException("Thông tin đăng nhập không hợp lệ");
    }
    return {
      userId: validatedUser.userId,
      username: validatedUser.username,
    }; //Ta không thể return validatedUser vì nó có password
  }
}

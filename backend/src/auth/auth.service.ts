import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";

type inputUser = {
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

  async authenticate(user: inputUser): Promise<authResult | null> {
    console.log("Đang xác thực người dùng:", user);

    const validatedUser = await this.validateUser(user);
    if (!validatedUser) {
      return null;
    }

    return {
      accessToken: "test-jwt-token",
      userId: validatedUser.userId,
      username: validatedUser.username,
    };
  }

  async validateUser(user: inputUser): Promise<responseUser | null> {
    const validatedUser = await this.userService.findUserByUsername(
      user.username,
    );

    if (validatedUser?.password !== user.password) {
      return null;
    }
    return {
      userId: validatedUser.userId,
      username: validatedUser.username,
    }; //Ta không thể return validatedUser vì nó có password
  }
}

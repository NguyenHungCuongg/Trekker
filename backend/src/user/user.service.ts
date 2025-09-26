import { Injectable } from "@nestjs/common";

type user = {
  userId: number;
  username: string;
  password: string;
};

@Injectable()
export class UserService {
  async findUserByUsername(username: string): Promise<user | null> {
    const user = { userId: 1, username: "testuser", password: "testpass" };
    return user.username === username ? user : null;
  }
}

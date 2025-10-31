import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { UserRole } from "../common/enums";
import bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ["bookings", "reviews"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ["bookings", "reviews"],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findUserByLoginDTO(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({
      username: data.username,
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.username !== undefined) {
      if (updateUserDto.username) {
        const existingUser = await this.userRepository.findOne({
          where: { username: updateUserDto.username },
        });
        if (existingUser && existingUser.id !== id) {
          throw new BadRequestException("Tên đăng nhập đã được sử dụng");
        }
      }
      user.username = updateUserDto.username;
    }

    if (updateUserDto.fullName !== undefined) {
      user.fullName = updateUserDto.fullName;
    }

    if (updateUserDto.phone !== undefined) {
      if (updateUserDto.phone) {
        const existingUser = await this.userRepository.findOne({
          where: { phone: updateUserDto.phone },
        });
        if (existingUser && existingUser.id !== id) {
          throw new BadRequestException("Số điện thoại đã được sử dụng");
        }
        user.phone = updateUserDto.phone;
      }
    }

    if (updateUserDto.email !== undefined) {
      if (updateUserDto.email) {
        const existingUser = await this.userRepository.findOne({
          where: { email: updateUserDto.email },
        });
        if (existingUser && existingUser.id !== id) {
          throw new BadRequestException("Email đã được sử dụng");
        }
        user.email = updateUserDto.email;
      }
    }

    if (updateUserDto.role !== undefined) {
      user.role = updateUserDto.role;
    }

    if (updateUserDto.profileImage !== undefined) {
      user.profileImage = updateUserDto.profileImage;
    }

    return this.userRepository.save(user);
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ["id", "password"],
    });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với id ${id}`);
    }
    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException("Mật khẩu hiện tại không đúng");
    }

    const saltRounds = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      saltRounds,
    );
    await this.userRepository.update(id, { password: hashedNewPassword });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async updateRole(id: number, role: UserRole): Promise<User> {
    const user = await this.findOne(id);
    user.role = role;
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(data: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOneBy({
      username: data.username,
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}

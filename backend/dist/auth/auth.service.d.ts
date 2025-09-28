import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
export declare class AuthService {
    private userRepository;
    private userService;
    private jwtService;
    constructor(userRepository: Repository<User>, userService: UserService, jwtService: JwtService);
    signup(userDTO: CreateUserDto): Promise<User>;
    login(loginDTO: LoginDto): Promise<{
        access_token: string;
    }>;
}

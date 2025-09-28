import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(userDto: CreateUserDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
}

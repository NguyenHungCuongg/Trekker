import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<User>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<User>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}

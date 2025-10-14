import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(id: number): Promise<User>;
    findUserByLoginDTO(data: Partial<User>): Promise<User>;
    updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<User>;
    changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<void>;
    findByUsername(username: string): Promise<User | null>;
}

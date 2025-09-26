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
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    authenticate(user: inputUser): Promise<authResult | null>;
    validateUser(user: inputUser): Promise<responseUser | null>;
}
export {};

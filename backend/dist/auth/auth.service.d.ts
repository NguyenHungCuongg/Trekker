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
export declare class AuthService {
    private userService;
    constructor(userService: UserService);
    authenticate(user: requestUser): Promise<authResult | null>;
    validateUser(user: requestUser): Promise<responseUser | null>;
}
export {};

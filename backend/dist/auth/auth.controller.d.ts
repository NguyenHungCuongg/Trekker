import { AuthService } from "./auth.service";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(inputUser: {
        username: string;
        password: string;
    }): Promise<{
        accessToken: string;
        userId: number;
        username: string;
    } | null>;
    getUser(request: any): any;
}

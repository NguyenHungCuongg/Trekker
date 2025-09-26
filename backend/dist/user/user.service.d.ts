type user = {
    userId: number;
    username: string;
    password: string;
};
export declare class UserService {
    findUserByUsername(username: string): Promise<user | null>;
}
export {};

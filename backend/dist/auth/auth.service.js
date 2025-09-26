"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async authenticate(user) {
        console.log("Đang xác thực người dùng:", user);
        const validatedUser = await this.validateUser(user);
        if (!validatedUser) {
            return null;
        }
        return {
            accessToken: "test-jwt-token",
            userId: validatedUser.userId,
            username: validatedUser.username,
        };
    }
    async validateUser(user) {
        const validatedUser = await this.userService.findUserByUsername(user.username);
        if (validatedUser?.password !== user.password) {
            return null;
        }
        return {
            userId: validatedUser.userId,
            username: validatedUser.username,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
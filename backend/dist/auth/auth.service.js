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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const typeorm_2 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_service_1 = require("../user/user.service");
const jwt_service_1 = require("@nestjs/jwt/dist/jwt.service");
let AuthService = class AuthService {
    userRepository;
    userService;
    jwtService;
    constructor(userRepository, userService, jwtService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signup(userDTO) {
        const salt = await bcryptjs_1.default.genSalt();
        userDTO.password = await bcryptjs_1.default.hash(userDTO.password, salt);
        const user = await this.userRepository.save(userDTO);
        return user;
    }
    async login(loginDTO) {
        const user = await this.userService.findOne(loginDTO);
        const isMatch = await bcryptjs_1.default.compare(loginDTO.password, user.password);
        if (isMatch) {
            const payload = { username: user.username, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }
        else {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        jwt_service_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
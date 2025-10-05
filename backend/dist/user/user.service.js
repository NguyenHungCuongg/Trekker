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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findOne(id) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ["bookings", "reviews"],
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findUserByLoginDTO(data) {
        const user = await this.userRepository.findOneBy({
            username: data.username,
        });
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        return user;
    }
    async updateProfile(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.username !== undefined) {
            if (updateUserDto.username) {
                const existingUser = await this.userRepository.findOne({
                    where: { username: updateUserDto.username },
                });
                if (existingUser && existingUser.id !== id) {
                    throw new common_1.BadRequestException("Tên đăng nhập đã được sử dụng");
                }
            }
            user.username = updateUserDto.username;
        }
        if (updateUserDto.fullName !== undefined) {
            user.fullName = updateUserDto.fullName;
        }
        if (updateUserDto.phone !== undefined) {
            if (updateUserDto.phone) {
                const existingUser = await this.userRepository.findOne({
                    where: { phone: updateUserDto.phone },
                });
                if (existingUser && existingUser.id !== id) {
                    throw new common_1.BadRequestException("Số điện thoại đã được sử dụng");
                }
                user.phone = updateUserDto.phone;
            }
        }
        return this.userRepository.save(user);
    }
    async changePassword(id, changePasswordDto) {
        const user = await this.userRepository.findOne({
            where: { id },
            select: ["id", "password"],
        });
        if (!user) {
            throw new common_1.NotFoundException(`Không tìm thấy người dùng với id ${id}`);
        }
        const isCurrentPasswordValid = await bcryptjs_1.default.compare(changePasswordDto.currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            throw new common_1.BadRequestException("Mật khẩu hiện tại không đúng");
        }
        const saltRounds = await bcryptjs_1.default.genSalt();
        const hashedNewPassword = await bcryptjs_1.default.hash(changePasswordDto.newPassword, saltRounds);
        await this.userRepository.update(id, { password: hashedNewPassword });
    }
    async findByUsername(username) {
        return this.userRepository.findOne({ where: { username } });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map
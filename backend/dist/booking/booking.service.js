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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const booking_entity_1 = require("./booking.entity");
const enums_1 = require("../common/enums");
let BookingService = class BookingService {
    bookingRepository;
    constructor(bookingRepository) {
        this.bookingRepository = bookingRepository;
    }
    async findAll(userId) {
        const whereCondition = userId ? { userId } : {};
        return this.bookingRepository.find({
            where: whereCondition,
            relations: ["user", "payments", "invoices"],
            order: { createdAt: "DESC" },
        });
    }
    async findOne(id, userId) {
        const whereCondition = userId ? { id, userId } : { id };
        const booking = await this.bookingRepository.findOne({
            where: whereCondition,
            relations: ["user", "payments", "invoices"],
        });
        if (!booking) {
            throw new common_1.NotFoundException(`Không tìm thấy đặt chỗ với id ${id}`);
        }
        return booking;
    }
    async create(createBookingDto) {
        if (createBookingDto.startDate >= createBookingDto.endDate) {
            throw new common_1.BadRequestException("Ngày kết thúc phải sau ngày bắt đầu");
        }
        const booking = this.bookingRepository.create({
            ...createBookingDto,
            status: enums_1.BookingStatus.CONFIRMED,
        });
        return this.bookingRepository.save(booking);
    }
    async remove(id, userId) {
        const booking = await this.findOne(id, userId);
        await this.bookingRepository.remove(booking);
    }
    async cancel(id, userId) {
        const booking = await this.findOne(id, userId);
        if (booking.status === enums_1.BookingStatus.CANCELLED) {
            throw new common_1.BadRequestException("Đặt chỗ đã bị hủy");
        }
        booking.status = enums_1.BookingStatus.CANCELLED;
        return this.bookingRepository.save(booking);
    }
    async findByUserId(userId) {
        return this.findAll(userId);
    }
    async count(userId) {
        const whereCondition = userId ? { userId } : {};
        return this.bookingRepository.count({ where: whereCondition });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(booking_entity_1.Booking)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookingService);
//# sourceMappingURL=booking.service.js.map
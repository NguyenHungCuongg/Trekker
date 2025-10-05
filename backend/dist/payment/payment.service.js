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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./payment.entity");
const enums_1 = require("../common/enums");
let PaymentService = class PaymentService {
    paymentRepository;
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async findAll(userId) {
        const query = this.paymentRepository
            .createQueryBuilder("payment")
            .leftJoinAndSelect("payment.booking", "booking")
            .leftJoinAndSelect("booking.user", "user");
        if (userId) {
            query.where("booking.userId = :userId", { userId });
        }
        return query.orderBy("payment.paidAt", "DESC").getMany();
    }
    async findOne(id, userId) {
        const query = this.paymentRepository
            .createQueryBuilder("payment")
            .leftJoinAndSelect("payment.booking", "booking")
            .leftJoinAndSelect("booking.user", "user")
            .where("payment.id = :id", { id });
        if (userId) {
            query.andWhere("booking.userId = :userId", { userId });
        }
        const payment = await query.getOne();
        if (!payment) {
            throw new common_1.NotFoundException(`Không tìm thấy thanh toán với id ${id}`);
        }
        return payment;
    }
    async create(createPaymentDto) {
        const payment = this.paymentRepository.create({
            ...createPaymentDto,
            status: enums_1.PaymentStatus.PENDING,
        });
        return this.paymentRepository.save(payment);
    }
    async markAsPaid(id) {
        const payment = await this.findOne(id);
        payment.status = enums_1.PaymentStatus.PAID;
        payment.paidAt = new Date();
        return this.paymentRepository.save(payment);
    }
    async markAsFailed(id) {
        const payment = await this.findOne(id);
        payment.status = enums_1.PaymentStatus.FAILED;
        return this.paymentRepository.save(payment);
    }
    async findByBookingId(bookingId) {
        return this.paymentRepository.find({
            where: { bookingId },
            relations: ["booking"],
            order: { paidAt: "DESC" },
        });
    }
    async count(userId) {
        const query = this.paymentRepository
            .createQueryBuilder("payment")
            .leftJoin("payment.booking", "booking");
        if (userId) {
            query.where("booking.userId = :userId", { userId });
        }
        return query.getCount();
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map
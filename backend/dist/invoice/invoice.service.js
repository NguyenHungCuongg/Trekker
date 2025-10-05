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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const invoice_entity_1 = require("./invoice.entity");
let InvoiceService = class InvoiceService {
    invoiceRepository;
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    async findAll(userId) {
        const query = this.invoiceRepository
            .createQueryBuilder("invoice")
            .leftJoinAndSelect("invoice.booking", "booking")
            .leftJoinAndSelect("booking.user", "user");
        if (userId) {
            query.where("booking.userId = :userId", { userId });
        }
        return query.orderBy("invoice.createdAt", "DESC").getMany();
    }
    async findOne(id, userId) {
        const query = this.invoiceRepository
            .createQueryBuilder("invoice")
            .leftJoinAndSelect("invoice.booking", "booking")
            .leftJoinAndSelect("booking.user", "user")
            .where("invoice.id = :id", { id });
        if (userId) {
            query.andWhere("booking.userId = :userId", { userId });
        }
        const invoice = await query.getOne();
        if (!invoice) {
            throw new common_1.NotFoundException(`Không tìm thấy Id ${id}`);
        }
        return invoice;
    }
    async findByBookingId(bookingId, userId) {
        const query = this.invoiceRepository
            .createQueryBuilder("invoice")
            .leftJoinAndSelect("invoice.booking", "booking")
            .leftJoinAndSelect("booking.user", "user")
            .where("booking.id = :bookingId", { bookingId });
        if (userId) {
            query.andWhere("booking.userId = :userId", { userId });
        }
        return query.getMany();
    }
    async create(bookingId, totalAmount, details) {
        const invoice = this.invoiceRepository.create({
            bookingId,
            totalAmount,
            details: details,
        });
        return this.invoiceRepository.save(invoice);
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(invoice_entity_1.Invoice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map
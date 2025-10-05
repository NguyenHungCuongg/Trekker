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
exports.Booking = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const payment_entity_1 = require("../payment/payment.entity");
const invoice_entity_1 = require("../invoice/invoice.entity");
const enums_1 = require("../common/enums");
let Booking = class Booking {
    id;
    userId;
    serviceType;
    serviceId;
    startDate;
    endDate;
    quantity;
    totalPrice;
    status;
    createdAt;
    user;
    payments;
    invoices;
};
exports.Booking = Booking;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "booking_id" }),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", Number)
], Booking.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "service_type",
        type: "enum",
        enum: enums_1.ServiceType,
    }),
    __metadata("design:type", String)
], Booking.prototype, "serviceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "service_id" }),
    __metadata("design:type", Number)
], Booking.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_date", type: "date", nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_date", type: "date", nullable: true }),
    __metadata("design:type", Date)
], Booking.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_price", type: "double precision", nullable: true }),
    __metadata("design:type", Number)
], Booking.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: enums_1.BookingStatus,
        default: enums_1.BookingStatus.CONFIRMED,
    }),
    __metadata("design:type", String)
], Booking.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Booking.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.bookings, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Booking.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_1.Payment, (payment) => payment.booking),
    __metadata("design:type", Array)
], Booking.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invoice_entity_1.Invoice, (invoice) => invoice.booking),
    __metadata("design:type", Array)
], Booking.prototype, "invoices", void 0);
exports.Booking = Booking = __decorate([
    (0, typeorm_1.Entity)("bookings")
], Booking);
//# sourceMappingURL=booking.entity.js.map
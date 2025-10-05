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
exports.Invoice = void 0;
const typeorm_1 = require("typeorm");
const booking_entity_1 = require("../booking/booking.entity");
let Invoice = class Invoice {
    id;
    bookingId;
    totalAmount;
    createdAt;
    details;
    booking;
};
exports.Invoice = Invoice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "invoice_id" }),
    __metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "booking_id" }),
    __metadata("design:type", Number)
], Invoice.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_amount", type: "double precision" }),
    __metadata("design:type", Number)
], Invoice.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Invoice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Invoice.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => booking_entity_1.Booking, (booking) => booking.invoices, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "booking_id" }),
    __metadata("design:type", booking_entity_1.Booking)
], Invoice.prototype, "booking", void 0);
exports.Invoice = Invoice = __decorate([
    (0, typeorm_1.Entity)("invoices")
], Invoice);
//# sourceMappingURL=invoice.entity.js.map
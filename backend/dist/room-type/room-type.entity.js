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
exports.RoomType = void 0;
const typeorm_1 = require("typeorm");
const accommodation_entity_1 = require("../accommodation/accommodation.entity");
let RoomType = class RoomType {
    id;
    accommodationId;
    name;
    capacity;
    price;
    amenities;
    description;
    accommodation;
};
exports.RoomType = RoomType;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "room_type_id" }),
    __metadata("design:type", Number)
], RoomType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "accommodation_id" }),
    __metadata("design:type", Number)
], RoomType.prototype, "accommodationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], RoomType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], RoomType.prototype, "capacity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double precision", nullable: true }),
    __metadata("design:type", Number)
], RoomType.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], RoomType.prototype, "amenities", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], RoomType.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accommodation_entity_1.Accommodation, (accommodation) => accommodation.roomTypes, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "accommodation_id" }),
    __metadata("design:type", accommodation_entity_1.Accommodation)
], RoomType.prototype, "accommodation", void 0);
exports.RoomType = RoomType = __decorate([
    (0, typeorm_1.Entity)("room_types")
], RoomType);
//# sourceMappingURL=room-type.entity.js.map
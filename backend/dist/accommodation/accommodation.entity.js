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
exports.Accommodation = void 0;
const typeorm_1 = require("typeorm");
const location_entity_1 = require("../location/location.entity");
const room_type_entity_1 = require("../room-type/room-type.entity");
let Accommodation = class Accommodation {
    id;
    locationId;
    name;
    description;
    rating;
    phone;
    email;
    address;
    location;
    roomTypes;
};
exports.Accommodation = Accommodation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "accommodation_id" }),
    __metadata("design:type", Number)
], Accommodation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "location_id" }),
    __metadata("design:type", Number)
], Accommodation.prototype, "locationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Accommodation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Accommodation.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true }),
    __metadata("design:type", Number)
], Accommodation.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Accommodation.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Accommodation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Accommodation.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, (location) => location.accommodations, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "location_id" }),
    __metadata("design:type", location_entity_1.Location)
], Accommodation.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => room_type_entity_1.RoomType, (roomType) => roomType.accommodation),
    __metadata("design:type", Array)
], Accommodation.prototype, "roomTypes", void 0);
exports.Accommodation = Accommodation = __decorate([
    (0, typeorm_1.Entity)("accommodations")
], Accommodation);
//# sourceMappingURL=accommodation.entity.js.map
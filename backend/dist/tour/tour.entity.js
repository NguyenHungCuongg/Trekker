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
exports.Tour = void 0;
const typeorm_1 = require("typeorm");
const location_entity_1 = require("../location/location.entity");
const destination_entity_1 = require("../destination/destination.entity");
let Tour = class Tour {
    id;
    locationId;
    name;
    description;
    duration;
    price;
    rating;
    startDate;
    endDate;
    maxGuests;
    location;
    destinations;
};
exports.Tour = Tour;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "tour_id" }),
    __metadata("design:type", Number)
], Tour.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "location_id" }),
    __metadata("design:type", Number)
], Tour.prototype, "locationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Tour.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Tour.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Tour.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double precision", nullable: true }),
    __metadata("design:type", Number)
], Tour.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float", nullable: true }),
    __metadata("design:type", Number)
], Tour.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "start_date", type: "date", nullable: true }),
    __metadata("design:type", Date)
], Tour.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "end_date", type: "date", nullable: true }),
    __metadata("design:type", Date)
], Tour.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "max_guests", nullable: true }),
    __metadata("design:type", Number)
], Tour.prototype, "maxGuests", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, (location) => location.tours, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "location_id" }),
    __metadata("design:type", location_entity_1.Location)
], Tour.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => destination_entity_1.Destination, (destination) => destination.tours),
    (0, typeorm_1.JoinTable)({
        name: "tour_destination",
        joinColumn: { name: "tour_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "destination_id", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Tour.prototype, "destinations", void 0);
exports.Tour = Tour = __decorate([
    (0, typeorm_1.Entity)("tours")
], Tour);
//# sourceMappingURL=tour.entity.js.map
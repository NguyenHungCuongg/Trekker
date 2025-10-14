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
exports.Location = void 0;
const typeorm_1 = require("typeorm");
const destination_entity_1 = require("../destination/destination.entity");
const tour_entity_1 = require("../tour/tour.entity");
const accommodation_entity_1 = require("../accommodation/accommodation.entity");
let Location = class Location {
    id;
    name;
    description;
    destinations;
    tours;
    accommodations;
};
exports.Location = Location;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "location_id" }),
    __metadata("design:type", Number)
], Location.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Location.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Location.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => destination_entity_1.Destination, (destination) => destination.location),
    __metadata("design:type", Array)
], Location.prototype, "destinations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tour_entity_1.Tour, (tour) => tour.location),
    __metadata("design:type", Array)
], Location.prototype, "tours", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => accommodation_entity_1.Accommodation, (accommodation) => accommodation.location),
    __metadata("design:type", Array)
], Location.prototype, "accommodations", void 0);
exports.Location = Location = __decorate([
    (0, typeorm_1.Entity)("locations")
], Location);
//# sourceMappingURL=location.entity.js.map
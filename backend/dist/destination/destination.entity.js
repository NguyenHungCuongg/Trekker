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
exports.Destination = void 0;
const typeorm_1 = require("typeorm");
const location_entity_1 = require("../location/location.entity");
const tour_entity_1 = require("../tour/tour.entity");
let Destination = class Destination {
    id;
    name;
    locationId;
    location;
    tours;
};
exports.Destination = Destination;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "destination_id" }),
    __metadata("design:type", Number)
], Destination.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Destination.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "location_id" }),
    __metadata("design:type", Number)
], Destination.prototype, "locationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => location_entity_1.Location, (location) => location.destinations, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "location_id" }),
    __metadata("design:type", location_entity_1.Location)
], Destination.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tour_entity_1.Tour, (tour) => tour.destinations),
    __metadata("design:type", Array)
], Destination.prototype, "tours", void 0);
exports.Destination = Destination = __decorate([
    (0, typeorm_1.Entity)("destinations")
], Destination);
//# sourceMappingURL=destination.entity.js.map
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
exports.AccommodationController = void 0;
const common_1 = require("@nestjs/common");
const accommodation_service_1 = require("./accommodation.service");
const search_accommodation_dto_1 = require("./dto/search-accommodation.dto");
let AccommodationController = class AccommodationController {
    accommodationService;
    constructor(accommodationService) {
        this.accommodationService = accommodationService;
    }
    async findAll(locationId) {
        if (locationId) {
            return this.accommodationService.findByLocationId(locationId);
        }
        return this.accommodationService.findAll();
    }
    async search(searchDto) {
        return this.accommodationService.search(searchDto);
    }
    async findOne(id) {
        return this.accommodationService.findOne(id);
    }
    async findRoomTypes(id) {
        const accommodation = await this.accommodationService.findOne(id);
        return accommodation.roomTypes;
    }
};
exports.AccommodationController = AccommodationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("locationId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("search"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_accommodation_dto_1.SearchAccommodationDto]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(":id/room-types"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AccommodationController.prototype, "findRoomTypes", null);
exports.AccommodationController = AccommodationController = __decorate([
    (0, common_1.Controller)("accommodations"),
    __metadata("design:paramtypes", [accommodation_service_1.AccommodationService])
], AccommodationController);
//# sourceMappingURL=accommodation.controller.js.map
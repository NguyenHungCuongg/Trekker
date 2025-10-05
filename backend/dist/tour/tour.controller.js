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
exports.TourController = void 0;
const common_1 = require("@nestjs/common");
const tour_service_1 = require("./tour.service");
const search_tour_dto_1 = require("./dto/search-tour.dto");
let TourController = class TourController {
    tourService;
    constructor(tourService) {
        this.tourService = tourService;
    }
    async findAll(locationId) {
        if (locationId) {
            return this.tourService.findByLocationId(locationId);
        }
        return this.tourService.findAll();
    }
    async search(searchDto) {
        return this.tourService.search(searchDto);
    }
    async findOne(id) {
        return this.tourService.findOne(id);
    }
};
exports.TourController = TourController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("locationId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("search"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_tour_dto_1.SearchTourDto]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TourController.prototype, "findOne", null);
exports.TourController = TourController = __decorate([
    (0, common_1.Controller)("tours"),
    __metadata("design:paramtypes", [tour_service_1.TourService])
], TourController);
//# sourceMappingURL=tour.controller.js.map
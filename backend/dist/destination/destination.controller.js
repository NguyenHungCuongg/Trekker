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
exports.DestinationController = void 0;
const common_1 = require("@nestjs/common");
const destination_service_1 = require("./destination.service");
let DestinationController = class DestinationController {
    destinationService;
    constructor(destinationService) {
        this.destinationService = destinationService;
    }
    async findAll(locationId) {
        if (locationId) {
            return this.destinationService.findByLocationId(locationId);
        }
        return this.destinationService.findAll();
    }
    async findOne(id) {
        return this.destinationService.findOne(id);
    }
};
exports.DestinationController = DestinationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("locationId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DestinationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DestinationController.prototype, "findOne", null);
exports.DestinationController = DestinationController = __decorate([
    (0, common_1.Controller)("destinations"),
    __metadata("design:paramtypes", [destination_service_1.DestinationService])
], DestinationController);
//# sourceMappingURL=destination.controller.js.map
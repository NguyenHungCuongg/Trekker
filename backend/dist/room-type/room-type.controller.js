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
exports.RoomTypeController = void 0;
const common_1 = require("@nestjs/common");
const room_type_service_1 = require("./room-type.service");
let RoomTypeController = class RoomTypeController {
    roomTypeService;
    constructor(roomTypeService) {
        this.roomTypeService = roomTypeService;
    }
    async findAll(accommodationId) {
        if (accommodationId) {
            return this.roomTypeService.findByAccommodationId(accommodationId);
        }
        return this.roomTypeService.findAll();
    }
    async findOne(id) {
        return this.roomTypeService.findOne(id);
    }
};
exports.RoomTypeController = RoomTypeController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("accommodationId", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "findOne", null);
exports.RoomTypeController = RoomTypeController = __decorate([
    (0, common_1.Controller)("room-types"),
    __metadata("design:paramtypes", [room_type_service_1.RoomTypeService])
], RoomTypeController);
//# sourceMappingURL=room-type.controller.js.map
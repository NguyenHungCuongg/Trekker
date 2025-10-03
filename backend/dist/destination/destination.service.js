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
exports.DestinationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const destination_entity_1 = require("./destination.entity");
let DestinationService = class DestinationService {
    destinationRepository;
    constructor(destinationRepository) {
        this.destinationRepository = destinationRepository;
    }
    async findAll() {
        return this.destinationRepository.find({
            relations: ["locations", "tours"],
        });
    }
    async findOne(id) {
        const destination = await this.destinationRepository.findOne({
            where: { id },
            relations: ["locations", "tours"],
        });
        if (!destination) {
            throw new common_1.NotFoundException(`Không tìm thấy destination với id ${id}`);
        }
        return destination;
    }
    async findByLocationId(locationId) {
        return this.destinationRepository.find({
            where: { locationId },
            relations: ["locations"],
        });
    }
    async count() {
        return this.destinationRepository.count();
    }
};
exports.DestinationService = DestinationService;
exports.DestinationService = DestinationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(destination_entity_1.Destination)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DestinationService);
//# sourceMappingURL=destination.service.js.map
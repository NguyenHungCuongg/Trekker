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
exports.TourService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tour_entity_1 = require("./tour.entity");
const typeorm_2 = require("typeorm");
let TourService = class TourService {
    tourRepository;
    constructor(tourRepository) {
        this.tourRepository = tourRepository;
    }
    async findAll() {
        return this.tourRepository.find({
            relations: ["location", "destinations"],
        });
    }
    async findOne(id) {
        const tour = await this.tourRepository.findOne({
            where: { id },
            relations: ["location", "destinations"],
        });
        if (!tour) {
            throw new common_1.NotFoundException(`Không tìm thấy tour với id ${id}`);
        }
        return tour;
    }
    async search(searchDto) {
        const query = this.tourRepository
            .createQueryBuilder("tour")
            .leftJoinAndSelect("tour.location", "location")
            .leftJoinAndSelect("tour.destinations", "destinations");
        if (searchDto.locationId) {
            query.andWhere("tour.locationId = :locationId", {
                locationId: searchDto.locationId,
            });
        }
        if (searchDto.minPrice) {
            query.andWhere("tour.price >= :minPrice", {
                minPrice: searchDto.minPrice,
            });
        }
        if (searchDto.maxPrice) {
            query.andWhere("tour.price <= :maxPrice", {
                maxPrice: searchDto.maxPrice,
            });
        }
        if (searchDto.startDate) {
            query.andWhere("tour.startDate >= :startDate", {
                startDate: searchDto.startDate,
            });
        }
        if (searchDto.endDate) {
            query.andWhere("tour.endDate <= :endDate", {
                endDate: searchDto.endDate,
            });
        }
        if (searchDto.minRating) {
            query.andWhere("tour.rating >= :minRating", {
                minRating: searchDto.minRating,
            });
        }
        if (searchDto.maxGuests) {
            query.andWhere("tour.maxGuests <= :maxGuests", {
                maxGuests: searchDto.maxGuests,
            });
        }
        return query.getMany();
    }
    async findByLocationId(locationId) {
        return this.tourRepository.find({
            where: { locationId },
            relations: ["location", "destinations"],
        });
    }
    async count() {
        return this.tourRepository.count();
    }
};
exports.TourService = TourService;
exports.TourService = TourService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tour_entity_1.Tour)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TourService);
//# sourceMappingURL=tour.service.js.map
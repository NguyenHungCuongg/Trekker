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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./review.entity");
let ReviewService = class ReviewService {
    reviewRepository;
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async findAll(userId) {
        const whereCondition = userId ? { userId } : {};
        return this.reviewRepository.find({
            where: whereCondition,
            relations: ["user"],
            order: { createdAt: "DESC" },
        });
    }
    async findOne(id, userId) {
        const whereCondition = userId ? { userId } : {};
        const review = await this.reviewRepository.findOne({
            where: whereCondition,
            relations: ["user"],
        });
        if (!review) {
            throw new common_1.NotFoundException(`Không tìm thấy review với Id ${id}`);
        }
        return review;
    }
    async create(createReviewDto) {
        if (createReviewDto.rating < 0 || createReviewDto.rating > 5) {
            throw new common_1.BadRequestException("Rating phải từ 0 đến 5");
        }
        const existingReview = await this.reviewRepository.findOne({
            where: {
                userId: createReviewDto.userId,
                serviceType: createReviewDto.serviceType,
                serviceId: createReviewDto.serviceId,
            },
        });
        if (existingReview) {
            throw new common_1.BadRequestException("Bạn đã đánh giá dịch vụ này rồi");
        }
        const review = this.reviewRepository.create(createReviewDto);
        return this.reviewRepository.save(review);
    }
    async update(id, updateReviewDto, userId) {
        const review = await this.findOne(id, userId);
        if (!review) {
            throw new common_1.NotFoundException(`Không tìm thấy review với Id ${id}`);
        }
        if (updateReviewDto.rating !== undefined) {
            if (updateReviewDto.rating < 0 || updateReviewDto.rating > 5) {
                throw new common_1.BadRequestException("Rating phải từ 0 đến 5");
            }
        }
        await this.reviewRepository.update(id, updateReviewDto);
        return this.findOne(id, userId);
    }
    async remove(id, userId) {
        const review = await this.findOne(id, userId);
        await this.reviewRepository.remove(review);
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=review.service.js.map
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Review } from "./review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async findAll(userId?: number): Promise<Review[]> {
    const whereCondition = userId ? { userId } : {};
    return this.reviewRepository.find({
      where: whereCondition,
      relations: ["user"],
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: number, userId?: number): Promise<Review> {
    const whereCondition = userId ? { userId } : {};
    const review = await this.reviewRepository.findOne({
      where: whereCondition,
      relations: ["user"],
    });
    if (!review) {
      throw new NotFoundException(`Không tìm thấy review với Id ${id}`);
    }
    return review;
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    if (createReviewDto.rating < 0 || createReviewDto.rating > 5) {
      throw new BadRequestException("Rating phải từ 0 đến 5");
    }
    const existingReview = await this.reviewRepository.findOne({
      where: {
        userId: createReviewDto.userId,
        serviceType: createReviewDto.serviceType,
        serviceId: createReviewDto.serviceId,
      },
    });
    if (existingReview) {
      throw new BadRequestException("Bạn đã đánh giá dịch vụ này rồi");
    }
    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
    userId?: number,
  ): Promise<Review> {
    const review = await this.findOne(id, userId);
    if (!review) {
      throw new NotFoundException(`Không tìm thấy review với Id ${id}`);
    }
    if (updateReviewDto.rating !== undefined) {
      if (updateReviewDto.rating < 0 || updateReviewDto.rating > 5) {
        throw new BadRequestException("Rating phải từ 0 đến 5");
      }
    }
    await this.reviewRepository.update(id, updateReviewDto);
    return this.findOne(id, userId);
  }

  async remove(id: number, userId?: number): Promise<void> {
    const review = await this.findOne(id, userId);
    await this.reviewRepository.remove(review);
  }
}

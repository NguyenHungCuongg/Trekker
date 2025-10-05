import { Repository } from "typeorm";
import { Review } from "./review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
export declare class ReviewService {
    private reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    findAll(userId?: number): Promise<Review[]>;
    findOne(id: number, userId?: number): Promise<Review>;
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto, userId?: number): Promise<Review>;
    remove(id: number, userId?: number): Promise<void>;
}

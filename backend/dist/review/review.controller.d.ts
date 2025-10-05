import { ReviewService } from "./review.service";
import { Review } from "./review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
export declare class ReviewController {
    private reviewService;
    constructor(reviewService: ReviewService);
    findAll(): Promise<Review[]>;
    findMyReviews(req: any): Promise<Review[]>;
    findOne(id: number): Promise<Review>;
    create(createReviewDto: CreateReviewDto, req: any): Promise<Review>;
    update(id: number, updateReviewDto: UpdateReviewDto, req: any): Promise<Review>;
    remove(id: number, req: any): Promise<{
        message: string;
    }>;
}

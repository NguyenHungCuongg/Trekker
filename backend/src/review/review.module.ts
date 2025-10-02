import { Module } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { ReviewController } from "./review.controller";

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}

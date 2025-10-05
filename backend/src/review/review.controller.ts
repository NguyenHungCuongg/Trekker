import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from "@nestjs/common";
import { ReviewService } from "./review.service";
import { Review } from "./review.entity";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { JwtAuthGuard } from "../auth/jwt.authguard";

@Controller("reviews")
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  async findAll(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("my-reviews")
  async findMyReviews(@Request() req): Promise<Review[]> {
    return this.reviewService.findAll(req.user.userId);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req,
  ): Promise<Review> {
    createReviewDto.userId = req.user.userId;
    return this.reviewService.create(createReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() req,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    await this.reviewService.remove(id, req.user.userId);
    return { message: "Review deleted successfully" };
  }
}

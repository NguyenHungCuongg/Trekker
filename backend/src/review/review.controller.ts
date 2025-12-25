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
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../common/enums";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("reviews")
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  // User endpoints
  @Get()
  @ApiOperation({ summary: "Lấy tất cả đánh giá hoặc theo dịch vụ" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách đánh giá.",
  })
  async findAll(@Request() req: any): Promise<Review[]> {
    const { serviceType, serviceId } = req.query;
    if (serviceType && serviceId) {
      return this.reviewService.findByService(serviceType, parseInt(serviceId));
    }
    return this.reviewService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy đánh giá của người dùng hiện tại" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách đánh giá của người dùng.",
  })
  @Get("my-reviews")
  async findMyReviews(@Request() req): Promise<Review[]> {
    return this.reviewService.findAll(req.user.userId);
  }

  @ApiOperation({ summary: "Lấy đánh giá theo ID" })
  @ApiResponse({
    status: 200,
    description: "Trả về đánh giá theo ID.",
  })
  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Tạo đánh giá mới" })
  @ApiResponse({
    status: 201,
    description: "Đánh giá mới đã được tạo thành công.",
  })
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Request() req,
  ): Promise<Review> {
    createReviewDto.userId = req.user.userId;
    return this.reviewService.create(createReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Cập nhật đánh giá" })
  @ApiResponse({
    status: 200,
    description: "Đánh giá đã được cập nhật thành công.",
  })
  @Put(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() req,
  ): Promise<Review> {
    return this.reviewService.update(id, updateReviewDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Xóa đánh giá" })
  @ApiResponse({
    status: 200,
    description: "Đánh giá đã được xóa thành công.",
  })
  @Delete(":id")
  async remove(
    @Param("id", ParseIntPipe) id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    await this.reviewService.remove(id, req.user.userId);
    return { message: "Review đã được xóa thành công" };
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy tất cả đánh giá (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách tất cả đánh giá.",
  })
  @Roles(UserRole.ADMIN)
  async findAllReviews(): Promise<Review[]> {
    return this.reviewService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy đánh giá theo ID (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về đánh giá theo ID.",
  })
  @Roles(UserRole.ADMIN)
  async findReviewById(@Param("id", ParseIntPipe) id: number): Promise<Review> {
    return this.reviewService.findOne(id);
  }

  @Delete("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Xóa đánh giá (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Đánh giá đã được xóa thành công.",
  })
  @Roles(UserRole.ADMIN)
  async deleteReview(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.reviewService.removeByAdmin(id);
    return { message: "Review đã được xóa thành công" };
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TourService } from "./tour.service";
import { Tour } from "./tour.entity";
import { SearchTourDto } from "./dto/search-tour.dto";
import { JwtAuthGuard } from "../auth/jwt.authguard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../common/enums";
import { TourCardDto } from "./dto/tour-card.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("tours")
export class TourController {
  constructor(private tourService: TourService) {}

  // User endpoints
  @Get()
  @ApiOperation({
    summary: "Lấy danh sách tất cả các tour, có thể lọc theo locationId",
  })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các tour.",
    type: [Tour],
  })
  async findAll(@Query("locationId") locationId?: string): Promise<Tour[]> {
    const id = locationId !== undefined ? Number(locationId) : undefined;
    if (id !== undefined && !Number.isNaN(id)) {
      return this.tourService.findByLocationId(id);
    }
    return this.tourService.findAll();
  }

  @Get("search")
  @ApiOperation({ summary: "Tìm kiếm tour dựa trên các tiêu chí" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các tour phù hợp với tiêu chí tìm kiếm.",
    type: [Tour],
  })
  async search(@Query() searchDto: SearchTourDto): Promise<Tour[]> {
    return this.tourService.search(searchDto);
  }

  @Get("top")
  @ApiOperation({ summary: "Lấy danh sách các tour hàng đầu" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các tour hàng đầu.",
    type: [TourCardDto],
  })
  async findTopTours(
    @Query("limit", ParseIntPipe) limit?: number,
  ): Promise<TourCardDto[]> {
    return this.tourService.findTopTours(limit);
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy chi tiết tour theo ID" })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết tour.",
    type: Tour,
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Tour> {
    return this.tourService.findOne(id);
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy danh sách tất cả các tour (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách tất cả các tour.",
    type: [Tour],
  })
  @Roles(UserRole.ADMIN)
  async findAllTours(): Promise<Tour[]> {
    return this.tourService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy chi tiết tour theo ID (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về chi tiết tour.",
    type: Tour,
  })
  @Roles(UserRole.ADMIN)
  async findTourById(@Param("id", ParseIntPipe) id: number): Promise<Tour> {
    return this.tourService.findOne(id);
  }

  @Post("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Tạo mới một tour (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về tour đã được tạo.",
    type: Tour,
  })
  @Roles(UserRole.ADMIN)
  async createTour(@Body() createTourDto: Partial<Tour>): Promise<Tour> {
    return this.tourService.create(createTourDto);
  }

  @Put("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Cập nhật thông tin tour (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về tour đã được cập nhật.",
    type: Tour,
  })
  @Roles(UserRole.ADMIN)
  async updateTour(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateTourDto: Partial<Tour>,
  ): Promise<Tour> {
    return this.tourService.update(id, updateTourDto);
  }

  @Delete("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Xóa một tour (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về thông báo xóa thành công.",
  })
  @Roles(UserRole.ADMIN)
  async deleteTour(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.tourService.remove(id);
    return { message: "Tour đã được xóa thành công" };
  }
}

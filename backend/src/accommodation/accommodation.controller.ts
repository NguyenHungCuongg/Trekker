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
import { AccommodationService } from "./accommodation.service";
import { Accommodation } from "./accommodation.entity";
import { SearchAccommodationDto } from "./dto/search-accommodation.dto";
import { JwtAuthGuard } from "../auth/jwt.authguard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { UserRole } from "../common/enums";
import { AccommodationCardDto } from "./dto/accomodation-card.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("accommodations")
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}

  @Get()
  @ApiOperation({ summary: "Lấy tất cả chỗ ở hoặc theo destinationId" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách chỗ ở.",
  })
  async findAll(
    @Query("locationId") destinationId?: number,
  ): Promise<Accommodation[]> {
    if (destinationId) {
      return this.accommodationService.findByDestinationId(destinationId);
    }
    return this.accommodationService.findAll();
  }

  @Get("search")
  @ApiOperation({ summary: "Tìm kiếm chỗ ở" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách chỗ ở phù hợp với tiêu chí tìm kiếm.",
  })
  async search(@Query() searchDto: SearchAccommodationDto): Promise<any[]> {
    return this.accommodationService.search(searchDto);
  }

  @Get("top")
  @ApiOperation({ summary: "Lấy các chỗ ở hàng đầu" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách các chỗ ở hàng đầu.",
  })
  async findTopAccommodations(
    @Query("limit") limit: number,
  ): Promise<AccommodationCardDto[]> {
    return this.accommodationService.findAccommodationCards(limit);
  }

  @Get(":id")
  @ApiOperation({ summary: "Lấy chỗ ở theo ID" })
  @ApiResponse({
    status: 200,
    description: "Trả về chỗ ở theo ID.",
  })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Accommodation> {
    return this.accommodationService.findOne(id);
  }

  @Get(":id/room-types")
  @ApiOperation({ summary: "Lấy loại phòng của chỗ ở theo ID" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách loại phòng của chỗ ở.",
  })
  async findRoomTypes(@Param("id", ParseIntPipe) id: number) {
    const accommodation = await this.accommodationService.findOne(id);
    return accommodation.roomTypes;
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy tất cả chỗ ở (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về danh sách tất cả chỗ ở.",
  })
  @Roles(UserRole.ADMIN)
  async findAllAccommodations(): Promise<Accommodation[]> {
    return this.accommodationService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Lấy chỗ ở theo ID (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Trả về chỗ ở theo ID.",
  })
  @Roles(UserRole.ADMIN)
  async findAccommodationById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Accommodation> {
    return this.accommodationService.findOne(id);
  }

  @Post("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Tạo chỗ ở mới (Admin)" })
  @ApiResponse({
    status: 201,
    description: "Chỗ ở mới đã được tạo thành công.",
  })
  @Roles(UserRole.ADMIN)
  async createAccommodation(
    @Body() createAccommodationDto: Partial<Accommodation>,
  ): Promise<Accommodation> {
    return this.accommodationService.create(createAccommodationDto);
  }

  @Put("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Cập nhật chỗ ở (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Chỗ ở đã được cập nhật thành công.",
  })
  @Roles(UserRole.ADMIN)
  async updateAccommodation(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAccommodationDto: Partial<Accommodation>,
  ): Promise<Accommodation> {
    return this.accommodationService.update(id, updateAccommodationDto);
  }

  @Delete("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Xóa chỗ ở (Admin)" })
  @ApiResponse({
    status: 200,
    description: "Chỗ ở đã được xóa thành công.",
  })
  @Roles(UserRole.ADMIN)
  async deleteAccommodation(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.accommodationService.remove(id);
    return { message: "Chỗ ở đã được xóa thành công" };
  }
}

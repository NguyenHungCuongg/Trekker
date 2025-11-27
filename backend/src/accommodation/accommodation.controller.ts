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

@Controller("accommodations")
export class AccommodationController {
  constructor(private accommodationService: AccommodationService) {}

  @Get()
  async findAll(
    @Query("locationId") destinationId?: number,
  ): Promise<Accommodation[]> {
    if (destinationId) {
      return this.accommodationService.findByDestinationId(destinationId);
    }
    return this.accommodationService.findAll();
  }

  @Get("search")
  async search(
    @Query() searchDto: SearchAccommodationDto,
  ): Promise<Accommodation[]> {
    return this.accommodationService.search(searchDto);
  }

  @Get("top")
  async findTopAccommodations(
    @Query("limit") limit: number,
  ): Promise<AccommodationCardDto[]> {
    return this.accommodationService.findAccommodationCards(limit);
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Accommodation> {
    return this.accommodationService.findOne(id);
  }

  @Get(":id/room-types")
  async findRoomTypes(@Param("id", ParseIntPipe) id: number) {
    const accommodation = await this.accommodationService.findOne(id);
    return accommodation.roomTypes;
  }

  // Admin endpoints
  @Get("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAllAccommodations(): Promise<Accommodation[]> {
    return this.accommodationService.findAll();
  }

  @Get("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async findAccommodationById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<Accommodation> {
    return this.accommodationService.findOne(id);
  }

  @Post("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createAccommodation(
    @Body() createAccommodationDto: Partial<Accommodation>,
  ): Promise<Accommodation> {
    return this.accommodationService.create(createAccommodationDto);
  }

  @Put("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateAccommodation(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateAccommodationDto: Partial<Accommodation>,
  ): Promise<Accommodation> {
    return this.accommodationService.update(id, updateAccommodationDto);
  }

  @Delete("admin/:id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteAccommodation(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.accommodationService.remove(id);
    return { message: "Chỗ ở đã được xóa thành công" };
  }
}
